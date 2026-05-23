# CareConnect Hub

> A production-ready care agency management SaaS platform for managing staff,
> clients, rostering, incidents, health records, and compliance.

[![Angular](https://img.shields.io/badge/Angular-21-red)](https://angular.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://typescriptlang.org)
[![AWS Amplify](https://img.shields.io/badge/Hosted-AWS%20Amplify-orange)](https://aws.amazon.com/amplify/)
[![License](https://img.shields.io/badge/License-Private-lightgrey)]()

---

## Overview

CareConnect Hub is a full-stack care agency management platform built for
real-world use. It provides a clean, role-based interface for care managers,
senior carers, and support workers to manage their day-to-day operations.

---

## Features

- **Staff Management** — profiles, employment details, training records, compliance tracking
- **Client Management** — client profiles, care plans, linked records
- **Rostering** — shift scheduling, clock in/out tracking
- **Incident Reporting** — log and track incidents with client/staff links
- **Health Reports** — vitals, food/fluid intake, observations, concerns
- **ABC Charts** — antecedent-behaviour-consequence behavioural records
- **Role-Based Access** — admin, manager, senior carer, carer role system
- **Dark Mode** — persistent theme with CSS variable system
- **Leaderboard** — staff engagement (planned)
- **Daily & Hourly Notes** — care notes by shift (in development)

---

## Screenshots

> _Add screenshots of dashboard, staff list, health reports, login page_

| Dashboard                                  | Staff Profile                      | Health Report                        |
| ------------------------------------------ | ---------------------------------- | ------------------------------------ |
| ![dashboard](docs/screenshots/dashboard.png) | ![staff](docs/screenshots/staff.png) | ![health](docs/screenshots/health.png) |

---

## Tech Stack

### Frontend

| Technology     | Version | Purpose                        |
| -------------- | ------- | ------------------------------ |
| Angular        | 21      | SPA framework                  |
| TypeScript     | 5.9     | Type safety                    |
| SCSS           | —      | Styling with CSS variables     |
| Angular Router | 21      | Lazy-loaded routes with guards |
| NgRx           | 21      | State management (planned)     |
| JWT Decode     | 4       | Token parsing for auth         |

### Backend (separate repo)

| Technology            | Purpose                |
| --------------------- | ---------------------- |
| Django                | REST API               |
| Django REST Framework | API endpoints          |
| SimpleJWT             | Token auth             |
| SQLite → PostgreSQL  | Database (dev → prod) |

### Infrastructure

| Service           | Purpose                   |
| ----------------- | ------------------------- |
| AWS Amplify       | Frontend hosting + CI/CD  |
| AWS Lightsail     | Backend API server        |
| AWS RDS (planned) | PostgreSQL for production |
| AWS S3 (planned)  | Document/file storage     |

---

## Project Structure

care-platform/
│
├── careplatform-backend/          # Django REST API
│   ├── abc_charts/
│   ├── clients/
│   ├── config/
│   ├── core/
│   ├── health_reports/
│   ├── incidents/
│   ├── rostering/
│   ├── staff/
│   ├── visits/
│   ├── manage.py
│   ├── requirements.txt
│   └── .env.example
│
├── careplatform-frontend/         # Angular frontend
│   ├── .angular/
│   ├── .vscode/
│   ├── node_modules/
│   ├── public/
│   ├── src/
│   │   ├── app/                   # Feature modules + components
│   │   ├── assets/                # Images, icons, branding
│   │   ├── environments/          # environment.ts / environment.prod.ts
│   │   └── index.html
│   ├── angular.json
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.spec.json
│   └── README.md
│
├── venv/                          # Python virtual environment (local only)
├── .gitignore
└── README.md                      # Main project documentation

---

## Local Setup

### Prerequisites

- Node.js 20+
- npm 11+
- Angular CLI 21: `npm install -g @angular/cli`
- Django backend running on `localhost:8000`

### Frontend

```bash
git clone https://github.com/yourusername/care-platform.git
cd care-platform/careplatform-frontend
npm install
ng serve
# Open http://localhost:4200
```

### Backend

```bash
cd care-platform
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## AWS Deployment

### Frontend — AWS Amplify

1. Push frontend to a GitHub repo
2. Connect repo to AWS Amplify in the AWS Console
3. Set build settings:

```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm install
       build:
         commands:
           - npm run build -- --configuration production
     artifacts:
       baseDirectory: dist/careplatform-frontend/browser
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
```

4. Set environment variable in Amplify Console:
   - `NG_APP_API_URL` = `https://your-backend-url.com/api`

### Backend — AWS Lightsail

1. Create a Lightsail instance (Ubuntu 22.04, 2GB RAM)
2. Install Python, nginx, gunicorn
3. Configure nginx to proxy to gunicorn on port 8000
4. Set `ALLOWED_HOSTS` and `CORS_ALLOWED_ORIGINS` in Django settings
5. Point your domain to the Lightsail static IP

### Environment Config Strategy

```typescript
// src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://api.careconnecthub.co.uk/api'
};
```

Never commit real API URLs to git. For Amplify, use environment variables set in the Amplify Console.

---

## Roadmap

- [X] Staff management (CRUD, training, documents)
- [X] Client management
- [X] Rostering + clock in/out
- [X] Incident reporting
- [X] Health reports
- [X] ABC charts
- [X] Role-based access control (guards + sidebar)
- [X] Dark mode with CSS variables
- [ ] Daily & hourly notes
- [ ] Push notifications
- [ ] Staff compliance dashboard
- [ ] Document upload to S3
- [ ] Finance module
- [ ] Mobile-responsive layout
- [ ] PostgreSQL migration (dev → prod)
- [ ] End-to-end tests (Playwright)

---

## Development Notes

- All API URLs are configured via `src/environments/environment.ts`
- Dark mode is persisted to `localStorage` under the key `dark_mode`
- Auth tokens stored in `localStorage` as `access_token` / `refresh_token`
- The `AuthService` decodes JWT claims to determine role and user info
- All protected routes use Angular route guards (`authGuard`, `managerGuard`, `adminGuard`)

---

## Contributing

This is a private portfolio project. Not currently accepting external contributions.

---

© 2025–2026 CareConnect Hub · Built by Brian Mbevi
