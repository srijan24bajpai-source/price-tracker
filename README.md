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

Without these variables the app runs in demo mode (browser localStorage; admin password from
`VITE_ADMIN_PASSWORD`, default `admin123`). Demo mode is not secure and only works on one browser.
With Supabase, Row Level Security makes the public able to submit only as "pending" and read only approved items;
only the signed-in admin can approve or reject.

## Deploy
**GitHub**: `git init && git add -A && git commit -m "PriceTracker AI" && git branch -M main && git remote add origin <repo-url> && git push -u origin main`

**Vercel**: import the GitHub repo (framework Vite, build `npm run build`, output `dist`), add the two
Supabase env vars, deploy. `vercel.json` routes all paths to the SPA.

## Limitations
- **Live (refreshed every 5 min, no API key):** exchange rates (open.er-api.com) and gold/silver/platinum (api.gold-api.com), converted to India retail with an assumed 6% duty + 3% GST. Everything else is **sample data** (`src/data/raw.js`, `realestate.js`) tagged "sample" in the UI.
- The AI agent is rule-based over the dataset; plug an LLM API into `answer()` in `src/pages/Agent.jsx`.
