from  .models import AuditEntry

AuditEntry.objects.select_related(
    "actor"
).order_by(
    "-occurred_at"
)