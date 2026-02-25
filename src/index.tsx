import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { bearerAuth } from 'hono/bearer-auth'
import { getCookie } from 'hono/cookie'
import { renderer } from './renderer'
import { getSupabaseDB, initializeDatabase } from './lib/supabase-db'
import { LandingPage } from './pages/landing'
import { LoginPage } from './pages/login'
import { RegisterPage } from './pages/register'
import { ProfilePage } from './pages/profile'
import { DashboardPage } from './pages/dashboard'
import { VideoCallPage } from './pages/video-call'
import { DonationPage } from './pages/donation'
import { AboutPage } from './pages/about'
import { RoleSelectPage } from './pages/role-select'
import { BlogPage } from './pages/blog'
import { HowItWorksPage } from './pages/how-it-works'
import {
  UserService,
  SessionService,
  LoginSchema,
  RegisterSchema,
  UpdateProfileSchema,
  extractBearerToken,
  verifyToken,
  hashPassword,
  generateId
} from './lib/auth'
import { matchingQueue } from './lib/signaling'
import { rankMentors, type MentorProfile, type StudentProfile } from './lib/matching'
import { evaluateMentor, buildApprovalEmail } from './lib/verification'

// Types for environment bindings (Vercel / Node.js)
interface Env {
  DB?: any
  JWT_SECRET?: string
}

interface Variables {
  user: any
}

const app = new Hono<{ Bindings: Env; Variables: Variables }>()

