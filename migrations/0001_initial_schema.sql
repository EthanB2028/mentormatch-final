-- MentorMatch Production Database Schema
-- Migration 0001: Initial user authentication and profiles

-- Users table with comprehensive profiles
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT NOT NULL,
  role TEXT CHECK(role IN ('student', 'ceo')) NOT NULL,
  
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
  university TEXT,
  major TEXT,
  graduation_year INTEGER,
  gpa REAL,
  
  -- CEO-specific fields
  company_size TEXT CHECK(company_size IN ('startup', 'small', 'medium', 'large', 'enterprise')),
  founded_year INTEGER,
  revenue_range TEXT,
  
  -- Verification and status
  verification_status TEXT DEFAULT 'pending' CHECK(verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents TEXT, -- JSON array of document URLs
  is_active BOOLEAN DEFAULT TRUE,
  is_online BOOLEAN DEFAULT FALSE,
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  -- Preferences
  matching_preferences TEXT, -- JSON object
  timezone TEXT DEFAULT 'UTC',
  languages TEXT, -- JSON array
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  email_verified_at DATETIME,
  
  -- Stats
  total_conversations INTEGER DEFAULT 0,
  average_rating REAL DEFAULT 0.0,
  total_rating_count INTEGER DEFAULT 0
);

-- Conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  student_id TEXT NOT NULL REFERENCES users(id),
  ceo_id TEXT NOT NULL REFERENCES users(id),
  
  -- Conversation metadata
  started_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  ended_at DATETIME,
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
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Matching queue for real-time pairing
CREATE TABLE IF NOT EXISTS matching_queue (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id),
  preferences TEXT, -- JSON matching preferences
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'waiting' CHECK(status IN ('waiting', 'matched', 'cancelled'))
);

-- User sessions for authentication
CREATE TABLE IF NOT EXISTS user_sessions (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at DATETIME NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_used_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Follow-up requests
CREATE TABLE IF NOT EXISTS follow_ups (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  conversation_id TEXT NOT NULL REFERENCES conversations(id),
  requester_id TEXT NOT NULL REFERENCES users(id),
  recipient_id TEXT NOT NULL REFERENCES users(id),
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'declined', 'expired')),
  scheduled_time DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  responded_at DATETIME
);

-- User reports and moderation
CREATE TABLE IF NOT EXISTS user_reports (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  reporter_id TEXT NOT NULL REFERENCES users(id),
  reported_id TEXT NOT NULL REFERENCES users(id),
  conversation_id TEXT REFERENCES conversations(id),
  reason TEXT NOT NULL CHECK(reason IN ('inappropriate_behavior', 'harassment', 'spam', 'fake_profile', 'other')),
  description TEXT,
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'investigating', 'resolved', 'dismissed')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  resolved_at DATETIME
);

-- Achievements system
CREATE TABLE IF NOT EXISTS user_achievements (
  id TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  user_id TEXT NOT NULL REFERENCES users(id),
  achievement_type TEXT NOT NULL,
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  metadata TEXT, -- JSON with achievement details
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

CREATE INDEX IF NOT EXISTS idx_follow_ups_conversation_id ON follow_ups(conversation_id);
CREATE INDEX IF NOT EXISTS idx_follow_ups_status ON follow_ups(status);

CREATE INDEX IF NOT EXISTS idx_user_reports_reported_id ON user_reports(reported_id);
CREATE INDEX IF NOT EXISTS idx_user_reports_status ON user_reports(status);