from django.urls import path, include
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView

from api.user.schema import schema
# from api.user.views import getPhoneNumberRegistered
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('graphql/', csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema))),
    # path('token/', jwt_views.TokenObtainPairView.as_view(),
    #      name='token_obtain_pair'),
    # path('verify/<int:phone>',csrf_exempt(getPhoneNumberRegistered.as_view()))
]
