from dataclasses import dataclass, field
from datetime import datetime
from typing import Any


@dataclass(frozen=True, kw_only=True)
class DomainEvent:
    """
    Base class for all Domain events.
    """
    occurred_at: datetime = field(default_factory=datetime.now)
    actor: Any = None