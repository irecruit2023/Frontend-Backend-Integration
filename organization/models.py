import uuid
from mongoengine import Document, StringField, EmailField, ReferenceField, UUIDField, IntField, BooleanField, FloatField, ImageField, DateField
from datetime import date

# Create your models here.

class AdminUser(Document):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    email = EmailField()
    password = StringField()
    is_admin = BooleanField(default=True)


class Organization(Document):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    email = EmailField()
    name = StringField()
    password = StringField()
    phone_number = IntField()
    user_type = StringField(default="organization")
    is_profile_created = BooleanField(default=False)


class OrganizationProfile(Document):
    user = ReferenceField(Organization)
    logo = StringField()
    name = StringField()
    primary_business = StringField()
    head_counts = IntField()
    address = StringField()
    email = EmailField()
    ceo = StringField()
    contact_person_name = StringField()
    contact_person_phone = IntField()
    contact_person_email = EmailField()
    gst = StringField()
    pan = StringField()


WORK_MODE_CHOICES = (
    ('WFH', 'work from home'),
    ('ON_SITE', 'on site'),
    ('HYBRID', 'hybrid')
)

URGENCY_CHOICES = (
    ('CRITICAL', 'immediate joining'),
    ('HIGH', 'join in next 2-3 weeks'),
    ('MEDIUM', '4-5 weeks'),
    ('LOW', 'joining upto 2 months'),
)


class JobRequisition(Document):
    user = ReferenceField(Organization)
    reporter_name = StringField()
    reporter_email = EmailField()
    job_title = StringField(max_length=120)
    job_description = StringField()
    additional_information = StringField()
    urgency = StringField(choices=URGENCY_CHOICES)
    work_mode = StringField(choices=WORK_MODE_CHOICES)
    joining_location = StringField()
    time_to_live = IntField()
    date_of_creation = DateField(default=date.today())