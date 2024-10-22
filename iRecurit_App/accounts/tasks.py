from celery import shared_task
from django.http import HttpResponse
from rest_framework.response import Response
import json
from bson import Binary
# import PyPDF2
from io import BytesIO
from .models import *
from django.template.loader import render_to_string
from django.contrib.sites.shortcuts import get_current_site
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from .helpers import generate_token
from django.conf import settings
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib, time, pymongo, asyncio, threading, uuid, heapq, requests, gridfs, logging
from rest_framework import status
from bson import ObjectId
import json

#from datetime import datetime

logger = logging.getLogger(__name__)


@shared_task
def send_confirmation_email(user, request):
    try:
        current_site = get_current_site(request)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = generate_token.make_token(user)
        
        if request.is_secure():
            protocol = 'https'
        else:
            protocol = 'http'

        email_subject = 'Welcome! Please Confirm Your Email'
        email_body = render_to_string('email_activation.html', {
            'user': user,
            'domain': current_site.domain,
            'protocol' : protocol,
            'uid': uid,
            'token': token
        })

        # Create a MIME message
        msg = MIMEMultipart()
        msg['From'] = settings.DEFAULT_FROM_EMAIL
        msg['To'] = user.candidate_email
        msg['Subject'] = email_subject
        msg.attach(MIMEText(email_body, 'html'))

        # Initialize SMTP connection
        smtp_server = smtplib.SMTP(settings.EMAIL_HOST, settings.EMAIL_PORT)
        smtp_server.starttls()  # Start TLS connection (secure)
        smtp_server.login(settings.EMAIL_HOST_USER, settings.EMAIL_HOST_PASSWORD)

        # Send the email
        smtp_server.sendmail(settings.EMAIL_HOST_USER, user.candidate_email, msg.as_string())
        smtp_server.quit()

        logger.info(f"Confirmation email sent to {user.candidate_email}")

    except Exception as e:
        logger.error(f"ERROR_SENDING_MAIL: {str(e)}")    

        


        
AI_ENGINE_URL = ""

client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
db = client[settings.DATABASES['default']['NAME']]
collection = db['jobs']

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

class Job:
    def __init__(self, interval, timeout=30, max_intervals=3, resume_id=None):
        self.id = str(uuid.uuid4())
        self.resume_id = resume_id
        self.initial_interval = interval
        #self.current_interval = interval
        self.start_time = time.time()
        self.timeout = timeout
        self.status = 'processing'
        self.processed_interval = 0
        self.max_intervals = max_intervals
        
    def get_time_remaining(self):
        return self.timeout - (time.time() - self.start_time)  
    
    def __lt__(self, other):
        return self.get_time_remaining() < other.get_time_remaining()