// Enable CORS for API and WebSocket endpoints
app.use('/api/*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

app.use('/ws/*', cors({
  origin: '*',
  allowMethods: ['GET'],
  allowHeaders: ['Upgrade', 'Connection', 'Sec-WebSocket-Key', 'Sec-WebSocket-Version'],
}))



// Static files are served automatically by the hosting platform (Vercel/Cloudflare Pages)

// JSX renderer
app.use(renderer)

// Authentication middleware
const authMiddleware = async (c: any, next: any) => {
  try {
    const token = extractBearerToken(c.req.header('Authorization'))
    
    if (!token) {
      return c.json({ error: 'Authentication required' }, 401)
    }

    const db = getSupabaseDB()
    const sessionService = new SessionService(db, process.env.JWT_SECRET)
    const user = await sessionService.validateSession(token)
    
    if (!user) {
      return c.json({ error: 'Invalid or expired session' }, 401)
    }

    c.set('user', user)
    await next()
  } catch (error) {
    console.error('Authentication error in authMiddleware:', error)
    return c.json({ error: 'Authentication failed', details: (error as Error).message }, 500)
  }
}

// Optional auth middleware for pages (redirects to login)
const pageAuthMiddleware = async (c: any, next: any) => {
  const token = getCookie(c, 'auth-token') || extractBearerToken(c.req.header('Authorization'))

  if (!token) {
    return c.redirect('/login')
  }

  // Quick JWT check first — no DB needed. Handles missing/invalid/expired tokens.
  const quickPayload = verifyToken(token, process.env.JWT_SECRET || '')
  if (!quickPayload || !quickPayload.sessionId) {
    return c.redirect('/login')
  }

  // Full session + user lookup via DB
  try {
    const db = getSupabaseDB()
    const sessionService = new SessionService(db, process.env.JWT_SECRET)
    const user = await sessionService.validateSession(token)

    if (!user) {
      return c.redirect('/login')
    }

    c.set('user', user)
    await next()
  } catch (error) {
    console.error('Session DB error in pageAuthMiddleware:', error)
    // Return a proper error instead of a redirect loop
    return c.html(`<!DOCTYPE html>
<html><head><title>Session Error</title>
<style>body{font-family:sans-serif;text-align:center;padding:4rem;color:#333}
a{display:inline-block;margin-top:1rem;padding:.75rem 2rem;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px}</style>
</head><body>
<h2>Session Error</h2>
<p>Unable to verify your session. This may be a temporary issue.</p>
<a href="/login">Sign In Again</a>
</body></html>`, 503)
  }
}

// ============= PUBLIC PAGES =============

// Landing page
app.get('/', (c) => {
  return c.render(<LandingPage />)
})

// Authentication pages
app.get('/login', (c) => {
  return c.render(<LoginPage />)
})

app.get('/register', (c) => {
  return c.render(<RegisterPage />)
})

app.get('/about', (c) => {
  return c.render(<AboutPage />)
})

app.get('/role-select', (c) => {
  return c.render(<RoleSelectPage />)
})

app.get('/blog', (c) => {
  return c.render(<BlogPage />)
})

app.get('/how-it-works', (c) => {
  return c.render(<HowItWorksPage />)
})

// ============= PROTECTED PAGES =============

// User dashboard (replaces role-select for logged-in users)
app.get('/dashboard', pageAuthMiddleware, (c) => {
  const user = c.get('user')
  return c.render(<DashboardPage user={user} />)
})

// User profile
app.get('/profile', pageAuthMiddleware, (c) => {
  const user = c.get('user')
  return c.render(<ProfilePage user={user} />)
})

// Video call page
app.get('/video-call/:roomId', pageAuthMiddleware, (c) => {
  const user = c.get('user')
  const roomId = c.req.param('roomId')
  return c.render(<VideoCallPage user={user} roomId={roomId} />)
})

// Donation page
app.get('/donation', pageAuthMiddleware, (c) => {
  const user = c.get('user')
  return c.render(<DonationPage />)
})

// ============= AUTHENTICATION API =============

// Register
app.post('/api/auth/register', async (c) => {
  try {
    const body = await c.req.json()
    const userData = RegisterSchema.parse(body)
    
    const userService = new UserService(getSupabaseDB())
      
      // Check if user already exists
    const existingUser = await userService.findUserByEmail(userData.email)
    if (existingUser) {
      return c.json({ error: 'Email already registered' }, 400)
    }
    
      // Create user
      const user = await userService.createUser(userData)

      // Auto-evaluate mentor on registration
      let verificationResult = null
      if (userData.role === 'mentor') {
        const evalResult = evaluateMentor({
          id: user.id,
          name: user.name,
          position: userData.position,
          company: userData.company,
          experience_years: userData.experienceYears,
          linkedin_url: userData.linkedinUrl,
          mentor_topics: userData.mentorTopics,
          industry: userData.industry,
        })
        verificationResult = evalResult
        if (evalResult.passed) {
        await getSupabaseDB().prepare(
              `UPDATE users SET verification_status = 'approved', updated_at = CURRENT_TIMESTAMP WHERE id = ?`
            ).bind(user.id).run()
          user.verificationStatus = 'approved' as any
        }
      }
      
      // Create session
      const sessionService = new SessionService(getSupabaseDB(), process.env.JWT_SECRET)
      const token = await sessionService.createSession(
        user.id,
        c.req.header('x-forwarded-for'),
        c.req.header('User-Agent')
      )
      
      return c.json({
        success: true,
        user,
        token,
        ...(verificationResult ? { verificationResult } : {}),
      })
  } catch (error: any) {
    console.error('Registration error:', error)
    
    if (error.issues) {
      return c.json({ 
        error: 'Validation failed', 
        issues: error.issues 
      }, 400)
    }
    
    return c.json({ 
      error: 'Registration failed', 
      message: error.message 
    }, 500)
  }
})

// Login
app.post('/api/auth/login', async (c) => {
  try {
    const body = await c.req.json()
    const loginData = LoginSchema.parse(body)
    
    const userService = new UserService(getSupabaseDB())
    const userWithPassword = await userService.findUserByEmail(loginData.email)
    
    if (!userWithPassword) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }
    
      // Verify password
      const isValidPassword = await userService.verifyUserPassword(loginData.password, userWithPassword.passwordHash)
    
    if (!isValidPassword) {
      return c.json({ error: 'Invalid email or password' }, 401)
    }
    
    // Update user status
    await userService.updateUserStatus(userWithPassword.id, true)
    
    // Create session
      const sessionService = new SessionService(getSupabaseDB(), process.env.JWT_SECRET)
      const token = await sessionService.createSession(
        userWithPassword.id,
      c.req.header('x-forwarded-for'),
      c.req.header('User-Agent')
    )
    
    // Remove password hash from response
    const { passwordHash, ...user } = userWithPassword
    
    return c.json({
      success: true,
      user,
      token
    })
  } catch (error: any) {
    console.error('Login error:', error)
    
    if (error.issues) {
      return c.json({ 
        error: 'Validation failed', 
        issues: error.issues 
      }, 400)
    }
    
    return c.json({ 
      error: 'Login failed', 
      message: error.message 
    }, 500)
  }
})

