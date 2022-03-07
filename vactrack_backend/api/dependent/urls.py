from api.vaccine import views
from django.urls import path, include
from rest_framework import routers
from django.contrib import admin
from django.urls import path
from graphene_django.views import GraphQLView
from api.dependent.schema import schema
from django.views.decorators.csrf import csrf_exempt
from django.urls import include, path


urlpatterns = [
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
]
