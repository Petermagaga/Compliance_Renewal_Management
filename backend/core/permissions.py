from rest_framework.permissions import IsAuthenticated


class IsAuthenticatedUser(IsAuthenticated):
    """
    Base permission used throughout the platform.
    """
    pass