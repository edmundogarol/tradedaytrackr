import os
from pathlib import Path

from corsheaders.defaults import default_headers

if "DEVENV" in os.environ:
    from dotenv import load_dotenv

    load_dotenv()

    DEBUG = True
    WEB_APP_URL = "http://localhost:3000"
    WEB_API_URL = "http://localhost:8000"
else:
    DEBUG = False
    WEB_APP_URL = "https://tradedaytrackr.com"
    WEB_API_URL = "https://tradedaytrackr.com"

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "handlers": {
        "console": {
            "class": "logging.StreamHandler",
        },
    },
    "root": {
        "handlers": ["console"],
        "level": "INFO",
    },
    "loggers": {
        "django.security.DisallowedHost": {
            "handlers": ["console"],
            "level": "CRITICAL",
            "propagate": False,
        },
        "django.server": {
            "handlers": ["console"],
            "level": "WARNING",
            "propagate": False,
        },
        "django.request": {
            "handlers": ["console"],
            "level": "ERROR",
            "propagate": False,
        },
    },
}

SECRET_KEY = os.getenv("SECRET_KEY")
WHOP_WEBHOOK_ACTIVATE_MEMBERSHIP_SECRET = os.getenv(
    "WHOP_WEBHOOK_ACTIVATE_MEMBERSHIP_SECRET"
)
WHOP_WEBHOOK_DEACTIVATE_MEMBERSHIP_SECRET = os.getenv(
    "WHOP_WEBHOOK_DEACTIVATE_MEMBERSHIP_SECRET"
)
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

if "DEVENV" in os.environ:
    ALLOWED_HOSTS = ["*"]
else:
    ALLOWED_HOSTS = [
        "tradedaytrackr-env-3.eba-rs968fza.us-west-2.elasticbeanstalk.com"
        "api.tradedaytrackr.com",
        "tradedaytrackr.com",
        ".tradedaytrackr.com",
        "localhost",
        "127.0.0.1",
    ]

if "DEVENV" in os.environ:
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False
    SESSION_COOKIE_SAMESITE = "Lax"
    CSRF_COOKIE_SAMESITE = "Lax"
    SESSION_COOKIE_DOMAIN = None
    CSRF_COOKIE_DOMAIN = None
else:
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SESSION_COOKIE_SAMESITE = "None"
    CSRF_COOKIE_SAMESITE = "None"
    SESSION_COOKIE_DOMAIN = ".tradedaytrackr.com"
    CSRF_COOKIE_DOMAIN = ".tradedaytrackr.com"

CSRF_TRUSTED_ORIGINS = [
    "http://localhost:3000",
    "http://192.168.254.161:3000",
    "https://tradedaytrackr.vercel.app",
    "https://tradedaytrackr.com",
    "https://www.tradedaytrackr.com",
]
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://192.168.254.161:3000",
    "https://tradedaytrackr.vercel.app",
    "https://tradedaytrackr.com",
    "https://www.tradedaytrackr.com",
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
    "storages",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
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
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "user": "20/min",  # adjust to your needs
    },
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

if "DEVENV" in os.environ:
    DEFAULT_FILE_STORAGE = "django.core.files.storage.FileSystemStorage"
    MEDIA_URL = "/media/"
    MEDIA_ROOT = os.path.join(BASE_DIR, "media")

else:
    STORAGES = {
        "default": {
            "BACKEND": "storages.backends.s3boto3.S3Boto3Storage",
        },
        "staticfiles": {
            "BACKEND": "whitenoise.storage.CompressedManifestStaticFilesStorage",
        },
    }
    AWS_STORAGE_BUCKET_NAME = os.getenv("AWS_STORAGE_BUCKET_NAME")
    AWS_S3_REGION_NAME = os.getenv("AWS_S3_REGION_NAME")
    AWS_S3_FILE_OVERWRITE = False
    AWS_DEFAULT_ACL = None
    AWS_S3_CUSTOM_DOMAIN = f"{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com"
    MEDIA_URL = f"https://{AWS_S3_CUSTOM_DOMAIN}/"

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

if "DEVENV" in os.environ:
    EMAIL_HOST = "0.0.0.0"
    EMAIL_PORT = 1025
    EMAIL_USE_TLS = False
    EMAIL_HOST_USER = ""
    EMAIL_HOST_PASSWORD = ""
else:
    EMAIL_HOST = os.getenv("EMAIL_HOST")
    EMAIL_PORT = 587
    EMAIL_USE_TLS = True
    EMAIL_USE_SSL = False
    EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
    EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")

DEFAULT_FROM_EMAIL = "no-reply@tradedaytrackr.com"

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


LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


STATIC_URL = "/static/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_STORAGE = "whitenoise.storage.CompressedStaticFilesStorage"

EMAIL_ASSETS_BASE_URL = (
    "https://tradedaytrackr-extra-assets.s3.us-west-2.amazonaws.com/logos"
)

CELERY_BROKER_URL = "redis://127.0.0.1:6379/0"
CELERY_ACCEPT_CONTENT = ["json"]
CELERY_TASK_SERIALIZER = "json"
