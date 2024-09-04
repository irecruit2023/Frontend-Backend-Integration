from datetime import datetime
import jwt
from django.conf import settings
from rest_framework.exceptions import AuthenticationFailed
from rest_framework import authentication
from .models import User

class JWTAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        jwt_token = request.META.get('HTTP_AUTHORIZATION')
        if not jwt_token:
            return None
            #raise AuthenticationFailed('TOKEN_MISSING')

        try:
            token = self.get_token_from_header(jwt_token)
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('TOKEN_EXPIRED')
        except (jwt.InvalidTokenError, jwt.DecodeError):
            raise AuthenticationFailed('INVALID_TOKEN')

        candidate_id = payload.get('candidate_id')
        if not candidate_id:
            raise AuthenticationFailed('INVALID_TOKEN')

        user = User.objects.filter(candidate_id=candidate_id).first()
        if not user:
            raise AuthenticationFailed('USER_NOT_FOUND')

        return user, payload

    def authenticate_header(self, request):
        return 'Bearer'

    def get_token_from_header(self, token):
        # Clean the token and extract the actual token value
        prefix, value = token.split()
        if prefix.lower() != 'bearer':
            raise AuthenticationFailed('INVALID_TOKEN_FORMAT')
        return value

    @classmethod
    def create_tokens(cls, user):
        access_token = cls.generate_access_token(user)
        refresh_token = cls.generate_refresh_token(user)
        return access_token, refresh_token

    @classmethod
    def generate_access_token(cls, user):
        access_token_payload = {
            'candidate_id': str(user.candidate_id),
            'first_name': user.candidate_first_name,
            'exp': datetime.now() + settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],                                                                        
            'iat': datetime.now()
        }
        access_token = jwt.encode(access_token_payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
        return access_token

    @classmethod
    def generate_refresh_token(cls, user):
        refresh_token_payload = {
            'candidate_id': str(user.candidate_id),
            'first_name': user.candidate_first_name,
            'exp': datetime.now() + settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
            'iat': datetime.now()
        }
        refresh_token = jwt.encode(refresh_token_payload, settings.SECRET_KEY, algorithm='HS256').decode('utf-8')
        return refresh_token
