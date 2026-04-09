# Buyer Portal

A real-estate buyer portal where users can browse property listings and manage their favourites list.

## Tech Stack

- **Frontend:** React 19, Vite, TailwindCSS v4, TanStack Query, Axios
- **Backend:** Node.js, Express 5, TypeORM
- **Database:** PostgreSQL
- **Auth:** JWT (access + refresh token)

---

## Prerequisites

- Node.js v18+
- PostgreSQL v14+ running locally

---

## Setup

### 1. Create the database and user

You'll need PostgreSQL running locally. If you don't have a SQL client, you can use [pgAdmin](https://www.pgadmin.org/) or [DBeaver](https://dbeaver.io/) to run the following:

```sql
CREATE USER buyer_portal WITH PASSWORD 'buyer_portal';
CREATE DATABASE buyer_portal OWNER buyer_portal;
```

Or if you prefer the terminal:

```bash
psql -U postgres -c "CREATE USER buyer_portal WITH PASSWORD 'buyer_portal';"
psql -U postgres -c "CREATE DATABASE buyer_portal OWNER buyer_portal;"
```

### 2. Add backend environment variables

Create `backend/.env`:

```env
PORT=5000
HOST=127.0.0.1
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=buyer_portal
DB_USER=buyer_portal
DB_PASSWORD=buyer_portal

JWT_SECRET=yklsdjfiodfjsdofd
JWT_ACCESS_EXPIRES_IN=15m

JWT_REFRESH_SECRET=sdfjsdlkfjsdlkfjsdlkfjsdl
JWT_REFRESH_EXPIRES_IN=7d
```

### 3. Install dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd ../frontend && npm install
```

### 4. Start the backend

```bash
cd backend
npm run dev
```

The server starts at `http://localhost:5000`. On first run, TypeORM automatically creates the required tables.

### 5. Seed the database

In a separate terminal:

```bash
cd backend
npm run seed
```

This adds 30 sample property listings.

### 6. Start the frontend

```bash
cd frontend
npm run dev
```

App runs at `http://localhost:5173`.

---

## Example Flows

### Sign up and add a favourite

1. Go to `http://localhost:5173/register`
2. Fill in your details — for example:
   - **Name:** John Doe
   - **Email:** john.doe@example.com
   - **Password:** John@123
   - Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character (`@$!%*?&`)
3. You'll be redirected to the dashboard after registering
4. Browse the property listings — click the ♡ button on any card to save it to your favourites
5. Your favourites appear at the top of the dashboard
6. Click ♡ again to remove a property from your favourites
7. Click any property card to see its full details

### Token refresh (automatic)

Access tokens expire after 15 minutes. When that happens, the app automatically requests a new one using the refresh token stored in a cookie — you won't notice anything. If you've been away for more than 7 days, you'll be redirected to the login page.

---

## API Overview

All protected routes require an `Authorization: Bearer <token>` header.

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| POST | `/api/v1/auth/register` | No | Register a new user |
| POST | `/api/v1/auth/login` | No | Login |
| POST | `/api/v1/auth/refresh-token` | No | Refresh access token |
| GET | `/api/v1/auth/profile` | Yes | Get current user profile |
| GET | `/api/v1/properties` | Yes | List properties (paginated, searchable) |
| GET | `/api/v1/properties/:id` | Yes | Get a single property |
| GET | `/api/v1/favourites` | Yes | Get your favourites |
| POST | `/api/v1/favourites` | Yes | Add a favourite |
| DELETE | `/api/v1/favourites/:propertyId` | Yes | Remove a favourite |

`GET /api/v1/properties` supports `page`, `limit`, and `search` query parameters.

---

## Notes

- Passwords are hashed with bcryptjs — never stored in plain text
- Refresh tokens are in HttpOnly cookies (not accessible via JavaScript)
- Users can only read and modify their own favourites