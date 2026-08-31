from django.urls import path
from .views import CurrentUserView,ForgotPasswordAPIView,ResetPasswordAPIView

urlpatterns = [
    path("me/",
         CurrentUserView.as_view(),name='current-user',),
    path("forgot-password/",
         ForgotPasswordAPIView.as_view(),name="forgot-password",),
    path("reset-password/",
         ResetPasswordAPIView.as_view(),name="reset-password",)
]
