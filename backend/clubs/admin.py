from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from clubs.models.club import Club
from clubs.models.group import Debts, Group, GroupMember
from events.models.event import PlannedEvents
from phones.admin import ClubPhoneInline


class GroupMemberInline(SuperInlineModelAdmin, admin.StackedInline):
    model = GroupMember
    extra = 1


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ["name"]
    filter_horizontal = ["addresses", "groups", "photos"]
    inlines = [ClubPhoneInline]


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ["name", "number"]
    inlines = [GroupMemberInline]


admin.site.register(Debts)
admin.site.register(PlannedEvents)
