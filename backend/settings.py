import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv()

from corsheaders.defaults import default_headers

if "DEVENV" in os.environ:
    DEBUG = True
    WEB_APP_URL = "http://localhost:3000"
    WEB_API_URL = "http://localhost:8000"
else:
    DEBUG = False
    WEB_APP_URL = "http://tradedaytrackr.com"
    WEB_API_URL = "http://tradedaytrackr.com"

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# TODO - DEVOPS - Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/6.0/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv("SECRET_KEY")
WHOP_WEBHOOK_ACTIVATE_MEMBERSHIP_SECRET = os.getenv(
    "WHOP_WEBHOOK_ACTIVATE_MEMBERSHIP_SECRET"
)
WHOP_WEBHOOK_DEACTIVATE_MEMBERSHIP_SECRET = os.getenv(
    "WHOP_WEBHOOK_DEACTIVATE_MEMBERSHIP_SECRET"
)


if "DEVENV" in os.environ:
    ALLOWED_HOSTS = ["*"]
else:
    # Update with Elastic Beanstalk URL when deployed
    ALLOWED_HOSTS = [
        "http://tradedaytrackr-env.eba-rs968fza.us-west-2.elasticbeanstalk.com/",
        "tradedaytrackr.com",
    ]

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://192.168.254.161:3000",
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://192.168.254.161:3000",
]
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOW_HEADERS = list(default_headers) + [
    "content-type",
    "authorization",
]

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_swagger",
    "corsheaders",
    "backend.djangoapi",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "templates"],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
            "libraries": {
                "staticfiles": "django.templatetags.static",
            },
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

REST_FRAMEWORK = {
    "DEFAULT_PAGINATION_CLASS": "rest_framework.pagination.PageNumberPagination",
    "DEFAULT_SCHEMA_CLASS": "rest_framework.schemas.coreapi.AutoSchema",
    "PAGE_SIZE": 10,
}

AUTH_USER_MODEL = "djangoapi.User"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USERNAME"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOSTNAME"),
        "PORT": os.getenv("DB_PORT"),
    }
}

EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_USE_TLS = False

if "DEVENV" in os.environ:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_HOST = "0.0.0.0"
    EMAIL_PORT = 1025
else:
    EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
    EMAIL_USE_TLS = True


# Password validation
# https://docs.djangoproject.com/en/6.0/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
        "OPTIONS": {
            "min_length": 8,
        },
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/6.0/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/6.0/howto/static-files/

STATIC_URL = "/static/"
STATICFILES_DIRS = [
    BASE_DIR / "backend" / "static",
]
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")

EMAIL_ASSETS_BASE_URL = (
    "https://tradedaytrackr-extra-assets.s3.us-west-2.amazonaws.com/logos"
)

CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
