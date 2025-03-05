# Project overview and notes
  - Django is used for backend and React for frontend
  - Django has api routes defined and rest are serving react view template which will do routing on frontend side (react-router-dom)
  - React-bootstrap lib is used for UI
  - Frontend source is in static/js/src/ dir
  - Backend source is in machines/ dir
  - Makefile is used to save common commands


# Develpment
## Setting up dev environment
### Django API env setup
  - check machines/config.ini
    - set DEBUG = True
    - if using dedicated dev DB server instead of sqlite add connection params machines/config.ini
  - install python if it's not installed
  - install virtualenv and make new python env called `env` (run `virtualenv env`)
  - run `make install` from the project root to install required python libs
  - run `make migrate` to execute all model migrations and create all tables
  - in case you need some minimal data that is not inserted by migration, connect to db and insert what's needed
    - run `env/bin/python manage.py createsuperuser` from root dir to create superuser for /admin site
  - run `make static` to save all static files to one location (`./staticfiles` dir). Will be served by webpack dev server
  - run `make debug_run_api` to start the django service
### Frontend/React env setup
  - install nodejs if it's not installed
  - install pnpm package manager
  - run pnpm install from the `static/js/` dir to install all frontend dependencies
  - run `make debug_run_fe` to start the webpack dev server which will serve static files and autoreload frontend changes in dev env


# Production
## Setting up environment for the first deploy
### On dev machine from project root
  - run `make package` to zip the latest code version (machines.zip will be produced)
  - copy machines.zip to production web server and extract at desired location
### On prod server machine
  - create machines/config.ini and fill it with prod values (not copied because we don't wont to overwrite it on next update)
    - set DEBUG = False in machines/config.ini
    - add DB connection params for prod in machines/config.ini
  - install python if it's not installed
  - install virtualenv and make new python env called `env` (run `virtualenv env`)
  - run `make install` from the project root to install required python libs
  - run `make migrate` to execute all model migrations and create all tables
  - in case you need some minimal data that is not inserted by migration, connect to db and insert what's needed
    - run `env/bin/python manage.py createsuperuser` from root dir to create superuser for /admin site
  - run `make run` to start the service
  - configure web server (on production server machine) to serve this app on port 8000 (default)
    - if you want web server to serv static files instead of Django, point /static/ url to serve ./staticfiles in the root of project dir
  - set up some program manager to take care of the app process to start/restart when needed

## Updating service
  - if models are changed run `make migration` to generate migration file
  - ensure that all changes are commited because `make package` will take the last commit from git
  - run `make package` to zip the latest code version (machines.zip will be produced)
  - copy machines.zip to production web server and overwrite exiting files (make sure machines/config.ini is present)
  - restart the service



