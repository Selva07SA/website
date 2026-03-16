import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { z } from "zod";
import { Pool } from "pg";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Prefer `server/.env` regardless of CWD; fallback to default `.env`.
dotenv.config({ path: path.join(__dirname, ".env") });
dotenv.config();

const PORT = Number(process.env.PORT || 8787);
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.error("Missing DATABASE_URL. Set it in your environment (Neon connection string).");
  process.exit(1);
}

const pool = new Pool({
  connectionString: DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: Number(process.env.PG_POOL_MAX || 10),
  idleTimeoutMillis: Number(process.env.PG_IDLE_TIMEOUT_MS || 30_000),
  connectionTimeoutMillis: Number(process.env.PG_CONN_TIMEOUT_MS || 10_000),
});

let schemaReadyPromise;
function ensureSchema() {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      await pool.query(`
        create table if not exists contact_submissions (
          id bigserial primary key,
          created_at timestamptz not null default now(),
          time_zone text,
          name text not null,
          email text not null,
          phone_country_code text not null,
          phone_number text not null,
          phone_e164 text,
          selected_services text[] not null default '{}',
          selected_products text[] not null default '{}',
          preferred_date text,
          preferred_time_24 text,
          preferred_time_12 text,
          message text not null,
          raw jsonb not null default '{}'::jsonb
        );
      `);

      await pool.query(
        `create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);`,
      );
    })();
  }

  return schemaReadyPromise;
}

const app = express();
app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",").map((s) => s.trim()) : true,
    maxAge: 86400,
  }),
);
app.use(compression());
app.use(express.json({ limit: "256kb" }));

app.get("/api/health", (_req, res) => res.json({ ok: true }));

const ContactPayload = z.object({
  createdAt: z.string().optional(),
  timeZone: z.string().optional(),
  name: z.string().min(1).max(200),
  email: z.string().email().max(320),
  phoneCountryCode: z.string().min(1).max(8),
  phoneNumber: z.string().min(4).max(20),
  phoneE164: z.string().min(5).max(32).optional(),
  selectedServices: z.array(z.string().min(1).max(120)).default([]),
  selectedProducts: z.array(z.string().min(1).max(120)).default([]),
  preferredDate: z.string().optional(),
  preferredTime24: z.string().optional(),
  preferredTime12: z.string().optional(),
  message: z.string().min(1).max(4000),
});

app.post("/api/contact", async (req, res) => {
  const parsed = ContactPayload.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ ok: false, error: "Invalid payload" });

  const body = parsed.data;
  const createdAt = body.createdAt ? new Date(body.createdAt) : new Date();

  try {
    await ensureSchema();
    await pool.query(
      `
      insert into contact_submissions (
        created_at,
        time_zone,
        name,
        email,
        phone_country_code,
        phone_number,
        phone_e164,
        selected_services,
        selected_products,
        preferred_date,
        preferred_time_24,
        preferred_time_12,
        message,
        raw
      )
      values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
      `,
      [
        createdAt,
        body.timeZone || null,
        body.name,
        body.email,
        body.phoneCountryCode,
        body.phoneNumber,
        body.phoneE164 || null,
        body.selectedServices,
        body.selectedProducts,
        body.preferredDate || null,
        body.preferredTime24 || null,
        body.preferredTime12 || null,
        body.message,
        body,
      ],
    );

    return res.json({ ok: true });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    return res.status(500).json({ ok: false, error: "Database error" });
  }
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${PORT}`);
});

// Warm schema creation in background so first user request is fast.
ensureSchema().catch((err) => {
  // eslint-disable-next-line no-console
  console.error("Schema warmup failed:", err);
});
