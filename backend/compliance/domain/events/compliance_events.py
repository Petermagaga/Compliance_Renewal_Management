from dataclasses import dataclass

from .base import DomainEvent


@dataclass(frozen=True)
class ComplianceSubmitted(DomainEvent):
    compliance_item: object


@dataclass(frozen=True)
class ComplianceApproved(DomainEvent):
    compliance_item: object


@dataclass(frozen=True)
class ComplianceActivated(DomainEvent):
    compliance_item: object


@dataclass(frozen=True)
class ComplianceExpiring(DomainEvent):
    compliance_item: object


@dataclass(frozen=True)
class ComplianceExpired(DomainEvent):
    compliance_item: object


@dataclass(frozen=True)
class ComplianceArchived(DomainEvent):
    compliance_item: object