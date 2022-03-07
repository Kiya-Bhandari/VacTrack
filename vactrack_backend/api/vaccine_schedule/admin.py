from api.vaccine_schedule.models import VaccineSchedule, VaccineScheduleAdmin, VaccineStatus, VaccineStatusAdmin
from django.contrib import admin

admin.site.register(VaccineSchedule, VaccineScheduleAdmin)
admin.site.register(VaccineStatus, VaccineStatusAdmin)