// Logout
app.post('/api/auth/logout', authMiddleware, async (c) => {
  const user = c.get('user')
  const userService = new UserService(getSupabaseDB())
  
  // Update user status
  await userService.updateUserStatus(user.id, false)
  
  return c.json({ success: true })
})

// Get current user
app.get('/api/auth/me', authMiddleware, async (c) => {
  const user = c.get('user')
  return c.json({ user })
})

// Debug endpoint to check cookies
app.get('/api/auth/debug', (c) => {
  const cookieHeader = c.req.header('Cookie')
  const authHeader = c.req.header('Authorization')
  const cookieToken = getCookie(c, 'auth-token')

  return c.json({
    cookieHeader,
    authHeader,
    cookieToken,
    hasDB: true,
      hasJWTSecret: !!process.env.JWT_SECRET
  })
})

// Demo login — creates demo accounts on first use so the demo buttons always work
app.post('/api/auth/demo-login', async (c) => {
  try {
    const { role } = await c.req.json()
    if (role !== 'student' && role !== 'mentor') {
      return c.json({ error: 'role must be "student" or "mentor"' }, 400)
    }

    const email = role === 'student' ? 'student@demo.com' : 'mentor@demo.com'
    const db = getSupabaseDB()
    const userService = new UserService(db)

    let userWithPw = await userService.findUserByEmail(email)

    if (!userWithPw) {
      // Seed the demo account (password123 is fine here — demo only)
      const userId = generateId()
      const passwordHash = await hashPassword('password123')

      if (role === 'student') {
        await db.prepare(`
          INSERT INTO users (
            id, email, password_hash, name, role,
            age, school, grade_level, career_field, dream_role,
            career_interest_why, help_needed, meeting_frequency,
            willing_to_prepare, advice_style, personality_type,
            verification_status, is_active
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          userId, email, passwordHash, 'Demo Student', 'student',
          17, 'Demo High School', '11th Grade', 'Technology', 'Software Engineer',
          'I want to build apps and learn from real professionals',
          'Career advice and technical guidance', 'bi-weekly',
          1, 'direct', 'analytical',
          'pending', 1
        ).run()
      } else {
        await db.prepare(`
          INSERT INTO users (
            id, email, password_hash, name, role,
            company, position, industry, experience_years,
            short_bio, mentor_topics, industries_worked,
            max_mentees, preferred_meeting_freq, virtual_or_inperson,
            why_mentor, had_mentors, linkedin_url,
            verification_status, is_active
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).bind(
          userId, email, passwordHash, 'Demo Mentor', 'mentor',
          'Demo Corp', 'Senior Engineer', 'Technology', 8,
          'Experienced engineer passionate about helping students',
          'Software Engineering,Career Development,Interview Prep', 'Technology,Startups',
          5, 'bi-weekly', 'virtual',
          'I want to give back to the community', 'yes',
          'https://linkedin.com/in/demo-mentor',
          'approved', 1
        ).run()
      }

      userWithPw = await userService.findUserByEmail(email)
    }

    if (!userWithPw) {
      return c.json({ error: 'Failed to create demo account' }, 500)
    }

    const sessionService = new SessionService(db, process.env.JWT_SECRET)
    const token = await sessionService.createSession(
      userWithPw.id,
      c.req.header('x-forwarded-for'),
      c.req.header('User-Agent')
    )

    const { passwordHash: _pw, ...user } = userWithPw

    return c.json({ success: true, user, token })
  } catch (error: any) {
    console.error('Demo login error:', error)
    return c.json({ error: 'Demo login failed', message: error.message }, 500)
  }
})

// ============= USER PROFILE API =============

// Update profile
app.put('/api/profile', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const body = await c.req.json()
    const updates = UpdateProfileSchema.parse(body)
    
      const userService = new UserService(getSupabaseDB())
      const updatedUser = await userService.updateUser(user.id, updates)
    
    if (!updatedUser) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json({ success: true, user: updatedUser })
  } catch (error: any) {
    console.error('Profile update error:', error)
    
    if (error.issues) {
      return c.json({ 
        error: 'Validation failed', 
        issues: error.issues 
      }, 400)
    }
    
    return c.json({ 
      error: 'Profile update failed', 
      message: error.message 
    }, 500)
  }
})

// ============= MATCHING API =============

