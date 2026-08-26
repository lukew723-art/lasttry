# Semester Board

A personal dashboard that lays out your school year from your Canvas calendar.
Currently seeded with your Fall 2026 schedule (`data/fall2026.ics`).

## Run it locally (optional, just to preview)

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Push to GitHub

```bash
git init
git add .
git commit -m "Initial semester board"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/school-dashboard.git
git push -u origin main
```

(Create the empty repo on GitHub first — no README/license, since this
folder already has one — then use the URL GitHub gives you.)

## Deploy on Vercel

Since your GitHub is already connected to Vercel:

1. In the Vercel dashboard, click **Add New → Project**.
2. Select the `school-dashboard` repo you just pushed.
3. Framework preset should auto-detect as **Next.js** — leave defaults as is.
4. Click **Deploy**.

Every future `git push` to `main` will auto-redeploy.

## Switching from the seed file to your live Canvas feed

Right now the site reads the bundled `data/fall2026.ics` file. To have it
pull live from Canvas instead:

1. In Vercel: **Project Settings → Environment Variables**.
2. Add `CANVAS_ICS_URL` with your Canvas Calendar Feed URL (Canvas →
   Calendar → "Calendar Feed" link in the sidebar).
3. Redeploy.

The app checks for that env var automatically (see `app/page.tsx`) and
re-fetches the feed hourly once it's set.

## What's next

- Send over your syllabi (as text, PDF, or however's easiest) — assignment
  due dates, exam dates, and a full-semester timeline will get built out
  from those.
- Grades are entered manually in the Grades panel for now (saved in your
  browser) since Canvas doesn't expose grades without a personal access
  token, which your school has disabled for students.
