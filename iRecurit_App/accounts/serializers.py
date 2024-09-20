import uuid
from rest_framework import serializers
from .models import *
import gridfs
from pymongo import MongoClient
from django.conf import settings 
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import pymongo
from bson import Binary
from mongoengine.errors import NotUniqueError
from rest_framework import status
#from .helpers import generate_confirmation_token

# serializers.py


class UserSerializer(serializers.Serializer):
    candidate_email = serializers.EmailField()
    candidate_first_name = serializers.CharField(max_length=30)
    candidate_last_name = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=128, write_only=True)  # Use write_only for security

    def create(self, validated_data):
        candidate_email = validated_data.get('candidate_email')

        # Check if email already exists
        user = User.objects.filter(candidate_email=candidate_email).first()
        if user:
            if user.is_email_verified:
                raise serializers.ValidationError('EMAIL_EXISTS')
            else:
                # Update the existing user if the email is not verified
                user.candidate_first_name = validated_data.get('candidate_first_name')
                user.candidate_last_name = validated_data.get('candidate_last_name')
                user.set_password(validated_data.get('password'))
                user.registration_time = timezone.now()
                user.save()
                return user

        # Create new User instance and set hashed password if email is not in use
        user = User(candidate_email=candidate_email, candidate_first_name=validated_data.get('candidate_first_name'), candidate_last_name=validated_data.get('candidate_last_name'), registration_time=timezone.now())
        user.set_password(validated_data.get('password'))
        user.save()

        return user

    def validate(self, data):
        candidate_email = data.get('candidate_email')
        password = data.get('password')

        # Check if email exists and if it is verified
        user = User.objects.filter(candidate_email=candidate_email).first()
        if user:
            if user.is_email_verified:
                raise serializers.ValidationError('EMAIL_EXISTS')
            else:
                # Optionally, handle the case where the email exists but is not verified
                pass

        # Validate password requirements (e.g., minimum length)
        if len(password) < 8:
            raise serializers.ValidationError('PASSWORD_MUST_BE_OF_8_CHARACTERS')

        return data
    
    
class LoginSerializer(serializers.Serializer):
    candidate_email = serializers.EmailField()
    password = serializers.CharField(max_length=128, write_only=True)


    def validate(self, data):
        candidate_email = data.get('candidate_email')
        password = data.get('password')

        # Retrieve user from MongoDB based on email
        user = User.objects.filter(candidate_email=candidate_email).first()

        if not user:
            raise serializers.ValidationError('USER_NOT_EXISTS')

        # Validate password
        if not user.check_password(password):
            raise serializers.ValidationError('INCORRECT_PASSWORD')

        return data


class ResumeSerializer(serializers.Serializer):
    file = serializers.FileField()

    def create(self, validated_data):
        user_id = self.context['user_id']
        candidate = User.objects.get(candidate_id=user_id)
        
        file_data = validated_data.pop('file')  # Remove 'file' from validated_data

        if not file_data.content_type.startswith('application/pdf'):
            raise serializers.ValidationError({
                'Status_code': status.HTTP_400_BAD_REQUEST,
                'Success': False,
                'data':None,
                'message': 'PDF_FILES_ONLY'
                })
        
        # Generate filename
        filename = f"{candidate.candidate_first_name}_{candidate.candidate_last_name}_{candidate.candidate_id}.pdf"

        # Connect to MongoDB and GridFS
        client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]
        fs = gridfs.GridFS(db)

        # Read file content and save to GridFS
        file_id = fs.put(file_data.read(), filename=filename, content_type=file_data.content_type)

        # Create the Resume object with the user and file data
        resume = Resume(
            candidate=candidate,
            file=str(file_id),
            filename=filename,
            candidate_name=f"{candidate.candidate_first_name} {candidate.candidate_last_name}"
        )
        resume.save()

        return resume
    
    def update(self, instance, validated_data):
        user_id = self.context['user_id']
        candidate = User.objects.get(candidate_id=user_id)
        
        file_data = validated_data.pop('file')

        if not file_data.content_type.startswith('application/pdf'):
            raise serializers.ValidationError({
                'Status_code': status.HTTP_400_BAD_REQUEST,
                'Success': False,
                'data':None,
                'message': 'PDF_FILES_ONLY'
                })
        
        filename = f"{candidate.candidate_first_name}_{candidate.candidate_last_name}_{candidate.candidate_id}.pdf"

        client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]
        fs = gridfs.GridFS(db)

        # Delete the old file from GridFS
        fs.delete(id(instance.file))

        # Save the new file to GridFS
        file_id = fs.put(file_data.read(), filename=filename, content_type=file_data.content_type)

        # Update the instance with the new file details
        instance.file = str(file_id)
        instance.filename = filename
        instance.save()

        return instance
    
    
class ProfilePictureSerializer(serializers.Serializer):
    picture = serializers.ImageField()
    
    def create(self, validated_data):
        user_id = self.context['user_id']
        candidate = User.objects.get(candidate_id=user_id)
        
        picture_data = validated_data['picture']
        
        if picture_data.content_type not in ['image/png', 'image/jpeg']:
            raise serializers.ValidationError({
                'Status_code': status.HTTP_400_BAD_REQUEST,
                'Success': False,
                'data':None,
                'message': 'PNG_&_JPEG_FILES_ONLY'
                })
        
        filename = f"{candidate.candidate_first_name}_{candidate.candidate_last_name}_{candidate.candidate_id}.{picture_data.content_type.split('/')[-1]}"

        image_binary_data = picture_data.read()
        
        # Connect to MongoDB and GridFS
        client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
        db = client[settings.DATABASES['default']['NAME']]
        fs = gridfs.GridFS(db)
        
        file_id = fs.put(image_binary_data, filename=filename, content_type=picture_data.content_type)

        # Create the ProfilePhoto object with the user and file data
        profile_picture = ProfilePicture.objects(candidate=candidate).first()
        
        
        if profile_picture:
            profile_picture.original_picture = Binary(image_binary_data)  # or you can use file_id if stored in GridFS
            profile_picture.picture_name = filename
            profile_picture.save()
        else:
            # Create new profile picture
            profile_picture = ProfilePicture(
                candidate=candidate,
                original_picture=Binary(image_binary_data),
                picture_name=filename
            )
            profile_picture.save()

        return profile_picture