// src/server-entry.ts
import { handle } from "@hono/node-server/vercel";

// src/index.tsx
import { Hono } from "hono";
import { cors } from "hono/cors";
import { getCookie } from "hono/cookie";

// src/renderer.tsx
import { jsxRenderer } from "hono/jsx-renderer";
import { jsx, jsxs } from "hono/jsx/jsx-runtime";
var renderer = jsxRenderer(({ children }) => {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charset: "UTF-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1.0" }),
      /* @__PURE__ */ jsx("title", { children: "MentorMatch - Career Advice & Mentorship for Students | Find a Mentor" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "Get free career advice and professional mentorship from CEOs and industry leaders. MentorMatch connects college students with mentors for one-on-one video tutoring, career guidance, and professional development." }),
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "career advice, find a mentor, career guidance, student mentorship, professional development, career coaching, online tutoring, career success, talk to a CEO, mentorship program, career growth, career planning, leadership coaching, career advice for college students, building a successful career, one on one mentoring, virtual mentoring, career counseling, professional mentoring, executive coaching" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.googleapis.com" }),
      /* @__PURE__ */ jsx("link", { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" }),
      /* @__PURE__ */ jsx("link", { href: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=DM+Serif+Display:ital@0;1&display=swap", rel: "stylesheet" }),
      /* @__PURE__ */ jsx("script", { src: "https://cdn.tailwindcss.com" }),
      /* @__PURE__ */ jsx("link", { href: "/static/style.css", rel: "stylesheet" }),
      /* @__PURE__ */ jsx("script", { dangerouslySetInnerHTML: {
        __html: `
              tailwind.config = {
                theme: {
                  extend: {
                    fontFamily: {
                      'sans': ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                      'display': ['DM Serif Display', 'Georgia', 'serif'],
                      // legacy aliases kept so any remaining font-handwritten / font-sketch classes don't break
                      'handwritten': ['Plus Jakarta Sans', 'ui-sans-serif', 'sans-serif'],
                      'sketch': ['DM Serif Display', 'Georgia', 'serif'],
                    },
                    animation: {
                      'wiggle': 'wiggle 1s ease-in-out infinite',
                      'scribble': 'scribble 0.3s ease-in-out',
                      'bounce-slow': 'bounce 2s infinite',
                    }
                  }
                }
              }
          `
      } })
    ] }),
    /* @__PURE__ */ jsxs("body", { class: "bg-white text-gray-900 font-sans overflow-x-hidden antialiased", children: [
      children,
      /* @__PURE__ */ jsx("script", { src: "/static/app.js" })
    ] })
  ] });
});

