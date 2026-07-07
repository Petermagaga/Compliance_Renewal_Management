from rest_framework.response import Response
from rest_framework import status


class ApiResponse:
    """
    Standardized API response builder.
    """

    @staticmethod
    def success(
        data=None,
        message="Request completed successfully.",
        status_code=status.HTTP_200_OK,
    ):
        return Response(
            {
                "success": True,
                "message": message,
                "data": data,
            },
            status=status_code,
        )

    @staticmethod
    def error(
        message="Request failed.",
        errors=None,
        status_code=status.HTTP_400_BAD_REQUEST,
    ):
        return Response(
            {
                "success": False,
                "message": message,
                "errors": errors,
            },
            status=status_code,
        )