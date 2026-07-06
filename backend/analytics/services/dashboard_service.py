from .kpi_service import KPIService
from .chart_service import ChartService
from .reminder_service import ReminderService
from .activity_service import ActivityService
from .health_service import HealthService


class DashboardService:
    """
    Orchestrates all dashboard services and returns
    a single payload for the frontend.
    """

    def __init__(self, company=None):
        self.company = company

    def build(self):
        return {
            "summary": KPIService(self.company).get_summary(),
            "charts": ChartService(self.company).get_charts(),
            "recent_items": ActivityService(self.company).recent_items(),
            "upcoming_reminders": ReminderService(self.company).upcoming(),
            "system_health": HealthService(self.company).calculate(),
        }