from django.shortcuts import get_object_or_404
from notifications.queries.notification_selector import  NotificationSelector
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Notification
from .serializers import NotificationSerializer
from .services.notification_service import NotificationService
from core.responses import ApiResponse
from .pagination import NotificationPagination

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


        serializer = NotificationSerializer(
            notifications,
            many=True
        )

        return ApiResponse.success(
            data=serializer.data
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
