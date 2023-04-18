from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from phones.models import Phone, UserPhone, ClubPhone


class UserPhoneInline(SuperInlineModelAdmin, admin.StackedInline):
    model = UserPhone
    extra = 1


class ClubPhoneInline(SuperInlineModelAdmin, admin.StackedInline):
    model = ClubPhone
    extra = 1


admin.site.register(Phone)
