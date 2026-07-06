class ReminderService:

    def __init__(self, company=None):
        self.company = company

    def upcoming(self):
        return []