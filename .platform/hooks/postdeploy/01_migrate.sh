#!/bin/bash

# Exit on error
set -e

# Go to app directory
cd /var/app/current

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput