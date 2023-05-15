from rest_framework.generics import GenericAPIView, ListCreateAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin

from notifications.models import Notification, UserNotification
from notifications.serializers import (NotificationSerializer,
                                       UserNotificationListSerializer,
                                       UserNotificationSerializer)


class UserNotificationListView(ListCreateAPIView, GenericAPIView):
    serializer_class = UserNotificationListSerializer

    def get_queryset(self):
        return UserNotification.objects.filter(user=self.request.user).order_by("-notification__timestamp")


class NotificationCreateView(CreateModelMixin, GenericAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    post = ListCreateAPIView.post


class NotificationConnectView(CreateModelMixin, GenericAPIView):
    serializer_class = UserNotificationSerializer
    post = ListCreateAPIView.post

    def get_queryset(self):
        return UserNotification.objects.all()
