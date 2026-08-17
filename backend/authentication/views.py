from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response


class CurrentUserView(APIView):
    permission_classes= [IsAuthenticated]

    def get(self,request):
        user=request.user

        return Response(
            {
                "success":True,
                "message":"User profile loaded successfully",
                "data":{
                    "id":str(user.id),
                    "email":user.email,
                    "first_name":user.first_name,
                    "last_name":user.last_name,
                    "full_name":user.full_name,
                    "phone":user.phone,
                    "role":user.role,
                    "company":user.company.name if user.company else None,
                    "department":(
                        user.department.name
                        if user.department
                        else None
                    ),
                    "is_verified":user.is_verified,
                }
            }
        )