// Join matching queue
app.post('/api/matching/join', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { preferences } = await c.req.json()

    const result = await matchingQueue.join(
      user.id,
      user.name,
      user.role,
      preferences || {}
    )

    return c.json(result)
  } catch (error: any) {
    console.error('Matching error:', error)
    return c.json({
      error: 'Failed to join queue',
      message: error.message
    }, 500)
  }
})

// Leave matching queue
app.post('/api/matching/leave', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const result = await matchingQueue.leave(user.id)
    return c.json(result)
  } catch (error: any) {
    console.error('Leave queue error:', error)
    return c.json({
      error: 'Failed to leave queue',
      message: error.message
    }, 500)
  }
})

// Get queue status
app.get('/api/matching/status', async (c) => {
  try {
    return c.json(matchingQueue.getStatus())
  } catch (error: any) {
    console.error('Queue status error:', error)
    return c.json({
      error: 'Failed to get queue status',
      message: error.message
    }, 500)
  }
})

// AI Matching Engine — find ranked mentors for the logged-in student
app.get('/api/matching/find', authMiddleware, async (c) => {
  try {
    const user = c.get('user')

    // Fetch ALL active mentors (including pending) for matching
      const result = await getSupabaseDB().prepare(`
        SELECT id, name, industry, position, experience_years, mentor_topics,
             industries_worked, preferred_meeting_freq, why_mentor,
             advice_style, personality_type, short_bio, company, linkedin_url,
             average_rating, verification_status
      FROM users
      WHERE role = 'mentor' AND is_active = 1 AND id != ?
    `).bind(user.id).all()

    const mentors: MentorProfile[] = (result.results || []).map((row: any) => ({
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
      verificationStatus: row.verification_status,
    }))

    // Build student profile from logged-in user
    const student: StudentProfile = {
      careerField: user.careerField,
      dreamRole: user.dreamRole,
      helpNeeded: user.helpNeeded,
      meetingFrequency: user.meetingFrequency,
      willingToPrepare: user.willingToPrepare,
      adviceStyle: user.adviceStyle,
      personalityType: user.personalityType,
    }

    const ranked = rankMentors(student, mentors)

    // Split into primary (>=70) and extended (50–69)
    const primary = ranked.filter(r => r.score >= 70)
    const extended = ranked.filter(r => r.score >= 50 && r.score < 70)

    // Check if student's field has ANY verified mentor (for messaging)
    const verifiedInField = mentors.filter(m =>
      m.verificationStatus === 'verified' || m.verificationStatus === 'approved'
    )
    const hasVerifiedInField = verifiedInField.some(m =>
      m.industry?.toLowerCase() === (user.careerField || '').toLowerCase()
    )

    // Fallback mentors: top 3 verified across all fields (if no field-match)
    const fallback = (!hasVerifiedInField && verifiedInField.length > 0)
      ? rankMentors(student, verifiedInField).slice(0, 3)
      : []

    return c.json({
      primary,
      extended,
      fallback,
      total: mentors.length,
      verifiedCount: verifiedInField.length,
      hasVerifiedInField,
    })
  } catch (error: any) {
    console.error('Matching find error:', error)
    return c.json({ error: 'Matching failed', message: error.message }, 500)
  }
})

// ============= ADMIN / VERIFICATION API =============

// GET /api/admin/mentors — list all mentors with verification status + check results
app.get('/api/admin/mentors', authMiddleware, async (c) => {
  try {
      const result = await getSupabaseDB().prepare(`
        SELECT id, name, email, position, company, experience_years,
               linkedin_url, mentor_topics, industry, verification_status,
               created_at
        FROM users WHERE role = 'mentor' AND is_active = 1
      ORDER BY created_at DESC
    `).all()

    const mentors = (result.results || []).map((row: any) => {
      const evalResult = evaluateMentor(row)
      return {
        id: row.id,
        name: row.name,
        email: row.email,
        position: row.position,
        company: row.company,
        experienceYears: row.experience_years,
        linkedinUrl: row.linkedin_url,
        mentorTopics: (row.mentor_topics || '').split(',').map((t: string) => t.trim()).filter(Boolean),
        industry: row.industry,
        verificationStatus: row.verification_status,
        createdAt: row.created_at,
        autoApprovalCheck: evalResult,
      }
    })

    const pending = mentors.filter((m: any) => m.verificationStatus === 'pending')
    const approved = mentors.filter((m: any) => m.verificationStatus === 'approved')
    const verified = mentors.filter((m: any) => m.verificationStatus === 'verified')
    const rejected = mentors.filter((m: any) => m.verificationStatus === 'rejected')

    return c.json({ mentors, summary: { total: mentors.length, pending: pending.length, approved: approved.length, verified: verified.length, rejected: rejected.length } })
  } catch (error: any) {
    return c.json({ error: 'Failed to fetch mentors', message: error.message }, 500)
  }
})

