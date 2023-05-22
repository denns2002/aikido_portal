from django.urls import path

from profile.views.profile import ProfileAPIView, UpdateProfileView, \
    ProfileChangeRolesAPIView, ProfileChangeCityAPIView, \
    ProfileChangeRankAPIView

urlpatterns = [
    path("<slug:slug>/", ProfileAPIView.as_view(), name="login"),
    path("<slug:slug>/change-roles/", ProfileChangeRolesAPIView.as_view(), name="change-roles"),
    path("<slug:slug>/change-city/", ProfileChangeCityAPIView.as_view(), name="change-city"),
    path("<slug:slug>/change-rank/", ProfileChangeRankAPIView.as_view(), name="change-rank"),
    path("<slug:slug>/update-profile/", UpdateProfileView.as_view(), name="update-profile"),
]
