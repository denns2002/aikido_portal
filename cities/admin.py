from django.contrib import admin
from .models import *


@admin.register(Country)
class CountryAdmin(admin.ModelAdmin):
    search_fields = list_filter = ['name']


@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = search_fields = ['name', 'region', 'postal_code']
    list_filter = ['region']


@admin.register(Region)
class RegionAdmin(admin.ModelAdmin):
    list_display = search_fields = list_filter =  ['name', 'country']


@admin.register(Street)
class StreetAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    search_fields = ['number']


@admin.register(Apt)
class AptAdmin(admin.ModelAdmin):
    search_fields = ['number']


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = search_fields = ['city', 'street', 'house', 'apt']
    list_filter = ['city']
