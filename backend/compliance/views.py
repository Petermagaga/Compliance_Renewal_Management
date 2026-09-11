from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from rest_framework.decorators import action
from rest_framework.response import Response
from compliance.domain.services.lifecycle_service import LifecycleService
from compliance.domain.statuses import ComplianceStatus
from .serializers import (ReminderLogSerializer,
                          ComplianceItemSerializer,
                          ComplianceRenewalSerializer,
                          ComplianceRenewalHistorySerializer)
from .models import ComplianceItem,ReminderLog,ComplianceRenewal
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


    @action(detail=True, methods=["post"])
    def renew(self, request, pk=None):
        item = self.get_object()

        serializer = ComplianceRenewalSerializer(
            data=request.data
        )

        if item.status != ComplianceStatus.RENEWAL_IN_PROGRESS:
            return Response(
                {
                    "success":False,
                    "message":(
                        "Compliance item must be in "
                        "renewal in progress status"
                    )
                }
            )

        serializer.is_valid(raise_exception=True)

        data = serializer.validated_data

        # Save the old information before changing it
        renewal = ComplianceRenewal.objects.create(
            compliance_item=item,
            old_issue_date=item.issue_date,
            old_expiry_date=item.expiry_date,
            new_issue_date=data["new_issue_date"],
            new_expiry_date=data["new_expiry_date"],
            old_document=item.document,
            renewed_by=request.user,
        )

        # Update the current compliance information
        item.issue_date = data["new_issue_date"]
        item.expiry_date = data["new_expiry_date"]

        if data.get("document"):
            item.document = data["document"]
            renewal.new_document = data["document"]
            renewal.save(update_fields=["new_document"])

        item.save(
            update_fields=[
                "issue_date",
                "expiry_date",
                "document",
                "updated_at",
            ]
        )

        # Complete the renewal lifecycle
        LifecycleService.complete_renewal(
            item,
            actor=request.user,
        )

        return Response({
            "success": True,
            "message": "Compliance item renewed successfully.",
            "data": {
                "id": item.id,
                "issue_date": item.issue_date,
                "expiry_date": item.expiry_date,
                "status": item.status,
            }
            
        })

    @action(detail=True,methods=["post"])
    def start_renewal(self, request,pk=None):
        item=self.get_object()

        try:
            LifecycleService.start_renewal(
                item,
                actor=request.user,
            )
        except Exception as error:
            return Response(
                {
                    "success":False,
                    "message": str(error),
                },
                status=400,
            )

        return Response(
            {
                "success":True,
                "message":"Compliance item renewal started.",
                "data":{
                    "id":item.id,
                    "status":item.status,
                } 
            }
        )

    @action(detail=True, methods=["get"])
    def renewal_history(self, request, pk=None):
        item = self.get_object()

        renewals = ComplianceRenewal.objects.filter(
            compliance_item=item
        ).order_by("-renewed_at")

        serializer = ComplianceRenewalHistorySerializer(
            renewals,
            many=True,
        )

        return Response(serializer.data)

    @action(detail=False, methods=["get"], url_path="renewals")
    def all_renewals(self, request):
        renewals = ComplianceRenewal.objects.all().order_by("-renewed_at")

        serializer = ComplianceRenewalHistorySerializer(
            renewals,
            many=True,
        )

        return Response(serializer.data)

    @action(detail=False,methods=["get"],url_path="reminders")
    def all_reminders(self,request):
        reminders=ReminderLog.objects.select_related(
            "compliance_item"
        ).order_by("-sent_at")

        data=[
            {
                "id":reminder.id,
                "compliance_item":reminder.compliance_item.id,
                "compliance_item_name":reminder.compliance_item.name,
                "days_before":reminder.days_before,
                "channel":reminder.channel,
                "status":reminder.status,
                "sent_at":reminder.sent_at,
            }
            for reminder in reminders
        ]
        return Response(data)
    
    @action(detail=False,methods=["get"],url_path="audit")
    def all_audit(self,request):
        activities=(
            Activity.objects.select_related("user","compliance_item")
            .order_by("-created_at")
        )
        serializer=ActivitySerializer(
            activities,
            many=True,
        )

        return Response(serializer.data)

class ReminderLogViewset(viewsets.ModelViewSet):
    permission_classes=[IsAuthenticated]
    serializer_class=ReminderLogSerializer
    queryset=ReminderLog.objects.all()
    def get_queryset(self):
        return ReminderLog.objects.all()