'''
models module

creates the model for Dependent app
'''
from django import forms
from django.db import models
from django.contrib import admin
from django.utils.html import format_html
from api.user.models import Parent
from api.dependent.constants import (DEPENDENT, DEPENDENT_VERBOSE_NAME,
                                     DEPENDENT_VERBOSE_NAME_PLURAL,
                                     GENDER_CHOICES,
                                     DEPENDENT_CHANGE_BUTTON_HTML,
                                     DEPENDENT_DELETE_BUTTON_HTML)


class Dependent(models.Model):
    '''
    A class that defines the Child
    '''
    id = models.BigAutoField(primary_key=True)
    parent_id = models.ForeignKey(
        Parent, on_delete=models.CASCADE, related_name="dependent")
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES)
    dob = models.DateField(max_length=8)
    image_url = models.CharField(max_length=500, blank=True, null=True)
    blood_group = models.CharField(max_length=20, blank=True, null=True)
    is_notify = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        '''
            A class that defines name of table in DB and in django admin
        '''
        db_table = DEPENDENT
        verbose_name = DEPENDENT_VERBOSE_NAME
        verbose_name_plural = DEPENDENT_VERBOSE_NAME_PLURAL

    def __str__(self):
        return str(self.id)


class UserChoiceField(forms.ModelChoiceField):
    '''
    A class that returns id of user
    '''

    def label_from_instance(self, obj):
        '''
        A method returns id of user
        '''
        return '{}'.format(obj.id)


class DependentAdminForm(forms.ModelForm):
    '''
    A class that defines Dependent Admin Form
    '''
    parent_id = UserChoiceField(queryset=Parent.objects.all())

    class Meta:
        '''
        A class that defibes fields
        '''
        model = Dependent
        fields = '__all__'


class DependentAdmin(admin.ModelAdmin):
    '''
    A class that defines Dependent Admin
    '''
    form = DependentAdminForm

    @classmethod
    def parent_id(cls, obj):
        return obj.parent_id.id

    @classmethod
    def change_button(cls, obj):
        return format_html(DEPENDENT_CHANGE_BUTTON_HTML, obj.id)

    @classmethod
    def delete_button(cls, obj):
        return format_html(DEPENDENT_DELETE_BUTTON_HTML, obj.id)

    change_button.short_description = ''
    delete_button.short_description = ''

    list_display = ('id', 'parent_id', 'first_name', 'last_name', 'gender',
                    'dob', 'image_url', 'blood_group', 'is_notify', 'change_button',
                    'delete_button')
    list_display_links = ('change_button',)
    list_per_page = 10
