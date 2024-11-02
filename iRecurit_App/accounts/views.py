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
from datetime import datetime, timedelta
from datetime import timedelta, datetime
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
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

possible_labels = [
    'JavaScript', 'Python', 'Machine Learning', 'Cloud', 'Java', 'C++', 'Ruby', 
    'Django', 'NextJS', 'Shell scripting', 'Database', 'Docker', 'FastAPI', 'Go Lang'
]

class Chart_Data_API(APIView):
    authentication_classes = [JWTAuthentication]
    
    def get(self, request, *args, **kwargs):
        
        # Randomly select 7 unique labels from POSSIBLE_LABEL
        labels= random.sample(possible_labels,6)
        
        # Generate two sets of random data, each having values between 0 and 100
        dataset_1 = [random.randint(0,100) for _ in range(6)]
        dataset_2 = [random.randint(0,100) for _ in range(6)]
        
        
        #generating response
        data = {
            "labels": labels,
            "datasets": [
                {
                    "label": 'My First Dataset',
                    "data": dataset_1,
                    "fill": True,
                    "backgroundColor": 'rgba(255, 99, 132, 0.2)',
                    "borderColor": 'rgb(255, 99, 132)',
                    "pointBackgroundColor": 'rgb(255, 99, 132)',
                    "pointBorderColor": '#fff',
                    "pointHoverBackgroundColor": '#fff',
                    "pointHoverBorderColor": 'rgb(255, 99, 132)',
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
        
        return Response(data)
    
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
        match = re.search(r'\b(EXPERIENCE|Work Experience|Work experience|WORK PROFICIENCY|PROFESSIONAL EXPERIENCE|Professional Experience|Projects|PROJECTS|PROJECT|EXPERIENCE)\b', text, re.IGNORECASE)

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
        match = re.search(r'\b(EDUCATION|Education|Academic Background|QUALIFICATIONS|Studies)\b', text, re.IGNORECASE)
        
        if not match:
            return None  # Return None if the "education" section is not found

        start = match.start()
        education_section = text[start:]

        # Stop extraction at the next major section
        section_end = re.search(r'\b(CERTIFICATES|CERTIFICATIONS|SKILLS|ACHIEVEMENTS|EXPERIENCE)\b', education_section, re.IGNORECASE)
        if section_end:
            education_section = education_section[:section_end.start()]

        return education_section.strip()

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
                    - "tools": The tools used (e.g., Git, Docker). Default to "N/A" if not applicable.
                    - "database": The database used, if any. Default to "N/A" if not applicable.
                    - "cloud_technology": Cloud technology used in the projects like AWS, GCP, if any. Default to "N/A" if not applicable.
                    - "time": Time spent on the project in months. (only numbers in months)

                Ensure the JSON structure is maintained even if some fields are missing.

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
            Parse the given text to extract all job details without taking the project into consideraion of the candidate  and return a JSON object containing 
                the following fields:

                        - Comapany Name
                        - Position
                        - date/time in string(get the months in name not in number)
                        - location

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
                        - Degree
                        - CGPA
                        - Year of course end
                        
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
                    job_details_list = job_details.get("job_details", [])
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

                # Extract the experience section from the resume
                experience_section = self.extract_experience_section(extracted_text)
                education_section = self.extract_education_section(extracted_text)
                
                # Extract job details using the new prompt
                job_details_json = self.extract_job_details(experience_section)
                job_response = job_details_json
                

                # Extract the skills as JSON using the LLM
                skills_json = self.extract_experience_skills(experience_section)

                # Process the LLM response
                response_content = skills_json  # Assume this is the response from your LLM extraction method
                
                
                
                education_detail_json = self.extract_education_details(education_section)

                # Log the LLM response for debugging
                logging.info(f"LLM Response Content: {response_content}")
                logging.info(f"LLM Response Content: {job_response}")
                logging.info(f"LLM Response Content: {education_detail_json}")

                # Attempt to parse the JSON content
                try:
                    if response_content.startswith("```json"):
                        response_content = response_content[8:].strip("```").strip()  # Remove the code block markers

                    # Attempt to load the JSON
                    data = json.loads(response_content)
                    
                except json.JSONDecodeError or Exception as e:
                    logging.error("Error: Unable to parse skills JSON from the LLM output {e}.")
                    return {"error": "Invalid JSON format in the skills data."}
                
                try:
                    if job_response.startswith("```json"):
                        job_response = job_response[8:].strip("```").strip()  # Remove code block markers

                    job_details = json.loads(job_response)
                except json.JSONDecodeError or Exception  as e:
                    logging.error(f"Error: Unable to parse job details JSON.{e}")
                    return {"error": "Invalid JSON format in job details."}
                
                try:
                    if education_detail_json.startswith("```json"):
                        education_detail_json = education_detail_json[8:].strip("```").strip()

                    education_data = json.loads(education_detail_json)
                except json.JSONDecodeError:
                    logging.error("Error: Unable to parse education JSON.")
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

            if not candidate_work_experience:
                return Response({"error": "No work experience found for this candidate."}, status=status.HTTP_404_NOT_FOUND)

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
            return Response(experience_list, status=status.HTTP_200_OK)

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

