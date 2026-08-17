# Player of the Year Voting

Single-page Next.js app for 1st XI / 2nd XI Player of the Year voting, backed by Supabase.

- Players pick their name from a dropdown (their name disappears once they've voted, preventing duplicates).
- 1st XI players can only vote for the 1st XI award; 2nd XI players only for the 2nd XI award.
- Nominee dropdowns show each player's stats: `X Runs @ X Average, X Wickets @ X Average, X Dismissals`.
- All vote data is written/read via a server-only Supabase service-role key — nothing about who voted for whom is ever exposed to the browser.

## 1. Set up Supabase

1. Go to https://supabase.com, sign in (mikesupabase@yahoo.com), create a new project.
2. In the project's **SQL Editor**, run the contents of [`sql/schema.sql`](sql/schema.sql) — this creates the `votes` table.
3. In **Project Settings → API**, copy:
   - **Project URL** → `SUPABASE_URL`
   - **service_role key** (secret, not the anon key) → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Run locally

```bash
npm install
cp .env.example .env.local
# edit .env.local with your Supabase values
npm run dev
```

Visit http://localhost:3000.

## 3. Push to GitHub

```bash
git init
git add .
git commit -m "Player of the Year voting app"
gh repo create MikePett123/poty-page --public --source=. --remote=origin --push
```

(Or create the repo at github.com under the `MikePett123` account and push manually.)

## 4. Deploy to Vercel

1. Go to https://vercel.com, sign in with the `MikePett123` GitHub account.
2. **Add New Project** → import the `poty-page` repo.
3. Under **Environment Variables**, add:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy. Vercel will give you a live URL to share with players.

## Notes

- To reset voting for a new season, just clear the `votes` table in Supabase (`delete from votes;`).
- Player rosters and stats live in [`lib/players.ts`](lib/players.ts) — update there each season.
