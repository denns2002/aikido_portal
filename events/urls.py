from django.urls import path

from events.views.event import EventDetailAPIView, EventListAPIView


urlpatterns = [
    # Default Auth URLs
    path('', EventListAPIView.as_view(), name='event'),
    path('<slug:slug>/', EventDetailAPIView.as_view(), name='event-detail')
]
