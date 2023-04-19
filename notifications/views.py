from rest_framework.generics import ListCreateAPIView, GenericAPIView
from rest_framework.mixins import CreateModelMixin, ListModelMixin

from notifications.models import UserNotification, Notification
from notifications.serializers import UserNotificationSerializer, \
    NotificationSerializer, UserNotificationListSerializer


class UserNotificationListView(ListModelMixin, GenericAPIView):
    serializer_class = UserNotificationListSerializer
    get = ListCreateAPIView.get

    def get_queryset(self):
        return UserNotification.objects.filter(users=self.request.user).order_by("-notifications__timestamp")


class NotificationCreateView(CreateModelMixin, GenericAPIView):
    serializer_class = NotificationSerializer
    queryset = Notification.objects.all()
    post = ListCreateAPIView.post


class NotificationConnectView(CreateModelMixin, GenericAPIView):
    serializer_class = UserNotificationSerializer
    post = ListCreateAPIView.post

    def get_queryset(self):
        return UserNotification.objects.all()

