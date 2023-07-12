from rest_framework import serializers
from events.models.event import Event, PlannedEvents, EventsDate, EventsTime
from rest_framework.utils import model_meta


def set_attribute(instance, validated_data):
    info = model_meta.get_field_info(instance)
    m2m_fields = []
    for attr, value in validated_data.items():
        if attr in info.relations and info.relations[attr].to_many:
            m2m_fields.append((attr, value))
        else:
            setattr(instance, attr, value)

    for attr, value in m2m_fields:
        field = getattr(instance, attr)
        field.set(value)


class EventsTimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = EventsTime
        fields = ["id", "name", "time_start", "time_end"]
        read_only_fields = ["id"]


class EventsDatesSerializer(serializers.ModelSerializer):
    eventstime_set = EventsTimeSerializer(many=True, read_only=False)

    class Meta:
        model = EventsDate
        fields = ["id", "date", "comment", "eventstime_set"]
        read_only_fields = ["id"]


class EventsDateListSerializer(serializers.ListSerializer):
    child = EventsDatesSerializer()

    def update(self, instance, validated_data):
        pass


class EventSerializer(serializers.ModelSerializer):
    events_dates = EventsDateListSerializer(read_only=False, source='eventsdate_set')

    class Meta:
        model = Event
        # fields = '__all__'
        fields = ["id", "name", "reg_start", "reg_end", "events_dates", "addresses", "about", "members", "organizers",
                  "co_organizers", "is_attestation", "attestation_date", "is_seminar", "seminar_date", "slug"]
        read_only_fields = ["id"]

    def create(self, validated_data):
        dates_data = validated_data.pop('eventsdate_set')
        event = Event.objects.create(**validated_data)
        for date_data in dates_data:
            times_data = date_data.pop('eventstime_set')
            events_date = EventsDate.objects.create(event=event, **date_data)
            for data_time in times_data:
                EventsTime.objects.create(events_date=events_date, **data_time)
        return event

    def update(self, instance, validated_data):
        if 'eventsdate_set' in validated_data:
            nested_data = validated_data.pop('eventsdate_set')
            EventsDate.objects.filter(event_id=instance.id).delete()
            for date_data in nested_data:
                times_data = date_data.pop('eventstime_set')
                events_date = EventsDate.objects.create(event=instance, **date_data)
                for data_time in times_data:
                    EventsTime.objects.create(events_date=events_date, **data_time)

        set_attribute(instance, validated_data)
        instance.save()
        return instance


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
