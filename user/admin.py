from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin
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
        'birth_date', 'role', 'clubs'
    ]
    inlines = [PhoneInline, PhotoInline]
    readonly_fields = ['updated_at', 'avatar_full']
    filter_horizontal = ["clubs"]


@admin.register(Profile)
class ProfileAdmin(ProfileFields, admin.ModelAdmin):
    pass


class ProfileInline(ProfileFields, SuperInlineModelAdmin, admin.StackedInline):
    model = Profile
    extra = 1


models = [Rank, Role, Phone, Photo]

for model in models:
    admin.site.register(model)
