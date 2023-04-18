from django.contrib import admin
from super_inlines.admin import SuperInlineModelAdmin

from photos.models import Photo, UserPhoto, ClubPhoto


class UserPhotoInline(SuperInlineModelAdmin, admin.StackedInline):
    model = UserPhoto
    extra = 1


class ClubPhotoInline(SuperInlineModelAdmin, admin.StackedInline):
    model = ClubPhoto
    extra = 1


admin.site.register(Photo)
