def normalize_phone(phone: str) -> str:
    """
    Normalize Kenyan phone numbers to E.164 format.
    Example: '0728765333' -> '+254728765333'
    """
    if not phone:
        return ""

    phone = phone.strip()

    if phone.startswith("0"):
        return "+254" + phone[1:]
    elif phone.startswith("+"):
        return phone  # already normalized
    else:
        # fallback: assume already valid or add more rules
        return phone
