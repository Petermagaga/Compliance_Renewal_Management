from compliance.domain.statuses import ComplianceStatus
from compliance.domain.transitions import ALLOWED_TRANSITIONS

from compliance.domain.exceptions import InvalidTransitionError

class LifecycleService:
    """
    Controls every lifecycle transition.
    No code Should update Compliancestatus directly
    """
    @staticmethod
    def can_transition(current_status,target_status):

        """
        Returns True if the transition is allowed
        """

        allowed=ALLOWED_TRANSITIONS.get(
            current_status,set()
        )

        return target_status in allowed

