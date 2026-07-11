import uuid

from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import(
    AbstractBaseUser,PermissionsMixin
)

from accounts.models import Department,Company
from django.contrib.auth.models import  (
    AbstractBaseUser,PermissionsMixin
)

from authentication.managers import UserManager


class UserRole(models.TextChoices):
    SUPER_ADMIN ="super_admin","Super Admin"
    COMPANY_ADMIN="company_admin","Company Admin"
    MANAGER="manager","Manager"
    COMPLIANCE_OFFICER="compliance_officer","Compliance Officer"
    VIEWER="viewer","Viewer"


class User(AbstractBaseUser,PermissionsMixin):
    """
    Identity entity for thee platform
    """
    id=models.UUIDField(primary_key=True,default=uuid.uuid4,editable=False)
    email=models.EmailField(unique=True,db_index=True)

    first_name=models.CharField(max_length=100)
    last_name=models.CharField(max_length=100)

    phone=models.CharField(max_length=30,blank=True)

    profile_photo=models.ImageField(
        upload_to="profiles/",blank=True,null=True
    )
    company=models.ForeignKey(Company,on_delete=models.CASCADE,
                               related_name="users",blank=True,null=True)
    

    department=models.ForeignKey(Department,on_delete=models.SET_NULL,related_name="users",blank=True,null=True)
    role=models.CharField(max_length=40,choices=UserRole.choices,default=UserRole.VIEWER,)

    is_active=models.BooleanField(default=True)
    is_staff=models.BooleanField(default=False,)
    is_verified=models.BooleanField(default=False)
    date_joined=models.DateTimeField(auto_now_add=True)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now=True,)
    objects=UserManager()

    USERNAME_FIELD="email"

    REQUIRED_FIELDS=[
        "first_name","last_name"
    ]

    class Meta:
        ordering=["email"]

        indexes=[
            models.Index(fields=["company"]),
            models.Index(fields=["department"]),
            models.Index(fields=["role"]),
            models.Index(fields=["is_active"]),
        ]

    
    def clean(self):
        """
        Business Validation
        """
        super().clean()

        if (
            self.role !=UserRole.SUPER_ADMIN and self.company is None
        ):
            
            raise ValidationError(
                {
                    "company":(
                        "Company is required for"
                        "non-super-admin users."
                    )
                }
            )
        
    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
    
    def __str__(self):
        return self.email
    
    




