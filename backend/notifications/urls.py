from django.urls import path

from .views import (
    NotificationListAPIView,
    NotificationUnreadAPIView,
    NotificationReadAPIView,
    NotificationReadAllAPIView,
)

urlpatterns = [

    path(
        "",
        NotificationListAPIView.as_view(),
        name="notifications",
    ),

    path(
        "unread-count/",
        NotificationUnreadAPIView.as_view(),
        name="notification-count",
    ),

    path(
        "<int:pk>/read/",
        NotificationReadAPIView.as_view(),
        name="notification-read",
    ),

    path(
        "read-all/",
        NotificationReadAllAPIView.as_view(),
        name="notification-read-all",
    ),
]