from django.db import models
from accounts.models import Company,Department
from settings.user import AbstractUser

class User(AbstractUser):
    company=models.ForeignKey(Company)
    department=models.ForeignKey(Department)