from django.urls import path

from clubs.views.club import ClubDetailAPIView, ClubListAPIView
from clubs.views.group import (GroupDetailAPIView, GroupListAPIView,
                               GroupMemberAPIView, TrainerGroupListAPIView)

urlpatterns = [
    path("club/", ClubListAPIView.as_view(), name="clubs"),
    path("club/<slug:slug>/", ClubDetailAPIView.as_view(), name="club-detail"),
    path("group/", GroupListAPIView.as_view(), name="group"),
    path("group/<slug:slug>/", GroupDetailAPIView.as_view(), name="group-detail"),
    path("trainer-group/", TrainerGroupListAPIView.as_view(), name="trainer-groups"),
]
