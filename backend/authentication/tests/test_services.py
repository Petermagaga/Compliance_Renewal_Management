from django.test import TestCase

from authentication.services.authentication_service import (
    AuthenticationService,
)

from .factories import UserFactory


class AuthenticationServiceTests(
    TestCase
):

    def test_login(self):

        user = UserFactory(
            password="Password123!"
        )

        result = AuthenticationService.login(
            user.email,
            "Password123!"
        )

        self.assertIn(
            "access",
            result,
        )

        self.assertIn(
            "refresh",
            result,
        )