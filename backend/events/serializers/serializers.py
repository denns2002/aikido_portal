from rest_framework import serializers
from events.models.event import Event, PlannedEvents, EventsDate, EventsTime


class EventsTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventsTime
        fields = ["name", "time_start", "time_end"]


class EventsDateSerializer(serializers.ModelSerializer):
    eventstime_set = EventsTimeSerializer(many=True, read_only=False)

    class Meta:
        model = EventsDate
        fields = ["id", "date", "comment", "eventstime_set"]

    # def create(self, validated_data):
    #     eventstimes_data = validated_data.pop('eventstime_set')
    #     events_date = EventsDate.objects.create(**validated_data)
    #     for data in eventstimes_data:
    #         EventsTime.objects.create(events_date=events_date, **data)
    #     return events_date


class EventSerializer(serializers.ModelSerializer):
    eventsdate = EventsDateSerializer(read_only=False)

    class Meta:
        model = Event
        # fields = '__all__'
        fields = ["id", "name", "reg_start", "reg_end", "eventsdate", "addresses", "about", "members", "organizers",
                  "co_organizers", "is_attestation", "attestation_date", "is_seminar", "seminar_date", "slug"]

    def create(self, validated_data):
        events_date_data = validated_data.pop('eventsdate')
        event = Event.objects.create(**validated_data)
        events_date = EventsDate.objects.create(event=event, **events_date_data)
        return event


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