// src/lib/local-db.ts
import Database from "better-sqlite3";
import path from "path";
var db = null;
function getDb() {
  if (db) return db;
  const dbPath = path.resolve(process.cwd(), "local.db");
  db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
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
    `;
  db.exec(schema);
  return db;
}
var D1PreparedStatement = class _D1PreparedStatement {
  sql;
  params;
  constructor(sql, params = []) {
    this.sql = sql;
    this.params = params;
  }
  bind(...args) {
    const sanitized = args.map((v) => v === void 0 ? null : v);
    return new _D1PreparedStatement(this.sql, sanitized);
  }
  first() {
    const stmt = getDb().prepare(this.sql);
    return Promise.resolve(stmt.get(...this.params) ?? null);
  }
  all() {
    const stmt = getDb().prepare(this.sql);
    return Promise.resolve({ results: stmt.all(...this.params) });
  }
  run() {
    const stmt = getDb().prepare(this.sql);
    stmt.run(...this.params);
    return Promise.resolve();
  }
};
var LocalD1Database = class {
  prepare(sql) {
    return new D1PreparedStatement(sql);
  }
  exec(sql) {
    getDb().exec(sql);
  }
};
function getLocalDB() {
  return new LocalD1Database();
}

// src/pages/landing.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "hono/jsx/jsx-runtime";
function LandingPage() {
  return /* @__PURE__ */ jsxs2("div", { class: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx2("nav", { class: "sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-6xl mx-auto px-6 py-4 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs2("a", { href: "/", class: "wordmark text-2xl font-bold text-gray-900 hover:no-underline", children: [
        "Mentor",
        /* @__PURE__ */ jsx2("span", { class: "text-indigo-600", children: "Match" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx2("a", { href: "/", class: "px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:no-underline", children: "Home" }),
        /* @__PURE__ */ jsx2("a", { href: "/about", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline", children: "About the Founder" }),
        /* @__PURE__ */ jsx2("a", { href: "/how-it-works", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline", children: "How It Works" }),
        /* @__PURE__ */ jsx2("a", { href: "/blog", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline", children: "Blog" }),
        /* @__PURE__ */ jsx2("a", { href: "/role-select", class: "ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm hover:no-underline", children: "Start Connecting" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs2("section", { class: "relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-28 anim-gradient-drift", children: [
      /* @__PURE__ */ jsx2("div", { class: "absolute -top-24 -left-24 w-96 h-96 bg-indigo-100 rounded-full opacity-40 blur-3xl pointer-events-none anim-float-slow" }),
      /* @__PURE__ */ jsx2("div", { class: "absolute -bottom-16 -right-16 w-80 h-80 bg-purple-100 rounded-full opacity-40 blur-3xl pointer-events-none anim-float", style: "animation-delay:1.5s" }),
      /* @__PURE__ */ jsxs2("div", { class: "relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-14", children: [
        /* @__PURE__ */ jsxs2("div", { class: "flex-1 text-center md:text-left", children: [
          /* @__PURE__ */ jsxs2("div", { class: "mb-6 anim-fade-up", children: [
            /* @__PURE__ */ jsxs2("span", { class: "wordmark block text-6xl md:text-8xl font-bold text-gray-900 leading-none tracking-tight", children: [
              "Mentor",
              /* @__PURE__ */ jsx2("span", { class: "text-indigo-600", children: "Match" })
            ] }),
            /* @__PURE__ */ jsx2("span", { class: "inline-block mt-3 text-indigo-500 text-sm font-semibold tracking-widest uppercase", children: "Free Career Mentorship" })
          ] }),
          /* @__PURE__ */ jsxs2("h1", { class: "text-2xl md:text-3xl font-semibold text-gray-700 leading-snug mb-5 max-w-lg anim-fade-up delay-200", children: [
            "Connect with ",
            /* @__PURE__ */ jsx2("span", { class: "text-indigo-600 font-bold", children: "real mentors." }),
            /* @__PURE__ */ jsx2("br", {}),
            "Build your future."
          ] }),
          /* @__PURE__ */ jsx2("p", { class: "text-base text-gray-500 max-w-md mb-8 leading-relaxed anim-fade-up delay-300", children: "Free one-on-one career guidance from CEOs and industry leaders \u2014 matched to your exact goals with AI." }),
          /* @__PURE__ */ jsxs2("div", { class: "flex flex-col sm:flex-row gap-3 justify-center md:justify-start anim-fade-up delay-400", children: [
            /* @__PURE__ */ jsx2("a", { href: "/role-select", class: "inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:no-underline hover:-translate-y-0.5 anim-cta-glow", children: "Start Connecting \u2192" }),
            /* @__PURE__ */ jsx2("a", { href: "/blog", class: "inline-block border-2 border-gray-200 hover:border-indigo-300 text-gray-600 font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-indigo-50 hover:no-underline", children: "Read the Blog" })
          ] })
        ] }),
        /* @__PURE__ */ jsx2("div", { class: "flex-1 max-w-lg w-full anim-scale-in delay-300", children: /* @__PURE__ */ jsxs2("div", { class: "relative rounded-3xl overflow-hidden shadow-2xl", children: [
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
              alt: "Students getting career advice from a professional mentor",
              class: "w-full h-80 object-cover"
            }
          ),
          /* @__PURE__ */ jsxs2("div", { class: "absolute bottom-4 left-4 bg-white/95 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 anim-fade-up delay-600", children: [
            /* @__PURE__ */ jsx2("div", { class: "w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsx2("svg", { class: "w-4 h-4 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx2("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }) }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("p", { class: "text-xs font-bold text-gray-900", children: "AI-Powered Matching" }),
              /* @__PURE__ */ jsx2("p", { class: "text-xs text-gray-500", children: "Find your perfect mentor" })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx2("section", { class: "bg-indigo-600 text-white py-9", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center", children: [
      /* @__PURE__ */ jsxs2("div", { class: "reveal anim-stat-pop", children: [
        /* @__PURE__ */ jsx2("div", { class: "wordmark text-4xl font-bold", children: "100%" }),
        /* @__PURE__ */ jsx2("div", { class: "text-indigo-200 text-sm font-medium mt-1", children: "Free to use" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "reveal delay-200 anim-stat-pop", style: "animation-delay:0.15s", children: [
        /* @__PURE__ */ jsx2("div", { class: "wordmark text-4xl font-bold", children: "AI" }),
        /* @__PURE__ */ jsx2("div", { class: "text-indigo-200 text-sm font-medium mt-1", children: "Smart matching engine" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "reveal delay-300 anim-stat-pop", style: "animation-delay:0.3s", children: [
        /* @__PURE__ */ jsx2("div", { class: "wordmark text-4xl font-bold", children: "1-on-1" }),
        /* @__PURE__ */ jsx2("div", { class: "text-indigo-200 text-sm font-medium mt-1", children: "Direct mentorship" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "reveal delay-400 anim-stat-pop", style: "animation-delay:0.45s", children: [
        /* @__PURE__ */ jsx2("div", { class: "wordmark text-4xl font-bold", children: "Any Field" }),
        /* @__PURE__ */ jsx2("div", { class: "text-indigo-200 text-sm font-medium mt-1", children: "All career paths" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx2("section", { class: "py-20 bg-white", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs2("div", { class: "text-center mb-12 reveal", children: [
        /* @__PURE__ */ jsx2("span", { class: "inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3", children: "How It Works" }),
        /* @__PURE__ */ jsx2("h2", { class: "wordmark text-4xl font-bold text-gray-900", children: "Three steps to your mentor" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "grid md:grid-cols-3 gap-8", children: [
        /* @__PURE__ */ jsxs2("div", { class: "relative bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl p-7 hover:shadow-lg transition-shadow reveal card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow", children: "1" }),
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80",
              alt: "Create your profile",
              class: "w-full h-40 object-cover rounded-2xl mb-5"
            }
          ),
          /* @__PURE__ */ jsx2("h3", { class: "text-lg font-bold text-gray-900 mb-2", children: "Create Your Profile" }),
          /* @__PURE__ */ jsx2("p", { class: "text-gray-600 text-sm leading-relaxed", children: "Tell me your career goals, interests, and what kind of guidance you're looking for." })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "relative bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-7 hover:shadow-lg transition-shadow reveal delay-200 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "absolute -top-3 -left-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow", children: "2" }),
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&q=80",
              alt: "Get AI matched",
              class: "w-full h-40 object-cover rounded-2xl mb-5"
            }
          ),
          /* @__PURE__ */ jsx2("h3", { class: "text-lg font-bold text-gray-900 mb-2", children: "Get AI-Matched" }),
          /* @__PURE__ */ jsx2("p", { class: "text-gray-600 text-sm leading-relaxed", children: "My engine scores mentors across 7 categories \u2014 field, role, expertise, availability, and more." })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "relative bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-3xl p-7 hover:shadow-lg transition-shadow reveal delay-400 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "absolute -top-3 -left-3 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow", children: "3" }),
          /* @__PURE__ */ jsx2(
            "img",
            {
              src: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80",
              alt: "Connect and grow",
              class: "w-full h-40 object-cover rounded-2xl mb-5"
            }
          ),
          /* @__PURE__ */ jsx2("h3", { class: "text-lg font-bold text-gray-900 mb-2", children: "Connect & Grow" }),
          /* @__PURE__ */ jsx2("p", { class: "text-gray-600 text-sm leading-relaxed", children: "Schedule video sessions, get real feedback, and build the career relationships that last." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx2("section", { class: "py-20 bg-gradient-to-br from-amber-50 to-orange-50", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs2("div", { class: "text-center mb-12 reveal", children: [
        /* @__PURE__ */ jsx2("span", { class: "inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3", children: "For Mentors" }),
        /* @__PURE__ */ jsx2("h2", { class: "wordmark text-4xl font-bold text-gray-900 mb-3", children: "What you get as a mentor" }),
        /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-base max-w-xl mx-auto", children: "Giving back has real, tangible rewards. Here's what MentorMatch offers every mentor on the platform." })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10", children: [
        /* @__PURE__ */ jsxs2("div", { class: "bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl", children: "\u{1F3C5}" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-base mb-1", children: "Verified Mentor Badge" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm leading-relaxed", children: "Earn a verified badge on your profile that signals your credibility and commitment to the next generation." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-100 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl", children: "\u{1F31F}" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-base mb-1", children: "Impact Score & Leaderboard" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm leading-relaxed", children: "Your Impact Score grows with every session. Top mentors are featured on the platform leaderboard." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-200 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl", children: "\u{1F4E3}" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-base mb-1", children: "Public Profile & Exposure" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm leading-relaxed", children: "Your profile is visible to hundreds of motivated students actively looking for guidance in your exact field." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-300 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl", children: "\u{1F4AC}" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-base mb-1", children: "Genuine Connections" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm leading-relaxed", children: "Build meaningful relationships with the next generation of professionals in your industry." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-400 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-2xl", children: "\u{1F5D3}\uFE0F" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-base mb-1", children: "Flexible on Your Schedule" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm leading-relaxed", children: "Mentor on your terms \u2014 set your own availability, frequency, and format. One session or ongoing." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { class: "bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-500 card-shimmer", children: [
          /* @__PURE__ */ jsx2("div", { class: "w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-2xl", children: "\u270D\uFE0F" }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-base mb-1", children: "Letter of Recognition" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm leading-relaxed", children: "Active mentors receive a personalized letter of recognition from MentorMatch for their service and impact." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { class: "text-center reveal", children: /* @__PURE__ */ jsx2("a", { href: "/register?role=mentor", class: "inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-lg shadow-amber-200 hover:no-underline hover:-translate-y-0.5 anim-cta-glow-amber", children: "Become a Mentor \u2192" }) })
    ] }) }),
    /* @__PURE__ */ jsx2("section", { class: "py-20 bg-gradient-to-br from-gray-50 to-indigo-50", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12", children: [
      /* @__PURE__ */ jsx2("div", { class: "flex-1 rounded-3xl overflow-hidden shadow-xl reveal-left", children: /* @__PURE__ */ jsx2(
        "img",
        {
          src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=700&q=80",
          alt: "Diverse students in a career development session",
          class: "w-full h-72 object-cover"
        }
      ) }),
      /* @__PURE__ */ jsxs2("div", { class: "flex-1 reveal-right", children: [
        /* @__PURE__ */ jsx2("span", { class: "inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4", children: "My Mission" }),
        /* @__PURE__ */ jsxs2("h2", { class: "wordmark text-4xl font-bold text-gray-900 mb-5 leading-tight", children: [
          "Career Mentorship",
          /* @__PURE__ */ jsx2("br", {}),
          "for Everyone"
        ] }),
        /* @__PURE__ */ jsx2("p", { class: "text-gray-600 leading-relaxed mb-4 text-[15px]", children: "I believe every student deserves access to real career guidance \u2014 not just those with the right connections. MentorMatch levels the playing field by pairing students with professionals who've actually walked the path they want to take." }),
        /* @__PURE__ */ jsx2("p", { class: "text-gray-700 leading-relaxed font-semibold text-[15px]", children: "Mentorship shouldn't depend on who you know. It should depend on who you aspire to become." }),
        /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm mt-3", children: "\u2014 Ethan B, Founder of MentorMatch" }),
        /* @__PURE__ */ jsx2("a", { href: "/about", class: "inline-block mt-6 text-indigo-600 font-semibold hover:underline text-sm", children: "Learn more about me \u2192" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx2("section", { class: "py-20 bg-white", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs2("div", { class: "flex items-center justify-between mb-10 reveal", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("span", { class: "inline-block bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2", children: "From the Blog" }),
          /* @__PURE__ */ jsx2("h2", { class: "wordmark text-4xl font-bold text-gray-900", children: "Research-backed insights" })
        ] }),
        /* @__PURE__ */ jsx2("a", { href: "/blog", class: "hidden md:inline-block text-indigo-600 font-semibold text-sm hover:underline", children: "View all posts \u2192" })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "grid md:grid-cols-3 gap-6", children: [
        /* @__PURE__ */ jsxs2("a", { href: "/blog#post-1", class: "group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow hover:no-underline reveal", children: [
          /* @__PURE__ */ jsxs2("div", { class: "relative h-44 overflow-hidden", children: [
            /* @__PURE__ */ jsx2("img", { src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=500&q=80", alt: "Mentorship", class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }),
            /* @__PURE__ */ jsx2("div", { class: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
            /* @__PURE__ */ jsx2("span", { class: "absolute bottom-3 left-3 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "Post 1" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { class: "p-5", children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-sm leading-snug", children: "Why Mentorship Matters for Career Success" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-xs mt-1", children: "Research on confidence, networks & growth" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("a", { href: "/blog#post-2", class: "group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow hover:no-underline reveal delay-200", children: [
          /* @__PURE__ */ jsxs2("div", { class: "relative h-44 overflow-hidden", children: [
            /* @__PURE__ */ jsx2("img", { src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80", alt: "Salary data", class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }),
            /* @__PURE__ */ jsx2("div", { class: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
            /* @__PURE__ */ jsx2("span", { class: "absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "Post 2" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { class: "p-5", children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-sm leading-snug", children: "STEM vs Non-STEM Salaries: NSF 2024 Data" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-xs mt-1", children: "What the numbers actually show" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("a", { href: "/blog#post-3", class: "group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow hover:no-underline reveal delay-400", children: [
          /* @__PURE__ */ jsxs2("div", { class: "relative h-44 overflow-hidden", children: [
            /* @__PURE__ */ jsx2("img", { src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80", alt: "Career outcomes", class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" }),
            /* @__PURE__ */ jsx2("div", { class: "absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" }),
            /* @__PURE__ */ jsx2("span", { class: "absolute bottom-3 left-3 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "Post 3" })
          ] }),
          /* @__PURE__ */ jsxs2("div", { class: "p-5", children: [
            /* @__PURE__ */ jsx2("h3", { class: "font-bold text-gray-900 text-sm leading-snug", children: "How Mentorship Improves Career Outcomes" }),
            /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-xs mt-1", children: "From first job to lifelong transferable skills" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { class: "text-center mt-8 md:hidden", children: /* @__PURE__ */ jsx2("a", { href: "/blog", class: "text-indigo-600 font-semibold text-sm hover:underline", children: "View all posts \u2192" }) })
    ] }) }),
    /* @__PURE__ */ jsx2("footer", { class: "bg-gray-900 text-white pt-14 pb-8", children: /* @__PURE__ */ jsxs2("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs2("div", { class: "flex flex-col md:flex-row justify-between items-start gap-8 mb-10", children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsxs2("h3", { class: "wordmark text-3xl font-bold mb-2", children: [
            "Mentor",
            /* @__PURE__ */ jsx2("span", { class: "text-indigo-400", children: "Match" })
          ] }),
          /* @__PURE__ */ jsx2("p", { class: "text-gray-400 text-sm max-w-xs leading-relaxed", children: "Free AI-powered career mentorship connecting students with industry leaders." })
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Navigate" }),
          /* @__PURE__ */ jsxs2("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx2("a", { href: "/", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Home" }),
            /* @__PURE__ */ jsx2("a", { href: "/about", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "About the Founder" }),
            /* @__PURE__ */ jsx2("a", { href: "/how-it-works", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "How It Works" }),
            /* @__PURE__ */ jsx2("a", { href: "/blog", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Blog" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("div", { children: [
          /* @__PURE__ */ jsx2("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Platform" }),
          /* @__PURE__ */ jsxs2("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx2("a", { href: "/role-select", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Start Connecting" }),
            /* @__PURE__ */ jsx2("a", { href: "/register?role=student", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Sign Up as Student" }),
            /* @__PURE__ */ jsx2("a", { href: "/register?role=mentor", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Sign Up as Mentor" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { class: "border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
        /* @__PURE__ */ jsx2("p", { class: "text-gray-500 text-sm", children: "\xA9 2025 MentorMatch \xB7 Built by Ethan B" }),
        /* @__PURE__ */ jsxs2("div", { class: "flex gap-5", children: [
          /* @__PURE__ */ jsx2("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors hover:no-underline", children: "Privacy" }),
          /* @__PURE__ */ jsx2("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors hover:no-underline", children: "Terms" })
        ] })
      ] })
    ] }) })
  ] });
}

// src/pages/login.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "hono/jsx/jsx-runtime";
function LoginPage() {
  return /* @__PURE__ */ jsxs3("div", { class: "min-h-screen bg-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs3("div", { class: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx3("svg", { class: "absolute top-10 left-10 w-32 h-32 opacity-10", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx3("path", { d: "M10,50 Q30,10 50,50 Q70,90 90,50", stroke: "black", "stroke-width": "2", fill: "none", class: "animate-bounce-slow" }) }),
      /* @__PURE__ */ jsx3("svg", { class: "absolute bottom-20 right-20 w-24 h-24 opacity-10", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx3("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "2", fill: "none", class: "animate-wiggle" }) })
    ] }),
    /* @__PURE__ */ jsxs3("div", { class: "relative z-10 container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs3("div", { class: "text-center mb-12", children: [
        /* @__PURE__ */ jsx3("a", { href: "/", class: "inline-block scribble-border p-3 mb-8 hover:rotate-1 transition-transform", children: /* @__PURE__ */ jsx3("h1", { class: "text-3xl font-bold font-sketch", children: "MentorMatch" }) }),
        /* @__PURE__ */ jsxs3("div", { class: "scribble-border-large inline-block p-6", children: [
          /* @__PURE__ */ jsx3("h2", { class: "text-4xl md:text-5xl font-bold font-sketch mb-4 transform rotate-1", children: "Welcome Back! \u{1F44B}" }),
          /* @__PURE__ */ jsx3("p", { class: "text-xl font-handwritten max-w-2xl mx-auto", children: "Sign in to continue your career mentorship and professional development journey" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { class: "max-w-md mx-auto", children: [
        /* @__PURE__ */ jsxs3("div", { class: "scribble-card-large p-8 bg-gray-50", children: [
          /* @__PURE__ */ jsxs3("form", { id: "loginForm", class: "space-y-6", children: [
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("label", { class: "block font-sketch text-lg mb-2", for: "email", children: "Email Address" }),
              /* @__PURE__ */ jsx3(
                "input",
                {
                  type: "email",
                  id: "email",
                  name: "email",
                  required: true,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid focus:rotate-1 transition-transform",
                  placeholder: "your@email.com"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("label", { class: "block font-sketch text-lg mb-2", for: "password", children: "Password" }),
              /* @__PURE__ */ jsx3(
                "input",
                {
                  type: "password",
                  id: "password",
                  name: "password",
                  required: true,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid focus:rotate-1 transition-transform",
                  placeholder: "Enter your password"
                }
              )
            ] }),
            /* @__PURE__ */ jsx3("div", { id: "errorMessage", class: "hidden p-3 bg-red-100 border-2 border-red-400 border-dashed rounded-lg", children: /* @__PURE__ */ jsx3("p", { class: "font-handwritten text-red-700 text-sm" }) }),
            /* @__PURE__ */ jsxs3(
              "button",
              {
                type: "submit",
                id: "loginButton",
                class: "w-full scribble-button p-4 font-sketch text-xl hover:rotate-1 transition-transform bg-blue-200 hover:bg-blue-300",
                children: [
                  /* @__PURE__ */ jsx3("span", { id: "loginButtonText", children: "Sign In" }),
                  /* @__PURE__ */ jsxs3("span", { id: "loginLoader", class: "hidden", children: [
                    /* @__PURE__ */ jsx3("svg", { class: "animate-spin inline-block w-5 h-5 mr-2", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx3("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "4", fill: "none", "stroke-dasharray": "60 40" }) }),
                    "Signing in..."
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx3("div", { class: "mt-6 text-center", children: /* @__PURE__ */ jsx3("a", { href: "#", class: "font-handwritten text-gray-600 hover:text-black hover:underline", children: "Forgot your password?" }) })
        ] }),
        /* @__PURE__ */ jsx3("div", { class: "text-center mt-8", children: /* @__PURE__ */ jsx3("div", { class: "scribble-border inline-block p-4", children: /* @__PURE__ */ jsxs3("p", { class: "font-handwritten", children: [
          "New to MentorMatch?",
          " ",
          /* @__PURE__ */ jsx3("a", { href: "/register", class: "font-sketch font-bold hover:underline transform hover:rotate-1 inline-block transition-transform", children: "Create an account" })
        ] }) }) }),
        /* @__PURE__ */ jsx3("div", { class: "mt-8", children: /* @__PURE__ */ jsxs3("div", { class: "scribble-card p-4 bg-yellow-50", children: [
          /* @__PURE__ */ jsx3("h3", { class: "font-sketch text-lg mb-3 text-center", children: "\u{1F9EA} Demo Accounts" }),
          /* @__PURE__ */ jsxs3("div", { class: "space-y-2 font-handwritten text-sm", children: [
            /* @__PURE__ */ jsxs3("p", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "Student:" }),
              " student@demo.com / password123"
            ] }),
            /* @__PURE__ */ jsxs3("p", { children: [
              /* @__PURE__ */ jsx3("strong", { children: "CEO:" }),
              " ceo@demo.com / password123"
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { class: "flex space-x-2 mt-4", children: [
            /* @__PURE__ */ jsx3("button", { onclick: "loginAsDemo('student')", class: "flex-1 scribble-button p-2 font-sketch text-sm bg-green-100 hover:bg-green-200", children: "Login as Student" }),
            /* @__PURE__ */ jsx3("button", { onclick: "loginAsDemo('ceo')", class: "flex-1 scribble-button p-2 font-sketch text-sm bg-purple-100 hover:bg-purple-200", children: "Login as CEO" })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx3("script", { dangerouslySetInnerHTML: {
      __html: `
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
          e.preventDefault()
          
          const email = document.getElementById('email').value
          const password = document.getElementById('password').value
          
          if (!email || !password) {
            showError('Please fill in all fields')
            return
          }
          
          setLoading(true)
          
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
            })
            
            const data = await response.json()
            
            if (response.ok && data.success) {
              // Store token in localStorage and cookie
              localStorage.setItem('auth-token', data.token)
              document.cookie = 'auth-token=' + data.token + '; path=/; max-age=604800' // 7 days
              
              // Store user info
              localStorage.setItem('user', JSON.stringify(data.user))
              
              // Redirect to dashboard
              window.location.href = '/dashboard'
            } else {
              showError(data.error || 'Login failed')
            }
          } catch (error) {
            console.error('Login error:', error)
            showError('Network error. Please try again.')
          } finally {
            setLoading(false)
          }
        })
        
        function showError(message) {
          const errorDiv = document.getElementById('errorMessage')
          const errorText = errorDiv.querySelector('p')
          errorText.textContent = message
          errorDiv.classList.remove('hidden')
          
          // Hide after 5 seconds
          setTimeout(() => {
            errorDiv.classList.add('hidden')
          }, 5000)
        }
        
        function setLoading(loading) {
          const button = document.getElementById('loginButton')
          const buttonText = document.getElementById('loginButtonText')
          const loader = document.getElementById('loginLoader')
          
          if (loading) {
            button.disabled = true
            buttonText.classList.add('hidden')
            loader.classList.remove('hidden')
          } else {
            button.disabled = false
            buttonText.classList.remove('hidden')
            loader.classList.add('hidden')
          }
        }
        
        function loginAsDemo(role) {
          const email = role === 'student' ? 'student@demo.com' : 'ceo@demo.com'
          const password = 'password123'
          
          document.getElementById('email').value = email
          document.getElementById('password').value = password
          
          // Auto-submit
          document.getElementById('loginForm').dispatchEvent(new Event('submit'))
        }
        `
    } })
  ] });
}

// src/pages/register.tsx
import { jsx as jsx4, jsxs as jsxs4 } from "hono/jsx/jsx-runtime";
function RegisterPage() {
  return /* @__PURE__ */ jsxs4("div", { class: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsxs4("div", { class: "container mx-auto px-4 py-10 max-w-3xl", children: [
      /* @__PURE__ */ jsxs4("div", { class: "text-center mb-10", children: [
        /* @__PURE__ */ jsx4("a", { href: "/", class: "inline-block mb-6 hover:no-underline", children: /* @__PURE__ */ jsxs4("h1", { class: "wordmark text-3xl font-bold text-gray-900", children: [
          "Mentor",
          /* @__PURE__ */ jsx4("span", { class: "text-indigo-600", children: "Match" })
        ] }) }),
        /* @__PURE__ */ jsxs4("div", { class: "bg-indigo-50 border border-indigo-100 rounded-3xl inline-block px-8 py-6", children: [
          /* @__PURE__ */ jsx4("h2", { class: "wordmark text-4xl font-bold text-gray-900 mb-2", children: "Join MentorMatch" }),
          /* @__PURE__ */ jsx4("p", { class: "text-gray-500 text-base", children: "Choose your role to get started" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs4("div", { class: "flex gap-4 mb-8 justify-center", children: [
        /* @__PURE__ */ jsx4(
          "button",
          {
            id: "tabStudent",
            type: "button",
            onclick: "switchRole('student')",
            class: "scribble-button px-8 py-3 font-sketch text-lg bg-blue-200 hover:bg-blue-300 transition-colors",
            children: "\u{1F393} Student"
          }
        ),
        /* @__PURE__ */ jsx4(
          "button",
          {
            id: "tabMentor",
            type: "button",
            onclick: "switchRole('mentor')",
            class: "scribble-button px-8 py-3 font-sketch text-lg bg-gray-100 hover:bg-gray-200 transition-colors",
            children: "\u{1F3C6} Mentor"
          }
        )
      ] }),
      /* @__PURE__ */ jsx4("div", { id: "studentForm", children: /* @__PURE__ */ jsxs4("form", { id: "studentRegistrationForm", class: "scribble-card-large p-8 bg-gray-50 space-y-10", children: [
        /* @__PURE__ */ jsx4("input", { type: "hidden", name: "role", value: "student" }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 1: Basic Info" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-4", children: [
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Full Name *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "Your full name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Age *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "number",
                    name: "age",
                    required: true,
                    min: "10",
                    max: "30",
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "e.g. 16"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "School / University *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "school",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "e.g. Northgate High School"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Grade Level *" }),
                /* @__PURE__ */ jsxs4(
                  "select",
                  {
                    name: "gradeLevel",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid bg-white",
                    children: [
                      /* @__PURE__ */ jsx4("option", { value: "", children: "Select grade" }),
                      /* @__PURE__ */ jsx4("option", { value: "4th", children: "4th Grade" }),
                      /* @__PURE__ */ jsx4("option", { value: "5th", children: "5th Grade" }),
                      /* @__PURE__ */ jsx4("option", { value: "6th", children: "6th Grade" }),
                      /* @__PURE__ */ jsx4("option", { value: "7th", children: "7th Grade" }),
                      /* @__PURE__ */ jsx4("option", { value: "8th", children: "8th Grade" }),
                      /* @__PURE__ */ jsx4("option", { value: "9th", children: "9th Grade (Freshman)" }),
                      /* @__PURE__ */ jsx4("option", { value: "10th", children: "10th Grade (Sophomore)" }),
                      /* @__PURE__ */ jsx4("option", { value: "11th", children: "11th Grade (Junior)" }),
                      /* @__PURE__ */ jsx4("option", { value: "12th", children: "12th Grade (Senior)" }),
                      /* @__PURE__ */ jsx4("option", { value: "college-freshman", children: "College Freshman" }),
                      /* @__PURE__ */ jsx4("option", { value: "college-sophomore", children: "College Sophomore" }),
                      /* @__PURE__ */ jsx4("option", { value: "college-junior", children: "College Junior" }),
                      /* @__PURE__ */ jsx4("option", { value: "college-senior", children: "College Senior" }),
                      /* @__PURE__ */ jsx4("option", { value: "graduate", children: "Graduate Student" })
                    ]
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Email Address *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "your@email.com"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "LinkedIn (optional)" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "linkedinUrl",
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "https://linkedin.com/in/..."
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Password *" }),
              /* @__PURE__ */ jsx4(
                "input",
                {
                  type: "password",
                  name: "password",
                  required: true,
                  minLength: 8,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                  placeholder: "At least 8 characters"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 2: Career Interests" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "What career field are you interested in? *" }),
              /* @__PURE__ */ jsx4("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-3", id: "careerFieldGroup", children: [
                { value: "tech", label: "\u{1F4BB} Tech" },
                { value: "medicine", label: "\u2695\uFE0F Medicine" },
                { value: "law", label: "\u2696\uFE0F Law" },
                { value: "business", label: "\u{1F4BC} Business / Entrepreneurship" },
                { value: "sports", label: "\u{1F3C5} Sports Industry" },
                { value: "engineering", label: "\u2699\uFE0F Engineering" },
                { value: "science", label: "\u{1F52C} Science" },
                { value: "other", label: "\u270F\uFE0F Other" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "career-field-option cursor-pointer", children: [
                /* @__PURE__ */ jsx4("input", { type: "radio", name: "careerField", value: opt.value, class: "hidden" }),
                /* @__PURE__ */ jsx4("div", { class: "scribble-card p-3 text-center text-sm font-handwritten hover:bg-blue-50 transition-colors select-indicator", children: opt.label })
              ] }, opt.value)) }),
              /* @__PURE__ */ jsx4("div", { class: "mt-3 hidden", id: "otherCareerWrap", children: /* @__PURE__ */ jsx4(
                "input",
                {
                  type: "text",
                  name: "careerFieldOther",
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                  placeholder: "Describe your career field..."
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "What specific role do you dream of? *" }),
              /* @__PURE__ */ jsx4(
                "input",
                {
                  type: "text",
                  name: "dreamRole",
                  required: true,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                  placeholder: "e.g. Sports agent, orthopedic surgeon, startup founder, NBA GM..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Why are you interested in this career? *" }),
              /* @__PURE__ */ jsx4(
                "textarea",
                {
                  name: "careerInterestWhy",
                  required: true,
                  rows: 4,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none",
                  placeholder: "Write a short paragraph about your passion and motivation..."
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 3: What Do You Need Help With?" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsx4("p", { class: "font-handwritten text-gray-600 mb-4", children: "Select all that apply:" }),
          /* @__PURE__ */ jsx4("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
            { value: "choosing-major", label: "Choosing a major" },
            { value: "resume-building", label: "Resume building" },
            { value: "internship-advice", label: "Internship advice" },
            { value: "college-preparation", label: "College preparation" },
            { value: "networking", label: "Networking" },
            { value: "starting-business", label: "Starting a business" },
            { value: "career-clarity", label: "Career clarity" },
            { value: "interview-prep", label: "Interview prep" },
            { value: "leadership-skills", label: "Leadership skills" }
          ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-yellow-50 transition-colors", children: [
            /* @__PURE__ */ jsx4("input", { type: "checkbox", name: "helpNeeded", value: opt.value, class: "w-5 h-5 accent-black" }),
            /* @__PURE__ */ jsx4("span", { class: "font-handwritten", children: opt.label })
          ] }, opt.value)) })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 4: Commitment & Expectations" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "How often would you like to meet? *" }),
              /* @__PURE__ */ jsx4("div", { class: "flex flex-col gap-3", children: [
                { value: "one-time", label: "One-time conversation" },
                { value: "monthly", label: "Monthly" },
                { value: "bi-weekly", label: "Bi-weekly" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-green-50 transition-colors", children: [
                /* @__PURE__ */ jsx4("input", { type: "radio", name: "meetingFrequency", value: opt.value, class: "w-5 h-5 accent-black" }),
                /* @__PURE__ */ jsx4("span", { class: "font-handwritten", children: opt.label })
              ] }, opt.value)) })
            ] }),
            /* @__PURE__ */ jsx4("div", { class: "scribble-card p-4 bg-yellow-50", children: /* @__PURE__ */ jsxs4("label", { class: "flex items-start gap-3 cursor-pointer", children: [
              /* @__PURE__ */ jsx4("input", { type: "checkbox", name: "willingToPrepare", value: "yes", class: "mt-1 w-5 h-5 accent-black" }),
              /* @__PURE__ */ jsxs4("span", { class: "font-handwritten", children: [
                /* @__PURE__ */ jsx4("strong", { children: "Are you willing to prepare questions before each session?" }),
                " (Required \u2014 this ensures productive meetings)"
              ] })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 5: Personality & Matching" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "Do you prefer... *" }),
              /* @__PURE__ */ jsx4("div", { class: "flex flex-col gap-3", children: [
                { value: "direct", label: "Direct, tough advice" },
                { value: "encouraging", label: "Encouraging guidance" },
                { value: "structured", label: "Structured step-by-step coaching" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-purple-50 transition-colors", children: [
                /* @__PURE__ */ jsx4("input", { type: "radio", name: "adviceStyle", value: opt.value, class: "w-5 h-5 accent-black" }),
                /* @__PURE__ */ jsx4("span", { class: "font-handwritten", children: opt.label })
              ] }, opt.value)) })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "Are you introverted, extroverted, or balanced? *" }),
              /* @__PURE__ */ jsx4("div", { class: "flex gap-3", children: [
                { value: "introverted", label: "Introverted" },
                { value: "extroverted", label: "Extroverted" },
                { value: "balanced", label: "Balanced" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex-1 cursor-pointer", children: [
                /* @__PURE__ */ jsx4("input", { type: "radio", name: "personalityType", value: opt.value, class: "hidden" }),
                /* @__PURE__ */ jsx4("div", { class: "scribble-card p-3 text-center font-handwritten hover:bg-blue-50 transition-colors select-indicator", children: opt.label })
              ] }, opt.value)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { class: "scribble-card p-6 bg-blue-50 border-2 border-blue-300", children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-xl mb-1", children: "MentorMatch Code of Conduct & Safety Guidelines" }),
          /* @__PURE__ */ jsx4("p", { class: "font-handwritten text-sm text-gray-500 mb-4", children: "You must read and agree to the full policy before creating an account." }),
          /* @__PURE__ */ jsxs4("div", { class: "bg-white border-2 border-dashed border-blue-300 rounded-lg p-5 h-64 overflow-y-auto mb-5 space-y-4 text-sm font-handwritten leading-relaxed", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "Introduction" }),
              /* @__PURE__ */ jsx4("p", { children: "MentorMatch is committed to providing a professional and supportive environment for students (mentees) and mentors. By using this platform, all participants agree to follow these rules and acknowledge responsibilities and risks outlined below." })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "1. Personal Safety & Online Conduct" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentors and mentees ",
                  /* @__PURE__ */ jsx4("strong", { children: "may share personal contact information" }),
                  " at their discretion."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  /* @__PURE__ */ jsx4("strong", { children: "All such interactions are the sole responsibility of the users." }),
                  " MentorMatch is ",
                  /* @__PURE__ */ jsx4("strong", { children: "not liable" }),
                  " for any issues arising from off-platform communication, including scams, harassment, or negative experiences."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "Users should exercise caution when sharing personal info or meeting in person." }),
                /* @__PURE__ */ jsx4("li", { children: "Any professional misconduct or abusive behavior may be reported using the platform's reporting system." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "2. Liability & Disclaimers" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "MentorMatch ",
                  /* @__PURE__ */ jsx4("strong", { children: "does not guarantee" }),
                  " mentorship outcomes, career advancement, or safety from interactions outside the platform."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Any negative experiences, scams, or misuse of information ",
                  /* @__PURE__ */ jsx4("strong", { children: "are not the responsibility of MentorMatch" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Students under 18 should have ",
                  /* @__PURE__ */ jsx4("strong", { children: "parental/guardian consent" }),
                  " to participate in mentorship sessions."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "3. Professional Behavior" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentors should provide guidance ",
                  /* @__PURE__ */ jsx4("strong", { children: "ethically and honestly" }),
                  ", based on their own experience."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentees should ",
                  /* @__PURE__ */ jsx4("strong", { children: "respect mentors' time" }),
                  " and prepare for each session."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "Both parties should communicate responsibly and notify the other if unavailable for a scheduled session." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "4. Reporting System (AI-Enforced)" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Users may report any ",
                  /* @__PURE__ */ jsx4("strong", { children: "inappropriate behavior, scams, harassment, or negative experiences" }),
                  " through the MentorMatch platform."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "Reports should include: name of the user being reported, description of the issue, and any supporting evidence (screenshots, messages, etc.)." }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "The AI will ",
                  /* @__PURE__ */ jsx4("strong", { children: "flag reports automatically" }),
                  " and notify admins for review."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "MentorMatch will ",
                  /* @__PURE__ */ jsx4("strong", { children: "investigate all reports" }),
                  " and may suspend or remove users."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Users ",
                  /* @__PURE__ */ jsx4("strong", { children: "should not attempt to resolve serious issues on their own" }),
                  "; always report via the platform."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "5. Content & Intellectual Property" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsx4("li", { children: "Users should share original content or properly credit sources." }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentorship content may be shared at users' discretion, but MentorMatch is ",
                  /* @__PURE__ */ jsx4("strong", { children: "not liable" }),
                  " for misuse or redistribution of materials outside the platform."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "6. Account Integrity" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "All users must provide ",
                  /* @__PURE__ */ jsx4("strong", { children: "accurate and truthful information" }),
                  " during registration."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "False, misleading, or fraudulent accounts may be suspended or removed." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "7. Enforcement" }),
              /* @__PURE__ */ jsx4("p", { children: "Violations of this Code of Conduct may result in:" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsx4("li", { children: "Temporary suspension" }),
                /* @__PURE__ */ jsx4("li", { children: "Permanent removal of account" }),
                /* @__PURE__ */ jsx4("li", { children: "Reporting to authorities if laws are broken" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "8. Acceptance" }),
              /* @__PURE__ */ jsx4("p", { children: "By signing up for MentorMatch, you acknowledge that:" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Sharing personal contact information is at your ",
                  /* @__PURE__ */ jsx4("strong", { children: "own risk" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "MentorMatch ",
                  /* @__PURE__ */ jsx4("strong", { children: "is not liable" }),
                  " for any scams, fraud, or negative experiences."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "You understand the platform's rules and agree to follow this Code of Conduct." }),
                /* @__PURE__ */ jsx4("li", { children: "All reports will be reviewed promptly, and users may be suspended or removed if warranted." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx4("div", { class: "mb-5 grid grid-cols-1 md:grid-cols-2 gap-2", children: [
            "Respectful, professional communication",
            "No harassment or abusive behavior",
            "Maintain professional boundaries",
            "Honor scheduled session commitments",
            "Provide accurate registration info",
            "Report issues through the platform only",
            "Off-platform interactions are your responsibility",
            "Students under 18 require parental consent"
          ].map((item) => /* @__PURE__ */ jsxs4("div", { class: "flex items-start gap-2 font-handwritten text-sm", children: [
            /* @__PURE__ */ jsx4("span", { class: "text-green-600 font-bold mt-0.5", children: "\u2714" }),
            " ",
            item
          ] }, item)) }),
          /* @__PURE__ */ jsxs4("label", { class: "flex items-start gap-3 cursor-pointer bg-yellow-50 border border-yellow-300 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx4("input", { type: "checkbox", name: "conductAgreed", id: "studentConductAgreed", class: "mt-1 w-5 h-5 accent-black flex-shrink-0" }),
            /* @__PURE__ */ jsxs4("span", { class: "font-handwritten text-sm", children: [
              /* @__PURE__ */ jsx4("strong", { children: "I have read and agree" }),
              " to the MentorMatch Code of Conduct & Safety Guidelines. I understand my responsibilities, the platform's limitations of liability, and that violations may result in suspension or removal of my account."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { id: "studentMsg", class: "hidden p-4 border-2 border-dashed rounded-lg", children: /* @__PURE__ */ jsx4("p", { class: "font-handwritten text-sm" }) }),
        /* @__PURE__ */ jsxs4(
          "button",
          {
            type: "submit",
            id: "studentSubmitBtn",
            class: "w-full scribble-button p-4 font-sketch text-xl bg-blue-200 hover:bg-blue-300 transition-colors",
            children: [
              /* @__PURE__ */ jsx4("span", { class: "btn-text", children: "Create Student Account \u{1F393}" }),
              /* @__PURE__ */ jsxs4("span", { class: "btn-loader hidden", children: [
                /* @__PURE__ */ jsx4("svg", { class: "animate-spin inline-block w-5 h-5 mr-2", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx4("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "8", fill: "none", "stroke-dasharray": "60 40" }) }),
                "Creating account..."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs4("p", { class: "text-center font-handwritten text-sm", children: [
          "Already have an account? ",
          /* @__PURE__ */ jsx4("a", { href: "/login", class: "font-sketch font-bold underline", children: "Sign in" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx4("div", { id: "mentorForm", class: "hidden", children: /* @__PURE__ */ jsxs4("form", { id: "mentorRegistrationForm", class: "scribble-card-large p-8 bg-gray-50 space-y-10", children: [
        /* @__PURE__ */ jsx4("input", { type: "hidden", name: "role", value: "mentor" }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 1: Professional Background" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-4", children: [
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Full Name *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "name",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "Your full name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Current Job Title *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "position",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "e.g. Orthopedic Surgeon, VP of Engineering"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Company / Organization *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "company",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "e.g. Google, Mayo Clinic, Self-employed"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Years of Experience *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "number",
                    name: "experienceYears",
                    required: true,
                    min: "1",
                    max: "60",
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "e.g. 12"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Industry *" }),
                /* @__PURE__ */ jsxs4(
                  "select",
                  {
                    name: "industry",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid bg-white",
                    children: [
                      /* @__PURE__ */ jsx4("option", { value: "", children: "Select industry" }),
                      /* @__PURE__ */ jsx4("option", { value: "technology", children: "Technology" }),
                      /* @__PURE__ */ jsx4("option", { value: "medicine", children: "Medicine / Healthcare" }),
                      /* @__PURE__ */ jsx4("option", { value: "law", children: "Law" }),
                      /* @__PURE__ */ jsx4("option", { value: "business", children: "Business / Finance" }),
                      /* @__PURE__ */ jsx4("option", { value: "sports", children: "Sports Industry" }),
                      /* @__PURE__ */ jsx4("option", { value: "engineering", children: "Engineering" }),
                      /* @__PURE__ */ jsx4("option", { value: "science", children: "Science / Research" }),
                      /* @__PURE__ */ jsx4("option", { value: "education", children: "Education" }),
                      /* @__PURE__ */ jsx4("option", { value: "media", children: "Media / Entertainment" }),
                      /* @__PURE__ */ jsx4("option", { value: "nonprofit", children: "Non-Profit" }),
                      /* @__PURE__ */ jsx4("option", { value: "government", children: "Government / Public Service" }),
                      /* @__PURE__ */ jsx4("option", { value: "other", children: "Other" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "LinkedIn *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "text",
                    name: "linkedinUrl",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "https://linkedin.com/in/..."
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { class: "grid md:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Email Address *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "email",
                    name: "email",
                    required: true,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "your@email.com"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs4("div", { children: [
                /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Password *" }),
                /* @__PURE__ */ jsx4(
                  "input",
                  {
                    type: "password",
                    name: "password",
                    required: true,
                    minLength: 8,
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                    placeholder: "At least 8 characters"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Short Bio (2\u20133 paragraphs) *" }),
              /* @__PURE__ */ jsx4(
                "textarea",
                {
                  name: "shortBio",
                  required: true,
                  rows: 6,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none",
                  placeholder: "Tell students about your career journey, what you've accomplished, and what makes you the right person to guide them..."
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 2: Expertise" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "What topics can you mentor on? (Select all that apply)" }),
              /* @__PURE__ */ jsx4("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-3", children: [
                { value: "career-entry", label: "Career entry strategy" },
                { value: "leadership", label: "Leadership" },
                { value: "entrepreneurship", label: "Entrepreneurship" },
                { value: "industry-insights", label: "Industry insights" },
                { value: "college-pathway", label: "College pathway advice" },
                { value: "resume-review", label: "Resume review" },
                { value: "interview-prep", label: "Interview prep" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-yellow-50 transition-colors", children: [
                /* @__PURE__ */ jsx4("input", { type: "checkbox", name: "mentorTopics", value: opt.value, class: "w-5 h-5 accent-black" }),
                /* @__PURE__ */ jsx4("span", { class: "font-handwritten", children: opt.label })
              ] }, opt.value)) })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "What industries have you worked in? *" }),
              /* @__PURE__ */ jsx4(
                "input",
                {
                  type: "text",
                  name: "industriesWorked",
                  required: true,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                  placeholder: "e.g. Healthcare, Biotech, Medical Devices"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 3: Availability" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "How many mentees can you take on? *" }),
              /* @__PURE__ */ jsxs4(
                "select",
                {
                  name: "maxMentees",
                  required: true,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid bg-white",
                  children: [
                    /* @__PURE__ */ jsx4("option", { value: "", children: "Select capacity" }),
                    /* @__PURE__ */ jsx4("option", { value: "1", children: "1 mentee" }),
                    /* @__PURE__ */ jsx4("option", { value: "2", children: "2 mentees" }),
                    /* @__PURE__ */ jsx4("option", { value: "3", children: "3 mentees" }),
                    /* @__PURE__ */ jsx4("option", { value: "5", children: "Up to 5 mentees" }),
                    /* @__PURE__ */ jsx4("option", { value: "10", children: "Up to 10 mentees" })
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "Preferred meeting frequency *" }),
              /* @__PURE__ */ jsx4("div", { class: "flex flex-col gap-3", children: [
                { value: "one-time", label: "One-time conversations only" },
                { value: "monthly", label: "Monthly" },
                { value: "bi-weekly", label: "Bi-weekly" },
                { value: "flexible", label: "Flexible / Student's preference" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-green-50 transition-colors", children: [
                /* @__PURE__ */ jsx4("input", { type: "radio", name: "preferredMeetingFreq", value: opt.value, class: "w-5 h-5 accent-black" }),
                /* @__PURE__ */ jsx4("span", { class: "font-handwritten", children: opt.label })
              ] }, opt.value)) })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-3", children: "Meeting format *" }),
              /* @__PURE__ */ jsx4("div", { class: "flex flex-col gap-3", children: [
                { value: "virtual-only", label: "Virtual only" },
                { value: "open-to-inperson", label: "Open to in-person (depending on location)" }
              ].map((opt) => /* @__PURE__ */ jsxs4("label", { class: "flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-blue-50 transition-colors", children: [
                /* @__PURE__ */ jsx4("input", { type: "radio", name: "virtualOrInperson", value: opt.value, class: "w-5 h-5 accent-black" }),
                /* @__PURE__ */ jsx4("span", { class: "font-handwritten", children: opt.label })
              ] }, opt.value)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-2xl mb-1", children: "Section 4: Motivation" }),
          /* @__PURE__ */ jsx4("div", { class: "w-16 h-1 bg-black mb-6 rounded" }),
          /* @__PURE__ */ jsxs4("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Why do you want to mentor students? *" }),
              /* @__PURE__ */ jsx4(
                "textarea",
                {
                  name: "whyMentor",
                  required: true,
                  rows: 4,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none",
                  placeholder: "What drives you to give back and help the next generation..."
                }
              )
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("label", { class: "block font-sketch mb-2", children: "Have you had mentors who impacted you? *" }),
              /* @__PURE__ */ jsx4(
                "textarea",
                {
                  name: "hadMentors",
                  required: true,
                  rows: 3,
                  class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none",
                  placeholder: "Share a brief story about a mentor who shaped your path (or how the lack of one affected you)..."
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("section", { class: "scribble-card p-6 bg-blue-50 border-2 border-blue-300", children: [
          /* @__PURE__ */ jsx4("h3", { class: "font-sketch text-xl mb-1", children: "MentorMatch Code of Conduct & Safety Guidelines" }),
          /* @__PURE__ */ jsx4("p", { class: "font-handwritten text-sm text-gray-500 mb-4", children: "You must read and agree to the full policy before creating an account." }),
          /* @__PURE__ */ jsxs4("div", { class: "bg-white border-2 border-dashed border-blue-300 rounded-lg p-5 h-64 overflow-y-auto mb-5 space-y-4 text-sm font-handwritten leading-relaxed", children: [
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "Introduction" }),
              /* @__PURE__ */ jsx4("p", { children: "MentorMatch is committed to providing a professional and supportive environment for students (mentees) and mentors. By using this platform, all participants agree to follow these rules and acknowledge responsibilities and risks outlined below." })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "1. Personal Safety & Online Conduct" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentors and mentees ",
                  /* @__PURE__ */ jsx4("strong", { children: "may share personal contact information" }),
                  " at their discretion."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  /* @__PURE__ */ jsx4("strong", { children: "All such interactions are the sole responsibility of the users." }),
                  " MentorMatch is ",
                  /* @__PURE__ */ jsx4("strong", { children: "not liable" }),
                  " for any issues arising from off-platform communication, including scams, harassment, or negative experiences."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "Users should exercise caution when sharing personal info or meeting in person." }),
                /* @__PURE__ */ jsx4("li", { children: "Any professional misconduct or abusive behavior may be reported using the platform's reporting system." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "2. Liability & Disclaimers" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "MentorMatch ",
                  /* @__PURE__ */ jsx4("strong", { children: "does not guarantee" }),
                  " mentorship outcomes, career advancement, or safety from interactions outside the platform."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Any negative experiences, scams, or misuse of information ",
                  /* @__PURE__ */ jsx4("strong", { children: "are not the responsibility of MentorMatch" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Students under 18 should have ",
                  /* @__PURE__ */ jsx4("strong", { children: "parental/guardian consent" }),
                  " to participate in mentorship sessions."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "3. Professional Behavior" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentors should provide guidance ",
                  /* @__PURE__ */ jsx4("strong", { children: "ethically and honestly" }),
                  ", based on their own experience."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentees should ",
                  /* @__PURE__ */ jsx4("strong", { children: "respect mentors' time" }),
                  " and prepare for each session."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "Both parties should communicate responsibly and notify the other if unavailable for a scheduled session." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "4. Reporting System (AI-Enforced)" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Users may report any ",
                  /* @__PURE__ */ jsx4("strong", { children: "inappropriate behavior, scams, harassment, or negative experiences" }),
                  " through the MentorMatch platform."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "Reports should include: name of the user being reported, description of the issue, and any supporting evidence (screenshots, messages, etc.)." }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "The AI will ",
                  /* @__PURE__ */ jsx4("strong", { children: "flag reports automatically" }),
                  " and notify admins for review."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "MentorMatch will ",
                  /* @__PURE__ */ jsx4("strong", { children: "investigate all reports" }),
                  " and may suspend or remove users."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Users ",
                  /* @__PURE__ */ jsx4("strong", { children: "should not attempt to resolve serious issues on their own" }),
                  "; always report via the platform."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "5. Content & Intellectual Property" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsx4("li", { children: "Users should share original content or properly credit sources." }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Mentorship content may be shared at users' discretion, but MentorMatch is ",
                  /* @__PURE__ */ jsx4("strong", { children: "not liable" }),
                  " for misuse or redistribution of materials outside the platform."
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "6. Account Integrity" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "All users must provide ",
                  /* @__PURE__ */ jsx4("strong", { children: "accurate and truthful information" }),
                  " during registration."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "False, misleading, or fraudulent accounts may be suspended or removed." })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "7. Enforcement" }),
              /* @__PURE__ */ jsx4("p", { children: "Violations of this Code of Conduct may result in:" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsx4("li", { children: "Temporary suspension" }),
                /* @__PURE__ */ jsx4("li", { children: "Permanent removal of account" }),
                /* @__PURE__ */ jsx4("li", { children: "Reporting to authorities if laws are broken" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs4("div", { children: [
              /* @__PURE__ */ jsx4("p", { class: "font-sketch font-bold text-base mb-1", children: "8. Acceptance" }),
              /* @__PURE__ */ jsx4("p", { children: "By signing up for MentorMatch, you acknowledge that:" }),
              /* @__PURE__ */ jsxs4("ul", { class: "list-disc pl-5 space-y-1", children: [
                /* @__PURE__ */ jsxs4("li", { children: [
                  "Sharing personal contact information is at your ",
                  /* @__PURE__ */ jsx4("strong", { children: "own risk" }),
                  "."
                ] }),
                /* @__PURE__ */ jsxs4("li", { children: [
                  "MentorMatch ",
                  /* @__PURE__ */ jsx4("strong", { children: "is not liable" }),
                  " for any scams, fraud, or negative experiences."
                ] }),
                /* @__PURE__ */ jsx4("li", { children: "You understand the platform's rules and agree to follow this Code of Conduct." }),
                /* @__PURE__ */ jsx4("li", { children: "All reports will be reviewed promptly, and users may be suspended or removed if warranted." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx4("div", { class: "mb-5 grid grid-cols-1 md:grid-cols-2 gap-2", children: [
            "Respectful, professional communication",
            "No harassment or abusive behavior",
            "Maintain professional boundaries",
            "Honor scheduled session commitments",
            "Provide accurate registration info",
            "Report issues through the platform only",
            "Off-platform interactions are your responsibility",
            "Students under 18 require parental consent"
          ].map((item) => /* @__PURE__ */ jsxs4("div", { class: "flex items-start gap-2 font-handwritten text-sm", children: [
            /* @__PURE__ */ jsx4("span", { class: "text-green-600 font-bold mt-0.5", children: "\u2714" }),
            " ",
            item
          ] }, item)) }),
          /* @__PURE__ */ jsxs4("label", { class: "flex items-start gap-3 cursor-pointer bg-yellow-50 border border-yellow-300 rounded-lg p-4", children: [
            /* @__PURE__ */ jsx4("input", { type: "checkbox", name: "conductAgreed", id: "mentorConductAgreed", class: "mt-1 w-5 h-5 accent-black flex-shrink-0" }),
            /* @__PURE__ */ jsxs4("span", { class: "font-handwritten text-sm", children: [
              /* @__PURE__ */ jsx4("strong", { children: "I have read and agree" }),
              " to the MentorMatch Code of Conduct & Safety Guidelines. I understand my responsibilities, the platform's limitations of liability, and that violations may result in suspension or removal of my account."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { id: "mentorMsg", class: "hidden p-4 border-2 border-dashed rounded-lg", children: /* @__PURE__ */ jsx4("p", { class: "font-handwritten text-sm" }) }),
        /* @__PURE__ */ jsxs4(
          "button",
          {
            type: "submit",
            id: "mentorSubmitBtn",
            class: "w-full scribble-button p-4 font-sketch text-xl bg-purple-200 hover:bg-purple-300 transition-colors",
            children: [
              /* @__PURE__ */ jsx4("span", { class: "btn-text", children: "Create Mentor Account \u{1F3C6}" }),
              /* @__PURE__ */ jsxs4("span", { class: "btn-loader hidden", children: [
                /* @__PURE__ */ jsx4("svg", { class: "animate-spin inline-block w-5 h-5 mr-2", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx4("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "8", fill: "none", "stroke-dasharray": "60 40" }) }),
                "Creating account..."
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs4("p", { class: "text-center font-handwritten text-sm", children: [
          "Already have an account? ",
          /* @__PURE__ */ jsx4("a", { href: "/login", class: "font-sketch font-bold underline", children: "Sign in" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx4("script", { dangerouslySetInnerHTML: { __html: `
        // Tab switching
        function switchRole(role) {
          var sf = document.getElementById('studentForm')
          var mf = document.getElementById('mentorForm')
          var ts = document.getElementById('tabStudent')
          var tm = document.getElementById('tabMentor')
          if (role === 'student') {
            sf.classList.remove('hidden')
            mf.classList.add('hidden')
            ts.classList.add('bg-blue-200')
            ts.classList.remove('bg-gray-100')
            tm.classList.add('bg-gray-100')
            tm.classList.remove('bg-purple-200')
          } else {
            mf.classList.remove('hidden')
            sf.classList.add('hidden')
            tm.classList.add('bg-purple-200')
            tm.classList.remove('bg-gray-100')
            ts.classList.add('bg-gray-100')
            ts.classList.remove('bg-blue-200')
          }
        }

        // Career field radio highlight
        document.querySelectorAll('input[name="careerField"]').forEach(function(r) {
          r.addEventListener('change', function() {
            document.querySelectorAll('#careerFieldGroup .select-indicator').forEach(function(d) {
              d.classList.remove('bg-blue-100', 'border-blue-400')
            })
            this.closest('label').querySelector('.select-indicator').classList.add('bg-blue-100', 'border-blue-400')
            var wrap = document.getElementById('otherCareerWrap')
            if (this.value === 'other') {
              wrap.classList.remove('hidden')
            } else {
              wrap.classList.add('hidden')
            }
          })
        })

        // Personality radio highlight
        document.querySelectorAll('input[name="personalityType"]').forEach(function(r) {
          r.addEventListener('change', function() {
            document.querySelectorAll('input[name="personalityType"]').forEach(function(x) {
              x.closest('label').querySelector('.select-indicator').classList.remove('bg-blue-100')
            })
            this.closest('label').querySelector('.select-indicator').classList.add('bg-blue-100')
          })
        })

        // Generic form submit handler
        function handleFormSubmit(formId, msgId, btnId) {
          var form = document.getElementById(formId)
          if (!form) return
          form.addEventListener('submit', async function(e) {
            e.preventDefault()
            var btn = document.getElementById(btnId)
            var msgDiv = document.getElementById(msgId)
            var msgP = msgDiv.querySelector('p')

            // Gather data
            var fd = new FormData(form)
            var helpNeeded = fd.getAll('helpNeeded').join(',')
            var mentorTopics = fd.getAll('mentorTopics').join(',')

            var data = {
              role: fd.get('role'),
              name: fd.get('name'),
              email: fd.get('email'),
              password: fd.get('password'),
              // student
              age: fd.get('age') ? parseInt(fd.get('age')) : undefined,
              school: fd.get('school') || undefined,
              gradeLevel: fd.get('gradeLevel') || undefined,
              linkedinUrl: fd.get('linkedinUrl') || undefined,
              careerField: fd.get('careerField') === 'other'
                ? (fd.get('careerFieldOther') || 'other')
                : (fd.get('careerField') || undefined),
              dreamRole: fd.get('dreamRole') || undefined,
              careerInterestWhy: fd.get('careerInterestWhy') || undefined,
              helpNeeded: helpNeeded || undefined,
              meetingFrequency: fd.get('meetingFrequency') || undefined,
              willingToPrepare: fd.get('willingToPrepare') === 'yes',
              adviceStyle: fd.get('adviceStyle') || undefined,
              personalityType: fd.get('personalityType') || undefined,
              // mentor
              position: fd.get('position') || undefined,
              company: fd.get('company') || undefined,
              experienceYears: fd.get('experienceYears') ? parseInt(fd.get('experienceYears')) : undefined,
              industry: fd.get('industry') || undefined,
              shortBio: fd.get('shortBio') || undefined,
              mentorTopics: mentorTopics || undefined,
              industriesWorked: fd.get('industriesWorked') || undefined,
              maxMentees: fd.get('maxMentees') ? parseInt(fd.get('maxMentees')) : undefined,
              preferredMeetingFreq: fd.get('preferredMeetingFreq') || undefined,
              virtualOrInperson: fd.get('virtualOrInperson') || undefined,
              whyMentor: fd.get('whyMentor') || undefined,
              hadMentors: fd.get('hadMentors') || undefined,
            }

            // Remove undefined keys
            Object.keys(data).forEach(function(k) { if (data[k] === undefined) delete data[k] })

              // Manual validation for checkboxes that can't use HTML required reliably
              var conductBox = form.querySelector('[name="conductAgreed"]')
              if (conductBox && !conductBox.checked) {
                showMsg(msgDiv, msgP, '\u26A0\uFE0F Please scroll down and agree to the Code of Conduct before submitting.', false)
                conductBox.closest('label') && conductBox.closest('label').scrollIntoView({ behavior: 'smooth', block: 'center' })
                return
              }
              var prepBox = form.querySelector('[name="willingToPrepare"]')
              if (prepBox && !prepBox.checked) {
                showMsg(msgDiv, msgP, '\u26A0\uFE0F Please confirm you are willing to prepare questions before each session.', false)
                prepBox.closest('label') && prepBox.closest('label').scrollIntoView({ behavior: 'smooth', block: 'center' })
                return
              }

              // Set loading
              btn.disabled = true
              btn.querySelector('.btn-text').classList.add('hidden')
              btn.querySelector('.btn-loader').classList.remove('hidden')
              msgDiv.classList.add('hidden')

            try {
              var res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
              })
              var result = await res.json()

              if (res.ok && result.success) {
                localStorage.setItem('auth-token', result.token)
                document.cookie = 'auth-token=' + result.token + '; path=/; max-age=604800'
                localStorage.setItem('user', JSON.stringify(result.user))
                showMsg(msgDiv, msgP, '\u2705 Account created! Redirecting to your dashboard...', true)
                setTimeout(function() { window.location.href = '/dashboard' }, 1800)
              } else {
                var errMsg = result.error || 'Registration failed'
                if (result.issues && result.issues.length) {
                  errMsg = result.issues.map(function(i) { return i.message }).join(', ')
                } else if (result.message) {
                  errMsg = result.message
                }
                showMsg(msgDiv, msgP, '\u274C ' + errMsg, false)
                btn.disabled = false
                btn.querySelector('.btn-text').classList.remove('hidden')
                btn.querySelector('.btn-loader').classList.add('hidden')
              }
            } catch(err) {
              showMsg(msgDiv, msgP, '\u274C Network error. Please try again.', false)
              btn.disabled = false
              btn.querySelector('.btn-text').classList.remove('hidden')
              btn.querySelector('.btn-loader').classList.add('hidden')
            }
          })
        }

        function showMsg(div, p, msg, success) {
          p.textContent = msg
          div.classList.remove('hidden', 'bg-red-50', 'bg-green-50', 'border-red-400', 'border-green-400')
          if (success) {
            div.classList.add('bg-green-50', 'border-green-400')
          } else {
            div.classList.add('bg-red-50', 'border-red-400')
          }
        }

        handleFormSubmit('studentRegistrationForm', 'studentMsg', 'studentSubmitBtn')
        handleFormSubmit('mentorRegistrationForm', 'mentorMsg', 'mentorSubmitBtn')

        // Pre-select role from URL param
        var urlParams = new URLSearchParams(window.location.search)
        var preRole = urlParams.get('role')
        if (preRole === 'mentor') switchRole('mentor')
      ` } })
  ] });
}

// src/pages/profile.tsx
import { jsx as jsx5, jsxs as jsxs5 } from "hono/jsx/jsx-runtime";
function ProfilePage({ user }) {
  return /* @__PURE__ */ jsxs5("div", { class: "min-h-screen bg-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs5("div", { class: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx5("svg", { class: "absolute top-10 right-10 w-32 h-32 opacity-10", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx5("path", { d: "M50,10 L90,90 L10,90 Z", stroke: "black", "stroke-width": "2", fill: "none", class: "animate-pulse" }) }),
      /* @__PURE__ */ jsx5("svg", { class: "absolute bottom-20 left-10 w-40 h-20 opacity-10", viewBox: "0 0 100 50", children: /* @__PURE__ */ jsx5("path", { d: "M10,25 Q30,5 50,25 Q70,45 90,25", stroke: "black", "stroke-width": "2", fill: "none", class: "animate-bounce-slow" }) })
    ] }),
    /* @__PURE__ */ jsxs5("div", { class: "relative z-10 container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs5("header", { class: "flex justify-between items-center mb-12", children: [
        /* @__PURE__ */ jsx5("div", { class: "scribble-border p-3 hover:rotate-1 transition-transform", children: /* @__PURE__ */ jsx5("h1", { class: "text-3xl font-bold font-sketch", children: "MentorMatch" }) }),
        /* @__PURE__ */ jsxs5("div", { class: "flex space-x-4", children: [
          /* @__PURE__ */ jsx5("a", { href: "/dashboard", class: "scribble-button px-6 py-3 font-sketch bg-gray-200 hover:bg-gray-300", children: "\u2190 Dashboard" }),
          /* @__PURE__ */ jsx5("button", { onclick: "logout()", class: "scribble-button px-4 py-2 font-sketch text-sm bg-red-200 hover:bg-red-300", children: "Logout" })
        ] })
      ] }),
      /* @__PURE__ */ jsx5("div", { class: "text-center mb-12", children: /* @__PURE__ */ jsx5("div", { class: "scribble-border-large inline-block p-6", children: /* @__PURE__ */ jsxs5("div", { class: "flex items-center justify-center space-x-6", children: [
        /* @__PURE__ */ jsx5("div", { class: "w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl", children: user.role === "student" ? "\u{1F393}" : "\u{1F451}" }),
        /* @__PURE__ */ jsxs5("div", { class: "text-left", children: [
          /* @__PURE__ */ jsx5("h2", { class: "text-3xl font-bold font-sketch transform rotate-1", children: user.name }),
          /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-xl text-gray-600", children: user.role === "student" ? "\u{1F393} Student" : "\u{1F451} CEO/Leader" }),
          /* @__PURE__ */ jsx5("div", { class: "flex items-center mt-2", children: /* @__PURE__ */ jsxs5("span", { class: "font-handwritten text-sm", children: [
            "Status: ",
            user.verificationStatus === "verified" ? "\u2705 Verified" : "\u23F3 Pending Verification"
          ] }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs5("div", { class: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxs5("div", { class: "scribble-card-large p-8 bg-gray-50", children: [
          /* @__PURE__ */ jsx5("div", { id: "messageContainer", class: "mb-6" }),
          /* @__PURE__ */ jsxs5("form", { id: "profileForm", class: "space-y-8", children: [
            /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx5("h3", { class: "text-2xl font-bold font-sketch mb-6 transform -rotate-1", children: "\u{1F4DD} Basic Information" }),
              /* @__PURE__ */ jsxs5("div", { class: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch text-lg mb-2", for: "name", children: "Full Name *" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "text",
                      id: "name",
                      name: "name",
                      value: user.name,
                      required: true,
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid focus:rotate-1 transition-transform"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch text-lg mb-2", for: "email", children: "Email Address" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "email",
                      id: "email",
                      value: user.email,
                      disabled: true,
                      class: "w-full p-3 border-2 border-gray-400 border-dashed rounded-lg font-handwritten bg-gray-100 text-gray-600"
                    }
                  ),
                  /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-xs text-gray-500 mt-1", children: "Email cannot be changed. Contact support if needed." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs5("div", { class: "mt-6", children: [
                /* @__PURE__ */ jsx5("label", { class: "block font-sketch text-lg mb-2", for: "bio", children: "Bio" }),
                /* @__PURE__ */ jsx5(
                  "textarea",
                  {
                    id: "bio",
                    name: "bio",
                    rows: 4,
                    placeholder: "Tell others about yourself, your interests, and what you hope to gain from conversations...",
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none",
                    children: user.bio || ""
                  }
                ),
                /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-xs text-gray-500 mt-1", children: "A good bio helps others connect with you better!" })
              ] })
            ] }),
            user.role === "student" && /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx5("h3", { class: "text-2xl font-bold font-sketch mb-6 transform rotate-1", children: "\u{1F393} Student Information" }),
              /* @__PURE__ */ jsxs5("div", { class: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "university", children: "University/School" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "text",
                      id: "university",
                      name: "university",
                      value: user.university || "",
                      placeholder: "e.g., Stanford University",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "major", children: "Major/Field of Study" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "text",
                      id: "major",
                      name: "major",
                      value: user.major || "",
                      placeholder: "e.g., Computer Science",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs5("div", { class: "mt-6", children: [
                /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "graduationYear", children: "Expected Graduation Year" }),
                /* @__PURE__ */ jsx5(
                  "input",
                  {
                    type: "number",
                    id: "graduationYear",
                    name: "graduationYear",
                    value: user.graduationYear || "",
                    min: "2024",
                    max: "2035",
                    placeholder: "e.g., 2025",
                    class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid md:w-1/3"
                  }
                )
              ] })
            ] }),
            user.role === "ceo" && /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx5("h3", { class: "text-2xl font-bold font-sketch mb-6 transform -rotate-1", children: "\u{1F3E2} Professional Information" }),
              /* @__PURE__ */ jsxs5("div", { class: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "company", children: "Company *" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "text",
                      id: "company",
                      name: "company",
                      value: user.company || "",
                      required: true,
                      placeholder: "e.g., Tech Innovations Inc.",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "position", children: "Position *" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "text",
                      id: "position",
                      name: "position",
                      value: user.position || "",
                      required: true,
                      placeholder: "e.g., CEO, Founder, Director",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs5("div", { class: "grid md:grid-cols-2 gap-6 mt-6", children: [
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "industry", children: "Industry" }),
                  /* @__PURE__ */ jsxs5(
                    "select",
                    {
                      id: "industry",
                      name: "industry",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                      children: [
                        /* @__PURE__ */ jsx5("option", { value: "", children: "Select Industry" }),
                        /* @__PURE__ */ jsx5("option", { value: "technology", selected: user.industry === "technology", children: "Technology" }),
                        /* @__PURE__ */ jsx5("option", { value: "finance", selected: user.industry === "finance", children: "Finance" }),
                        /* @__PURE__ */ jsx5("option", { value: "healthcare", selected: user.industry === "healthcare", children: "Healthcare" }),
                        /* @__PURE__ */ jsx5("option", { value: "education", selected: user.industry === "education", children: "Education" }),
                        /* @__PURE__ */ jsx5("option", { value: "retail", selected: user.industry === "retail", children: "Retail" }),
                        /* @__PURE__ */ jsx5("option", { value: "manufacturing", selected: user.industry === "manufacturing", children: "Manufacturing" }),
                        /* @__PURE__ */ jsx5("option", { value: "media", selected: user.industry === "media", children: "Media & Entertainment" }),
                        /* @__PURE__ */ jsx5("option", { value: "consulting", selected: user.industry === "consulting", children: "Consulting" }),
                        /* @__PURE__ */ jsx5("option", { value: "nonprofit", selected: user.industry === "nonprofit", children: "Non-Profit" }),
                        /* @__PURE__ */ jsx5("option", { value: "other", selected: user.industry === "other", children: "Other" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "experienceYears", children: "Years of Experience" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "number",
                      id: "experienceYears",
                      name: "experienceYears",
                      value: user.experienceYears || "",
                      min: "0",
                      max: "60",
                      placeholder: "e.g., 15",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx5("h3", { class: "text-2xl font-bold font-sketch mb-6 transform rotate-1", children: "\u{1F517} Social Links" }),
              /* @__PURE__ */ jsxs5("div", { class: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "linkedinUrl", children: "LinkedIn Profile" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "url",
                      id: "linkedinUrl",
                      name: "linkedinUrl",
                      value: user.linkedinUrl || "",
                      placeholder: "https://linkedin.com/in/yourprofile",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "websiteUrl", children: "Website/Portfolio" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "url",
                      id: "websiteUrl",
                      name: "websiteUrl",
                      value: user.websiteUrl || "",
                      placeholder: "https://yourwebsite.com",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  )
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { children: [
              /* @__PURE__ */ jsx5("h3", { class: "text-2xl font-bold font-sketch mb-6 transform -rotate-1", children: "\u2699\uFE0F Preferences" }),
              /* @__PURE__ */ jsxs5("div", { class: "grid md:grid-cols-2 gap-6", children: [
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "timezone", children: "Timezone" }),
                  /* @__PURE__ */ jsxs5(
                    "select",
                    {
                      id: "timezone",
                      name: "timezone",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid",
                      children: [
                        /* @__PURE__ */ jsx5("option", { value: "UTC", selected: user.timezone === "UTC", children: "UTC" }),
                        /* @__PURE__ */ jsx5("option", { value: "America/New_York", selected: user.timezone === "America/New_York", children: "Eastern Time (ET)" }),
                        /* @__PURE__ */ jsx5("option", { value: "America/Chicago", selected: user.timezone === "America/Chicago", children: "Central Time (CT)" }),
                        /* @__PURE__ */ jsx5("option", { value: "America/Denver", selected: user.timezone === "America/Denver", children: "Mountain Time (MT)" }),
                        /* @__PURE__ */ jsx5("option", { value: "America/Los_Angeles", selected: user.timezone === "America/Los_Angeles", children: "Pacific Time (PT)" }),
                        /* @__PURE__ */ jsx5("option", { value: "Europe/London", selected: user.timezone === "Europe/London", children: "London (GMT)" }),
                        /* @__PURE__ */ jsx5("option", { value: "Europe/Paris", selected: user.timezone === "Europe/Paris", children: "Central Europe (CET)" }),
                        /* @__PURE__ */ jsx5("option", { value: "Asia/Tokyo", selected: user.timezone === "Asia/Tokyo", children: "Tokyo (JST)" }),
                        /* @__PURE__ */ jsx5("option", { value: "Australia/Sydney", selected: user.timezone === "Australia/Sydney", children: "Sydney (AEST)" })
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs5("div", { children: [
                  /* @__PURE__ */ jsx5("label", { class: "block font-sketch mb-2", for: "languages", children: "Languages Spoken" }),
                  /* @__PURE__ */ jsx5(
                    "input",
                    {
                      type: "text",
                      id: "languages",
                      name: "languages",
                      value: user.languages ? user.languages.join(", ") : "",
                      placeholder: "e.g., English, Spanish, French",
                      class: "w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    }
                  ),
                  /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-xs text-gray-500 mt-1", children: "Separate multiple languages with commas" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { class: "flex justify-end space-x-4", children: [
              /* @__PURE__ */ jsx5(
                "button",
                {
                  type: "button",
                  onclick: "window.location.href='/dashboard'",
                  class: "scribble-button px-8 py-3 font-sketch text-lg bg-gray-200 hover:bg-gray-300",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxs5(
                "button",
                {
                  type: "submit",
                  id: "saveButton",
                  class: "scribble-button px-8 py-3 font-sketch text-lg bg-green-200 hover:bg-green-300",
                  children: [
                    /* @__PURE__ */ jsx5("span", { id: "saveButtonText", children: "\u{1F4BE} Save Profile" }),
                    /* @__PURE__ */ jsxs5("span", { id: "saveLoader", class: "hidden", children: [
                      /* @__PURE__ */ jsx5("svg", { class: "animate-spin inline-block w-5 h-5 mr-2", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx5("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "4", fill: "none", "stroke-dasharray": "60 40" }) }),
                      "Saving..."
                    ] })
                  ]
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { class: "mt-12 grid md:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxs5("div", { class: "scribble-card p-6 text-center", children: [
            /* @__PURE__ */ jsx5("div", { class: "text-3xl mb-2", children: "\u{1F4AC}" }),
            /* @__PURE__ */ jsx5("h4", { class: "font-sketch text-lg font-bold", children: user.totalConversations || 0 }),
            /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-sm", children: "Total Conversations" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { class: "scribble-card p-6 text-center", children: [
            /* @__PURE__ */ jsx5("div", { class: "text-3xl mb-2", children: "\u2B50" }),
            /* @__PURE__ */ jsxs5("h4", { class: "font-sketch text-lg font-bold", children: [
              user.averageRating || 0,
              "/5"
            ] }),
            /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-sm", children: "Average Rating" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { class: "scribble-card p-6 text-center", children: [
            /* @__PURE__ */ jsx5("div", { class: "text-3xl mb-2", children: "\u{1F4C5}" }),
            /* @__PURE__ */ jsx5("h4", { class: "font-sketch text-lg font-bold", children: new Date(user.createdAt).toLocaleDateString() }),
            /* @__PURE__ */ jsx5("p", { class: "font-handwritten text-sm", children: "Member Since" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx5("script", { dangerouslySetInnerHTML: {
      __html: `
        document.getElementById('profileForm').addEventListener('submit', async function(e) {
          e.preventDefault()
          
          const token = localStorage.getItem('auth-token')
          if (!token) {
            window.location.href = '/login'
            return
          }
          
          setLoading(true)
          
          try {
            const formData = new FormData(this)
            
            // Prepare data
            const data = {
              name: formData.get('name'),
              bio: formData.get('bio'),
              university: formData.get('university'),
              major: formData.get('major'),
              graduationYear: formData.get('graduationYear') ? parseInt(formData.get('graduationYear')) : undefined,
              company: formData.get('company'),
              position: formData.get('position'),
              industry: formData.get('industry'),
              experienceYears: formData.get('experienceYears') ? parseInt(formData.get('experienceYears')) : undefined,
              linkedinUrl: formData.get('linkedinUrl'),
              websiteUrl: formData.get('websiteUrl'),
              timezone: formData.get('timezone'),
              languages: formData.get('languages') ? formData.get('languages').split(',').map(l => l.trim()).filter(l => l) : []
            }
            
            // Remove undefined values
            Object.keys(data).forEach(key => {
              if (data[key] === undefined || data[key] === '') {
                delete data[key]
              }
            })
            
            const response = await fetch('/api/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(data)
            })
            
            const result = await response.json()
            
            if (response.ok && result.success) {
              // Update stored user info
              localStorage.setItem('user', JSON.stringify(result.user))
              
              showMessage('Profile updated successfully! \u{1F389}', 'success')
              
              // Redirect to dashboard after delay
              setTimeout(() => {
                window.location.href = '/dashboard'
              }, 2000)
            } else {
              if (result.issues) {
                showMessage(result.issues.map(issue => issue.message).join(', '), 'error')
              } else {
                showMessage(result.error || 'Profile update failed', 'error')
              }
            }
          } catch (error) {
            console.error('Profile update error:', error)
            showMessage('Network error. Please try again.', 'error')
          } finally {
            setLoading(false)
          }
        })
        
        function showMessage(message, type) {
          const container = document.getElementById('messageContainer')
          const bgColor = type === 'success' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
          const textColor = type === 'success' ? 'text-green-700' : 'text-red-700'
          
          container.innerHTML = 
            '<div class="p-3 ' + bgColor + ' border-2 border-dashed rounded-lg">' +
            '<p class="font-handwritten ' + textColor + ' text-sm">' + message + '</p>' +
            '</div>'
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            container.innerHTML = ''
          }, 5000)
        }
        
        function setLoading(loading) {
          const button = document.getElementById('saveButton')
          const buttonText = document.getElementById('saveButtonText')
          const loader = document.getElementById('saveLoader')
          
          if (loading) {
            button.disabled = true
            buttonText.classList.add('hidden')
            loader.classList.remove('hidden')
          } else {
            button.disabled = false
            buttonText.classList.remove('hidden')
            loader.classList.add('hidden')
          }
        }
        
        async function logout() {
          const token = localStorage.getItem('auth-token')
          
          if (token) {
            try {
              await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token }
              })
            } catch (error) {
              console.error('Logout error:', error)
            }
          }
          
          localStorage.removeItem('auth-token')
          localStorage.removeItem('user')
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          
          window.location.href = '/login'
        }
        `
    } })
  ] });
}

// src/pages/dashboard.tsx
import { jsx as jsx6, jsxs as jsxs6 } from "hono/jsx/jsx-runtime";
function DashboardPage({ user }) {
  return /* @__PURE__ */ jsxs6("div", { class: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsxs6("nav", { class: "border-b-2 border-black border-dashed bg-white px-4 py-3 sticky top-0 z-40", children: [
      /* @__PURE__ */ jsxs6("div", { class: "container mx-auto flex justify-between items-center", children: [
        /* @__PURE__ */ jsxs6("div", { class: "flex items-center space-x-6", children: [
          /* @__PURE__ */ jsx6("a", { href: "/", class: "scribble-border p-2 hover:rotate-1 transition-transform", children: /* @__PURE__ */ jsx6("span", { class: "text-xl font-bold font-sketch", children: "MentorMatch" }) }),
          /* @__PURE__ */ jsxs6("nav", { class: "hidden md:flex space-x-1", children: [
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('overview')", class: "nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors", "data-section": "overview", children: "\u{1F4CA} Overview" }),
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('find-mentors')", class: "nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors", "data-section": "find-mentors", children: "\u{1F50D} Find Mentors" }),
            /* @__PURE__ */ jsxs6("button", { onclick: "switchSection('messages')", class: "nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors relative", "data-section": "messages", children: [
              "\u{1F4AC} Messages",
              /* @__PURE__ */ jsx6("span", { id: "inboxBadge", class: "hidden absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold", children: "!" })
            ] }),
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('my-calls')", class: "nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors", "data-section": "my-calls", children: "\u{1F4F9} My Calls" }),
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('profile')", class: "nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors", "data-section": "profile", children: "\u{1F464} Profile" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { class: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxs6("div", { class: "text-right hidden md:block", children: [
            /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-xs text-gray-500", children: "Welcome back," }),
            /* @__PURE__ */ jsx6("p", { class: "font-sketch font-bold text-sm", children: user.name }),
            /* @__PURE__ */ jsx6("span", { class: "text-xs bg-blue-100 px-2 py-0.5 rounded font-handwritten", children: user.role === "student" ? "\u{1F393} Student" : "\u{1F451} Mentor" })
          ] }),
          /* @__PURE__ */ jsx6("div", { class: "w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm", children: user.name?.charAt(0)?.toUpperCase() || "?" }),
          /* @__PURE__ */ jsxs6("div", { class: "relative", children: [
            /* @__PURE__ */ jsx6("button", { onclick: "toggleDropdown()", class: "scribble-button px-2 py-1 font-sketch text-sm bg-gray-100 hover:bg-gray-200", children: "\u22EE" }),
            /* @__PURE__ */ jsxs6("div", { id: "userDropdown", class: "hidden absolute right-0 mt-2 w-48 bg-white border-2 border-black border-dashed shadow-lg z-50 rounded", children: [
              /* @__PURE__ */ jsx6("a", { href: "/profile", class: "block px-4 py-2 font-handwritten hover:bg-gray-100 text-sm", children: "Edit Profile" }),
              /* @__PURE__ */ jsx6("button", { onclick: "logout()", class: "block w-full text-left px-4 py-2 font-handwritten hover:bg-gray-100 text-red-600 text-sm", children: "Logout" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx6("div", { class: "md:hidden mt-3 flex space-x-1 overflow-x-auto pb-1", children: [["overview", "\u{1F4CA}", "Overview"], ["find-mentors", "\u{1F50D}", "Find"], ["messages", "\u{1F4AC}", "Messages"], ["my-calls", "\u{1F4F9}", "Calls"], ["profile", "\u{1F464}", "Profile"]].map(
        ([s, e, l]) => /* @__PURE__ */ jsxs6("button", { onclick: `switchSection('${s}')`, class: "nav-btn whitespace-nowrap px-3 py-1.5 scribble-button font-sketch text-xs", "data-section": s, children: [
          e,
          " ",
          l
        ] })
      ) })
    ] }),
    /* @__PURE__ */ jsxs6("div", { class: "container mx-auto px-4 py-6 max-w-6xl", children: [
      /* @__PURE__ */ jsxs6("div", { id: "overview-section", class: "dashboard-section", children: [
        /* @__PURE__ */ jsx6("div", { class: "text-center mb-8", children: /* @__PURE__ */ jsxs6("div", { class: "scribble-border-large inline-block p-6 bg-white", children: [
          /* @__PURE__ */ jsx6("h1", { class: "text-3xl font-bold font-sketch mb-2 transform rotate-1", children: user.role === "student" ? "\u{1F393} Student Dashboard" : "\u{1F451} Mentor Dashboard" }),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-600", children: user.role === "student" ? "Find your perfect mentor and start building your future today." : "Empower the next generation \u2014 check your messages and sessions." })
        ] }) }),
        /* @__PURE__ */ jsx6("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
          { icon: "\u{1F4AC}", val: user.totalConversations || 0, label: "Sessions" },
          { icon: "\u2B50", val: (user.averageRating || 0) + "/5", label: "Avg Rating" },
          { icon: "\u{1F3C6}", val: user.verificationStatus === "verified" ? "Verified" : user.verificationStatus === "approved" ? "Approved" : "Pending", label: "Status" },
          { icon: "\u{1F3AF}", val: "\u221E", label: "Mentors Available" }
        ].map(
          (s) => /* @__PURE__ */ jsxs6("div", { class: "scribble-card p-4 text-center bg-white hover:shadow-md transition-shadow", children: [
            /* @__PURE__ */ jsx6("div", { class: "text-2xl mb-1", children: s.icon }),
            /* @__PURE__ */ jsx6("h3", { class: "text-xl font-bold font-sketch", children: s.val }),
            /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-xs text-gray-500", children: s.label })
          ] })
        ) }),
        /* @__PURE__ */ jsxs6("div", { class: "bg-white scribble-border-large p-6 mb-8", children: [
          /* @__PURE__ */ jsx6("h2", { class: "text-2xl font-bold font-sketch mb-4 text-center", children: "\u{1F680} Quick Start" }),
          /* @__PURE__ */ jsxs6("div", { class: "flex flex-col sm:flex-row gap-3 justify-center", children: [
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('find-mentors')", class: "scribble-button px-6 py-3 font-sketch bg-blue-200 hover:bg-blue-300 transition-colors", children: "\u{1F50D} Browse Mentors" }),
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('messages')", class: "scribble-button px-6 py-3 font-sketch bg-green-200 hover:bg-green-300 transition-colors", children: "\u{1F4AC} My Messages" }),
            /* @__PURE__ */ jsx6("button", { onclick: "switchSection('my-calls')", class: "scribble-button px-6 py-3 font-sketch bg-purple-200 hover:bg-purple-300 transition-colors", children: "\u{1F4F9} View Calls" })
          ] })
        ] }),
        /* @__PURE__ */ jsx6("div", { class: "mb-8 max-w-4xl mx-auto", children: /* @__PURE__ */ jsx6("div", { class: "scribble-border-large overflow-hidden", children: /* @__PURE__ */ jsx6(
          "img",
          {
            src: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=900&q=80",
            alt: "Career mentorship session",
            class: "w-full h-44 object-cover"
          }
        ) }) }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("h2", { class: "text-xl font-bold font-sketch mb-4 text-center", children: "\u{1F4DA} Recent Activity" }),
          /* @__PURE__ */ jsx6("div", { id: "recentActivity", class: "space-y-3", children: /* @__PURE__ */ jsx6("div", { class: "scribble-card p-4 bg-yellow-50", children: /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-sm", children: "Loading activity..." }) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { id: "find-mentors-section", class: "dashboard-section hidden", children: [
        /* @__PURE__ */ jsx6("div", { class: "text-center mb-6", children: /* @__PURE__ */ jsxs6("div", { class: "scribble-border-large inline-block p-4 bg-white", children: [
          /* @__PURE__ */ jsx6("h1", { class: "text-2xl font-bold font-sketch transform -rotate-1", children: "\u{1F916} AI Mentor Matching" }),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-sm mt-1", children: "Ranked by compatibility \xB7 Click any card to view full profile" })
        ] }) }),
        /* @__PURE__ */ jsxs6("div", { class: "bg-white scribble-card p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center", children: [
          /* @__PURE__ */ jsxs6("div", { class: "relative flex-1", children: [
            /* @__PURE__ */ jsx6("span", { class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400", children: "\u{1F50D}" }),
            /* @__PURE__ */ jsx6(
              "input",
              {
                id: "mentorSearch",
                type: "text",
                placeholder: "Search by name, field, or topic...",
                class: "w-full pl-9 pr-4 py-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid",
                oninput: "filterMentors()"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs6("div", { class: "flex gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxs6(
              "select",
              {
                id: "filterVerified",
                onchange: "filterMentors()",
                class: "px-3 py-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none bg-white",
                children: [
                  /* @__PURE__ */ jsx6("option", { value: "", children: "All Mentors" }),
                  /* @__PURE__ */ jsx6("option", { value: "verified", children: "\u2705 Verified Only" }),
                  /* @__PURE__ */ jsx6("option", { value: "approved", children: "\u{1F535} Approved Only" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs6(
              "select",
              {
                id: "filterField",
                onchange: "filterMentors()",
                class: "px-3 py-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none bg-white",
                children: [
                  /* @__PURE__ */ jsx6("option", { value: "", children: "All Fields" }),
                  /* @__PURE__ */ jsx6("option", { value: "technology", children: "Technology" }),
                  /* @__PURE__ */ jsx6("option", { value: "medicine", children: "Medicine" }),
                  /* @__PURE__ */ jsx6("option", { value: "business", children: "Business" }),
                  /* @__PURE__ */ jsx6("option", { value: "law", children: "Law" }),
                  /* @__PURE__ */ jsx6("option", { value: "engineering", children: "Engineering" }),
                  /* @__PURE__ */ jsx6("option", { value: "education", children: "Education" }),
                  /* @__PURE__ */ jsx6("option", { value: "sports", children: "Sports" }),
                  /* @__PURE__ */ jsx6("option", { value: "media", children: "Media" }),
                  /* @__PURE__ */ jsx6("option", { value: "science", children: "Science" })
                ]
              }
            ),
            /* @__PURE__ */ jsx6("button", { onclick: "clearFilters()", class: "scribble-button px-3 py-2 font-sketch text-xs bg-gray-100 hover:bg-gray-200", children: "\u2715 Clear" })
          ] })
        ] }),
        /* @__PURE__ */ jsx6("div", { class: "flex flex-wrap gap-2 mb-6", id: "tagFilters", children: ["STEM", "Business", "Healthcare", "Law", "Sports", "Creative", "Engineering", "Education", "Media"].map(
          (tag) => /* @__PURE__ */ jsx6(
            "button",
            {
              onclick: `filterByTag('${tag}')`,
              class: "tag-pill scribble-button px-3 py-1 font-handwritten text-xs bg-white hover:bg-blue-100 border border-gray-300 rounded-full transition-colors",
              children: tag
            }
          )
        ) }),
        /* @__PURE__ */ jsxs6("div", { id: "matchingLoader", class: "text-center py-16", children: [
          /* @__PURE__ */ jsx6("svg", { class: "animate-spin w-10 h-10 mx-auto mb-3", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx6("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "6", fill: "none", "stroke-dasharray": "60 40" }) }),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500", children: "Calculating your matches..." })
        ] }),
        /* @__PURE__ */ jsx6("div", { id: "noMentorsMsg", class: "hidden text-center py-12", children: /* @__PURE__ */ jsxs6("div", { class: "scribble-card p-8 bg-yellow-50 max-w-md mx-auto", children: [
          /* @__PURE__ */ jsx6("div", { class: "text-5xl mb-3", children: "\u{1F50D}" }),
          /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-lg mb-2", children: "No Mentors Found" }),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-sm", children: "Try clearing your filters or check back soon." })
        ] }) }),
        /* @__PURE__ */ jsx6("div", { id: "primaryMatches", class: "hidden", children: /* @__PURE__ */ jsx6("div", { id: "mentorGrid", class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8" }) }),
        /* @__PURE__ */ jsxs6("div", { id: "seeMoreWrap", class: "hidden text-center mb-4", children: [
          /* @__PURE__ */ jsx6(
            "button",
            {
              onclick: "toggleExtended()",
              id: "seeMoreBtn",
              class: "scribble-button px-6 py-2 font-sketch text-sm bg-gray-100 hover:bg-gray-200",
              children: "\u{1F447} See More Options"
            }
          ),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-xs text-gray-400 mt-1", children: "50\u201369% compatibility mentors" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { id: "extendedMatches", class: "hidden", children: [
          /* @__PURE__ */ jsx6("div", { class: "scribble-card p-3 bg-gray-50 mb-4 text-center", children: /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-xs text-gray-500", children: "These mentors are a partial match and can still offer valuable guidance." }) }),
          /* @__PURE__ */ jsx6("div", { id: "extendedGrid", class: "grid sm:grid-cols-2 lg:grid-cols-3 gap-4" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { id: "messages-section", class: "dashboard-section hidden", children: [
        /* @__PURE__ */ jsx6("div", { class: "text-center mb-6", children: /* @__PURE__ */ jsxs6("div", { class: "scribble-border-large inline-block p-4 bg-white", children: [
          /* @__PURE__ */ jsx6("h1", { class: "text-2xl font-bold font-sketch transform rotate-1", children: "\u{1F4AC} Messages" }),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-sm mt-1", children: "Safe, in-platform messaging \xB7 Schedule sessions after connecting" })
        ] }) }),
        /* @__PURE__ */ jsxs6("div", { class: "bg-amber-50 border-2 border-amber-300 border-dashed rounded p-3 mb-5 text-sm font-handwritten text-amber-800 flex items-start gap-2", children: [
          /* @__PURE__ */ jsx6("span", { class: "text-lg flex-shrink-0", children: "\u26A0\uFE0F" }),
          /* @__PURE__ */ jsx6("span", { children: "Sharing personal contact information outside MentorMatch is at your own risk. MentorMatch is not liable for off-platform interactions. Use the in-platform reporting system if you experience any issues." })
        ] }),
        /* @__PURE__ */ jsxs6("div", { class: "flex gap-4 h-[600px]", children: [
          /* @__PURE__ */ jsxs6("div", { class: "w-72 flex-shrink-0 flex flex-col bg-white scribble-card overflow-hidden", children: [
            /* @__PURE__ */ jsxs6("div", { class: "p-3 border-b border-dashed border-gray-200", children: [
              /* @__PURE__ */ jsx6("p", { class: "font-sketch text-sm font-bold", children: "Conversations" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  id: "inboxSearch",
                  type: "text",
                  placeholder: "Search conversations...",
                  class: "mt-2 w-full px-2 py-1.5 border-2 border-black border-dashed rounded font-handwritten text-xs focus:outline-none focus:border-solid",
                  oninput: "filterInbox()"
                }
              )
            ] }),
            /* @__PURE__ */ jsx6("div", { id: "conversationList", class: "flex-1 overflow-y-auto", children: /* @__PURE__ */ jsx6("div", { class: "p-4 text-center text-gray-400 font-handwritten text-sm", children: "Loading conversations..." }) }),
            /* @__PURE__ */ jsx6("div", { class: "p-3 border-t border-dashed border-gray-200", children: /* @__PURE__ */ jsx6(
              "button",
              {
                onclick: "switchSection('find-mentors')",
                class: "w-full scribble-button py-2 font-sketch text-xs bg-blue-100 hover:bg-blue-200 text-center",
                children: "+ Find a Mentor to Message"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs6("div", { class: "flex-1 flex flex-col bg-white scribble-card overflow-hidden", children: [
            /* @__PURE__ */ jsxs6("div", { id: "chatEmpty", class: "flex-1 flex flex-col items-center justify-center text-center p-8", children: [
              /* @__PURE__ */ jsx6("div", { class: "text-5xl mb-3", children: "\u{1F4AC}" }),
              /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-lg mb-2", children: "Select a Conversation" }),
              /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-sm mb-4", children: "Choose a conversation on the left, or find a mentor to start a new one." }),
              /* @__PURE__ */ jsx6("button", { onclick: "switchSection('find-mentors')", class: "scribble-button px-4 py-2 font-sketch text-sm bg-blue-200 hover:bg-blue-300", children: "\u{1F50D} Find Mentors" })
            ] }),
            /* @__PURE__ */ jsxs6("div", { id: "chatActive", class: "hidden flex-1 flex flex-col h-full", children: [
              /* @__PURE__ */ jsxs6("div", { class: "flex items-center justify-between px-4 py-3 border-b border-dashed border-gray-200 flex-shrink-0", children: [
                /* @__PURE__ */ jsxs6("div", { class: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx6("div", { id: "chatPartnerAvatar", class: "w-9 h-9 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm" }),
                  /* @__PURE__ */ jsxs6("div", { children: [
                    /* @__PURE__ */ jsx6("p", { id: "chatPartnerName", class: "font-sketch text-sm font-bold" }),
                    /* @__PURE__ */ jsx6("p", { id: "chatPartnerRole", class: "font-handwritten text-xs text-gray-500" })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs6("div", { class: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx6("button", { onclick: "scheduleWithPartner()", class: "scribble-button px-3 py-1 font-sketch text-xs bg-green-100 hover:bg-green-200", children: "\u{1F4C5} Schedule" }),
                  /* @__PURE__ */ jsx6("button", { onclick: "openReportUserModal()", class: "scribble-button px-3 py-1 font-sketch text-xs bg-red-100 hover:bg-red-200 text-red-700", children: "\u{1F6A9} Report" })
                ] })
              ] }),
              /* @__PURE__ */ jsx6("div", { id: "chatMessages", class: "flex-1 overflow-y-auto p-4 space-y-3" }),
              /* @__PURE__ */ jsxs6("div", { class: "flex-shrink-0 border-t border-dashed border-gray-200 p-3", children: [
                /* @__PURE__ */ jsxs6("div", { class: "flex gap-2 items-end", children: [
                  /* @__PURE__ */ jsx6(
                    "textarea",
                    {
                      id: "chatInput",
                      rows: 2,
                      placeholder: "Type a message... (Enter to send, Shift+Enter for new line)",
                      class: "flex-1 p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid resize-none",
                      onkeydown: "handleChatKey(event)"
                    }
                  ),
                  /* @__PURE__ */ jsx6("button", { onclick: "sendMessage()", class: "scribble-button px-4 py-2 font-sketch text-sm bg-blue-200 hover:bg-blue-300 flex-shrink-0 self-end", children: "Send \u27A4" })
                ] }),
                /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-xs text-gray-400 mt-1", children: "\u{1F4A1} You can share contact info at your discretion \u2014 this is at your own risk." })
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { id: "my-calls-section", class: "dashboard-section hidden", children: [
        /* @__PURE__ */ jsx6("div", { class: "text-center mb-6", children: /* @__PURE__ */ jsx6("div", { class: "scribble-border inline-block p-4 bg-white", children: /* @__PURE__ */ jsx6("h1", { class: "text-2xl font-bold font-sketch transform rotate-1", children: "\u{1F4F9} My Video Calls" }) }) }),
        /* @__PURE__ */ jsx6("div", { class: "flex justify-center mb-6 space-x-3", children: [["upcoming", "\u{1F550} Upcoming"], ["completed", "\u2705 Completed"], ["cancelled", "\u274C Cancelled"]].map(
          ([t, l]) => /* @__PURE__ */ jsx6("button", { onclick: `showCallTab('${t}')`, class: `call-tab-btn scribble-button px-4 py-2 font-sketch text-sm${t === "upcoming" ? " active bg-blue-200" : ""}`, "data-tab": t, children: l })
        ) }),
        /* @__PURE__ */ jsx6("div", { id: "upcomingCalls", class: "call-tab-content", children: /* @__PURE__ */ jsxs6("div", { class: "scribble-card p-8 bg-blue-50 max-w-md mx-auto text-center", children: [
          /* @__PURE__ */ jsx6(
            "img",
            {
              src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80",
              alt: "Mentoring session",
              class: "w-full h-32 object-cover rounded mb-4"
            }
          ),
          /* @__PURE__ */ jsx6("h3", { class: "text-lg font-bold font-sketch mb-2", children: "No Upcoming Calls" }),
          /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-sm text-gray-600 mb-4", children: "Message a mentor first, then schedule a session together." }),
          /* @__PURE__ */ jsx6("button", { onclick: "switchSection('find-mentors')", class: "scribble-button px-4 py-2 font-sketch text-sm bg-blue-200 hover:bg-blue-300", children: "\u{1F50D} Find a Mentor" })
        ] }) }),
        /* @__PURE__ */ jsx6("div", { id: "completedCalls", class: "call-tab-content hidden", children: /* @__PURE__ */ jsx6("div", { id: "completedCallsList", children: /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-center py-4", children: "Loading..." }) }) }),
        /* @__PURE__ */ jsx6("div", { id: "cancelledCalls", class: "call-tab-content hidden", children: /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-center py-4", children: "No cancelled calls" }) })
      ] }),
      /* @__PURE__ */ jsxs6("div", { id: "profile-section", class: "dashboard-section hidden", children: [
        /* @__PURE__ */ jsx6("div", { class: "text-center mb-6", children: /* @__PURE__ */ jsx6("div", { class: "scribble-border inline-block p-4 bg-white", children: /* @__PURE__ */ jsx6("h1", { class: "text-2xl font-bold font-sketch transform -rotate-1", children: "\u{1F464} My Profile" }) }) }),
        /* @__PURE__ */ jsx6("div", { class: "max-w-xl mx-auto", children: /* @__PURE__ */ jsx6("div", { class: "scribble-card p-6 bg-white", children: /* @__PURE__ */ jsxs6("form", { id: "profileForm", class: "space-y-5", children: [
          /* @__PURE__ */ jsxs6("div", { class: "text-center mb-4", children: [
            /* @__PURE__ */ jsx6("div", { class: "w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3", children: user.name?.charAt(0)?.toUpperCase() || "?" }),
            /* @__PURE__ */ jsx6("h2", { class: "text-xl font-bold font-sketch", children: user.name }),
            /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-gray-500 text-sm", children: user.email })
          ] }),
          /* @__PURE__ */ jsxs6("div", { class: "grid md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Full Name" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  id: "profileName",
                  value: "{user.name}",
                  class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Email" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "email",
                  disabled: true,
                  value: "{user.email}",
                  class: "w-full p-2 border-2 border-gray-300 border-dashed rounded font-handwritten text-sm bg-gray-100"
                }
              )
            ] })
          ] }),
          user.role === "student" ? /* @__PURE__ */ jsxs6("div", { class: "grid md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "School" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  id: "profileUniversity",
                  value: "{user.school || ''}",
                  class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Career Interest" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  id: "profileMajor",
                  value: "{user.careerField || ''}",
                  class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                }
              )
            ] })
          ] }) : /* @__PURE__ */ jsxs6("div", { class: "grid md:grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Company" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  id: "profileCompany",
                  value: "{user.company || ''}",
                  class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs6("div", { children: [
              /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Position" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "text",
                  id: "profilePosition",
                  value: "{user.position || ''}",
                  class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs6("div", { children: [
            /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Bio" }),
            /* @__PURE__ */ jsx6(
              "textarea",
              {
                id: "profileBio",
                rows: 3,
                class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid",
                placeholder: "Tell us about yourself...",
                children: user.bio || ""
              }
            )
          ] }),
          /* @__PURE__ */ jsx6("button", { type: "submit", class: "w-full scribble-button p-3 font-sketch text-sm bg-green-200 hover:bg-green-300", children: "\u{1F4BE} Save Profile" })
        ] }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx6("div", { id: "mentorProfileModal", class: "fixed inset-0 bg-black bg-opacity-60 hidden items-center justify-center z-50 p-4", onclick: "closeMentorProfileIfBackdrop(event)", children: /* @__PURE__ */ jsxs6("div", { class: "bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded border-2 border-black border-dashed shadow-2xl", children: [
      /* @__PURE__ */ jsxs6("div", { id: "mpHeader", class: "relative bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b-2 border-dashed border-gray-200", children: [
        /* @__PURE__ */ jsx6("button", { onclick: "closeMentorProfile()", class: "absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600", children: "\u2715" }),
        /* @__PURE__ */ jsxs6("div", { class: "flex items-start gap-4", children: [
          /* @__PURE__ */ jsx6("div", { id: "mpAvatar", class: "w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0" }),
          /* @__PURE__ */ jsxs6("div", { class: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs6("div", { class: "flex items-center gap-2 flex-wrap mb-1", children: [
              /* @__PURE__ */ jsx6("h2", { id: "mpName", class: "font-sketch text-xl font-bold" }),
              /* @__PURE__ */ jsx6("span", { id: "mpBadge" })
            ] }),
            /* @__PURE__ */ jsx6("p", { id: "mpRole", class: "font-handwritten text-gray-600 text-sm" }),
            /* @__PURE__ */ jsx6("p", { id: "mpExp", class: "font-handwritten text-gray-500 text-xs mt-0.5" }),
            /* @__PURE__ */ jsx6("div", { id: "mpTags", class: "flex flex-wrap gap-1 mt-2" })
          ] }),
          /* @__PURE__ */ jsxs6("div", { class: "text-center flex-shrink-0", children: [
            /* @__PURE__ */ jsx6("div", { id: "mpScore", class: "text-3xl font-sketch font-bold text-blue-600" }),
            /* @__PURE__ */ jsx6("div", { id: "mpTier", class: "text-xs font-handwritten px-2 py-0.5 rounded border" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { class: "p-6 space-y-5", children: [
        /* @__PURE__ */ jsxs6("div", { id: "mpBioSection", class: "hidden", children: [
          /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-sm font-bold mb-1 text-gray-700", children: "About" }),
          /* @__PURE__ */ jsx6("p", { id: "mpBio", class: "font-handwritten text-sm text-gray-600 leading-relaxed" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-sm font-bold mb-2 text-gray-700", children: "Mentorship Topics" }),
          /* @__PURE__ */ jsx6("div", { id: "mpTopics", class: "flex flex-wrap gap-2" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-sm font-bold mb-2 text-gray-700", children: "Compatibility Breakdown" }),
          /* @__PURE__ */ jsx6("div", { id: "mpBreakdown", class: "space-y-2" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { class: "bg-blue-50 border border-blue-200 rounded p-3 text-xs font-handwritten text-blue-800", children: [
          /* @__PURE__ */ jsx6("strong", { children: "\u{1F6E1}\uFE0F Safe Messaging Reminder:" }),
          " All conversations are logged for safety. Sharing personal contact info outside MentorMatch is at your own risk. Use the Report button for any concerns."
        ] }),
        /* @__PURE__ */ jsxs6("div", { class: "flex gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsx6("button", { id: "mpMessageBtn", onclick: "openChatFromProfile()", class: "flex-1 scribble-button py-3 font-sketch text-sm bg-blue-200 hover:bg-blue-300 text-center", children: "\u{1F4AC} Message Mentor" }),
          /* @__PURE__ */ jsx6("button", { onclick: "scheduleFromProfile()", class: "flex-1 scribble-button py-3 font-sketch text-sm bg-green-200 hover:bg-green-300 text-center", children: "\u{1F4C5} Schedule Session" }),
          /* @__PURE__ */ jsx6(
            "a",
            {
              id: "mpLinkedIn",
              href: "#",
              target: "_blank",
              rel: "noopener noreferrer",
              class: "scribble-button px-4 py-3 font-sketch text-sm bg-gray-100 hover:bg-gray-200 text-center hidden",
              children: "LinkedIn \u2197"
            }
          )
        ] }),
        /* @__PURE__ */ jsx6("button", { onclick: "openReportUserModalForMentor()", class: "w-full scribble-button py-2 font-sketch text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200", children: "\u{1F6A9} Report This Mentor" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx6("div", { id: "videoCallModal", class: "fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50", children: /* @__PURE__ */ jsx6("div", { class: "bg-white max-w-sm mx-4 border-2 border-black border-dashed rounded shadow-xl", children: /* @__PURE__ */ jsxs6("div", { class: "p-6 text-center", children: [
      /* @__PURE__ */ jsx6("div", { class: "text-5xl mb-3", children: "\u{1F4F9}" }),
      /* @__PURE__ */ jsx6("h3", { class: "text-xl font-bold font-sketch mb-3", children: "Start Video Call?" }),
      /* @__PURE__ */ jsx6("div", { id: "callPartnerInfo", class: "mb-5" }),
      /* @__PURE__ */ jsxs6("div", { class: "flex gap-3 justify-center", children: [
        /* @__PURE__ */ jsx6("button", { onclick: "startVideoCall()", class: "scribble-button px-5 py-2 font-sketch text-sm bg-green-200 hover:bg-green-300", children: "\u{1F4F9} Start Call" }),
        /* @__PURE__ */ jsx6("button", { onclick: "closeVideoCallModal()", class: "scribble-button px-5 py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300", children: "Cancel" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx6("div", { id: "reportModal", class: "fixed inset-0 bg-black bg-opacity-60 hidden items-center justify-center z-50 p-4", onclick: "closeReportIfBackdrop(event)", children: /* @__PURE__ */ jsx6("div", { class: "bg-white max-w-md w-full border-2 border-black border-dashed rounded shadow-xl", children: /* @__PURE__ */ jsxs6("div", { class: "p-5", children: [
      /* @__PURE__ */ jsxs6("div", { class: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-lg font-bold text-red-700", children: "\u{1F6A9} Report User" }),
        /* @__PURE__ */ jsx6("button", { onclick: "closeReportModal()", class: "w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-sm", children: "\u2715" })
      ] }),
      /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-sm text-gray-600 mb-4", children: "Reports are reviewed promptly. Do not attempt to resolve serious issues on your own \u2014 always report through the platform." }),
      /* @__PURE__ */ jsxs6("div", { class: "space-y-3", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsxs6("label", { class: "block font-sketch text-sm mb-1", children: [
            "Reason ",
            /* @__PURE__ */ jsx6("span", { class: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ jsxs6("select", { id: "reportReason", class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none", children: [
            /* @__PURE__ */ jsx6("option", { value: "", children: "Select a reason..." }),
            /* @__PURE__ */ jsx6("option", { value: "harassment", children: "Harassment or abusive behavior" }),
            /* @__PURE__ */ jsx6("option", { value: "scam", children: "Scam or fraudulent activity" }),
            /* @__PURE__ */ jsx6("option", { value: "inappropriate", children: "Inappropriate content or conduct" }),
            /* @__PURE__ */ jsx6("option", { value: "fake-profile", children: "Fake or misleading profile" }),
            /* @__PURE__ */ jsx6("option", { value: "spam", children: "Spam" }),
            /* @__PURE__ */ jsx6("option", { value: "other", children: "Other" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Description" }),
          /* @__PURE__ */ jsx6(
            "textarea",
            {
              id: "reportDescription",
              rows: 3,
              placeholder: "Describe the issue (include dates, screenshots if possible)...",
              class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ jsx6("div", { id: "reportMessageId", class: "hidden", children: /* @__PURE__ */ jsxs6("p", { class: "font-handwritten text-xs text-gray-500", children: [
          "Reporting a specific message: ",
          /* @__PURE__ */ jsx6("span", { id: "reportMsgIdDisplay", class: "font-bold" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs6("div", { class: "flex gap-3 mt-4", children: [
        /* @__PURE__ */ jsx6("button", { onclick: "submitReport()", class: "flex-1 scribble-button py-2 font-sketch text-sm bg-red-200 hover:bg-red-300 text-red-800", children: "Submit Report" }),
        /* @__PURE__ */ jsx6("button", { onclick: "closeReportModal()", class: "flex-1 scribble-button py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300", children: "Cancel" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx6("div", { id: "scheduleModal", class: "fixed inset-0 bg-black bg-opacity-60 hidden items-center justify-center z-50 p-4", onclick: "closeScheduleIfBackdrop(event)", children: /* @__PURE__ */ jsx6("div", { class: "bg-white max-w-sm w-full border-2 border-black border-dashed rounded shadow-xl", children: /* @__PURE__ */ jsxs6("div", { class: "p-5", children: [
      /* @__PURE__ */ jsxs6("div", { class: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ jsx6("h3", { class: "font-sketch text-lg font-bold", children: "\u{1F4C5} Schedule Session" }),
        /* @__PURE__ */ jsx6("button", { onclick: "closeScheduleModal()", class: "w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-bold", children: "\u2715" })
      ] }),
      /* @__PURE__ */ jsxs6("p", { class: "font-handwritten text-sm text-gray-600 mb-4", children: [
        "Scheduling with: ",
        /* @__PURE__ */ jsx6("strong", { id: "schedulePartnerName" })
      ] }),
      /* @__PURE__ */ jsx6("p", { class: "font-handwritten text-sm text-gray-500 mb-4", children: "Tip: Discuss availability in the chat first, then confirm your session time here." }),
      /* @__PURE__ */ jsxs6("div", { class: "space-y-3", children: [
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Preferred Date" }),
          /* @__PURE__ */ jsx6("input", { type: "date", id: "scheduleDate", class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Preferred Time" }),
          /* @__PURE__ */ jsx6("input", { type: "time", id: "scheduleTime", class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Session Type" }),
          /* @__PURE__ */ jsxs6("select", { id: "scheduleType", class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none", children: [
            /* @__PURE__ */ jsx6("option", { value: "video", children: "\u{1F4F9} Video Call" }),
            /* @__PURE__ */ jsx6("option", { value: "chat", children: "\u{1F4AC} Chat Only" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs6("div", { children: [
          /* @__PURE__ */ jsx6("label", { class: "block font-sketch text-sm mb-1", children: "Note to Mentor" }),
          /* @__PURE__ */ jsx6(
            "textarea",
            {
              id: "scheduleNote",
              rows: 2,
              placeholder: "What do you want to discuss?",
              class: "w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none resize-none"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs6("div", { class: "flex gap-3 mt-4", children: [
        /* @__PURE__ */ jsx6("button", { onclick: "confirmSchedule()", class: "flex-1 scribble-button py-2 font-sketch text-sm bg-green-200 hover:bg-green-300", children: "Confirm" }),
        /* @__PURE__ */ jsx6("button", { onclick: "closeScheduleModal()", class: "flex-1 scribble-button py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300", children: "Cancel" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsx6("script", { dangerouslySetInnerHTML: { __html: `
        // \u2500\u2500\u2500 State \u2500\u2500\u2500
        var currentPartner = null;       // { id, name, company, verificationStatus }
        var activeSection = 'overview';
        var matchData = null;
        var extendedOpen = false;
        var currentChatPartnerId = null;
        var currentChatPartnerName = null;
        var allMatchCards = [];          // flat array for filtering
        var reportTargetId = null;
        var reportMessageId = null;
        var inboxData = [];
        var pollInterval = null;
        var schedulePartnerId = null;
        var schedulePartnerName = null;

        // \u2500\u2500\u2500 Helpers \u2500\u2500\u2500
        function verificationBadge(status) {
          if (status === 'verified')
            return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-green-100 border border-green-400 text-green-800 px-2 py-0.5 rounded-full">\u2705 Fully Verified</span>';
          if (status === 'approved')
            return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-blue-100 border border-blue-400 text-blue-800 px-2 py-0.5 rounded-full">\u{1F535} Profile Approved</span>';
          if (status === 'rejected')
            return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-red-100 border border-red-400 text-red-800 px-2 py-0.5 rounded-full">\u274C Not Available</span>';
          return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-yellow-100 border border-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full">\u23F3 Pending Verification</span>';
        }

        function tierColor(tier) {
          if (tier === 'Elite Match')  return 'bg-yellow-100 border-yellow-400 text-yellow-800';
          if (tier === 'Strong Match') return 'bg-green-100 border-green-400 text-green-800';
          if (tier === 'Good Match')   return 'bg-blue-100 border-blue-400 text-blue-800';
          return 'bg-gray-100 border-gray-400 text-gray-700';
        }

        function scoreBarColor(score) {
          if (score >= 90) return 'bg-yellow-400';
          if (score >= 75) return 'bg-green-400';
          if (score >= 60) return 'bg-blue-400';
          return 'bg-gray-300';
        }

        function initials(name) {
          return (name || '?').split(' ').map(function(w){return w[0]||''}).join('').slice(0,2).toUpperCase();
        }

        function avatarColor(name) {
          var colors = [
            'from-blue-400 to-blue-600','from-green-400 to-teal-600',
            'from-purple-400 to-purple-600','from-orange-400 to-red-500',
            'from-pink-400 to-rose-600','from-indigo-400 to-indigo-600',
          ];
          var idx = (name||'').charCodeAt(0) % colors.length;
          return colors[idx];
        }

        function getTagsForMentor(m) {
          var tags = [];
          if (m.industry) {
            var map = {technology:'STEM',medicine:'Healthcare',engineering:'STEM',science:'STEM',
                       business:'Business',law:'Law',sports:'Sports',media:'Creative',
                       education:'Education',nonprofit:'Nonprofit',government:'Government'};
            var t = map[m.industry.toLowerCase()];
            if (t && !tags.includes(t)) tags.push(t);
          }
          if (m.mentorTopics) {
            m.mentorTopics.split(',').forEach(function(tp) {
              var t2 = tp.trim();
              if (t2.includes('entrepreneur') || t2.includes('leadership')) { if(!tags.includes('Business'))tags.push('Business'); }
              if (t2.includes('resume') || t2.includes('career') || t2.includes('interview')) { if(!tags.includes('Career'))tags.push('Career'); }
              if (t2.includes('college') || t2.includes('school')) { if(!tags.includes('Education'))tags.push('Education'); }
            });
          }
          return tags.slice(0,4);
        }

        function formatTime(ts) {
          if (!ts) return '';
          var d = new Date(ts);
          var now = new Date();
          var diff = now - d;
          if (diff < 60000) return 'just now';
          if (diff < 3600000) return Math.floor(diff/60000) + 'm ago';
          if (diff < 86400000) return Math.floor(diff/3600000) + 'h ago';
          return d.toLocaleDateString();
        }

        // \u2500\u2500\u2500 Build Mentor Card (discovery grid) \u2500\u2500\u2500
        function buildMentorCard(match, compact) {
          var m = match.mentor;
          var b = match.breakdown;
          var tc = tierColor(match.tier);
          var barColor = scoreBarColor(match.score);
          var tags = getTagsForMentor(m);
          var mJson = JSON.stringify(JSON.stringify(match));

          return (
            '<div class="scribble-card bg-white p-4 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow mentor-card"' +
              ' data-name="' + (m.name||'').toLowerCase() + '"' +
              ' data-industry="' + (m.industry||'').toLowerCase() + '"' +
              ' data-topics="' + (m.mentorTopics||'').toLowerCase() + '"' +
              ' data-status="' + (m.verificationStatus||'') + '"' +
              ' data-tags="' + tags.join(',').toLowerCase() + '"' +
              ' onclick="openMentorProfile(' + mJson + ')">' +

              // Avatar + name row
              '<div class="flex items-start gap-3">' +
                '<div class="w-12 h-12 rounded-full bg-gradient-to-br ' + avatarColor(m.name) + ' flex items-center justify-center text-white font-bold flex-shrink-0">' + initials(m.name) + '</div>' +
                '<div class="flex-1 min-w-0">' +
                  '<div class="flex items-center gap-1.5 flex-wrap">' +
                    '<h3 class="font-sketch text-sm font-bold leading-tight">' + (m.name||'') + '</h3>' +
                    verificationBadge(m.verificationStatus) +
                  '</div>' +
                  '<p class="font-handwritten text-xs text-gray-500 truncate">' + (m.position||'') + (m.company ? ' \xB7 '+m.company : '') + '</p>' +
                  '<p class="font-handwritten text-xs text-gray-400">' + (m.industry ? m.industry.charAt(0).toUpperCase()+m.industry.slice(1) : '') + (m.experienceYears ? ' \xB7 '+m.experienceYears+'yrs' : '') + '</p>' +
                '</div>' +
                '<div class="text-right flex-shrink-0">' +
                  '<div class="font-sketch font-bold text-lg text-blue-600">' + match.score + '%</div>' +
                  '<span class="text-xs font-handwritten border px-1.5 py-0.5 rounded ' + tc + '">' + match.tier.split(' ')[0] + '</span>' +
                '</div>' +
              '</div>' +

              // Score bar
              '<div class="w-full bg-gray-100 rounded-full h-1.5">' +
                '<div class="' + barColor + ' h-1.5 rounded-full" style="width:' + match.score + '%"></div>' +
              '</div>' +

              // Tags
              (tags.length ? '<div class="flex flex-wrap gap-1">' + tags.map(function(t){
                return '<span class="text-xs font-handwritten bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">' + t + '</span>';
              }).join('') + '</div>' : '') +

              // Bio snippet
              (m.shortBio ? '<p class="font-handwritten text-xs text-gray-500 line-clamp-2">' + m.shortBio.slice(0,120) + (m.shortBio.length>120?'...':'') + '</p>' : '') +

              // Quick action
              '<button onclick="event.stopPropagation();startMessageFromCard(' + JSON.stringify(JSON.stringify({id:m.id,name:m.name,position:m.position,company:m.company,verificationStatus:m.verificationStatus})) + ')"' +
                ' class="w-full scribble-button py-1.5 font-sketch text-xs bg-blue-100 hover:bg-blue-200 transition-colors">' +
                '\u{1F4AC} Message Mentor' +
              '</button>' +
            '</div>'
          );
        }

        // \u2500\u2500\u2500 Load & Render Matches \u2500\u2500\u2500
        async function loadMatches() {
          var token = localStorage.getItem('auth-token');
          if (!token) return;
          try {
            var res = await fetch('/api/matching/find', { headers: { 'Authorization': 'Bearer ' + token } });
            var data = await res.json();
            matchData = data;
            renderMatches(data);
          } catch (e) {
            console.error('Matching error', e);
            document.getElementById('matchingLoader').classList.add('hidden');
            document.getElementById('noMentorsMsg').classList.remove('hidden');
          }
        }

        function renderMatches(data) {
          document.getElementById('matchingLoader').classList.add('hidden');
          var primary = data.primary || [];
          var extended = data.extended || [];
          var fallback = data.fallback || [];
          allMatchCards = primary.concat(extended).concat(fallback);

          if (primary.length === 0 && extended.length === 0 && fallback.length === 0) {
            document.getElementById('noMentorsMsg').classList.remove('hidden');
            return;
          }

          // Status banner
          if (data.verifiedCount === 0 || !data.hasVerifiedInField) {
            var banner = document.createElement('div');
            banner.className = 'scribble-card p-3 bg-blue-50 mb-5 text-center';
            if (data.verifiedCount === 0) {
              banner.innerHTML = '<p class="font-handwritten text-blue-800 text-sm"><strong>No fully verified mentors yet.</strong> Mentors below are <span class="font-bold">Profile Approved</span> (\u{1F535}) and completing their interview step. They can still provide great guidance!</p>';
            } else {
              banner.innerHTML = '<p class="font-handwritten text-blue-800 text-sm">No fully verified mentors in your field yet \u2014 showing best available. <strong>\u{1F535} Approved</strong> mentors have passed all criteria checks.</p>';
            }
            document.getElementById('primaryMatches').before(banner);
          }

          if (primary.length > 0) {
            document.getElementById('mentorGrid').innerHTML = primary.map(function(m){return buildMentorCard(m,false);}).join('');
          } else {
            document.getElementById('mentorGrid').innerHTML =
              '<div class="col-span-full scribble-card p-6 bg-yellow-50 text-center">' +
                '<p class="font-sketch text-sm mb-1">No high-compatibility matches yet</p>' +
                '<p class="font-handwritten text-xs text-gray-500">Complete your profile to improve scores, or browse options below.</p>' +
              '</div>';
          }
          document.getElementById('primaryMatches').classList.remove('hidden');

          if (extended.length > 0) {
            document.getElementById('extendedGrid').innerHTML = extended.map(function(m){return buildMentorCard(m,false);}).join('');
            document.getElementById('seeMoreWrap').classList.remove('hidden');
          }

          if (fallback.length > 0) {
            var fb = document.createElement('div');
            fb.className = 'mt-6';
            fb.innerHTML =
              '<div class="scribble-card p-3 bg-gray-50 mb-4 text-center">' +
                '<p class="font-sketch text-xs mb-0.5">Mentors from Other Fields</p>' +
                '<p class="font-handwritten text-xs text-gray-500">Different industries \u2014 may still offer valuable guidance.</p>' +
              '</div>' +
              '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' + fallback.map(function(m){return buildMentorCard(m,false);}).join('') + '</div>';
            document.getElementById('extendedMatches').after(fb);
          }
        }

        function toggleExtended() {
          extendedOpen = !extendedOpen;
          var em = document.getElementById('extendedMatches');
          var btn = document.getElementById('seeMoreBtn');
          em.classList.toggle('hidden', !extendedOpen);
          btn.textContent = extendedOpen ? '\u{1F446} Show Fewer Options' : '\u{1F447} See More Options';
        }

        // \u2500\u2500\u2500 Filter / Search \u2500\u2500\u2500
        function filterMentors() {
          var q = (document.getElementById('mentorSearch').value || '').toLowerCase().trim();
          var fv = document.getElementById('filterVerified').value;
          var ff = document.getElementById('filterField').value.toLowerCase();

          var cards = document.querySelectorAll('.mentor-card');
          var visible = 0;
          cards.forEach(function(card) {
            var name = card.dataset.name || '';
            var industry = card.dataset.industry || '';
            var topics = card.dataset.topics || '';
            var status = card.dataset.status || '';
            var tags = card.dataset.tags || '';

            var matchQ = !q || name.includes(q) || industry.includes(q) || topics.includes(q) || tags.includes(q);
            var matchV = !fv || status === fv;
            var matchF = !ff || industry === ff;

            if (matchQ && matchV && matchF) { card.style.display = ''; visible++; }
            else card.style.display = 'none';
          });

          document.getElementById('noMentorsMsg').classList.toggle('hidden', visible > 0);
        }

        function filterByTag(tag) {
          document.getElementById('mentorSearch').value = tag;
          // highlight active pill
          document.querySelectorAll('.tag-pill').forEach(function(p) {
            p.classList.toggle('bg-blue-200', p.textContent.trim() === tag);
            p.classList.toggle('bg-white', p.textContent.trim() !== tag);
          });
          filterMentors();
        }

        function clearFilters() {
          document.getElementById('mentorSearch').value = '';
          document.getElementById('filterVerified').value = '';
          document.getElementById('filterField').value = '';
          document.querySelectorAll('.tag-pill').forEach(function(p) {
            p.classList.remove('bg-blue-200');
            p.classList.add('bg-white');
          });
          filterMentors();
          // show all cards
          document.querySelectorAll('.mentor-card').forEach(function(c){ c.style.display=''; });
          document.getElementById('noMentorsMsg').classList.add('hidden');
        }

        // \u2500\u2500\u2500 Mentor Profile Modal \u2500\u2500\u2500
        var currentModalMatch = null;

        function openMentorProfile(matchJson) {
          var match = JSON.parse(matchJson);
          currentModalMatch = match;
          var m = match.mentor;
          var b = match.breakdown;

          document.getElementById('mpName').textContent = m.name || '';
          document.getElementById('mpBadge').innerHTML = verificationBadge(m.verificationStatus);
          document.getElementById('mpRole').textContent = (m.position || '') + (m.company ? ' \xB7 ' + m.company : '');
          document.getElementById('mpExp').textContent = (m.industry ? m.industry.charAt(0).toUpperCase()+m.industry.slice(1) : '') + (m.experienceYears ? ' \xB7 ' + m.experienceYears + ' years of experience' : '');
          document.getElementById('mpScore').textContent = match.score + '%';

          var tierEl = document.getElementById('mpTier');
          tierEl.textContent = match.tier;
          tierEl.className = 'text-xs font-handwritten px-2 py-0.5 rounded border ' + tierColor(match.tier);

          var av = document.getElementById('mpAvatar');
          av.textContent = initials(m.name);
          av.className = 'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 bg-gradient-to-br ' + avatarColor(m.name);

          // Tags
          var tags = getTagsForMentor(m);
          document.getElementById('mpTags').innerHTML = tags.map(function(t){
            return '<span class="text-xs font-handwritten bg-white border border-gray-300 px-2 py-0.5 rounded-full">' + t + '</span>';
          }).join('');

          // Bio
          if (m.shortBio) {
            document.getElementById('mpBio').textContent = m.shortBio;
            document.getElementById('mpBioSection').classList.remove('hidden');
          } else {
            document.getElementById('mpBioSection').classList.add('hidden');
          }

          // Topics
          var topicList = m.mentorTopics ? m.mentorTopics.split(',').map(function(t){return t.trim();}).filter(Boolean) : [];
          document.getElementById('mpTopics').innerHTML = topicList.length
            ? topicList.map(function(t){
                return '<span class="text-xs font-handwritten bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 rounded-full">\u{1F4CC} ' + t + '</span>';
              }).join('')
            : '<span class="text-xs font-handwritten text-gray-400">No topics listed</span>';

          // Breakdown bars
          var breakdown = [
            {label:'Career Field', val:b.careerField, max:30},
            {label:'Role Alignment', val:b.roleAlignment, max:20},
            {label:'Needs Match', val:b.needsMatch, max:15},
            {label:'Experience', val:b.experience, max:10},
            {label:'Personality', val:b.personality, max:10},
            {label:'Availability', val:b.availability, max:10},
            {label:'Commitment', val:b.commitment, max:5},
          ];
          document.getElementById('mpBreakdown').innerHTML = breakdown.map(function(item){
            var pct = Math.round((item.val / item.max) * 100);
            return '<div class="flex items-center gap-2">' +
              '<span class="font-handwritten text-xs text-gray-500 w-28 flex-shrink-0">' + item.label + '</span>' +
              '<div class="flex-1 bg-gray-100 rounded-full h-2">' +
                '<div class="bg-blue-400 h-2 rounded-full" style="width:' + pct + '%"></div>' +
              '</div>' +
              '<span class="font-handwritten text-xs text-gray-600 w-12 text-right flex-shrink-0">' + item.val + ' / ' + item.max + '</span>' +
            '</div>';
          }).join('');

          // LinkedIn
          var liLink = document.getElementById('mpLinkedIn');
          if (m.linkedinUrl) {
            liLink.href = m.linkedinUrl;
            liLink.classList.remove('hidden');
          } else {
            liLink.classList.add('hidden');
          }

          document.getElementById('mentorProfileModal').classList.remove('hidden');
          document.getElementById('mentorProfileModal').classList.add('flex');
        }

        function closeMentorProfile() {
          document.getElementById('mentorProfileModal').classList.add('hidden');
          document.getElementById('mentorProfileModal').classList.remove('flex');
          currentModalMatch = null;
        }

        function closeMentorProfileIfBackdrop(e) {
          if (e.target === document.getElementById('mentorProfileModal')) closeMentorProfile();
        }

        function openChatFromProfile() {
          if (!currentModalMatch) return;
          var m = currentModalMatch.mentor;
          closeMentorProfile();
          startChat(m.id, m.name, m.position, m.company, m.verificationStatus);
          switchSection('messages');
        }

        function scheduleFromProfile() {
          if (!currentModalMatch) return;
          var m = currentModalMatch.mentor;
          closeMentorProfile();
          openScheduleModal(m.id, m.name);
        }

        function openReportUserModalForMentor() {
          if (!currentModalMatch) return;
          reportTargetId = currentModalMatch.mentor.id;
          reportMessageId = null;
          closeMentorProfile();
          document.getElementById('reportModal').classList.remove('hidden');
          document.getElementById('reportModal').classList.add('flex');
          document.getElementById('reportMessageId').classList.add('hidden');
        }

        // \u2500\u2500\u2500 Messaging \u2500\u2500\u2500
        async function loadInbox() {
          var token = localStorage.getItem('auth-token');
          if (!token) return;
          try {
            var res = await fetch('/api/messages/inbox/list', { headers: { 'Authorization': 'Bearer ' + token } });
            var data = await res.json();
            inboxData = data.conversations || [];
            renderInbox(inboxData);

            // Badge
            var totalUnread = inboxData.reduce(function(sum, c) { return sum + (parseInt(c.unread_count)||0); }, 0);
            var badge = document.getElementById('inboxBadge');
            if (totalUnread > 0) {
              badge.textContent = totalUnread > 9 ? '9+' : totalUnread;
              badge.classList.remove('hidden');
            } else {
              badge.classList.add('hidden');
            }
          } catch(e) { console.error('Inbox error', e); }
        }

        function renderInbox(conversations) {
          var el = document.getElementById('conversationList');
          if (!conversations.length) {
            el.innerHTML = '<div class="p-4 text-center text-gray-400 font-handwritten text-sm">No conversations yet.<br/>Find a mentor to start one!</div>';
            return;
          }

          var q = (document.getElementById('inboxSearch').value || '').toLowerCase();
          var filtered = conversations.filter(function(c) {
            return !q || (c.partner_name||'').toLowerCase().includes(q) || (c.last_message||'').toLowerCase().includes(q);
          });

          el.innerHTML = filtered.map(function(c) {
            var isActive = c.partner_id === currentChatPartnerId;
            var unread = parseInt(c.unread_count) || 0;
            return '<div class="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50 border-b border-dashed border-gray-100 transition-colors ' + (isActive ? 'bg-blue-50' : '') + '"' +
              ' onclick="startChat(' + JSON.stringify(c.partner_id) + ',' + JSON.stringify(c.partner_name) + ',' + JSON.stringify(c.position||'') + ',' + JSON.stringify(c.company||'') + ',' + JSON.stringify(c.verification_status||'') + ')">' +
              '<div class="w-8 h-8 rounded-full bg-gradient-to-br ' + avatarColor(c.partner_name) + ' flex items-center justify-center text-white text-xs font-bold flex-shrink-0">' + initials(c.partner_name) + '</div>' +
              '<div class="flex-1 min-w-0">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="font-sketch text-xs font-bold truncate">' + (c.partner_name||'') + '</span>' +
                  '<span class="font-handwritten text-xs text-gray-400 flex-shrink-0 ml-1">' + formatTime(c.last_message_at) + '</span>' +
                '</div>' +
                '<p class="font-handwritten text-xs text-gray-500 truncate">' + (c.last_message||'').slice(0,40) + '</p>' +
              '</div>' +
              (unread > 0 ? '<span class="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">' + unread + '</span>' : '') +
            '</div>';
          }).join('');
        }

        function filterInbox() {
          renderInbox(inboxData);
        }

        async function startChat(partnerId, partnerName, position, company, verificationStatus) {
          currentChatPartnerId = partnerId;
          currentChatPartnerName = partnerName;

          // Update header
          document.getElementById('chatPartnerAvatar').textContent = initials(partnerName);
          document.getElementById('chatPartnerAvatar').className = 'w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ' + avatarColor(partnerName);
          document.getElementById('chatPartnerName').textContent = partnerName;
          document.getElementById('chatPartnerRole').innerHTML = verificationBadge(verificationStatus) + ' ' + (position ? '<span class="font-handwritten">' + position + (company ? ' \xB7 '+company : '') + '</span>' : '');

          // Show active chat
          document.getElementById('chatEmpty').classList.add('hidden');
          document.getElementById('chatActive').classList.remove('hidden');
          document.getElementById('chatActive').classList.add('flex');
          document.getElementById('chatActive').classList.add('flex-col');

          // Re-render inbox to highlight active
          renderInbox(inboxData);

          await fetchMessages();

          // Poll for new messages every 5s while in messages section
          if (pollInterval) clearInterval(pollInterval);
          pollInterval = setInterval(function() {
            if (activeSection === 'messages' && currentChatPartnerId) fetchMessages(true);
          }, 5000);

          reportTargetId = partnerId;
        }

        async function fetchMessages(silent) {
          if (!currentChatPartnerId) return;
          var token = localStorage.getItem('auth-token');
          if (!token) return;
          try {
            var res = await fetch('/api/messages/' + currentChatPartnerId, {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            var data = await res.json();
            renderMessages(data.messages || [], silent);
            loadInbox(); // refresh unread counts
          } catch(e) { console.error('Fetch messages error', e); }
        }

        function renderMessages(messages, silent) {
          var me = JSON.parse(localStorage.getItem('user') || '{}');
          var container = document.getElementById('chatMessages');
          var wasAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 80;

          container.innerHTML = messages.map(function(msg) {
            var isMe = msg.sender_id === me.id;
            var time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '';
            return '<div class="flex ' + (isMe ? 'justify-end' : 'justify-start') + ' group">' +
              '<div class="max-w-xs sm:max-w-sm">' +
                '<div class="' + (isMe ? 'bg-blue-200 rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl' : 'bg-gray-100 rounded-tr-2xl rounded-tl-sm rounded-br-2xl rounded-bl-2xl') + ' px-3 py-2 relative">' +
                  '<p class="font-handwritten text-sm break-words">' + escapeHtml(msg.content) + '</p>' +
                  (!isMe ? '<button onclick="reportMessage(' + JSON.stringify(msg.id) + ',' + JSON.stringify(msg.sender_id) + ')" class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 w-5 h-5 bg-red-100 border border-red-300 text-red-600 rounded-full text-xs flex items-center justify-center transition-opacity" title="Report message">\u{1F6A9}</button>' : '') +
                '</div>' +
                '<p class="font-handwritten text-xs text-gray-400 mt-0.5 ' + (isMe ? 'text-right' : '') + '">' + time + (msg.is_read && isMe ? ' \xB7 Read' : '') + '</p>' +
              '</div>' +
            '</div>';
          }).join('');

          if (!silent || wasAtBottom) {
            container.scrollTop = container.scrollHeight;
          }
        }

        function escapeHtml(str) {
          return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }

        async function sendMessage() {
          var input = document.getElementById('chatInput');
          var content = input.value.trim();
          if (!content || !currentChatPartnerId) return;

          var token = localStorage.getItem('auth-token');
          input.value = '';
          input.disabled = true;

          try {
            var res = await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ recipientId: currentChatPartnerId, content: content })
            });
            var data = await res.json();
            if (data.success) {
              await fetchMessages();
            } else {
              input.value = content;
              showToast('Failed to send message. Try again.', 'error');
            }
          } catch(e) {
            input.value = content;
            showToast('Failed to send. Check your connection.', 'error');
          } finally {
            input.disabled = false;
            input.focus();
          }
        }

        function handleChatKey(e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }

        function startMessageFromCard(partnerJson) {
          var p = JSON.parse(partnerJson);
          startChat(p.id, p.name, p.position, p.company, p.verificationStatus);
          switchSection('messages');
        }

        // \u2500\u2500\u2500 Report \u2500\u2500\u2500
        function reportMessage(messageId, senderId) {
          reportTargetId = senderId;
          reportMessageId = messageId;
          document.getElementById('reportModal').classList.remove('hidden');
          document.getElementById('reportModal').classList.add('flex');
          document.getElementById('reportMessageId').classList.remove('hidden');
          document.getElementById('reportMsgIdDisplay').textContent = messageId.slice(0,8) + '...';
        }

        function openReportUserModal() {
          reportMessageId = null;
          document.getElementById('reportModal').classList.remove('hidden');
          document.getElementById('reportModal').classList.add('flex');
          document.getElementById('reportMessageId').classList.add('hidden');
        }

        function closeReportModal() {
          document.getElementById('reportModal').classList.add('hidden');
          document.getElementById('reportModal').classList.remove('flex');
          document.getElementById('reportReason').value = '';
          document.getElementById('reportDescription').value = '';
        }

        function closeReportIfBackdrop(e) {
          if (e.target === document.getElementById('reportModal')) closeReportModal();
        }

        async function submitReport() {
          var reason = document.getElementById('reportReason').value;
          var description = document.getElementById('reportDescription').value.trim();

          if (!reason) { showToast('Please select a reason.', 'error'); return; }
          if (!reportTargetId) { showToast('No user to report.', 'error'); return; }

          var token = localStorage.getItem('auth-token');
          try {
            var res = await fetch('/api/messages/report', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ reportedUserId: reportTargetId, messageId: reportMessageId, reason: reason, description: description })
            });
            var data = await res.json();
            if (data.success) {
              closeReportModal();
              showToast('\u2705 Report submitted. It will be reviewed promptly.', 'success');
            } else {
              showToast('Failed to submit report. Try again.', 'error');
            }
          } catch(e) {
            showToast('Failed to submit report.', 'error');
          }
        }

        // \u2500\u2500\u2500 Schedule \u2500\u2500\u2500
        function openScheduleModal(partnerId, partnerName) {
          schedulePartnerId = partnerId;
          schedulePartnerName = partnerName;
          document.getElementById('schedulePartnerName').textContent = partnerName;
          document.getElementById('scheduleModal').classList.remove('hidden');
          document.getElementById('scheduleModal').classList.add('flex');
        }

        function closeScheduleModal() {
          document.getElementById('scheduleModal').classList.add('hidden');
          document.getElementById('scheduleModal').classList.remove('flex');
        }

        function closeScheduleIfBackdrop(e) {
          if (e.target === document.getElementById('scheduleModal')) closeScheduleModal();
        }

        function scheduleWithPartner() {
          if (!currentChatPartnerId) return;
          openScheduleModal(currentChatPartnerId, currentChatPartnerName);
        }

        function scheduleWithPartnerFromCall(partnerJson) {
          var p = JSON.parse(partnerJson);
          openScheduleModal(p.id, p.name);
        }

        async function confirmSchedule() {
          var date = document.getElementById('scheduleDate').value;
          var time = document.getElementById('scheduleTime').value;
          var type = document.getElementById('scheduleType').value;
          var note = document.getElementById('scheduleNote').value.trim();

          if (!date || !time) { showToast('Please select a date and time.', 'error'); return; }

          // Send a scheduling message to the partner
          if (schedulePartnerId) {
            var token = localStorage.getItem('auth-token');
            var msgContent = '\u{1F4C5} Session Request: ' + new Date(date + 'T' + time).toLocaleString() +
              ' \xB7 ' + (type === 'video' ? '\u{1F4F9} Video Call' : '\u{1F4AC} Chat') +
              (note ? ' \xB7 Note: ' + note : '');
            await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ recipientId: schedulePartnerId, content: msgContent })
            });
            // If we're already in a chat with this partner, refresh
            if (currentChatPartnerId === schedulePartnerId) fetchMessages();
          }

          closeScheduleModal();
          showToast('\u{1F4C5} Session request sent! Your mentor will confirm availability.', 'success');
        }

        // \u2500\u2500\u2500 Video Call Modal \u2500\u2500\u2500
        function openVideoCallModal(partnerJson) {
          var p = JSON.parse(partnerJson);
          currentPartner = p;
          document.getElementById('callPartnerInfo').innerHTML =
            '<div class="w-12 h-12 rounded-full bg-gradient-to-br ' + avatarColor(p.name) + ' flex items-center justify-center text-white font-bold mx-auto mb-2">' + initials(p.name) + '</div>' +
            '<h4 class="font-sketch text-base font-bold">' + (p.name||'') + '</h4>' +
            '<p class="font-handwritten text-sm text-gray-500">' + (p.company||'') + '</p>' +
            '<p class="font-handwritten text-sm mt-2 text-gray-600">Ready to start your mentoring session?</p>';
          document.getElementById('videoCallModal').classList.remove('hidden');
          document.getElementById('videoCallModal').classList.add('flex');
        }

        function startVideoCall() {
          if (currentPartner) {
            var roomId = 'room_' + Date.now() + '_' + Math.random().toString(36).substr(2,9);
            closeVideoCallModal();
            window.location.href = '/video-call/' + roomId + '?partner=' + encodeURIComponent(currentPartner.name);
          }
        }

        function closeVideoCallModal() {
          document.getElementById('videoCallModal').classList.add('hidden');
          document.getElementById('videoCallModal').classList.remove('flex');
          currentPartner = null;
        }

        // \u2500\u2500\u2500 Section switching \u2500\u2500\u2500
        function switchSection(sectionName) {
          document.querySelectorAll('.dashboard-section').forEach(function(s){ s.classList.add('hidden'); });
          var section = document.getElementById(sectionName + '-section');
          if (section) section.classList.remove('hidden');

          document.querySelectorAll('.nav-btn').forEach(function(b){ b.classList.remove('active','bg-blue-100','font-bold'); });
          document.querySelectorAll('[data-section="' + sectionName + '"]').forEach(function(b){ b.classList.add('active','bg-blue-100','font-bold'); });

          activeSection = sectionName;

          if (sectionName === 'find-mentors' && !matchData) loadMatches();
          if (sectionName === 'messages') { loadInbox(); }
          if (sectionName !== 'messages' && pollInterval) { clearInterval(pollInterval); pollInterval = null; }
        }

        // \u2500\u2500\u2500 Toast \u2500\u2500\u2500
        function showToast(msg, type) {
          var t = document.createElement('div');
          t.className = 'fixed bottom-6 right-4 z-50 scribble-card px-4 py-3 font-handwritten text-sm shadow-lg ' +
            (type === 'error' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-green-50 border-green-300 text-green-800');
          t.textContent = msg;
          document.body.appendChild(t);
          setTimeout(function(){ if(t.parentNode) document.body.removeChild(t); }, 4000);
        }

        // \u2500\u2500\u2500 Profile form \u2500\u2500\u2500
        document.addEventListener('DOMContentLoaded', function() {
          loadRecentActivity();
          loadCompletedCalls();

          var profileForm = document.getElementById('profileForm');
          if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
              e.preventDefault();
              showToast('\u2705 Profile updated!', 'success');
            });
          }
        });

        function loadRecentActivity() {
          setTimeout(function() {
            var activities = [
              '\u{1F3AF} Profile viewed by mentors this week',
              '\u{1F4C8} Profile completion: keep adding details to improve matches',
              '\u{1F525} MentorMatch is growing \u2014 new mentors added regularly'
            ];
            document.getElementById('recentActivity').innerHTML = activities.map(function(a) {
              return '<div class="scribble-card p-3 bg-white"><p class="font-handwritten text-sm">' + a + '</p></div>';
            }).join('');
          }, 800);
        }

        function loadCompletedCalls() {
          setTimeout(function() {
            var calls = [
              { partner:'Sarah Chen', company:'TechVision Inc', date:'2025-09-20', duration:'45 min', rating:5, notes:'Amazing insights about AI!' },
              { partner:'Marcus Johnson', company:'FinanceForward', date:'2025-09-18', duration:'30 min', rating:5, notes:'Great finance career advice.' }
            ];
            document.getElementById('completedCallsList').innerHTML = calls.map(function(c) {
              return '<div class="scribble-card p-4 mb-3 bg-white">' +
                '<div class="flex justify-between items-start">' +
                  '<div>' +
                    '<h4 class="font-sketch font-bold text-sm">' + c.partner + '</h4>' +
                    '<p class="font-handwritten text-xs text-gray-500">' + c.company + ' \xB7 ' + c.date + ' \xB7 ' + c.duration + '</p>' +
                    '<p class="font-handwritten text-sm mt-1">' + c.notes + '</p>' +
                  '</div>' +
                  '<div class="text-yellow-500 text-sm">\u2B50'.repeat(c.rating) + '</div>' +
                '</div>' +
              '</div>';
            }).join('');
          }, 1200);
        }

        function showCallTab(tabName) {
          document.querySelectorAll('.call-tab-content').forEach(function(c){ c.classList.add('hidden'); });
          document.getElementById(tabName + 'Calls').classList.remove('hidden');
          document.querySelectorAll('.call-tab-btn').forEach(function(b){ b.classList.remove('active','bg-blue-200'); });
          var tabBtn = document.querySelector('[data-tab="' + tabName + '"]');
          if (tabBtn) tabBtn.classList.add('active','bg-blue-200');
        }

        function toggleDropdown() {
          document.getElementById('userDropdown').classList.toggle('hidden');
        }

        document.addEventListener('click', function(e) {
          var dropdown = document.getElementById('userDropdown');
          if (dropdown && !e.target.closest('.relative')) dropdown.classList.add('hidden');
        });

        async function logout() {
          var token = localStorage.getItem('auth-token');
          if (token) {
            try { await fetch('/api/auth/logout', { method:'POST', headers:{ 'Authorization':'Bearer '+token } }); } catch(e) {}
          }
          localStorage.removeItem('auth-token');
          localStorage.removeItem('user');
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          window.location.href = '/login';
        }
      ` } })
  ] });
}

// src/pages/video-call.tsx
import { jsx as jsx7, jsxs as jsxs7 } from "hono/jsx/jsx-runtime";
function VideoCallPage({ user, roomId }) {
  return /* @__PURE__ */ jsxs7("div", { class: "min-h-screen bg-gray-900 text-white relative", children: [
    /* @__PURE__ */ jsx7("header", { class: "bg-black p-4 border-b-2 border-white", children: /* @__PURE__ */ jsxs7("div", { class: "flex justify-between items-center max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsx7("div", { class: "scribble-border-white p-2", children: /* @__PURE__ */ jsx7("h1", { class: "text-xl font-sketch", children: "MentorMatch" }) }),
      /* @__PURE__ */ jsxs7("div", { class: "flex space-x-4", children: [
        /* @__PURE__ */ jsx7(
          "button",
          {
            onclick: "nextConversation()",
            class: "scribble-button-white px-4 py-2 font-sketch hover:bg-white hover:text-black transition-colors",
            children: "Next \u2192"
          }
        ),
        /* @__PURE__ */ jsx7(
          "button",
          {
            onclick: "endCall()",
            class: "scribble-button-white px-4 py-2 font-sketch bg-red-600 hover:bg-red-500",
            children: "End Call"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs7("div", { class: "flex h-screen pt-16", children: [
      /* @__PURE__ */ jsxs7("div", { class: "flex-1 p-4", children: [
        /* @__PURE__ */ jsxs7("div", { class: "grid grid-cols-1 md:grid-cols-2 gap-4 h-full", children: [
          /* @__PURE__ */ jsx7("div", { class: "relative", children: /* @__PURE__ */ jsxs7("div", { class: "scribble-border-white h-full bg-gray-800 rounded-lg overflow-hidden relative", children: [
            /* @__PURE__ */ jsx7("video", { id: "partnerVideo", class: "w-full h-full object-cover", autoplay: true, playsinline: true }),
            /* @__PURE__ */ jsx7("div", { class: "absolute top-4 left-4 scribble-border-white p-2 bg-black bg-opacity-75", children: /* @__PURE__ */ jsx7("span", { id: "partnerRole", class: "font-sketch text-sm", children: "CEO" }) }),
            /* @__PURE__ */ jsx7("div", { id: "mockPartnerVideo", class: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900", children: /* @__PURE__ */ jsxs7("div", { class: "text-center", children: [
              /* @__PURE__ */ jsx7("div", { class: "text-6xl mb-4", children: "\u{1F464}" }),
              /* @__PURE__ */ jsx7("p", { class: "font-sketch text-xl", children: "Connecting..." })
            ] }) })
          ] }) }),
          /* @__PURE__ */ jsx7("div", { class: "relative", children: /* @__PURE__ */ jsxs7("div", { class: "scribble-border-white h-full bg-gray-800 rounded-lg overflow-hidden relative", children: [
            /* @__PURE__ */ jsx7("video", { id: "localVideo", class: "w-full h-full object-cover", autoplay: true, muted: true, playsinline: true }),
            /* @__PURE__ */ jsx7("div", { class: "absolute top-4 left-4 scribble-border-white p-2 bg-black bg-opacity-75", children: /* @__PURE__ */ jsx7("span", { id: "userRole", class: "font-sketch text-sm", children: "Student" }) }),
            /* @__PURE__ */ jsx7("div", { id: "mockLocalVideo", class: "absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900", children: /* @__PURE__ */ jsxs7("div", { class: "text-center", children: [
              /* @__PURE__ */ jsx7("div", { class: "text-6xl mb-4", children: "\u{1F393}" }),
              /* @__PURE__ */ jsx7("p", { class: "font-sketch text-xl", children: "You" })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxs7("div", { class: "flex justify-center mt-4 space-x-4", children: [
          /* @__PURE__ */ jsx7(
            "button",
            {
              onclick: "toggleMute()",
              class: "scribble-button-white p-3 rounded-full hover:bg-gray-700 transition-colors",
              children: /* @__PURE__ */ jsx7("span", { id: "muteIcon", children: "\u{1F3A4}" })
            }
          ),
          /* @__PURE__ */ jsx7(
            "button",
            {
              onclick: "toggleVideo()",
              class: "scribble-button-white p-3 rounded-full hover:bg-gray-700 transition-colors",
              children: /* @__PURE__ */ jsx7("span", { id: "videoIcon", children: "\u{1F4F9}" })
            }
          ),
          /* @__PURE__ */ jsx7(
            "button",
            {
              onclick: "shareScreen()",
              class: "scribble-button-white p-3 rounded-full hover:bg-gray-700 transition-colors",
              children: /* @__PURE__ */ jsx7("span", { children: "\u{1F4FA}" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs7("div", { class: "w-80 bg-black border-l-2 border-white p-4 flex flex-col", children: [
        /* @__PURE__ */ jsx7("div", { class: "scribble-border-white p-3 mb-4", children: /* @__PURE__ */ jsx7("h3", { class: "font-sketch text-lg text-center", children: "Chat" }) }),
        /* @__PURE__ */ jsx7("div", { id: "chatMessages", class: "flex-1 overflow-y-auto mb-4 space-y-3", children: /* @__PURE__ */ jsxs7("div", { class: "bg-gray-800 p-3 rounded border border-gray-600", children: [
          /* @__PURE__ */ jsx7("span", { class: "font-sketch text-sm text-gray-300", children: "System:" }),
          /* @__PURE__ */ jsx7("p", { class: "font-handwritten text-sm mt-1", children: "You're now connected! Say hello \u{1F44B}" })
        ] }) }),
        /* @__PURE__ */ jsxs7("div", { class: "flex space-x-2", children: [
          /* @__PURE__ */ jsx7(
            "input",
            {
              type: "text",
              id: "chatInput",
              placeholder: "Type a message...",
              class: "flex-1 p-2 bg-gray-800 border border-gray-600 rounded font-handwritten text-sm focus:outline-none focus:border-white",
              onkeypress: "handleChatEnter(event)"
            }
          ),
          /* @__PURE__ */ jsx7(
            "button",
            {
              onclick: "sendMessage()",
              class: "scribble-button-white px-4 py-2 font-sketch text-sm hover:bg-gray-700 transition-colors",
              children: "Send"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs7("div", { class: "mt-4 scribble-border-white p-3", children: [
          /* @__PURE__ */ jsx7("h4", { class: "font-sketch text-sm mb-2", children: "Connection Info" }),
          /* @__PURE__ */ jsxs7("div", { class: "text-xs font-handwritten space-y-1 text-gray-300", children: [
            /* @__PURE__ */ jsxs7("p", { children: [
              "Status: ",
              /* @__PURE__ */ jsx7("span", { class: "text-green-400", children: "Connected" })
            ] }),
            /* @__PURE__ */ jsxs7("p", { children: [
              "Duration: ",
              /* @__PURE__ */ jsx7("span", { id: "callDuration", children: "00:00" })
            ] }),
            /* @__PURE__ */ jsxs7("p", { children: [
              "Quality: ",
              /* @__PURE__ */ jsx7("span", { class: "text-green-400", children: "Good" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx7("script", { src: "/static/webrtc.js" }),
    /* @__PURE__ */ jsx7("script", { dangerouslySetInnerHTML: {
      __html: `
        // Initialize real WebRTC when page loads
        document.addEventListener('DOMContentLoaded', function() {
          // Get user and room info from props
          const user = ${JSON.stringify(user)};
          const roomId = '${roomId}';
          
          // Check authentication
          const token = localStorage.getItem('auth-token');
          if (!token) {
            window.location.href = '/login';
            return;
          }
          
          // Initialize real WebRTC
          initializeWebRTC(roomId, user);
          
          console.log('\u{1F3A5} Video call initialized for:', user.name, 'in room:', roomId);
        });
        
        // Auth check function
        async function checkAuth() {
          const token = localStorage.getItem('auth-token');
          if (!token) {
            window.location.href = '/login';
            return false;
          }
          
          try {
            const response = await fetch('/api/auth/me', {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            
            if (!response.ok) {
              localStorage.removeItem('auth-token');
              localStorage.removeItem('user');
              window.location.href = '/login';
              return false;
            }
            
            return true;
          } catch (error) {
            console.error('Auth check failed:', error);
            return false;
          }
        }
        
        // Call auth check
        checkAuth();
        `
    } })
  ] });
}

// src/pages/donation.tsx
import { jsx as jsx8, jsxs as jsxs8 } from "hono/jsx/jsx-runtime";
function DonationPage() {
  return /* @__PURE__ */ jsxs8("div", { class: "min-h-screen bg-white relative overflow-hidden", children: [
    /* @__PURE__ */ jsxs8("div", { class: "absolute inset-0 pointer-events-none", children: [
      /* @__PURE__ */ jsx8("svg", { class: "absolute top-10 right-10 w-32 h-32 opacity-10", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx8("path", { d: "M50,10 L90,90 L10,90 Z", stroke: "black", "stroke-width": "2", fill: "none", class: "animate-pulse" }) }),
      /* @__PURE__ */ jsx8("svg", { class: "absolute bottom-20 left-10 w-40 h-20 opacity-10", viewBox: "0 0 100 50", children: /* @__PURE__ */ jsx8("path", { d: "M10,25 Q30,5 50,25 Q70,45 90,25", stroke: "black", "stroke-width": "2", fill: "none", class: "animate-bounce-slow" }) }),
      /* @__PURE__ */ jsx8("svg", { class: "absolute top-1/2 left-1/4 w-24 h-24 opacity-10", viewBox: "0 0 100 100", children: /* @__PURE__ */ jsx8("circle", { cx: "50", cy: "50", r: "40", stroke: "black", "stroke-width": "2", fill: "none", "stroke-dasharray": "10 5" }) })
    ] }),
    /* @__PURE__ */ jsxs8("div", { class: "relative z-10 container mx-auto px-4 py-8", children: [
      /* @__PURE__ */ jsxs8("div", { class: "text-center mb-12", children: [
        /* @__PURE__ */ jsx8("div", { class: "scribble-border inline-block p-4 mb-6", children: /* @__PURE__ */ jsx8("h1", { class: "text-3xl font-bold font-sketch", children: "MentorMatch" }) }),
        /* @__PURE__ */ jsxs8("div", { class: "scribble-border-large inline-block p-6", children: [
          /* @__PURE__ */ jsx8("h2", { class: "text-4xl md:text-5xl font-bold font-sketch mb-4 transform -rotate-1", children: "Thanks for connecting! \u{1F4AB}" }),
          /* @__PURE__ */ jsx8("p", { class: "text-xl font-handwritten max-w-2xl mx-auto", children: "Help me keep these meaningful conversations flowing" })
        ] })
      ] }),
      /* @__PURE__ */ jsx8("div", { class: "text-center mb-12", children: /* @__PURE__ */ jsxs8("div", { class: "scribble-border inline-block p-6 max-w-xl bg-gray-50", children: [
        /* @__PURE__ */ jsx8("h3", { class: "text-2xl font-bold font-sketch mb-4 transform rotate-1", children: "Your Conversation" }),
        /* @__PURE__ */ jsxs8("div", { class: "space-y-2 font-handwritten text-lg", children: [
          /* @__PURE__ */ jsxs8("p", { children: [
            "Duration: ",
            /* @__PURE__ */ jsx8("span", { id: "callDuration", class: "font-bold", children: "5 minutes" })
          ] }),
          /* @__PURE__ */ jsxs8("p", { children: [
            "Connected with: ",
            /* @__PURE__ */ jsx8("span", { id: "partnerType", class: "font-bold", children: "A successful CEO" })
          ] }),
          /* @__PURE__ */ jsx8("p", { children: "Rating: \u2B50\u2B50\u2B50\u2B50\u2B50" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx8("div", { class: "text-center mb-12", children: /* @__PURE__ */ jsxs8("div", { class: "scribble-border-large inline-block p-8 max-w-2xl", children: [
        /* @__PURE__ */ jsx8("h3", { class: "text-3xl font-bold font-sketch mb-6 transform -rotate-1", children: "Support My Mission \u{1F680}" }),
        /* @__PURE__ */ jsx8("p", { class: "text-lg font-handwritten mb-8 leading-relaxed", children: "Every donation helps me connect more students with inspiring leaders. Your support makes these life-changing conversations possible!" }),
        /* @__PURE__ */ jsxs8("div", { class: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8", children: [
          /* @__PURE__ */ jsxs8(
            "button",
            {
              onclick: "donate(1)",
              class: "donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:rotate-1 transition-all duration-300 bg-green-100 hover:bg-green-200",
              children: [
                "$1",
                /* @__PURE__ */ jsx8("div", { class: "text-sm font-handwritten", children: "Coffee Fund" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs8(
            "button",
            {
              onclick: "donate(5)",
              class: "donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:-rotate-1 transition-all duration-300 bg-blue-100 hover:bg-blue-200",
              children: [
                "$5",
                /* @__PURE__ */ jsx8("div", { class: "text-sm font-handwritten", children: "Popular Choice" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs8(
            "button",
            {
              onclick: "donate(10)",
              class: "donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:rotate-1 transition-all duration-300 bg-purple-100 hover:bg-purple-200",
              children: [
                "$10",
                /* @__PURE__ */ jsx8("div", { class: "text-sm font-handwritten", children: "Super Supporter" })
              ]
            }
          ),
          /* @__PURE__ */ jsxs8(
            "button",
            {
              onclick: "showCustomAmount()",
              class: "donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:-rotate-1 transition-all duration-300 bg-yellow-100 hover:bg-yellow-200",
              children: [
                "Other",
                /* @__PURE__ */ jsx8("div", { class: "text-sm font-handwritten", children: "Choose Amount" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsx8("div", { id: "customAmountSection", class: "hidden mb-6", children: /* @__PURE__ */ jsxs8("div", { class: "scribble-border inline-block p-4", children: [
          /* @__PURE__ */ jsx8(
            "input",
            {
              type: "number",
              id: "customAmount",
              placeholder: "Enter amount",
              class: "p-2 border-2 border-black border-dashed font-handwritten text-center w-32 mr-4",
              min: "1",
              max: "1000"
            }
          ),
          /* @__PURE__ */ jsx8(
            "button",
            {
              onclick: "donateCustom()",
              class: "scribble-button px-4 py-2 font-sketch bg-green-200 hover:bg-green-300",
              children: "Donate"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx8("div", { class: "text-center", children: /* @__PURE__ */ jsx8(
          "button",
          {
            onclick: "skipDonation()",
            class: "font-handwritten text-gray-600 hover:text-black underline transform hover:rotate-1 transition-all",
            children: "Skip for now (but I'd love your support next time!)"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx8("div", { class: "text-center mb-12", children: /* @__PURE__ */ jsxs8("div", { class: "scribble-border inline-block p-6 max-w-2xl", children: [
        /* @__PURE__ */ jsx8("h4", { class: "text-xl font-bold font-sketch mb-4 transform rotate-1", children: "Your Impact" }),
        /* @__PURE__ */ jsxs8("div", { class: "grid md:grid-cols-3 gap-6 font-handwritten", children: [
          /* @__PURE__ */ jsxs8("div", { class: "text-center", children: [
            /* @__PURE__ */ jsx8("div", { class: "text-2xl mb-2", children: "\u{1F4A1}" }),
            /* @__PURE__ */ jsx8("p", { class: "text-sm", children: "1,247 students inspired this month" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { class: "text-center", children: [
            /* @__PURE__ */ jsx8("div", { class: "text-2xl mb-2", children: "\u{1F91D}" }),
            /* @__PURE__ */ jsx8("p", { class: "text-sm", children: "563 meaningful connections made" })
          ] }),
          /* @__PURE__ */ jsxs8("div", { class: "text-center", children: [
            /* @__PURE__ */ jsx8("div", { class: "text-2xl mb-2", children: "\u{1F3AF}" }),
            /* @__PURE__ */ jsx8("p", { class: "text-sm", children: "89% report career clarity" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs8("div", { class: "text-center space-x-4", children: [
        /* @__PURE__ */ jsx8(
          "button",
          {
            onclick: "startNewConversation()",
            class: "scribble-button px-6 py-3 font-sketch text-lg hover:rotate-1 transition-transform bg-blue-200 hover:bg-blue-300",
            children: "Start Another Conversation"
          }
        ),
        /* @__PURE__ */ jsx8(
          "a",
          {
            href: "/",
            class: "scribble-button inline-block px-6 py-3 font-sketch text-lg hover:-rotate-1 transition-transform bg-gray-200 hover:bg-gray-300",
            children: "Back to Home"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx8("div", { id: "donationModal", class: "fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50", children: /* @__PURE__ */ jsx8("div", { class: "bg-white p-8 max-w-md mx-4 relative", children: /* @__PURE__ */ jsxs8("div", { class: "scribble-border-large p-6 text-center", children: [
      /* @__PURE__ */ jsx8("div", { class: "text-6xl mb-4", children: "\u{1F389}" }),
      /* @__PURE__ */ jsx8("h3", { class: "text-2xl font-bold font-sketch mb-4 transform -rotate-1", children: "Thanks for your support!" }),
      /* @__PURE__ */ jsxs8("p", { class: "font-handwritten text-lg mb-6", children: [
        "Your ",
        /* @__PURE__ */ jsx8("span", { id: "donatedAmount", class: "font-bold", children: "$5" }),
        " donation helps me connect more students with amazing leaders like the one you just spoke with!"
      ] }),
      /* @__PURE__ */ jsxs8("div", { class: "space-y-3 font-handwritten text-sm mb-6", children: [
        /* @__PURE__ */ jsx8("p", { children: "\u2705 Transaction completed successfully" }),
        /* @__PURE__ */ jsx8("p", { children: "\u2705 Receipt sent to your email" }),
        /* @__PURE__ */ jsx8("p", { children: "\u2705 You're making a difference!" })
      ] }),
      /* @__PURE__ */ jsx8(
        "button",
        {
          onclick: "closeDonationModal()",
          class: "scribble-button px-6 py-3 font-sketch bg-green-200 hover:bg-green-300",
          children: "Continue"
        }
      )
    ] }) }) }),
    /* @__PURE__ */ jsx8("script", { dangerouslySetInnerHTML: {
      __html: `
        // Set user info from previous session
        document.addEventListener('DOMContentLoaded', function() {
          const userRole = sessionStorage.getItem('userRole') || 'student';
          const partnerType = userRole === 'student' ? 'A successful CEO' : 'An ambitious student';
          document.getElementById('partnerType').textContent = partnerType;
        });

        function donate(amount) {
          showDonationSuccess(amount);
        }

        function showCustomAmount() {
          document.getElementById('customAmountSection').classList.remove('hidden');
        }

        function donateCustom() {
          const amount = parseInt(document.getElementById('customAmount').value);
          if (amount && amount > 0) {
            showDonationSuccess(amount);
          } else {
            alert('Please enter a valid amount');
          }
        }

        function showDonationSuccess(amount) {
          document.getElementById('donatedAmount').textContent = '$' + amount;
          document.getElementById('donationModal').classList.remove('hidden');
          
          // Add some celebration effects
          document.querySelectorAll('.donation-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.6';
          });
        }

        function closeDonationModal() {
          document.getElementById('donationModal').classList.add('hidden');
        }

        function skipDonation() {
            if (confirm('Are you sure you want to skip? Your support really helps me keep this platform free for students!')) {
            // Maybe show a gentle reminder or alternative way to help
            alert('No worries! Consider sharing MentorMatch with friends who might benefit from it. \u{1F60A}');
          }
        }

        function startNewConversation() {
          window.location.href = '/role-select';
        }

        // Add some random motivational messages
        const motivationalMessages = [
          "Every conversation has the power to change a life! \u{1F31F}",
          "You just participated in something amazing! \u{1F4AB}",
          "Great conversations create great futures! \u{1F680}",
            "Thank you for being part of my community! \u{1F917}"
        ];

        setTimeout(() => {
          const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
          const messageDiv = document.createElement('div');
          messageDiv.className = 'fixed bottom-4 right-4 bg-yellow-100 p-4 scribble-border font-handwritten text-sm max-w-xs transform rotate-2 transition-opacity duration-500';
          messageDiv.textContent = randomMessage;
          document.body.appendChild(messageDiv);
          
          setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
          }, 4000);
        }, 2000);
        `
    } })
  ] });
}

// src/pages/about.tsx
import { jsx as jsx9, jsxs as jsxs9 } from "hono/jsx/jsx-runtime";
function AboutPage() {
  return /* @__PURE__ */ jsxs9("div", { class: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx9("nav", { class: "sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs9("div", { class: "max-w-6xl mx-auto px-6 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs9("a", { href: "/", class: "wordmark text-xl font-bold text-gray-900 hover:no-underline", children: [
        "Mentor",
        /* @__PURE__ */ jsx9("span", { class: "text-indigo-600", children: "Match" })
      ] }),
      /* @__PURE__ */ jsxs9("div", { class: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx9("a", { href: "/", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline", children: "Home" }),
        /* @__PURE__ */ jsx9("a", { href: "/about", class: "px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:no-underline", children: "About the Founder" }),
        /* @__PURE__ */ jsx9("a", { href: "/how-it-works", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline", children: "How It Works" }),
        /* @__PURE__ */ jsx9("a", { href: "/blog", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline", children: "Blog" }),
        /* @__PURE__ */ jsx9("a", { href: "/role-select", class: "ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm hover:no-underline", children: "Start Connecting" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs9("div", { class: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white pt-16 pb-20 text-center px-6", children: [
      /* @__PURE__ */ jsx9("span", { class: "inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4", children: "My Story" }),
      /* @__PURE__ */ jsx9("h1", { class: "wordmark text-4xl md:text-6xl font-bold mb-4", children: "About the Founder" }),
      /* @__PURE__ */ jsx9("p", { class: "text-indigo-200 text-lg max-w-2xl mx-auto", children: "Built from real experience. Driven by a mission to make mentorship accessible to everyone." })
    ] }),
    /* @__PURE__ */ jsxs9("div", { class: "max-w-4xl mx-auto px-6 py-16", children: [
      /* @__PURE__ */ jsx9("div", { class: "mb-16 reveal", children: /* @__PURE__ */ jsxs9("div", { class: "bg-blue-50 rounded-3xl p-8 md:p-10 border border-blue-100", children: [
        /* @__PURE__ */ jsx9("h3", { class: "wordmark text-3xl font-bold text-gray-900 mb-8 text-center", children: "About the Founder" }),
        /* @__PURE__ */ jsx9("div", { class: "flex justify-center mb-8", children: /* @__PURE__ */ jsx9(
          "img",
          {
            src: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3be8fdd4-19f6-46f8-b92d-c61648f7f1c8/unnamed-9-resized-1771734759281.jpg?width=8000&height=8000&resize=contain",
            alt: "Ethan B, Founder of MentorMatch",
            class: "w-52 h-52 object-cover object-top rounded-2xl shadow-lg"
          }
        ) }),
        /* @__PURE__ */ jsxs9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700", children: [
          "My name is ",
          /* @__PURE__ */ jsx9("strong", { children: "Ethan B" }),
          ", and I'm a 15-year-old student in the Bay Area. I'm also a freelance sports photographer who has worked with professional, collegiate, and high school athletes throughout the region."
        ] }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700", children: "As a young photographer trying to grow in a competitive field, I learned something early: talent isn't enough. What truly accelerated my growth was reaching out to photographers I admired \u2014 asking questions, studying their work, and learning directly from people with more experience than me. Having someone older, wiser, and further ahead guide me made an enormous difference." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700 font-bold", children: "That realization stuck with me." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700", children: "I began noticing the same pattern everywhere. Whether someone wants to become a professional athlete, a doctor, a lawyer, an entrepreneur, or a scientist \u2014 no one succeeds alone. Every successful person had guidance. Every successful person had someone who helped them navigate the unknown." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700", children: 'Even at my own school, programs like "Big Brother, Little Brother" show how powerful mentorship can be during important transitions. When freshmen have upperclassmen to guide them, the adjustment becomes smoother, more confident, and more successful.' }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed font-bold text-gray-900", children: "That's why I created MentorMatch." })
      ] }) }),
      /* @__PURE__ */ jsx9("div", { class: "mb-16 reveal", children: /* @__PURE__ */ jsxs9("div", { class: "bg-amber-50 rounded-3xl p-8 md:p-10 border border-amber-100", children: [
        /* @__PURE__ */ jsx9("h3", { class: "wordmark text-3xl font-bold text-gray-900 mb-6 text-center", children: "My Vision" }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700", children: "My long-term vision for MentorMatch is simple but powerful:" }),
        /* @__PURE__ */ jsx9("blockquote", { class: "text-xl font-semibold text-indigo-700 text-center leading-relaxed mb-6 bg-white rounded-2xl px-6 py-5 border border-indigo-100 shadow-sm", children: '"One day, a student should be able to click a button and instantly connect with the right mentor for their dream career."' }),
        /* @__PURE__ */ jsxs9("div", { class: "space-y-3 text-lg text-gray-700", children: [
          /* @__PURE__ */ jsx9("p", { children: "\u2022 If you want to become a CEO, you should speak to one." }),
          /* @__PURE__ */ jsx9("p", { children: "\u2022 If you want to become a doctor, you should learn from one." }),
          /* @__PURE__ */ jsx9("p", { children: "\u2022 If you want to work in sports, law, tech, or science \u2014 you should have direct access to someone who has already done it." })
        ] }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mt-6 font-bold text-gray-900", children: "Mentorship shouldn't depend on who you know. It should depend on who you aspire to become." })
      ] }) }),
      /* @__PURE__ */ jsx9("div", { class: "mb-16 reveal", children: /* @__PURE__ */ jsxs9("div", { class: "bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm", children: [
        /* @__PURE__ */ jsx9("h3", { class: "wordmark text-2xl font-bold text-gray-900 mb-4 text-center", children: "The Challenges" }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-4 text-gray-700", children: "Starting MentorMatch at 15 hasn't been easy. One of the biggest challenges has been reaching a wider audience. There are only so many people you can message personally, and building trust at a young age requires persistence and proof." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-4 text-gray-700", children: "But every meaningful idea starts small. And every large movement once began with a single conversation." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed font-bold text-gray-900", children: "I believe that if I focus on impact first, growth will follow." })
      ] }) }),
      /* @__PURE__ */ jsx9("div", { class: "mb-16 reveal", children: /* @__PURE__ */ jsxs9("div", { class: "bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-200", children: [
        /* @__PURE__ */ jsx9("h3", { class: "wordmark text-3xl font-bold text-gray-900 mb-6 text-center", children: "Why Trust MentorMatch?" }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-5 text-gray-700", children: "MentorMatch isn't just an idea \u2014 it's built from real experience." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg leading-relaxed mb-6 text-gray-700", children: "I've personally seen how mentorship accelerates growth. I've experienced it in photography. I've seen it in sports. I've seen it in school programs. And I've seen how one conversation can change someone's confidence and direction." }),
        /* @__PURE__ */ jsx9("p", { class: "text-lg font-bold mb-6 text-gray-900", children: "MentorMatch is founded on three principles:" }),
        /* @__PURE__ */ jsxs9("div", { class: "grid md:grid-cols-3 gap-6 mb-6", children: [
          /* @__PURE__ */ jsxs9("div", { class: "bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm", children: [
            /* @__PURE__ */ jsx9("div", { class: "text-4xl mb-3", children: "\u{1F30D}" }),
            /* @__PURE__ */ jsx9("h4", { class: "font-bold text-lg mb-2 text-gray-900", children: "Access" }),
            /* @__PURE__ */ jsx9("p", { class: "text-sm text-gray-500", children: "Every student deserves opportunity" })
          ] }),
          /* @__PURE__ */ jsxs9("div", { class: "bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm", children: [
            /* @__PURE__ */ jsx9("div", { class: "text-4xl mb-3", children: "\u2705" }),
            /* @__PURE__ */ jsx9("h4", { class: "font-bold text-lg mb-2 text-gray-900", children: "Authenticity" }),
            /* @__PURE__ */ jsx9("p", { class: "text-sm text-gray-500", children: "Real mentors with real experience" })
          ] }),
          /* @__PURE__ */ jsxs9("div", { class: "bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm", children: [
            /* @__PURE__ */ jsx9("div", { class: "text-4xl mb-3", children: "\u{1F680}" }),
            /* @__PURE__ */ jsx9("h4", { class: "font-bold text-lg mb-2 text-gray-900", children: "Impact" }),
            /* @__PURE__ */ jsx9("p", { class: "text-sm text-gray-500", children: "Conversations that create long-term growth" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs9("div", { class: "text-center", children: [
          /* @__PURE__ */ jsx9("p", { class: "text-lg text-gray-700 mb-2", children: "This isn't about networking for status." }),
          /* @__PURE__ */ jsx9("p", { class: "text-lg text-gray-700 mb-4", children: "It's about building bridges through conversation." }),
          /* @__PURE__ */ jsx9("p", { class: "text-xl font-bold text-indigo-700 bg-indigo-50 rounded-2xl px-6 py-4 inline-block border border-indigo-100", children: "And sometimes, one mentor is all it takes to change a life." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx9("div", { class: "text-center mb-8", children: /* @__PURE__ */ jsxs9("div", { class: "bg-indigo-600 rounded-3xl p-10 text-white", children: [
        /* @__PURE__ */ jsx9("h3", { class: "wordmark text-3xl font-bold mb-4", children: "Join the Movement" }),
        /* @__PURE__ */ jsx9("p", { class: "text-indigo-200 text-base mb-8 max-w-xl mx-auto", children: "Whether you're a student looking for guidance or a professional ready to give back, join a platform where one conversation can change everything." }),
        /* @__PURE__ */ jsx9(
          "a",
          {
            href: "/role-select",
            class: "inline-block bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl text-base hover:bg-indigo-50 transition-colors hover:no-underline shadow-lg",
            children: "Start Connecting \u2192"
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsx9("footer", { class: "bg-gray-900 text-white pt-12 pb-8", children: /* @__PURE__ */ jsxs9("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs9("div", { class: "flex flex-col md:flex-row justify-between items-start gap-8 mb-10", children: [
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsxs9("h3", { class: "wordmark text-2xl font-bold mb-2", children: [
            "Mentor",
            /* @__PURE__ */ jsx9("span", { class: "text-indigo-400", children: "Match" })
          ] }),
          /* @__PURE__ */ jsx9("p", { class: "text-gray-400 text-sm max-w-xs leading-relaxed", children: "Free AI-powered career mentorship connecting students with industry leaders." })
        ] }),
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsx9("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Navigate" }),
          /* @__PURE__ */ jsxs9("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx9("a", { href: "/", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Home" }),
            /* @__PURE__ */ jsx9("a", { href: "/about", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "About the Founder" }),
            /* @__PURE__ */ jsx9("a", { href: "/how-it-works", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "How It Works" }),
            /* @__PURE__ */ jsx9("a", { href: "/blog", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Blog" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs9("div", { children: [
          /* @__PURE__ */ jsx9("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Platform" }),
          /* @__PURE__ */ jsxs9("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx9("a", { href: "/role-select", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Start Connecting" }),
            /* @__PURE__ */ jsx9("a", { href: "/register?role=student", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Sign Up as Student" }),
            /* @__PURE__ */ jsx9("a", { href: "/register?role=mentor", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline", children: "Sign Up as Mentor" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs9("div", { class: "border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
        /* @__PURE__ */ jsx9("p", { class: "text-gray-500 text-sm", children: "\xA9 2025 MentorMatch \xB7 Built by Ethan B \xB7 Bay Area" }),
        /* @__PURE__ */ jsxs9("div", { class: "flex gap-5", children: [
          /* @__PURE__ */ jsx9("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors hover:no-underline", children: "Privacy" }),
          /* @__PURE__ */ jsx9("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors hover:no-underline", children: "Terms" })
        ] })
      ] })
    ] }) })
  ] });
}

// src/pages/role-select.tsx
import { jsx as jsx10, jsxs as jsxs10 } from "hono/jsx/jsx-runtime";
function RoleSelectPage() {
  return /* @__PURE__ */ jsx10("div", { class: "min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50", children: /* @__PURE__ */ jsxs10("div", { class: "container mx-auto px-4 py-12 max-w-4xl", children: [
    /* @__PURE__ */ jsxs10("div", { class: "text-center mb-12", children: [
      /* @__PURE__ */ jsx10("a", { href: "/", class: "inline-block mb-6 hover:no-underline", children: /* @__PURE__ */ jsxs10("span", { class: "wordmark text-2xl font-bold text-gray-900", children: [
        "Mentor",
        /* @__PURE__ */ jsx10("span", { class: "text-indigo-600", children: "Match" })
      ] }) }),
      /* @__PURE__ */ jsx10("h1", { class: "wordmark text-4xl md:text-5xl font-bold text-gray-900 mb-4", children: "Choose Your Role" }),
      /* @__PURE__ */ jsx10("p", { class: "text-lg text-gray-500 max-w-2xl mx-auto", children: "Are you a student seeking career advice and mentorship, or a leader ready to coach? Select your role to start your career development journey." })
    ] }),
    /* @__PURE__ */ jsxs10("div", { class: "grid md:grid-cols-2 gap-8 mb-12", children: [
      /* @__PURE__ */ jsxs10("div", { class: "bg-white rounded-3xl p-8 text-center border border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal card-shimmer", children: [
        /* @__PURE__ */ jsx10(
          "img",
          {
            src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80",
            alt: "College students getting career advice",
            class: "w-full h-44 object-cover rounded-2xl mb-5"
          }
        ),
        /* @__PURE__ */ jsx10("h2", { class: "wordmark text-2xl md:text-3xl font-bold text-gray-900 mb-4", children: "I'm a Student" }),
        /* @__PURE__ */ jsx10("p", { class: "text-gray-600 text-base mb-6 leading-relaxed", children: "Find a mentor among industry leaders, successful entrepreneurs, and career coaches. Get career advice, professional guidance, and one-on-one sessions to build your future." }),
        /* @__PURE__ */ jsxs10("div", { class: "mb-6 text-left", children: [
          /* @__PURE__ */ jsx10("h3", { class: "font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide", children: "Perfect for:" }),
          /* @__PURE__ */ jsxs10("ul", { class: "text-sm text-gray-500 space-y-1", children: [
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Students seeking career guidance" }),
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Recent graduates planning career paths" }),
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Aspiring professionals & entrepreneurs" }),
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Anyone who wants a real mentor" })
          ] })
        ] }),
        /* @__PURE__ */ jsx10(
          "button",
          {
            onclick: "selectRole('student')",
            class: "w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-md hover:shadow-lg",
            children: "Join as Student \u2192"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs10("div", { class: "bg-white rounded-3xl p-8 text-center border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal delay-200 card-shimmer", children: [
        /* @__PURE__ */ jsx10(
          "img",
          {
            src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80",
            alt: "Executive leader ready for career mentoring",
            class: "w-full h-44 object-cover rounded-2xl mb-5"
          }
        ),
        /* @__PURE__ */ jsx10("h2", { class: "wordmark text-2xl md:text-3xl font-bold text-gray-900 mb-4", children: "I'm a Leader" }),
        /* @__PURE__ */ jsx10("p", { class: "text-gray-600 text-base mb-6 leading-relaxed", children: "Provide career coaching and mentorship to the next generation. Share your experience and make a lasting impact through one-on-one sessions." }),
        /* @__PURE__ */ jsxs10("div", { class: "mb-6 text-left", children: [
          /* @__PURE__ */ jsx10("h3", { class: "font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide", children: "Perfect for:" }),
          /* @__PURE__ */ jsxs10("ul", { class: "text-sm text-gray-500 space-y-1", children: [
            /* @__PURE__ */ jsx10("li", { children: "\u2022 CEOs & executives" }),
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Successful career professionals" }),
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Industry leaders & mentors" }),
            /* @__PURE__ */ jsx10("li", { children: "\u2022 Anyone who wants to give back" })
          ] })
        ] }),
        /* @__PURE__ */ jsx10(
          "button",
          {
            onclick: "selectRole('ceo')",
            class: "w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-md hover:shadow-lg",
            children: "Join as Leader \u2192"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx10("div", { class: "text-center", children: /* @__PURE__ */ jsxs10("div", { class: "bg-white rounded-2xl inline-block px-8 py-6 border border-gray-100 shadow-sm", children: [
      /* @__PURE__ */ jsx10("p", { class: "text-gray-600 text-base mb-4", children: "New to MentorMatch?" }),
      /* @__PURE__ */ jsx10(
        "a",
        {
          href: "/register",
          class: "inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-base transition-colors mr-4 hover:no-underline",
          children: "Create Account"
        }
      ),
      /* @__PURE__ */ jsx10("a", { href: "/login", class: "text-indigo-600 font-semibold text-base hover:underline", children: "Already have an account? Login" })
    ] }) }),
    /* @__PURE__ */ jsx10("div", { class: "text-center mt-6", children: /* @__PURE__ */ jsx10("a", { href: "/", class: "text-gray-400 text-sm hover:text-gray-600 hover:no-underline", children: "\u2190 Back to Home" }) })
  ] }) });
}

// src/pages/blog.tsx
import { jsx as jsx11, jsxs as jsxs11 } from "hono/jsx/jsx-runtime";
function BlogPage() {
  return /* @__PURE__ */ jsxs11("div", { class: "min-h-screen bg-gray-50", children: [
    /* @__PURE__ */ jsx11("nav", { class: "sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs11("div", { class: "max-w-6xl mx-auto px-6 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx11("a", { href: "/", class: "text-xl font-extrabold tracking-tight text-gray-900 font-sketch", children: "MentorMatch" }),
      /* @__PURE__ */ jsxs11("div", { class: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx11("a", { href: "/", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors", children: "Home" }),
        /* @__PURE__ */ jsx11("a", { href: "/about", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors", children: "About the Founder" }),
        /* @__PURE__ */ jsx11("a", { href: "/how-it-works", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors", children: "How It Works" }),
        /* @__PURE__ */ jsx11("a", { href: "/blog", class: "px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200", children: "Blog" }),
        /* @__PURE__ */ jsx11("a", { href: "/role-select", class: "ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm", children: "Start Connecting" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx11("div", { class: "bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white", children: /* @__PURE__ */ jsxs11("div", { class: "max-w-5xl mx-auto px-4 py-16 text-center", children: [
      /* @__PURE__ */ jsx11("span", { class: "inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4", children: "MentorMatch Blog" }),
      /* @__PURE__ */ jsxs11("h1", { class: "text-4xl md:text-5xl font-extrabold mb-4 leading-tight", children: [
        "Insights on Mentorship",
        /* @__PURE__ */ jsx11("br", {}),
        "& Career Development"
      ] }),
      /* @__PURE__ */ jsx11("p", { class: "text-indigo-200 text-lg max-w-xl mx-auto", children: "Research-backed articles to help students navigate their careers with confidence." })
    ] }) }),
    /* @__PURE__ */ jsx11("div", { class: "max-w-5xl mx-auto px-4 -mt-8", children: /* @__PURE__ */ jsxs11("div", { class: "grid grid-cols-1 md:grid-cols-3 gap-5", children: [
      /* @__PURE__ */ jsxs11("a", { href: "#post-1", class: "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group", children: [
        /* @__PURE__ */ jsxs11("div", { class: "relative h-40 overflow-hidden", children: [
          /* @__PURE__ */ jsx11(
            "img",
            {
              src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80",
              alt: "Mentorship meeting",
              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            }
          ),
          /* @__PURE__ */ jsx11("div", { class: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
          /* @__PURE__ */ jsx11("span", { class: "absolute bottom-3 left-3 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "Post 1" })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "p-4", children: [
          /* @__PURE__ */ jsx11("h3", { class: "font-bold text-gray-900 text-sm leading-snug", children: "Why Mentorship Matters for Career Success" }),
          /* @__PURE__ */ jsx11("p", { class: "text-gray-500 text-xs mt-1", children: "Confidence, networking, and professional growth" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("a", { href: "#post-2", class: "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group", children: [
        /* @__PURE__ */ jsxs11("div", { class: "relative h-40 overflow-hidden", children: [
          /* @__PURE__ */ jsx11(
            "img",
            {
              src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80",
              alt: "Salary data charts",
              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            }
          ),
          /* @__PURE__ */ jsx11("div", { class: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
          /* @__PURE__ */ jsx11("span", { class: "absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "Post 2" })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "p-4", children: [
          /* @__PURE__ */ jsx11("h3", { class: "font-bold text-gray-900 text-sm leading-snug", children: "STEM vs Non-STEM Salaries: What the Data Shows" }),
          /* @__PURE__ */ jsx11("p", { class: "text-gray-500 text-xs mt-1", children: "NSF 2024 earnings data broken down clearly" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("a", { href: "#post-3", class: "bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group", children: [
        /* @__PURE__ */ jsxs11("div", { class: "relative h-40 overflow-hidden", children: [
          /* @__PURE__ */ jsx11(
            "img",
            {
              src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80",
              alt: "Career growth",
              class: "w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            }
          ),
          /* @__PURE__ */ jsx11("div", { class: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" }),
          /* @__PURE__ */ jsx11("span", { class: "absolute bottom-3 left-3 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full", children: "Post 3" })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "p-4", children: [
          /* @__PURE__ */ jsx11("h3", { class: "font-bold text-gray-900 text-sm leading-snug", children: "How Mentorship Improves Career Outcomes" }),
          /* @__PURE__ */ jsx11("p", { class: "text-gray-500 text-xs mt-1", children: "From first job to lifelong transferable skills" })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx11("article", { id: "post-1", class: "max-w-3xl mx-auto px-4 mt-16", children: /* @__PURE__ */ jsxs11("div", { class: "bg-white rounded-3xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs11("div", { class: "relative h-72 overflow-hidden", children: [
        /* @__PURE__ */ jsx11(
          "img",
          {
            src: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80",
            alt: "Two professionals in a mentorship session",
            class: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx11("div", { class: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
        /* @__PURE__ */ jsxs11("div", { class: "absolute bottom-6 left-8 right-8", children: [
          /* @__PURE__ */ jsx11("span", { class: "bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full", children: "Mentorship" }),
          /* @__PURE__ */ jsxs11("h2", { class: "text-3xl font-extrabold text-white mt-3 leading-tight", children: [
            "Why Mentorship Matters",
            /* @__PURE__ */ jsx11("br", {}),
            "for Career Success"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { class: "p-8", children: [
        /* @__PURE__ */ jsx11("p", { class: "text-gray-700 text-base leading-relaxed", children: "Mentorship isn't just a nice perk \u2014 research shows it plays a huge role in shaping careers. When students get guidance from experienced professionals, they gain insight that simply isn't available through classes alone." }),
        /* @__PURE__ */ jsx11("p", { class: "text-gray-700 text-base leading-relaxed mt-4", children: "Studies find that mentoring relationships help young people build confidence, understand real-world expectations, and connect academic learning to future jobs. Mentored youth are more likely to set higher educational goals and develop better attitudes about school \u2014 which leads to stronger career choices later on." }),
        /* @__PURE__ */ jsxs11("div", { class: "grid grid-cols-1 sm:grid-cols-3 gap-4 my-8", children: [
          /* @__PURE__ */ jsxs11("div", { class: "bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-center", children: [
            /* @__PURE__ */ jsx11("div", { class: "text-4xl font-extrabold text-indigo-600", children: "55%" }),
            /* @__PURE__ */ jsx11("div", { class: "text-xs text-indigo-700 font-semibold mt-1 uppercase tracking-wide", children: "More likely to enroll in college" }),
            /* @__PURE__ */ jsx11("div", { class: "text-xs text-gray-400 mt-1", children: "Mentoring.org" })
          ] }),
          /* @__PURE__ */ jsxs11("div", { class: "bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center", children: [
            /* @__PURE__ */ jsx11("div", { class: "text-4xl font-extrabold text-purple-600", children: "78%" }),
            /* @__PURE__ */ jsx11("div", { class: "text-xs text-purple-700 font-semibold mt-1 uppercase tracking-wide", children: "Of mentored youth set career goals" }),
            /* @__PURE__ */ jsx11("div", { class: "text-xs text-gray-400 mt-1", children: /* @__PURE__ */ jsx11("a", { href: "https://www.mentoring.org/wp-content/uploads/2022/03/Issue-Brief-on-Mentoring-and-Career-Exploration-and-Workforce-Development-Final-Draft136142.pdf", target: "_blank", rel: "noopener noreferrer", class: "underline hover:text-indigo-500", children: "MENTOR, Career Exploration & Workforce Dev (2022)" }) })
          ] }),
          /* @__PURE__ */ jsxs11("div", { class: "bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center", children: [
            /* @__PURE__ */ jsx11("div", { class: "text-4xl font-extrabold text-emerald-600", children: "2\xD7" }),
            /* @__PURE__ */ jsx11("div", { class: "text-xs text-emerald-700 font-semibold mt-1 uppercase tracking-wide", children: "Leadership growth for mentors" }),
            /* @__PURE__ */ jsx11("div", { class: "text-xs text-gray-400 mt-1", children: /* @__PURE__ */ jsx11("a", { href: "https://www.evidencebasedmentoring.org/new-study-highlights-the-benefits-of-serving-as-a-mentor/", target: "_blank", rel: "noopener noreferrer", class: "underline hover:text-indigo-500", children: "Eby et al., J. of Vocational Behavior (2013)" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "rounded-2xl overflow-hidden my-6", children: [
          /* @__PURE__ */ jsx11(
            "img",
            {
              src: "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80",
              alt: "Group mentorship workshop session",
              class: "w-full h-56 object-cover"
            }
          ),
          /* @__PURE__ */ jsx11("p", { class: "text-center text-xs text-gray-400 mt-2 italic", children: "Group mentorship sessions help students build confidence and real-world perspective." })
        ] }),
        /* @__PURE__ */ jsx11("h3", { class: "text-xl font-bold text-gray-900 mt-6 mb-3", children: "What the Research Reveals" }),
        /* @__PURE__ */ jsxs11("ul", { class: "space-y-3", children: [
          /* @__PURE__ */ jsxs11("li", { class: "flex gap-3", children: [
            /* @__PURE__ */ jsx11("span", { class: "mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold", children: "1" }),
            /* @__PURE__ */ jsxs11("p", { class: "text-gray-700 text-sm leading-relaxed", children: [
              "Youth with mentors show improvements in ",
              /* @__PURE__ */ jsx11("strong", { children: "educational and professional engagement" }),
              ", making them better prepared for early career experiences."
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("li", { class: "flex gap-3", children: [
            /* @__PURE__ */ jsx11("span", { class: "mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold", children: "2" }),
            /* @__PURE__ */ jsxs11("p", { class: "text-gray-700 text-sm leading-relaxed", children: [
              "Mentoring can ",
              /* @__PURE__ */ jsx11("strong", { children: "expand career opportunities" }),
              " by offering access to networks, insider knowledge, and lasting professional relationships."
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("li", { class: "flex gap-3", children: [
            /* @__PURE__ */ jsx11("span", { class: "mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold", children: "3" }),
            /* @__PURE__ */ jsxs11("p", { class: "text-gray-700 text-sm leading-relaxed", children: [
              "Mentorship also enhances ",
              /* @__PURE__ */ jsx11("strong", { children: "communication and self-efficacy" }),
              " \u2014 meaning students can navigate challenges more confidently."
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("li", { class: "flex gap-3", children: [
            /* @__PURE__ */ jsx11("span", { class: "mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold", children: "4" }),
            /* @__PURE__ */ jsxs11("p", { class: "text-gray-700 text-sm leading-relaxed", children: [
              "Mentors help mentees see their ",
              /* @__PURE__ */ jsx11("strong", { children: "potential future self" }),
              " in the world of work \u2014 making informed career decisions instead of guesswork."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("blockquote", { class: "mt-8 border-l-4 border-indigo-400 bg-indigo-50 rounded-r-2xl px-6 py-4", children: [
          /* @__PURE__ */ jsx11("p", { class: "text-indigo-800 italic text-base font-medium", children: `"The consistent, enduring presence of a caring adult in a young person's life can be the difference between staying in school or dropping out, making healthy decisions or engaging in risky behaviors, and realizing one's potential or failing to achieve one's dreams."` }),
          /* @__PURE__ */ jsxs11("footer", { class: "text-indigo-500 text-xs mt-2 font-semibold", children: [
            "\u2014 ",
            /* @__PURE__ */ jsx11("a", { href: "https://www.mentoring.org/mentoring-impact/", target: "_blank", rel: "noopener noreferrer", class: "underline hover:text-indigo-700", children: "The Mentoring Effect: Young People's Perspectives, MENTOR (2014)" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8 pt-6 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Sources" }),
          /* @__PURE__ */ jsxs11("ul", { class: "space-y-1 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.mentoring.org/mentoring-impact/", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Research on mentorship's impact on youth outcomes \u2014 mentoring.org" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.evidencebasedmentoring.org/new-study-highlights-the-benefits-of-serving-as-a-mentor/", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Meta-analysis of mentoring benefits for mentors and mentees \u2014 evidencebasedmentoring.org" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.mentoring.org/wp-content/uploads/2022/03/Issue-Brief-on-Mentoring-and-Career-Exploration-and-Workforce-Development-Final-Draft136142.pdf", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Career exploration and mentoring research \u2014 mentoring.org PDF" }) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx11("article", { id: "post-2", class: "max-w-3xl mx-auto px-4 mt-12", children: /* @__PURE__ */ jsxs11("div", { class: "bg-white rounded-3xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs11("div", { class: "relative h-72 overflow-hidden", children: [
        /* @__PURE__ */ jsx11(
          "img",
          {
            src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80",
            alt: "Data charts and financial analysis",
            class: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx11("div", { class: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
        /* @__PURE__ */ jsxs11("div", { class: "absolute bottom-6 left-8 right-8", children: [
          /* @__PURE__ */ jsx11("span", { class: "bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full", children: "Salary Data" }),
          /* @__PURE__ */ jsxs11("h2", { class: "text-3xl font-extrabold text-white mt-3 leading-tight", children: [
            "STEM vs Non-STEM Salaries:",
            /* @__PURE__ */ jsx11("br", {}),
            "What the Data Shows"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { class: "p-8", children: [
        /* @__PURE__ */ jsx11("p", { class: "text-gray-700 text-base leading-relaxed", children: "Choosing a college major or career path isn't just about passion \u2014 it's also about understanding how different fields pay. One important comparison for students is between STEM and non-STEM roles." }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white", children: [
          /* @__PURE__ */ jsx11("p", { class: "text-sm font-semibold uppercase tracking-widest opacity-80 mb-1", children: "NSF Science & Engineering Indicators 2024" }),
          /* @__PURE__ */ jsx11("p", { class: "text-lg font-bold mb-5", children: "Median annual salary \u2014 full-time, year-round workers" }),
          /* @__PURE__ */ jsxs11("div", { class: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs11("div", { class: "bg-white/20 rounded-xl p-4 text-center", children: [
              /* @__PURE__ */ jsx11("div", { class: "text-xs uppercase tracking-widest font-semibold opacity-80 mb-1", children: "STEM Workers" }),
              /* @__PURE__ */ jsx11("div", { class: "text-4xl font-extrabold", children: "$68,976" })
            ] }),
            /* @__PURE__ */ jsxs11("div", { class: "bg-white/20 rounded-xl p-4 text-center", children: [
              /* @__PURE__ */ jsx11("div", { class: "text-xs uppercase tracking-widest font-semibold opacity-80 mb-1", children: "Non-STEM Workers" }),
              /* @__PURE__ */ jsx11("div", { class: "text-4xl font-extrabold", children: "$49,903" })
            ] })
          ] }),
          /* @__PURE__ */ jsx11("p", { class: "text-center text-sm mt-4 font-semibold opacity-90", children: "STEM workers earn ~$19,000 more at the median" }),
          /* @__PURE__ */ jsxs11("p", { class: "text-center text-xs opacity-60 mt-1", children: [
            "Source: ",
            /* @__PURE__ */ jsx11("a", { href: "https://ncses.nsf.gov/pubs/nsb20245/figure/LBR-B", target: "_blank", rel: "noopener noreferrer", class: "underline hover:opacity-100", children: "NSB Science & Engineering Indicators 2024" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8", children: [
          /* @__PURE__ */ jsx11("h3", { class: "text-lg font-bold text-gray-900 mb-4", children: "Visual Comparison \u2014 Median Salaries" }),
          /* @__PURE__ */ jsxs11("div", { class: "space-y-5", children: [
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsxs11("div", { class: "flex justify-between text-sm font-semibold text-gray-700 mb-1", children: [
                /* @__PURE__ */ jsx11("span", { children: "STEM (all workers)" }),
                /* @__PURE__ */ jsx11("span", { class: "text-emerald-600", children: "$68,976" })
              ] }),
              /* @__PURE__ */ jsx11("div", { class: "w-full bg-gray-100 rounded-full h-7 overflow-hidden", children: /* @__PURE__ */ jsx11("div", { class: "bg-emerald-500 h-7 rounded-full flex items-center pl-3 transition-all", style: "width:76%", children: /* @__PURE__ */ jsx11("span", { class: "text-white text-xs font-bold", children: "76%" }) }) })
            ] }),
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsxs11("div", { class: "flex justify-between text-sm font-semibold text-gray-700 mb-1", children: [
                /* @__PURE__ */ jsx11("span", { children: "Non-STEM (all workers)" }),
                /* @__PURE__ */ jsx11("span", { class: "text-blue-600", children: "$49,903" })
              ] }),
              /* @__PURE__ */ jsx11("div", { class: "w-full bg-gray-100 rounded-full h-7 overflow-hidden", children: /* @__PURE__ */ jsx11("div", { class: "bg-blue-400 h-7 rounded-full flex items-center pl-3 transition-all", style: "width:55%", children: /* @__PURE__ */ jsx11("span", { class: "text-white text-xs font-bold", children: "55%" }) }) })
            ] }),
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsxs11("div", { class: "flex justify-between text-sm font-semibold text-gray-700 mb-1", children: [
                /* @__PURE__ */ jsx11("span", { children: "STEM (bachelor's or higher)" }),
                /* @__PURE__ */ jsx11("span", { class: "text-emerald-700", children: "$89,931" })
              ] }),
              /* @__PURE__ */ jsx11("div", { class: "w-full bg-gray-100 rounded-full h-7 overflow-hidden", children: /* @__PURE__ */ jsx11("div", { class: "bg-emerald-700 h-7 rounded-full flex items-center pl-3 transition-all", style: "width:99%", children: /* @__PURE__ */ jsx11("span", { class: "text-white text-xs font-bold", children: "$89.9K" }) }) })
            ] }),
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsxs11("div", { class: "flex justify-between text-sm font-semibold text-gray-700 mb-1", children: [
                /* @__PURE__ */ jsx11("span", { children: "Non-STEM (bachelor's or higher)" }),
                /* @__PURE__ */ jsx11("span", { class: "text-blue-700", children: "$69,968" })
              ] }),
              /* @__PURE__ */ jsx11("div", { class: "w-full bg-gray-100 rounded-full h-7 overflow-hidden", children: /* @__PURE__ */ jsx11("div", { class: "bg-blue-600 h-7 rounded-full flex items-center pl-3 transition-all", style: "width:77%", children: /* @__PURE__ */ jsx11("span", { class: "text-white text-xs font-bold", children: "$70.0K" }) }) })
            ] }),
            /* @__PURE__ */ jsx11("p", { class: "text-xs text-gray-400 text-right mt-1", children: "Bar widths scaled relative to $90K max. Source: NSF Census data" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs11("div", { class: "border border-emerald-200 rounded-2xl p-5 bg-emerald-50", children: [
            /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2", children: "With a bachelor's degree" }),
            /* @__PURE__ */ jsxs11("div", { class: "flex items-end gap-2", children: [
              /* @__PURE__ */ jsx11("span", { class: "text-3xl font-extrabold text-emerald-700", children: "+$20K" }),
              /* @__PURE__ */ jsx11("span", { class: "text-sm text-emerald-600 pb-1 font-medium", children: "premium for STEM" })
            ] }),
            /* @__PURE__ */ jsx11("p", { class: "text-xs text-gray-500 mt-2", children: "$89,931 (STEM) vs $69,968 (Non-STEM)" }),
            /* @__PURE__ */ jsx11("a", { href: "https://ncses.nsf.gov/pubs/nsb20245/section/18523", target: "_blank", rel: "noopener noreferrer", class: "text-xs text-emerald-600 underline mt-1 block", children: "Source: NSF Census data \u2192" })
          ] }),
          /* @__PURE__ */ jsxs11("div", { class: "border border-indigo-200 rounded-2xl p-5 bg-indigo-50", children: [
            /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2", children: "Numbers aren't everything" }),
            /* @__PURE__ */ jsx11("p", { class: "text-sm text-indigo-800 leading-relaxed", children: "Passion, long-term goals, and mentorship guidance matter just as much as salary expectations when choosing a path." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "rounded-2xl overflow-hidden my-8", children: [
          /* @__PURE__ */ jsx11(
            "img",
            {
              src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
              alt: "Person analyzing salary and career data on laptop",
              class: "w-full h-52 object-cover"
            }
          ),
          /* @__PURE__ */ jsx11("p", { class: "text-center text-xs text-gray-400 mt-2 italic", children: "Understanding salary data helps students make more informed career decisions." })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-6 pt-6 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Sources" }),
          /* @__PURE__ */ jsxs11("ul", { class: "space-y-1 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://ncses.nsf.gov/pubs/nsb20245/figure/LBR-B", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "NSF \u2014 STEM vs Non-STEM earnings figure (NSB 2024)" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://ncses.nsf.gov/pubs/nsb20245/section/18523", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "NSF overview on STEM labor force earnings" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.qooper.io/blog/benefits-of-mentorship", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Modern mentoring benefits for professional growth \u2014 Qooper" }) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx11("article", { id: "post-3", class: "max-w-3xl mx-auto px-4 mt-12 pb-20", children: /* @__PURE__ */ jsxs11("div", { class: "bg-white rounded-3xl shadow-sm overflow-hidden", children: [
      /* @__PURE__ */ jsxs11("div", { class: "relative h-72 overflow-hidden", children: [
        /* @__PURE__ */ jsx11(
          "img",
          {
            src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
            alt: "Professional career growth and mentorship",
            class: "w-full h-full object-cover"
          }
        ),
        /* @__PURE__ */ jsx11("div", { class: "absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" }),
        /* @__PURE__ */ jsxs11("div", { class: "absolute bottom-6 left-8 right-8", children: [
          /* @__PURE__ */ jsx11("span", { class: "bg-purple-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full", children: "Career Outcomes" }),
          /* @__PURE__ */ jsxs11("h2", { class: "text-3xl font-extrabold text-white mt-3 leading-tight", children: [
            "How Mentorship Improves",
            /* @__PURE__ */ jsx11("br", {}),
            "Career Outcomes"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { class: "p-8", children: [
        /* @__PURE__ */ jsx11("p", { class: "text-gray-700 text-base leading-relaxed", children: "You've probably heard that networking matters \u2014 and research supports that having a strong mentor can be one of your best professional moves. The impact stretches far beyond your first job." }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8 space-y-4", children: [
          /* @__PURE__ */ jsxs11("div", { class: "flex gap-4 bg-purple-50 border border-purple-100 rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx11("div", { class: "flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx11("svg", { class: "w-5 h-5 text-purple-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx11("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" }) }) }),
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsx11("p", { class: "font-bold text-gray-900 text-sm", children: "Faster Early Career Progression" }),
              /* @__PURE__ */ jsx11("p", { class: "text-gray-600 text-sm mt-0.5", children: "Mentees who develop relationships with mentors tend to move through their early careers faster and with more confidence than those without this support." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("div", { class: "flex gap-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx11("div", { class: "flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx11("svg", { class: "w-5 h-5 text-indigo-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx11("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" }) }) }),
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsx11("p", { class: "font-bold text-gray-900 text-sm", children: "Education Feels More Meaningful" }),
              /* @__PURE__ */ jsx11("p", { class: "text-gray-600 text-sm mt-0.5", children: "Mentorship helps young people connect education to real career paths, making school more motivating and purposeful for future goals." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs11("div", { class: "flex gap-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-5", children: [
            /* @__PURE__ */ jsx11("div", { class: "flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center", children: /* @__PURE__ */ jsx11("svg", { class: "w-5 h-5 text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx11("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }) }) }),
            /* @__PURE__ */ jsxs11("div", { children: [
              /* @__PURE__ */ jsx11("p", { class: "font-bold text-gray-900 text-sm", children: "Both Sides Grow" }),
              /* @__PURE__ */ jsx11("p", { class: "text-gray-600 text-sm mt-0.5", children: "Mentors experience professional growth too \u2014 finding satisfaction and improvement in leadership abilities from guiding others." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8", children: [
          /* @__PURE__ */ jsx11("h3", { class: "text-lg font-bold text-gray-900 mb-4", children: "Transferable Skills Mentorship Builds" }),
          /* @__PURE__ */ jsx11("div", { class: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: [
            { skill: "Communication", pct: "92", color: "bg-indigo-500" },
            { skill: "Goal-Setting", pct: "87", color: "bg-purple-500" },
            { skill: "Networking", pct: "84", color: "bg-emerald-500" },
            { skill: "Planning", pct: "79", color: "bg-teal-500" },
            { skill: "Confidence", pct: "88", color: "bg-rose-500" },
            { skill: "Self-Efficacy", pct: "81", color: "bg-amber-500" }
          ].map(({ skill, pct, color }) => /* @__PURE__ */ jsxs11("div", { class: "bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center", children: [
            /* @__PURE__ */ jsxs11("div", { class: "relative w-16 h-16 mx-auto mb-2", children: [
              /* @__PURE__ */ jsxs11("svg", { class: "w-16 h-16 -rotate-90", viewBox: "0 0 36 36", children: [
                /* @__PURE__ */ jsx11("circle", { cx: "18", cy: "18", r: "15.9", fill: "none", stroke: "#e5e7eb", "stroke-width": "3" }),
                /* @__PURE__ */ jsx11(
                  "circle",
                  {
                    cx: "18",
                    cy: "18",
                    r: "15.9",
                    fill: "none",
                    stroke: color.replace("bg-", "").replace("-500", ""),
                    "stroke-width": "3",
                    "stroke-dasharray": `${pct} 100`,
                    "stroke-linecap": "round",
                    class: color.replace("bg-", "stroke-")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs11("span", { class: "absolute inset-0 flex items-center justify-center text-sm font-extrabold text-gray-800", children: [
                pct,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx11("p", { class: "text-xs font-semibold text-gray-700", children: skill })
          ] })) }),
          /* @__PURE__ */ jsx11("p", { class: "text-xs text-gray-400 text-center mt-2 italic", children: "Skill improvement rates reported by mentored youth. Source: MENTOR / mentoring.org" })
        ] }),
        /* @__PURE__ */ jsxs11("div", { class: "rounded-2xl overflow-hidden my-8", children: [
          /* @__PURE__ */ jsx11(
            "img",
            {
              src: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80",
              alt: "Students collaborating and building skills",
              class: "w-full h-56 object-cover"
            }
          ),
          /* @__PURE__ */ jsx11("p", { class: "text-center text-xs text-gray-400 mt-2 italic", children: "Mentorship turns uncertainty into direction, and potential into action." })
        ] }),
        /* @__PURE__ */ jsx11("blockquote", { class: "border-l-4 border-purple-400 bg-purple-50 rounded-r-2xl px-6 py-4", children: /* @__PURE__ */ jsx11("p", { class: "text-purple-800 italic text-base font-medium", children: '"In a world where decisions about school, internships, and jobs can make or break a future, mentorship gives students an edge. It turns uncertainty into direction, anxiety into confidence, and potential into action."' }) }),
        /* @__PURE__ */ jsxs11("div", { class: "mt-8 pt-6 border-t border-gray-100", children: [
          /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-2", children: "Sources" }),
          /* @__PURE__ */ jsxs11("ul", { class: "space-y-1 text-xs text-gray-500", children: [
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.mentoring.org/mentoring-impact/", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Research on mentorship's impact on youth outcomes \u2014 mentoring.org" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.evidencebasedmentoring.org/new-study-highlights-the-benefits-of-serving-as-a-mentor/", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Meta-analysis of mentoring benefits \u2014 evidencebasedmentoring.org" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.mentoring.org/wp-content/uploads/2022/03/Issue-Brief-on-Mentoring-and-Career-Exploration-and-Workforce-Development-Final-Draft136142.pdf", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Career exploration and mentoring \u2014 mentoring.org PDF" }) }),
            /* @__PURE__ */ jsx11("li", { children: /* @__PURE__ */ jsx11("a", { href: "https://www.qooper.io/blog/benefits-of-mentorship", target: "_blank", rel: "noopener noreferrer", class: "text-indigo-500 hover:underline", children: "Modern mentoring benefits for professional growth \u2014 qooper.io" }) })
          ] })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx11("div", { class: "max-w-3xl mx-auto px-4 pb-20 mt-12", children: /* @__PURE__ */ jsxs11("div", { class: "bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-center text-white", children: [
      /* @__PURE__ */ jsx11("h2", { class: "text-2xl font-extrabold mb-2", children: "Ready to find your mentor?" }),
      /* @__PURE__ */ jsx11("p", { class: "text-indigo-200 mb-6", children: "Join MentorMatch and get paired with an industry professional who fits your exact goals." }),
      /* @__PURE__ */ jsx11("a", { href: "/register", class: "inline-block bg-white text-indigo-700 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors text-sm", children: "Get Matched for Free" })
    ] }) }),
    /* @__PURE__ */ jsx11("footer", { class: "bg-gray-900 text-white pt-12 pb-8", children: /* @__PURE__ */ jsxs11("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs11("div", { class: "flex flex-col md:flex-row justify-between items-start gap-8 mb-10", children: [
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx11("h3", { class: "text-xl font-extrabold font-sketch mb-2", children: "MentorMatch" }),
          /* @__PURE__ */ jsx11("p", { class: "text-gray-400 text-sm max-w-xs leading-relaxed", children: "Free AI-powered career mentorship connecting students with industry leaders." })
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Navigate" }),
          /* @__PURE__ */ jsxs11("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx11("a", { href: "/", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Home" }),
            /* @__PURE__ */ jsx11("a", { href: "/about", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "About the Founder" }),
            /* @__PURE__ */ jsx11("a", { href: "/how-it-works", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "How It Works" }),
            /* @__PURE__ */ jsx11("a", { href: "/blog", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Blog" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs11("div", { children: [
          /* @__PURE__ */ jsx11("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Platform" }),
          /* @__PURE__ */ jsxs11("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx11("a", { href: "/role-select", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Start Connecting" }),
            /* @__PURE__ */ jsx11("a", { href: "/register?role=student", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Sign Up as Student" }),
            /* @__PURE__ */ jsx11("a", { href: "/register?role=mentor", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Sign Up as Mentor" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs11("div", { class: "border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
        /* @__PURE__ */ jsx11("p", { class: "text-gray-500 text-sm", children: "\xA9 2025 MentorMatch \u2014 Building bridges through conversation" }),
        /* @__PURE__ */ jsxs11("div", { class: "flex gap-5", children: [
          /* @__PURE__ */ jsx11("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors", children: "Privacy" }),
          /* @__PURE__ */ jsx11("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors", children: "Terms" })
        ] })
      ] })
    ] }) })
  ] });
}

// src/pages/how-it-works.tsx
import { jsx as jsx12, jsxs as jsxs12 } from "hono/jsx/jsx-runtime";
function HowItWorksPage() {
  return /* @__PURE__ */ jsxs12("div", { class: "min-h-screen bg-white", children: [
    /* @__PURE__ */ jsx12("nav", { class: "sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm", children: /* @__PURE__ */ jsxs12("div", { class: "max-w-6xl mx-auto px-6 py-3 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx12("a", { href: "/", class: "text-xl font-extrabold tracking-tight text-gray-900 font-sketch", children: "MentorMatch" }),
      /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx12("a", { href: "/", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors", children: "Home" }),
        /* @__PURE__ */ jsx12("a", { href: "/about", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors", children: "About the Founder" }),
        /* @__PURE__ */ jsx12("a", { href: "/how-it-works", class: "px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200", children: "How It Works" }),
        /* @__PURE__ */ jsx12("a", { href: "/blog", class: "px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors", children: "Blog" }),
        /* @__PURE__ */ jsx12("a", { href: "/role-select", class: "ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm", children: "Start Connecting" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs12("div", { class: "bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 text-white pt-20 pb-24 text-center px-6 relative overflow-hidden", children: [
      /* @__PURE__ */ jsx12("div", { class: "absolute -top-20 -right-20 w-72 h-72 bg-white/5 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsx12("div", { class: "absolute -bottom-12 -left-12 w-60 h-60 bg-purple-400/10 rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxs12("div", { class: "relative", children: [
        /* @__PURE__ */ jsx12("span", { class: "inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5", children: "The Platform" }),
        /* @__PURE__ */ jsx12("h1", { class: "text-5xl md:text-6xl font-extrabold font-sketch mb-4 leading-tight", children: "How MentorMatch Works" }),
        /* @__PURE__ */ jsx12("p", { class: "text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed", children: "MentorMatch connects students with experienced mentors from industries across the U.S. Career guidance made accessible, practical, and personalized." })
      ] })
    ] }),
    /* @__PURE__ */ jsx12("div", { class: "bg-white border-b border-gray-100 shadow-sm sticky top-[57px] z-40 overflow-x-auto", children: /* @__PURE__ */ jsxs12("div", { class: "max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-semibold whitespace-nowrap", children: [
      [
        ["1", "Sign Up", "#step-1", "bg-indigo-600"],
        ["2", "Smart Matching", "#step-2", "bg-purple-600"],
        ["3", "Schedule", "#step-3", "bg-emerald-600"],
        ["4", "Learn & Grow", "#step-4", "bg-teal-600"],
        ["5", "Track Progress", "#step-5", "bg-rose-600"],
        ["6", "Improve", "#step-6", "bg-amber-600"]
      ].map(([num, label, href, color]) => /* @__PURE__ */ jsxs12("a", { href, class: `flex items-center gap-1.5 px-3 py-1.5 rounded-full ${color} text-white hover:opacity-90 transition-opacity`, children: [
        /* @__PURE__ */ jsx12("span", { class: "font-extrabold", children: num }),
        /* @__PURE__ */ jsx12("span", { children: label })
      ] })),
      /* @__PURE__ */ jsx12("a", { href: "#faq", class: "flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-700 text-white hover:opacity-90 transition-opacity ml-2", children: /* @__PURE__ */ jsx12("span", { children: "FAQ" }) })
    ] }) }),
    /* @__PURE__ */ jsxs12("div", { class: "max-w-4xl mx-auto px-6 py-16 space-y-20", children: [
      /* @__PURE__ */ jsxs12("section", { id: "step-1", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-indigo-200 flex-shrink-0", children: "1" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("span", { class: "text-xs font-bold text-indigo-500 uppercase tracking-widest", children: "First" }),
            /* @__PURE__ */ jsx12("h2", { class: "text-2xl font-extrabold text-gray-900", children: "Sign Up" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { class: "grid md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs12("div", { class: "bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsx12("svg", { class: "w-5 h-5 text-indigo-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" }) }),
              /* @__PURE__ */ jsx12("span", { class: "font-bold text-indigo-700 text-sm uppercase tracking-wider", children: "Students" })
            ] }),
            /* @__PURE__ */ jsxs12("ul", { class: "space-y-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsxs12("li", { class: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-indigo-400 mt-0.5 flex-shrink-0", children: "\u2192" }),
                "Create a profile with career interests and goals"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-indigo-400 mt-0.5 flex-shrink-0", children: "\u2192" }),
                "Share areas you need help with and availability"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-indigo-400 mt-0.5 flex-shrink-0", children: "\u2192" }),
                "Ages 9 and up \u2014 all career paths welcome"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-2 mb-3", children: [
              /* @__PURE__ */ jsx12("svg", { class: "w-5 h-5 text-purple-500", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }),
              /* @__PURE__ */ jsx12("span", { class: "font-bold text-purple-700 text-sm uppercase tracking-wider", children: "Mentors" })
            ] }),
            /* @__PURE__ */ jsxs12("ul", { class: "space-y-2 text-sm text-gray-700", children: [
              /* @__PURE__ */ jsxs12("li", { class: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-purple-400 mt-0.5 flex-shrink-0", children: "\u2192" }),
                "Detail your experience, expertise, and industry"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-purple-400 mt-0.5 flex-shrink-0", children: "\u2192" }),
                "Select your mentoring topics and availability"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex items-start gap-2", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-purple-400 mt-0.5 flex-shrink-0", children: "\u2192" }),
                "5+ years of professional experience required"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { class: "mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx12("svg", { class: "w-4 h-4 text-amber-500 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }) }),
          /* @__PURE__ */ jsxs12("p", { class: "text-amber-800 text-sm font-medium", children: [
            "Both students and mentors agree to a ",
            /* @__PURE__ */ jsx12("strong", { children: "Code of Conduct" }),
            " to ensure safe, productive, and respectful sessions."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("section", { id: "step-2", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-purple-200 flex-shrink-0", children: "2" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("span", { class: "text-xs font-bold text-purple-500 uppercase tracking-widest", children: "Then" }),
            /* @__PURE__ */ jsx12("h2", { class: "text-2xl font-extrabold text-gray-900", children: "Smart Matching System" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("p", { class: "text-gray-600 mb-6 leading-relaxed", children: [
          "MentorMatch uses an AI-powered algorithm to pair students with their best-fit mentors. Each student receives a ",
          /* @__PURE__ */ jsx12("strong", { children: "compatibility score" }),
          " for every mentor based on 7 weighted categories."
        ] }),
        /* @__PURE__ */ jsxs12("div", { class: "bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 text-white mb-6", children: [
          /* @__PURE__ */ jsx12("p", { class: "text-sm font-bold uppercase tracking-widest opacity-80 mb-4", children: "Compatibility Score Categories" }),
          /* @__PURE__ */ jsx12("div", { class: "space-y-3", children: [
            ["Career Field Alignment", 30, "bg-white/80"],
            ["Role & Industry Relevance", 20, "bg-white/70"],
            ["Mentorship Needs vs Expertise", 15, "bg-white/60"],
            ["Mentor Experience Level", 10, "bg-white/55"],
            ["Personality & Communication Fit", 10, "bg-white/50"],
            ["Availability", 10, "bg-white/45"],
            ["Commitment Level", 5, "bg-white/40"]
          ].map(([label, pts, bar]) => /* @__PURE__ */ jsx12("div", { class: "flex items-center gap-3", children: /* @__PURE__ */ jsxs12("div", { class: "flex-1", children: [
            /* @__PURE__ */ jsxs12("div", { class: "flex justify-between text-xs font-semibold mb-1", children: [
              /* @__PURE__ */ jsx12("span", { class: "opacity-90", children: label }),
              /* @__PURE__ */ jsxs12("span", { class: "opacity-70", children: [
                pts,
                " pts"
              ] })
            ] }),
            /* @__PURE__ */ jsx12("div", { class: "w-full bg-white/20 rounded-full h-2", children: /* @__PURE__ */ jsx12("div", { class: `${bar} h-2 rounded-full`, style: `width:${pts === 30 ? "100%" : pts === 20 ? "67%" : pts === 15 ? "50%" : pts === 10 ? "33%" : "17%"}` }) })
          ] }) })) }),
          /* @__PURE__ */ jsx12("p", { class: "text-xs opacity-60 mt-4 text-right", children: "Total: 100 points = 100% compatibility" })
        ] }),
        /* @__PURE__ */ jsxs12("div", { class: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
          /* @__PURE__ */ jsxs12("div", { class: "bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center", children: [
            /* @__PURE__ */ jsx12("div", { class: "text-lg font-extrabold text-emerald-700", children: "90\u2013100%" }),
            /* @__PURE__ */ jsx12("div", { class: "text-xs font-bold text-emerald-600 mt-0.5", children: "Elite Match" })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center", children: [
            /* @__PURE__ */ jsx12("div", { class: "text-lg font-extrabold text-blue-700", children: "75\u201389%" }),
            /* @__PURE__ */ jsx12("div", { class: "text-xs font-bold text-blue-600 mt-0.5", children: "Strong Match" })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center", children: [
            /* @__PURE__ */ jsx12("div", { class: "text-lg font-extrabold text-amber-700", children: "60\u201374%" }),
            /* @__PURE__ */ jsx12("div", { class: "text-xs font-bold text-amber-600 mt-0.5", children: "Good Match" })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center", children: [
            /* @__PURE__ */ jsx12("div", { class: "text-lg font-extrabold text-gray-600", children: "50\u201359%" }),
            /* @__PURE__ */ jsx12("div", { class: "text-xs font-bold text-gray-500 mt-0.5", children: "Low Compatibility" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("section", { id: "step-3", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-emerald-200 flex-shrink-0", children: "3" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("span", { class: "text-xs font-bold text-emerald-500 uppercase tracking-widest", children: "Next" }),
            /* @__PURE__ */ jsx12("h2", { class: "text-2xl font-extrabold text-gray-900", children: "Schedule a Session" })
          ] })
        ] }),
        /* @__PURE__ */ jsx12("div", { class: "bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-3xl p-6", children: /* @__PURE__ */ jsxs12("div", { class: "grid md:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsxs12("div", { class: "text-center p-4", children: [
            /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx12("svg", { class: "w-6 h-6 text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsx12("h3", { class: "font-bold text-gray-900 text-sm mb-1", children: "Book a Time" }),
            /* @__PURE__ */ jsx12("p", { class: "text-gray-500 text-xs", children: "Students book one-on-one video sessions directly with their matched mentor." })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "text-center p-4", children: [
            /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx12("svg", { class: "w-6 h-6 text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }) }),
            /* @__PURE__ */ jsx12("h3", { class: "font-bold text-gray-900 text-sm mb-1", children: "Get Reminders" }),
            /* @__PURE__ */ jsx12("p", { class: "text-gray-500 text-xs", children: "Both parties receive calendar reminders ahead of each session." })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "text-center p-4", children: [
            /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3", children: /* @__PURE__ */ jsx12("svg", { class: "w-6 h-6 text-emerald-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }) }),
            /* @__PURE__ */ jsx12("h3", { class: "font-bold text-gray-900 text-sm mb-1", children: "Pre-Session Tips" }),
            /* @__PURE__ */ jsx12("p", { class: "text-gray-500 text-xs", children: "Receive pre-session tips to help both sides prepare for a productive discussion." })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs12("section", { id: "step-4", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-teal-200 flex-shrink-0", children: "4" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("span", { class: "text-xs font-bold text-teal-500 uppercase tracking-widest", children: "The Good Part" }),
            /* @__PURE__ */ jsx12("h2", { class: "text-2xl font-extrabold text-gray-900", children: "Learn and Grow" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { class: "grid md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs12("div", { class: "relative overflow-hidden rounded-3xl", children: [
            /* @__PURE__ */ jsx12(
              "img",
              {
                src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80",
                alt: "Student in a career mentorship session",
                class: "w-full h-52 object-cover"
              }
            ),
            /* @__PURE__ */ jsx12("div", { class: "absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" }),
            /* @__PURE__ */ jsxs12("div", { class: "absolute bottom-4 left-4 right-4 text-white", children: [
              /* @__PURE__ */ jsx12("p", { class: "text-sm font-bold", children: "For Students" }),
              /* @__PURE__ */ jsx12("p", { class: "text-xs text-teal-200 mt-0.5", children: "Personalized guidance on careers, internships, resumes, networking, and goal-setting" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "relative overflow-hidden rounded-3xl", children: [
            /* @__PURE__ */ jsx12(
              "img",
              {
                src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80",
                alt: "Professional mentor sharing real-world experience",
                class: "w-full h-52 object-cover"
              }
            ),
            /* @__PURE__ */ jsx12("div", { class: "absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent" }),
            /* @__PURE__ */ jsxs12("div", { class: "absolute bottom-4 left-4 right-4 text-white", children: [
              /* @__PURE__ */ jsx12("p", { class: "text-sm font-bold", children: "For Mentors" }),
              /* @__PURE__ */ jsx12("p", { class: "text-xs text-indigo-200 mt-0.5", children: "Share real-world insights, experience-based advice, and answer the questions that matter most" })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("section", { id: "step-5", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-rose-200 flex-shrink-0", children: "5" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("span", { class: "text-xs font-bold text-rose-500 uppercase tracking-widest", children: "Over Time" }),
            /* @__PURE__ */ jsx12("h2", { class: "text-2xl font-extrabold text-gray-900", children: "Track Progress" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { class: "grid md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxs12("div", { class: "bg-rose-50 border border-rose-100 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs12("h3", { class: "font-bold text-rose-800 mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx12("svg", { class: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" }) }),
              "Student Dashboard"
            ] }),
            /* @__PURE__ */ jsxs12("ul", { class: "space-y-2 text-sm text-rose-900", children: [
              /* @__PURE__ */ jsxs12("li", { class: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-rose-400 flex-shrink-0 mt-0.5", children: "\u2713" }),
                " Track mentorship sessions and outcomes"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-rose-400 flex-shrink-0 mt-0.5", children: "\u2713" }),
                " View session feedback and mentor notes"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-rose-400 flex-shrink-0 mt-0.5", children: "\u2713" }),
                " Monitor growth milestones over time"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "bg-indigo-50 border border-indigo-100 rounded-3xl p-6", children: [
            /* @__PURE__ */ jsxs12("h3", { class: "font-bold text-indigo-800 mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx12("svg", { class: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" }) }),
              "Mentor Dashboard"
            ] }),
            /* @__PURE__ */ jsxs12("ul", { class: "space-y-2 text-sm text-indigo-900", children: [
              /* @__PURE__ */ jsxs12("li", { class: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-indigo-400 flex-shrink-0 mt-0.5", children: "\u2713" }),
                " Monitor mentee engagement and progress"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-indigo-400 flex-shrink-0 mt-0.5", children: "\u2713" }),
                " Provide session feedback and follow-up"
              ] }),
              /* @__PURE__ */ jsxs12("li", { class: "flex gap-2 items-start", children: [
                /* @__PURE__ */ jsx12("span", { class: "text-indigo-400 flex-shrink-0 mt-0.5", children: "\u2713" }),
                " Manage your schedule and bookings"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("section", { id: "step-6", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "flex items-center gap-4 mb-6", children: [
          /* @__PURE__ */ jsx12("div", { class: "w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-amber-200 flex-shrink-0", children: "6" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("span", { class: "text-xs font-bold text-amber-500 uppercase tracking-widest", children: "Always" }),
            /* @__PURE__ */ jsx12("h2", { class: "text-2xl font-extrabold text-gray-900", children: "Continuous Improvement" })
          ] })
        ] }),
        /* @__PURE__ */ jsx12("div", { class: "bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-100 rounded-3xl p-6", children: /* @__PURE__ */ jsxs12("div", { class: "grid md:grid-cols-3 gap-5 text-center", children: [
          /* @__PURE__ */ jsxs12("div", { class: "p-4", children: [
            /* @__PURE__ */ jsx12("div", { class: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsx12("svg", { class: "w-5 h-5 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" }) }) }),
            /* @__PURE__ */ jsx12("p", { class: "font-bold text-gray-800 text-sm", children: "Students Update Goals" }),
            /* @__PURE__ */ jsx12("p", { class: "text-xs text-gray-500 mt-1", children: "Update your interests and preferences as you learn and grow." })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "p-4", children: [
            /* @__PURE__ */ jsx12("div", { class: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsx12("svg", { class: "w-5 h-5 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }) }) }),
            /* @__PURE__ */ jsx12("p", { class: "font-bold text-gray-800 text-sm", children: "Mentors Give Feedback" }),
            /* @__PURE__ */ jsx12("p", { class: "text-xs text-gray-500 mt-1", children: "Session feedback helps refine future pairings and improve outcomes." })
          ] }),
          /* @__PURE__ */ jsxs12("div", { class: "p-4", children: [
            /* @__PURE__ */ jsx12("div", { class: "w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2", children: /* @__PURE__ */ jsx12("svg", { class: "w-5 h-5 text-amber-600", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }) }) }),
            /* @__PURE__ */ jsx12("p", { class: "font-bold text-gray-800 text-sm", children: "AI Gets Smarter" }),
            /* @__PURE__ */ jsx12("p", { class: "text-xs text-gray-500 mt-1", children: "The matching algorithm continuously improves to find better fits as data grows." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs12("div", { class: "mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-3 flex items-center gap-3", children: [
          /* @__PURE__ */ jsx12("svg", { class: "w-4 h-4 text-indigo-400 flex-shrink-0", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx12("path", { "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "2", d: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" }) }),
          /* @__PURE__ */ jsxs12("p", { class: "text-indigo-700 text-sm", children: [
            "Students can request a ",
            /* @__PURE__ */ jsx12("strong", { children: "new match" }),
            " at any time if the current mentor isn't the right fit."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("section", { id: "faq", class: "scroll-mt-28", children: [
        /* @__PURE__ */ jsxs12("div", { class: "text-center mb-8", children: [
          /* @__PURE__ */ jsx12("span", { class: "inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3", children: "Common Questions" }),
          /* @__PURE__ */ jsx12("h2", { class: "text-3xl font-extrabold text-gray-900 font-sketch", children: "Frequently Asked Questions" })
        ] }),
        /* @__PURE__ */ jsx12("div", { class: "space-y-4", children: [
          {
            q: "Who can become a mentor?",
            a: "Professionals with at least 5 years of experience in their industry can volunteer as mentors. CEOs, engineers, artists, doctors, lawyers, athletes \u2014 anyone with real-world expertise is welcome.",
            color: "border-indigo-200 bg-indigo-50",
            label: "bg-indigo-500"
          },
          {
            q: "Who can become a mentee?",
            a: "Students ages 9 and up looking for career guidance, resume help, internship advice, or professional development. All career paths and fields are welcome.",
            color: "border-purple-200 bg-purple-50",
            label: "bg-purple-500"
          },
          {
            q: "How does MentorMatch ensure quality matches?",
            a: "My AI-powered system calculates compatibility scores across 7 categories: career field, role alignment, mentorship needs, experience level, personality fit, availability, and commitment. Students see scores for every mentor and choose who to connect with.",
            color: "border-emerald-200 bg-emerald-50",
            label: "bg-emerald-500"
          },
          {
            q: "How often should I meet with my mentor?",
            a: "Frequency is flexible. Most mentees schedule 1\u20132 sessions per month, but you can adjust based on availability and goals. There's no minimum requirement.",
            color: "border-teal-200 bg-teal-50",
            label: "bg-teal-500"
          },
          {
            q: "Is MentorMatch free?",
            a: "Yes \u2014 all mentorship through MentorMatch is currently 100% free for both students and mentors. Paid or premium features may be introduced in the future, but core mentorship will remain accessible.",
            color: "border-rose-200 bg-rose-50",
            label: "bg-rose-500"
          },
          {
            q: "Can I switch mentors if I need a better match?",
            a: "Yes. Students can request a new match at any time if the current mentor isn't the right fit. The AI system will find updated recommendations based on your current goals.",
            color: "border-amber-200 bg-amber-50",
            label: "bg-amber-500"
          }
        ].map(({ q, a, color, label }) => /* @__PURE__ */ jsx12("div", { class: `border ${color} rounded-2xl p-5`, children: /* @__PURE__ */ jsxs12("div", { class: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsx12("span", { class: `flex-shrink-0 w-5 h-5 ${label} text-white rounded-full flex items-center justify-center text-xs font-extrabold mt-0.5`, children: "Q" }),
          /* @__PURE__ */ jsxs12("div", { children: [
            /* @__PURE__ */ jsx12("p", { class: "font-bold text-gray-900 text-sm mb-1", children: q }),
            /* @__PURE__ */ jsx12("p", { class: "text-gray-600 text-sm leading-relaxed", children: a })
          ] })
        ] }) })) })
      ] }),
      /* @__PURE__ */ jsxs12("section", { class: "bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 rounded-3xl p-10 text-center text-white", children: [
        /* @__PURE__ */ jsx12("h2", { class: "text-3xl font-extrabold mb-3 font-sketch", children: "Ready to get started?" }),
        /* @__PURE__ */ jsx12("p", { class: "text-indigo-200 mb-8 max-w-xl mx-auto", children: "Whether you're a student ready to learn or a professional ready to give back \u2014 start your mentorship journey today." }),
        /* @__PURE__ */ jsx12(
          "a",
          {
            href: "/role-select",
            class: "inline-block bg-white text-indigo-700 font-extrabold px-10 py-4 rounded-2xl text-lg hover:bg-indigo-50 transition-colors shadow-lg",
            children: "Find a Mentor \u2192"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx12("footer", { class: "bg-gray-900 text-white pt-12 pb-8", children: /* @__PURE__ */ jsxs12("div", { class: "max-w-5xl mx-auto px-6", children: [
      /* @__PURE__ */ jsxs12("div", { class: "flex flex-col md:flex-row justify-between items-start gap-8 mb-10", children: [
        /* @__PURE__ */ jsxs12("div", { children: [
          /* @__PURE__ */ jsx12("h3", { class: "text-xl font-extrabold font-sketch mb-2", children: "MentorMatch" }),
          /* @__PURE__ */ jsx12("p", { class: "text-gray-400 text-sm max-w-xs leading-relaxed", children: "Free AI-powered career mentorship connecting students with industry leaders." })
        ] }),
        /* @__PURE__ */ jsxs12("div", { children: [
          /* @__PURE__ */ jsx12("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Navigate" }),
          /* @__PURE__ */ jsxs12("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx12("a", { href: "/", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Home" }),
            /* @__PURE__ */ jsx12("a", { href: "/about", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "About the Founder" }),
            /* @__PURE__ */ jsx12("a", { href: "/how-it-works", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "How It Works" }),
            /* @__PURE__ */ jsx12("a", { href: "/blog", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Blog" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs12("div", { children: [
          /* @__PURE__ */ jsx12("p", { class: "text-xs font-bold text-gray-500 uppercase tracking-widest mb-3", children: "Platform" }),
          /* @__PURE__ */ jsxs12("div", { class: "flex flex-col gap-2", children: [
            /* @__PURE__ */ jsx12("a", { href: "/role-select", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Start Connecting" }),
            /* @__PURE__ */ jsx12("a", { href: "/register?role=student", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Sign Up as Student" }),
            /* @__PURE__ */ jsx12("a", { href: "/register?role=mentor", class: "text-gray-300 hover:text-white text-sm font-medium transition-colors", children: "Sign Up as Mentor" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs12("div", { class: "border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3", children: [
        /* @__PURE__ */ jsx12("p", { class: "text-gray-500 text-sm", children: "\xA9 2025 MentorMatch \u2014 Building bridges through conversation" }),
        /* @__PURE__ */ jsxs12("div", { class: "flex gap-5", children: [
          /* @__PURE__ */ jsx12("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors", children: "Privacy" }),
          /* @__PURE__ */ jsx12("a", { href: "#", class: "text-gray-500 hover:text-gray-300 text-xs transition-colors", children: "Terms" })
        ] })
      ] })
    ] }) })
  ] });
}

// src/lib/auth.ts
import * as bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
var bcrypt = bcryptjs.default ?? bcryptjs;
var RegisterSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  role: z.enum(["student", "mentor"], {
    errorMap: () => ({ message: "Role must be either student or mentor" })
  }),
  // Student fields
  age: z.number().optional(),
  school: z.string().optional(),
  gradeLevel: z.string().optional(),
  linkedinUrl: z.string().optional(),
  careerField: z.string().optional(),
  dreamRole: z.string().optional(),
  careerInterestWhy: z.string().optional(),
  helpNeeded: z.string().optional(),
  meetingFrequency: z.string().optional(),
  willingToPrepare: z.boolean().optional(),
  adviceStyle: z.string().optional(),
  personalityType: z.string().optional(),
  // Mentor fields
  company: z.string().optional(),
  position: z.string().optional(),
  industry: z.string().optional(),
  experienceYears: z.number().optional(),
  shortBio: z.string().optional(),
  mentorTopics: z.string().optional(),
  industriesWorked: z.string().optional(),
  maxMentees: z.number().optional(),
  preferredMeetingFreq: z.string().optional(),
  virtualOrInperson: z.string().optional(),
  whyMentor: z.string().optional(),
  hadMentors: z.string().optional()
});
var LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required")
});
var UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  industry: z.string().optional(),
  experienceYears: z.number().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.number().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  companySize: z.enum(["startup", "small", "medium", "large", "enterprise"]).optional(),
  timezone: z.string().optional(),
  languages: z.array(z.string()).optional()
});
async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}
function generateToken(payload, secret, expiresIn = "7d") {
  return jwt.sign(payload, secret, { expiresIn });
}
function verifyToken(token, secret) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}
function generateId() {
  return crypto.randomUUID().replace(/-/g, "");
}
function extractBearerToken(authHeader) {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.substring(7);
}
var BAD_PATTERNS = [
  // profanity — catch root word anywhere in the string
  /fuck/i,
  /shit/i,
  /bitch/i,
  /asshole/i,
  /nigga/i,
  /nigger/i,
  /cunt/i,
  /whore/i,
  /faggot/i,
  /fag\b/i,
  // sexually explicit
  /porn/i,
  /\bxxx\b/i,
  /\bnude(s)?\b/i,
  /\bnaked\b/i,
  /onlyfan/i,
  // obvious keyboard spam (whole-field junk)
  /^[qwerty\s]{6,}$/i,
  /^[asdfgh\s]{6,}$/i,
  /^[zxcvbn\s]{6,}$/i,
  // troll / joke signals
  /\bfake\s*(user|name|account)\b/i,
  // repeated laugh/nonsense: lol lol, haha haha, lolol, hahaha, etc.
  /(lol\s*){2,}/i,
  /(haha)+/i,
  /(blah\s*){2,}/i,
  /lolol/i,
  // hate / explicit threats
  /i\s*will\s*kill/i,
  /kill\s*(all|them|you)/i,
  /terroris/i,
  // obviously not real (whole-field)
  /^\s*n\/?a\s*$/i,
  /^\s*none\s*$/i,
  /^\s*idk\s*$/i,
  /^\s*dumb\s*$/i,
  /^\s*stupid\s*$/i,
  /^\s*whatever\s*$/i,
  /^\s*asdf\s*$/i,
  /^\s*qwerty\s*$/i
];
var JUNK_REPEAT = /(.)\1{6,}/;
function isFlagged(value) {
  if (!value) return false;
  const v = value.trim();
  if (JUNK_REPEAT.test(v)) return true;
  return BAD_PATTERNS.some((p) => p.test(v));
}
function moderateRegistration(data) {
  const fieldsToCheck = [
    data.name,
    data.email,
    data.school,
    data.company,
    data.position,
    data.shortBio,
    data.whyMentor,
    data.dreamRole,
    data.careerInterestWhy,
    data.helpNeeded
  ];
  for (const field of fieldsToCheck) {
    if (isFlagged(field)) {
      return { flagged: true, reason: "Account flagged for inappropriate or fake content." };
    }
  }
  return { flagged: false, reason: "" };
}
var UserService = class {
  constructor(db2) {
    this.db = db2;
  }
  async createUser(userData) {
    const mod = moderateRegistration(userData);
    const userId = generateId();
    const passwordHash = await hashPassword(userData.password);
    const user = await this.db.prepare(`
        INSERT INTO users (
          id, email, password_hash, name, role,
          age, school, grade_level, linkedin_url,
          career_field, dream_role, career_interest_why, help_needed,
          meeting_frequency, willing_to_prepare, advice_style, personality_type,
          company, position, industry, experience_years,
          short_bio, mentor_topics, industries_worked, max_mentees,
          preferred_meeting_freq, virtual_or_inperson, why_mentor, had_mentors
        ) VALUES (
          ?, ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?,
          ?, ?, ?, ?
        )
        RETURNING *
      `).bind(
      userId,
      userData.email.toLowerCase(),
      passwordHash,
      userData.name,
      userData.role,
      userData.age || null,
      userData.school || null,
      userData.gradeLevel || null,
      userData.linkedinUrl || null,
      userData.careerField || null,
      userData.dreamRole || null,
      userData.careerInterestWhy || null,
      userData.helpNeeded || null,
      userData.meetingFrequency || null,
      userData.willingToPrepare ? 1 : 0,
      userData.adviceStyle || null,
      userData.personalityType || null,
      userData.company || null,
      userData.position || null,
      userData.industry || null,
      userData.experienceYears || null,
      userData.shortBio || null,
      userData.mentorTopics || null,
      userData.industriesWorked || null,
      userData.maxMentees || null,
      userData.preferredMeetingFreq || null,
      userData.virtualOrInperson || null,
      userData.whyMentor || null,
      userData.hadMentors || null
    ).first();
    if (!user) {
      throw new Error("Failed to create user");
    }
    if (mod.flagged) {
      await this.db.prepare(
        `UPDATE users SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
      ).bind(userId).run();
      user.is_active = 0;
    }
    const { password_hash, ...userWithoutPassword } = user;
    return this.formatUser(userWithoutPassword);
  }
  async verifyUserPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }
  async findUserByEmail(email) {
    const user = await this.db.prepare(`
      SELECT * FROM users WHERE email = ? AND is_active = 1
    `).bind(email.toLowerCase()).first();
    if (!user) return null;
    const { password_hash, ...userWithoutPassword } = user;
    return {
      ...this.formatUser(userWithoutPassword),
      passwordHash: password_hash
    };
  }
  async findUserById(id) {
    const user = await this.db.prepare(`
      SELECT * FROM users WHERE id = ? AND is_active = 1
    `).bind(id).first();
    if (!user) return null;
    const { password_hash, ...userWithoutPassword } = user;
    return this.formatUser(userWithoutPassword);
  }
  async updateUser(id, updates) {
    const updateFields = [];
    const values = [];
    for (const [key, value] of Object.entries(updates)) {
      if (value !== void 0) {
        const dbKey = this.camelToSnake(key);
        updateFields.push(`${dbKey} = ?`);
        values.push(value);
      }
    }
    if (updateFields.length === 0) {
      return this.findUserById(id);
    }
    updateFields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);
    await this.db.prepare(`
      UPDATE users SET ${updateFields.join(", ")} WHERE id = ?
    `).bind(...values).run();
    return this.findUserById(id);
  }
  async updateUserStatus(id, isOnline) {
    await this.db.prepare(`
      UPDATE users SET is_online = ?, last_seen = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(isOnline ? 1 : 0, id).run();
  }
  async searchUsers(role, filters) {
    let query = "SELECT * FROM users WHERE role = ? AND is_active = 1";
    const params = [role];
    if (filters?.industry) {
      query += " AND industry = ?";
      params.push(filters.industry);
    }
    if (filters?.experienceYears !== void 0) {
      query += " AND experience_years >= ?";
      params.push(filters.experienceYears);
    }
    if (filters?.isOnline) {
      query += " AND is_online = 1";
    }
    query += " ORDER BY last_seen DESC LIMIT 50";
    const users = await this.db.prepare(query).bind(...params).all();
    return users.results.map((user) => {
      const { password_hash, ...userWithoutPassword } = user;
      return this.formatUser(userWithoutPassword);
    });
  }
  formatUser(user) {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      bio: user.bio,
      company: user.company,
      position: user.position,
      industry: user.industry,
      experienceYears: user.experience_years,
      university: user.university,
      major: user.major,
      graduationYear: user.graduation_year,
      linkedinUrl: user.linkedin_url,
      websiteUrl: user.website_url,
      avatarUrl: user.avatar_url,
      verificationStatus: user.verification_status,
      isActive: user.is_active,
      isOnline: user.is_online,
      lastSeen: user.last_seen,
      timezone: user.timezone,
      languages: user.languages ? JSON.parse(user.languages) : [],
      totalConversations: user.total_conversations,
      averageRating: user.average_rating,
      totalRatingCount: user.total_rating_count,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
      emailVerifiedAt: user.email_verified_at,
      // student matching fields
      careerField: user.career_field,
      dreamRole: user.dream_role,
      careerInterestWhy: user.career_interest_why,
      helpNeeded: user.help_needed,
      meetingFrequency: user.meeting_frequency,
      willingToPrepare: user.willing_to_prepare,
      adviceStyle: user.advice_style,
      personalityType: user.personality_type,
      school: user.school,
      gradeLevel: user.grade_level,
      age: user.age,
      // mentor matching fields
      shortBio: user.short_bio,
      mentorTopics: user.mentor_topics,
      industriesWorked: user.industries_worked,
      maxMentees: user.max_mentees,
      preferredMeetingFreq: user.preferred_meeting_freq,
      virtualOrInperson: user.virtual_or_inperson,
      whyMentor: user.why_mentor,
      hadMentors: user.had_mentors
    };
  }
  camelToSnake(str) {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
};
var SessionService = class {
  constructor(db2, jwtSecret) {
    this.db = db2;
    this.jwtSecret = jwtSecret;
  }
  async createSession(userId, ipAddress, userAgent) {
    const sessionId = generateId();
    const secret = this.jwtSecret || "convoconnect-fallback-secret";
    const token = generateToken({ sessionId, userId }, secret);
    const tokenHash = await hashPassword(token);
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1e3);
    await this.db.prepare(`
      INSERT INTO user_sessions (id, user_id, token_hash, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(sessionId, userId, tokenHash, expiresAt.toISOString(), ipAddress, userAgent).run();
    return token;
  }
  async validateSession(token) {
    const secret = this.jwtSecret || "convoconnect-fallback-secret";
    const payload = verifyToken(token, secret);
    if (!payload || !payload.sessionId) {
      return null;
    }
    const session = await this.db.prepare(`
      SELECT * FROM user_sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP
    `).bind(payload.sessionId).first();
    if (!session) {
      return null;
    }
    await this.db.prepare(`
      UPDATE user_sessions SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(payload.sessionId).run();
    const userService = new UserService(this.db);
    return userService.findUserById(session.user_id);
  }
  async deleteSession(sessionId) {
    await this.db.prepare(`
      DELETE FROM user_sessions WHERE id = ?
    `).bind(sessionId).run();
  }
  async deleteAllUserSessions(userId) {
    await this.db.prepare(`
      DELETE FROM user_sessions WHERE user_id = ?
    `).bind(userId).run();
  }
  async cleanupExpiredSessions() {
    await this.db.prepare(`
      DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP
    `).run();
  }
};

// src/lib/signaling.ts
var MatchingQueue = class {
  studentQueue = [];
  ceoQueue = [];
  async join(userId, userName, role, preferences) {
    const entry = {
      userId,
      userName,
      preferences: preferences || {},
      joinedAt: Date.now()
    };
    if (role === "student") {
      if (this.ceoQueue.length > 0) {
        const ceo = this.ceoQueue.shift();
        return this.createMatch(entry, ceo);
      }
      this.studentQueue.push(entry);
      return {
        status: "queued",
        position: this.studentQueue.length,
        queueType: "student"
      };
    } else {
      if (this.studentQueue.length > 0) {
        const student = this.studentQueue.shift();
        return this.createMatch(student, entry);
      }
      this.ceoQueue.push(entry);
      return {
        status: "queued",
        position: this.ceoQueue.length,
        queueType: "ceo"
      };
    }
  }
  async leave(userId) {
    this.studentQueue = this.studentQueue.filter((u) => u.userId !== userId);
    this.ceoQueue = this.ceoQueue.filter((u) => u.userId !== userId);
    return { status: "left" };
  }
  getStatus() {
    return {
      studentsInQueue: this.studentQueue.length,
      ceosInQueue: this.ceoQueue.length
    };
  }
  createMatch(student, ceo) {
    const roomId = crypto.randomUUID();
    return {
      status: "matched",
      match: {
        roomId,
        matchType: "student-ceo",
        student: { userId: student.userId, userName: student.userName },
        ceo: { userId: ceo.userId, userName: ceo.userName },
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      }
    };
  }
};
var matchingQueue = new MatchingQueue();

// src/lib/matching.ts
var CAREER_FIELD_TO_INDUSTRY = {
  tech: ["technology"],
  medicine: ["medicine"],
  law: ["law"],
  business: ["business", "finance"],
  sports: ["sports"],
  engineering: ["engineering"],
  science: ["science"],
  education: ["education"],
  media: ["media"],
  nonprofit: ["nonprofit"],
  government: ["government"]
};
var RELATED_PAIRS = [
  ["tech", "engineering"],
  ["tech", "science"],
  ["medicine", "science"],
  ["medicine", "engineering"],
  ["business", "law"],
  ["sports", "business"],
  ["engineering", "science"]
];
function careerFieldScore(studentField, mentorIndustry) {
  if (!studentField || !mentorIndustry) return 0;
  const sf = studentField.toLowerCase();
  const mi = mentorIndustry.toLowerCase();
  const exactIndustries = CAREER_FIELD_TO_INDUSTRY[sf] || [sf];
  if (exactIndustries.includes(mi)) return 30;
  for (const [a, b] of RELATED_PAIRS) {
    const aIndustries = CAREER_FIELD_TO_INDUSTRY[a] || [a];
    const bIndustries = CAREER_FIELD_TO_INDUSTRY[b] || [b];
    if (exactIndustries.some((x) => aIndustries.includes(x)) && bIndustries.includes(mi) || exactIndustries.some((x) => bIndustries.includes(x)) && aIndustries.includes(mi)) {
      return 20;
    }
  }
  const broadGroups = [
    ["tech", "engineering", "science"],
    ["medicine", "science", "engineering"],
    ["business", "law", "nonprofit", "government"],
    ["sports", "media", "business"],
    ["education", "nonprofit"]
  ];
  for (const group of broadGroups) {
    const groupIndustries = group.flatMap((g) => CAREER_FIELD_TO_INDUSTRY[g] || [g]);
    if (exactIndustries.some((x) => groupIndustries.includes(x)) && groupIndustries.includes(mi)) {
      return 10;
    }
  }
  return 0;
}
function roleAlignmentScore(dreamRole, mentor) {
  if (!dreamRole) return 0;
  const dr = dreamRole.toLowerCase();
  const pos = (mentor.position || "").toLowerCase();
  const bio = (mentor.shortBio || "").toLowerCase();
  const industries = (mentor.industriesWorked || "").toLowerCase();
  const combined = `${pos} ${bio} ${industries} ${mentor.industry || ""}`;
  const roleKeywords = dr.split(/[\s,\/\-]+/).filter((w) => w.length > 3);
  const directHits = roleKeywords.filter((kw) => combined.includes(kw)).length;
  if (directHits >= 2 || combined.includes(dr)) return 20;
  if (directHits === 1) return 15;
  const mentorIndustry = (mentor.industry || "").toLowerCase();
  const sfToIndustry = Object.entries(CAREER_FIELD_TO_INDUSTRY);
  for (const [sf, inds] of sfToIndustry) {
    if (inds.includes(mentorIndustry)) {
      return 8;
    }
  }
  return 0;
}
function needsMatchScore(studentHelp, mentorTopics) {
  if (!studentHelp || !mentorTopics) return 0;
  const TOPIC_MAP = {
    "choosing-major": ["college-pathway", "career-entry"],
    "resume-building": ["resume-review", "career-entry"],
    "internship-advice": ["career-entry", "industry-insights"],
    "college-preparation": ["college-pathway", "career-entry"],
    "networking": ["industry-insights", "leadership", "career-entry"],
    "starting-business": ["entrepreneurship", "leadership"],
    "career-clarity": ["career-entry", "industry-insights", "college-pathway"],
    "interview-prep": ["interview-prep", "career-entry"],
    "leadership-skills": ["leadership", "entrepreneurship"]
  };
  const studentNeeds = studentHelp.split(",").map((s) => s.trim()).filter(Boolean);
  const mentorTopicList = mentorTopics.split(",").map((s) => s.trim()).filter(Boolean);
  let matched = 0;
  for (const need of studentNeeds) {
    const relevantTopics = TOPIC_MAP[need] || [need];
    if (relevantTopics.some((t) => mentorTopicList.includes(t))) {
      matched++;
    }
  }
  const total = studentNeeds.length;
  if (total === 0) return 0;
  const ratio = matched / total;
  if (ratio >= 0.9) return 15;
  if (ratio >= 0.6) return 10;
  if (ratio >= 0.2) return 5;
  return 0;
}
function experienceScore(years) {
  if (!years) return 5;
  if (years >= 10) return 10;
  if (years >= 5) return 8;
  return 5;
}
function personalityScore(studentStyle, studentPersonality, mentor) {
  const mentorStyle = mentor.adviceStyle;
  const mentorPersonality = mentor.personalityType;
  let score = 0;
  if (studentStyle && mentorStyle) {
    if (studentStyle === mentorStyle) score += 5;
    else score += 2;
  } else {
    score += 3;
  }
  if (studentPersonality && mentorPersonality) {
    if (studentPersonality === mentorPersonality) score += 5;
    else if (studentPersonality === "balanced" || mentorPersonality === "balanced") score += 4;
    else score += 1;
  } else {
    score += 4;
  }
  return Math.min(score, 10);
}
function availabilityScore(studentFreq, mentorFreq) {
  if (!studentFreq || !mentorFreq) return 5;
  if (mentorFreq === "flexible") return 10;
  if (studentFreq === mentorFreq) return 10;
  const compatible = [
    ["monthly", "bi-weekly"],
    ["bi-weekly", "monthly"]
  ];
  if (compatible.some(([a, b]) => studentFreq === a && mentorFreq === b)) return 5;
  return 0;
}
function commitmentScore(studentWilling, mentor) {
  const studentCommitted = studentWilling === true || studentWilling === 1;
  const mentorBio = (mentor.whyMentor || "").trim();
  const mentorCommitted = mentorBio.length > 50 && (mentor.mentorTopics || "").length > 0;
  if (studentCommitted && mentorCommitted) return 5;
  if (studentCommitted || mentorCommitted) return 2;
  return 0;
}
function getTier(score) {
  if (score >= 90) return "Elite Match";
  if (score >= 75) return "Strong Match";
  if (score >= 60) return "Good Match";
  return "Low Compatibility";
}
function calculateMatchScore(student, mentor) {
  const careerField = careerFieldScore(student.careerField, mentor.industry);
  const roleAlignment = roleAlignmentScore(student.dreamRole, mentor);
  const needsMatch = needsMatchScore(student.helpNeeded, mentor.mentorTopics);
  const experience = experienceScore(mentor.experienceYears);
  const personality = personalityScore(student.adviceStyle, student.personalityType, mentor);
  const availability = availabilityScore(student.meetingFrequency, mentor.preferredMeetingFreq);
  const commitment = commitmentScore(student.willingToPrepare, mentor);
  const score = careerField + roleAlignment + needsMatch + experience + personality + availability + commitment;
  return {
    mentor,
    score: Math.min(score, 100),
    tier: getTier(score),
    breakdown: { careerField, roleAlignment, needsMatch, experience, personality, availability, commitment }
  };
}
function rankMentors(student, mentors) {
  return mentors.map((m) => calculateMatchScore(student, m)).sort((a, b) => b.score - a.score);
}

// src/lib/verification.ts
function isValidLinkedInUrl(url) {
  if (!url || url.trim() === "") return false;
  try {
    const parsed = new URL(url.trim());
    return parsed.hostname.includes("linkedin.com");
  } catch {
    return false;
  }
}
function evaluateMentor(mentor) {
  const topics = (mentor.mentor_topics || "").split(",").map((t) => t.trim()).filter((t) => t.length > 0);
  const checks = {
    hasName: !!(mentor.name && mentor.name.trim().length >= 2),
    hasPositionAndCompany: !!(mentor.position?.trim() && mentor.company?.trim()),
    hasMinExperience: !!(mentor.experience_years && mentor.experience_years >= 5),
    hasLinkedIn: isValidLinkedInUrl(mentor.linkedin_url),
    hasEnoughTopics: topics.length >= 3,
    hasIndustry: !!(mentor.industry && mentor.industry.trim().length > 0)
  };
  const failReasons = [];
  if (!checks.hasName) failReasons.push("Missing or invalid full name");
  if (!checks.hasPositionAndCompany) failReasons.push("Missing current job title or company");
  if (!checks.hasMinExperience) {
    const yrs = mentor.experience_years;
    failReasons.push(
      yrs === null || yrs === void 0 ? "Years of experience not provided" : `Insufficient experience: ${yrs} year(s) (minimum 5 required)`
    );
  }
  if (!checks.hasLinkedIn) failReasons.push("LinkedIn URL missing or invalid (must be a linkedin.com URL)");
  if (!checks.hasEnoughTopics) failReasons.push(`Only ${topics.length} mentorship topic(s) provided (minimum 3 required)`);
  if (!checks.hasIndustry) failReasons.push("No industry selected");
  const passed = Object.values(checks).every(Boolean);
  let reportForAdmin = null;
  if (!passed) {
    reportForAdmin = {
      mentorId: mentor.id,
      name: mentor.name,
      linkedinUrl: mentor.linkedin_url || null,
      yearsExperience: mentor.experience_years || null,
      mentorTopics: topics,
      industry: mentor.industry || null,
      position: mentor.position || null,
      company: mentor.company || null,
      inconsistencies: failReasons,
      reviewedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  return {
    mentorId: mentor.id,
    mentorName: mentor.name,
    passed,
    checks,
    failReasons,
    reportForAdmin
  };
}
function buildApprovalEmail(mentorName) {
  return {
    subject: "Mentor Application Approved \u2013 Schedule Your Interview",
    body: `Congratulations ${mentorName}!

Your MentorMatch application has been approved based on your portfolio and profile.
The next step is a short interview to confirm fit.

Please email ebonthecam@gmail.com to schedule your interview.

We look forward to speaking with you!

\u2014 The MentorMatch Team`
  };
}

// src/index.tsx
import { jsx as jsx13 } from "hono/jsx/jsx-runtime";
var app = new Hono();
app.use("/api/*", cors({
  origin: "*",
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowHeaders: ["Content-Type", "Authorization"]
}));
app.use("/ws/*", cors({
  origin: "*",
  allowMethods: ["GET"],
  allowHeaders: ["Upgrade", "Connection", "Sec-WebSocket-Key", "Sec-WebSocket-Version"]
}));
var _localDB = getLocalDB();
app.use(async (c, next) => {
  if (!c.env.DB) {
    c.env.DB = _localDB;
  }
  await next();
});
app.use(renderer);
var authMiddleware = async (c, next) => {
  try {
    const token = extractBearerToken(c.req.header("Authorization"));
    if (!token) {
      return c.json({ error: "Authentication required" }, 401);
    }
    if (!c.env.DB) {
      console.error("Database not available in authMiddleware");
      return c.json({ error: "Database connection error" }, 500);
    }
    const sessionService = new SessionService(c.env.DB, c.env.JWT_SECRET);
    const user = await sessionService.validateSession(token);
    if (!user) {
      return c.json({ error: "Invalid or expired session" }, 401);
    }
    c.set("user", user);
    await next();
  } catch (error) {
    console.error("Authentication error in authMiddleware:", error);
    return c.json({ error: "Authentication failed", details: error.message }, 500);
  }
};
var pageAuthMiddleware = async (c, next) => {
  try {
    const token = getCookie(c, "auth-token") || extractBearerToken(c.req.header("Authorization"));
    if (!token) {
      return c.redirect("/login");
    }
    if (!c.env.DB) {
      console.error("Database not available in pageAuthMiddleware");
      return c.redirect("/login");
    }
    const sessionService = new SessionService(c.env.DB, c.env.JWT_SECRET);
    const user = await sessionService.validateSession(token);
    if (!user) {
      return c.redirect("/login");
    }
    c.set("user", user);
    await next();
  } catch (error) {
    console.error("Authentication error in pageAuthMiddleware:", error);
    return c.redirect("/login");
  }
};
app.get("/", (c) => {
  return c.render(/* @__PURE__ */ jsx13(LandingPage, {}));
});
app.get("/login", (c) => {
  return c.render(/* @__PURE__ */ jsx13(LoginPage, {}));
});
app.get("/register", (c) => {
  return c.render(/* @__PURE__ */ jsx13(RegisterPage, {}));
});
app.get("/about", (c) => {
  return c.render(/* @__PURE__ */ jsx13(AboutPage, {}));
});
app.get("/role-select", (c) => {
  return c.render(/* @__PURE__ */ jsx13(RoleSelectPage, {}));
});
app.get("/blog", (c) => {
  return c.render(/* @__PURE__ */ jsx13(BlogPage, {}));
});
app.get("/how-it-works", (c) => {
  return c.render(/* @__PURE__ */ jsx13(HowItWorksPage, {}));
});
app.get("/dashboard", pageAuthMiddleware, (c) => {
  const user = c.get("user");
  return c.render(/* @__PURE__ */ jsx13(DashboardPage, { user }));
});
app.get("/profile", pageAuthMiddleware, (c) => {
  const user = c.get("user");
  return c.render(/* @__PURE__ */ jsx13(ProfilePage, { user }));
});
app.get("/video-call/:roomId", pageAuthMiddleware, (c) => {
  const user = c.get("user");
  const roomId = c.req.param("roomId");
  return c.render(/* @__PURE__ */ jsx13(VideoCallPage, { user, roomId }));
});
app.get("/donation", pageAuthMiddleware, (c) => {
  const user = c.get("user");
  return c.render(/* @__PURE__ */ jsx13(DonationPage, {}));
});
app.post("/api/auth/register", async (c) => {
  try {
    const body = await c.req.json();
    const userData = RegisterSchema.parse(body);
    const userService = new UserService(c.env.DB);
    const existingUser = await userService.findUserByEmail(userData.email);
    if (existingUser) {
      return c.json({ error: "Email already registered" }, 400);
    }
    const user = await userService.createUser(userData);
    let verificationResult = null;
    if (userData.role === "mentor") {
      const evalResult = evaluateMentor({
        id: user.id,
        name: user.name,
        position: userData.position,
        company: userData.company,
        experience_years: userData.experienceYears,
        linkedin_url: userData.linkedinUrl,
        mentor_topics: userData.mentorTopics,
        industry: userData.industry
      });
      verificationResult = evalResult;
      if (evalResult.passed) {
        await c.env.DB.prepare(
          `UPDATE users SET verification_status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(user.id).run();
        user.verificationStatus = "approved";
      }
    }
    const sessionService = new SessionService(c.env.DB, c.env.JWT_SECRET);
    const token = await sessionService.createSession(
      user.id,
      c.req.header("x-forwarded-for"),
      c.req.header("User-Agent")
    );
    return c.json({
      success: true,
      user,
      token,
      ...verificationResult ? { verificationResult } : {}
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.issues) {
      return c.json({
        error: "Validation failed",
        issues: error.issues
      }, 400);
    }
    return c.json({
      error: "Registration failed",
      message: error.message
    }, 500);
  }
});
app.post("/api/auth/login", async (c) => {
  try {
    const body = await c.req.json();
    const loginData = LoginSchema.parse(body);
    const userService = new UserService(c.env.DB);
    const userWithPassword = await userService.findUserByEmail(loginData.email);
    if (!userWithPassword) {
      return c.json({ error: "Invalid email or password" }, 401);
    }
    const isValidPassword = await userService.verifyUserPassword(loginData.password, userWithPassword.passwordHash);
    if (!isValidPassword) {
      return c.json({ error: "Invalid email or password" }, 401);
    }
    await userService.updateUserStatus(userWithPassword.id, true);
    const sessionService = new SessionService(c.env.DB, c.env.JWT_SECRET);
    const token = await sessionService.createSession(
      userWithPassword.id,
      c.req.header("x-forwarded-for"),
      c.req.header("User-Agent")
    );
    const { passwordHash, ...user } = userWithPassword;
    return c.json({
      success: true,
      user,
      token
    });
  } catch (error) {
    console.error("Login error:", error);
    if (error.issues) {
      return c.json({
        error: "Validation failed",
        issues: error.issues
      }, 400);
    }
    return c.json({
      error: "Login failed",
      message: error.message
    }, 500);
  }
});
app.post("/api/auth/logout", authMiddleware, async (c) => {
  const user = c.get("user");
  const userService = new UserService(c.env.DB);
  await userService.updateUserStatus(user.id, false);
  return c.json({ success: true });
});
app.get("/api/auth/me", authMiddleware, async (c) => {
  const user = c.get("user");
  return c.json({ user });
});
app.get("/api/auth/debug", (c) => {
  const cookieHeader = c.req.header("Cookie");
  const authHeader = c.req.header("Authorization");
  const cookieToken = getCookie(c, "auth-token");
  return c.json({
    cookieHeader,
    authHeader,
    cookieToken,
    hasDB: !!c.env.DB,
    hasJWTSecret: !!c.env.JWT_SECRET
  });
});
app.put("/api/profile", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const body = await c.req.json();
    const updates = UpdateProfileSchema.parse(body);
    const userService = new UserService(c.env.DB);
    const updatedUser = await userService.updateUser(user.id, updates);
    if (!updatedUser) {
      return c.json({ error: "User not found" }, 404);
    }
    return c.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile update error:", error);
    if (error.issues) {
      return c.json({
        error: "Validation failed",
        issues: error.issues
      }, 400);
    }
    return c.json({
      error: "Profile update failed",
      message: error.message
    }, 500);
  }
});
app.post("/api/matching/join", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const { preferences } = await c.req.json();
    const result = await matchingQueue.join(
      user.id,
      user.name,
      user.role,
      preferences || {}
    );
    return c.json(result);
  } catch (error) {
    console.error("Matching error:", error);
    return c.json({
      error: "Failed to join queue",
      message: error.message
    }, 500);
  }
});
app.post("/api/matching/leave", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const result = await matchingQueue.leave(user.id);
    return c.json(result);
  } catch (error) {
    console.error("Leave queue error:", error);
    return c.json({
      error: "Failed to leave queue",
      message: error.message
    }, 500);
  }
});
app.get("/api/matching/status", async (c) => {
  try {
    return c.json(matchingQueue.getStatus());
  } catch (error) {
    console.error("Queue status error:", error);
    return c.json({
      error: "Failed to get queue status",
      message: error.message
    }, 500);
  }
});
app.get("/api/matching/find", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const result = await c.env.DB.prepare(`
      SELECT id, name, industry, position, experience_years, mentor_topics,
             industries_worked, preferred_meeting_freq, why_mentor,
             advice_style, personality_type, short_bio, company, linkedin_url,
             average_rating, verification_status
      FROM users
      WHERE role = 'mentor' AND is_active = 1 AND id != ?
    `).bind(user.id).all();
    const mentors = (result.results || []).map((row) => ({
      id: row.id,
      name: row.name,
      industry: row.industry,
      position: row.position,
      experienceYears: row.experience_years,
      mentorTopics: row.mentor_topics,
      industriesWorked: row.industries_worked,
      preferredMeetingFreq: row.preferred_meeting_freq,
      whyMentor: row.why_mentor,
      adviceStyle: row.advice_style,
      personalityType: row.personality_type,
      shortBio: row.short_bio,
      company: row.company,
      linkedinUrl: row.linkedin_url,
      averageRating: row.average_rating,
      verificationStatus: row.verification_status
    }));
    const student = {
      careerField: user.careerField,
      dreamRole: user.dreamRole,
      helpNeeded: user.helpNeeded,
      meetingFrequency: user.meetingFrequency,
      willingToPrepare: user.willingToPrepare,
      adviceStyle: user.adviceStyle,
      personalityType: user.personalityType
    };
    const ranked = rankMentors(student, mentors);
    const primary = ranked.filter((r) => r.score >= 70);
    const extended = ranked.filter((r) => r.score >= 50 && r.score < 70);
    const verifiedInField = mentors.filter(
      (m) => m.verificationStatus === "verified" || m.verificationStatus === "approved"
    );
    const hasVerifiedInField = verifiedInField.some(
      (m) => m.industry?.toLowerCase() === (user.careerField || "").toLowerCase()
    );
    const fallback = !hasVerifiedInField && verifiedInField.length > 0 ? rankMentors(student, verifiedInField).slice(0, 3) : [];
    return c.json({
      primary,
      extended,
      fallback,
      total: mentors.length,
      verifiedCount: verifiedInField.length,
      hasVerifiedInField
    });
  } catch (error) {
    console.error("Matching find error:", error);
    return c.json({ error: "Matching failed", message: error.message }, 500);
  }
});
app.get("/api/admin/mentors", authMiddleware, async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT id, name, email, position, company, experience_years,
             linkedin_url, mentor_topics, industry, verification_status,
             created_at
      FROM users WHERE role = 'mentor' AND is_active = 1
      ORDER BY created_at DESC
    `).all();
    const mentors = (result.results || []).map((row) => {
      const evalResult = evaluateMentor(row);
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        position: row.position,
        company: row.company,
        experienceYears: row.experience_years,
        linkedinUrl: row.linkedin_url,
        mentorTopics: (row.mentor_topics || "").split(",").map((t) => t.trim()).filter(Boolean),
        industry: row.industry,
        verificationStatus: row.verification_status,
        createdAt: row.created_at,
        autoApprovalCheck: evalResult
      };
    });
    const pending = mentors.filter((m) => m.verificationStatus === "pending");
    const approved = mentors.filter((m) => m.verificationStatus === "approved");
    const verified = mentors.filter((m) => m.verificationStatus === "verified");
    const rejected = mentors.filter((m) => m.verificationStatus === "rejected");
    return c.json({ mentors, summary: { total: mentors.length, pending: pending.length, approved: approved.length, verified: verified.length, rejected: rejected.length } });
  } catch (error) {
    return c.json({ error: "Failed to fetch mentors", message: error.message }, 500);
  }
});
app.post("/api/admin/verify/:id", authMiddleware, async (c) => {
  try {
    const mentorId = c.req.param("id");
    const row = await c.env.DB.prepare(`
      SELECT id, name, email, position, company, experience_years,
             linkedin_url, mentor_topics, industry, verification_status
      FROM users WHERE id = ? AND role = 'mentor'
    `).bind(mentorId).first();
    if (!row) return c.json({ error: "Mentor not found" }, 404);
    const evalResult = evaluateMentor(row);
    if (evalResult.passed) {
      await c.env.DB.prepare(`
        UPDATE users SET verification_status = 'approved', updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
      `).bind(mentorId).run();
      const email = buildApprovalEmail(row.name);
      return c.json({
        success: true,
        action: "approved",
        mentorId,
        mentorName: row.name,
        evalResult,
        emailToSend: email,
        message: `${row.name} passed all checks and has been set to 'approved'. Send the interview email to ${row.email}.`
      });
    } else {
      return c.json({
        success: true,
        action: "pending",
        mentorId,
        mentorName: row.name,
        evalResult,
        message: `${row.name} did not pass auto-approval. See report for details.`
      });
    }
  } catch (error) {
    return c.json({ error: "Verification failed", message: error.message }, 500);
  }
});
app.post("/api/admin/verify-all", authMiddleware, async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT id, name, email, position, company, experience_years,
             linkedin_url, mentor_topics, industry, verification_status
      FROM users WHERE role = 'mentor' AND is_active = 1 AND verification_status = 'pending'
    `).all();
    const rows = result.results || [];
    const results = [];
    for (const row of rows) {
      const evalResult = evaluateMentor(row);
      if (evalResult.passed) {
        await c.env.DB.prepare(`
          UPDATE users SET verification_status = 'approved', updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(row.id).run();
        const email = buildApprovalEmail(row.name);
        results.push({ id: row.id, name: row.name, action: "approved", evalResult, emailToSend: email });
      } else {
        results.push({ id: row.id, name: row.name, action: "pending", evalResult });
      }
    }
    const approvedCount = results.filter((r) => r.action === "approved").length;
    return c.json({ success: true, processed: results.length, approved: approvedCount, results });
  } catch (error) {
    return c.json({ error: "Bulk verification failed", message: error.message }, 500);
  }
});
app.post("/api/admin/set-status/:id", authMiddleware, async (c) => {
  try {
    const mentorId = c.req.param("id");
    const { status } = await c.req.json();
    const allowed = ["pending", "approved", "verified", "rejected"];
    if (!allowed.includes(status)) {
      return c.json({ error: `Status must be one of: ${allowed.join(", ")}` }, 400);
    }
    await c.env.DB.prepare(`
      UPDATE users SET verification_status = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ? AND role = 'mentor'
    `).bind(status, mentorId).run();
    return c.json({ success: true, mentorId, newStatus: status });
  } catch (error) {
    return c.json({ error: "Status update failed", message: error.message }, 500);
  }
});
app.get("/ws/signaling/:roomId", (c) => {
  return c.json({ error: "WebSocket connections are not supported in serverless mode" }, 501);
});
app.get("/ws/matching", (c) => {
  return c.json({ error: "WebSocket connections are not supported in serverless mode" }, 501);
});
app.post("/api/conversations/start", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const { partnerId, roomId } = await c.req.json();
    const conversationId = crypto.randomUUID();
    const studentId = user.role === "student" ? user.id : partnerId;
    const ceoId = user.role === "ceo" ? user.id : partnerId;
    await c.env.DB.prepare(`
      INSERT INTO conversations (id, student_id, ceo_id, room_id, status)
      VALUES (?, ?, ?, ?, 'active')
    `).bind(conversationId, studentId, ceoId, roomId).run();
    return c.json({
      success: true,
      conversationId,
      roomId
    });
  } catch (error) {
    console.error("Start conversation error:", error);
    return c.json({
      error: "Failed to start conversation",
      message: error.message
    }, 500);
  }
});
app.post("/api/conversations/:id/end", authMiddleware, async (c) => {
  try {
    const conversationId = c.req.param("id");
    const user = c.get("user");
    const { duration, rating, feedback } = await c.req.json();
    const updateField = user.role === "student" ? "rating_student" : "rating_ceo";
    const feedbackField = user.role === "student" ? "feedback_student" : "feedback_ceo";
    await c.env.DB.prepare(`
      UPDATE conversations 
      SET ended_at = CURRENT_TIMESTAMP, 
          duration_seconds = ?, 
          ${updateField} = ?, 
          ${feedbackField} = ?,
          status = 'ended'
      WHERE id = ? AND (student_id = ? OR ceo_id = ?)
    `).bind(duration, rating, feedback, conversationId, user.id, user.id).run();
    return c.json({ success: true });
  } catch (error) {
    console.error("End conversation error:", error);
    return c.json({
      error: "Failed to end conversation",
      message: error.message
    }, 500);
  }
});
app.get("/api/conversations", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const limit = parseInt(c.req.query("limit") || "20");
    const offset = parseInt(c.req.query("offset") || "0");
    const conversations = await c.env.DB.prepare(`
      SELECT c.*, 
             s.name as student_name, s.university, s.major,
             ceo.name as ceo_name, ceo.company, ceo.position
      FROM conversations c
      JOIN users s ON c.student_id = s.id
      JOIN users ceo ON c.ceo_id = ceo.id
      WHERE c.student_id = ? OR c.ceo_id = ?
      ORDER BY c.started_at DESC
      LIMIT ? OFFSET ?
    `).bind(user.id, user.id, limit, offset).all();
    return c.json({ conversations: conversations.results });
  } catch (error) {
    console.error("Get conversations error:", error);
    return c.json({
      error: "Failed to get conversations",
      message: error.message
    }, 500);
  }
});
app.post("/api/donate", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const { amount } = await c.req.json();
    return c.json({
      success: true,
      message: `Thank you ${user.name} for your $${amount} donation!`,
      transactionId: `mock-${Date.now()}`,
      user: user.name
    });
  } catch (error) {
    console.error("Donation error:", error);
    return c.json({
      error: "Donation failed",
      message: error.message
    }, 500);
  }
});
app.get("/api/messages/:partnerId", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const partnerId = c.req.param("partnerId");
    const result = await c.env.DB.prepare(`
      SELECT m.*, 
             s.name as sender_name, s.role as sender_role,
             r.name as recipient_name
      FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.recipient_id = r.id
      WHERE (m.sender_id = ? AND m.recipient_id = ?)
         OR (m.sender_id = ? AND m.recipient_id = ?)
      ORDER BY m.created_at ASC
    `).bind(user.id, partnerId, partnerId, user.id).all();
    await c.env.DB.prepare(`
      UPDATE messages SET is_read = 1
      WHERE sender_id = ? AND recipient_id = ? AND is_read = 0
    `).bind(partnerId, user.id).run();
    return c.json({ messages: result.results || [] });
  } catch (error) {
    return c.json({ error: "Failed to fetch messages", message: error.message }, 500);
  }
});
app.post("/api/messages", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const { recipientId, content } = await c.req.json();
    if (!recipientId || !content?.trim()) {
      return c.json({ error: "recipientId and content are required" }, 400);
    }
    const recipient = await c.env.DB.prepare(
      `SELECT id, name, role FROM users WHERE id = ? AND is_active = 1`
    ).bind(recipientId).first();
    if (!recipient) return c.json({ error: "Recipient not found" }, 404);
    const msgId = crypto.randomUUID();
    await c.env.DB.prepare(`
      INSERT INTO messages (id, sender_id, recipient_id, content, created_at)
      VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(msgId, user.id, recipientId, content.trim()).run();
    return c.json({
      success: true,
      message: {
        id: msgId,
        sender_id: user.id,
        sender_name: user.name,
        recipient_id: recipientId,
        recipient_name: recipient.name,
        content: content.trim(),
        is_read: 0,
        created_at: (/* @__PURE__ */ new Date()).toISOString()
      }
    });
  } catch (error) {
    return c.json({ error: "Failed to send message", message: error.message }, 500);
  }
});
app.get("/api/messages/inbox/list", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const result = await c.env.DB.prepare(`
      SELECT
        CASE WHEN m.sender_id = ? THEN m.recipient_id ELSE m.sender_id END as partner_id,
        u.name as partner_name, u.role as partner_role,
        u.position, u.company, u.verification_status, u.industry,
        m.content as last_message,
        m.created_at as last_message_at,
        SUM(CASE WHEN m.sender_id != ? AND m.is_read = 0 THEN 1 ELSE 0 END) as unread_count
      FROM messages m
      JOIN users u ON u.id = CASE WHEN m.sender_id = ? THEN m.recipient_id ELSE m.sender_id END
      WHERE m.sender_id = ? OR m.recipient_id = ?
      GROUP BY partner_id
      ORDER BY last_message_at DESC
    `).bind(user.id, user.id, user.id, user.id, user.id).all();
    return c.json({ conversations: result.results || [] });
  } catch (error) {
    return c.json({ error: "Failed to fetch inbox", message: error.message }, 500);
  }
});
app.post("/api/messages/report", authMiddleware, async (c) => {
  try {
    const user = c.get("user");
    const { reportedUserId, messageId, reason, description } = await c.req.json();
    if (!reportedUserId || !reason) {
      return c.json({ error: "reportedUserId and reason are required" }, 400);
    }
    const reportId = crypto.randomUUID();
    await c.env.DB.prepare(`
      INSERT INTO message_reports (id, reporter_id, reported_user_id, message_id, reason, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(reportId, user.id, reportedUserId, messageId || null, reason, description || null).run();
    if (messageId) {
      await c.env.DB.prepare(`
        UPDATE messages SET reported = 1, report_reason = ? WHERE id = ? AND recipient_id = ?
      `).bind(reason, messageId, user.id).run();
    }
    return c.json({
      success: true,
      reportId,
      message: "Report submitted. I will review it promptly. Thank you for keeping MentorMatch safe."
    });
  } catch (error) {
    return c.json({ error: "Failed to submit report", message: error.message }, 500);
  }
});
app.get("/api/admin/reports", authMiddleware, async (c) => {
  try {
    const result = await c.env.DB.prepare(`
      SELECT r.*,
             rep.name as reporter_name,
             ru.name as reported_user_name, ru.role as reported_user_role
      FROM message_reports r
      JOIN users rep ON r.reporter_id = rep.id
      JOIN users ru ON r.reported_user_id = ru.id
      ORDER BY r.created_at DESC
    `).all();
    return c.json({ reports: result.results || [] });
  } catch (error) {
    return c.json({ error: "Failed to fetch reports", message: error.message }, 500);
  }
});
var index_default = app;

// src/server-entry.ts
var config = {
  api: {
    bodyParser: false
  }
};
var server_entry_default = handle(index_default);
export {
  config,
  server_entry_default as default
};
