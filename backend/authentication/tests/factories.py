import factory
from django.contrib.auth import get_user_model

from accounts.models import Company, Department

User = get_user_model()


class CompanyFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Company

    name = "Acme Ltd"
    email = "info@acme.com"
    phone = "0700000000"


class DepartmentFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Department

    company = factory.SubFactory(CompanyFactory)
    name = "Compliance"
    manager_name = "Jane Doe"
    manager_email = "jane@acme.com"


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = factory.Sequence(
        lambda n: f"user{n}@example.com"
    )

    first_name = "Peter"
    last_name = "Magaga"

    company = factory.SubFactory(
        CompanyFactory
    )

    department = factory.SubFactory(
        DepartmentFactory
    )

    role = "viewer"

    is_active = True

    @factory.post_generation
    def password(obj, create, extracted, **kwargs):
        password = extracted or "Password123!"
        obj.set_password(password)
        if create:
            obj.save()