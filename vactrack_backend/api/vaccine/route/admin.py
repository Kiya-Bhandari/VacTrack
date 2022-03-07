from django.contrib import admin
from api.vaccine.route.models import Route, RouteAdmin

admin.site.register(Route, RouteAdmin)
