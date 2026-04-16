from django.core.files.storage import default_storage
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = "Cleanup journal and template media files"

    def handle(self, *args, **kwargs):
        for folder in ["journal_entries", "trading_account_templates"]:
            _, files = default_storage.listdir(folder)

            for file in files:
                path = f"{folder}/{file}"
                self.stdout.write(f"Deleting: {path}")
                default_storage.delete(path)

        self.stdout.write(self.style.SUCCESS("Cleanup complete"))
