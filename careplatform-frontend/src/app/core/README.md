# core/

Singleton services, guards, and interceptors that are provided once at the app level.

## Current contents (referenced from app/auth/ for now)
- `app/auth/auth.service.ts` — JWT token parsing, role checks
- `app/auth/auth.guard.ts` — authGuard, managerGuard, adminGuard
- `app/auth/auth.interceptor.ts` — attaches Bearer token to all requests

## Future migration
When the app grows, move the above files into this folder and update imports.
The goal is:

```
core/
  auth/
    auth.service.ts
    auth.guard.ts
    auth.interceptor.ts
```
