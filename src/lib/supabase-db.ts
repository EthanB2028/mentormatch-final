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
