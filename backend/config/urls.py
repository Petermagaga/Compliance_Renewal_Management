
from django.contrib import admin
from django.urls import path,include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/compliance/',include('compliance.urls') ),
    path('api/dashboard/',include('analytics.urls')),
]
