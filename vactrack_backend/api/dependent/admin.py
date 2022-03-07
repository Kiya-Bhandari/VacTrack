'''
admin module

registers the Dependent to admin
'''
from django.contrib import admin
from api.dependent.models import Dependent, DependentAdmin

admin.site.register(Dependent, DependentAdmin)
