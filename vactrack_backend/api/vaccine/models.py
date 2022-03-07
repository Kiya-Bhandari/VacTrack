from django import forms
from django.db import models
from django.contrib import admin
from api.vaccine.constants import *
from api.vaccine.category.models import Category
from api.vaccine.route.models import Route
from api.vaccine.vaccine_site.models import VaccineSite

# Create your models here.


class Vaccine(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)
    vac_code = models.CharField(max_length=20)
    description = models.CharField(max_length=200)
    category = models.ForeignKey(
        Category, on_delete=models.CASCADE, related_name="vaccine")
    dosage_number = models.IntegerField()
    dose = models.CharField(max_length=20)
    route = models.ForeignKey(
        Route, on_delete=models.CASCADE, related_name="vaccine")
    vaccine_site = models.ForeignKey(
        VaccineSite, on_delete=models.CASCADE, related_name="vaccine")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = VACCINE
        verbose_name = VACCINE_VERBOSE_NAME
        verbose_name_plural = VACCINE_VERBOSE_NAME_PLURAL

    def __str__(self):
        return str(self.name)


class VaccineAdminForm(forms.ModelForm):
    class Meta:
        model = Vaccine
        fields = '__all__'


class VaccineAdmin(admin.ModelAdmin):

    form = VaccineAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html(VACCINE_CHANGE_BUTTON_HTML, obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html(VACCINE_DELETE_BUTTON_HTML, obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'name', 'vac_code', 'category',
                    'description', 'dosage_number', 'dose', 'route', 'vaccine_site', 'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
