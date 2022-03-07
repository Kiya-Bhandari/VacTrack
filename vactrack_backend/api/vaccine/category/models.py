from django.db import models

from django import forms
from django.db import models
from django.contrib import admin
from api.vaccine.constants import *

# Create your models here.


class Category(models.Model):
    id = models.BigAutoField(primary_key=True)
    name = models.CharField(max_length=100)

    class Meta:
        db_table = 'vaccine_category'
        verbose_name = 'vaccine_category'
        verbose_name_plural = 'vaccine_categories'

    def __str__(self):
        return str(self.name)


class CategoryAdminForm(forms.ModelForm):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryAdmin(admin.ModelAdmin):

    form = CategoryAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/category/category/{}/change/">Edit</a>', obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/category/category/{}/delete/" class="deletelink">Delete</a>', obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'name', 'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
