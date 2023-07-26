from datetime import date

from django.contrib.auth import get_user_model
from rest_framework.generics import (GenericAPIView, ListAPIView,
                                     RetrieveUpdateDestroyAPIView,
                                     UpdateAPIView, ListCreateAPIView)
from rest_framework.permissions import AllowAny

from clubs_groups.models.group import Group
from events.models.event import Event, PlannedEvents
from events.serializers.event_serializer import (EventOrganizersSerializer,
                                                 EventSerializer,
                                                 PlannedEventSerializer,
                                                 EventCoOrganizersSerializer)


class EventMixin(GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "slug"


class EventListCreateAPIView(ListCreateAPIView, EventMixin):
    """
    GET a list of all events.
    """

    permission_classes = [AllowAny]


class EventDetailAPIView(RetrieveUpdateDestroyAPIView, EventMixin):
    """
    GET event details.
    CRUD events for supervisors and organizers.
    """

    permission_classes = [AllowAny]


class EventAddOrgAPIView(UpdateAPIView):
    """
    Add organizers to events.

    - Gives full access to the event's CRUD.
    - The specified profiles will be in the contacts of the event.
    """

    queryset = Event.objects.all()
    serializer_class = EventOrganizersSerializer
    lookup_field = "slug"


class EventAddCoOrgAPIView(UpdateAPIView):
    """
    Add co-organizers to events.

    - The specified profiles will be in the contacts of the event.
    """

    queryset = Event.objects.all()
    serializer_class = EventCoOrganizersSerializer
    lookup_field = "slug"


class PlannedEventsAPIView(ListAPIView):
    """
    The trainer can view all upcoming events for which statements have been created.
    """

    serializer_class = PlannedEventSerializer

    def get_queryset(self):
        trainer = get_user_model().objects.get(id=self.request.user.id)
        groups = Group.objects.filter(trainers__id=trainer.id)
        planned_events = PlannedEvents.objects.filter(group__in=groups, event__date_end__gte=date.today())

        return planned_events