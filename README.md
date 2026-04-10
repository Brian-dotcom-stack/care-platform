# Care Platform

A full-stack care management web application built with Django and Angular.

## Tech Stack

- **Backend:** Python, Django, Django REST Framework
- **Frontend:** Angular, TypeScripts, Angular Material
- **Database:** SQLite (development), PostgreSQL (production)

## Features

- Staff login and profiles
- Client information and support care plans
- Rostering and shift management
- Incident reporting
- Health reports
- ABC behavaviour charts
- Activity report forms
- Staff clock in / clock out

## Setup

### Backend

```bash
cd care-platform
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd careplatform-frontend
npm install 
ng serve
```

## Status

Work in progress - currently building the staff info module.