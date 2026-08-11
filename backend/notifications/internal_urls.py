from django.urls import path 
from .views import run_reminders

urlpatterns=[
    path("run-reminders/",run_reminders,name="run-reminders")
]