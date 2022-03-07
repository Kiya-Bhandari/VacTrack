from django.db import models
from django.db import models

from django import forms
from django.db import models
from django.contrib import admin
from api.vaccine.constants import *

# Create your models here.


class VaccineSite(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'vaccine_site'
        verbose_name = 'vaccine_site'
        verbose_name_plural = 'vaccine_sites'

    def __str__(self):
        return str(self.name)


class VaccineSiteAdminForm(forms.ModelForm):
    class Meta:
        model = VaccineSite
        fields = '__all__'


class VaccineSiteAdmin(admin.ModelAdmin):

    form = VaccineSiteAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/vaccine_site/vaccinesite/{}/change/">Edit</a>', obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/vaccine_site/vaccinesite/{}/delete/" class="deletelink">Delete</a>', obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'name', 'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
