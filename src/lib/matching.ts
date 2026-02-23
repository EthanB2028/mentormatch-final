/**
 * MentorMatch AI Matching Engine
 * Calculates compatibility score (0–100) between a student and a mentor
 * using exact weight categories as specified.
 */

export interface StudentProfile {
  careerField?: string        // tech, medicine, law, business, sports, engineering, science, other
  dreamRole?: string
  helpNeeded?: string         // comma-separated list
  meetingFrequency?: string   // one-time, monthly, bi-weekly
  willingToPrepare?: boolean | number
  adviceStyle?: string        // direct, encouraging, structured
  personalityType?: string    // introverted, extroverted, balanced
}

export interface MentorProfile {
  id: string
  name: string
  industry?: string           // technology, medicine, law, business, sports, engineering, science, education, media, nonprofit, government, other
  position?: string
  experienceYears?: number
  mentorTopics?: string       // comma-separated list
  industriesWorked?: string
  preferredMeetingFreq?: string // one-time, monthly, bi-weekly, flexible
  whyMentor?: string
  adviceStyle?: string        // inferred from mentor data or explicit
  personalityType?: string
  shortBio?: string
  company?: string
  linkedinUrl?: string
  averageRating?: number
  verificationStatus?: string
}

export interface MatchBreakdown {
  careerField: number        // /30
  roleAlignment: number      // /20
  needsMatch: number         // /15
  experience: number         // /10
  personality: number        // /10
  availability: number       // /10
  commitment: number         // /5
}

export interface MatchResult {
  mentor: MentorProfile
  score: number              // 0–100
  tier: 'Elite Match' | 'Strong Match' | 'Good Match' | 'Low Compatibility'
  breakdown: MatchBreakdown
}

// ---------- helpers ----------

const CAREER_FIELD_TO_INDUSTRY: Record<string, string[]> = {
  tech:        ['technology'],
  medicine:    ['medicine'],
  law:         ['law'],
  business:    ['business', 'finance'],
  sports:      ['sports'],
  engineering: ['engineering'],
  science:     ['science'],
  education:   ['education'],
  media:       ['media'],
  nonprofit:   ['nonprofit'],
  government:  ['government'],
}

// closely-related pairs
const RELATED_PAIRS: [string, string][] = [
  ['tech',        'engineering'],
  ['tech',        'science'],
  ['medicine',    'science'],
  ['medicine',    'engineering'],
  ['business',    'law'],
  ['sports',      'business'],
  ['engineering', 'science'],
]

function careerFieldScore(studentField: string | undefined, mentorIndustry: string | undefined): number {
  if (!studentField || !mentorIndustry) return 0

  const sf = studentField.toLowerCase()
  const mi = mentorIndustry.toLowerCase()

  // exact
  const exactIndustries = CAREER_FIELD_TO_INDUSTRY[sf] || [sf]
  if (exactIndustries.includes(mi)) return 30

  // closely related
  for (const [a, b] of RELATED_PAIRS) {
    const aIndustries = CAREER_FIELD_TO_INDUSTRY[a] || [a]
    const bIndustries = CAREER_FIELD_TO_INDUSTRY[b] || [b]
    if ((exactIndustries.some(x => aIndustries.includes(x)) && bIndustries.includes(mi)) ||
        (exactIndustries.some(x => bIndustries.includes(x)) && aIndustries.includes(mi))) {
      return 20
    }
  }

  // somewhat related: same broad category check
  const broadGroups = [
    ['tech', 'engineering', 'science'],
    ['medicine', 'science', 'engineering'],
    ['business', 'law', 'nonprofit', 'government'],
    ['sports', 'media', 'business'],
    ['education', 'nonprofit'],
  ]
  for (const group of broadGroups) {
    const groupIndustries = group.flatMap(g => CAREER_FIELD_TO_INDUSTRY[g] || [g])
    if (exactIndustries.some(x => groupIndustries.includes(x)) && groupIndustries.includes(mi)) {
      return 10
    }
  }

  return 0
}

function roleAlignmentScore(dreamRole: string | undefined, mentor: MentorProfile): number {
  if (!dreamRole) return 0

  const dr = dreamRole.toLowerCase()
  const pos = (mentor.position || '').toLowerCase()
  const bio = (mentor.shortBio || '').toLowerCase()
  const industries = (mentor.industriesWorked || '').toLowerCase()
  const combined = `${pos} ${bio} ${industries} ${mentor.industry || ''}`

  // Extract key words from dream role
  const roleKeywords = dr.split(/[\s,\/\-]+/).filter(w => w.length > 3)
  const directHits = roleKeywords.filter(kw => combined.includes(kw)).length

  if (directHits >= 2 || combined.includes(dr)) return 20
  if (directHits === 1) return 15

  // same field but different role — covered by partial
  const mentorIndustry = (mentor.industry || '').toLowerCase()
  const sfToIndustry = Object.entries(CAREER_FIELD_TO_INDUSTRY)
  for (const [sf, inds] of sfToIndustry) {
    if (inds.includes(mentorIndustry)) {
      // mentor is in a relevant industry, partial relevance
      return 8
    }
  }

  return 0
}

