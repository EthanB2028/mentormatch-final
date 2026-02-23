-- MentorMatch Production Database Schema (PostgreSQL / Supabase)
-- Migration 0001: Initial user authentication and profiles

-- Users table with comprehensive profiles
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('student', 'mentor')) NOT NULL,

  -- Profile fields
  bio TEXT,
  company TEXT,
  position TEXT,
  industry TEXT,
  experience_years INTEGER,
  linkedin_url TEXT,
  website_url TEXT,
  avatar_url TEXT,

  -- Student-specific fields
  age INTEGER,
  school TEXT,
  grade_level TEXT,
  university TEXT,
  major TEXT,
  graduation_year INTEGER,
  gpa REAL,
  career_field TEXT,
  dream_role TEXT,
  career_interest_why TEXT,
  help_needed TEXT,
  meeting_frequency TEXT,
  willing_to_prepare INTEGER DEFAULT 1,
  advice_style TEXT,
  personality_type TEXT,

  -- Mentor-specific fields
  short_bio TEXT,
  mentor_topics TEXT,
  industries_worked TEXT,
  max_mentees INTEGER,
  preferred_meeting_freq TEXT,
  virtual_or_inperson TEXT,
  why_mentor TEXT,
  had_mentors TEXT,

  -- Verification and status
  verification_status TEXT DEFAULT 'pending' CHECK(verification_status IN ('pending', 'approved', 'verified', 'rejected')),
  verification_documents TEXT,
  is_active INTEGER DEFAULT 1,
  is_online INTEGER DEFAULT 0,
  last_seen TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

  -- Preferences
  matching_preferences TEXT,
  timezone TEXT DEFAULT 'UTC',
  languages TEXT,

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  email_verified_at TIMESTAMPTZ,

  -- Stats
  total_conversations INTEGER DEFAULT 0,
  average_rating REAL DEFAULT 0.0,
  total_rating_count INTEGER DEFAULT 0
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY,
  student_id TEXT NOT NULL REFERENCES users(id),
  ceo_id TEXT NOT NULL REFERENCES users(id),

  -- Conversation metadata
  started_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  ended_at TIMESTAMPTZ,
  duration_seconds INTEGER,
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'ended', 'cancelled')),

  -- Ratings and feedback
  rating_student INTEGER CHECK(rating_student BETWEEN 1 AND 5),
  rating_ceo INTEGER CHECK(rating_ceo BETWEEN 1 AND 5),
  feedback_student TEXT,
  feedback_ceo TEXT,

  -- Technical details
  room_id TEXT UNIQUE,
  recording_url TEXT,
  transcript TEXT,

  -- AI insights (JSON)
  ai_insights TEXT,

  -- Follow-up
  follow_up_requested BOOLEAN DEFAULT FALSE,
  follow_up_accepted BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Matching queue for real-time pairing
CREATE TABLE IF NOT EXISTS matching_queue (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  preferences TEXT,
  joined_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'waiting' CHECK(status IN ('waiting', 'matched', 'cancelled'))
);

-- User sessions for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TIMESTAMPTZ NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  last_used_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id TEXT PRIMARY KEY,
  sender_id TEXT NOT NULL REFERENCES users(id),
  recipient_id TEXT NOT NULL REFERENCES users(id),
  content TEXT NOT NULL,
  attachment_url TEXT,
  attachment_name TEXT,
  is_read INTEGER DEFAULT 0,
  reported INTEGER DEFAULT 0,
  report_reason TEXT,
  report_reviewed INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Message reports table
CREATE TABLE IF NOT EXISTS message_reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL REFERENCES users(id),
  reported_user_id TEXT NOT NULL REFERENCES users(id),
  message_id TEXT,
  reason TEXT NOT NULL,
  description TEXT,
  status TEXT DEFAULT 'pending',
  admin_notes TEXT,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Follow-up requests
CREATE TABLE IF NOT EXISTS follow_ups (
  id TEXT PRIMARY KEY,
  conversation_id TEXT NOT NULL REFERENCES conversations(id),
  requester_id TEXT NOT NULL REFERENCES users(id),
  recipient_id TEXT NOT NULL REFERENCES users(id),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'declined', 'expired')),
  scheduled_time TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMPTZ
);

-- User reports and moderation
CREATE TABLE IF NOT EXISTS user_reports (
  id TEXT PRIMARY KEY,
  reporter_id TEXT NOT NULL REFERENCES users(id),
  reported_id TEXT NOT NULL REFERENCES users(id),
  conversation_id TEXT REFERENCES conversations(id),
  reason TEXT NOT NULL CHECK(reason IN ('inappropriate_behavior', 'harassment', 'spam', 'fake_profile', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  resolved_at TIMESTAMPTZ
);

-- Achievements system
CREATE TABLE IF NOT EXISTS user_achievements (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  achievement_type TEXT NOT NULL,
  earned_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT,
  UNIQUE(user_id, achievement_type)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_verification_status ON users(verification_status);
CREATE INDEX IF NOT EXISTS idx_users_is_online ON users(is_online);
CREATE INDEX IF NOT EXISTS idx_users_industry ON users(industry);

CREATE INDEX IF NOT EXISTS idx_conversations_student_id ON conversations(student_id);
CREATE INDEX IF NOT EXISTS idx_conversations_ceo_id ON conversations(ceo_id);
CREATE INDEX IF NOT EXISTS idx_conversations_started_at ON conversations(started_at);
CREATE INDEX IF NOT EXISTS idx_conversations_status ON conversations(status);

CREATE INDEX IF NOT EXISTS idx_matching_queue_status ON matching_queue(status);
CREATE INDEX IF NOT EXISTS idx_matching_queue_joined_at ON matching_queue(joined_at);

CREATE INDEX IF NOT EXISTS idx_user_sessions_token_hash ON user_sessions(token_hash);
CREATE INDEX IF NOT EXISTS idx_user_sessions_user_id ON user_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_sessions_expires_at ON user_sessions(expires_at);

CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_recipient ON messages(recipient_id);
CREATE INDEX IF NOT EXISTS idx_messages_conversation ON messages(sender_id, recipient_id);

CREATE INDEX IF NOT EXISTS idx_follow_ups_conversation_id ON follow_ups(conversation_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_status ON follow_ups(status);

CREATE INDEX IF NOT EXISTS idx_user_reports_reported_id ON user_reports(reported_id);
CREATE INDEX IF NOT EXISTS idx_user_reports_status ON user_reports(status);
