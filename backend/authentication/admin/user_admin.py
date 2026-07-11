from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from authentication.models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Internal administration for platform users.
    """

    ordering = ("email",)

    list_display = (
        "email",
        "full_name",
        "company",
        "department",
        "role",
        "is_active",
        "is_verified",
        "is_staff",
    )

    list_filter = (
        "role",
        "company",
        "department",
        "is_active",
        "is_verified",
        "is_staff",
    )

    search_fields = (
        "email",
        "first_name",
        "last_name",
    )

    readonly_fields = (
        "id",
        "created_at",
        "updated_at",
        "last_login",
        "date_joined",
    )

    fieldsets = (

        (
            "Identity",
            {
                "fields": (
                    "id",
                    "email",
                    "password",
                )
            },
        ),

        (
            "Personal Information",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "phone",
                    "profile_photo",
                )
            },
        ),

        (
            "Organization",
            {
                "fields": (
                    "company",
                    "department",
                    "role",
                )
            },
        ),

        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_verified",
                    "groups",
                    "user_permissions",
                )
            },
        ),

        (
            "Audit",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )

    add_fieldsets = (

        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "email",
                    "first_name",
                    "last_name",
                    "password1",
                    "password2",
                    "company",
                    "department",
                    "role",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )