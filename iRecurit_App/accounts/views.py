from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
from .models import *
import random
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
import os
from django.shortcuts import redirect
from datetime import datetime, timedelta
from datetime import timedelta, datetime
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.contrib.sites.shortcuts import get_current_site


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
                    'email':user.candidate_email,
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
    #permission_classes  = [IsAuthenticated]
    
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
            #return HttpResponse(error_messages, status=status.HTTP_400_BAD_REQUEST, content_type='text/plain')
        
        
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