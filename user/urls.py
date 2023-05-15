from django.urls import path

from user.views.profile import (MyProfileAPIView, ProfileAPIView,
                                UpdateProfileView)

urlpatterns = [
    path("<slug:slug>/", ProfileAPIView.as_view(), name="login"),
    path("my-profile/", MyProfileAPIView.as_view(), name="my-profile"),
    path("update-profile/<str:slug>/", UpdateProfileView.as_view(), name="update-profile"),
]
