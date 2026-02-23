// Authentication utilities for MentorMatch
import * as bcryptjs from 'bcryptjs'
const bcrypt = (bcryptjs as any).default ?? bcryptjs
import jwt from 'jsonwebtoken'
import { z } from 'zod'

// Validation schemas
export const RegisterSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['student', 'mentor'], { 
    errorMap: () => ({ message: 'Role must be either student or mentor' })
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
  hadMentors: z.string().optional(),
})

export const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required')
})

export const UpdateProfileSchema = z.object({
  name: z.string().min(2).optional(),
  bio: z.string().optional(),
  company: z.string().optional(),
  position: z.string().optional(),
  industry: z.string().optional(),
  experienceYears: z.number().optional(),
  university: z.string().optional(),
  major: z.string().optional(),
  graduationYear: z.number().optional(),
  linkedinUrl: z.string().url().optional().or(z.literal('')),
  websiteUrl: z.string().url().optional().or(z.literal('')),
  companySize: z.enum(['startup', 'small', 'medium', 'large', 'enterprise']).optional(),
  timezone: z.string().optional(),
  languages: z.array(z.string()).optional(),
})

export interface User {
  id: string
  email: string
  name: string
  role: 'student' | 'mentor'
  bio?: string
  company?: string
  position?: string
  industry?: string
  experienceYears?: number
  university?: string
  major?: string
  graduationYear?: number
  linkedinUrl?: string
  websiteUrl?: string
  avatarUrl?: string
  verificationStatus: 'pending' | 'approved' | 'verified' | 'rejected'
  isActive: boolean
  isOnline: boolean
  lastSeen: string
  timezone?: string
  languages?: string[]
  totalConversations: number
  averageRating: number
  totalRatingCount: number
  createdAt: string
  updatedAt: string
  emailVerifiedAt?: string
  // Student matching fields
  careerField?: string
  dreamRole?: string
  careerInterestWhy?: string
  helpNeeded?: string
  meetingFrequency?: string
  willingToPrepare?: number
  adviceStyle?: string
  personalityType?: string
  school?: string
  gradeLevel?: string
  age?: number
  // Mentor matching fields
  shortBio?: string
  mentorTopics?: string
  industriesWorked?: string
  maxMentees?: number
  preferredMeetingFreq?: string
  virtualOrInperson?: string
  whyMentor?: string
  hadMentors?: string
}

export interface AuthSession {
  id: string
  userId: string
  tokenHash: string
  expiresAt: string
  ipAddress?: string
  userAgent?: string
  createdAt: string
  lastUsedAt: string
}

// Hash password using bcrypt
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

// Verify password against hash
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash)
}

// Generate JWT token
export function generateToken(payload: any, secret: string, expiresIn: string = '7d'): string {
  return jwt.sign(payload, secret, { expiresIn } as any)
}

// Verify JWT token
export function verifyToken(token: string, secret: string): any {
  try {
    return jwt.verify(token, secret)
  } catch (error) {
    return null
  }
}

// Generate secure random ID
export function generateId(): string {
  return crypto.randomUUID().replace(/-/g, '')
}

// Extract Bearer token from Authorization header
export function extractBearerToken(authHeader: string | undefined): string | null {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null
  }
  return authHeader.substring(7)
}

// ─── Content Moderation ───────────────────────────────────────────────────────
// Patterns that are obviously joke / fake / inappropriate accounts
const BAD_PATTERNS: RegExp[] = [
  // profanity — catch root word anywhere in the string
  /fuck/i, /shit/i, /bitch/i, /asshole/i, /nigga/i, /nigger/i,
  /cunt/i, /whore/i, /faggot/i, /fag\b/i,
  // sexually explicit
  /porn/i, /\bxxx\b/i, /\bnude(s)?\b/i, /\bnaked\b/i, /onlyfan/i,
  // obvious keyboard spam (whole-field junk)
  /^[qwerty\s]{6,}$/i, /^[asdfgh\s]{6,}$/i, /^[zxcvbn\s]{6,}$/i,
  // troll / joke signals
  /\bfake\s*(user|name|account)\b/i,
  // repeated laugh/nonsense: lol lol, haha haha, lolol, hahaha, etc.
  /(lol\s*){2,}/i, /(haha)+/i, /(blah\s*){2,}/i, /lolol/i,
  // hate / explicit threats
  /i\s*will\s*kill/i, /kill\s*(all|them|you)/i, /terroris/i,
  // obviously not real (whole-field)
  /^\s*n\/?a\s*$/i, /^\s*none\s*$/i, /^\s*idk\s*$/i,
  /^\s*dumb\s*$/i, /^\s*stupid\s*$/i, /^\s*whatever\s*$/i,
  /^\s*asdf\s*$/i, /^\s*qwerty\s*$/i,
]

// Repeated-char junk: e.g. "aaaaaaaaaa", "zzzzzzzz" — 7+ identical chars in a row
const JUNK_REPEAT = /(.)\1{6,}/

function isFlagged(value: string | undefined | null): boolean {
  if (!value) return false
  const v = value.trim()
  if (JUNK_REPEAT.test(v)) return true
  return BAD_PATTERNS.some(p => p.test(v))
}

export function moderateRegistration(data: z.infer<typeof RegisterSchema>): { flagged: boolean; reason: string } {
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
    data.helpNeeded,
  ]
  for (const field of fieldsToCheck) {
    if (isFlagged(field)) {
      return { flagged: true, reason: 'Account flagged for inappropriate or fake content.' }
    }
  }
  return { flagged: false, reason: '' }
}
// ─────────────────────────────────────────────────────────────────────────────

