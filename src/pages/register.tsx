export function RegisterPage() {
  return (
    <div class="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <nav class="w-full px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100">
        <a href="/" class="text-xl font-bold text-gray-900 tracking-tight">
          Mentor<span class="text-indigo-600">Match</span>
        </a>
        <a href="/login" class="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
          Already have an account? <span class="font-semibold text-indigo-600">Sign in</span>
        </a>
      </nav>

      <div class="flex flex-1 items-start justify-center px-4 py-10">
        <div class="w-full max-w-2xl">

          {/* Page header */}
          <div class="text-center mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
            <p class="text-gray-500">Join thousands of students and mentors on MentorMatch</p>
          </div>

          {/* Role selector */}
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 flex gap-2 mb-6">
            <button
              id="roleStudent"
              type="button"
              onclick="setRole('student')"
              class="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all bg-indigo-600 text-white shadow-sm"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/>
              </svg>
              I'm a Student
            </button>
            <button
              id="roleMentor"
              type="button"
              onclick="setRole('mentor')"
              class="flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              I'm a Mentor
            </button>
          </div>

          {/* Progress bar */}
          <div class="mb-6">
            <div class="flex items-center justify-between mb-2">
              <span id="stepLabel" class="text-xs font-medium text-gray-500">Step 1 of 5</span>
              <span id="stepName" class="text-xs font-medium text-indigo-600">Basic Info</span>
            </div>
            <div class="w-full bg-gray-100 rounded-full h-1.5">
              <div id="progressBar" class="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" style="width: 20%"></div>
            </div>
          </div>

          {/* Error message */}
          <div id="errorBox" class="hidden mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl">
            <p id="errorText" class="text-sm text-red-700 font-medium"></p>
            <ul id="errorList" class="mt-1 text-xs text-red-600 list-disc list-inside space-y-0.5"></ul>
          </div>

          {/* Success message */}
          <div id="successBox" class="hidden mb-5 p-3.5 bg-green-50 border border-green-200 rounded-xl">
            <p id="successText" class="text-sm text-green-700 font-medium"></p>
          </div>

          {/* Form card */}
          <div class="bg-white rounded-2xl border border-gray-100 shadow-sm">

            {/* ─── STEP 1: Basic Info (both roles) ─── */}
            <div id="step1" class="p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-sm font-bold text-indigo-600">1</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900">Basic Information</h2>
                  <p class="text-xs text-gray-500">Tell us about yourself</p>
                </div>
              </div>

              <div class="space-y-5">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div class="sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Name <span class="text-red-500">*</span></label>
                    <input type="text" id="f_name" name="name" required autocomplete="name"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your full name" />
                  </div>

                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Email Address <span class="text-red-500">*</span></label>
                    <input type="email" id="f_email" name="email" required autocomplete="email"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="you@example.com" />
                  </div>

                  <div class="student-field">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Age <span class="text-red-500">*</span></label>
                    <input type="number" id="f_age" name="age" min="10" max="30"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your age" />
                  </div>

                  <div class="mentor-field hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Job Title <span class="text-red-500">*</span></label>
                    <input type="text" id="f_position" name="position"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="e.g. Senior Software Engineer" />
                  </div>

                  <div class="student-field">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">School / University <span class="text-red-500">*</span></label>
                    <input type="text" id="f_school" name="school"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your school name" />
                  </div>

                  <div class="mentor-field hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Company / Organization <span class="text-red-500">*</span></label>
                    <input type="text" id="f_company" name="company"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Your company" />
                  </div>

                  <div class="student-field">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Grade Level <span class="text-red-500">*</span></label>
                    <select id="f_gradeLevel" name="gradeLevel"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white">
                      <option value="">Select grade level</option>
                      <option value="4th Grade">4th Grade</option>
                      <option value="5th Grade">5th Grade</option>
                      <option value="6th Grade">6th Grade</option>
                      <option value="7th Grade">7th Grade</option>
                      <option value="8th Grade">8th Grade</option>
                      <option value="9th Grade">9th Grade</option>
                      <option value="10th Grade">10th Grade</option>
                      <option value="11th Grade">11th Grade</option>
                      <option value="12th Grade">12th Grade</option>
                      <option value="College Freshman">College Freshman</option>
                      <option value="College Sophomore">College Sophomore</option>
                      <option value="College Junior">College Junior</option>
                      <option value="College Senior">College Senior</option>
                      <option value="Graduate Student">Graduate Student</option>
                    </select>
                  </div>

                  <div class="mentor-field hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Years of Experience <span class="text-red-500">*</span></label>
                    <input type="number" id="f_experienceYears" name="experienceYears" min="1" max="60"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="Years in your field" />
                  </div>

                  <div class="mentor-field hidden">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Industry <span class="text-red-500">*</span></label>
                    <select id="f_industry" name="industry"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition bg-white">
                      <option value="">Select industry</option>
                      <option value="technology">Technology</option>
                      <option value="medicine">Medicine / Healthcare</option>
                      <option value="law">Law</option>
                      <option value="business">Business / Finance</option>
                      <option value="sports">Sports</option>
                      <option value="engineering">Engineering</option>
                      <option value="science">Science / Research</option>
                      <option value="education">Education</option>
                      <option value="media">Media / Entertainment</option>
                      <option value="nonprofit">Nonprofit</option>
                      <option value="government">Government / Policy</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div class="mentor-field hidden sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL <span class="text-red-500">*</span></label>
                    <input type="url" id="f_linkedinUrl" name="linkedinUrl"
                      class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="https://linkedin.com/in/yourprofile" />
                  </div>

                  <div class="student-field sm:col-span-2">
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">LinkedIn URL <span class="text-gray-400 font-normal">(optional)</span></label>
                    <input type="url" id="f_linkedinUrlStudent" name="linkedinUrlStudent"
                      class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                      placeholder="https://linkedin.com/in/yourprofile" />
                  </div>
                </div>

                {/* Password */}
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2 border-t border-gray-50">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Password <span class="text-red-500">*</span></label>
                    <div class="relative">
                      <input type="password" id="f_password" name="password" required autocomplete="new-password"
                        class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-10"
                        placeholder="Min 8 characters" />
                      <button type="button" onclick="togglePw('f_password')"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" tabindex="-1">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                    </div>
                    <div id="pwStrength" class="mt-1.5 flex gap-1">
                      <div class="h-1 flex-1 rounded bg-gray-100" id="ps1"></div>
                      <div class="h-1 flex-1 rounded bg-gray-100" id="ps2"></div>
                      <div class="h-1 flex-1 rounded bg-gray-100" id="ps3"></div>
                      <div class="h-1 flex-1 rounded bg-gray-100" id="ps4"></div>
                    </div>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password <span class="text-red-500">*</span></label>
                    <div class="relative">
                      <input type="password" id="f_confirmPassword" name="confirmPassword" required autocomplete="new-password"
                        class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-10"
                        placeholder="Repeat your password" />
                      <button type="button" onclick="togglePw('f_confirmPassword')"
                        class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600" tabindex="-1">
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                      </button>
                    </div>
                    <p id="pwMatch" class="mt-1 text-xs hidden"></p>
                  </div>
                </div>
              </div>
            </div>

            {/* ─── STEP 2: Career / Background ─── */}
            <div id="step2" class="hidden p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-sm font-bold text-indigo-600">2</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900 student-field">Career Interests</h2>
                  <h2 class="text-lg font-bold text-gray-900 mentor-field hidden">Professional Background</h2>
                  <p class="text-xs text-gray-500">Share your aspirations and experience</p>
                </div>
              </div>

              {/* Student step 2 */}
              <div class="student-field space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Career Field <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {['Technology', 'Medicine', 'Law', 'Business', 'Sports', 'Engineering', 'Science', 'Other'].map(f => (
                      <label class="career-chip relative flex items-center gap-2 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all text-sm font-medium text-gray-700">
                        <input type="radio" name="careerField" value={f.toLowerCase()} class="sr-only peer" />
                        <div class="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex-shrink-0 transition-all"></div>
                        {f}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Dream Role <span class="text-red-500">*</span></label>
                  <input type="text" id="f_dreamRole" name="dreamRole"
                    class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="e.g. Software Engineer at Google, Doctor, Lawyer..." />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Why are you interested in this career? <span class="text-red-500">*</span></label>
                  <textarea id="f_careerInterestWhy" name="careerInterestWhy" rows={3}
                    class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    placeholder="Share what drives your passion for this field..."></textarea>
                </div>
              </div>

              {/* Mentor step 2 */}
              <div class="mentor-field hidden space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Short Bio <span class="text-red-500">*</span> <span class="text-gray-400 font-normal">(2–3 paragraphs)</span></label>
                  <textarea id="f_shortBio" name="shortBio" rows={6}
                    class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    placeholder="Tell students about your journey, your work, and what you're passionate about. This is what they'll see on your profile..."></textarea>
                  <p class="mt-1 text-xs text-gray-400" id="bioCharCount">0 / 1000 characters</p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Mentor Topics <span class="text-gray-400 font-normal">(select all that apply)</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { value: 'career-entry', label: 'Breaking into the field' },
                      { value: 'leadership', label: 'Leadership & management' },
                      { value: 'entrepreneurship', label: 'Entrepreneurship' },
                      { value: 'industry-insights', label: 'Industry insights' },
                      { value: 'college-pathway', label: 'College pathway' },
                      { value: 'resume-review', label: 'Resume & applications' },
                      { value: 'interview-prep', label: 'Interview prep' },
                    ].map(t => (
                      <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <input type="checkbox" name="mentorTopics" value={t.value} class="mentor-topic-cb w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span class="text-sm font-medium text-gray-700">{t.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Industries Worked In <span class="text-red-500">*</span></label>
                  <input type="text" id="f_industriesWorked" name="industriesWorked"
                    class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    placeholder="e.g. Big Tech, Startups, Healthcare..." />
                </div>
              </div>
            </div>

            {/* ─── STEP 3: Help Needed / Availability ─── */}
            <div id="step3" class="hidden p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-sm font-bold text-indigo-600">3</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900 student-field">What do you need help with?</h2>
                  <h2 class="text-lg font-bold text-gray-900 mentor-field hidden">Availability & Capacity</h2>
                  <p class="text-xs text-gray-500 student-field">Help us find the right mentor for you</p>
                  <p class="text-xs text-gray-500 mentor-field hidden">Set your mentoring availability</p>
                </div>
              </div>

              {/* Student step 3 */}
              <div class="student-field space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Areas you want help with <span class="text-red-500">*</span> <span class="text-gray-400 font-normal">(select all that apply)</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { value: 'choosing-major', label: 'Choosing a major' },
                      { value: 'resume-building', label: 'Resume building' },
                      { value: 'internship-advice', label: 'Internship advice' },
                      { value: 'college-prep', label: 'College prep' },
                      { value: 'networking', label: 'Networking' },
                      { value: 'starting-business', label: 'Starting a business' },
                      { value: 'career-clarity', label: 'Career clarity' },
                      { value: 'interview-prep', label: 'Interview prep' },
                      { value: 'leadership-skills', label: 'Leadership skills' },
                    ].map(h => (
                      <label class="flex items-center gap-3 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <input type="checkbox" name="helpNeeded" value={h.value} class="help-cb w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                        <span class="text-sm font-medium text-gray-700">{h.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mentor step 3 */}
              <div class="mentor-field hidden space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Maximum Mentees <span class="text-red-500">*</span></label>
                  <div class="flex gap-3">
                    {[1, 2, 3, 5, 10].map(n => (
                      <label class="flex-1 flex flex-col items-center gap-1 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <input type="radio" name="maxMentees" value={String(n)} class="sr-only peer" />
                        <div class="w-5 h-5 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 transition-all"></div>
                        <span class="text-sm font-bold text-gray-800">{n}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Preferred Meeting Frequency <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {[
                      { value: 'one-time', label: 'One-time' },
                      { value: 'monthly', label: 'Monthly' },
                      { value: 'bi-weekly', label: 'Bi-weekly' },
                      { value: 'flexible', label: 'Flexible' },
                    ].map(f => (
                      <label class="flex items-center gap-2.5 p-3 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <input type="radio" name="preferredMeetingFreq" value={f.value} class="sr-only peer" />
                        <div class="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex-shrink-0 transition-all"></div>
                        <span class="text-sm font-medium text-gray-700">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Meeting Format <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      { value: 'virtual-only', label: 'Virtual only', icon: '💻' },
                      { value: 'open-to-inperson', label: 'Open to in-person', icon: '🤝' },
                    ].map(f => (
                      <label class="flex items-center gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <input type="radio" name="virtualOrInperson" value={f.value} class="sr-only peer" />
                        <div class="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex-shrink-0 transition-all"></div>
                        <span class="text-lg">{f.icon}</span>
                        <span class="text-sm font-medium text-gray-700">{f.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ─── STEP 4: Commitment / Motivation ─── */}
            <div id="step4" class="hidden p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-sm font-bold text-indigo-600">4</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900 student-field">Commitment & Style</h2>
                  <h2 class="text-lg font-bold text-gray-900 mentor-field hidden">Your Motivation</h2>
                  <p class="text-xs text-gray-500">Help us match you best</p>
                </div>
              </div>

              {/* Student step 4 */}
              <div class="student-field space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Meeting Frequency <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { value: 'one-time', label: 'One-time chat', desc: 'A single focused session' },
                      { value: 'monthly', label: 'Monthly', desc: 'Once a month check-ins' },
                      { value: 'bi-weekly', label: 'Bi-weekly', desc: 'Every two weeks' },
                    ].map(f => (
                      <label class="flex flex-col gap-1.5 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <div class="flex items-center gap-2">
                          <input type="radio" name="meetingFrequency" value={f.value} class="sr-only peer" />
                          <div class="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex-shrink-0 transition-all"></div>
                          <span class="text-sm font-semibold text-gray-800">{f.label}</span>
                        </div>
                        <p class="text-xs text-gray-500 pl-6">{f.desc}</p>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Preferred Advice Style <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { value: 'direct', label: 'Direct', desc: 'Straightforward, honest feedback' },
                      { value: 'encouraging', label: 'Encouraging', desc: 'Supportive and motivating' },
                      { value: 'structured', label: 'Structured', desc: 'Organized, step-by-step guidance' },
                    ].map(s => (
                      <label class="flex flex-col gap-1.5 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <div class="flex items-center gap-2">
                          <input type="radio" name="adviceStyle" value={s.value} class="sr-only peer" />
                          <div class="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex-shrink-0 transition-all"></div>
                          <span class="text-sm font-semibold text-gray-800">{s.label}</span>
                        </div>
                        <p class="text-xs text-gray-500 pl-6">{s.desc}</p>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">Personality Type <span class="text-red-500">*</span></label>
                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[
                      { value: 'introverted', label: 'Introverted', desc: 'I prefer one-on-one, quiet settings' },
                      { value: 'extroverted', label: 'Extroverted', desc: 'I love meeting new people' },
                      { value: 'balanced', label: 'Balanced', desc: 'Somewhere in between' },
                    ].map(p => (
                      <label class="flex flex-col gap-1.5 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <div class="flex items-center gap-2">
                          <input type="radio" name="personalityType" value={p.value} class="sr-only peer" />
                          <div class="w-4 h-4 rounded-full border-2 border-gray-300 peer-checked:border-indigo-600 peer-checked:bg-indigo-600 flex-shrink-0 transition-all"></div>
                          <span class="text-sm font-semibold text-gray-800">{p.label}</span>
                        </div>
                        <p class="text-xs text-gray-500 pl-6">{p.desc}</p>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Mentor step 4 */}
              <div class="mentor-field hidden space-y-5">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Why do you want to mentor? <span class="text-red-500">*</span></label>
                  <textarea id="f_whyMentor" name="whyMentor" rows={4}
                    class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    placeholder="Share your motivation for mentoring students..."></textarea>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5">Have you had mentors? What was that like? <span class="text-red-500">*</span></label>
                  <textarea id="f_hadMentors" name="hadMentors" rows={4}
                    class="field-input w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                    placeholder="Share your experience being mentored or what you wish you'd had..."></textarea>
                </div>
              </div>
            </div>

            {/* ─── STEP 5: Code of Conduct ─── */}
            <div id="step5" class="hidden p-8">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span class="text-sm font-bold text-indigo-600">5</span>
                </div>
                <div>
                  <h2 class="text-lg font-bold text-gray-900">Community Standards</h2>
                  <p class="text-xs text-gray-500">Our community guidelines keep MentorMatch safe</p>
                </div>
              </div>

              <div class="bg-gray-50 rounded-xl p-5 mb-6 text-sm text-gray-700 space-y-3 max-h-64 overflow-y-auto">
                <h3 class="font-semibold text-gray-900">MentorMatch Code of Conduct</h3>
                <p><strong>1. Respect.</strong> Treat all members with dignity, kindness, and professionalism regardless of background, identity, or experience level.</p>
                <p><strong>2. Authenticity.</strong> Use your real name and provide accurate information. Fake profiles or misrepresentation will result in immediate removal.</p>
                <p><strong>3. Safety first.</strong> Do not share personal contact information (phone numbers, home addresses) during initial meetings. Use our platform messaging.</p>
                <p><strong>4. Commitment.</strong> Honor your scheduled meetings. Give at least 24 hours' notice if you need to cancel.</p>
                <p><strong>5. Boundaries.</strong> Mentors and students must maintain professional boundaries. Romantic or sexual conduct is strictly prohibited.</p>
                <p><strong>6. Confidentiality.</strong> Respect the privacy of information shared in mentorship conversations.</p>
                <p><strong>7. No solicitation.</strong> This platform is for mentorship, not sales, recruitment, or self-promotion.</p>
                <p><strong>8. Zero tolerance.</strong> Harassment, bullying, discrimination, or any form of abuse will result in immediate and permanent removal.</p>
                <p class="text-gray-500 italic">Violations may be reported and reviewed by our moderation team. We reserve the right to remove any member who violates these standards.</p>
              </div>

              <div class="space-y-4">
                <label class="flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all">
                  <input type="checkbox" id="f_agreeCoC" name="agreeCoC" class="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-sm text-gray-700">
                    I have read and agree to the <strong>MentorMatch Code of Conduct</strong>. I understand that violations may result in removal from the platform.
                  </span>
                </label>

                <label class="student-field flex items-start gap-3 p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-indigo-300 transition-all">
                  <input type="checkbox" id="f_willingToPrepare" name="willingToPrepare" class="mt-0.5 w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span class="text-sm text-gray-700">
                    I commit to <strong>coming prepared</strong> to each session with thoughtful questions and goals, to make the most of my mentor's time.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <button
                type="button"
                id="submitBtn"
                onclick="handleSubmit()"
                class="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span id="submitBtnText">Create Account</span>
                <span id="submitBtnLoader" class="hidden items-center justify-center gap-2">
                  <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Creating account...
                </span>
              </button>

              <p class="mt-4 text-center text-xs text-gray-400">
                By creating an account, you agree to our{' '}
                <a href="#" class="text-indigo-600 hover:underline">Terms of Service</a>{' '}
                and{' '}
                <a href="#" class="text-indigo-600 hover:underline">Privacy Policy</a>
              </p>
            </div>

            {/* Navigation footer */}
            <div id="navFooter" class="px-8 pb-6 flex items-center justify-between border-t border-gray-50 pt-5">
              <button
                type="button"
                id="prevBtn"
                onclick="prevStep()"
                class="hidden flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition"
              >
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
                </svg>
                Back
              </button>
              <div class="flex-1"></div>
              <button
                type="button"
                id="nextBtn"
                onclick="nextStep()"
                class="flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Continue
                <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>

          <p class="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <a href="/login" class="font-semibold text-indigo-600 hover:text-indigo-700">Sign in</a>
          </p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        let currentRole = 'student'
        let currentStep = 1
        const totalSteps = 5

        const stepNames = ['Basic Info', 'Career', 'Help Needed', 'Commitment', 'Code of Conduct']
        const mentorStepNames = ['Basic Info', 'Background', 'Availability', 'Motivation', 'Code of Conduct']

        function setRole(role) {
          currentRole = role
          const studentBtn = document.getElementById('roleStudent')
          const mentorBtn = document.getElementById('roleMentor')

          if (role === 'student') {
            studentBtn.className = 'flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all bg-indigo-600 text-white shadow-sm'
            mentorBtn.className = 'flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50'
          } else {
            mentorBtn.className = 'flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all bg-indigo-600 text-white shadow-sm'
            studentBtn.className = 'flex-1 flex items-center justify-center gap-2.5 py-3 px-4 rounded-xl text-sm font-semibold transition-all text-gray-600 hover:bg-gray-50'
          }

          document.querySelectorAll('.student-field').forEach(el => {
            el.classList.toggle('hidden', role !== 'student')
          })
          document.querySelectorAll('.mentor-field').forEach(el => {
            el.classList.toggle('hidden', role !== 'mentor')
          })

          updateProgress()
          hideError()
        }

        function updateProgress() {
          const names = currentRole === 'mentor' ? mentorStepNames : stepNames
          document.getElementById('stepLabel').textContent = 'Step ' + currentStep + ' of ' + totalSteps
          document.getElementById('stepName').textContent = names[currentStep - 1]
          document.getElementById('progressBar').style.width = ((currentStep / totalSteps) * 100) + '%'
          document.getElementById('prevBtn').classList.toggle('hidden', currentStep === 1)
          document.getElementById('nextBtn').classList.toggle('hidden', currentStep === totalSteps)
          document.getElementById('navFooter').classList.toggle('hidden', false)
        }

        function showStep(n) {
          for (let i = 1; i <= totalSteps; i++) {
            const el = document.getElementById('step' + i)
            if (el) el.classList.toggle('hidden', i !== n)
          }
          currentStep = n
          updateProgress()
        }

        function nextStep() {
          if (!validateStep(currentStep)) return
          if (currentStep < totalSteps) showStep(currentStep + 1)
        }

        function prevStep() {
          if (currentStep > 1) showStep(currentStep - 1)
        }

        function validateStep(step) {
          hideError()

          if (step === 1) {
            const name = document.getElementById('f_name').value.trim()
            const email = document.getElementById('f_email').value.trim()
            const password = document.getElementById('f_password').value
            const confirmPw = document.getElementById('f_confirmPassword').value

            if (!name) return showError('Please enter your full name')
            if (!email || !isValidEmail(email)) return showError('Please enter a valid email address')
            if (!password) return showError('Please enter a password')
            if (password.length < 8) return showError('Password must be at least 8 characters')
            if (!/[a-z]/.test(password)) return showError('Password must include a lowercase letter')
            if (!/[A-Z]/.test(password)) return showError('Password must include an uppercase letter')
            if (!/[0-9]/.test(password)) return showError('Password must include a number')
            if (!/[^A-Za-z0-9]/.test(password)) return showError('Password must include a special character')
            if (password !== confirmPw) return showError('Passwords do not match')

            if (currentRole === 'student') {
              const age = document.getElementById('f_age').value
              const school = document.getElementById('f_school').value.trim()
              const grade = document.getElementById('f_gradeLevel').value
              if (!age || parseInt(age) < 10 || parseInt(age) > 30) return showError('Please enter a valid age (10–30)')
              if (!school) return showError('Please enter your school name')
              if (!grade) return showError('Please select your grade level')
            } else {
              const position = document.getElementById('f_position').value.trim()
              const company = document.getElementById('f_company').value.trim()
              const years = document.getElementById('f_experienceYears').value
              const industry = document.getElementById('f_industry').value
              const linkedin = document.getElementById('f_linkedinUrl').value.trim()
              if (!position) return showError('Please enter your job title')
              if (!company) return showError('Please enter your company name')
              if (!years || parseInt(years) < 1) return showError('Please enter your years of experience')
              if (!industry) return showError('Please select your industry')
              if (!linkedin) return showError('LinkedIn URL is required for mentors')
            }
            return true
          }

          if (step === 2) {
            if (currentRole === 'student') {
              const field = document.querySelector('input[name="careerField"]:checked')
              const dream = document.getElementById('f_dreamRole').value.trim()
              const why = document.getElementById('f_careerInterestWhy').value.trim()
              if (!field) return showError('Please select a career field')
              if (!dream) return showError('Please describe your dream role')
              if (!why) return showError('Please share why you are interested in this career')
            } else {
              const bio = document.getElementById('f_shortBio').value.trim()
              const industries = document.getElementById('f_industriesWorked').value.trim()
              if (!bio || bio.length < 50) return showError('Please write a bio of at least 50 characters')
              if (!industries) return showError('Please list the industries you have worked in')
            }
            return true
          }

          if (step === 3) {
            if (currentRole === 'student') {
              const checked = document.querySelectorAll('input[name="helpNeeded"]:checked')
              if (checked.length === 0) return showError('Please select at least one area you need help with')
            } else {
              const maxMentees = document.querySelector('input[name="maxMentees"]:checked')
              const freq = document.querySelector('input[name="preferredMeetingFreq"]:checked')
              const format = document.querySelector('input[name="virtualOrInperson"]:checked')
              if (!maxMentees) return showError('Please select your maximum number of mentees')
              if (!freq) return showError('Please select your preferred meeting frequency')
              if (!format) return showError('Please select your preferred meeting format')
            }
            return true
          }

          if (step === 4) {
            if (currentRole === 'student') {
              const freq = document.querySelector('input[name="meetingFrequency"]:checked')
              const style = document.querySelector('input[name="adviceStyle"]:checked')
              const personality = document.querySelector('input[name="personalityType"]:checked')
              if (!freq) return showError('Please select your preferred meeting frequency')
              if (!style) return showError('Please select your preferred advice style')
              if (!personality) return showError('Please select your personality type')
            } else {
              const why = document.getElementById('f_whyMentor').value.trim()
              const had = document.getElementById('f_hadMentors').value.trim()
              if (!why || why.length < 30) return showError('Please share why you want to mentor (at least 30 characters)')
              if (!had || had.length < 30) return showError('Please share your experience with mentors (at least 30 characters)')
            }
            return true
          }

          return true
        }

        async function handleSubmit() {
          hideError()
          const agreeCoC = document.getElementById('f_agreeCoC').checked
          if (!agreeCoC) return showError('You must agree to the Code of Conduct to continue')

          if (currentRole === 'student') {
            const willingToPrepare = document.getElementById('f_willingToPrepare').checked
            if (!willingToPrepare) return showError('Students must commit to preparing questions before sessions')
          }

          // Build payload
          const payload = { role: currentRole }

          // Step 1 fields
          payload.name = document.getElementById('f_name').value.trim()
          payload.email = document.getElementById('f_email').value.trim()
          payload.password = document.getElementById('f_password').value

          if (currentRole === 'student') {
            payload.age = parseInt(document.getElementById('f_age').value)
            payload.school = document.getElementById('f_school').value.trim()
            payload.gradeLevel = document.getElementById('f_gradeLevel').value
            const liStudent = document.getElementById('f_linkedinUrlStudent').value.trim()
            if (liStudent) payload.linkedinUrl = liStudent

            // Step 2
            const cf = document.querySelector('input[name="careerField"]:checked')
            payload.careerField = cf ? cf.value : ''
            payload.dreamRole = document.getElementById('f_dreamRole').value.trim()
            payload.careerInterestWhy = document.getElementById('f_careerInterestWhy').value.trim()

            // Step 3
            const helpItems = Array.from(document.querySelectorAll('input[name="helpNeeded"]:checked')).map(el => el.value)
            payload.helpNeeded = helpItems.join(',')

            // Step 4
            const freq = document.querySelector('input[name="meetingFrequency"]:checked')
            payload.meetingFrequency = freq ? freq.value : ''
            const style = document.querySelector('input[name="adviceStyle"]:checked')
            payload.adviceStyle = style ? style.value : ''
            const personality = document.querySelector('input[name="personalityType"]:checked')
            payload.personalityType = personality ? personality.value : ''
            payload.willingToPrepare = true

          } else {
            payload.position = document.getElementById('f_position').value.trim()
            payload.company = document.getElementById('f_company').value.trim()
            payload.experienceYears = parseInt(document.getElementById('f_experienceYears').value)
            payload.industry = document.getElementById('f_industry').value
            payload.linkedinUrl = document.getElementById('f_linkedinUrl').value.trim()

            // Step 2
            payload.shortBio = document.getElementById('f_shortBio').value.trim()
            const topics = Array.from(document.querySelectorAll('input[name="mentorTopics"]:checked')).map(el => el.value)
            payload.mentorTopics = topics.join(',')
            payload.industriesWorked = document.getElementById('f_industriesWorked').value.trim()

            // Step 3
            const maxMentees = document.querySelector('input[name="maxMentees"]:checked')
            payload.maxMentees = maxMentees ? parseInt(maxMentees.value) : 1
            const freq = document.querySelector('input[name="preferredMeetingFreq"]:checked')
            payload.preferredMeetingFreq = freq ? freq.value : ''
            const format = document.querySelector('input[name="virtualOrInperson"]:checked')
            payload.virtualOrInperson = format ? format.value : ''

            // Step 4
            payload.whyMentor = document.getElementById('f_whyMentor').value.trim()
            payload.hadMentors = document.getElementById('f_hadMentors').value.trim()
          }

          setSubmitLoading(true)

          try {
            const res = await fetch('/api/auth/register', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(payload)
            })
            const data = await res.json()

            if (res.ok && data.success) {
              localStorage.setItem('auth-token', data.token)
              document.cookie = 'auth-token=' + data.token + '; path=/; max-age=604800'
              localStorage.setItem('user', JSON.stringify(data.user))
              window.location.href = '/dashboard'
            } else {
              if (data.issues && data.issues.length > 0) {
                showValidationErrors(data.issues)
              } else {
                showError(data.error || 'Registration failed. Please try again.')
              }
            }
          } catch (err) {
            showError('Network error. Please check your connection and try again.')
          } finally {
            setSubmitLoading(false)
          }
        }

        function showError(msg) {
          const box = document.getElementById('errorBox')
          document.getElementById('errorText').textContent = msg
          document.getElementById('errorList').innerHTML = ''
          box.classList.remove('hidden')
          box.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
          return false
        }

        function showValidationErrors(issues) {
          const box = document.getElementById('errorBox')
          document.getElementById('errorText').textContent = 'Please fix the following issues:'
          const list = document.getElementById('errorList')
          list.innerHTML = ''
          issues.forEach(issue => {
            const li = document.createElement('li')
            li.textContent = issue.message
            list.appendChild(li)
          })
          box.classList.remove('hidden')
          box.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
        }

        function hideError() {
          document.getElementById('errorBox').classList.add('hidden')
        }

        function setSubmitLoading(on) {
          const btn = document.getElementById('submitBtn')
          const txt = document.getElementById('submitBtnText')
          const ldr = document.getElementById('submitBtnLoader')
          btn.disabled = on
          if (on) {
            txt.classList.add('hidden')
            ldr.classList.remove('hidden')
            ldr.classList.add('flex')
          } else {
            txt.classList.remove('hidden')
            ldr.classList.add('hidden')
            ldr.classList.remove('flex')
          }
        }

        function isValidEmail(email) {
          return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
        }

        function togglePw(id) {
          const input = document.getElementById(id)
          input.type = input.type === 'password' ? 'text' : 'password'
        }

        // Password strength meter
        document.getElementById('f_password').addEventListener('input', function() {
          const pw = this.value
          let score = 0
          if (pw.length >= 8) score++
          if (/[A-Z]/.test(pw)) score++
          if (/[0-9]/.test(pw)) score++
          if (/[^A-Za-z0-9]/.test(pw)) score++
          const colors = ['bg-red-400', 'bg-orange-400', 'bg-yellow-400', 'bg-green-500']
          for (let i = 1; i <= 4; i++) {
            const bar = document.getElementById('ps' + i)
            bar.className = 'h-1 flex-1 rounded ' + (i <= score ? colors[score - 1] : 'bg-gray-100')
          }
        })

        // Password match indicator
        document.getElementById('f_confirmPassword').addEventListener('input', function() {
          const pw = document.getElementById('f_password').value
          const indicator = document.getElementById('pwMatch')
          if (this.value.length === 0) { indicator.classList.add('hidden'); return }
          indicator.classList.remove('hidden')
          if (this.value === pw) {
            indicator.textContent = 'Passwords match'
            indicator.className = 'mt-1 text-xs text-green-600'
          } else {
            indicator.textContent = 'Passwords do not match'
            indicator.className = 'mt-1 text-xs text-red-600'
          }
        })

        // Bio char counter
        const bioEl = document.getElementById('f_shortBio')
        if (bioEl) {
          bioEl.addEventListener('input', function() {
            document.getElementById('bioCharCount').textContent = this.value.length + ' / 1000 characters'
          })
        }

        // Visual radio/checkbox styling via peer-checked — enhance interactivity
        document.addEventListener('change', function(e) {
          if (e.target.type === 'radio') {
            const name = e.target.name
            document.querySelectorAll('input[name="' + name + '"]').forEach(radio => {
              const label = radio.closest('label')
              if (!label) return
              if (radio.checked) {
                label.classList.add('border-indigo-500', 'bg-indigo-50')
                label.classList.remove('border-gray-200')
              } else {
                label.classList.remove('border-indigo-500', 'bg-indigo-50')
                label.classList.add('border-gray-200')
              }
            })
          }
          if (e.target.type === 'checkbox' && e.target.closest('label.flex')) {
            const label = e.target.closest('label')
            if (e.target.checked) {
              label.classList.add('border-indigo-500', 'bg-indigo-50')
              label.classList.remove('border-gray-200')
            } else {
              label.classList.remove('border-indigo-500', 'bg-indigo-50')
              label.classList.add('border-gray-200')
            }
          }
        })

        // Init
        updateProgress()
      `}} />
    </div>
  )
}
