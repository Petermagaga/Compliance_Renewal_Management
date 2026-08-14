from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import Company, Department,NotificationPreference
from .serializers import CompanySerializer, DepartmentSearializers,NotificationPreferenceSerializer
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.status import HTTP_400_BAD_REQUEST

class CompanyViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticated]

    serializer_class = CompanySerializer

    queryset = Company.objects.all().order_by("name")

    def get_queryset(self):

        user = self.request.user

        if not user.is_authenticated:
            return Company.objects.none()

        if user.role == "super_admin":
            return Company.objects.all().order_by("name")

        if user.company:
            return Company.objects.filter(
                id=user.company.id
            )

        return Company.objects.none()

    @action(
        detail=False,
        methods=["get", "patch"],
        url_path="me"
    )
    def me(self, request):

        company = request.user.company

        if not company:
            return Response(
                {
                    "success": False,
                    "message": "No company is associated with this account."
                },
                status=404
            )

        if request.method == "GET":

            serializer = self.get_serializer(company)

            return Response(
                {
                    "success": True,
                    "data": serializer.data
                }
            )

        serializer = self.get_serializer(
            company,
            data=request.data,
            partial=True
        )

        serializer.is_valid(raise_exception=True)

        serializer.save()

        return Response(
            {
                "success": True,
                "message": "Company settings updated successfully.",
                "data": serializer.data
            }
        )

class DepartmentViewSet(viewsets.ReadOnlyModelViewSet):

    permission_classes = [IsAuthenticated]

    serializer_class = DepartmentSearializers

    queryset = Department.objects.all().order_by("name")



class NotificationPreferenceAPIView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self,request):
        preferences,created=(
            NotificationPreference.objects.get_or_create(user=request.user)
        )
        
        serializer=NotificationPreferenceSerializer(preferences)
        return Response({
            "success":True,
            "message":"Notification Preferences loaded successfully.",
            "data":serializer.data
        })

    def patch(self,request):
        preferences,created=(
            NotificationPreference.objects.get_or_create(
                user=request.user
            )
        )

        serializer= NotificationPreferenceSerializer(
            preferences,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response({
                "success":True,
                "message":"Notification preferences updated successfully.",
                "data":serializer.data,
            })

        return Response(
            {
                "success":False,
                "message":"Unable to update notification preferences",
                "errors":serializer.data,
            },
            status=HTTP_400_BAD_REQUEST,
        )