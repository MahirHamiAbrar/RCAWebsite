# Vercel Deployment Guide

## 1. Push repository

Push your code to GitHub/GitLab/Bitbucket.

## 2. Import into Vercel

1. Open `https://vercel.com/new`.
2. Import the repository.
3. Set root directory to `rca-nextjs` (if monorepo view includes parent folder).

## 3. Environment variables in Vercel

Set these in `Project Settings -> Environment Variables`:

- `AUTH_JWT_SECRET`
- `NEXT_PUBLIC_BACKEND_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`
- `AUTH_DATA_FILE` (optional)

Recommended values:
- `NEXT_PUBLIC_BACKEND_URL`:
  - Same-domain deployment: leave empty.
  - Separate backend domain: set full URL.
- `AUTH_JWT_SECRET`: long random string.

## 4. Build and deploy

Vercel default commands are fine for Next.js.

- Build command: `next build`
- Output: `.next`

## 5. Important production note about JSON storage

Vercel serverless filesystem is ephemeral. JSON files are not durable long-term.

Current project keeps JSON as requested for now, but production should move full persistence to Supabase table(s).

## 6. Post-deploy checks

1. Open `/register`, create account.
2. Confirm login works at `/login`.
3. Confirm `/alumni` redirects when logged out.
4. Confirm navbar profile menu and `/profile/edit` works.
5. Confirm Supabase mirror row appears (if configured).
