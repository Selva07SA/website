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

create index if not exists contact_submissions_created_at_idx on contact_submissions (created_at desc);

