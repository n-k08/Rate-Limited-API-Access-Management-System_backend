# Rate Limited API Access Management System

## Features
- JWT Auth
- Role-based access (USER/ADMIN)
- Custom rate limiting per user
- MongoDB backend

## Local Setup
```
npm install
cp .env.example .env
# Set MONGO_URI (MongoDB Atlas), JWT_SECRET
npm run dev
```

## API Endpoints
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | / | - | Health check |
| POST | /api/auth/register | - | Register user |
| POST | /api/auth/login | - | Login |
| GET | /api/protected | Bearer token | Rate-limited protected API |
| GET | /api/usage/me | Bearer token | My usage |
| POST | /api/admin/rate-limit | Bearer ADMIN | Set global rate limit |
| GET | /api/admin/usage | Bearer ADMIN | All usage stats |

## Render Deploy
1. Push to GitHub repo
2. New Web Service on render.com
3. Build: `npm install`
4. Start: `npm start`
5. Env vars: MONGO_URI, JWT_SECRET (from .env.example)
6. Free MongoDB Atlas: https://mongodb.com/atlas

**Base URL: https://your-app.onrender.com**

## Tested: No errors, all endpoints functional!
