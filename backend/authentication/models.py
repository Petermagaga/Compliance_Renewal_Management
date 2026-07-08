from django.db import models
from accounts.models import Company,Department
from django.contrib.auth.base_user import AbstractUser

class User(AbstractUser):
    company=models.ForeignKey(Company)
    department=models.ForeignKey(Department)