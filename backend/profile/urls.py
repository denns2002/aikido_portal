from django.urls import path

from profile.views.profile import ProfileAPIView, UpdateProfileView

urlpatterns = [
    path("<slug:slug>/", ProfileAPIView.as_view(), name="login"),
    path("<slug:slug>/update-profile/", UpdateProfileView.as_view(), name="update-profile"),
]
