import { Pool } from "pg";
import { z } from "zod";

let pool;
function getPool() {
  if (!pool) {
    const DATABASE_URL = process.env.DATABASE_URL;
    if (!DATABASE_URL) {
      throw new Error("Missing DATABASE_URL environment variable");
    }
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
  }
  return pool;
}

let schemaReadyPromise;
async function ensureSchema() {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      const p = getPool();
      await p.query(`
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
      await p.query(
        `create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);`
      );
    })();
  }
  return schemaReadyPromise;
}

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

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

export async function handler(event) {
  const path = event.path.replace("/.netlify/functions/api", "").replace("/api", "") || "/";

  // Handle CORS preflight
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 204, headers, body: "" };
  }

  // GET /api/health
  if (path === "/health" && event.httpMethod === "GET") {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ok: true }),
    };
  }

  // POST /api/contact
  if (path === "/contact" && event.httpMethod === "POST") {
    let body;
    try {
      body = JSON.parse(event.body);
    } catch {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: "Invalid JSON" }),
      };
    }

    const parsed = ContactPayload.safeParse(body);
    if (!parsed.success) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ ok: false, error: "Invalid payload" }),
      };
    }

    const data = parsed.data;
    const createdAt = data.createdAt ? new Date(data.createdAt) : new Date();

    try {
      await ensureSchema();
      const p = getPool();
      await p.query(
        `
        insert into contact_submissions (
          created_at, time_zone, name, email,
          phone_country_code, phone_number, phone_e164,
          selected_services, selected_products,
          preferred_date, preferred_time_24, preferred_time_12,
          message, raw
        )
        values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)
        `,
        [
          createdAt,
          data.timeZone || null,
          data.name,
          data.email,
          data.phoneCountryCode,
          data.phoneNumber,
          data.phoneE164 || null,
          data.selectedServices,
          data.selectedProducts,
          data.preferredDate || null,
          data.preferredTime24 || null,
          data.preferredTime12 || null,
          data.message,
          data,
        ]
      );

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ ok: true }),
      };
    } catch (err) {
      console.error(err);
      return {
        statusCode: 500,
        headers,
        body: JSON.stringify({ ok: false, error: "Database error" }),
      };
    }
  }

  return {
    statusCode: 404,
    headers,
    body: JSON.stringify({ error: "Not found" }),
  };
}
