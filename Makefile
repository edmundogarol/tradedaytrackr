# TradeDayTrackR — local single-user app
#
# First time:   make setup     (installs everything, then asks you to create a login)
# Every day:    make start      (runs backend + frontend together; Ctrl-C stops both)

# --- Simple entry points ---

setup: install migrate superuser
	@echo ""
	@echo "Setup complete. From now on just run:  make start"

start:
	./start.sh

# --- Backend ---

install:
	python3 -m venv venv || true
	. venv/bin/activate && python -m pip install --upgrade pip && python -m pip install -r requirements.txt

server:
	. venv/bin/activate && python manage.py runserver 0.0.0.0:8000

makemigrations:
	. venv/bin/activate && python manage.py makemigrations

migrate:
	. venv/bin/activate && python manage.py migrate

migrations: makemigrations migrate

superuser:
	. venv/bin/activate && python manage.py createsuperuser

cleanmedia:
	. venv/bin/activate && python manage.py cleanup_media

testbe:
	. venv/bin/activate && pytest

deletemigrations:
	cd backend/djangoapi/migrations && find . ! -name __init__.py -maxdepth 1 -type f -delete

deletedb:
	rm -f db.sqlite3

resetdb: deletemigrations deletedb makemigrations migrate

# --- Frontend ---

gui:
	cd frontend && yarn && yarn run watchdev

buildgui:
	cd frontend && yarn && yarn run build

lint:
	cd frontend && yarn && yarn run lint
