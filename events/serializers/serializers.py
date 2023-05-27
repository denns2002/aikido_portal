from rest_framework import serializers

from events.models.event import Event, PlannedEvents, EventsDate, EventsTime


class EventsTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventsTime
        fields = ["name", "time_start", "time_end"]


class EventsDateSerializer(serializers.ModelSerializer):
    eventtime_set = EventsTimeSerializer(many=True, read_only=True)

    class Meta:
        model = EventsDate
        fields = ["id", "date", "comment", "eventtime_set"]


class EventSerializer(serializers.ModelSerializer):
    eventsdate = EventsDateSerializer(read_only=True)

    class Meta:
        model = Event
        # fields = '__all__'
        fields = ["id", "name", "reg_start", "reg_end", "eventsdate", "addresses", "about", "members", "organizers",
                  "co_organizers", "is_attestation", "attestation_date", "is_seminar", "seminar_date", "slug"]


class EventOrganizersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["organizers"]


class EventCoOrganizersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ["co_organizers"]


class PlannedEventSerializer(serializers.ModelSerializer):
    event = EventSerializer()

    class Meta:
        model = PlannedEvents
        fields = ["event"]
