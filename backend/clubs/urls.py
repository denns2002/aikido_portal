from django.urls import path

from clubs.views.club import ClubDetailAPIView, ClubListAPIView, \
    ArchiveClubAPIView
from clubs.views.group import (GroupDetailAPIView, GroupListAPIView, TrainerGroupListAPIView,
                               TrainerGroupDetailAPIView,
                               GroupMemberDebtsAPIView,
                               GroupTrainerListAPIView,
                               GroupTrainerChangeAPIView,
                               GroupMemberChangeAPIView, GroupMemberDeleteAPIView)

urlpatterns = [
    path("clubs/", ClubListAPIView.as_view(), name="clubs"),
    path("clubs/<slug:slug>/", ClubDetailAPIView.as_view(),
         name="club-detail"),
    path("clubs/<slug:slug>/archive/", ArchiveClubAPIView.as_view(),
         name="archive-club"),
    path("group/", GroupListAPIView.as_view(), name="group"),
    path("group/<slug:slug>/", GroupDetailAPIView.as_view(),
         name="group-detail"),

    path("trainer-groups/", TrainerGroupListAPIView.as_view(),
         name="trainer-groups"),
    path("trainer-groups/<slug:slug>/", TrainerGroupDetailAPIView.as_view(),
         name="trainer-groups-detail"),
    path("group-member-debts/<slug:slug>/", GroupMemberDebtsAPIView.as_view(),
         name="trainer-groups-detail"),

    path("group-trainer/<slug:slug>/", GroupTrainerListAPIView.as_view(),
         name="group-trainer"),
    path("group-trainer-change/<slug:slug>/",
         GroupTrainerChangeAPIView.as_view(), name="group-trainer-change"),
    path("group-member-change/<slug:profile__slug>/",
         GroupMemberChangeAPIView.as_view(),
         name="group-member-change"),
    path("group-member-delete/<slug:profile__slug>/",
         GroupMemberDeleteAPIView.as_view(),
         name="group-member-delete"),
]
