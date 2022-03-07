"""vactrack_backend URL Configuration
"""
from rest_framework_simplejwt import views as jwt_views
from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from api.user import scheduler

admin.site.site_header = settings.ADMIN_SITE_HEADER
admin.site.site_url = None

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
]
scheduler.start()
