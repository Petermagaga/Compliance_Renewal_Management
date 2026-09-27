from django.contrib import admin
from .models import Company,Department

admin.site.register(Company)
@admin.register(Department)
class DepartmentAdmin(admin.ModelAdmin):
    def get_queryset(self,request):
        queryset=super().get_queryset(request)
        if request.user.is_superuser:
            return queryset
        return queryset.filter(company=request.user.company)