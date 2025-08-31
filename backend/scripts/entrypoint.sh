#!/usr/bin/env bash
set -e

# Run database migrations
python manage.py migrate --noinput

# (Optional) collect static files if you plan to serve them
# python manage.py collectstatic --noinput

# Start Gunicorn server (Railway will set $PORT)
exec gunicorn amka.wsgi:application --bind 0.0.0.0:${PORT}
