from django.urls import path
from . import views
from .views import *


urlpatterns = [
    path('admin/login', views.admin_login_view, name="admin-login"),
    path('admin/signup', views.admin_signup_view, name="admin-signup"),
    path('admin/org-signup', views.org_signup_view, name="organization-signup"),
    path('organization/login', views.org_login_view, name="add-user"),
    path('organization/create-profile', CreateOrgProfile.as_view(), name="create-org-profile"),
    path('organization/create-job-requisition', CreateJobRequisition.as_view(), name="create-org-requisition"),

    # path('admin/login', views.admin_login_view, name="admin-login"),
    # path('admin/signup', views.admin_signup_view, name="admin-signup"),
    # path('admin/org-signup', views.org_signup_view, name="organization-signup"),
    # path('login', views.org_login_view, name="add-user"),
    # path('create-profile', CreateOrgProfile.as_view(), name="create-org-profile"),
    # path('create-job-requisition', CreateJobRequisition.as_view(), name="create-org-requisition"),

]