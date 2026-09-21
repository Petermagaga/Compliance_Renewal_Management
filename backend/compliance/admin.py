from django.contrib import admin

from .models import ComplianceItem, ReminderLog


@admin.register(ComplianceItem)
class ComplianceItemAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        queryset = super().get_queryset(request)

        # System super admins can see everything
        if request.user.is_superuser:
            return queryset

        # Company admins/staff only see their own company's items
        return queryset.filter(company=request.user.company)


@admin.register(ReminderLog)
class ReminderLogAdmin(admin.ModelAdmin):

    def get_queryset(self, request):
        queryset = super().get_queryset(request)

        # System super admins can see everything
        if request.user.is_superuser:
            return queryset

        # Company admins/staff only see reminders
        # belonging to their company's compliance items
        return queryset.filter(
            compliance_item__company=request.user.company
        )