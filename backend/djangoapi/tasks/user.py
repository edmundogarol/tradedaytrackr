from celery import shared_task
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
        {},
    )

    text_content = """
        Welcome to TradeDayTrackR!

        Your account has been successfully verified and you're ready to start tracking your trading performance.

        Log in and begin journaling your trades today.

        https://tradedaytrackr.com

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
