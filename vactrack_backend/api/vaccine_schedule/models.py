'''
models module

creates the model for Child app
'''
from django import forms
from django.conf import settings
from django.db import models
from django.contrib import admin
from api.constants import *
from api.vaccine.models import Vaccine
from api.dependent.models import Dependent
from api.vaccine.category.models import Category
from api.vaccine_schedule.constants import *


class VaccineStatus(models.Model):
    id = models.BigAutoField(primary_key=True)
    status = models.CharField(max_length=20)

    class Meta:
        db_table = VACCINE_STATUS
        verbose_name = VACCINE_STATUS_VERBOSE_NAME
        verbose_name_plural = VACCINE_STATUS_VERBOSE_NAME_PLURAL

    def __str__(self):
        return str(self.id) + ' ' + str(self.status)


class VaccineSchedule(models.Model):
    '''
    A class that defines the Child
    '''
    id = models.BigAutoField(primary_key=True)
    vaccine_id = models.ForeignKey(Vaccine, on_delete=models.CASCADE)
    beneficiary_id = models.ForeignKey(
        Dependent, on_delete=models.CASCADE, related_name="vaccine_schedule")
    status_id = models.ForeignKey(
        VaccineStatus, on_delete=models.SET_NULL, null=True, blank=True)
    dose_number = models.IntegerField()
    dose_datetime = models.DateTimeField()
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="vaccine_schedule")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('dose_number', 'vaccine_id')
        db_table = VACCINE_SCHEDULE
        verbose_name = VACCINE_SCHEDULE_VERBOSE_NAME
        verbose_name_plural = VACCINE_SCHEDULE_VERBOSE_NAME_PLURAL

    def __str__(self):
        return str(self.vaccine_id) + '' + str(self.beneficiary_id) + ' ' + str(self.dose_number) + str(self.dose_datetime)


class VaccineStatusAdminForm(forms.ModelForm):

    class Meta:
        model = VaccineStatus
        fields = '__all__'


class VaccineStatusAdmin(admin.ModelAdmin):

    form = VaccineStatusAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html(VACCINE_STATUS_CHANGE_BUTTON_HTML, obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html(VACCINE_STATUS_DELETE_BUTTON_HTML, obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'status', 'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10


class VaccineChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return '{}'.format(obj.name)


class DependentChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return '{}'.format(obj.first_name)


class VaccineStatusChoiceField(forms.ModelChoiceField):
    def label_from_instance(self, obj):
        return '{}'.format(obj.status)


class VaccineScheduleAdminForm(forms.ModelForm):
    vaccine_id = VaccineChoiceField(queryset=Vaccine.objects.all())
    beneficiary_id = DependentChoiceField(queryset=Dependent.objects.all())
    status_id = VaccineStatusChoiceField(queryset=VaccineStatus.objects.all())

    # class Meta:
    #     model = Dependent
    #     fields = '__all__'


class VaccineScheduleAdmin(admin.ModelAdmin):

    form = VaccineScheduleAdminForm

    def parent_name(self, obj):
        return obj.parent_id.get_full_name()

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html(VACCINE_SCHEDULE_CHANGE_BUTTON_HTML, obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html(VACCINE_SCHEDULE_DELETE_BUTTON_HTML, obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'vaccine_id', 'beneficiary_id', 'status_id', 'dose_number',
                    'dose_datetime', 'category',  'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
