#!/bin/bash
set -e

cd /var/app/staging

# Activate virtualenv
source /var/app/venv/*/bin/activate

echo "Running migrations..."
python manage.py migrate --noinput

echo "Collecting static files..."
python manage.py collectstatic --noinput