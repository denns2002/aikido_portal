from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from clubs.models.club import Club
from clubs.models.group import Group, GroupMember, Debts
from phones.admin import ClubPhoneInline
from photos.admin import ClubPhotoInline


class GroupMemberInline(SuperInlineModelAdmin, admin.StackedInline):
    model = GroupMember
    extra = 1


@admin.register(Club)
class ClubAdmin(admin.ModelAdmin):
    list_display = ['name']
    filter_horizontal = ["addresses", 'groups']
    inlines = [ClubPhoneInline, ClubPhotoInline]


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ['name', 'number']
    filter_horizontal = ["trainers"]
    inlines = [GroupMemberInline]


admin.site.register(Debts)
