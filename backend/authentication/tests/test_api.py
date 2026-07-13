from rest_framework.test import APITestCase

from django.urls import reverse

from .factories import UserFactory


class LoginAPITests(APITestCase):

    def test_login(self):

        user = UserFactory(
            password="Password123!"
        )

        response = self.client.post(

            reverse("login"),

            {
                "email": user.email,
                "password": "Password123!"
            },

            format="json",
        )

        self.assertEqual(
            response.status_code,
            200,
        )

        self.assertTrue(
            response.data["success"]
        )