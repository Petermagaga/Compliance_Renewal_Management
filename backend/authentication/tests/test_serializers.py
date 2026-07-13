from django.test import TestCase

from authentication.serializers import (
    ChangePasswordSerializer
)


class SerializerTests(
    TestCase
):

    def test_password_match(self):

        serializer = ChangePasswordSerializer(
            data={
                "current_password":"old",

                "new_password":"Password123!",

                "confirm_password":"Password123!"
            }
        )

        self.assertTrue(
            serializer.is_valid()
        )

    def test_password_mismatch(self):

        serializer = ChangePasswordSerializer(
            data={
                "current_password":"old",

                "new_password":"Password123!",

                "confirm_password":"wrong"
            }
        )

        self.assertFalse(
            serializer.is_valid()
        )