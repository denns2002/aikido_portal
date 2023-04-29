from rest_framework.generics import ListAPIView, GenericAPIView, CreateAPIView,\
    RetrieveAPIView, UpdateAPIView, DestroyAPIView
from rest_framework.permissions import AllowAny

from clubs.models.group import Group
from events.models.event import Event, PlannedEvents
from events.serializers.serializers import EventSerializer, \
    EventOrganizersSerializer
from user.models.profile import Profile


class EventMixin(GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "slug"


class EventListAPIView(ListAPIView,
                       EventMixin):
    """
    GET a list of all events.
    """
    permission_classes = [AllowAny]


class EventDetailAPIView(RetrieveAPIView,
                         EventMixin):
    """
    GET event details.
    """
    permission_classes = [AllowAny]


class EventCreateUpdateDeleteAPIView(CreateAPIView,
                                     UpdateAPIView,
                                     DestroyAPIView,
                                     EventMixin):
    """
    CRUD events for supervisors and organizers.
    """
    pass


class EventAddOrgAPIView(UpdateAPIView):
    """
    Add organizers to events.

    - Gives full access to the event's CRUD.
    - The specified profiles will be in the contacts of the event.
    """
    queryset = Event.objects.all()
    serializer_class = EventOrganizersSerializer


class EventAddCoOrgAPIView(UpdateAPIView):
    """
    Add co-organizers to events.

    - The specified profiles will be in the contacts of the event.
    """
    queryset = Event.objects.all()
    serializer_class = EventOrganizersSerializer


class PlannedEventsAPIView(ListAPIView):
    queryset = Event.objects.all()
    serializer_class = PlannedEvents

    def get_queryset(self):
        trainer = Profile.objects.get(user=self.request.user.id)
        groups = Group.objects.filter(trainers=trainer)
        print(groups)
        # planned_events = PlannedEvents.objects.filter(group)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
