from django.shortcuts import get_object_or_404
from notifications.queries.notification_selector import  NotificationSelector
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from notifications.services.reminder_service import ReminderService

from rest_framework.decorators import api_view,permission_classes

from .models import Notification
from .serializers import NotificationSerializer
from .services.notification_service import NotificationService
from core.responses import ApiResponse
from .pagination import NotificationPagination
from django.db.models import Count
from django.conf import settings

from notifications.services.reminder_service import ReminderService


class NotificationListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):


        notifications = NotificationSelector.for_user(
            request.user
        )

        channel = request.GET.get("channel")

        if channel:
            notifications = notifications.filter(
                channel=channel
            )

        status = request.GET.get("status")

        if status:
            notifications = notifications.filter(
                status=status
            )

        unread = request.GET.get("unread")

        if unread == "true":
            notifications = notifications.filter(
                is_read=False
            )

        paginator=NotificationPagination()

        page=paginator.paginate_queryset(
            notifications,
            request,
        )


        serializer = NotificationSerializer(
            page,
            many=True
        )

        return paginator.get_paginated_response(
            serializer.data
        )
    

class NotificationUnreadAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        count = NotificationSelector.unread_count(
            request.user
        )

        return ApiResponse.success(
            data={
                "unread": count
            }
        )

class NotificationReadAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(
        self,
        request,
        pk
    ):

        notification = get_object_or_404(

            Notification,

            pk=pk,

            recipient=request.user

        )

        NotificationService.mark_as_read(notification)


        return ApiResponse.success(
            message="Notification marked as read."
        )
    


class NotificationReadAllAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def patch(
        self,
        request
    ):

        NotificationService.mark_all_as_read(
            request.user
        )

        return ApiResponse.success(
            message="All notifications marked as read."
        )


class NotificationDeleteAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):

        notification = get_object_or_404(

            Notification,

            pk=pk,

            recipient=request.user,

        )

        notification.delete()

        return ApiResponse.success(
            message="Notification deleted."
        )




class NotificationStatsAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        notifications = Notification.objects.filter(
            recipient=request.user
        )

        data = {

            "total": notifications.count(),

            "unread": notifications.filter(
                is_read=False
            ).count(),

            "email": notifications.filter(
                channel="email"
            ).count(),

            "whatsapp": notifications.filter(
                channel="whatsapp"
            ).count(),

            "in_app": notifications.filter(
                channel="in_app"
            ).count(),

            "sent": notifications.filter(
                status="sent"
            ).count(),

            "failed": notifications.filter(
                status="failed"
            ).count(),

        }

        return ApiResponse.success(
            data=data
        )

class NotificationDeleteReadAPIView(APIView):

    permission_classes=[IsAuthenticated]

    def delete(self,request):
        deleted,_=Notification.objects.filter(
            recipient=request.user,
            is_read=True,
        ).delete()

        return ApiResponse.succes(
            data={
                "deleted":deleted,
            },
            message="Read notifications deleted"
        )


@api_view(["POST"])
@permission_classes([AllowAny])
def run_reminders(request):

    scheduler_token=request.headers.get("X-Scheduler-Token")
    if scheduler_token!= settings.SCHEDULER_SECRET:
        return Response(
            {
                "success":False,
                "message":"Unauthorized scheduler request",
            },
            status=status.HTTP_401_UNAUTHORIZED,
        )

    try:
        ReminderService().run()
        return Response(
            {
                "success":True,
                "message":"Compliance reminder job completed successfully",

            },
            status=status.HTTP_200_OK,
        )
    except Exception as error:
        return Response(
            {
                "success":False,
                "message":"Compliance reminder job failed",
                "Error": str(error)
            },
            status=status.HTTP_500_INTERNAL_SERVER_ERROR,
        )