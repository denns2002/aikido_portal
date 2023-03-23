from rest_framework.generics import ListCreateAPIView, RetrieveDestroyAPIView
from events.models.event import Event
from events.serializers.serializers import EventSerializer


class EventListAPIView(ListCreateAPIView):
    swagger_schema = None
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class EventDetailAPIView(RetrieveDestroyAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "slug"
