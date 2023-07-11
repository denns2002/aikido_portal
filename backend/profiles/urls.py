from django.urls import path

from profiles.views.profile import (ProfileDetailAPIView,
                                    UserProfileAPIView,
                                    ProfileListCreateAPIView,
                                    TrainerRegisterAPIView)

urlpatterns = [
    path("register/", TrainerRegisterAPIView.as_view(), name="register"),
    path('', ProfileListCreateAPIView.as_view(), name="profile"),
    path("<slug:slug>/", ProfileDetailAPIView.as_view(), name="profile-detail"),
    path("my-profile/", UserProfileAPIView.as_view(), name="my-profile"),
]
