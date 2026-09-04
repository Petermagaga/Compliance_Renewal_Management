from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action
from rest_framework.response import Response


from .serializers import ReminderLogSerializer,ComplianceItemSerializer,ComplianceRenewalSerializer
from .models import ComplianceItem,ReminderLog
from .querysets import ComplianceQuerySet
from .pagination import CompliancePagination  

from audit.services import ActivityService  
from audit.models import Activity
from audit.serializers import ActivitySerializer

class ComplianceItemViewSet(viewsets.ModelViewSet):
    permission_classes= [IsAuthenticated]
    serializer_class=ComplianceItemSerializer
    queryset = ComplianceItem.objects.all().order_by("-created_at")
    pagination_class=CompliancePagination
    def get_queryset(self):
        return (
            ComplianceQuerySet
            .visible_to(self.request.user).order_by("-created_at"))

    def perform_create(self, serializer):

        item = serializer.save()

        ActivityService.log(

            activity_type="created",

            title="Compliance Item Created",

            description=(f"{item.name} was added to the compliance registry"

            ),
            compliance_item=item,

            user=self.request.user,

        )

    def perform_update(self, serializer):

        item = serializer.save()

        ActivityService.log(

            activity_type="updated",

            title="Compliance Item Updated",

            description=item.name,
            compliance_item=item,
            user=self.request.user,
        )

    @action(detail=True,methods=["get"])
    def audit(self,request,pk=None):
        item=self.get_object()

        activities=(
            Activity.objects.filter(compliance_item=item).select_related("user")
        )
        serializer=ActivitySerializer(activities,many=True)

        return Response(serializer.data)

    @action(detail=True, methods=["get"])
    def reminders(self, request, pk=None):

        item = self.get_object()

        reminders = (
            ReminderLog.objects
            .filter(compliance_item=item)
            .order_by("-sent_at")
        )

        serializer = ReminderLogSerializer(
            reminders,
            many=True,
        )

        return Response(serializer.data)


    @action(detail=True,methods=["post"])
    def renew(self,request,pk=None):
        item=self.get_object()
        serializer=ComplianceRenewalSerializer(
            data=request.data
        )
        serializer.is_valid(raise_exception=True)

        return Response(
            {
                "success":True,
                "message":"Renewal request is valid",
                "data":serializer.validated_data
            }
        )

class ReminderLogViewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=ReminderLogSerializer
    queryset=ReminderLog.objects.all()
    def get_queryset(self):
        return ReminderLog.objects.all()