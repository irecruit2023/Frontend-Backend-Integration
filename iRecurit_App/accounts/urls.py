from django.urls import path,re_path
from . import views
from .views import *


urlpatterns = [
    #path('api/activate_user/<uidb64>/<token>', views.activate_user, name="activate"),
    #path('api/test', views.test, name="test"),
    path('api/login/', login_view),  ##endpoint for login
    path('api/signup/', signup_view),
    path('api/verify-email/<uidb64>/<token>/', verify_email, name='verify_email'),
    path('api/resend_verification_email/', resend_verification_email, name='resend_verification_email'),
    path('api/Check_Confirmation/', Check_Confirmation.as_view(), name = 'Check_Confirmation'),
    # path('api/test/', ExampleAPIView.as_view()),
    path('api/verify/', VerifyUser.as_view()),
    path('api/refresh_token/', refresh_token_view, name='refresh-token'),
    path('api/upload_resume/', UploadResume.as_view()),
    path('api/generate_profile/<str:user_id>/', Collate.as_view(), name='Generate_Profile'),
    path('api/top_skills/<str:user_id>/', top_skills_view, name='top_skills'),
    path('api/domain/<str:user_id>/', CandidateDomain.as_view(), name='candidate_domain'),
    path('api/get_resume/<str:user_id>/', GetResume.as_view(), name='get_resume'),
    path('api/jobstatus/', UpdateJobStatus.as_view(), name='update_job_status'),
    path('api/upload_profile_picture/', Upload_profile_picture.as_view(), name='Upload_profile_picture'),
    path('api/get_profile_picture/<str:user_id>/',  Profile_Picture_Retrieve.as_view(), name=' Profile_Picture_Retrieve'),
    path('api/chart-data/', Chart_Data_API.as_view(), name='chart-data'),
    path('api/job_experience/<str:user_id>/', CandidateWorkExperiences.as_view(), name='CandidateWorkExperience'),
    path('api/education/<str:user_id>/', CandidateEducationDetail.as_view(), name='CandidateEducation'),
    #path('api/process/', ProcessResume.as_view(), name='ProcessResume'),
    path('index/', views.index_html, name='index_html'),
    re_path(r'^$', index_view, name='index'),  # Root URL
    re_path(r'^.*$', index_view, name='catch-all'),  # Catch-all for any other path
    
]