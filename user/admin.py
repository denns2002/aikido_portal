from django.contrib import admin
from django.contrib.auth import get_user_model
from super_inlines.admin import SuperInlineModelAdmin, SuperModelAdmin
from .models.profile import *


class PhoneInline(SuperInlineModelAdmin, admin.StackedInline):
    model = Phone
    extra = 1


class PhotoInline(SuperInlineModelAdmin, admin.StackedInline):
    model = Photo
    extra = 1


class ProfileFields:
    fieldsets = (
        ('Personal Information', {
            'fields': ('slug', 'user', 'first_name', 'last_name', 'mid_name',
                       'birth_date', 'country', 'region', 'city', 'avatar_full',
                       'avatar', 'updated_at'),
        }),

        ('Achievements in sports', {
            'fields': ('current_rank', 'next_rank', 'role', 'clubs', 'groups'),
            'classes': ('wide',)
        }),
    )

    list_display = [
        'avatar_tag', 'user', 'first_name', 'last_name', 'mid_name', 'city'
    ]
    search_fields = [
        'first_name', 'last_name', 'mid_name', 'user__username', 'user__email',
        'phone__number'
    ]
    list_filter = [
        'birth_date', 'role', 'clubs', 'groups'
    ]
    inlines = [PhoneInline, PhotoInline]
    readonly_fields = ['updated_at', 'avatar_full']
    filter_horizontal = ["groups", "clubs"]


@admin.register(Profile)
class ProfileAdmin(ProfileFields, admin.ModelAdmin):
    pass


class ProfileInline(ProfileFields, SuperInlineModelAdmin, admin.StackedInline):
    model = Profile
    extra = 1


@admin.register(get_user_model())
class UserAdmin(SuperModelAdmin):
    list_display = ['username', 'email', 'created_at', 'updated_at']
    search_fields = [
        'username', 'email', 'profile__first_name', 'profile__last_name',
        'profile__mid_name', 'profile__phone__number'
    ]
    list_filter = ['created_at', 'updated_at']
    fields = [
        'username', 'email', 'is_staff', 'is_active', 'is_verified',
        'created_at', 'updated_at'
    ]
    readonly_fields = ['created_at', 'updated_at']
    inlines = [ProfileInline]


models = [Rank, Role, Club, Group, UserRank, Phone, Photo]

for model in models:
    admin.site.register(model)
