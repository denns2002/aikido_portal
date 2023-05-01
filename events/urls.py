from django.urls import path

from events.views.event import EventAddCoOrgAPIView, EventAddOrgAPIView, EventCreateUpdateDeleteAPIView, EventDetailAPIView, EventListAPIView, PlannedEventsAPIView

urlpatterns = [
    # Allow any
    path("", EventListAPIView.as_view(), name="event"),
    path("<slug:slug>/", EventDetailAPIView.as_view(), name="event-detail-get"),
    # For supervisors
    path("<slug:slug>/", EventCreateUpdateDeleteAPIView.as_view(), name="event-detail"),
    # Add organizers and co-organizers
    path("add-org/<slug:slug>/", EventAddOrgAPIView.as_view(), name="event-add-org"),
    path(
        "add-co-org/<slug:slug>/",
        EventAddCoOrgAPIView.as_view(),
        name="event-add-co-org",
    ),
    # Trainers check planned events for students
    path("planned-events", PlannedEventsAPIView.as_view(), name="planned-events"),
]
