import uuid
from django.contrib.auth.models import AbstractUser
from mongoengine import Document, StringField, EmailField, ReferenceField, UUIDField, BooleanField, DateTimeField, ReferenceField, FileField, IntField
from django.db import models 
import connection
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from django.contrib.auth.hashers import make_password, check_password
# Create your models here.

# models.py

#from mongoengine.queryset.base import queryset_manager


class User(Document):
    candidate_id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    candidate_email = StringField(unique=True)
    candidate_first_name = StringField(max_length=30)
    candidate_last_name = StringField(max_length=30)
    password = StringField(max_length=128)  # Store hashed password
    is_email_verified = BooleanField(default=False)
    is_profile_created = BooleanField(default=False)

    meta = {'collection': 'candidate_users'}  # Specify the MongoDB collection name

    def set_password(self, raw_password):
        self.password = make_password(raw_password)

    def check_password(self, raw_password):
        return check_password(raw_password, self.password)

    def __str__(self):
        return self.candidate_email

class Resume(Document):
    id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    candidate = ReferenceField(User)
    candidate_name = StringField(required=True)
    file = StringField(required=True)
    filename = StringField()
    status = StringField(default='uploaded')
    
    meta = {'collection': 'candidate_resume'}
    
    
class Job(Document):
    id = StringField(primary_key=True, default=lambda: str(uuid.uuid4()))
    resume_id = ReferenceField(Resume)
    status = StringField(default = 'processing')
    time_in_queue = IntField(default = 0)
    start_time = DateTimeField(auto_now_add = True)
    #timeout = IntField(default = 30)
    processed_interval = IntField(default = 0)
    max_interval = IntField(default = 3)
    
    meta = {'collection': 'jobs'}