# Frist — Landing page

React + Vite + Tailwind v4. Email signups stored in Supabase.

## Local dev

```bash
npm install
cp .env.example .env.local   # add your Supabase keys
npm run dev
```

## Supabase setup

1. Create a project at [supabase.com](https://supabase.com)
2. Run in SQL Editor:

```sql
create table signups (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz default now()
);
alter table signups enable row level security;
create policy "anon can insert"
  on signups for insert to anon with check (true);
```

3. Copy **Project URL** and **anon public** key into `.env.local`:

```
VITE_SUPABASE_URL=https://abc123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
```

## Deploy to Vercel

```bash
npm run build   # verify it builds locally first
```

Then in Vercel:
- Import this repo
- Add environment variables: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- Framework preset: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
