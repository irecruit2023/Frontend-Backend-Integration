from django.contrib.auth.base_user import AbstractBaseUser
from rest_framework_simplejwt.tokens import RefreshToken
import random
from django.conf import settings
import requests
from django.core.mail import send_mail
import secrets
from django.contrib.auth.tokens import PasswordResetTokenGenerator
import six

# this function is used to generate the tokens for authorization

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }
    
class TokenGenerator(PasswordResetTokenGenerator):
    
    def _make_hash_value(self, user, timestamp):
        return (six.text_type(user.pk)+six.text_type(timestamp)+six.text_type(user.is_email_verified))
    
generate_token = TokenGenerator()
    


