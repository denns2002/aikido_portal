from django.contrib import admin

from clubs.models.club import Club
from clubs.models.group import Group


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    search_fields = ['name']


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    search_fields = ['name', 'number', 'trainer']
    list_filter = ['trainers', 'club']
    list_display = ['name', 'number', 'club']
    fields = ['name', 'number', 'club']
