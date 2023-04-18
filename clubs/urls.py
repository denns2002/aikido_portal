from django.urls import path

from clubs.views.club import ClubListAPIView, ClubDetailAPIView
from clubs.views.group import GroupListAPIView, GroupDetailAPIView

urlpatterns = [
    path('clubs/', ClubListAPIView.as_view(), name='clubs'),
    path('clubs/<slug:slug>/', ClubDetailAPIView.as_view(), name='club-detail'),
    path('group/', GroupListAPIView.as_view(), name='group'),
    path('group/<slug:slug>/', GroupDetailAPIView.as_view(), name='group-detail'),
]