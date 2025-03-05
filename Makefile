.PHONY: build
.PHONY: static


debug_run_fe:
	cd ./static/js/ && pnpm dev

build:
	cd ./static/js/ && pnpm build


debug_run_api:
	./env/bin/python manage.py runserver 0.0.0.0:8085

stop:
	kill -15 `cat app.pid`


run:
	./env/bin/gunicorn --bind 0.0.0.0:8085 machines.wsgi -w 4

migration:
	./env/bin/python manage.py makemigrations

migrate:
	./env/bin/python manage.py migrate

static:
	rm -rf ./staticfiles/*
	./env/bin/python manage.py collectstatic

install:
	./env/bin/pip install -r requirements.txt

package:
	rm -f machines.zip
	$(MAKE) build
	$(MAKE) static
	git archive --format=zip --output=machines.zip HEAD
	zip -ur machines.zip staticfiles

