from api.vaccine.models import Vaccine, VaccineAdmin
from django.contrib import admin

admin.site.register(Vaccine, VaccineAdmin)
