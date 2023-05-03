from datetime import date

from django.contrib.auth import get_user_model
from django.http import Http404
from rest_framework import status
from rest_framework.generics import CreateAPIView, DestroyAPIView, GenericAPIView, ListAPIView, RetrieveAPIView, UpdateAPIView, get_object_or_404
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from clubs.models.group import Group, GroupMember
from clubs.serializers.group_serializer import GroupMemberSerializer
from events.models.event import Event, PlannedEvents
from events.serializers.serializers import EventOrganizersSerializer, EventSerializer, PlannedEventSerializer
from user.models.profile import Profile


class EventMixin(GenericAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    lookup_field = "slug"


class EventListAPIView(ListAPIView, EventMixin):
    """
    GET a list of all events.
    """

    permission_classes = [AllowAny]


class EventDetailAPIView(RetrieveAPIView, EventMixin):
    """
    GET event details.
    """

    permission_classes = [AllowAny]


class EventCreateUpdateDeleteAPIView(CreateAPIView, UpdateAPIView, DestroyAPIView, EventMixin):
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
    """
    The trainer can view all upcoming events for which statements have been created.
    """

    serializer_class = PlannedEventSerializer

    def get_queryset(self):
        trainer = get_user_model().objects.get(id=self.request.user.id)
        groups = Group.objects.filter(trainers__id=trainer.id)
        planned_events = PlannedEvents.objects.filter(group__in=groups, event__date_end__gte=date.today())

        return planned_events


class EventCreateStatementAPIView(APIView):
    serializer_class = GroupMemberSerializer
    lookup_field = "slug"

    def get_queryset(self):
        trainer = get_user_model().objects.get(id=self.request.user.id)
        groups = Group.objects.filter(trainers__id=trainer.id)
        members = GroupMember.objects.filter(group__in=groups)

        return members

    def get(self, request, *args, **kwargs):
        try:
            members = get_object_or_404(self.get_queryset(), group__slug=kwargs["group_slug"])
        except Http404:
            return Response({"error": "The vacancy does not exist, or has " "been withdrawn from publication."}, status=status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(members)

        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        pass
