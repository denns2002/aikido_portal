from rest_framework import serializers

from notifications.models import Notification, UserNotification


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"


class UserNotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserNotification
        fields = "__all__"


class UserNotificationListSerializer(UserNotificationSerializer):
        notification = NotificationSerializer()
