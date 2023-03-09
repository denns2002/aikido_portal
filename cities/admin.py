from django.contrib import admin
from .models import *


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    search_fields = ['name']
    list_filter = ['name']
    fields = ['name']


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name', 'region', 'postal_code']
    search_fields = ['name']
    list_filter = ['name', 'postal_code', 'region']
    fields = ['name', 'region', 'postal_code']


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = ['name', 'country']
    search_fields = ['name']
    list_filter = ['name', 'country']
    fields = ['name', 'country']
