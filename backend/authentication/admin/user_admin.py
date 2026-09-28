from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from authentication.models import User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    """
    Internal administration for platform users.
    """
    def get_queryset(self, request):
        queryset = super().get_queryset(request)

        # System super admins can see all users
        if request.user.is_superuser:
            return queryset

        # Company admins/staff only see users in their company
        return queryset.filter(company=request.user.company)

    def get_readonly_fields(self, request, obj=None):
        readonly = list(super().get_readonly_fields(request, obj))

        if not request.user.is_superuser:
            readonly.append("company")

        return tuple(readonly)
    
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

    def get_fieldsets(self, request, obj=None):
        if request.user.is_superuser:
            return super().get_fieldsets(request, obj)

        return (
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
                        "is_verified",
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

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if (
            db_field.name == "department"
            and not request.user.is_superuser
        ):
            kwargs["queryset"] = db_field.remote_field.model.objects.filter(
                company=request.user.company
            )

        return super().formfield_for_foreignkey(
            db_field,
            request,
            **kwargs
        )


    def formfield_for_choice_field(self, db_field, request, **kwargs):
        if (
            db_field.name == "role"
            and not request.user.is_superuser
        ):
            allowed_roles = {
                "manager",
                "compliance_officer",
                "viewer",
            }

            kwargs["choices"] = [
                choice
                for choice in db_field.choices
                if choice[0] in allowed_roles
            ]

        return super().formfield_for_choice_field(
            db_field,
            request,
            **kwargs
        )


    def save_model(self, request, obj, form, change):
        if not request.user.is_superuser and not change:
            obj.company = request.user.company
        super().save_model(request, obj, form, change)