class JobScheduler:
    def __init__(self):
        self.queue = []
        self.lock = threading.Lock()
        self.loop = asyncio.new_event_loop()
        self.scheduler_thread = threading.Thread(target=self.run_scheduler)
        self.scheduler_thread.daemon = True
        self.scheduler_thread.start()
        
    def add_job(self, interval, resume_id):
        job = Job(interval, resume_id = resume_id)
        with self.lock:
            #jobs_data = read_jobs_data()
            collection.insert_one({
                '_id': job.id,
                'resume_id': job.resume_id,
                'status': job.status,
                'time_in_queue': 0,
                'start_time': job.start_time,
                #'timeout': job.timeout,
                'processed_interval': job.processed_interval,
                'max_intervals': job.max_intervals
            })
            heapq.heappush(self.queue, job)
            #jobs_data[job.id] = {'status': job.status, 'time_in_queue': 0}  ## adding the job to the queue with status and time 
            #write_jobs_data(jobs_data)
            
        #Notify AI engine
            # self.notify_ai_engine
            

        
        logging.info(f"Job {job.id} added to the queue")
        return job.id
    
    # def notify_ai_engine(self,job):
    #     ai_engine_url = "http://127.0.0.8000/api/process/"
    #     payload = {
    #         "job_id": job.id,
    #         "resume_id": job.resume_id
    #     }
        
    #     try: 
    #         response = requests.post(ai_engine_url, json=payload)
    #         response.raise_for_status()
    #         print(f"Successfully notified AI engine about job {job.id}")
    #     except requests.exceptions.RequestException as e:
    #         print(f"Failed to notify AI engine about job {job.id}: {e}")

            

    def update_job(self, job, status):
        collection.update_one({'_id':job.id}, {'$set': {'status':status, 'time_in_queue':job.get_time_remaining(), 'processed_interval':job.processed_interval}})
    
    def remove_job(self, job):
        job_id = job['_id']
        #if job.status == ['completed']:
        #    self.update_candidate_profile(job['resume_id'])
        collection.update_one({'_id':job_id}, {'$set': {'status':'completed'}})
        logging.info(f"Job {job_id} marked as complete in the database.")
        
    def get_next_job(self):
        if not self.queue:
            return None, None
        job = self.queue[0]
        time_remaining  = job.get_time_remaining()
        return job, time_remaining
        
        
        
    
    async def schedule_jobs(self):
        while True:
            with self.lock:
                if not self.queue:
                    await asyncio.sleep(5)  ## if it see the queue empty then it sleep for 5 sec and then continue
                    continue
                
                job = self.queue[0]    ## getting first job of the queue 
                time_remaining = job.get_time_remaining()  
                
                # print(f"Triggered processing for job {job.id}")
                # collate_skills.delay(job.resume_id)
                
                while time_remaining <= 0:
                    jobs_data = collection.find_one({'_id':job.id})
                    #if job.id in jobs_data and jobs_data[job.id]['status'] == 'completed':
                    if jobs_data and jobs_data['status'] == 'completed':
                        heapq.heappop(self.queue)
                        logging.info(f"Job {job.id} is completed and removed from the queue")
                        ## need to notify the frontend 
                        job, time_remaining = self.get_next_job()
                        if job is None:
                            break
                        continue
                    
                    
                
                    job.processed_interval += 1
                    if job.processed_interval >= job.max_intervals:
                        job.status = 'timeout'
                        self.update_job(job, 'timeout')
                        heapq.heappop(self.queue)
                        logging.info(f"Job {job.id} timed out and removed from the queue")
                        #need to notify the ai engine to tell that the job is killed
                        
                    else:
                        #job.current_interval += 30
                        
                        job.start_time = time.time()
                        heapq.heappop(self.queue)
                        heapq.heappush(self.queue, job)
                        self.update_job(job, 'processing')
                        logging.info(f"Job {job.id} status updated to processing")
                        
                        
                        
                    job, time_remaining = self.get_next_job()
                    if job is None:
                        break
            
            
            if not self.queue:
                await asyncio.sleep(5)
                continue
            
            job = self.queue[0]
            time_remaining = job.get_time_remaining()
            sleep_interval = max(0, time_remaining)     
            await asyncio.sleep(sleep_interval)
        
    def run_scheduler(self):
        asyncio.set_event_loop(self.loop)
        self.loop.run_until_complete(self.schedule_jobs())

                
@shared_task
def start_job_scheduler():
    scheduler = JobScheduler()
    scheduler.run_scheduler()
    

@shared_task
def remove_bg(user_id):
    try:
        logger.info(f"Started processing profile picture for user ID: {user_id}")

        #fetching user instance
        user = User.objects.get(candidate_id=user_id)
        
        # Fetch the ProfilePicture instance
        profile_picture = ProfilePicture.objects(candidate=user).first()
        if not profile_picture:
            response={
                "Status": status.HTTP_400_BAD_REQUEST,
                "Success": False,
                "Data": None,
                "Message": "ProfilePicture does not exist"
            }
            #logger.error("ProfilePicture does not exist")
            return response

        # Retrieve the original image from BinaryField or GridFS
        if isinstance(profile_picture.original_picture, bytes):
            original_image = profile_picture.original_picture
            logger.info(f"Original image size: {len(original_image)} bytes")
        else:
            # Assuming the use of GridFS
            client = pymongo.MongoClient(settings.DATABASES['default']['CLIENT']['host'])
            db = client[settings.DATABASES['default']['NAME']]
            fs = gridfs.GridFS(db)
            original_image = fs.get(profile_picture.original_picture).read()
            logger.info(f"Original image retrieved from GridFS, size: {len(original_image)} bytes")

        # Use the removebg API to remove the background
        response = requests.post(
            'https://api.remove.bg/v1.0/removebg',
            files={'image_file': original_image},
            data={'size': 'auto'},
            headers={'X-Api-Key': settings.REMOVE_BG_API},
        )

        # logger.info(f"removebg API Response Status Code: {response.status_code}")
        # logger.info(f"removebg API Response Content: {response.content[:100]}")  # Print first 100 bytes for debugging

        if response.status_code == 200:
            # Update the ProfilePicture with the processed image
            profile_picture.processed_picture = Binary(response.content)
            profile_picture.save()
            logger.info("Profile picture updated successfully.")
        else:
            logger.error(f"Error: {response.status_code} - {response.text}")

    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        

