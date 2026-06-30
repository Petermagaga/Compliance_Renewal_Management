from django.db import models
class Company(models.Model):
    name=models.CharField(max_length=255)
    email=models.EmailField()
    phone=models.CharField( max_length=50,blank=True,null=True)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Department(models.Model):
    company=models.ForeignKey(Company,on_delete=models.CASCADE, related_name="departments")
    name=models.CharField(max_length=255)
    manager_name=models.CharField(max_length=255)
    manager_email=models.EmailField()

    def __str__(self):
        return f"{self.name} -{self.company.name}"
    
    