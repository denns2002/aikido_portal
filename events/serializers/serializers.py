from rest_framework import serializers

from events.models.event import Event


class EventSerializer(serializers.ModelSerializer):
    name = serializers.CharField(max_length=255)
    reg_start = serializers.DateTimeField()
    reg_end = serializers.DateTimeField()
    date = serializers.DateField()
    place = serializers.CharField(max_length=255)
    about = serializers.CharField()
    # members = serializers.   #хз как делать