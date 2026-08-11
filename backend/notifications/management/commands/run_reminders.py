from django.core.management.base import BaseCommand
from notifications.services.reminder_service import ReminderService

class Command(BaseCommand):
    help="Run compliance reminder notifications."

    def handle(self, *args, **options):
        self.stdout.write("Starting compliance reminder job..")
        service=ReminderService()
        service.run()

        self.stdout.write(
            self.style.SUCCESS(
                "Compliance reminder job completed successfully."
            )
        )
