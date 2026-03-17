# Supabase Setup (Detailed)

This project already works using JSON storage. Supabase is optional mirror storage until you fully migrate.

## 1. Create Supabase project

1. Go to `https://supabase.com`.
2. Create a new project.
3. Open `Project Settings -> API`.
4. Copy:
   - Project URL
   - Publishable (anon) key

## 2. Configure local environment

In `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY=YOUR_PUBLISHABLE_KEY
```

## 3. Create table for mirrored users

In Supabase SQL Editor, run:

```sql
create table if not exists public.rca_users (
  id uuid primary key,
  full_name text not null,
  email text not null unique,
  series integer not null,
  department text not null,
  phone_number text not null unique,
  blood_group text,
  membership_type text not null,
  profile_picture_url text,
  social_links jsonb not null default '[]'::jsonb,
  roll_number text,
  year_of_graduation integer,
  currently_working_at text,
  designation text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

## 4. Add simple RLS policy (optional now)

For early development, you can disable RLS for this table:

```sql
alter table public.rca_users disable row level security;
```

Later, enable RLS and add stricter policies before production hardening.

## 5. Verify mirror writes

1. Start app.
2. Register a user.
3. Check `rca_users` table rows.
4. If row exists, mirror is working.

If no row appears but registration succeeds, JSON storage is still working and Supabase mirror likely needs env/table fix.
