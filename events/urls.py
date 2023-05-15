from django.urls import path

from events.views.event import (EventAddCoOrgAPIView, EventAddOrgAPIView,
                                EventDetailAPIView, EventListAPIView,
                                PlannedEventsAPIView)

urlpatterns = [
    path("", EventListAPIView.as_view(), name="event-list"),
    path("<slug:slug>/", EventDetailAPIView.as_view(), name="event-detail"),
    # Add organizers and co-organizers
    path("add-org/<slug:slug>/", EventAddOrgAPIView.as_view(), name="event-add-org"),
    path(
        "add-co-org/<slug:slug>/",
        EventAddCoOrgAPIView.as_view(),
        name="event-add-co-org",
    ),
    # Trainers check planned events for students
    # path("planned-events/", PlannedEventsAPIView.as_view(), name="event-planned"),
]
