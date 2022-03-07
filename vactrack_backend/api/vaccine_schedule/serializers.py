from rest_framework import serializers
from api.vaccine_schedule.models import VaccineSchedule


class VaccineScheduleSerializer(serializers.ModelSerializer):
    class Meta:
        model = VaccineSchedule
        fields = '__all__'
