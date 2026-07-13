from enum import Enum

class Roles(str,Enum):
    SUPER_ADMIN="super_admin"
    COMPANY_ADMIN="company_admin"
    MANAGER="manager"
    COMPLIANCE_OFFICER="compliance_officer"
    VIEWER="viewer"

    