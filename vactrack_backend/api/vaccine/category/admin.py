from api.vaccine.category.models import Category, CategoryAdmin
from django.contrib import admin

admin.site.register(Category, CategoryAdmin)
