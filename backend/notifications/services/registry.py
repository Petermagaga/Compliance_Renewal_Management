from notifications.services.providers.email_provider import EmailProvider
from notifications.services.providers.whatsapp_provider import  WhatsAppProvider



PROVIDERS={
    "email":EmailProvider(),
    "whatsapp":WhatsAppProvider(),
}
