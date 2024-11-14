from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
from .models import *
import random, io
from PyPDF2 import PdfReader
from django.utils.timezone import make_aware
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from .authentication import JWTAuthentication
from rest_framework.views import APIView
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import force_str
from .helpers import generate_token
from .tasks import send_confirmation_email, remove_bg
from rest_framework.exceptions import AuthenticationFailed
import jwt
from django.utils.timezone import now
import redis
from django.utils import timezone
from bson import ObjectId
import pymongo
from django.contrib.auth.tokens import default_token_generator
from rest_framework.parsers import MultiPartParser, FormParser
from .tasks import JobScheduler, start_job_scheduler
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import logging
import os, json
from django.shortcuts import redirect
from django.contrib.sites.shortcuts import get_current_site
from collections import defaultdict
from bson import ObjectId
from gridfs import GridFS
import PyPDF2
import re,io
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
import base64
from typing import Dict



logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        #logging.FileHandler("mongo_connection.log"),
        logging.StreamHandler()
    ]
)

logger = logging.getLogger(__name__)


def index_view(request):
    return render(request, 'index.html')

def index_html(request):
    file_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'index.html')
    with open(file_path, 'r') as file:
        content = file.read()
    return HttpResponse(content, content_type='text/html')



@api_view(['POST'])
@csrf_exempt
def signup_view(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        
        # Send email to the user in the background
        send_confirmation_email(user, request)
        
        response_data = serializer.data
        response_data.pop('password', None)
        
        response = {
            "status_code": status.HTTP_201_CREATED,
            "success": True,
            "data": response_data,
            # "message": "USER_REGISTERED_SUCCESSFULLY"
            "message": "USER_ENTRY_SAVED & EMAIL_SENT_SUCCESSFULLY"
        }
        
        return Response(response, status=status.HTTP_201_CREATED)
    else:
        # Custom error handling
        error_messages = []
        for field, errors in serializer.errors.items():
            error_messages.extend(errors)
        # Join all error messages into a single string
        error_message = ' '.join(error_messages)
        
        response_data = serializer.data
        response_data.pop('password', None)
        
        response = {
            "status_code": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "data": response_data,
            "message": error_message
        }
        
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
        #return HttpResponse(error_message, status=status.HTTP_400_BAD_REQUEST, content_type='text/plain')


@csrf_exempt
@api_view(['GET'])
def verify_email(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None
        logger.info("User does not exist or invalid uid.")

    if user is not None:
        logger.info(f"Checking token for user: {user.candidate_email}")
        if generate_token.check_token(user, token):
            current_time = timezone.now()

            # Ensure registration_time is in UTC
            registration_time = user.registration_time

            if registration_time.tzinfo is None:  # Check if naive
                registration_time = make_aware(registration_time)  # Convert to aware if necessary
            
            registration_time = registration_time.astimezone(timezone.utc)  # Ensure it is UTC

            logger.info(f"Current Time: {current_time}")
            logger.info(f"Registration Time: {registration_time}")

            # Log timezone information
            logger.info(f"Registration Time Timezone: {registration_time.tzinfo}")

            # Check if the token has expired (5 minutes)
            if (current_time - registration_time).total_seconds() > 19950:
                logger.info(f"Token expired. Difference in seconds: {(current_time - registration_time).total_seconds()}")
                return redirect('https://irecruit-u.com/expired')

            # Email verification logic
            if not user.is_email_verified:
                user.is_email_verified = True
                user.save()
                logger.info("Email verified successfully.")
                return redirect('https://irecruit-u.com/activate')
            else:
                logger.info("Email already verified.")
                return redirect('https://irecruit-u.com/activate')
        else:
            logger.info("Token validation failed.")
            return redirect('https://irecruit-u.com/expired')
    else:
        return redirect('https://irecruit-u.com/expired')
    
    
@api_view(['GET'])
def resend_verification_email(request):
    try:
        #getting the email from frontend
        email = request.GET.get('email')
        
        if not email:
            response = {
            "status_code": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "message": 'EMAIL_REQUIRED'
        }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        #getting candidate 
        user = User.objects.get(candidate_email=email)
        
        if user.is_email_verified:
            response = {
            "status_code": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "message": 'EMAIL_ALREADY_VERIFIED'
        }
            return Response(response, status=status.HTTP_400_BAD_REQUEST)

        user.registration_time = timezone.now()
        user.save()

        # Resend verification email
        send_confirmation_email(user, request)
        
        response = {
            "status_code": status.HTTP_200_OK,
            "success": True,
            "message": 'EMAIL_SENT_SUCCESSFULLY'
        }
        
        return Response(response, status=status.HTTP_200_OK)
    
    except User.DoesNotExist:
        response = {
            "status_code": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "message": 'USER_NOT_FOUND'
        }
        return Response(response, status=status.HTTP_404_NOT_FOUND)

    except Exception as e:
        response = {
            "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
            "success": False,
            "message": str(e)
        }
        return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    
@api_view(['POST'])
@csrf_exempt
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        candidate_email = serializer.validated_data.get('candidate_email')
        # Optionally, you can retrieve the user object if needed
        user = User.objects.filter(candidate_email=candidate_email).first()
        if user.is_email_verified:
            #creating tokens for the user
            access_token, refresh_token = JWTAuthentication.create_tokens(user)

                    # Authentication successful, return a success message or token
            response_data = {
                "status_code": status.HTTP_200_OK,
                "success": True,
                "data": {
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'user_id': user.id,
                    'candidate_email':user.candidate_email,
                    'name':user.candidate_first_name + " " + user.candidate_last_name
                },
                "message": "USER_REGISTERED & LOGGED_IN_SUCCESSFULLY"
            }
            #response = Response({'message':'Login_successful', 'access_token': access_token, 'refresh_token':refresh_token, 'user_id':user.id}, status=status.HTTP_200_OK)
            response= Response(response_data, status=status.HTTP_200_OK)
            response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True)
            return response
        else:
            return Response({
                "staus_code": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "message": "EMAIL_NOT_VERIFIED",
                }, status=status.HTTP_403_FORBIDDEN)
    else:
        # Custom error handling
        error_messages = []
        for field, errors in serializer.errors.items():
            error_messages.extend(errors)
        # Join all error messages into a single string
        error_message = ' '.join(error_messages)
        
        response_data = serializer.data
        response_data.pop('password', None)
        
        response = {
            "status_code": status.HTTP_400_BAD_REQUEST,
            "success": False,
            "data": response_data,
            "message": error_message
        }
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
        


class VerifyUser(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        token = request.META.get('HTTP_AUTHORIZATION')
        
        if not token:
            raise AuthenticationFailed('UNAUTHENTICATED')
        
        try:
            payload = jwt.decode(token, 'secret', algorithm=['HS256'])
            
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated')   
        
        user = User.objects.filter(id=payload['id']).first()
       # serializer = UserSignupSerializer(user)
       # return Response(serializer.data)
    
# class ExampleAPIView(APIView):
#     authentication_classes = [JWTAuthentication]  # Apply JWTAuthentication to this API vie
#     #permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

#     def get(self, request, *args, **kwargs):
#         user = request.user  # Retrieve authenticated user
#         return Response({'message': f'Hello, {user.candidate_email}!'})



@api_view(['POST'])
@csrf_exempt
def refresh_token_view(request):
    refresh_token = request.COOKIES.get('refresh_token')
    
    if not refresh_token:
        raise AuthenticationFailed('Refresh_token_required')
    
    try:
        payload = jwt.decode(refresh_token, settings.SECRET_KEY, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise AuthenticationFailed('Refresh_token_expired')
    except (jwt.InvalidTokenError, jwt.DecodeError):
        raise AuthenticationFailed('Invalid refresh token')
    
    candidate_id = payload.get('candidate_id')
    if not candidate_id:
        raise AuthenticationFailed('Invalid_refresh_token')
    
    user = User.objects.filter(candidate_id=candidate_id).first()
    if not user:
        raise AuthenticationFailed('User not found')

    # Instantiate JWTAuthentication and generate access token
    jwt_auth = JWTAuthentication()
    access_token = jwt_auth.generate_access_token(user)

    response = {
        "status_code": status.HTTP_200_OK,
        "success": True,
        "data": {
            "access_token":access_token
            },
        "message": " NEW_ACCESS_TOKEN"
    }
    return Response(response)


    
scheduler = JobScheduler()

class UploadResume(APIView):
    parser_classes = [MultiPartParser, FormParser]
    authentication_classes = [JWTAuthentication] 
    # permission_classes  = [IsAuthenticated]  # Uncomment if you want to require authentication

    def post(self, request, *args, **kwargs):
        user = request.user
        user_id = str(user.candidate_id)

        existing_resume = Resume.objects.filter(candidate=user_id).first()

        if existing_resume:
            serializer = ResumeSerializer(existing_resume, data=request.data, context={'user_id': user_id})
        else:
            serializer = ResumeSerializer(data=request.data, context={'user_id': user_id})

        if serializer.is_valid():
            resume = serializer.save()

            # Celery task
            # process_resume.delay(str(resume.id))  

            response = {
                "status_code": status.HTTP_200_OK,
                "success": True,
                "data": serializer.data,
                "message": "RESUME_UPLOADED_SUCCESSFULLY"
            }
            return Response(response, status=status.HTTP_200_OK)
        else:
            # Custom error handling
            error_messages = []
            for field, errors in serializer.errors.items():
                error_messages.extend(errors)
            # Join all error messages into a single string
            error_message = ' '.join(error_messages)

            response = {
                "status_code": status.HTTP_400_BAD_REQUEST,
                "success": False,
                "data": None,
                "message": error_message
            }

            return Response(response, status=status.HTTP_400_BAD_REQUEST)
        
        
class Check_Confirmation(APIView):
    def get(self, request):
        try: 
            email = request.GET.get('email')
            
            if not email:
                response={
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "success": False,
                    "message": "EMAIL_REQUIRED"
                }
                
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            
            user = User.objects.get(candidate_email = email)
            
            if user.is_email_verified:
                response = {
                    "status_code": status.HTTP_200_OK,
                    "success": True,
                    "data": user.candidate_email,
                    "message": "EMAIL_VERIFIED"
                }
                
                return Response(response, status=status.HTTP_200_OK)
            
            else:
                response={
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "success": False,
                    "message": "EMAIL_NOT_VERIFIED"
                }
                
                return Response(response, status=status.HTTP_400_BAD_REQUEST)
            
        except User.DoesNotExist:
            response={
                    "status_code": status.HTTP_400_BAD_REQUEST,
                    "success": False,
                    "message": "USER_NOT_FOUND"
            }
            return Response(response, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            response={
                    "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "success": False,
                    "message": str(e)
            }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class Generate_Profile(APIView):
    authentication_classes = [JWTAuthentication]
    
    def post(self, request):
        user = request.user
        user_id = str(user.candidate_id)
        
        # Find the most recent resume for the user (or adjust as needed)
        try:
            resume = Resume.objects.get(candidate=user_id)
        except Resume.DoesNotExist:
            return Response(
                {
                    "status_code": status.HTTP_404_NOT_FOUND,
                    "success": False,
                    "message": "NO_RESUME_FOUND_FOR_USER"
                },
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as e:
            return Response(
                {
                    "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "success": False,
                    "message": f"INTERNAL_SERVER_ERROR: {str(e)}"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        resume_id = resume.id
        
        try:
            # Schedule the job
            scheduler.add_job(30, resume_id) 
            # process_resume.delay(resume_id)
            # result = process_resume(user_id)
            
            return Response(
                {
                    "status_code": status.HTTP_200_OK,
                    "success": True,
                    "message": "JOB_SCHEDULED_SUCCESSFULLY",
                    # "ai_response": result
                },
                status=status.HTTP_200_OK
            )
        
        except Exception as e:
            return Response(
                {
                    "status_code": status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "success": False,
                    "message": f"ERROR_SCHEDULING_JOB: {str(e)}"
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            
        
class GetResume(APIView):
    authentication_classes = [JWTAuthentication]


    def get(self, request, user_id, *args, **kwargs):
        try:
            # Retrieve data from Redis cache
            # redis_client = redis.Redis(host=settings.REDIS_HOST, port=settings.REDIS_PORT, db=settings.REDIS_DB)
            
            # # Debugging: Print the key being used to fetch from Redis
            # logging.info(f"Attempting to fetch key from Redis: {user_id}")
            
            # cached_resume = redis_client.get(user_id)

            # if cached_resume:
            #     # Print or log message indicating the file is coming from Redis
            #     logging.info("Getting the resume from Redis")
            #     response = HttpResponse(cached_resume, content_type='application/pdf')
            #     response['Content-Disposition'] = f'attachment; filename="{user_id}.pdf"'
            #     return response

            # Initialize the MongoDB client and connect to the database if resume is not cached
            client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
            db = client[settings.DATABASES['default']['NAME']]

            # Access the collection where resumes are stored
            resume_collection = db['candidate_resume']

            # Query the document based on the candidate ID
            document = resume_collection.find_one({'candidate': user_id}, sort=[('upload_timestamp', pymongo.DESCENDING)])

            if document is None:
                response={
                    "status_code":status.HTTP_404_NOT_FOUND,
                    "success": False,
                    "data":None,
                    "message": "RESUME_NOT_FOUND"
                }
                return Response(response, status=status.HTTP_404_NOT_FOUND)
                #return HttpResponse('Resume_Not_Found', status=status.HTTP_404_NOT_FOUND, content_type='text/plain')

            # Access the filename and file ID from the document
            filename = document.get('filename')
            file_id = document.get('file')

            # Initialize GridFS and retrieve the resume file
            fs = gridfs.GridFS(db)
            resume_file = fs.get(ObjectId(file_id))

            # Read the resume file content as binary
            file_content = resume_file.read()

            # Cache the file content in Redis
            # redis_client.set(user_id, file_content)
            # logging.info(f"Stored resume in Redis with key: {user_id}")

            # Construct the response with the resume file content
            response = HttpResponse(file_content, content_type='application/pdf')
            response['Content-Disposition'] = f'inline; filename="{filename}"'
            logging.info(f"Response headers: {response.headers}")

            # Print or log message indicating the file is coming from MongoDB
            logging.info('Getting the resume from MongoDB')
            return response
            
        

        except gridfs.errors.NoFile:
            response={
                    "status_code":status.HTTP_404_NOT_FOUND,
                    "success": False,
                    "data":None,
                    "message": "NO_FILE_FOUND"
                }
            return Response(response, status=status.HTTP_404_NOT_FOUND)
            #return HttpResponse('No_file_found', status=status.HTTP_404_NOT_FOUND, content_type='text/plain')

        except Exception as e:
            response={
                    "status_code":status.HTTP_500_INTERNAL_SERVER_ERROR,
                    "success": False,
                    "data":None,
                    "message": {str(e)}
                }
            return Response(response, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        


client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
db = client[settings.DATABASES['default']['NAME']]
collection = db['jobs']

class UpdateJobStatus(APIView):
    authentication_classes = [JWTAuthentication]
    
    def post(self, request):
        job_id = request.data.get('job_id')
        new_status = request.data.get('new_status')
        
        
        job = collection.find_one({'_id' : job_id})
        
        if job:
            if job['status'] in ['completed', 'timeout']:
                return Response('Cannot update job status. Job is terminated.', status=status.HTTP_400_BAD_REQUEST, content_type='text/plain')
            if new_status in ['completed', 'error']:
                collection.update_one({'_id':job_id}, {'$set':{'status': new_status}})
                schedular = JobScheduler()
                schedular.remove_job(job)
                response = {
                    "status_code":status.HTTP_200_OK,
                    "success": True,
                    "data":{'_id' : job_id},
                    "message": "STATUS_UPDATED_SUCCESSFULLY"
                }
                return Response(response, status=status.HTTP_200_OK)
        response = {
                    "status_code":status.HTTP_404_NOT_FOUND,
                    "success": False,
                    "data":{'_id' : job_id},
                    "message": "JOB_NOT_FOUND"
                }    
        return Response(response, status=status.HTTP_404_NOT_FOUND)
    
    
class Upload_profile_picture(APIView):
    
    authentication_classes = [JWTAuthentication]
    
    def post(self, request):
        
        serializer = ProfilePictureSerializer(data=request.data, context={'user_id': request.user.id})
        
        if serializer.is_valid():
            # Save the ProfilePicture instance
            profile_picture = serializer.save()
            
            # Call the background removal task directly
            remove_bg(request.user.id)
            
            return Response({
                'Status_code': status.HTTP_201_CREATED,
                'Success': True,
                'Data': f'/api/get_profile_picture/{request.user.id}/',
                'message': 'Photo uploaded successfully, background removal in progress.',
                
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    
class Profile_Picture_Retrieve(APIView):
    authentication_classes = [JWTAuthentication]
    """
    API endpoint to retrieve the processed profile photo.
    """
    def get(self, request, user_id, *args, **kwargs):
        try:
            #fetching user instance
            user = User.objects.get(candidate_id=user_id)
            
            # Fetch the ProfilePhoto instance by ID
            profile_picture = ProfilePicture.objects(candidate=user).first()
            
            if profile_picture.processed_picture:
                # Return the processed image
                return HttpResponse(profile_picture.processed_picture, content_type='image/png')
            else:
                return Response({
                    'Status':status.HTTP_200_OK,
                    'Success':True, 
                    'Data':None,
                    'message': 'Image is still being processed or something went wrong.'
                    })
        
        except ProfilePicture.DoesNotExist:
            return Response({               
                'Status':status.HTTP_404_NOT_FOUND,
                'Success': False,
                'Data':None,
                'Message': 'Profile photo not found.'
                })



class Chart_Data_API(APIView):
    authentication_classes = [JWTAuthentication]

    def get(self, request, user_id):
        try:
            # Fetch candidate skill data from MongoDB
            candidate_skills = CandidateSkills.objects(candidate_id=user_id).first()

            if not candidate_skills:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "No skills data found for this candidate."
                }, status=status.HTTP_404_NOT_FOUND)

            total_years_of_experience = candidate_skills.total_years_of_experience
            total_experience_months = total_years_of_experience * 12
            skills_with_months = {}
            logging.info(f"total_experience_months{total_experience_months}")

            # Combine skills from different categories
            for category in ['cloud_technologies', 'framework', 'tools', 'programming_languages']:
                category_skills = getattr(candidate_skills, category, {})
                skills_with_months.update(category_skills)

            # Ensure we have at least 6 unique skills for the graph
            selected_skills = random.sample(list(skills_with_months.keys()), min(6, len(skills_with_months)))
            labels = []
            dataset = []
            dataset_2 = []

            # Calculate scores and grading for each selected skill based on the experience data
            for skill in selected_skills:
                months_of_experience = skills_with_months.get(skill, 0)
                score, grade = self.calculate_skill_score_and_grade(months_of_experience, total_experience_months, total_years_of_experience)

                # Append the skill name with its grade and the corresponding score
                labels.append(f"{skill} ")
                dataset.append(score)

            # Prepare the response data in the specified chart format
            data = {
                "labels": labels,
                "datasets": [
                    {
                        "label": 'Candidate Skill Scores',
                        "data": dataset,
                        "fill": True,
                        "backgroundColor": 'rgba(54, 162, 235, 0.2)',
                        "borderColor": 'rgb(54, 162, 235)',
                        "pointBackgroundColor": 'rgb(54, 162, 235)',
                        "pointBorderColor": '#fff',
                        "pointHoverBackgroundColor": '#fff',
                        "pointHoverBorderColor": 'rgb(54, 162, 235)',
                    },
                    {
                    "label": 'My Second Dataset',
                    "data": dataset_2,
                    "fill": True,
                    "backgroundColor": 'rgba(54, 162, 235, 0.2)',
                    "borderColor": 'rgb(54, 162, 235)',
                    "pointBackgroundColor": 'rgb(54, 162, 235)',
                    "pointBorderColor": '#fff',
                    "pointHoverBackgroundColor": '#fff',
                    "pointHoverBorderColor": 'rgb(54, 162, 235)',
                    }
                ]
            }

            return Response({
                'status': status.HTTP_200_OK,
                'success': True,
                'data': data,
                'message': 'Skill chart data retrieved successfully.'
            }, status=status.HTTP_200_OK)

        except Exception as e:
            logging.error(f"Internal Server Error: {str(e)}")
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def calculate_skill_score_and_grade(self, months_of_experience, total_experience_months, total_years_of_experience):
        """
        Calculate the skill score and assign a grade based on months of experience
        relative to total experience, with adjustments for career stage.
        """
        # Convert months to a relative score based on total experience
        skill_relative_score = (months_of_experience / total_experience_months) * 100 if total_experience_months > 0 else 0

        # Apply career-stage weighting based on total years of experience
        if total_years_of_experience <= 3:
            weighted_score = skill_relative_score * 1.1  # Early-career
        elif total_years_of_experience <= 7:
            weighted_score = skill_relative_score * 1.5  # Mid-career
        else:
            weighted_score = skill_relative_score * 2  # Senior-career

        # Ensure the score does not exceed 100
        weighted_score = min(weighted_score, 100)

        # Determine the grade based on the weighted score
        if weighted_score >= 85:
            grade = "Expert"
        elif weighted_score >= 65:
            grade = "Proficient"
        elif weighted_score >= 45:
            grade = "Intermediate"
        else:
            grade = "Beginner"

        logging.info(f"Skill: {months_of_experience} months, Score: {round(weighted_score, 2)}, Grade: {grade}")
        return round(weighted_score, 2), grade
        
        
        # Randomly select 7 unique labels from POSSIBLE_LABEL
        # labels= random.sample(possible_labels,6)
        
        # # Generate two sets of random data, each having values between 0 and 100
        # dataset_1 = [random.randint(0,100) for _ in range(6)]
        # dataset_2 = [random.randint(0,100) for _ in range(6)]
        
        
        # #generating response
        # data = {
        #     "labels": labels,
        #     "datasets": [
        #         {
        #             "label": 'My First Dataset',
        #             "data": dataset_1,
        #             "fill": True,
        #             "backgroundColor": 'rgba(255, 99, 132, 0.2)',
        #             "borderColor": 'rgb(255, 99, 132)',
        #             "pointBackgroundColor": 'rgb(255, 99, 132)',
        #             "pointBorderColor": '#fff',
        #             "pointHoverBackgroundColor": '#fff',
        #             "pointHoverBorderColor": 'rgb(255, 99, 132)',
        #         },
                # {
                #     "label": 'My Second Dataset',
                #     "data": dataset_2,
                #     "fill": True,
                #     "backgroundColor": 'rgba(54, 162, 235, 0.2)',
                #     "borderColor": 'rgb(54, 162, 235)',
                #     "pointBackgroundColor": 'rgb(54, 162, 235)',
                #     "pointBorderColor": '#fff',
                #     "pointHoverBackgroundColor": '#fff',
                #     "pointHoverBorderColor": 'rgb(54, 162, 235)',
                # }
        #     ]
        # }
        
        # return Response(data)
    
load_dotenv()

# Get the OpenAI API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")
if not openai_api_key:
    raise ValueError("OpenAI API key not found. Please set it in your .env file.")

# Initialize the LLM model using Langchain
llm = ChatOpenAI(model_name="gpt-4o-mini", openai_api_key=openai_api_key)

class Collate(APIView):
    authentication_classes = [JWTAuthentication]



    # Function to extract text from a PDF
    def extract_text_from_pdf(self, pdf_binary):
        try:
            reader = PdfReader(io.BytesIO(pdf_binary))  # Using BytesIO to handle binary content
            text = ''
            for page in reader.pages:
                text += page.extract_text() or ""  # Safeguard against None
            return text.strip() if text.strip() else None  # Return None if text is empty
        except Exception as e:
            logging.error(f"Error reading PDF: {e}")
            return None

    # Function to extract the experience section from the resume text
    def extract_experience_section(self, text):
        match = re.search(r'\b(EXPERIENCE|Work Experience|Work experience|WORK PROFICIENCY|PROFESSIONAL EXPERIENCE|Professional Experience|Projects|PROJECTS|PROJECT|EXPERIENCE|EMPLOYMENT DETAILS)\b', text, re.IGNORECASE)

        if not match:
            return None  # Return None if the "experience" section is not found

        start = match.start()
        experience_section = text[start:]

        # Stop extraction at the next major section
        section_end = re.search(r'\b(CERTIFICATES|CERTIFICATIONS|TECHNICAL SKILLS|ACHIEVEMENTS|EDUCATION)\b', experience_section, re.IGNORECASE)
        if section_end:
            experience_section = experience_section[:section_end.start()]

        return experience_section.strip()
    
    def extract_education_section(self, text):
    # Find the starting position of the "Education" section
        match = re.search(r'\b(EDUCATION|Education|Academic Background|QUALIFICATIONS|Studies|EDUCATIONAL QUALIFICATION|EDUCATIONAL CREDENTIALS)\b', text, re.IGNORECASE)
        
        if not match:
            return None  # Return None if the "education" section is not found

        start = match.start()
        education_section = text[start:]

        # Stop extraction at the next major section
        section_end = re.search(r'\b(CERTIFICATES|CERTIFICATIONS|SKILLS|ACHIEVEMENTS|EXPERIENCE)\b', education_section, re.IGNORECASE)
        if section_end:
            education_section = education_section[:section_end.start()]

        return education_section.strip()
    
    def extract_achievements_section(self, text):
        """
        Extracts text from the 'Achievements' section of the resume.
        """
        # Define a regex pattern to find the 'Achievements' heading
        # and capture all content until the next major heading
        pattern = re.compile(
            r"(Achievements|Awards|Accomplishments)[\s\S]*?(?=\n[A-Z][a-z]+\s*|$)", 
            re.IGNORECASE
        )

        # Search for the pattern in resume_text
        match = pattern.search(text)
        
        if match:
            achievements_text = match.group()
            return achievements_text
        else:
            logging.info("No 'Achievements' section found in resume.")
            return None  # Return None if no 'Achievements' section is found
        
    def extract_certificate_section(self, text):
        """
        Extracts text from the 'certificate' section of the resume.
        """
        # Define a regex pattern to find the 'Achievements' heading
        # and capture all content until the next major heading
        pattern = re.compile(
            r"(certificate|certificates|CERTIFICATE|CERTIFICATES|CERTIFICATIONS|certifications)[\s\S]*?(?=\n[A-Z][a-z]+\s*|$)", 
            re.IGNORECASE
        )

        # Search for the pattern in resume_text
        match = pattern.search(text)
    
        if match:
            certificate_text = match.group()
            logging.info(f"certificate_text:{certificate_text}")
            return certificate_text.strip()
            
        else:
            logging.info("No 'certificate' section found in resume.")
            return None  # Return None if no 'certificate' section is found
        

    # Function to extract skills from the experience section using the LLM
    def extract_experience_skills(self, experience_text):
        if not experience_text:
            return {"error": "No experience section found in the resume."}

        try:
            # Define the prompt using Langchain's prompt template
            prompt = ChatPromptTemplate.from_template(
                '''
                Extract the following information from the experience section in JSON format with consistent structure, regardless of the content. Ensure the following keys are always present:

                - "total_years_of_experience": Overall experience that a candidate is having in their career.
                - "domain": Give the domain of the candidate as per the overall skills of the candidate.
                - "projects": A list of projects. Each project should have:
                    - "project_name": Name of the project.
                    - "JobRole": Role in the project.
                    - "framework": The framework(s) used (e.g., React, Django). Default to "N/A" if not applicable.
                    - "programming_language": The programming language(s) used (e.g., Python, C++). Default to "N/A" if not applicable.
                    - "tools": The tools used (e.g., Git, Docker) also add the database in this(like Mongodb, MySQL). Default to "N/A" if not applicable.
                    - "database": The database used, if any. Default to "N/A" if not applicable.
                    - "cloud_technology": Cloud technology used in the projects like AWS, GCP, if any. Default to "N/A" if not applicable.
                    - "time": Time spent on the project in months. (only numbers in months)

                Ensure the JSON structure is maintained even if some fields are missing. And do not give any other details or explanation

                Here is the experience section:
                {experience_text}
                '''
            )

            # Format the prompt with the provided experience text
            formatted_prompt = prompt.format(experience_text=experience_text)

            # Call the LLM using the new method (invoke)
            response = llm.invoke(formatted_prompt)  # Use 'invoke' instead of __call__

            # Get the content from the response
            return response.content  # Extract the actual message content

        except Exception as e:
            logging.error(f"Error during LLM call: {e}")
            return {"error": f"Error during LLM call: {e}"}
        
        
    def extract_job_details(self, experience_text):
        try:
            # Define the prompt for extracting job details
            prompt = ChatPromptTemplate.from_template(
                '''
            Parse the given text to extract all job details without taking the project into consideraion of the candidate  and return in JSON format with consistent structure, regardless of the content
                the following fields:

                        - Comapany Name
                        - Position
                        - date/time in string(get the months in name not in number)
                        - location
                        
                        And do not give any other details or explanation

                {experience_text}
                '''
        )

            # Format the prompt with the provided experience text
            formatted_prompt = prompt.format(experience_text=experience_text)

            # Call the LLM for job details
            response = llm.invoke(formatted_prompt)

            # Extract the JSON content from the response
            return response.content

        except Exception as e:
            logging.error(f"Error during LLM call for job details: {e}")
            return {"error": f"Error during LLM call: {e}"}
        
    def extract_education_details(self, education_text):
        if not education_text:
            return {"error": "No education section found in the resume."}
        
        try:
            prompt = ChatPromptTemplate.from_template(
            '''
            Parse the given education text to extract only one latest educational information and return a JSON object containing 
                the following fields:
                    
                        - Institution
                        - Tier : In which tire of city the institute in based of(Example tire 1, tire 2)
                        - Degree
                        - CGPA
                        - Year of course end
                        
                        And do not give any other details or explanation
                        
                Here is the education section:
                {education_text}
                '''    
            )
            
            formatted_prompt = prompt.format(education_text=education_text)
            
            response = llm.invoke(formatted_prompt)
            
            return response.content
        
        except Exception as e:
            logging.error(f"Error during LLM call for education details: {e}")
            return {"error": f"Error during LLM call: {e}"}
        
        
    def extract_summary(self, total_text):
        try:
        # Define the prompt for generating a summary of the entire resume
            prompt = ChatPromptTemplate.from_template(
                '''
                Summarize the following resume in 2-3 sentences, highlighting key skills, , and abilities and experience without specifing any number of years he has work. Focus on major achievements, core skills, and relevant experiences. Here is the resume text:.

                {total_text}
                '''
            )

            # Format the prompt with the full resume text
            formatted_prompt = prompt.format(total_text=total_text)

            # Call the LLM with the formatted prompt
            summary = llm.invoke(formatted_prompt)

            # Get the content from the response (AIMessage)
            return summary.content

        except Exception as e:
            return f"Error generating resume summary: {e}"
        
    
    def extract_achievements(self, achievements_text):
        try:
            # Define the prompt to extract achievements
            prompt = ChatPromptTemplate.from_template(
                '''
                Extract all achievements written in the resume with a consistent structure without any additional text as given:
                
                example:[
    "Winner of Postman API track in HacktoSkill Online Hackathon (25+ teams participated)",
    "Winner under SID-SET 2023 at IDEA-FEST 2023 sponsored by AICT DSIR (out of 25+ teams)"
]

                

                {achievements_text}
                '''
            )

            # Format the prompt
            formatted_prompt = prompt.format(achievements_text=achievements_text)

            # Call the LLM to process the achievements
            achievement_response = llm.invoke(formatted_prompt)
            
            # Process the response to return a list of achievements
            # Process the response to return a list of achievements
            achievements = achievement_response.content.strip("[]")  # Strip the outer brackets

        # Split by commas and clean up each item
            achievements = [
                item.strip().strip('"').strip("'")  # Remove extra quotes and spaces
                for item in achievements.split(",")
                if item.strip()  # Only include non-empty items
            ]

        # If no achievements are extracted, return an appropriate message
            return achievements if achievements else None

        except Exception as e:
            logging.error(f"Error extracting achievements: {e}")
            return None
    
    
    def extract_certificate(self, certificate_text):
        try:
            # Log the certificate text to see the input
            logging.info(f"Certificate Text: {certificate_text}")
            
            # Define the prompt to extract certifications
            prompt = ChatPromptTemplate.from_template(
                '''
                Analyze the following certification section from a resume and extract structured information in a json format with consistent structure.
                Include details such as:
                - Certification name
                - Issuing organization



                Certification Section:
                    {certificate_text}
                '''
            )

            # Format the prompt with certificate text
            formatted_prompt = prompt.format(certificate_text=certificate_text)
            

            # Call the LLM to process the achievements
            certificate_response = llm.invoke(formatted_prompt)
            

            # Extract and return the certificate data
            if certificate_response and hasattr(certificate_response, 'content'):
                certificate_date = certificate_response.content
                logging.info(f"Extracted Certificate Data: {certificate_date}")
                return certificate_date
            else:
                logging.warning("No valid certificate data found in the response.")
                return None

        except Exception as e:
            logging.error(f"Error extracting certificate: {e}")
            return None
            
    def suggest_certifications(self, experience_text):
        # """Suggest relevant certifications based on experience with improved accuracy."""
        try:
            prompt = ChatPromptTemplate.from_template("""
                Based on the provided professional experience, suggest atleast 5 relevant certifications in json foramte  with consistent structure without any additional content and heading just the json.
                Consider:
                1. Current skill level and experience
                2. Career progression and potential growth areas
                3. Industry-standard certifications
                4. Both technical and professional certifications
                
                            "name": "Certification name",
                            "issuer": "Certification provider",
                            "level": "Beginner/Intermediate/Advanced",
                            "relevance_score": 1-10,
                            "link": "Official certification URL"
                        

                Experience Data:
                {experience_text}
            """)

            # print(prompt.format(experience_data=json.dumps(experience_data)))
            formatted_prompt = prompt.format(experience_text=experience_text)

                # Call the LLM to process the achievements
            suggest_certificate_response = llm.invoke(formatted_prompt)
            
            suggested_data = suggest_certificate_response.content
            return suggested_data
        
        except Exception as e:
            logging.error(f"Error extracting certificate: {e}")
            return None
        
        
    def save_job_details_to_db(self, user_id, job_details):
        try:
        # Parse job_details if it's a JSON string
            if isinstance(job_details, str):
                logging.info("Converting job_details from JSON string to dictionary.")
                job_details = json.loads(job_details)

            # Initialize the job_details_list for consistent processing
            job_details_list = []

            # Handle different possible structures of job_details
            if isinstance(job_details, dict):
                if "job_details" in job_details:
                    job_details_list = job_details.get("job_details" or "Jobs", [])
                else:
                    job_details_list = [job_details]  # Single job entry
            elif isinstance(job_details, list):
                job_details_list = job_details
            else:
                logging.error("Invalid JSON format in job details.")
                return {"error": "Invalid JSON format in job details."}

            # Fetch the resume document
            resume = Resume.objects.get(candidate=user_id)

            # Retrieve or create the CandidateWorkExperience entry
            candidate_job = CandidateWorkExperience.objects(resume=resume).first()

            # Extract fields to be saved, ensuring they are non-empty
            companies = [job.get("Company Name") if job.get("Company Name") else "None" for job in job_details_list]
            positions = [job.get("Position") if job.get("Position") else "None" for job in job_details_list]
            dates = [job.get("date/time") if job.get("date/time") else "None" for job in job_details_list]
            locations = [job.get("location") if job.get("location") else "None" for job in job_details_list]


            # Log the extracted lists for verification
            logging.info(f"Companies: {companies}, Positions: {positions}, Dates: {dates}, Locations: {locations}")

            if candidate_job:
                # Update the existing document with the new lists
                candidate_job.company_name = companies
                candidate_job.position = positions
                candidate_job.date_time = dates
                candidate_job.location = locations
                candidate_job.save()
                logging.info("Existing job entry updated in DB.")
            else:
                # Create a new document if none exists
                candidate_job = CandidateWorkExperience(
                    resume=resume,
                    candidate_id=user_id,
                    company_name=companies,
                    position=positions,
                    date_time=dates,
                    location=locations
                )
                candidate_job.save()
                logging.info("New job entry created in DB.")

        except json.JSONDecodeError as e:
            logging.error(f"Failed to parse job_details JSON: {e}")
            return {"error": f"JSON parsing error: {e}"}
        except Exception as e:
            logging.error(f"Error saving job details to DB: {e}")
            return {"error": f"Error saving to DB: {e}"}

    def save_education_detail_to_db(self, user_id, education_detail):
        try:
            # Convert JSON string to dictionary if necessary
            if isinstance(education_detail, str):
                logging.info("Converting education_detail from JSON string to dictionary.")
                education_detail = json.loads(education_detail)

            # Make sure we're always working with a list for consistent processing
            education_list = []
            if isinstance(education_detail, dict):
                education_list = [education_detail]  # Wrap single entry in a list
            elif isinstance(education_detail, list):
                education_list = education_detail
            else:
                logging.error("Invalid JSON format in education details.")
                return {"error": "Invalid JSON format in education details."}

            # Fetch the resume document
            resume = Resume.objects.get(candidate=user_id)

            # Retrieve or create the CandidateEducation entry
            candidate_education = CandidateEducation.objects(resume=resume).first()

            # Extract fields to be saved as lists, converting all values to strings
            institutions = [str(edu.get("Institution", "")) for edu in education_list]
            degrees = [str(edu.get("Degree", "")) for edu in education_list]
            cgpas = [str(edu.get("CGPA", "")) for edu in education_list]  # Convert to strings
            end_dates = [str(edu.get("Year of course end", "")) for edu in education_list]  # Convert to strings

            if candidate_education:
                # Update the existing document
                candidate_education.institution_name = institutions
                candidate_education.degree = degrees
                candidate_education.cgpa = cgpas
                candidate_education.end_date = end_dates
                candidate_education.save()
                logging.info("Existing education entry updated in DB.")
            else:
                # Create a new document
                candidate_education = CandidateEducation(
                    resume=resume,
                    candidate_id=user_id,
                    institution_name=institutions,
                    degree=degrees,
                    cgpa=cgpas,
                    end_date=end_dates
                )
                candidate_education.save()
                logging.info("New education entry created in DB.")

        except json.JSONDecodeError as e:
            logging.error(f"Failed to parse education_details JSON: {e}")
            return {"error": f"JSON parsing error: {e}"}
        except Exception as e:
            logging.error(f"Error saving education details to DB: {e}")
            return {"error": f"Error saving to DB: {e}"}
        
    
    def save_education_detail_to_db(self, user_id, education_detail):
        try:
            # Convert JSON string to dictionary if necessary
            if isinstance(education_detail, str):
                logging.info("Converting education_detail from JSON string to dictionary.")
                education_detail = json.loads(education_detail)

            # Make sure we're always working with a list for consistent processing
            education_list = []
            if isinstance(education_detail, dict):
                education_list = [education_detail]  # Wrap single entry in a list
            elif isinstance(education_detail, list):
                education_list = education_detail
            else:
                logging.error("Invalid JSON format in education details.")
                return {"error": "Invalid JSON format in education details."}

            # Fetch the resume document
            resume = Resume.objects.get(candidate=user_id)

            # Retrieve or create the CandidateEducation entry
            candidate_education = CandidateEducation.objects(resume=resume).first()

            # Extract fields to be saved as lists, converting all values to strings
            institutions = [str(edu.get("Institution", "")) for edu in education_list]
            degrees = [str(edu.get("Degree", "")) for edu in education_list]
            cgpas = [str(edu.get("CGPA", "")) for edu in education_list]  # Convert to strings
            end_dates = [str(edu.get("Year of course end", "")) for edu in education_list]  # Convert to strings
            tier = [str(edu.get("Tier", "")) for edu in education_list]  # Convert to strings

            if candidate_education:
                # Update the existing document
                candidate_education.institution_name = institutions
                candidate_education.degree = degrees
                candidate_education.cgpa = cgpas
                candidate_education.end_date = end_dates
                candidate_education.tier = tier
                candidate_education.save()
                logging.info("Existing education entry updated in DB.")
            else:
                # Create a new document
                candidate_education = CandidateEducation(
                    resume=resume,
                    candidate_id=user_id,
                    institution_name=institutions,
                    degree=degrees,
                    cgpa=cgpas,
                    end_date=end_dates,
                    tier=tier
                )
                candidate_education.save()
                logging.info("New education entry created in DB.")

        except json.JSONDecodeError as e:
            logging.error(f"Failed to parse education_details JSON: {e}")
            return {"error": f"JSON parsing error: {e}"}
        except Exception as e:
            logging.error(f"Error saving education details to DB: {e}")
            return {"error": f"Error saving to DB: {e}"}
        
        
    def save_summary_to_db(self, user_id, summary_text):
        try:
            # Check if a summary already exists for the given resume and user
            resume = Resume.objects.get(candidate = user_id)
            
            candidate_summary = CandidateResumeSummary.objects(resume=resume).first()

            if candidate_summary:
                # Update the existing summary
                candidate_summary.summary = summary_text
                candidate_summary.save()
            else:
                # Create a new summary document
                CandidateResumeSummary(
                    resume=resume,
                    candidate_id=user_id,
                    summary=summary_text
                ).save()

            logging.info("Successfully saved or updated the summary in CandidateResumeSummary.")
            return {"success": True}
        except Exception as e:
            logging.error(f"Error saving resume summary: {e}")
            return {"error": f"Failed to save resume summary: {e}"}
        
    
    def save_achievements(self, user_id, achievements):
        try:
            # Retrieve or create the user resume document
            resume = Resume.objects.get(candidate=user_id)
            
            # Create or update the Achievements document linked to this resume
            candidate_achievements = Candidate_Achivement_Certificate.objects(resume=resume).first()

            if candidate_achievements:
                # Update existing achievements
                candidate_achievements.achievements_list = achievements or ["No achievements found"]
                candidate_achievements.save()
                logging.info("Achievements updated in the database.")
            else:
                # Create new achievements entry if none exists
                candidate_achievements = Candidate_Achivement_Certificate(
                    resume=resume,
                    candidate_id=user_id,
                    achievements_list=achievements or ["No achievements found"]
                )
                candidate_achievements.save()
                logging.info("New achievements entry saved in the database.")

            return {"success": True}
        except Exception as e:
            # Return an error message in case of failure
                return {"error": f"Failed to save achievements: {e}"}
                
        
        
    def save_certificate(self, user_id, certificate=None, suggestions=None):
        try:
            # Fetch the resume associated with the candidate
            resume = Resume.objects(candidate=user_id).first()
            if not resume:
                logging.error(f"No resume found for user {user_id}.")
                return {"error": "No resume found for this user."}

            # Fetching existing certificate data
            get_certificates = Candidate_Achivement_Certificate.objects(resume=resume).first()
            if not get_certificates:
                logging.warning(f"No certificate data found for user {user_id}.")
                return {"error": "No certificate data found."}

            # Extract certifications if available
            if certificate and isinstance(certificate, dict) and 'certifications' in certificate:
                certifications = certificate.get("certifications", [])
                certificate_names = [cert.get("certification_name", "") for cert in certifications]
                certificate_issuers = [cert.get("issuing_organization", "") for cert in certifications]

                get_certificates.certificate_name = certificate_names
                get_certificates.certificate_issuer = certificate_issuers
            else:
                get_certificates.certificate_name = []
                get_certificates.certificate_issuer = []

            # Handling suggested certificates if any
            if suggestions and isinstance(suggestions, list):
                
                logging.info(f"suggestion in function: {suggestions}")

                get_certificates.suggested_certificate_name = [cert.get("name", "") for cert in suggestions]
                get_certificates.suggested_certificate_issuer = [cert.get("issuer", "") for cert in suggestions]
                get_certificates.suggested_certificate_link = [cert.get("link", "") for cert in suggestions]
                get_certificates.suggested_certificate_level = [cert.get("level", "") for cert in suggestions]
                get_certificates.suggested_certificate_relevent_score = [str(cert.get("relevance_score", "")) for cert in suggestions]
            else:
                get_certificates.suggested_certificate_name = []
                get_certificates.suggested_certificate_issuer = []
                get_certificates.suggested_certificate_link = []
                get_certificates.suggested_certificate_level = []
                get_certificates.suggested_certificate_relevent_score = []


            # Debug: Check certificate data before saving
            logging.info(f"Certificate data before save: {get_certificates.to_mongo()}")

            # Save the updated document
            get_certificates.save()

            logging.info("Certificate data saved successfully.")
            return {"status": "success", "message": "Certificate data saved successfully."}

        except Exception as e:
            logging.error(f"Error saving certificate data: {e}")
        
            return {"error": f"Error saving certificate data: {str(e)}"}
            
    def valid_value(self, value):
            return value and value != "N/A" and value != "Not specified"
        
    # Function to collate experience data
    def collate_experience_data(self, user_id):
            final_json = {
                "JobRoles": [],
                "Frameworks": defaultdict(int),
                "ProgrammingLanguages": defaultdict(int),
                "Tools": defaultdict(int),
                "CloudTechnologies": defaultdict(int),
                # "TimeSpent": [],
                "TotalYearsOfExperience": 0,
                "Domain": None
            }

            try:
                # Retrieve the resume, user from MongoDB using user_id
                resume = Resume.objects.get(candidate=user_id)
                user = User.objects.get(candidate_id=user_id)

                # Connect to MongoDB and GridFS to read the file
                client = MongoClient(settings.DATABASES['default']['CLIENT']['host'])
                db = client[settings.DATABASES['default']['NAME']]
                fs = gridfs.GridFS(db)

                try:
                    # Retrieve the binary data from GridFS
                    pdf_binary = fs.get(ObjectId(resume.file)).read()  # Convert string ID to ObjectId
                except Exception as e:
                    logging.error(f"Error retrieving PDF from GridFS: {e}")
                    return {"error": "Failed to retrieve the resume file."}

                # Extract text from the PDF
                extracted_text = self.extract_text_from_pdf(pdf_binary)

                if not extracted_text:
                    return {"error": "Failed to extract text from the PDF."}

                # Extract the experience/education/achievements section from the resume
                experience_section = self.extract_experience_section(extracted_text)
                education_section = self.extract_education_section(extracted_text)
                achievements_section = self.extract_achievements_section(extracted_text)
                certificate_section = self.extract_certificate_section(extracted_text)
                
                
                # Extract job details using the new prompt
                job_details_json = self.extract_job_details(experience_section)
                job_response = job_details_json
                
                achievements = self.extract_achievements(achievements_section)
            
                achievement_result = self.save_achievements(user_id, achievements)
                if achievement_result.get("error"):
                        logging.error("Error saving achievements.")
                
                certificate = self.extract_certificate(certificate_section)

                # Fallback to suggestion if certificate is empty or contains "certifications: []"
                if certificate and '"certifications": []' not in certificate:
                    # Certificate is present and doesn't contain an empty list, so proceed with it
                    json_content = certificate
                else:
                    # Either certificate is None or it's empty, so get suggestion
                    suggestion = self.suggest_certifications(experience_section)
                    json_content = suggestion

                # Log the content of json_content for debugging
                logging.info(f"JSON Content Before Parsing: {json_content}")

                # Verify json_content is not empty or just whitespace before parsing
                if not json_content or not json_content.strip():
                    logging.error("No JSON content available for parsing.")
                    return {"error": "No JSON content available for parsing."}

                # Clean up JSON markers if they exist
                if json_content.startswith("```json"):
                    json_content = json_content[8:].strip("```").strip()  # Remove markdown-style markers

                try:
                    # Attempt to parse JSON data from certificate or suggestion
                    data = json.loads(json_content)
                    if not data:
                        logging.error("Parsed JSON data is empty.")
                        return {"error": "Parsed JSON data is empty."}

                except json.JSONDecodeError as e:
                    logging.error(f"Error: Unable to parse JSON from the certificate LLM output: {e}")
                    return {"error": "Invalid JSON format in the certificate data."}


                # Log the data to be saved
                logging.info(f"Data to be saved: {data}")

                # If the certificate is None or empty, save it as None
                if certificate is None or '"certifications": []' in certificate:
                    certificate_save = self.save_certificate(user_id, certificate=None, suggestions=data)
                    logging.info(f"certificate_save:{certificate_save}")
                else:
                    certificate_save = self.save_certificate(user_id, certificate=data)
                    logging.info(f'certificate_save:{certificate_save}')

                # Check if certificate_save is None
                if certificate_save is None:
                    logging.error("Certificate save operation returned None.")
                    return {"error": "Failed to save certificate data."}

                # Check if there is an error in the response (e.g., if certificate_save contains 'error' key)
                if isinstance(certificate_save, dict) and "error" in certificate_save:
                    logging.error(f"Error saving certificate data: {certificate_save['error']}")
                    return certificate_save

                logging.info("Certificate data saved successfully.")
                                        

                # Extract the skills as JSON using the LLM
                skills_json = self.extract_experience_skills(experience_section)

                # Process the LLM response
                response_content = skills_json  # Assume this is the response from your LLM extraction method
                
                education_detail_json = self.extract_education_details(education_section)
                
                summary_text = self.extract_summary(extracted_text)
                summary_result = self.save_summary_to_db(user_id, summary_text)
                if summary_result.get("error"):
                    logging.error("Error saving resume summary.")
                    
                

                # Log the LLM response for debugging
                logging.info(f"LLM Response Content: {response_content}")
                logging.info(f"LLM Response Content: {job_response}")
                logging.info(f"LLM Response Content: {education_detail_json}")
                logging.info(f"LLM Response Content: {summary_text}")
                logging.info(f"LLM Response Content: {achievements}")
                logging.info(f"LLM Response Content: {certificate}")
                #logging.info(f"LLM Response Content: {suggestation}")

                # Attempt to parse the JSON content
                try:
                    if response_content.startswith("```json"):
                        response_content = response_content[8:].strip("```").strip()  # Remove the code block markers

                    # Attempt to load the JSON
                    data = json.loads(response_content)
                    
                except Exception as e:
                    logging.error(f"Error: Unable to parse skills JSON from the LLM output {e}.")
                    return {"error": "Invalid JSON format in the skills data."}
                
                try:
                    if job_response.startswith("```json"):
                        job_response = job_response[8:].strip("```").strip()  # Remove code block markers

                    job_details = json.loads(job_response)
                except Exception  as e:
                    logging.error(f"Error: Unable to parse job details JSON.{e}")
                    return {"error": "Invalid JSON format in job details."}
                
                try:
                    if education_detail_json.startswith("```json"):
                        education_detail_json = education_detail_json[8:].strip("```").strip()

                    education_data = json.loads(education_detail_json)
                except Exception as e:
                    logging.error(f"Error: Unable to parse education JSON{e}.")
                    return {"error": "Invalid JSON format in the education data."}

                # Check if data is valid
                if not isinstance(data, dict):
                    return {"error": "Invalid skills data."}
                
                # Save job details to the DB
                save_result = self.save_job_details_to_db(user_id, job_details)
                if save_result is not None and "error" in save_result:
                    return save_result

                    {"message": "Job details extracted and saved successfully."}
                    
                save_education = self.save_education_detail_to_db(user_id, education_detail=education_detail_json)
                if save_education is not None and "error" in save_education:
                    return save_education
                
                
                

                # Collate data and sum times for each skill
                total_time_spent_months = 0
                for entry in data.get("projects", []):
                    time_spent = entry.get("time", 0)
                    total_time_spent_months += time_spent

                    # If job roles are included in the entry, uncomment the following lines:
                    if self.valid_value(entry.get("JobRole")) and self.valid_value(entry.get("project_name")):
                        project_name = entry.get("project_name")
                        job_role = entry.get("JobRole")
                        final_json["JobRoles"].append(f"{project_name} - {job_role} - {time_spent} months")
                        
                    # Process Frameworks
                    if self.valid_value(entry.get("framework")):
                        framework = [lang.strip() for lang in entry["framework"].split(",")]
                        for language in framework:
                            final_json["Frameworks"][language] += time_spent
                            
                            
                    # Process programming languages
                    if self.valid_value(entry.get("programming_language")):
                        programming_languages = [lang.strip() for lang in entry["programming_language"].split(",")]
                        for language in programming_languages:
                            final_json["ProgrammingLanguages"][language] += time_spent

                    # Process tools
                    if self.valid_value(entry.get("tools")):
                        tools = [tool.strip() for tool in entry["tools"].split(",")]
                        for tool in tools:
                            final_json["Tools"][tool] += time_spent

                    # Process cloud technologies
                    if self.valid_value(entry.get("cloud_technology")):
                        cloud_techs = [cloud.strip() for cloud in entry["cloud_technology"].split(",")]
                        for cloud in cloud_techs:
                            final_json["CloudTechnologies"][cloud] += time_spent
                            
                    

                    # # Append the project name and time spent for output
                    # if self.valid_value(entry.get("project_name")):
                    #     final_json["TimeSpent"].append(f"{entry['project_name']} for {entry['time']} months")

                # Convert defaultdict to dict for final output
                final_json["Frameworks"] = dict(final_json["Frameworks"])
                final_json["ProgrammingLanguages"] = dict(final_json["ProgrammingLanguages"])
                final_json["Tools"] = dict(final_json["Tools"])
                final_json["CloudTechnologies"] = dict(final_json["CloudTechnologies"])
                final_json["TotalYearsOfExperience"] = total_time_spent_months // 12  # Convert to years
                
                if "domain" in data:
                    final_json["Domain"]= data["domain"]

               # Check if a CandidateSkills entry already exists
                candidate_skills = CandidateSkills.objects(resume=resume).first()

                if candidate_skills:
                    # If the entry exists, update it
                    candidate_skills.job_role = final_json["JobRoles"]
                    candidate_skills.framework = final_json["Frameworks"]
                    candidate_skills.programming_languages = final_json["ProgrammingLanguages"]
                    candidate_skills.tools = final_json["Tools"]
                    candidate_skills.cloud_technologies = final_json["CloudTechnologies"]
                    candidate_skills.total_years_of_experience = float(final_json["TotalYearsOfExperience"])
                    candidate_skills.domain = final_json["Domain"]
                    candidate_skills.save()
                else:
                    # If no entry exists, create a new one
                    candidate_skills = CandidateSkills(
                        candidate_id=user,
                        resume=resume,
                        job_role=final_json["JobRoles"],
                        framework=final_json["Frameworks"],
                        programming_languages=final_json["ProgrammingLanguages"],
                        tools=final_json["Tools"],
                        cloud_technologies=final_json["CloudTechnologies"],
                        total_years_of_experience=float(final_json["TotalYearsOfExperience"]),
                        domain = final_json["Domain"]
                    )
                    candidate_skills.save()

                    
                return final_json


            except Resume.DoesNotExist:
                return Response({"error": "Resume not found."}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                logging.error(f"Error in collate_experience_data: {e}", exc_info=True)
                return {"error": f"Internal Server Error: {e}"}

    def post(self, request, user_id):
        # Process the experience for the given user_id
        skills_json = self.collate_experience_data(user_id)

        # Return a JSON response
        return Response({
            'status': status.HTTP_201_CREATED,
            'success': True,
            'data': skills_json,
            'message': 'created & saved the skill json'
        }, status=status.HTTP_201_CREATED)
    
    
    
def get_top_skills(user_id):
    # Fetch the candidate profile data from MongoDB
    candidate_profile = CandidateSkills.objects(candidate_id=user_id).first()
    
    if not candidate_profile:
        return None  # or raise an error if needed

    # Combine all the skills from different categories into one dictionary
    skills = defaultdict(int)
    skills.update(candidate_profile.programming_languages)
    skills.update(candidate_profile.cloud_technologies)
    skills.update(candidate_profile.framework)
    skills.update(candidate_profile.tools)
    

    # Sort the skills by their values in descending order and pick the top 5
    sorted_skills = sorted(skills.items(), key=lambda x: x[1], reverse=True)[:5]

    # Return the top 5 skills
    top_skills = [skill for skill, value in sorted_skills]
    return top_skills

@api_view(['GET'])
def top_skills_view(request, user_id):
    # Call the function to get the top 5 skills for the given candidate
    top_skills = get_top_skills(user_id)
    
    if top_skills:
        return Response({
            'status': status.HTTP_201_CREATED,
            'success': True,
            'data': top_skills,
            'message': 'created top skill json'
        }, status=status.HTTP_201_CREATED)
    else:
        return Response({
            'status': status.HTTP_404_NOT_FOUND,
            'success': False,
            'message': 'candidate not found'
        }, status=status.HTTP_404_NOT_FOUND)
        

class CandidateDomain(APIView):
    def get(self, request, user_id=None):
        try:
            candidate_skill = CandidateSkills.objects(candidate_id = user_id).first()
            
            if candidate_skill.domain:
                return Response({
                    'status': status.HTTP_200_OK,
                    'success': True,
                    'data': candidate_skill.domain,
                    'message': 'Got the candidate domain'
                }, status=status.HTTP_200_OK) 
            else:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "Domain not available for this candidate."
                }, status=status.HTTP_404_NOT_FOUND)
        except CandidateSkills.DoesNotExist:
            return Response({"error": "Candidate skills data not found."}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class CandidateWorkExperiences(APIView):
    def get(self, request, user_id):
        
        
        try:
            # Retrieve the candidate's work experience
            candidate_work_experience = CandidateWorkExperience.objects(candidate_id=user_id).first()

            if candidate_work_experience:
                

            # Collect up to 2 experiences in a list
                experience_list = []
                for i in range(min(2, len(candidate_work_experience.company_name))):
                    experience_entry = {
                        "Company Name": candidate_work_experience.company_name[i],
                        "Position": candidate_work_experience.position[i],
                        "date/time": candidate_work_experience.date_time[i],
                        "location": candidate_work_experience.location[i],
                    }
                    experience_list.append(experience_entry)

                # Return the experience list
                return Response({
                        'status': status.HTTP_200_OK,
                        'success': True,
                        'data': experience_list,
                        'message': 'Got the candidate work experience'
                    }, status=status.HTTP_200_OK)
                
            else:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "Work Experience not available for this candidate."
                }, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)    
        

class CandidateEducationDetail(APIView):
    def get(self, request, user_id):
        try:
            # Fetch the CandidateEducation entry for the given user_id
            candidate_education = CandidateEducation.objects(candidate_id=user_id).first()
            
            if candidate_education:
                # Prepare the data to send in response
                data = {
                    "Institution": candidate_education.institution_name[0] if candidate_education.institution_name else None,
                    "Degree": candidate_education.degree[0] if candidate_education.degree else None,
                    "CGPA": None if candidate_education.cgpa and candidate_education.cgpa[0] == "None" else candidate_education.cgpa[0] if candidate_education.cgpa else None,
                    "Year of course end": None if candidate_education.end_date and candidate_education.end_date[0] == "None" else candidate_education.end_date[0] if candidate_education.end_date else None,
                    "Tier": None if candidate_education.tier and candidate_education.tier[0] == "None" else candidate_education.tier[0] if candidate_education.tier else None,
                }
                
                return Response({
                    'status': status.HTTP_200_OK,
                    'success': True,
                    'data': data,
                    'message': 'Got the candidate education'
                }, status=status.HTTP_200_OK)
            
            else:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "Education not available for this candidate."
                }, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class CandidateSummary(APIView):
    def get(self, request, user_id):
        
        try:
            candidate_summary = CandidateResumeSummary.objects(candidate_id = user_id).first()
            
            if candidate_summary:
                
                return Response({
                        'status': status.HTTP_200_OK,
                        'success': True,
                        'data': candidate_summary.summary,
                        'message': 'Got the candidate summary'
                    }, status=status.HTTP_200_OK)
            
            else:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "Summary not available for this candidate."
                }, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            

def fetch_candidate_data(user_id):
    
    candidate_skills = CandidateSkills.objects(candidate_id=user_id).first()
    if not candidate_skills:
        print(f"No skills data found for candidate ID: {user_id}")
        return None
    
    candidate_education = CandidateEducation.objects(candidate_id=user_id).first()
    if not candidate_education:
        print(f"No education data found for candidate ID: {user_id}")
        return None
    
    candidate_data = {
        "experience_years": candidate_skills.total_years_of_experience,
        "skills_acquired": len(candidate_skills.programming_languages) + len(candidate_skills.framework) + len(candidate_skills.tools),
        "degree": candidate_education.degree[0] if candidate_education.degree else "unknown",
        "tier": candidate_education.tier[0] if candidate_education.tier else "unknown",
        #"achievements": bool(candidate_skills.job_role)  # Assuming achievements if job roles/projects exist
    }
    
    return candidate_data

def grade_candidate(user_id):
    candidate_data = fetch_candidate_data(user_id)
    if not candidate_data:
        print(f"Unable to fetch data for candidate ID: {user_id}")
        return None
    
    score = calculate_candidate_score(candidate_data)
    print(f"Candidate ID: {user_id} | Score: {score}")
    return score


def calculate_candidate_score(candidate_data: Dict) -> float:
    """
    Calculate the candidate's profile score based on the grading algorithm.
    """
    # Define weightages for each factor
    weights = {
        "experience": 0.35,
        "skills": 0.30,
        "degree": 0.20,
        "tier": 0.15,
        # "achievements": 0.05
    }

    # Experience scoring
    experience_years = candidate_data['experience_years']
    if experience_years < 2:
        experience_score = 5
    elif 2 <= experience_years < 5:
        experience_score = 6
    elif 5 <= experience_years < 10:
        experience_score = 7
    elif 10 <= experience_years < 15:
        experience_score = 8
    else:
        experience_score = 9
        
    logging.info(F"experience_score:{experience_score}")

    # Skills scoring
    skills_acquired = candidate_data['skills_acquired']
    if experience_years <= 5:
        required_skills = 1.5 * experience_years
    elif experience_years <= 10:
        required_skills = 5 + 1.0 * (experience_years - 5)
    elif experience_years <= 15:
        required_skills = 10 + 0.5 * (experience_years - 10)
    else:
        required_skills = 12.5 + 0.25 * (experience_years - 15)

    if skills_acquired >= required_skills:
        skills_score = 10
    elif skills_acquired >= 0.8 * required_skills:
        skills_score = 9
    elif skills_acquired >= 0.6 * required_skills:
        skills_score = 8
    else:
        skills_score = 5
        
    logging.info(f"required_skills:{required_skills}")
    logging.info(f"skills_score:{skills_score}")

    # Degree scoring
    degree = candidate_data['degree'].lower()
    if degree in ['m.tech', 'masters in computer science', "master of science in computer science & technology"]:
        degree_score = 10
    elif degree in ['b.tech', 'bachelors in computer science']:
        degree_score = 9
    elif degree == 'mca':
        degree_score = 8
    elif degree in ['m.tech non-cs', 'masters non-cs']:
        degree_score = 7
    elif degree in ['b.tech non-cs']:
        degree_score = 6
    else:
        degree_score = 4
    
    logging.info(f"degree_score{degree_score}")

    # Institution scoring
    tier = candidate_data['tier'].lower()
    if tier == 'tier 1':
        tier_score = 10
    elif tier == 'tier 2':
        tier_score = 9
    elif tier == 'tier 3':
        tier_score = 7
    else:
        tier_score = 5
        
    logging.info(f"tier_score:{tier_score}")

    # Achievements scoring
    # achievements_score = 10 if candidate_data.get('achievements') else 0

    # Calculate total score based on weights
    total_score = (
        weights["experience"] * (experience_score / 10) +
        weights["skills"] * (skills_score / 10) +
        weights["degree"] * (degree_score / 10) +
        weights["tier"] * (tier_score / 10) 
        # weights["achievements"] * (achievements_score / 10)
    ) * 10  # Scale to out of 10

    logging.info(total_score)
    return round(total_score, 2)
    


class CandidateScore(APIView):
    def get(self, request, user_id):
        try:
            # Retrieve candidate's experience, skills, degree, institution, and achievements from the database
            candidate_skills = CandidateSkills.objects(candidate_id=user_id).first()
            candidate_education = CandidateEducation.objects(candidate_id=user_id).first()
            
            if candidate_skills and candidate_education:
                # Extracting the data for scoring
                candidate_data = {
                    "experience_years": candidate_skills.total_years_of_experience,
                    "skills_acquired": len(candidate_skills.framework) + len(candidate_skills.programming_languages) + len(candidate_skills.tools) + len(candidate_skills.cloud_technologies),
                    "degree": candidate_education.degree[0] if candidate_education.degree else "unknown",
                    "tier": candidate_education.tier[0] if candidate_education.tier else "unknown",
                    # "achievements": bool(candidate_skills.domain)  # Assuming achievements if there's a domain
                }
                
                # Calculate and save the score using your grading function
                score = calculate_candidate_score(candidate_data)
                candidate_skills.score = score
                candidate_skills.save()
                print(score)
                
                # Response with score data
                return Response({
                    'status': status.HTTP_200_OK,
                    'success': True,
                    'data': {
                        'candidate_id': user_id,
                        'score': candidate_skills.score
                    },
                    'message': 'Candidate score calculated successfully'
                }, status=status.HTTP_200_OK)
            
            else:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "Candidate data not found."
                }, status=status.HTTP_404_NOT_FOUND)
        
        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class CandidateAchievements(APIView):
    def get(self, request, user_id):
        
        try:
            candidate_achievement = Candidate_Achivement_Certificate.objects(candidate_id = user_id).first()
            
            if candidate_achievement:
                return Response({
                        'status': status.HTTP_200_OK,
                        'success': True,
                        'data': candidate_achievement.achievements_list,
                        'message': 'Got the candidate achievements'
                    }, status=status.HTTP_200_OK)
                
            else:
                return Response({
                    'status': status.HTTP_404_NOT_FOUND,
                    'success': False,
                    'message': "Achievements not available for this candidate."
                }, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
class GetCertificate(APIView):
    def get(self, request, user_id):
        try:
            # Fetch the candidate's certificate data by user_id
            candidate_certificate = Candidate_Achivement_Certificate.objects(candidate_id=user_id).first()

            # Check if candidate_certificate exists
            if candidate_certificate:
                response_data = []

                # Check if certificate_name exists in the retrieved document
                if candidate_certificate.certificate_name:  # If certificate exists
                    
                    name = candidate_certificate.certificate_name
                    issuer = candidate_certificate.certificate_issuer
                    # Add the certificate to the response data
                    for i in range(len(name)):
                        response_data.append({
                            "Certificate_name": f"{name[i]} by {issuer[i]}",
                        
                        })

                # If no certificate, check for suggested certificates
                if candidate_certificate.suggested_certificate_name:  # If suggestions exist
                    # Handle both single value and list of suggestions
                    suggested_names = candidate_certificate.suggested_certificate_name
                    suggested_issuers = candidate_certificate.suggested_certificate_issuer
                    suggested_links = candidate_certificate.suggested_certificate_link

                    for i in range(len(suggested_names)):
                        response_data.append({
                            "Certificate_name": f"{suggested_names[i]} by {suggested_issuers[i] if i < len(suggested_issuers) else 'Unknown'}",
                            "Certificate_url": suggested_links[i] if i < len(suggested_links) else 'No URL provided'
                        })

                # If response_data contains certificates or suggestions, return them
                if response_data:
                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "No certificate or suggestion found."}, status=status.HTTP_404_NOT_FOUND)

            else:
                return Response({"error": "Certificate data not found for this user."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": f"Internal Server Error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)