function needsMatchScore(studentHelp: string | undefined, mentorTopics: string | undefined): number {
  if (!studentHelp || !mentorTopics) return 0

  const TOPIC_MAP: Record<string, string[]> = {
    'choosing-major':      ['college-pathway', 'career-entry'],
    'resume-building':     ['resume-review', 'career-entry'],
    'internship-advice':   ['career-entry', 'industry-insights'],
    'college-preparation': ['college-pathway', 'career-entry'],
    'networking':          ['industry-insights', 'leadership', 'career-entry'],
    'starting-business':   ['entrepreneurship', 'leadership'],
    'career-clarity':      ['career-entry', 'industry-insights', 'college-pathway'],
    'interview-prep':      ['interview-prep', 'career-entry'],
    'leadership-skills':   ['leadership', 'entrepreneurship'],
  }

  const studentNeeds = studentHelp.split(',').map(s => s.trim()).filter(Boolean)
  const mentorTopicList = mentorTopics.split(',').map(s => s.trim()).filter(Boolean)

  let matched = 0
  for (const need of studentNeeds) {
    const relevantTopics = TOPIC_MAP[need] || [need]
    if (relevantTopics.some(t => mentorTopicList.includes(t))) {
      matched++
    }
  }

  const total = studentNeeds.length
  if (total === 0) return 0

  const ratio = matched / total
  if (ratio >= 0.9) return 15
  if (ratio >= 0.6) return 10
  if (ratio >= 0.2) return 5
  return 0
}

function experienceScore(years: number | undefined): number {
  if (!years) return 5
  if (years >= 10) return 10
  if (years >= 5) return 8
  return 5
}

function personalityScore(
  studentStyle: string | undefined,
  studentPersonality: string | undefined,
  mentor: MentorProfile
): number {
  // Mentors don't always have an explicit style — infer from bio/motivation
  const mentorStyle = mentor.adviceStyle
  const mentorPersonality = mentor.personalityType

  let score = 0

  // Advice style match
  if (studentStyle && mentorStyle) {
    if (studentStyle === mentorStyle) score += 5
    else score += 2
  } else {
    score += 3 // neutral
  }

  // Personality match
  if (studentPersonality && mentorPersonality) {
    if (studentPersonality === mentorPersonality) score += 5
    else if (studentPersonality === 'balanced' || mentorPersonality === 'balanced') score += 4
    else score += 1
  } else {
    score += 4 // neutral
  }

  return Math.min(score, 10)
}

function availabilityScore(
  studentFreq: string | undefined,
  mentorFreq: string | undefined
): number {
  if (!studentFreq || !mentorFreq) return 5 // neutral

  if (mentorFreq === 'flexible') return 10
  if (studentFreq === mentorFreq) return 10

  // Compatible pairs
  const compatible: [string, string][] = [
    ['monthly', 'bi-weekly'],
    ['bi-weekly', 'monthly'],
  ]
  if (compatible.some(([a, b]) => studentFreq === a && mentorFreq === b)) return 5

  return 0
}

function commitmentScore(
  studentWilling: boolean | number | undefined,
  mentor: MentorProfile
): number {
  const studentCommitted = studentWilling === true || studentWilling === 1
  // Mentor commitment inferred from whyMentor length and having topics
  const mentorBio = (mentor.whyMentor || '').trim()
  const mentorCommitted = mentorBio.length > 50 && (mentor.mentorTopics || '').length > 0

  if (studentCommitted && mentorCommitted) return 5
  if (studentCommitted || mentorCommitted) return 2
  return 0
}

function getTier(score: number): MatchResult['tier'] {
  if (score >= 90) return 'Elite Match'
  if (score >= 75) return 'Strong Match'
  if (score >= 60) return 'Good Match'
  return 'Low Compatibility'
}

// ---------- main export ----------

export function calculateMatchScore(student: StudentProfile, mentor: MentorProfile): MatchResult {
  const careerField   = careerFieldScore(student.careerField, mentor.industry)
  const roleAlignment = roleAlignmentScore(student.dreamRole, mentor)
  const needsMatch    = needsMatchScore(student.helpNeeded, mentor.mentorTopics)
  const experience    = experienceScore(mentor.experienceYears)
  const personality   = personalityScore(student.adviceStyle, student.personalityType, mentor)
  const availability  = availabilityScore(student.meetingFrequency, mentor.preferredMeetingFreq)
  const commitment    = commitmentScore(student.willingToPrepare, mentor)

  const score = careerField + roleAlignment + needsMatch + experience + personality + availability + commitment

  return {
    mentor,
    score: Math.min(score, 100),
    tier: getTier(score),
    breakdown: { careerField, roleAlignment, needsMatch, experience, personality, availability, commitment }
  }
}

export function rankMentors(student: StudentProfile, mentors: MentorProfile[]): MatchResult[] {
  return mentors
    .map(m => calculateMatchScore(student, m))
    .sort((a, b) => b.score - a.score)
}
