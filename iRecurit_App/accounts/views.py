from django.http import HttpResponse
from django.conf import settings
from django.shortcuts import render
from .models import *
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from .serializers import *
from rest_framework.response import Response
from rest_framework import status


from .authentication import JWTAuthentication
from rest_framework.views import APIView
#from django.utils.encoding import force_bytes, force_str, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode
from .helpers import generate_token
from .tasks import send_confirmation_email
from rest_framework.exceptions import AuthenticationFailed
#from rest_framework_simplejwt.tokens import RefreshToken
import jwt
import redis
from bson import ObjectId
#from rest_framework.authtoken.models import Token
import pymongo
from django.contrib.auth.tokens import default_token_generator
from rest_framework.parsers import MultiPartParser, FormParser
from .tasks import JobScheduler, start_job_scheduler
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render
import logging
import os

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
        
        #sending email to the user in bg
        send_confirmation_email(user,request)
        
        response_data = serializer.data
        response_data.pop('password', None)
        
        response = {
            "status_code": status.HTTP_201_CREATED,
            "success": True,
            "data": response_data,
            "message": "USER_REGISTERED_SUCCESSFULLY"
        }
        
        return Response(response, status=status.HTTP_201_CREATED)
        #return HttpResponse('User_registered_successfully', status=status.HTTP_201_CREATED, content_type='text/plain')
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
    
    
@api_view(['POST'])
@csrf_exempt
def login_view(request):
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        candidate_email = serializer.validated_data.get('candidate_email')
        # Optionally, you can retrieve the user object if needed
        user = User.objects.filter(candidate_email=candidate_email).first()
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
            "message": "LOGIN_SUCCESSFUL"
        }
        #response = Response({'message':'Login_successful', 'access_token': access_token, 'refresh_token':refresh_token, 'user_id':user.id}, status=status.HTTP_200_OK)
        response= Response(response_data, status=status.HTTP_200_OK)
        response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True)
        return response
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
    
class ExampleAPIView(APIView):
    authentication_classes = [JWTAuthentication]  # Apply JWTAuthentication to this API vie
    #permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access this view

    def get(self, request, *args, **kwargs):
        user = request.user  # Retrieve authenticated user
        return Response({'message': f'Hello, {user.candidate_email}!'})


def activate_user(request, uidb64, token):
    try:
        uid = urlsafe_base64_decode(uidb64).decode()
        user = User.objects.get(pk=uid)
    except (TypeError, ValueError, OverflowError, User.DoesNotExist):
        user = None

    if user and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        # Redirect to a success page or display a success message
        return render(request, 'activation_success.html')
    else:
        # Activation link is invalid or expired
        return render(request, 'activation_failure.html')
    


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
            
            # Scheduler job
            scheduler.add_job(30, resume.id)
            
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