// User database operations
export class UserService {
  constructor(private db: any) {}

  async createUser(userData: z.infer<typeof RegisterSchema>): Promise<User> {
    // Content moderation — suspend accounts with obviously fake/inappropriate content
    const mod = moderateRegistration(userData)

    const userId = generateId()
    const passwordHash = await hashPassword(userData.password)

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
      ).first()

      if (!user) {
        throw new Error('Failed to create user')
      }

      // Auto-suspend if moderation flagged this account
      if (mod.flagged) {
        await this.db.prepare(
          `UPDATE users SET is_active = 0, updated_at = CURRENT_TIMESTAMP WHERE id = ?`
        ).bind(userId).run()
        ;(user as any).is_active = 0
      }

      // Return user without password hash
      const { password_hash, ...userWithoutPassword } = user as any
      return this.formatUser(userWithoutPassword)
    }

  async verifyUserPassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash)
  }

  async findUserByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    const user = await this.db.prepare(`
      SELECT * FROM users WHERE email = ? AND is_active = 1
    `).bind(email.toLowerCase()).first()

    if (!user) return null

    const { password_hash, ...userWithoutPassword } = user as any
    return {
      ...this.formatUser(userWithoutPassword),
      passwordHash: password_hash
    }
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.db.prepare(`
      SELECT * FROM users WHERE id = ? AND is_active = 1
    `).bind(id).first()

    if (!user) return null

    const { password_hash, ...userWithoutPassword } = user as any
    return this.formatUser(userWithoutPassword)
  }

  async updateUser(id: string, updates: z.infer<typeof UpdateProfileSchema>): Promise<User | null> {
    const updateFields = []
    const values = []

    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined) {
        const dbKey = this.camelToSnake(key)
        updateFields.push(`${dbKey} = ?`)
        values.push(value)
      }
    }

    if (updateFields.length === 0) {
      return this.findUserById(id)
    }

    updateFields.push('updated_at = CURRENT_TIMESTAMP')
    values.push(id)

    await this.db.prepare(`
      UPDATE users SET ${updateFields.join(', ')} WHERE id = ?
    `).bind(...values).run()

    return this.findUserById(id)
  }

  async updateUserStatus(id: string, isOnline: boolean): Promise<void> {
    await this.db.prepare(`
      UPDATE users SET is_online = ?, last_seen = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(isOnline ? 1 : 0, id).run()
  }

  async searchUsers(role: 'student' | 'mentor', filters?: {
    industry?: string
    experienceYears?: number
    isOnline?: boolean
  }): Promise<User[]> {
    let query = 'SELECT * FROM users WHERE role = ? AND is_active = 1'
    const params: (string | number)[] = [role]

    if (filters?.industry) {
      query += ' AND industry = ?'
      params.push(filters.industry)
    }

    if (filters?.experienceYears !== undefined) {
      query += ' AND experience_years >= ?'
      params.push(filters.experienceYears)
    }

    if (filters?.isOnline) {
      query += ' AND is_online = 1'
    }

    query += ' ORDER BY last_seen DESC LIMIT 50'

    const users = await this.db.prepare(query).bind(...params).all()
    
    return users.results.map((user: any) => {
      const { password_hash, ...userWithoutPassword } = user as any
      return this.formatUser(userWithoutPassword)
    })
  }

  private formatUser(user: any): User {
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
        hadMentors: user.had_mentors,
      }
    }

  private camelToSnake(str: string): string {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  }
}

// Session management
export class SessionService {
  constructor(private db: any, private jwtSecret?: string) {}

  async createSession(userId: string, ipAddress?: string, userAgent?: string): Promise<string> {
    const sessionId = generateId()
    const secret = this.jwtSecret || 'convoconnect-fallback-secret'
    const token = generateToken({ sessionId, userId }, secret)
    const tokenHash = await hashPassword(token)
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

    await this.db.prepare(`
      INSERT INTO user_sessions (id, user_id, token_hash, expires_at, ip_address, user_agent)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(sessionId, userId, tokenHash, expiresAt.toISOString(), ipAddress, userAgent).run()

    return token
  }

  async validateSession(token: string): Promise<User | null> {
    const secret = this.jwtSecret || 'convoconnect-fallback-secret'
    const payload = verifyToken(token, secret)
    if (!payload || !payload.sessionId) {
      return null
    }

    const session = await this.db.prepare(`
      SELECT * FROM user_sessions WHERE id = ? AND expires_at > CURRENT_TIMESTAMP
    `).bind(payload.sessionId).first()

    if (!session) {
      return null
    }

    // Update last used timestamp
    await this.db.prepare(`
      UPDATE user_sessions SET last_used_at = CURRENT_TIMESTAMP WHERE id = ?
    `).bind(payload.sessionId).run()

    // Get user
    const userService = new UserService(this.db)
    return userService.findUserById(session.user_id as string)
  }

  async deleteSession(sessionId: string): Promise<void> {
    await this.db.prepare(`
      DELETE FROM user_sessions WHERE id = ?
    `).bind(sessionId).run()
  }

  async deleteAllUserSessions(userId: string): Promise<void> {
    await this.db.prepare(`
      DELETE FROM user_sessions WHERE user_id = ?
    `).bind(userId).run()
  }

  async cleanupExpiredSessions(): Promise<void> {
    await this.db.prepare(`
      DELETE FROM user_sessions WHERE expires_at < CURRENT_TIMESTAMP
    `).run()
  }
}