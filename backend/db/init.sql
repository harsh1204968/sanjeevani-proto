BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  password TEXT,
  role TEXT DEFAULT 'donor'
);

CREATE TABLE IF NOT EXISTS blood_banks (
  id TEXT PRIMARY KEY,
  name TEXT,
  city TEXT,
  address TEXT,
  phone TEXT,
  inventory_json TEXT
);

CREATE TABLE IF NOT EXISTS requests (
  id TEXT PRIMARY KEY,
  user_id TEXT,
  bank_id TEXT,
  blood_group TEXT,
  units INTEGER,
  status TEXT,
  created_at TEXT
);

COMMIT;
