# **CareplatformBackend**

This backend is built using Django and Django REST Framework.
It provides the API layer for staff, clients, rostering, incidents, health reports, ABC charts, and visit logs.

## Development server

To start the backend development server, run:

bash

```
python manage.py runserver
```

Once the server is running, the API will be available at:

Code

```
http://localhost:8000/
```

Ensure your virtual environment is activated and dependencies are installed.

## Environment setup

Create a `.env` file in the backend root:

Code

```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
ALLOWED_HOSTS=*
CORS_ALLOWED_ORIGINS=http://localhost:4200
```

Install dependencies:

bash

```
pip install -r requirements.txt
```

Apply migrations:

bash

```
python manage.py migrate
```

Create a superuser:

bash

```
python manage.py createsuperuser
```

## Project structure

Code

```
careplatform-backend/
├── abc_charts/          # ABC behaviour records
├── clients/             # Client profiles and details
├── config/              # Django settings, URLs, WSGI
├── core/                # Shared utilities, authentication, base models
├── health_reports/      # Health and wellbeing logs
├── incidents/           # Incident reporting
├── rostering/           # Shift scheduling and visit planning
├── staff/               # Staff profiles, roles, compliance
├── visits/              # Visit logs and check-in/out
│
├── manage.py
├── requirements.txt
└── .env.example
```

Each module exposes REST endpoints following standard CRUD patterns.

## Authentication

The backend uses JWT authentication via SimpleJWT.

### Obtain token

http

```
POST /api/token/
```

### Refresh token

http

```
POST /api/token/refresh/
```

Include the token in requests:

Code

```
Authorization: Bearer <token>
```

## Running tests

To execute backend tests:

bash

```
python manage.py test
```

## Additional resources

* [https://docs.djangoproject.com/](https://docs.djangoproject.com/?utm_source=copilot.com "docs.djangoproject.com")
* [https://www.django-rest-framework.org/](https://www.django-rest-framework.org/?utm_source=copilot.com "www.django-rest-framework.org")
