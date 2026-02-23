// Local SQLite adapter that mimics Cloudflare D1 API for dev
import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

let db: Database.Database | null = null

function getDb(): Database.Database {
  if (db) return db

  const dbPath = path.resolve(process.cwd(), 'local.db')
  db = new Database(dbPath)
  db.pragma('journal_mode = WAL')
  db.pragma('foreign_keys = ON')

  // Run schema init
  const schema = `
    CREATE TABLE IF NOT EXISTS _migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE,
      executed_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT CHECK(role IN ('student', 'mentor')) NOT NULL,
      bio TEXT,
      -- Student fields
      age INTEGER,
      school TEXT,
      grade_level TEXT,
      linkedin_url TEXT,
      career_field TEXT,
      dream_role TEXT,
      career_interest_why TEXT,
      help_needed TEXT,
      meeting_frequency TEXT,
      willing_to_prepare INTEGER DEFAULT 1,
      advice_style TEXT,
      personality_type TEXT,
      -- Mentor fields
      company TEXT,
      position TEXT,
      industry TEXT,
      experience_years INTEGER,
      short_bio TEXT,
      mentor_topics TEXT,
      industries_worked TEXT,
      max_mentees INTEGER,
      preferred_meeting_freq TEXT,
      virtual_or_inperson TEXT,
      why_mentor TEXT,
      had_mentors TEXT,
      -- Shared
      website_url TEXT,
      avatar_url TEXT,
      verification_status TEXT DEFAULT 'pending',
      is_active INTEGER DEFAULT 1,
      is_online INTEGER DEFAULT 0,
      last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
      timezone TEXT DEFAULT 'UTC',
      languages TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      total_conversations INTEGER DEFAULT 0,
      average_rating REAL DEFAULT 0.0,
      total_rating_count INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL,
      ceo_id TEXT NOT NULL,
      started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      ended_at DATETIME,
      duration_seconds INTEGER,
      status TEXT DEFAULT 'active',
      rating_student INTEGER,
      rating_ceo INTEGER,
      feedback_student TEXT,
      feedback_ceo TEXT,
      room_id TEXT UNIQUE,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS user_sessions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      token_hash TEXT NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      ip_address TEXT,
      user_agent TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_used_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        sender_id TEXT NOT NULL,
        recipient_id TEXT NOT NULL,
        content TEXT NOT NULL,
        attachment_url TEXT,
        attachment_name TEXT,
        is_read INTEGER DEFAULT 0,
        reported INTEGER DEFAULT 0,
        report_reason TEXT,
        report_reviewed INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE TABLE IF NOT EXISTS message_reports (
        id TEXT PRIMARY KEY,
        reporter_id TEXT NOT NULL,
        reported_user_id TEXT NOT NULL,
        message_id TEXT,
        reason TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT 'pending',
        admin_notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );

      CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
      CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
      CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);
      CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
      CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
      CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, recipient_id);
    `

  db.exec(schema)
  return db
}

// D1-compatible wrapper
class D1PreparedStatement {
  private sql: string
  private params: any[]

  constructor(sql: string, params: any[] = []) {
    this.sql = sql
    this.params = params
  }

  bind(...args: any[]): D1PreparedStatement {
    // Coerce undefined → null so SQLite never receives an invalid binding type
    const sanitized = args.map(v => (v === undefined ? null : v))
    return new D1PreparedStatement(this.sql, sanitized)
  }

  first(): any {
    const stmt = getDb().prepare(this.sql)
    return Promise.resolve(stmt.get(...this.params) ?? null)
  }

  all(): Promise<{ results: any[] }> {
    const stmt = getDb().prepare(this.sql)
    return Promise.resolve({ results: stmt.all(...this.params) })
  }

  run(): Promise<void> {
    const stmt = getDb().prepare(this.sql)
    stmt.run(...this.params)
    return Promise.resolve()
  }
}

class LocalD1Database {
  prepare(sql: string): D1PreparedStatement {
    return new D1PreparedStatement(sql)
  }

  exec(sql: string): void {
    getDb().exec(sql)
  }
}

export function getLocalDB(): LocalD1Database {
  return new LocalD1Database()
}
