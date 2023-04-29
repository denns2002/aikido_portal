from django.contrib import admin
from .models.event import Event
from super_inlines.admin import SuperModelAdmin, SuperInlineModelAdmin


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    fieldsets = (
        ('Information', {
            'fields': ('slug', 'name', 'is_attestation', 'is_seminar',
                       'about', 'reg_start', 'reg_end', 'date_start',
                       'date_end'),
        }),

        ('Members', {
            'fields': ('organizers', 'co_organizers', 'members'),
            'classes': ('wide',)
        }),
    )

    list_display = [
        'name', 'is_attestation', 'is_seminar', 'date_start'
    ]

    search_fields = ['name', 'addresses', 'about']
    list_filter = ['date_start']
    filter_horizontal = ['organizers', 'co_organizers', 'members']
