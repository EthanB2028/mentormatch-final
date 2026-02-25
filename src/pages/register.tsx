export function RegisterPage() {
  return (
    <div class="min-h-screen bg-white">
      <div class="container mx-auto px-4 py-10 max-w-3xl">
        {/* Header */}
        <div class="text-center mb-10">
          <a href="/" class="inline-block mb-6 hover:no-underline">
            <h1 class="wordmark text-3xl font-bold text-gray-900">Mentor<span class="text-indigo-600">Match</span></h1>
          </a>
          <div class="bg-indigo-50 border border-indigo-100 rounded-3xl inline-block px-8 py-6">
            <h2 class="wordmark text-4xl font-bold text-gray-900 mb-2">Join MentorMatch</h2>
            <p class="text-gray-500 text-base">Choose your role to get started</p>
          </div>
        </div>

        {/* Role Tabs */}
        <div class="flex gap-4 mb-8 justify-center">
          <button id="tabStudent" type="button" onclick="switchRole('student')"
            class="scribble-button px-8 py-3 font-sketch text-lg bg-blue-200 hover:bg-blue-300 transition-colors">
            🎓 Student
          </button>
          <button id="tabMentor" type="button" onclick="switchRole('mentor')"
            class="scribble-button px-8 py-3 font-sketch text-lg bg-gray-100 hover:bg-gray-200 transition-colors">
            🏆 Mentor
          </button>
        </div>

        {/* Student illustration banner */}
        <div id="studentBanner" class="mb-6 rounded-2xl overflow-hidden border-2 border-dashed border-blue-300 bg-blue-50 flex items-center gap-6 px-6 py-4">
          <img
            src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=160&h=160&fit=crop&crop=faces"
            alt="Student"
            class="w-20 h-20 rounded-full object-cover border-2 border-blue-300 flex-shrink-0"
          />
          <div>
            <p class="font-sketch text-lg text-blue-800">Signing up as a Student</p>
            <p class="font-handwritten text-sm text-blue-600 mt-1">Get matched with real-world mentors in your dream career field. Ask questions, get guidance, and chart your path forward.</p>
          </div>
        </div>
        <div id="mentorBanner" class="hidden mb-6 rounded-2xl overflow-hidden border-2 border-dashed border-purple-300 bg-purple-50 flex items-center gap-6 px-6 py-4">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces"
            alt="Mentor"
            class="w-20 h-20 rounded-full object-cover border-2 border-purple-300 flex-shrink-0"
          />
          <div>
            <p class="font-sketch text-lg text-purple-800">Signing up as a Mentor</p>
            <p class="font-handwritten text-sm text-purple-600 mt-1">Share your expertise and help the next generation. Your experience can change a student's life.</p>
          </div>
        </div>

        {/* ===== STUDENT FORM ===== */}
        <div id="studentForm">
          <form id="studentRegistrationForm" class="scribble-card-large p-8 bg-gray-50 space-y-10">
            <input type="hidden" name="role" value="student" />

            {/* S1: Basic Info */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 1: Basic Info</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">Full Name *</label>
                    <input type="text" name="name" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">Age *</label>
                    <input type="number" name="age" required min="10" max="30"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="e.g. 16" />
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">School / University *</label>
                    <input type="text" name="school" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                        placeholder="e.g. Northgate High School" />
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">Grade Level *</label>
                    <select name="gradeLevel" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid bg-white">
                      <option value="">Select grade</option>
                      <option value="4th">4th Grade</option>
                      <option value="5th">5th Grade</option>
                      <option value="6th">6th Grade</option>
                      <option value="7th">7th Grade</option>
                      <option value="8th">8th Grade</option>
                      <option value="9th">9th Grade (Freshman)</option>
                      <option value="10th">10th Grade (Sophomore)</option>
                      <option value="11th">11th Grade (Junior)</option>
                      <option value="12th">12th Grade (Senior)</option>
                      <option value="college-freshman">College Freshman</option>
                      <option value="college-sophomore">College Sophomore</option>
                      <option value="college-junior">College Junior</option>
                      <option value="college-senior">College Senior</option>
                      <option value="graduate">Graduate Student</option>
                    </select>
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">Email Address *</label>
                    <input type="email" name="email" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">LinkedIn (optional)</label>
                    <input type="text" name="linkedinUrl"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
                <div>
                  <label class="block font-sketch mb-2">Password *</label>
                  <input type="password" name="password" required minLength={8}
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    placeholder="At least 8 characters" />
                </div>
              </div>
            </section>

            {/* S2: Career Interests */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 2: Career Interests</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-5">
                <div>
                  <label class="block font-sketch mb-3">What career field are you interested in? *</label>
                  <div class="grid grid-cols-2 md:grid-cols-4 gap-3" id="careerFieldGroup">
                    {[
                      { value: "tech", label: "💻 Tech" },
                      { value: "medicine", label: "⚕️ Medicine" },
                      { value: "law", label: "⚖️ Law" },
                      { value: "business", label: "💼 Business / Entrepreneurship" },
                      { value: "sports", label: "🏅 Sports Industry" },
                      { value: "engineering", label: "⚙️ Engineering" },
                      { value: "science", label: "🔬 Science" },
                      { value: "other", label: "✏️ Other" },
                    ].map(opt => (
                      <label class="career-field-option cursor-pointer" key={opt.value}>
                        <input type="radio" name="careerField" value={opt.value} class="hidden" />
                        <div class="scribble-card p-3 text-center text-sm font-handwritten hover:bg-blue-50 transition-colors select-indicator">
                          {opt.label}
                        </div>
                      </label>
                    ))}
                  </div>
                  <div class="mt-3 hidden" id="otherCareerWrap">
                    <input type="text" name="careerFieldOther"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="Describe your career field..." />
                  </div>
                </div>
                <div>
                  <label class="block font-sketch mb-2">What specific role do you dream of? *</label>
                  <input type="text" name="dreamRole" required
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    placeholder="e.g. Sports agent, orthopedic surgeon, startup founder, NBA GM..." />
                </div>
                <div>
                  <label class="block font-sketch mb-2">Why are you interested in this career? *</label>
                  <textarea name="careerInterestWhy" required rows={4}
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none"
                    placeholder="Write a short paragraph about your passion and motivation..." />
                </div>
              </div>
            </section>

            {/* S3: Help Needed */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 3: What Do You Need Help With?</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <p class="font-handwritten text-gray-600 mb-4">Select all that apply:</p>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "choosing-major", label: "Choosing a major" },
                  { value: "resume-building", label: "Resume building" },
                  { value: "internship-advice", label: "Internship advice" },
                  { value: "college-preparation", label: "College preparation" },
                  { value: "networking", label: "Networking" },
                  { value: "starting-business", label: "Starting a business" },
                  { value: "career-clarity", label: "Career clarity" },
                  { value: "interview-prep", label: "Interview prep" },
                  { value: "leadership-skills", label: "Leadership skills" },
                ].map(opt => (
                  <label class="flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-yellow-50 transition-colors" key={opt.value}>
                    <input type="checkbox" name="helpNeeded" value={opt.value} class="w-5 h-5 accent-black" />
                    <span class="font-handwritten">{opt.label}</span>
                  </label>
                ))}
              </div>
            </section>

            {/* S4: Commitment */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 4: Commitment &amp; Expectations</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-5">
                <div>
                  <label class="block font-sketch mb-3">How often would you like to meet? *</label>
                  <div class="flex flex-col gap-3">
                    {[
                      { value: "one-time", label: "One-time conversation" },
                      { value: "monthly", label: "Monthly" },
                      { value: "bi-weekly", label: "Bi-weekly" },
                    ].map(opt => (
                      <label class="flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-green-50 transition-colors" key={opt.value}>
                        <input type="radio" name="meetingFrequency" value={opt.value} class="w-5 h-5 accent-black" />
                        <span class="font-handwritten">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div class="scribble-card p-4 bg-yellow-50">
                  <label class="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" name="willingToPrepare" value="yes" class="mt-1 w-5 h-5 accent-black" />
                    <span class="font-handwritten"><strong>Are you willing to prepare questions before each session?</strong> (Required — this ensures productive meetings)</span>
                  </label>
                </div>
              </div>
            </section>

            {/* S5: Personality */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 5: Personality &amp; Matching</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-5">
                <div>
                  <label class="block font-sketch mb-3">Do you prefer... *</label>
                  <div class="flex flex-col gap-3">
                    {[
                      { value: "direct", label: "Direct, tough advice" },
                      { value: "encouraging", label: "Encouraging guidance" },
                      { value: "structured", label: "Structured step-by-step coaching" },
                    ].map(opt => (
                      <label class="flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-purple-50 transition-colors" key={opt.value}>
                        <input type="radio" name="adviceStyle" value={opt.value} class="w-5 h-5 accent-black" />
                        <span class="font-handwritten">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label class="block font-sketch mb-3">Are you introverted, extroverted, or balanced? *</label>
                  <div class="flex gap-3">
                    {[
                      { value: "introverted", label: "Introverted" },
                      { value: "extroverted", label: "Extroverted" },
                      { value: "balanced", label: "Balanced" },
                    ].map(opt => (
                      <label class="flex-1 cursor-pointer" key={opt.value}>
                        <input type="radio" name="personalityType" value={opt.value} class="hidden" />
                        <div class="scribble-card p-3 text-center font-handwritten hover:bg-blue-50 transition-colors select-indicator">
                          {opt.label}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

              {/* Code of Conduct */}
              <section class="scribble-card p-6 bg-blue-50 border-2 border-blue-300">
                <h3 class="font-sketch text-xl mb-1">MentorMatch Code of Conduct &amp; Safety Guidelines</h3>
                <p class="font-handwritten text-sm text-gray-500 mb-4">You must read and agree to the full policy before creating an account.</p>

                {/* Scrollable full CoC */}
                <div class="bg-white border-2 border-dashed border-blue-300 rounded-lg p-5 h-64 overflow-y-auto mb-5 space-y-4 text-sm font-handwritten leading-relaxed">
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">Introduction</p>
                    <p>MentorMatch is committed to providing a professional and supportive environment for students (mentees) and mentors. By using this platform, all participants agree to follow these rules and acknowledge responsibilities and risks outlined below.</p>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">1. Personal Safety &amp; Online Conduct</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Mentors and mentees <strong>may share personal contact information</strong> at their discretion.</li>
                      <li><strong>All such interactions are the sole responsibility of the users.</strong> MentorMatch is <strong>not liable</strong> for any issues arising from off-platform communication, including scams, harassment, or negative experiences.</li>
                      <li>Users should exercise caution when sharing personal info or meeting in person.</li>
                      <li>Any professional misconduct or abusive behavior may be reported using the platform's reporting system.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">2. Liability &amp; Disclaimers</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>MentorMatch <strong>does not guarantee</strong> mentorship outcomes, career advancement, or safety from interactions outside the platform.</li>
                      <li>Any negative experiences, scams, or misuse of information <strong>are not the responsibility of MentorMatch</strong>.</li>
                      <li>Students under 18 should have <strong>parental/guardian consent</strong> to participate in mentorship sessions.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">3. Professional Behavior</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Mentors should provide guidance <strong>ethically and honestly</strong>, based on their own experience.</li>
                      <li>Mentees should <strong>respect mentors' time</strong> and prepare for each session.</li>
                      <li>Both parties should communicate responsibly and notify the other if unavailable for a scheduled session.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">4. Reporting System (AI-Enforced)</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Users may report any <strong>inappropriate behavior, scams, harassment, or negative experiences</strong> through the MentorMatch platform.</li>
                      <li>Reports should include: name of the user being reported, description of the issue, and any supporting evidence (screenshots, messages, etc.).</li>
                      <li>The AI will <strong>flag reports automatically</strong> and notify admins for review.</li>
                      <li>MentorMatch will <strong>investigate all reports</strong> and may suspend or remove users.</li>
                      <li>Users <strong>should not attempt to resolve serious issues on their own</strong>; always report via the platform.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">5. Content &amp; Intellectual Property</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Users should share original content or properly credit sources.</li>
                      <li>Mentorship content may be shared at users' discretion, but MentorMatch is <strong>not liable</strong> for misuse or redistribution of materials outside the platform.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">6. Account Integrity</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>All users must provide <strong>accurate and truthful information</strong> during registration.</li>
                      <li>False, misleading, or fraudulent accounts may be suspended or removed.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">7. Enforcement</p>
                    <p>Violations of this Code of Conduct may result in:</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Temporary suspension</li>
                      <li>Permanent removal of account</li>
                      <li>Reporting to authorities if laws are broken</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">8. Acceptance</p>
                    <p>By signing up for MentorMatch, you acknowledge that:</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Sharing personal contact information is at your <strong>own risk</strong>.</li>
                      <li>MentorMatch <strong>is not liable</strong> for any scams, fraud, or negative experiences.</li>
                      <li>You understand the platform's rules and agree to follow this Code of Conduct.</li>
                      <li>All reports will be reviewed promptly, and users may be suspended or removed if warranted.</li>
                    </ul>
                  </div>
                </div>

                {/* Key summary bullets */}
                <div class="mb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Respectful, professional communication",
                    "No harassment or abusive behavior",
                    "Maintain professional boundaries",
                    "Honor scheduled session commitments",
                    "Provide accurate registration info",
                    "Report issues through the platform only",
                    "Off-platform interactions are your responsibility",
                    "Students under 18 require parental consent",
                  ].map(item => (
                    <div class="flex items-start gap-2 font-handwritten text-sm" key={item}>
                      <span class="text-green-600 font-bold mt-0.5">✔</span> {item}
                    </div>
                  ))}
                </div>

                <label class="flex items-start gap-3 cursor-pointer bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <input type="checkbox" name="conductAgreed" id="studentConductAgreed" class="mt-1 w-5 h-5 accent-black flex-shrink-0" />
                    <span class="font-handwritten text-sm"><strong>I have read and agree</strong> to the MentorMatch Code of Conduct &amp; Safety Guidelines. I understand my responsibilities, the platform's limitations of liability, and that violations may result in suspension or removal of my account.</span>
                  </label>
                </section>

                <div id="studentMsg" class="hidden p-4 border-2 border-dashed rounded-lg">
              <p class="font-handwritten text-sm"></p>
            </div>

            <button type="submit" id="studentSubmitBtn"
              class="w-full scribble-button p-4 font-sketch text-xl bg-blue-200 hover:bg-blue-300 transition-colors">
              <span class="btn-text">Create Student Account 🎓</span>
              <span class="btn-loader hidden">
                <svg class="animate-spin inline-block w-5 h-5 mr-2" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="8" fill="none" stroke-dasharray="60 40" />
                </svg>
                Creating account...
              </span>
            </button>
            <p class="text-center font-handwritten text-sm">Already have an account? <a href="/login" class="font-sketch font-bold underline">Sign in</a></p>
          </form>
        </div>

        {/* ===== MENTOR FORM ===== */}
        <div id="mentorForm" class="hidden">
          <form id="mentorRegistrationForm" class="scribble-card-large p-8 bg-gray-50 space-y-10">
            <input type="hidden" name="role" value="mentor" />

            {/* M1: Professional Background */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 1: Professional Background</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-4">
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">Full Name *</label>
                    <input type="text" name="name" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="Your full name" />
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">Current Job Title *</label>
                    <input type="text" name="position" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="e.g. Orthopedic Surgeon, VP of Engineering" />
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">Company / Organization *</label>
                    <input type="text" name="company" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="e.g. Google, Mayo Clinic, Self-employed" />
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">Years of Experience *</label>
                    <input type="number" name="experienceYears" required min="1" max="60"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="e.g. 12" />
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">Industry *</label>
                    <select name="industry" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid bg-white">
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="medicine">Medicine / Healthcare</option>
                      <option value="law">Law</option>
                      <option value="business">Business / Finance</option>
                      <option value="sports">Sports Industry</option>
                      <option value="engineering">Engineering</option>
                      <option value="science">Science / Research</option>
                      <option value="education">Education</option>
                      <option value="media">Media / Entertainment</option>
                      <option value="nonprofit">Non-Profit</option>
                      <option value="government">Government / Public Service</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">LinkedIn *</label>
                    <input type="text" name="linkedinUrl" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                  <div>
                    <label class="block font-sketch mb-2">Email Address *</label>
                    <input type="email" name="email" required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="your@email.com" />
                  </div>
                  <div>
                    <label class="block font-sketch mb-2">Password *</label>
                    <input type="password" name="password" required minLength={8}
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      placeholder="At least 8 characters" />
                    <p class="font-handwritten text-xs text-gray-500 mt-1">Choose a unique password you don't use elsewhere — min 8 characters.</p>
                  </div>
                </div>
                <div>
                  <label class="block font-sketch mb-2">Short Bio (2–3 paragraphs) *</label>
                  <textarea name="shortBio" required rows={6}
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none"
                    placeholder="Tell students about your career journey, what you've accomplished, and what makes you the right person to guide them..." />
                </div>
              </div>
            </section>

            {/* M2: Expertise */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 2: Expertise</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-5">
                <div>
                  <label class="block font-sketch mb-3">What topics can you mentor on? (Select all that apply)</label>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { value: "career-entry", label: "Career entry strategy" },
                      { value: "leadership", label: "Leadership" },
                      { value: "entrepreneurship", label: "Entrepreneurship" },
                      { value: "industry-insights", label: "Industry insights" },
                      { value: "college-pathway", label: "College pathway advice" },
                      { value: "resume-review", label: "Resume review" },
                      { value: "interview-prep", label: "Interview prep" },
                    ].map(opt => (
                      <label class="flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-yellow-50 transition-colors" key={opt.value}>
                        <input type="checkbox" name="mentorTopics" value={opt.value} class="w-5 h-5 accent-black" />
                        <span class="font-handwritten">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label class="block font-sketch mb-2">What industries have you worked in? *</label>
                  <input type="text" name="industriesWorked" required
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    placeholder="e.g. Healthcare, Biotech, Medical Devices" />
                </div>
              </div>
            </section>

            {/* M3: Availability */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 3: Availability</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-5">
                <div>
                  <label class="block font-sketch mb-2">How many mentees can you take on? *</label>
                  <select name="maxMentees" required
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid bg-white">
                    <option value="">Select capacity</option>
                    <option value="1">1 mentee</option>
                    <option value="2">2 mentees</option>
                    <option value="3">3 mentees</option>
                    <option value="5">Up to 5 mentees</option>
                    <option value="10">Up to 10 mentees</option>
                  </select>
                </div>
                <div>
                  <label class="block font-sketch mb-3">Preferred meeting frequency *</label>
                  <div class="flex flex-col gap-3">
                    {[
                      { value: "one-time", label: "One-time conversations only" },
                      { value: "monthly", label: "Monthly" },
                      { value: "bi-weekly", label: "Bi-weekly" },
                      { value: "flexible", label: "Flexible / Student's preference" },
                    ].map(opt => (
                      <label class="flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-green-50 transition-colors" key={opt.value}>
                        <input type="radio" name="preferredMeetingFreq" value={opt.value} class="w-5 h-5 accent-black" />
                        <span class="font-handwritten">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label class="block font-sketch mb-3">Meeting format *</label>
                  <div class="flex flex-col gap-3">
                    {[
                      { value: "virtual-only", label: "Virtual only" },
                      { value: "open-to-inperson", label: "Open to in-person (depending on location)" },
                    ].map(opt => (
                      <label class="flex items-center gap-3 cursor-pointer scribble-card p-3 hover:bg-blue-50 transition-colors" key={opt.value}>
                        <input type="radio" name="virtualOrInperson" value={opt.value} class="w-5 h-5 accent-black" />
                        <span class="font-handwritten">{opt.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* M4: Motivation */}
            <section>
              <h3 class="font-sketch text-2xl mb-1">Section 4: Motivation</h3>
              <div class="w-16 h-1 bg-black mb-6 rounded"></div>
              <div class="space-y-5">
                <div>
                  <label class="block font-sketch mb-2">Why do you want to mentor students? *</label>
                  <textarea name="whyMentor" required rows={4}
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none"
                    placeholder="What drives you to give back and help the next generation..." />
                </div>
                <div>
                  <label class="block font-sketch mb-2">Have you had mentors who impacted you? *</label>
                  <textarea name="hadMentors" required rows={3}
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none"
                    placeholder="Share a brief story about a mentor who shaped your path (or how the lack of one affected you)..." />
                </div>
              </div>
            </section>

              {/* Code of Conduct */}
              <section class="scribble-card p-6 bg-blue-50 border-2 border-blue-300">
                <h3 class="font-sketch text-xl mb-1">MentorMatch Code of Conduct &amp; Safety Guidelines</h3>
                <p class="font-handwritten text-sm text-gray-500 mb-4">You must read and agree to the full policy before creating an account.</p>

                {/* Scrollable full CoC */}
                <div class="bg-white border-2 border-dashed border-blue-300 rounded-lg p-5 h-64 overflow-y-auto mb-5 space-y-4 text-sm font-handwritten leading-relaxed">
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">Introduction</p>
                    <p>MentorMatch is committed to providing a professional and supportive environment for students (mentees) and mentors. By using this platform, all participants agree to follow these rules and acknowledge responsibilities and risks outlined below.</p>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">1. Personal Safety &amp; Online Conduct</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Mentors and mentees <strong>may share personal contact information</strong> at their discretion.</li>
                      <li><strong>All such interactions are the sole responsibility of the users.</strong> MentorMatch is <strong>not liable</strong> for any issues arising from off-platform communication, including scams, harassment, or negative experiences.</li>
                      <li>Users should exercise caution when sharing personal info or meeting in person.</li>
                      <li>Any professional misconduct or abusive behavior may be reported using the platform's reporting system.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">2. Liability &amp; Disclaimers</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>MentorMatch <strong>does not guarantee</strong> mentorship outcomes, career advancement, or safety from interactions outside the platform.</li>
                      <li>Any negative experiences, scams, or misuse of information <strong>are not the responsibility of MentorMatch</strong>.</li>
                      <li>Students under 18 should have <strong>parental/guardian consent</strong> to participate in mentorship sessions.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">3. Professional Behavior</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Mentors should provide guidance <strong>ethically and honestly</strong>, based on their own experience.</li>
                      <li>Mentees should <strong>respect mentors' time</strong> and prepare for each session.</li>
                      <li>Both parties should communicate responsibly and notify the other if unavailable for a scheduled session.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">4. Reporting System (AI-Enforced)</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Users may report any <strong>inappropriate behavior, scams, harassment, or negative experiences</strong> through the MentorMatch platform.</li>
                      <li>Reports should include: name of the user being reported, description of the issue, and any supporting evidence (screenshots, messages, etc.).</li>
                      <li>The AI will <strong>flag reports automatically</strong> and notify admins for review.</li>
                      <li>MentorMatch will <strong>investigate all reports</strong> and may suspend or remove users.</li>
                      <li>Users <strong>should not attempt to resolve serious issues on their own</strong>; always report via the platform.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">5. Content &amp; Intellectual Property</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Users should share original content or properly credit sources.</li>
                      <li>Mentorship content may be shared at users' discretion, but MentorMatch is <strong>not liable</strong> for misuse or redistribution of materials outside the platform.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">6. Account Integrity</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>All users must provide <strong>accurate and truthful information</strong> during registration.</li>
                      <li>False, misleading, or fraudulent accounts may be suspended or removed.</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">7. Enforcement</p>
                    <p>Violations of this Code of Conduct may result in:</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Temporary suspension</li>
                      <li>Permanent removal of account</li>
                      <li>Reporting to authorities if laws are broken</li>
                    </ul>
                  </div>
                  <div>
                    <p class="font-sketch font-bold text-base mb-1">8. Acceptance</p>
                    <p>By signing up for MentorMatch, you acknowledge that:</p>
                    <ul class="list-disc pl-5 space-y-1">
                      <li>Sharing personal contact information is at your <strong>own risk</strong>.</li>
                      <li>MentorMatch <strong>is not liable</strong> for any scams, fraud, or negative experiences.</li>
                      <li>You understand the platform's rules and agree to follow this Code of Conduct.</li>
                      <li>All reports will be reviewed promptly, and users may be suspended or removed if warranted.</li>
                    </ul>
                  </div>
                </div>

                {/* Key summary bullets */}
                <div class="mb-5 grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    "Respectful, professional communication",
                    "No harassment or abusive behavior",
                    "Maintain professional boundaries",
                    "Honor scheduled session commitments",
                    "Provide accurate registration info",
                    "Report issues through the platform only",
                    "Off-platform interactions are your responsibility",
                    "Students under 18 require parental consent",
                  ].map(item => (
                    <div class="flex items-start gap-2 font-handwritten text-sm" key={item}>
                      <span class="text-green-600 font-bold mt-0.5">✔</span> {item}
                    </div>
                  ))}
                </div>

                <label class="flex items-start gap-3 cursor-pointer bg-yellow-50 border border-yellow-300 rounded-lg p-4">
                    <input type="checkbox" name="conductAgreed" id="mentorConductAgreed" class="mt-1 w-5 h-5 accent-black flex-shrink-0" />
                    <span class="font-handwritten text-sm"><strong>I have read and agree</strong> to the MentorMatch Code of Conduct &amp; Safety Guidelines. I understand my responsibilities, the platform's limitations of liability, and that violations may result in suspension or removal of my account.</span>
                  </label>
                </section>

                <div id="mentorMsg" class="hidden p-4 border-2 border-dashed rounded-lg">
              <p class="font-handwritten text-sm"></p>
            </div>

            <button type="submit" id="mentorSubmitBtn"
              class="w-full scribble-button p-4 font-sketch text-xl bg-purple-200 hover:bg-purple-300 transition-colors">
              <span class="btn-text">Create Mentor Account 🏆</span>
              <span class="btn-loader hidden">
                <svg class="animate-spin inline-block w-5 h-5 mr-2" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="8" fill="none" stroke-dasharray="60 40" />
                </svg>
                Creating account...
              </span>
            </button>
            <p class="text-center font-handwritten text-sm">Already have an account? <a href="/login" class="font-sketch font-bold underline">Sign in</a></p>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
          // Tab switching
          function switchRole(role) {
            var sf = document.getElementById('studentForm')
            var mf = document.getElementById('mentorForm')
            var ts = document.getElementById('tabStudent')
            var tm = document.getElementById('tabMentor')
            var sb = document.getElementById('studentBanner')
            var mb = document.getElementById('mentorBanner')
            if (role === 'student') {
              sf.classList.remove('hidden')
              mf.classList.add('hidden')
              sb.classList.remove('hidden')
              mb.classList.add('hidden')
              ts.classList.add('bg-blue-200')
              ts.classList.remove('bg-gray-100')
              tm.classList.add('bg-gray-100')
              tm.classList.remove('bg-purple-200')
            } else {
              mf.classList.remove('hidden')
              sf.classList.add('hidden')
              mb.classList.remove('hidden')
              sb.classList.add('hidden')
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
                showMsg(msgDiv, msgP, '⚠️ Please scroll down and agree to the Code of Conduct before submitting.', false)
                conductBox.closest('label') && conductBox.closest('label').scrollIntoView({ behavior: 'smooth', block: 'center' })
                return
              }
              var prepBox = form.querySelector('[name="willingToPrepare"]')
              if (prepBox && !prepBox.checked) {
                showMsg(msgDiv, msgP, '⚠️ Please confirm you are willing to prepare questions before each session.', false)
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
                showMsg(msgDiv, msgP, '✅ Account created! Redirecting to your dashboard...', true)
                setTimeout(function() { window.location.href = '/dashboard' }, 1800)
              } else {
                var errMsg = result.error || 'Registration failed'
                if (result.issues && result.issues.length) {
                  errMsg = result.issues.map(function(i) { return i.message }).join(', ')
                } else if (result.message) {
                  errMsg = result.message
                }
                showMsg(msgDiv, msgP, '❌ ' + errMsg, false)
                btn.disabled = false
                btn.querySelector('.btn-text').classList.remove('hidden')
                btn.querySelector('.btn-loader').classList.add('hidden')
              }
            } catch(err) {
              showMsg(msgDiv, msgP, '❌ Network error. Please try again.', false)
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
      ` }} />
    </div>
  )
}
