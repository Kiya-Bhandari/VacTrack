"""
models module

creates the model for user app
"""
from django import forms
from django.db import models
from django.core.mail import send_mail
from django.contrib import admin
from django.contrib.auth.models import AbstractUser, AbstractBaseUser, BaseUserManager
# Create your models here.


class Doctor(models.Model):
    mobile = models.CharField(unique=True, blank=False, max_length=20)
    first_name = models.CharField(
        blank=True, null=True, default="", unique=False, max_length=50)
    last_name = models.CharField(
        blank=True, null=True, default="", unique=False, max_length=50)
    email = models.EmailField(max_length=254, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "doctor"
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    def __str__(self):
        return str(self.mobile)


class Parent(models.Model):
    doctor_id = models.ForeignKey(
        Doctor, on_delete=models.SET_NULL, null=True, blank=True)
    mobile = models.CharField(unique=True, blank=False, max_length=20)
    first_name = models.CharField(blank=True, null=True, max_length=50)
    last_name = models.CharField(blank=True, null=True, max_length=50)
    email = models.EmailField(max_length=254, null=True, blank=True)
    is_notify = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = "parent"
        verbose_name = "Parent"
        verbose_name_plural = "Parents"

    def __str__(self):
        return str(self.doctor_id) + ' ' + str(self.mobile)


class DoctorAdminForm(forms.ModelForm):

    class Meta:
        model = Doctor
        fields = '__all__'


class DoctorAdmin(admin.ModelAdmin):

    form = DoctorAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/user/doctor/{}/change/">Edit</a>', obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/user/doctor/{}/delete/" class="deletelink">Delete</a>', obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'mobile', 'first_name', 'last_name', 'email',
                    'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10


class ParentAdminForm(forms.ModelForm):

    class Meta:
        model = Parent
        fields = '__all__'


class ParentAdmin(admin.ModelAdmin):

    form = ParentAdminForm

    def change_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/user/parent/{}/change/">Edit</a>', obj.id)

    def delete_button(self, obj):
        from django.utils.html import format_html
        return format_html('<a href="/admin/user/parent/{}/delete/" class="deletelink">Delete</a>', obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'doctor_id', 'mobile', 'first_name', 'last_name', 'email', 'is_notify',
                    'change_button', 'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
