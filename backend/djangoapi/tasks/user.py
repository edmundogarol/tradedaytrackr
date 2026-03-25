from celery import shared_task
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


@shared_task
def send_verification_email(email, verification_url):

    subject = "Verify your email - TradeDayTrackR"

    html_content = render_to_string(
        "emails/verify_account.html",
        {"verification_url": verification_url},
    )

    text_content = f"""
        Verify your email to complete your TradeDayTrackR account setup.
        {verification_url}
        """

    email_message = EmailMultiAlternatives(
        subject,
        text_content,
        "no-reply@tradedaytrackr.com",
        [email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()


@shared_task
def send_welcome_email(email):

    subject = "Welcome to TradeDayTrackR 🎉"

    html_content = render_to_string(
        "emails/welcome.html",
        {"url": settings.WEB_APP_URL},
    )

    text_content = """
        Welcome to TradeDayTrackR!

        Your account has been successfully verified and you're ready to start tracking your trading performance.

        Log in and begin journaling your trades today.

        {settings.WEB_APP_URL}

        Good trading,
        The TradeDayTrackR Team
        """

    email_message = EmailMultiAlternatives(
        subject,
        text_content,
        "no-reply@tradedaytrackr.com",
        [email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()


@shared_task
def send_reset_password_email(email, reset_url):

    subject = "Reset your password - TradeDayTrackR"

    html_content = render_to_string(
        "emails/reset_password.html",
        {"reset_url": reset_url},
    )

    text_content = f"""
        Reset your TradeDayTrackR password using the link below:
        {reset_url}
    """

    email_message = EmailMultiAlternatives(
        subject,
        text_content,
        "no-reply@tradedaytrackr.com",
        [email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()


@shared_task
def send_membership_activated_email(email):

    subject = "Your TradeDayTrackR Membership is Active 🎉"

    html_content = render_to_string(
        "emails/membership_activated.html",
        {"url": settings.WEB_APP_URL},
    )

    text_content = """
        Your membership has been successfully activated.

        You now have full access to TradeDayTrackR features.

        {settings.WEB_APP_URL}
        """

    email_message = EmailMultiAlternatives(
        subject,
        text_content,
        "no-reply@tradedaytrackr.com",
        [email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()


@shared_task
def send_connect_account_email(email):

    subject = "Complete Your TradeDayTrackR Access"

    html_content = render_to_string(
        "emails/connect_account.html",
        {"email": email, "url": settings.WEB_APP_URL},
    )

    text_content = f"""
        You already purchased access 🎉

        To unlock your membership:

        → Make sure your TradeDayTrackR account uses this email:
        {email}

        → Or sign up using this email

        Once matched, your access will activate automatically.
        """

    email_message = EmailMultiAlternatives(
        subject,
        text_content,
        "no-reply@tradedaytrackr.com",
        [email],
    )

    email_message.attach_alternative(html_content, "text/html")
    email_message.send()
