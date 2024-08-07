from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('api/activate_user/<uidb64>/<token>', views.activate_user, name="activate"),
    #path('api/test', views.test, name="test"),
    path('api/login/', login_view),  ##endpoint for login
    path('api/signup/', signup_view),
    path('api/test/', ExampleAPIView.as_view()),
    path('api/verify/', VerifyUser.as_view()),
    path('api/refresh_token/', refresh_token_view, name='refresh-token'),
    path('api/upload_resume/', UploadResume.as_view()),
    path('api/get_resume/<str:user_id>/', GetResume.as_view(), name='get_resume'),
    path('api/jobstatus/', UpdateJobStatus.as_view(), name='update_job_status'),
]
    