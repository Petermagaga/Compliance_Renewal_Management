from datetime import date


def calculate_days_remaining(expiry_date):
    """
    Returns the number of days until expiry.
    """
    return (expiry_date - date.today()).days


def is_expired(expiry_date):
    return calculate_days_remaining(expiry_date) < 0