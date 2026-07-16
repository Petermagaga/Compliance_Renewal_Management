from compliance.domain.events.dispatcher import EventDispatcher

from compliance.domain.events.compliance_events import (
    ComplianceExpired,
)

from compliance.domain.events.handlers import (
    log_event,
    notify_users,
    update_dashboard,
)

dispatcher = EventDispatcher()

dispatcher.register(
    ComplianceExpired,
    log_event,
)

dispatcher.register(
    ComplianceExpired,
    notify_users,
)

dispatcher.register(
    ComplianceExpired,
    update_dashboard,
)