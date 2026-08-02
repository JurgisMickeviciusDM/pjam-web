# P&J Asset Management — Website

A full recreation of the P&J Asset Management site (originally built on Wix
Studio) as a self-hosted **Next.js** application with a real front end **and**
back end.

- 🎬 **Animated marketing site** — Home, About, Strategy, Investments, Contact,
  Privacy Policy, with scroll reveals, parallax, text-mask headings, count-ups
  and a progress bar (Framer Motion).
- 🔐 **Private Client Portal** — session-based authentication with a per-client
  portfolio dashboard and announcements.
- 🛠️ **Admin / CMS** — edit every piece of site copy without touching code, and
  read + manage contact-form enquiries.
- 📨 **Contact form** — submissions are stored in PostgreSQL and optionally
  emailed over SMTP.
- 🐳 **Docker-first deploy** — one `docker compose up` for app + database on your
  own VPS.

## Tech stack

| Layer      | Choice                                             |
| ---------- | -------------------------------------------------- |
| Framework  | Next.js 16 (App Router) + React 19 + TypeScript    |
| Styling    | Tailwind CSS v4                                    |
| Animation  | Framer Motion                                      |
| Database   | PostgreSQL + Prisma ORM                            |
| Auth       | JWT session cookie (`jose`) + `bcryptjs`           |
| Email      | Nodemailer (optional SMTP)                         |
| Deploy     | Docker + docker-compose                            |

## Project structure

```
app/
  (marketing)/        Public site — shares Header/Footer, force-dynamic
    page.tsx          Home
    about/ strategy/ investments/ contact/ privacy-policy/
  portal/             Private client portal (login + dashboard)
  admin/              CMS + enquiries (login + panel)
  api/
    contact/          POST contact submissions
    health/           Health check
components/
  motion/             Reveal, Parallax, TextReveal, Counter, GrowBar, progress
  site/               Header, Footer, Logo, nav, logout
  forms/              Contact + login forms
  admin/              Content editor, admin nav
lib/
  content.ts          Default copy + CMS field schema (single source of truth)
  content-server.ts   Merge DB overrides over defaults
  auth.ts session.ts  Sessions & password hashing
  actions/            Server actions (auth, content, messages)
  prisma.ts mail.ts
prisma/
  schema.prisma seed.ts
```

## Local development

**Prerequisites:** Node 20+ and either Docker (for Postgres) or a local
PostgreSQL instance.

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env          # then edit values as needed

# 3. Start PostgreSQL (Docker one-liner)
docker run --name pj-db -e POSTGRES_USER=pj -e POSTGRES_PASSWORD=pjpassword \
  -e POSTGRES_DB=pjam -p 5432:5432 -d postgres:16-alpine

# 4. Create the schema + demo data
npm run db:migrate            # creates tables (first run: names it "init")
npm run db:seed               # admin + demo client + sample announcement

# 5. Run the dev server
npm run dev                   # http://localhost:3000
```

### Demo accounts (created by the seed)

| Role   | URL             | Email                          | Password         |
| ------ | --------------- | ------------------------------ | ---------------- |
| Admin  | `/admin/login`  | admin@pjassetmanagement.com    | `ChangeMe!2026`  |
| Client | `/portal/login` | client@pjassetmanagement.com   | `ClientDemo!2026`|

> Change these via `.env` before seeding a production database.

## Editing content (CMS)

Sign in at `/admin`, open **Content**, edit any field and **Save**. Changes
publish instantly (the marketing pages re-render on every request). Values left
equal to their built-in default are not stored, so the DB only keeps genuine
edits. The defaults live in [`lib/content.ts`](lib/content.ts).

## Production deploy on a VPS (Docker)

```bash
# On the server, in the project directory:
cp .env.example .env
# Edit .env — at minimum set a strong AUTH_SECRET and DB password:
#   openssl rand -base64 48

docker compose up -d --build
```

That's it. Compose will:

1. start PostgreSQL with a persistent `pgdata` volume,
2. build the app image,
3. run migrations (and seed once, if `SEED_ON_START=true`),
4. serve the site on port `3000`.

Put Nginx/Caddy in front for TLS and to proxy `:3000`. Set
`NEXT_PUBLIC_SITE_URL` to your real domain. After the first successful start,
set `SEED_ON_START=false` so the seed doesn't re-run.

### Email (optional)

Contact submissions are always saved to the database. To also receive them by
email, set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM` and
`CONTACT_TO`. Without SMTP, submissions are logged to the container console.

## Notes

- **Branding:** the logo is a typographic lockup in
  [`components/site/logo.tsx`](components/site/logo.tsx). Drop the real emblem in
  `public/` and swap it in if you want the exact mark.
- **Contact details** (email, location) are editable in the CMS — update the
  placeholder values before going live.
- **Security:** rotate `AUTH_SECRET`, change the seeded passwords, and restrict
  who can reach `/admin`.

## Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the dev server                 |
| `npm run build`     | Production build                     |
| `npm run start`     | Run the production build             |
| `npm run db:migrate`| Create/apply a dev migration         |
| `npm run db:deploy` | Apply migrations (production)        |
| `npm run db:seed`   | Seed admin + demo data               |
| `npm run db:studio` | Open Prisma Studio                   |
