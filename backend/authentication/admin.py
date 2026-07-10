from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "email",
        "role",
        "company",
        "department",
        "is_active",
    )

    search_fields = (
        "email",
    )

    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                )
            },
        ),
        (
            "Business Information",
            {
                "fields": (
                    "phone",
                    "role",
                    "company",
                    "department",
                    "profile_photo",
                    "is_verified",
                )
            },
        ),
    )