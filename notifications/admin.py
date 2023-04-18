from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from notifications.models import Notification, UserNotification


class UserNotificationInline(SuperInlineModelAdmin, admin.StackedInline):
    model = UserNotification
    extra = 1


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ['title']
    search_fields = ['title', 'message']
    readonly_fields = ['timestamp']
    inlines = [UserNotificationInline]
