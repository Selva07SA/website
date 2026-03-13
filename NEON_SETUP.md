# Neon DB Contact Form

## 1) Create the table

Run the SQL in `server/schema.sql` in your Neon SQL Editor.

## 2) Configure environment variables

Create `problem_web/.env` (or set these in your hosting provider):

```bash
DATABASE_URL="YOUR_NEON_CONNECTION_STRING"
PORT=8787
```

For the frontend, no DB secrets are needed.

## 3) Install and run

```bash
npm install
npm run dev
```

In a second terminal:

```bash
npm run server
```

The Vite dev server proxies `/api/*` to `http://localhost:8787`.

