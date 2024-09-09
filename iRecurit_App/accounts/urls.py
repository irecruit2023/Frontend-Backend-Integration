from django.urls import path,re_path
from . import views
from .views import *


urlpatterns = [
    #path('api/activate_user/<uidb64>/<token>', views.activate_user, name="activate"),
    #path('api/test', views.test, name="test"),
    path('api/login/', login_view),  ##endpoint for login
    path('api/signup/', signup_view),
    #path('api/verify-email/<uidb64>/<token>/', verify_email, name='verify_email'),
    path('api/test/', ExampleAPIView.as_view()),
    path('api/verify/', VerifyUser.as_view()),
    path('api/refresh_token/', refresh_token_view, name='refresh-token'),
    path('api/upload_resume/', UploadResume.as_view()),
    path('api/generate_profile/', Generate_Profile.as_view(), name='Generate_Profile'),
    path('api/get_resume/<str:user_id>/', GetResume.as_view(), name='get_resume'),
    path('api/jobstatus/', UpdateJobStatus.as_view(), name='update_job_status'),
    path('api/upload_profile_picture/', Upload_profile_picture.as_view(), name='Upload_profile_picture'),
    path('api/get_profile_picture/<str:user_id>/',  Profile_Picture_Retrieve.as_view(), name=' Profile_Picture_Retrieve'),
    path('api/chart-data/', Chart_Data_API.as_view(), name='chart-data'),
    path('index/', views.index_html, name='index_html'),
    re_path(r'^$', index_view, name='index'),  # Root URL
    re_path(r'^.*$', index_view, name='catch-all'),  # Catch-all for any other path
]