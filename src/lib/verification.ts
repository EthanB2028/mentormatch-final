/**
 * MentorMatch Mentor Verification Engine
 *
 * Auto-approval criteria (ALL must pass):
 *  1. Name present
 *  2. Current position + company present
 *  3. experienceYears >= 5
 *  4. linkedin_url present (non-empty, valid URL format, must be linkedin.com)
 *  5. mentor_topics: at least 3 non-empty topics
 *  6. industry: at least 1 selected
 *
 * If all pass → verification_status = 'approved', send interview-schedule email
 * If any fail → remain 'pending', generate admin review report
 */

export interface VerificationResult {
  mentorId: string
  mentorName: string
  passed: boolean
  checks: {
    hasName: boolean
    hasPositionAndCompany: boolean
    hasMinExperience: boolean        // >= 5 years
    hasLinkedIn: boolean             // present + valid linkedin.com URL
    hasEnoughTopics: boolean         // >= 3 topics
    hasIndustry: boolean
  }
  failReasons: string[]
  reportForAdmin: AdminReport | null
}

export interface AdminReport {
  mentorId: string
  name: string
  linkedinUrl: string | null
  yearsExperience: number | null
  mentorTopics: string[]
  industry: string | null
  position: string | null
  company: string | null
  inconsistencies: string[]
  reviewedAt: string
}

function isValidLinkedInUrl(url: string | null | undefined): boolean {
  if (!url || url.trim() === '') return false
  try {
    const parsed = new URL(url.trim())
    return parsed.hostname.includes('linkedin.com')
  } catch {
    return false
  }
}

export function evaluateMentor(mentor: {
  id: string
  name: string
  position?: string | null
  company?: string | null
  experience_years?: number | null
  linkedin_url?: string | null
  mentor_topics?: string | null
  industry?: string | null
}): VerificationResult {
  const topics = (mentor.mentor_topics || '')
    .split(',')
    .map(t => t.trim())
    .filter(t => t.length > 0)

  const checks = {
    hasName: !!(mentor.name && mentor.name.trim().length >= 2),
    hasPositionAndCompany: !!(mentor.position?.trim() && mentor.company?.trim()),
    hasMinExperience: !!(mentor.experience_years && mentor.experience_years >= 5),
    hasLinkedIn: isValidLinkedInUrl(mentor.linkedin_url),
    hasEnoughTopics: topics.length >= 3,
    hasIndustry: !!(mentor.industry && mentor.industry.trim().length > 0),
  }

  const failReasons: string[] = []
  if (!checks.hasName) failReasons.push('Missing or invalid full name')
  if (!checks.hasPositionAndCompany) failReasons.push('Missing current job title or company')
  if (!checks.hasMinExperience) {
    const yrs = mentor.experience_years
    failReasons.push(
      yrs === null || yrs === undefined
        ? 'Years of experience not provided'
        : `Insufficient experience: ${yrs} year(s) (minimum 5 required)`
    )
  }
  if (!checks.hasLinkedIn) failReasons.push('LinkedIn URL missing or invalid (must be a linkedin.com URL)')
  if (!checks.hasEnoughTopics) failReasons.push(`Only ${topics.length} mentorship topic(s) provided (minimum 3 required)`)
  if (!checks.hasIndustry) failReasons.push('No industry selected')

  const passed = Object.values(checks).every(Boolean)

  let reportForAdmin: AdminReport | null = null
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
      reviewedAt: new Date().toISOString(),
    }
  }

  return {
    mentorId: mentor.id,
    mentorName: mentor.name,
    passed,
    checks,
    failReasons,
    reportForAdmin,
  }
}

export function buildApprovalEmail(mentorName: string): { subject: string; body: string } {
  return {
    subject: 'Mentor Application Approved – Schedule Your Interview',
    body: `Congratulations ${mentorName}!

Your MentorMatch application has been approved based on your portfolio and profile.
The next step is a short interview to confirm fit.

Please email ebonthecam@gmail.com to schedule your interview.

We look forward to speaking with you!

— The MentorMatch Team`,
  }
}
