from django.urls import path

from notifications.views import (NotificationConnectView,
                                 NotificationCreateView,
                                 UserNotificationListView)

urlpatterns = [
    path("", UserNotificationListView.as_view(), name="notifications"),
    path("add/", NotificationCreateView.as_view(), name="add-notification"),
    path("connect/", NotificationConnectView.as_view(), name="connect-notification"),
]