// POST /api/admin/verify/:id — run auto-approval check on a specific mentor
app.post('/api/admin/verify/:id', authMiddleware, async (c) => {
  try {
    const mentorId = c.req.param('id')

      const row = await getSupabaseDB().prepare(`
      SELECT id, name, email, position, company, experience_years,
             linkedin_url, mentor_topics, industry, verification_status
      FROM users WHERE id = ? AND role = 'mentor'
    `).bind(mentorId).first()

    if (!row) return c.json({ error: 'Mentor not found' }, 404)

    const evalResult = evaluateMentor(row as any)

    if (evalResult.passed) {
      // Auto-approve: set to 'approved', pending the interview
        await getSupabaseDB().prepare(`
          UPDATE users SET verification_status = 'approved', updated_at = CURRENT_TIMESTAMP
          WHERE id = ?
        `).bind(mentorId).run()

      const email = buildApprovalEmail((row as any).name)
      return c.json({
        success: true,
        action: 'approved',
        mentorId,
        mentorName: (row as any).name,
        evalResult,
        emailToSend: email,
        message: `${(row as any).name} passed all checks and has been set to 'approved'. Send the interview email to ${(row as any).email}.`,
      })
    } else {
      return c.json({
        success: true,
        action: 'pending',
        mentorId,
        mentorName: (row as any).name,
        evalResult,
        message: `${(row as any).name} did not pass auto-approval. See report for details.`,
      })
    }
  } catch (error: any) {
    return c.json({ error: 'Verification failed', message: error.message }, 500)
  }
})

// POST /api/admin/verify-all — run auto-approval on ALL pending mentors
app.post('/api/admin/verify-all', authMiddleware, async (c) => {
  try {
      const result = await getSupabaseDB().prepare(`
        SELECT id, name, email, position, company, experience_years,
               linkedin_url, mentor_topics, industry, verification_status
        FROM users WHERE role = 'mentor' AND is_active = 1 AND verification_status = 'pending'
    `).all()

    const rows = result.results || []
    const results = []

    for (const row of rows) {
      const evalResult = evaluateMentor(row as any)
      if (evalResult.passed) {
          await getSupabaseDB().prepare(`
            UPDATE users SET verification_status = 'approved', updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
          `).bind((row as any).id).run()
        const email = buildApprovalEmail((row as any).name)
        results.push({ id: (row as any).id, name: (row as any).name, action: 'approved', evalResult, emailToSend: email })
      } else {
        results.push({ id: (row as any).id, name: (row as any).name, action: 'pending', evalResult })
      }
    }

    const approvedCount = results.filter(r => r.action === 'approved').length
    return c.json({ success: true, processed: results.length, approved: approvedCount, results })
  } catch (error: any) {
    return c.json({ error: 'Bulk verification failed', message: error.message }, 500)
  }
})

// POST /api/admin/set-status/:id — manually set any mentor's verification_status
app.post('/api/admin/set-status/:id', authMiddleware, async (c) => {
  try {
    const mentorId = c.req.param('id')
    const { status } = await c.req.json()
    const allowed = ['pending', 'approved', 'verified', 'rejected']
    if (!allowed.includes(status)) {
      return c.json({ error: `Status must be one of: ${allowed.join(', ')}` }, 400)
    }

      await getSupabaseDB().prepare(`
        UPDATE users SET verification_status = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ? AND role = 'mentor'
      `).bind(status, mentorId).run()

    return c.json({ success: true, mentorId, newStatus: status })
  } catch (error: any) {
    return c.json({ error: 'Status update failed', message: error.message }, 500)
  }
})

// ============= WEBSOCKET ENDPOINTS =============
// WebSockets are not supported in Vercel serverless functions.
// Use a dedicated WebSocket service (e.g., Ably, Pusher, or a separate server) for real-time features.

