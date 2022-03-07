'''
urls module

defines the urls for the api app
'''

from django.urls import include, path
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('user/', include('api.user.urls')),
    path('vaccine/', include('api.vaccine.urls')),
    path('vaccine_schedule/', include('api.vaccine_schedule.urls')),
    path('dependent/', include('api.dependent.urls')),
]
