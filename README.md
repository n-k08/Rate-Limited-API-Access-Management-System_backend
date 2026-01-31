# Rate-Limited API Access Management System – Backend

A Node.js and Express.js backend API for managing secure API access with **role-based authentication, database-backed rate limiting, and persistent usage tracking**.  
The system enforces API usage restrictions based on user roles and ensures accurate tracking, monitoring, and control of API consumption.

---

## 📋 Project Overview

This backend system provides controlled access to protected APIs using:

- JWT-based authentication
- Role-based access control (RBAC)
- Database-backed rate limiting
- Persistent API usage tracking
- Admin-controlled dynamic rate limit configuration

Users are restricted from accessing APIs when they exceed their allowed usage limits within a defined time window. All rate limit data and usage logs are **stored in MongoDB**, ensuring accuracy, persistence, and reliability.

---

## 🛠️ Tech Stack

- Runtime: Node.js  
- Framework: Express.js  
- Database: MongoDB Atlas  
- ODM: Mongoose  
- Authentication: JWT (JSON Web Tokens)  
- Password Hashing: bcryptjs  
- Environment Variables: dotenv  

---

## 👥 User Roles and Permissions

### USER
- Register and log in
- Access protected APIs
- View personal API usage statistics
- Subject to rate limits

### ADMIN
- Register and log in
- Define and manage API rate limits
- View API usage across all users
- Control access policies

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- All protected routes require a valid JWT token
- Role-based access enforced at middleware level
- Tokens are sent via Authorization header:

```
Authorization: Bearer <jwt_token>
```

---

## 🚦 Rate Limiting System

### Features
- Database-backed counters (no in-memory storage)
- Per-user and per-endpoint tracking
- Role-based rate limit rules
- Window-based reset mechanism
- Persistent tracking across server restarts

### Behavior
- Requests exceeding the limit return HTTP 429
- Access blocked until time window resets
- Admin can dynamically update limits

---

## 📡 API Endpoints

### Authentication Routes (`/auth`)

| Method | Endpoint | Access | Description |
|------|--------|--------|-------------|
| POST | /register | Public | Register user or admin |
| POST | /login | Public | Login and receive JWT |

### Admin Routes (`/admin`)

| Method | Endpoint | Access | Description |
|------|--------|--------|-------------|
| POST | /rate-limit | Admin | Configure rate limits |
| GET | /usage | Admin | View all usage logs |

### API Routes (`/api`)

| Method | Endpoint | Access | Description |
|------|--------|--------|-------------|
| GET | /protected | User/Admin | Rate-limited API |
| GET | /my-usage | User/Admin | Personal usage stats |

---

## 📊 Database Schema

### User Collection
```json
{
  "name": "String",
  "email": "String (unique)",
  "password": "String (hashed)",
  "role": "USER | ADMIN",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### RateLimit Collection
```json
{
  "role": "USER | ADMIN",
  "maxRequests": "Number",
  "windowMinutes": "Number"
}
```

### ApiUsage Collection
```json
{
  "userId": "ObjectId",
  "endpoint": "String",
  "count": "Number",
  "windowStart": "Date"
}
```

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas or Local MongoDB
- npm

### Installation

```bash
git clone <repository-url>
cd backend
npm install
```

### Environment Variables (`.env`)

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/ratelimit
JWT_SECRET=your_secret_key
NODE_ENV=development
```

### Run Server

Development:
```bash
npm run dev
```

Production:
```bash
npm start
```

---

## 🔄 Workflow Example

1. Register user
2. Login and receive JWT
3. Admin sets rate limits
4. User accesses protected API
5. Requests blocked after exceeding limit
6. Access restored after window reset

---

## 🔒 Business Rules

- All APIs require JWT authentication
- Rate limits are role-based
- Counters are stored in database only
- Excess requests are blocked immediately
- Admin has full control over policies

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
├── .env
├── package.json
├── README.md
```

---

## 📝 Live Deployment

(To be added)

- Backend: TBD
- Frontend: TBD

---

## 📄 License

ISC
