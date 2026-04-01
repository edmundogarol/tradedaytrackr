#!/bin/bash

# Exit on error
set -e

# Go to app directory
cd /var/app/current

# Activate virtualenv
source /var/app/venv/*/bin/activate

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput