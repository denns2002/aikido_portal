from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from .models.event import Event, EventsDate, EventsTime


class EventsDateInLine(SuperInlineModelAdmin, admin.StackedInline):
    model = EventsDate
    extra = 1


class EventsTimeInLine(SuperInlineModelAdmin, admin.StackedInline):
    model = EventsTime
    extra = 1


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            "Information",
            {
                "fields": (
                    "id",
                    "slug",
                    "name",
                    "is_attestation",
                    "attestation_date",
                    "is_seminar",
                    "seminar_date",
                    "about",
                    "reg_start",
                    "reg_end",
                    "date_start",
                    "date_end",
                ),
            },
        ),
        (
            "Members",
            {
                "fields": ("organizers", "co_organizers", "members"),
                "classes": ("wide",),
            },
        ),
    )

    list_display = ["name", "is_attestation", "is_seminar"]
    readonly_fields = ["id"]
    search_fields = ["name", "addresses", "about"]
    # list_filter = ["date_start"]
    filter_horizontal = ["organizers", "co_organizers", "members"]
    inlines = [EventsDateInLine, EventsDateInLine]
