import os

from django.conf import settings
from django.shortcuts import render
from .models import AdminUser, Organization
from .authentication import JWTAuthentication
# from accounts.authentication import JWTAuthentication
from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from .serializers import *
#from accounts.errorFile import errors
from rest_framework.views import APIView
# Create your views here.


@csrf_exempt
@api_view(["POST"])
def admin_signup_view(request):
    serializer = AdminSignupSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)


@csrf_exempt
@api_view(['POST'])
def admin_login_view(request):
    serializer = AdminLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email').lower()
    password = serializer.data.get('password')

    user = AdminUser.objects.filter(email=email).first()
    if user is not None:
        check_pass = check_password(password, user.password)
        if check_pass:
            token = JWTAuthentication.create_jwt(user)
            return Response({"msg": f"Admin {user.email} logged in successfully!",
                             "access_token": token}, status=status.HTTP_200_OK)

        return Response({"msg": errors["invalid_creds"]}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"msg": errors["invalid_creds"]}, status=status.HTTP_400_BAD_REQUEST)



@csrf_exempt
@api_view(["POST"])
def org_signup_view(request):
    user = request.user
    if str(user) == "AnonymousUser":
        return Response({"msg": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED)
    is_admin = user.is_admin
    if is_admin:
        serializer = OrganizationSignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"user": serializer.data})

        return Response({"error": serializer.errors})

    return Response({"user": request.user.email})


@csrf_exempt
@api_view(['POST'])
def org_login_view(request):
    serializer = OrganizationLoginSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    email = serializer.data.get('email').lower()
    password = serializer.data.get('password')

    user = Organization.objects.filter(email=email).first()
    if user is not None:
        check_pass = check_password(password, user.password)
        if check_pass:
            token = JWTAuthentication.create_jwt(user)
            return Response({"msg": f"Organization {user.email} logged in successfully!",
                             "access_token": token,
                             "is_profile_created": user.is_profile_created}, status=status.HTTP_200_OK)

        return Response({"msg": errors["invalid_creds"]}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"msg": errors["invalid_creds"]}, status=status.HTTP_400_BAD_REQUEST)


class CreateOrgProfile(APIView):
    def post(self, request):
        user = request.user
        if str(user) == "AnonymousUser":
            return Response({"msg": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED)

        serializer = OrganizationCreateProfileSerializer(data=request.data)
        if serializer.is_valid():
            logo = serializer.validated_data['logo']
            if logo:
                file_path = os.path.join(settings.MEDIA_ROOT, 'logos', logo.name)
                try:
                    with open(file_path, 'wb') as f:
                        for chunk in logo.chunks():
                            f.write(chunk)

                    serializer.save(user=request.user.id, logo=file_path)
                    return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

                except Exception as e:
                    return Response({"error": e, "msg": "Error saving logo file"},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            return Response({"data": serializer.data}, status=status.HTTP_201_CREATED)

        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class CreateJobRequisition(APIView):
    def post(self, request):
        user_id = request.user.id
        if user_id is None:
            return Response({"msg": "Unauthorized Access"}, status=status.HTTP_401_UNAUTHORIZED)
        company_instance = OrganizationProfile.objects.filter(user=user_id).first()
        serializer = CreateJobRequisitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=user_id, reporter_name=company_instance.contact_person_name, reporter_email=company_instance.contact_person_email)
            return Response({"msg": "Job requisition created successfully!"}, status=status.HTTP_201_CREATED)

        return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)





