import requests

from django.conf import settings
from django.template.loader import render_to_string


class PasswordResetEmailService:

    @staticmethod
    def send(
        user,
        reset_url,
    ):

        context = {
            "recipient": user,
            "reset_url": reset_url,
            "logo_url": (
                "https://res.cloudinary.com/cz2q5slp/image/upload/"
                "f_auto,q_auto/logo_jiuujm"
            ),
        }

        html = render_to_string(
            "emails/password_reset.html",
            context,
        )

        text = render_to_string(
            "emails/password_reset.txt",
            context,
        )

        payload = {
            "sender": {
                "name": settings.BREVO_SENDER_NAME,
                "email": settings.BREVO_SENDER_EMAIL,
            },

            "to": [
                {
                    "email": user.email,
                    "name": user.full_name,
                }
            ],

            "subject": "Reset your Compliance Management password",

            "htmlContent": html,

            "textContent": text,
        }

        headers = {
            "accept": "application/json",
            "api-key": settings.BREVO_API_KEY,
            "content-type": "application/json",
        }

        try:

            response = requests.post(
                "https://api.brevo.com/v3/smtp/email",
                headers=headers,
                json=payload,
                timeout=15,
            )

            print(
                "========== PASSWORD RESET EMAIL =========="
            )

            print(
                "Status:",
                response.status_code,
            )

            print(
                "Response:",
                response.text,
            )

            response.raise_for_status()

            return True

        except requests.RequestException as exc:

            print(
                "========== PASSWORD RESET EMAIL ERROR =========="
            )

            print(exc)

            return False