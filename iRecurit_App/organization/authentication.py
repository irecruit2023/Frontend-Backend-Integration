from datetime import datetime, timedelta
import jwt
from django.conf import settings
from .models import AdminUser, Organization
from accounts.models import *
from rest_framework import authentication
from rest_framework.exceptions import AuthenticationFailed, ParseError




class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # Extract the JWT from the Authorization header
        jwt_token = request.META.get('HTTP_AUTHORIZATION')
        if jwt_token is None:
            return None

        jwt_token = JWTAuthentication.get_the_token_from_header(jwt_token)

        try:
            payload = jwt.decode(jwt_token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.exceptions.InvalidSignatureError:
            raise AuthenticationFailed('Invalid signature')

        except:
            raise ParseError()

        email = payload.get('user_identifier')
        if email is None:
            raise AuthenticationFailed('User identifier not found in JWT')

        user = AdminUser.objects.filter(email=email).first()
        if user is None:
            user = Organization.objects.filter(email=email).first()
            if user is None:
                user = CustomUser.objects.filter(email=email).first()
                if user is None:
                    raise AuthenticationFailed('User not found')

        # Return the user and token payload
        return user, payload

    def authenticate_header(self, request):
        return 'Bearer'

    @classmethod
    def create_jwt(cls, user):
        # Create the JWT payload
        access_token_lifetime_days = settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].days
        payload = {
            'user_identifier': user.email,
            'exp': int((datetime.now() + timedelta(days=access_token_lifetime_days)).timestamp()),
            'iat': datetime.now().timestamp(),
            'username': user.email,
        }

        # Encode the JWT with your secret key
        jwt_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')

        return jwt_token

    @classmethod
    def get_the_token_from_header(cls, token):
        token = token.replace('Bearer', '').replace(' ', '')  # clean the token
        return token
