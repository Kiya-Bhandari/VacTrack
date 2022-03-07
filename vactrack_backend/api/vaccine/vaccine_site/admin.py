from api.vaccine.vaccine_site.models import VaccineSite, VaccineSiteAdmin
from django.contrib import admin

admin.site.register(VaccineSite, VaccineSiteAdmin)
