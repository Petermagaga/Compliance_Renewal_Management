from django.core.management.base import BaseCommand
from compliance.services import (
    update_compliance_status,
    process_reminders
)


class Command(BaseCommand):
    help = "Check compliance expiries"

    def handle(self, *args, **kwargs):
        update_compliance_status()
        process_reminders()

        self.stdout.write(
            self.style.SUCCESS("Compliance check completed")
        )