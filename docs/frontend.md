# Frontend Auth and UX Guide

## Implemented routes

- `GET /register` - dynamic registration form
- `GET /login` - login via email/phone + password
- `GET /profile/edit` - profile editor for authenticated users
- `GET /alumni` - now protected (redirects to login if not authenticated)

## Navbar behavior

- Left: existing RCA logo kept.
- Right:
  - Logged out: `Login` + `Register` buttons.
  - Logged in: circular profile avatar menu.
- Avatar fallback:
  - If `profilePictureUrl` is missing, first two characters of full name are shown.
- Profile menu items:
  - `Edit Profile`
  - `Logout`

## Registration UX details

- Form grouping:
  - Name + Email + Phone in one row group.
  - Series + Department side by side.
- Membership-specific fields appear conditionally.
- Social links:
  - Add with a `+ Add Social Link` flow.
  - Supports predefined options + `other` type.
  - Supports remove/delete entries.
- Password checks:
  - Confirm password matching.
  - Strength meter shown visually.

## Backend URL config

Frontend API calls use:
- `NEXT_PUBLIC_BACKEND_URL`

From:
- `src/lib/config.ts`

For same-domain deployment, keep it empty.
For separate backend host, set full URL (example: `https://api.domain.com`).
