from dataclasses import dataclass
from datetime import datetime
from typing import Any

@dataclass(frozen=True)

class DomainEvent:
    """
    Base class for all Domain events.
    """
    occurred_at:datetime

    actor:Any= None


    