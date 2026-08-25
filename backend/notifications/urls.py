from django.urls import path

from .views import (
    NotificationListAPIView,
    NotificationUnreadAPIView,
    NotificationReadAPIView,
    NotificationReadAllAPIView,
    NotificationStatsAPIView,
    NotificationDeleteReadAPIView,
    NotificationDeleteAPIView,
    run_reminders,

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


    path(
        "stats/",
        NotificationStatsAPIView.as_view(),
        
        name="notification-stats",
    ),


    path(
        "read/",
        NotificationDeleteReadAPIView.as_view(),

        name="notification-delete-read",
    ),
    path("run-reminders/",run_reminders,name="run-reminders"),

    path(
        "<int:pk>/",
        NotificationDeleteAPIView.as_view(),
        name="notification-delete",
    ),


]