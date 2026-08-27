
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import(
    TokenObtainPairView,TokenRefreshView
)
from django.conf.urls.static import static
from django.conf import settings
urlpatterns = [
    path("api/token/",TokenObtainPairView.as_view(),name="token_obtain_pair"),
    path("api/token/refresh/",TokenRefreshView.as_view(),name="token_refresh"),
    path('admin/', admin.site.urls),
    path('api/compliance/',include('compliance.urls') ),
    path('api/analytics/',include('analytics.urls')),
    path("api/notifications/",include("notifications.urls")),
    path("api/audit/",include("audit.urls")),
    path("api/accounts/",include("accounts.urls")),
    path("api/reminders/",include("reminders.urls")),
    path("api/auth/",include("authentication.urls")),
    path( "api/internal/",include("notifications.internal_urls") ),

    path("health/",include("cores.urls")),

]

if settings.DEBUG:
    urlpatterns+= static(
        settings.STATIC_URL,
        document_root=settings.MEDIA_ROOT
    )