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
        # extra_kwargs = {"id": {'required': True}}


class EventsDatesSerializer(serializers.ModelSerializer):
    eventstime_set = EventsTimeSerializer(many=True, read_only=False)

    class Meta:
        model = EventsDate
        fields = ["id", "date", "comment", "eventstime_set"]
        read_only_fields = ["id"]

    # def create(self, validated_data):
    #     dates_data = validated_data.pop('events_dates')
    #     # print(dates_data)
    #     event = Event.objects.create(**validated_data)
    #     # print(event.name)
    #     # eventstimes_data = dates_data.pop('eventstime_set')
    #
    #     events_dates = []
    #     for data_date in dates_data:
    #         data_times = data_date.pop('eventstime_set')
    #         # print(data_date)
    #         events_date = EventsDate.objects.create(event=event, **data_date)
    #         # print(events_date.comment, events_date.id)
    #         events_dates.append(events_date)
    #         for data_time in data_times:
    #             EventsTime.objects.create(events_date=events_date, **data_time)
    #     return events_dates
    #
    # def update(self, instance, validated_data):
    #     if 'eventstime_set' in validated_data:
    #         nested_data = validated_data.pop('eventstime_set')
    #         nested_serializer = self.fields['eventstime_set']
    #         for data in nested_data:
    #             if 'id' not in data:
    #                 print(data)
    #                 raise KeyError("Enter the id if you want to change the object")
    #             try:
    #                 events_time = EventsTime.objects.get(id=data['id'], events_date__id=instance.id)
    #                 # print(events_time.name)
    #                 nested_instance = events_time
    #             except EventsTime.DoesNotExist:
    #                 raise ValueError(f"Events_time id={data['id']} does not exist in event slug={instance.event.slug}")
    #
    #             nested_serializer.update(nested_instance, data)
    #
    #         # EventsTime.objects.filter(events_date__id=instance.id).delete()
    #         # for data in nested_data:
    #
    #     set_attribute(instance, validated_data)
    #     instance.save()
    #     return instance


class EventsDateListSerializer(serializers.ListSerializer):
    child = EventsDatesSerializer()

    def update(self, instance, validated_data):
        pass


class EventSerializer(serializers.ModelSerializer):
    # events_dates = EventsDatesSerializer(read_only=False, source='eventsdate_set')
    events_dates = EventsDateListSerializer(read_only=False, source='eventsdate_set')

    # source = EventsDate.objects.filter(event_id=)

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
        # print(validated_data)
        if 'eventsdate_set' in validated_data:
            nested_data = validated_data.pop('eventsdate_set')
            print(nested_data)
            # try:
            #     events_date = EventsDate.objects.get(event__slug=instance.slug)
            #     print(events_date.date)
            #     nested_instance = events_date
            # except EventsDate.DoesNotExist:
            #     raise ValueError("Events_date does not exist")
            #
            # nested_serializer = self.fields['events_dates']
            # nested_serializer.update(nested_instance, nested_data)
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
