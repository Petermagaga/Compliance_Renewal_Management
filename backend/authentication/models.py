from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
)

from accounts.models import Company, Department
from .managers import UserManager


ROLE_CHOICES = [
    ("super_admin", "Super Admin"),
    ("company_admin", "Company Admin"),
    ("manager", "Manager"),
    ("compliance_officer", "Compliance Officer"),
    ("viewer", "Viewer"),
]


class User(AbstractBaseUser, PermissionsMixin):

    email = models.EmailField(unique=True)

    phone = models.CharField(
        max_length=30,
        blank=True,
        null=True
    )

    role = models.CharField(
        max_length=50,
        choices=ROLE_CHOICES,
        default="viewer"
    )

    company = models.ForeignKey(
        Company,
        on_delete=models.CASCADE,
        related_name="users",
        null=True,
        blank=True,
    )

    department = models.ForeignKey(
        Department,
        on_delete=models.SET_NULL,
        related_name="users",
        null=True,
        blank=True,
    )

    profile_photo = models.ImageField(
        upload_to="profiles/",
        blank=True,
        null=True,
    )

    is_verified = models.BooleanField(default=False)

    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email