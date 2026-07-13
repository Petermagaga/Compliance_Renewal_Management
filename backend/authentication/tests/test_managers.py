from django.contrib.auth import get_user_model
from django.test import TestCase

User = get_user_model()


class UserManagerTests(TestCase):

    def test_create_user(self):
        user = User.objects.create_user(
            email="user@example.com",
            password="Password123!",
            first_name="Peter",
            last_name="Magaga",
        )

        self.assertEqual(
            user.email,
            "user@example.com",
        )

        self.assertTrue(
            user.check_password(
                "Password123!"
            )
        )

    def test_email_required(self):

        with self.assertRaises(ValueError):

            User.objects.create_user(
                email="",
                password="Password123!"
            )