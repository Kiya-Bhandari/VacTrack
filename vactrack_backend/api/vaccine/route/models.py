from django.db import models

from django import forms
from django.db import models
from django.contrib import admin
from api.vaccine.constants import *

# Create your models here.


class Route(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'vaccine_route'
        verbose_name = 'vaccine_route'
        verbose_name_plural = 'vaccine_routes'

    def __str__(self):
        return str(self.name)


class RouteAdminForm(forms.ModelForm):
    class Meta:
        model = Route
        fields = '__all__'


class RouteAdmin(admin.ModelAdmin):

    form = RouteAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/route/route/{}/change/">Edit</a>', obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/route/route/{}/delete/" class="deletelink">Delete</a>', obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'name', 'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
