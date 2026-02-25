// Supabase-backed database adapter that mimics the Cloudflare D1 / local SQLite API
// so the rest of the codebase (auth.ts, index.tsx) needs zero changes.
import postgres from 'postgres'

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  throw new Error('DATABASE_URL is required to connect to Supabase Postgres')
}

// Singleton connection pool
let sql: ReturnType<typeof postgres> | null = null

function getSql(): ReturnType<typeof postgres> {
  if (!sql) {
    sql = postgres(connectionString, {
      max: 10,
      idle_timeout: 20,
      connect_timeout: 10,
      ssl: { rejectUnauthorized: false },
    })
  }
  return sql
}

// Convert positional ? placeholders (SQLite style) to $1, $2, ... (PostgreSQL style)
function convertPlaceholders(query: string): string {
  let i = 0
  return query.replace(/\?/g, () => `$${++i}`)
}

// D1-compatible prepared statement backed by Supabase Postgres
class SupabasePreparedStatement {
  private query: string
  private params: any[]

  constructor(query: string, params: any[] = []) {
    this.query = query
    this.params = params
  }

  bind(...args: any[]): SupabasePreparedStatement {
    const sanitized = args.map((v) => (v === undefined ? null : v))
    return new SupabasePreparedStatement(this.query, sanitized)
  }

  async first(): Promise<any> {
    const pgQuery = convertPlaceholders(this.query)
    const db = getSql()
    const rows = await db.unsafe(pgQuery, this.params)
    return (rows as any[])[0] ?? null
  }

  async all(): Promise<{ results: any[] }> {
    const pgQuery = convertPlaceholders(this.query)
    const db = getSql()
    const rows = await db.unsafe(pgQuery, this.params)
    return { results: rows as any[] }
  }

  async run(): Promise<void> {
    const pgQuery = convertPlaceholders(this.query)
    const db = getSql()
    await db.unsafe(pgQuery, this.params)
  }
}

class SupabaseD1Database {
  prepare(query: string): SupabasePreparedStatement {
    return new SupabasePreparedStatement(query)
  }

  async exec(query: string): Promise<void> {
    const db = getSql()
    await db.unsafe(query)
  }
}

let instance: SupabaseD1Database | null = null

export function getSupabaseDB(): SupabaseD1Database {
  if (!instance) {
    instance = new SupabaseD1Database()
  }
  return instance
}

export async function initializeDatabase(): Promise<{ created: string[]; errors: string[] }> {
  const db = getSql()
  const created: string[] = []
  const errors: string[] = []

  const statements = [
    {
      name: 'users',
      sql: `CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        name TEXT NOT NULL,
        role TEXT CHECK(role IN ('student', 'mentor')) NOT NULL,
        bio TEXT, company TEXT, position TEXT, industry TEXT,
        experience_years INTEGER, linkedin_url TEXT, website_url TEXT, avatar_url TEXT,
        age INTEGER, school TEXT, grade_level TEXT, university TEXT, major TEXT,
        graduation_year INTEGER, gpa REAL, career_field TEXT, dream_role TEXT,
        career_interest_why TEXT, help_needed TEXT, meeting_frequency TEXT,
        willing_to_prepare INTEGER DEFAULT 1, advice_style TEXT, personality_type TEXT,
        short_bio TEXT, mentor_topics TEXT, industries_worked TEXT, max_mentees INTEGER,
        preferred_meeting_freq TEXT, virtual_or_inperson TEXT, why_mentor TEXT, had_mentors TEXT,
        verification_status TEXT DEFAULT 'pending' CHECK(verification_status IN ('pending','approved','verified','rejected')),
        verification_documents TEXT, is_active INTEGER DEFAULT 1, is_online INTEGER DEFAULT 0,
        last_seen TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        matching_preferences TEXT, timezone TEXT DEFAULT 'UTC', languages TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        email_verified_at TIMESTAMPTZ,
        total_conversations INTEGER DEFAULT 0,
        average_rating REAL DEFAULT 0.0,
        total_rating_count INTEGER DEFAULT 0
      )`,
    },
    {
      name: 'user_sessions',
      sql: `CREATE TABLE IF NOT EXISTS user_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        token_hash TEXT NOT NULL UNIQUE,
        expires_at TIMESTAMPTZ NOT NULL,
        ip_address TEXT, user_agent TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        last_used_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: 'conversations',
      sql: `CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        student_id TEXT NOT NULL REFERENCES users(id),
        ceo_id TEXT NOT NULL REFERENCES users(id),
        started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        ended_at TIMESTAMPTZ, duration_seconds INTEGER,
        status TEXT DEFAULT 'active' CHECK(status IN ('active','ended','cancelled')),
        rating_student INTEGER CHECK(rating_student BETWEEN 1 AND 5),
        rating_ceo INTEGER CHECK(rating_ceo BETWEEN 1 AND 5),
        feedback_student TEXT, feedback_ceo TEXT,
        room_id TEXT UNIQUE, recording_url TEXT, transcript TEXT, ai_insights TEXT,
        follow_up_requested BOOLEAN DEFAULT FALSE,
        follow_up_accepted BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: 'messages',
      sql: `CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        sender_id TEXT NOT NULL REFERENCES users(id),
        recipient_id TEXT NOT NULL REFERENCES users(id),
        content TEXT NOT NULL,
        attachment_url TEXT, attachment_name TEXT,
        is_read INTEGER DEFAULT 0, reported INTEGER DEFAULT 0,
        report_reason TEXT, report_reviewed INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: 'message_reports',
      sql: `CREATE TABLE IF NOT EXISTS message_reports (
        id TEXT PRIMARY KEY,
        reporter_id TEXT NOT NULL REFERENCES users(id),
        reported_user_id TEXT NOT NULL REFERENCES users(id),
        message_id TEXT, reason TEXT NOT NULL, description TEXT,
        status TEXT DEFAULT 'pending', admin_notes TEXT,
        created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
      )`,
    },
    {
      name: 'matching_queue',
      sql: `CREATE TABLE IF NOT EXISTS matching_queue (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL REFERENCES users(id),
        preferences TEXT, joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
        status TEXT DEFAULT 'waiting' CHECK(status IN ('waiting','matched','cancelled'))
      )`,
    },
  ]

  for (const stmt of statements) {
    try {
      await db.unsafe(stmt.sql)
      created.push(stmt.name)
    } catch (e: any) {
      errors.push(`${stmt.name}: ${e.message}`)
    }
  }

  // Indexes (ignore errors — they may already exist)
  const indexes = [
    `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
    `CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)`,
    `CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash)`,
    `CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id)`,
    `CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at)`,
    `CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id)`,
    `CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id)`,
  ]
  for (const idx of indexes) {
    try { await db.unsafe(idx) } catch { /* ignore */ }
  }

  return { created, errors }
}
