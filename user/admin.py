from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from phones.admin import UserPhoneInline
from .models.profile import *


class ProfileFields:
    fieldsets = (
        ('Personal Information', {
            'fields': ('slug', 'user', 'first_name', 'last_name', 'mid_name',
                       'birth_date', 'city', 'avatar_full',
                       'avatar', 'updated_at'),
        }),

        ('Achievements in sports', {
            'fields': ('rank', 'roles'),
            'classes': ('wide',)
        }),

        ('Photos', {
            'fields': ('photos',),
            'classes': ('wide',)
        }),
    )

    list_display = [
        'user', 'avatar_tag', 'first_name', 'last_name', 'mid_name', 'city'
    ]
    search_fields = [
        'first_name', 'last_name', 'mid_name', 'user__username', 'user__email',
        'phone__number'
    ]
    list_filter = [
        'birth_date', 'roles',
    ]
    inlines = [UserPhoneInline]
    readonly_fields = ['updated_at', 'avatar_full']
    filter_horizontal = ['roles', 'photos']


@admin.register(Profile)
class ProfileAdmin(ProfileFields, admin.ModelAdmin):
    pass


# for user model admin
class ProfileInline(ProfileFields, SuperInlineModelAdmin, admin.StackedInline):
    model = Profile
    extra = 1


models = [Rank, Role]

for model in models:
    admin.site.register(model)
