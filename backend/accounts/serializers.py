import uuid
from rest_framework import serializers
from .models import User, Resume
from accounts import models
import gridfs
from pymongo import MongoClient
from django.conf import settings 
from io import BytesIO
from django.core.files.uploadedfile import InMemoryUploadedFile
import pymongo
#from .helpers import generate_confirmation_token

# serializers.py

class UserSerializer(serializers.Serializer):
    candidate_email = serializers.EmailField()
    candidate_first_name = serializers.CharField(max_length=30)
    candidate_last_name = serializers.CharField(max_length=30)
    password = serializers.CharField(max_length=128, write_only=True)  # Use write_only for security

    def create(self, validated_data):
        # Create and return a new User instance using validated data
        return User.objects.create(**validated_data)

    def validate(self, data):
        candidate_email = data.get('candidate_email')
        candidate_first_name = data.get('candidate_first_name')
        candidate_last_name = data.get('candidate_last_name')
        password = data.get('password')

        # Check if email is already registered
        if User.objects.filter(candidate_email=candidate_email).first():
            raise serializers.ValidationError('EMAIL_EXISTS')

        # Validate password requirements (e.g., minimum length)
        if len(password) < 8:
            raise serializers.ValidationError('Password must be at least 8 characters')

        return data

    def create(self, validated_data):
        candidate_email = validated_data.get('candidate_email')
        candidate_first_name = validated_data.get('candidate_first_name')
        candidate_last_name = validated_data.get('candidate_last_name')
        password = validated_data.get('password')

        # Create new User instance and set hashed password
        user = User(candidate_email=candidate_email,candidate_first_name=candidate_first_name, candidate_last_name=candidate_last_name)
        user.set_password(password)
        user.save()
        
        return user
    
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
            raise serializers.ValidationError({'file': 'PDF_FILES_ONLY'})
        
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