from rest_framework import serializers

from events.models.event import Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class EventOrganizersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['organizers']


class EventCoOrganizersSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = ['co_organizers']

