from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed

class SchedulerAuthentication(BaseAuthentication):

    def authenticate(self,request):

        authorization=request.headers.get("Authorization")

        if not authorization:
            raise AuthenticationFailed(
                "Authorization headeris required."
            )

        if not authorization.startswith("Bearer "):
            raise AuthenticationFailed(
                "Invalid authorization header."
            )

        token= authorization.split(" ",1)[1]

        #temporary verification step
        #google cloud scheduler


        if not token:
            raise AuthenticationFailed(
                "invalid token"
            )
        return None