app.get('/ws/signaling/:roomId', (c) => {
  return c.json({ error: 'WebSocket connections are not supported in serverless mode' }, 501)
})

app.get('/ws/matching', (c) => {
  return c.json({ error: 'WebSocket connections are not supported in serverless mode' }, 501)
})

// ============= CONVERSATION API =============

// Start conversation (creates room and records in database)
app.post('/api/conversations/start', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { partnerId, roomId } = await c.req.json()
    
    // Create conversation record
    const conversationId = crypto.randomUUID()
    
    const studentId = user.role === 'student' ? user.id : partnerId
    const ceoId = user.role === 'mentor' ? user.id : partnerId
    
      await getSupabaseDB().prepare(`
        INSERT INTO conversations (id, student_id, ceo_id, room_id, status)
        VALUES (?, ?, ?, ?, 'active')
      `).bind(conversationId, studentId, ceoId, roomId).run()
    
    return c.json({
      success: true,
      conversationId,
      roomId
    })
  } catch (error: any) {
    console.error('Start conversation error:', error)
    return c.json({ 
      error: 'Failed to start conversation', 
      message: error.message 
    }, 500)
  }
})

// End conversation
app.post('/api/conversations/:id/end', authMiddleware, async (c) => {
  try {
    const conversationId = c.req.param('id')
    const user = c.get('user')
    const { duration, rating, feedback } = await c.req.json()
    
    // Update conversation record
    const updateField = user.role === 'student' ? 'rating_student' : 'rating_ceo'
    const feedbackField = user.role === 'student' ? 'feedback_student' : 'feedback_ceo'
    
      await getSupabaseDB().prepare(`
        UPDATE conversations 
        SET ended_at = CURRENT_TIMESTAMP, 
            duration_seconds = ?, 
            ${updateField} = ?, 
            ${feedbackField} = ?,
            status = 'ended'
        WHERE id = ? AND (student_id = ? OR ceo_id = ?)
      `).bind(duration, rating, feedback, conversationId, user.id, user.id).run()
    
    return c.json({ success: true })
  } catch (error: any) {
    console.error('End conversation error:', error)
    return c.json({ 
      error: 'Failed to end conversation', 
      message: error.message 
    }, 500)
  }
})

// Get user's conversation history
app.get('/api/conversations', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const limit = parseInt(c.req.query('limit') || '20')
    const offset = parseInt(c.req.query('offset') || '0')
    
      const conversations = await getSupabaseDB().prepare(`
      SELECT c.*, 
             s.name as student_name, s.university, s.major,
             ceo.name as ceo_name, ceo.company, ceo.position
      FROM conversations c
      JOIN users s ON c.student_id = s.id
      JOIN users ceo ON c.ceo_id = ceo.id
      WHERE c.student_id = ? OR c.ceo_id = ?
      ORDER BY c.started_at DESC
      LIMIT ? OFFSET ?
    `).bind(user.id, user.id, limit, offset).all()
    
    return c.json({ conversations: conversations.results })
  } catch (error: any) {
    console.error('Get conversations error:', error)
    return c.json({ 
      error: 'Failed to get conversations', 
      message: error.message 
    }, 500)
  }
})

// ============= DONATION API (Enhanced) =============

app.post('/api/donate', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { amount } = await c.req.json()
    
    // In production, integrate with Stripe or other payment processor
    // For now, just record the "donation" intent
    
    return c.json({
      success: true,
      message: `Thank you ${user.name} for your $${amount} donation!`,
      transactionId: `mock-${Date.now()}`,
      user: user.name
    })
  } catch (error: any) {
    console.error('Donation error:', error)
    return c.json({ 
      error: 'Donation failed', 
      message: error.message 
    }, 500)
  }
})

// ============= MESSAGING API =============

// GET /api/messages/:partnerId — fetch full conversation thread between current user and a partner
app.get('/api/messages/:partnerId', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const partnerId = c.req.param('partnerId')

      const result = await getSupabaseDB().prepare(`
        SELECT m.*, 
               s.name as sender_name, s.role as sender_role,
               r.name as recipient_name
        FROM messages m
      JOIN users s ON m.sender_id = s.id
      JOIN users r ON m.recipient_id = r.id
      WHERE (m.sender_id = ? AND m.recipient_id = ?)
         OR (m.sender_id = ? AND m.recipient_id = ?)
      ORDER BY m.created_at ASC
    `).bind(user.id, partnerId, partnerId, user.id).all()

    // Mark messages from partner as read
      await getSupabaseDB().prepare(`
        UPDATE messages SET is_read = 1
        WHERE sender_id = ? AND recipient_id = ? AND is_read = 0
      `).bind(partnerId, user.id).run()

    return c.json({ messages: result.results || [] })
  } catch (error: any) {
    return c.json({ error: 'Failed to fetch messages', message: error.message }, 500)
  }
})

