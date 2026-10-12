# PriceTracker AI

Compare prices of everything: India city-wise and worldwide, land per sq ft, price trends,
community price reports, and an admin-approved "Add a price" flow.

## Run locally
```
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Connect Supabase (real approvals across devices)
1. Create a free project at supabase.com.
2. SQL Editor: paste and run `supabase/schema.sql`.
3. Authentication > Users: add your admin email + password. Disable public sign-ups (Providers > Email).
4. Project Settings > API: copy the project URL and the **anon** key into `.env` (see `.env.example`)
   and into Vercel Environment Variables (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`).
   Never put the service_role key in the frontend.

Without these variables the app runs in demo mode (data in the browser's localStorage; the admin password is only checked in
the browser, so it is not real security). **With Supabase, the admin password is the password of the user you create in
Supabase Authentication, and Row Level Security enforces it on the server.** Set that user's password to your chosen admin password.
It is never stored in the code.

## Deploy
**GitHub**: `git init && git add -A && git commit -m "PriceTracker AI" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`

**Vercel**: import the GitHub repo (framework Vite, build `npm run build`, output `dist`), add the two
Supabase env vars, deploy. `vercel.json` routes all paths to the SPA.

## Limitations
- **Live (refreshed every 5 min, no API key):** exchange rates (open.er-api.com) and gold/silver/platinum (api.gold-api.com), converted to India retail with an assumed 6% duty + 3% GST. Everything else is **sample data** (`src/data/raw.js`, `realestate.js`) tagged "sample" in the UI.
- The AI agent is rule-based over the dataset; plug an LLM API into `answer()` in `src/pages/Agent.jsx`.

## Daily price snapshots (real history)
`api/daily-snapshot.js` runs once a day on Vercel Cron (`vercel.json`, 01:30 UTC = 07:00 IST). It saves that day's live gold, silver,
platinum and USD/INR price into the Supabase table `price_history` (created by `supabase/schema.sql`), and product pages of live items
draw the recorded history. Needs `SUPABASE_URL` (or `NEXT_PUBLIC_SUPABASE_URL`) and `SUPABASE_SERVICE_ROLE_KEY` as Vercel env vars
(the Supabase integration adds them) and optionally `CRON_SECRET`. Vercel Hobby allows one cron run per day.
Only items with a legitimate free live source are updated automatically; everything else shows its source link and "last checked" date.
