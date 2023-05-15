from django.urls import path

from profile.views.profile import (MyProfileAPIView, ProfileAPIView,
                                   UpdateProfileView)

urlpatterns = [
    path("<slug:slug>/", ProfileAPIView.as_view(), name="login"),
    path("my-profile/", MyProfileAPIView.as_view(), name="my-profile"),
    path("<str:slug>/update-profile/", UpdateProfileView.as_view(), name="update-profile"),
]
