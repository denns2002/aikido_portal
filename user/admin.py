from django.contrib import admin
from django.contrib.auth import get_user_model
from .models.profile import *


@admin.register(get_user_model())
class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'created_at', 'updated_at']
    search_fields = ['username', 'email']
    list_filter = ['created_at', 'updated_at']
    fields = ['username', 'email', 'is_staff', 'is_active',
              'is_verified', 'created_at', 'updated_at']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Personal Information', {
            'fields': ('user', 'first_name', 'last_name', 'mid_name',
                       'birth_date', 'country', 'city', 'photo', 'updated_at'),
        }),

        ('Achievements in sports', {
            'fields': ('current_rank', 'next_rank', 'role', 'clubs', 'groups'),
            'classes': ('wide',)
        }),
    )

    list_display = ['user', 'first_name', 'last_name', 'mid_name', 'city']
    search_fields = ['first_name', 'last_name', 'mid_name']
    list_filter = ['birth_date', 'role', 'clubs', 'groups', 'country', 'city']

    readonly_fields = ['user', 'updated_at']


models = [Rank, Role, Club, Group, UserRank, Phone]

for model in models:
    admin.site.register(model)
