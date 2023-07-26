from django.urls import path

from events.views.event import (EventAddCoOrgAPIView, EventAddOrgAPIView,
                                EventDetailAPIView, EventListCreateAPIView)

urlpatterns = [
    path("", EventListCreateAPIView.as_view(), name="event-list"),
    path("<slug:slug>/", EventDetailAPIView.as_view(), name="event-detail"),
    path("<slug:slug>/change-org/", EventAddOrgAPIView.as_view(), name="event-add-org"),
    path("<slug:slug>/change-co-org/", EventAddCoOrgAPIView.as_view(), name="event-add-co-org",),
    # Trainers check planned events for students
    # path("planned-events/", PlannedEventsAPIView.as_view(), name="event-planned"),
]