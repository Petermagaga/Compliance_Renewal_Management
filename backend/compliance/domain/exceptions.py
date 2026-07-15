class LifecycleError(Exception):
    """Base lifecycle exception."""


class InvalidTransitionError(LifecycleError):
    """Raised when an invalid lifecycle transition is attempted."""


class ArchivedItemError(LifecycleError):
    """Raised when an archived item is modified."""