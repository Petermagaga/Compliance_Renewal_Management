from django.shortcuts import get_object_or_404
from notifications.queries.notification_selector import  NotificationSelector
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .models import Notification
from .serializers import NotificationSerializer
from .services.notification_service import NotificationService
from core.responses import ApiResponse
class NotificationListAPIView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        notifications = NotificationSelector.for_user(
            request.user
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