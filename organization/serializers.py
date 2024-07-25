from .helper import create_password, send_confirm_email
from rest_framework import serializers
from .models import *
from django.contrib.auth.hashers import make_password, check_password


class AdminSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    password_confirm = serializers.CharField()
    is_admin = serializers.BooleanField(default=True)

    def validate(self, attrs):
        if attrs['password'] != attrs['password_confirm']:
            raise serializers.ValidationError("Password didn't match, please try again!")
        attrs['password'] = make_password(attrs['password'])
        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")

        return AdminUser.objects.create(**validated_data)


class AdminLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)


class OrganizationSignupSerializer(serializers.Serializer):
    email = serializers.EmailField()
    name = serializers.CharField()
    password = serializers.CharField(default=create_password())
    phone_number = serializers.IntegerField()
    user_type = serializers.CharField(default="organization")
    is_profile_created = serializers.BooleanField(default=False)


    def validate(self, attrs):
        send_confirm_email(attrs['email'], attrs['password'], attrs['name'])
        attrs['password'] = make_password(attrs['password'])
        return attrs

    def create(self, validated_data):
        return Organization.objects.create(**validated_data)

class OrganizationLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(max_length=128)


class OrganizationCreateProfileSerializer(serializers.Serializer):
    logo = serializers.ImageField()
    name = serializers.CharField()
    primary_business = serializers.CharField()
    head_counts = serializers.IntegerField()
    address = serializers.CharField()
    email = serializers.EmailField()
    ceo = serializers.CharField()
    contact_person_name = serializers.CharField()
    contact_person_phone = serializers.IntegerField()
    contact_person_email = serializers.EmailField()
    gst = serializers.CharField()
    pan = serializers.CharField()

    def create(self, validated_data):
        return OrganizationProfile.objects.create(**validated_data)


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


class CreateJobRequisitionSerializer(serializers.Serializer):
    # reporter_name = serializers.CharField()
    # reporter_email = serializers.EmailField()
    job_title = serializers.CharField()
    job_description = serializers.CharField()
    additional_information = serializers.CharField()
    urgency = serializers.ChoiceField(choices=URGENCY_CHOICES)
    work_mode = serializers.ChoiceField(choices=WORK_MODE_CHOICES)
    joining_location = serializers.CharField()

    def create(self, validated_data):
        return JobRequisition.objects.create(**validated_data)