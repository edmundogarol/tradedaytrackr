def can_send_email(user, email_type):
    prefs = getattr(user, "email_preferences", None)

    if not prefs:
        return True

    if prefs.unsubscribe_all:
        return False

    return getattr(prefs, email_type, True)
