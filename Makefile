# Shortcuts for running TradeDayTrackR Web App

gui:
	cd frontend && yarn && yarn run dev

prodgui:
	cd frontend && yarn && yarn run build

watchgui:
	cd frontend && yarn && yarn run watchdev

deletemigrations:
	cd backend/djangoapi/migrations && find . ! -name __init__.py -maxdepth 1 -type f -delete

deletedb:
	rm db.sqlite3

stoppg:
	brew services stop postgresql@14 || true

dev:
	source venv/bin/activate && brew services start postgresql

predev: stoppg dev

build:
	python -m pip install --upgrade pip && python -m pip install -r requirements.txt && pip list

env: dev build

svenv: source venv/bin/activate

migrate:
	DEVENV=development python manage.py migrate

makemigrations:
	DEVENV=development python manage.py makemigrations 

static:
	DEPLOYENV=deployment python manage.py collectstatic --noinput 

migrations: makemigrations migrate

server:
	DEVENV=development python manage.py runserver 0.0.0.0:8000

mailserver:
	brew services start mailhog

stopmail:
	brew services stop mailhog

buildrun: env server

resetdb: deletemigrations deletedb makemigrations migrate

localapp: gui server

app: gui predev build migrate	server

dockerapp: gui build migrate	server

ebdeploy: 
	eb deploy

deploy: prodgui static	ebdeploy

deploybeupdates: prodgui build static ebdeploy