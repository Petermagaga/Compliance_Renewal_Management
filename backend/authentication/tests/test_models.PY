from django.core.exceptions import ValidationError
from django.test import TestCase

from .factories import UserFactory


class UserModelTests(TestCase):

    def test_full_name(self):

        user = UserFactory()

        self.assertEqual(
            user.full_name,
            "Peter Magaga"
        )

    def test_company_required(self):

        user = UserFactory(
            company=None,
            role="viewer",
        )

        with self.assertRaises(
            ValidationError
        ):
            user.full_clean()