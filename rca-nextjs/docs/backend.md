# Backend Architecture (Bun + Next.js Route Handlers)

This project uses Next.js route handlers as the backend API and runs well with Bun (`bun run dev`, `bun run build`).

## What was implemented

- Authentication API routes:
  - `POST /api/auth/register`
  - `POST /api/auth/login`
  - `POST /api/auth/logout`
  - `GET /api/auth/me`
  - `GET /api/auth/profile`
  - `PATCH /api/auth/profile`
- Password hashing via `bcryptjs`.
- Session authentication with secure HTTP-only JWT cookie (`rca_auth`) via `jose`.
- Route protection middleware for:
  - `/alumni`
  - `/profile/*`
- Primary user storage in local JSON file:
  - `data/auth-users.json` (auto-created)
- Optional mirror to Supabase table `rca_users`.

## Data model

Stored in `src/types/auth.ts` and persisted in `data/auth-users.json`.

Required for all members:
- `fullName`
- `email`
- `series`
- `department`
- `phoneNumber` (Bangladeshi validation)
- `membershipType`
- `password`

Optional for all members:
- `bloodGroup`
- `profilePictureUrl`
- `socialLinks`

Membership-specific:
- Regular + Committee: `rollNumber`
- Alumni: `yearOfGraduation`, `currentlyWorkingAt`, `designation`

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Required:
- `AUTH_JWT_SECRET`

Recommended:
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

Optional:
- `AUTH_DATA_FILE`

## Run with Bun

```bash
bun install
bun run dev
```

## Notes on Supabase usage

The backend works immediately with JSON storage only.
If Supabase is configured and `rca_users` table exists, user records are mirrored there.
If table/setup is missing, backend will continue without breaking (mirror failures are ignored).
