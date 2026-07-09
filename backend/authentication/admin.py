from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):

    list_display = (
        "username",
        "email",
        "role",
        "company",
        "department",
        "is_active",
    )

    list_filter = (
        "role",
        "company",
        "is_active",
    )

    search_fields = (
        "username",
        "email",
    )

    fieldsets = UserAdmin.fieldsets + (
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