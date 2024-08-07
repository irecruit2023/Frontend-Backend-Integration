import random
from django.core.mail import send_mail
from django.conf import settings


def create_password():
    alphabets_lower = "abcdefghijklmnopqrstuvwxyz"
    alphabets_upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    characters = "@#$!?&"
    mixture = alphabets_upper + alphabets_lower + characters
    pass_length = 8
    password = "".join(random.sample(mixture, pass_length))
    return password


def send_confirm_email(email, password, name):
    try:
        subject = "Account Creation Notification"
        message = f"Hello,\n{name}\n You account has been created successfully on iRecruit.\n With your username:- {email} and password:- {password}" \
                  f"\nNOTE- The password is generated by the system is encrypted and secured, You can either keep it or reset it."
        email_from = settings.EMAIL_HOST
        send_mail(subject, message, email_from, [email])
        return None

    except Exception as e:
        return None
