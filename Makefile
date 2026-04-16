# Shortcuts for running TradeDayTrackR Web App

gui:
	cd frontend && yarn && yarn run dev

prodgui:
	cd frontend && yarn && yarn run build

watchgui:
	cd frontend && yarn && yarn run watchdev

lint:
	cd frontend && yarn && yarn run lint

deletemigrations:
	cd backend/djangoapi/migrations && find . ! -name __init__.py -maxdepth 1 -type f -delete

deletedb:
	rm db.sqlite3

stoppg:
	brew services stop postgresql@14 || true

enterpsql:
	psql -U postgres -d postgres

dev:
	source venv/bin/activate && brew services start postgresql

predev: stoppg dev

build:
	python -m pip install --upgrade pip && python -m pip install -r requirements.txt && pip list

prodbuild:
	python3 -m pip install --upgrade pip && python -m pip install -r requirements.txt && pip list

env: dev build

migrate:
	DEVENV=development python manage.py migrate

makemigrations:
	DEVENV=development python manage.py makemigrations 

cleanmedia:
	DEVENV=development python manage.py cleanup_media

static:
	DEVENV=deployment python manage.py collectstatic --noinput 

migrations: makemigrations migrate

redis:
	DEVENV=development redis-server

workers:
	DEVENV=development celery -A backend worker --loglevel=info

server:
	DEVENV=development python manage.py runserver 0.0.0.0:8000

testbe:
	DEVENV=development pytest

# Mailpit Server http://0.0.0.0:8025/
mailserver:
	brew services start mailpit

stopmail:
	brew services stop mailpit

buildrun: env server

resetdb: deletemigrations deletedb makemigrations migrate

localapp: gui server

app: gui predev build migrate	server

dockerapp: gui build migrate	server

ebdeploy: 
	eb deploy

deploy: prodgui static	ebdeploy

deploybeupdates: prodgui build static ebdeploy