// POST /api/messages — send a message
app.post('/api/messages', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { recipientId, content } = await c.req.json()

    if (!recipientId || !content?.trim()) {
      return c.json({ error: 'recipientId and content are required' }, 400)
    }

    // Verify recipient exists
      const recipient = await getSupabaseDB().prepare(
      `SELECT id, name, role FROM users WHERE id = ? AND is_active = 1`
    ).bind(recipientId).first()
    if (!recipient) return c.json({ error: 'Recipient not found' }, 404)

    const msgId = crypto.randomUUID()
    await getSupabaseDB().prepare(`
        INSERT INTO messages (id, sender_id, recipient_id, content, created_at)
        VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
      `).bind(msgId, user.id, recipientId, content.trim()).run()

    return c.json({
      success: true,
      message: {
        id: msgId,
        sender_id: user.id,
        sender_name: user.name,
        recipient_id: recipientId,
        recipient_name: (recipient as any).name,
        content: content.trim(),
        is_read: 0,
        created_at: new Date().toISOString(),
      }
    })
  } catch (error: any) {
    return c.json({ error: 'Failed to send message', message: error.message }, 500)
  }
})

// GET /api/messages/inbox/list — list all unique conversation partners with last message + unread count
app.get('/api/messages/inbox/list', authMiddleware, async (c) => {
  try {
    const user = c.get('user')

      const result = await getSupabaseDB().prepare(`
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
    `).bind(user.id, user.id, user.id, user.id, user.id).all()

    return c.json({ conversations: result.results || [] })
  } catch (error: any) {
    return c.json({ error: 'Failed to fetch inbox', message: error.message }, 500)
  }
})

// POST /api/messages/report — report a user or specific message
app.post('/api/messages/report', authMiddleware, async (c) => {
  try {
    const user = c.get('user')
    const { reportedUserId, messageId, reason, description } = await c.req.json()

    if (!reportedUserId || !reason) {
      return c.json({ error: 'reportedUserId and reason are required' }, 400)
    }

      const reportId = crypto.randomUUID()
    await getSupabaseDB().prepare(`
      INSERT INTO message_reports (id, reporter_id, reported_user_id, message_id, reason, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    `).bind(reportId, user.id, reportedUserId, messageId || null, reason, description || null).run()

    // Flag the specific message if provided
    if (messageId) {
        await getSupabaseDB().prepare(`
          UPDATE messages SET reported = 1, report_reason = ? WHERE id = ? AND recipient_id = ?
        `).bind(reason, messageId, user.id).run()
    }

    return c.json({
      success: true,
      reportId,
      message: 'Report submitted. I will review it promptly. Thank you for keeping MentorMatch safe.'
    })
  } catch (error: any) {
    return c.json({ error: 'Failed to submit report', message: error.message }, 500)
  }
})

// ============= DATABASE SETUP =============

// POST /api/db-init — create all tables if they don't exist (safe to run multiple times)
app.post('/api/db-init', async (c) => {
  try {
    const result = await initializeDatabase()
    return c.json({
      success: true,
      message: 'Database initialized',
      ...result,
    })
  } catch (error: any) {
    return c.json({ success: false, error: error.message }, 500)
  }
})

// GET /api/admin/reports — admin: view all pending reports
app.get('/api/admin/reports', authMiddleware, async (c) => {
  try {
      const result = await getSupabaseDB().prepare(`
        SELECT r.*,
               rep.name as reporter_name,
               ru.name as reported_user_name, ru.role as reported_user_role
        FROM message_reports r
      JOIN users rep ON r.reporter_id = rep.id
      JOIN users ru ON r.reported_user_id = ru.id
      ORDER BY r.created_at DESC
    `).all()
    return c.json({ reports: result.results || [] })
  } catch (error: any) {
    return c.json({ error: 'Failed to fetch reports', message: error.message }, 500)
  }
})

export default app
