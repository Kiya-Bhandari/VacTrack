"""
admin module

registers the CustomUser to admin
"""
from api.user.models import Doctor, Parent, DoctorAdmin, ParentAdmin
from django import forms
from django.contrib import admin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django.contrib.auth.models import Group
from django.apps import apps

admin.site.register(Doctor, DoctorAdmin,)
admin.site.register(Parent, ParentAdmin)

app = apps.get_app_config('graphql_auth')

for model_name, model in app.models.items():
    admin.site.register(model)

admin.site.unregister(Group)
