export function HowItWorksPage() {
  return (
    <div class="min-h-screen bg-white">

      {/* ── Sticky Nav ── */}
      <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" class="text-xl font-bold text-gray-900 hover:no-underline">Mentor<span class="text-indigo-600">Match</span></a>
          <div class="flex items-center gap-1">
            <a href="/" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">Home</a>
            <a href="/about" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">About the Founder</a>
            <a href="/how-it-works" class="px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:no-underline">How It Works</a>
            <a href="/blog" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">Blog</a>
            <a href="/register" class="ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm hover:no-underline">Start Connecting</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
        <div class="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 text-white pt-20 pb-24 text-center px-6">
          <div class="relative">
            <span class="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5">The Platform</span>
          <h1 class="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">How MentorMatch Works</h1>
          <p class="text-indigo-200 text-lg max-w-2xl mx-auto leading-relaxed">
            MentorMatch connects students with experienced mentors from industries across the U.S. Career guidance made accessible, practical, and personalized.
          </p>
        </div>
      </div>

      {/* ── Steps intro bar ── */}
      <div class="bg-white border-b border-gray-100 shadow-sm sticky top-[57px] z-40 overflow-x-auto">
        <div class="max-w-5xl mx-auto px-6 py-3 flex items-center gap-2 text-xs font-semibold whitespace-nowrap">
          {[
            ["1", "Sign Up", "#step-1", "bg-indigo-600"],
            ["2", "Smart Matching", "#step-2", "bg-purple-600"],
            ["3", "Schedule", "#step-3", "bg-emerald-600"],
            ["4", "Learn & Grow", "#step-4", "bg-teal-600"],
            ["5", "Track Progress", "#step-5", "bg-rose-600"],
            ["6", "Improve", "#step-6", "bg-amber-600"],
          ].map(([num, label, href, color]) => (
            <a href={href} class={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${color} text-white hover:opacity-90 transition-opacity`}>
              <span class="font-extrabold">{num}</span>
              <span>{label}</span>
            </a>
          ))}
          <a href="#faq" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-700 text-white hover:opacity-90 transition-opacity ml-2">
            <span>FAQ</span>
          </a>
        </div>
      </div>

      <div class="max-w-4xl mx-auto px-6 py-16 space-y-20">

        {/* ── Step 1: Sign Up ── */}
        <section id="step-1" class="scroll-mt-28">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-indigo-200 flex-shrink-0">1</div>
            <div>
              <span class="text-xs font-bold text-indigo-500 uppercase tracking-widest">First</span>
              <h2 class="text-2xl font-extrabold text-gray-900">Sign Up</h2>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            <div class="bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"/></svg>
                <span class="font-bold text-indigo-700 text-sm uppercase tracking-wider">Students</span>
              </div>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start gap-2"><span class="text-indigo-400 mt-0.5 flex-shrink-0">→</span>Create a profile with career interests and goals</li>
                <li class="flex items-start gap-2"><span class="text-indigo-400 mt-0.5 flex-shrink-0">→</span>Share areas you need help with and availability</li>
                <li class="flex items-start gap-2"><span class="text-indigo-400 mt-0.5 flex-shrink-0">→</span>Ages 9 and up — all career paths welcome</li>
              </ul>
            </div>
            <div class="bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-6">
              <div class="flex items-center gap-2 mb-3">
                <svg class="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                <span class="font-bold text-purple-700 text-sm uppercase tracking-wider">Mentors</span>
              </div>
              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-start gap-2"><span class="text-purple-400 mt-0.5 flex-shrink-0">→</span>Detail your experience, expertise, and industry</li>
                <li class="flex items-start gap-2"><span class="text-purple-400 mt-0.5 flex-shrink-0">→</span>Select your mentoring topics and availability</li>
                <li class="flex items-start gap-2"><span class="text-purple-400 mt-0.5 flex-shrink-0">→</span>5+ years of professional experience required</li>
              </ul>
            </div>
          </div>
          <div class="mt-4 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-3 flex items-center gap-3">
            <svg class="w-4 h-4 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            <p class="text-amber-800 text-sm font-medium">Both students and mentors agree to a <strong>Code of Conduct</strong> to ensure safe, productive, and respectful sessions.</p>
          </div>
        </section>

        {/* ── Step 2: Matching ── */}
        <section id="step-2" class="scroll-mt-28">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-purple-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-purple-200 flex-shrink-0">2</div>
            <div>
              <span class="text-xs font-bold text-purple-500 uppercase tracking-widest">Then</span>
              <h2 class="text-2xl font-extrabold text-gray-900">Smart Matching System</h2>
            </div>
          </div>
          <p class="text-gray-600 mb-6 leading-relaxed">
            MentorMatch uses an AI-powered algorithm to pair students with their best-fit mentors. Each student receives a <strong>compatibility score</strong> for every mentor based on 7 weighted categories.
          </p>

          {/* Matching categories visual */}
          <div class="bg-gradient-to-br from-purple-600 to-indigo-700 rounded-3xl p-6 text-white mb-6">
            <p class="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Compatibility Score Categories</p>
            <div class="space-y-3">
                {[
                  ["Career Field Alignment", 30, "bg-white"],
                  ["Role & Industry Relevance", 20, "bg-indigo-200"],
                  ["Mentorship Needs vs Expertise", 15, "bg-purple-200"],
                  ["Mentor Experience Level", 10, "bg-indigo-300"],
                  ["Personality & Communication Fit", 10, "bg-purple-300"],
                  ["Availability", 10, "bg-indigo-400"],
                  ["Commitment Level", 5, "bg-purple-400"],
                ].map(([label, pts, bar]) => (
                  <div class="flex items-center gap-3">
                    <div class="flex-1">
                      <div class="flex justify-between text-xs font-semibold mb-1">
                        <span class="opacity-90">{label}</span>
                        <span class="opacity-70">{pts} pts</span>
                      </div>
                      <div class="w-full bg-white/20 rounded-full h-2">
                        <div class={`${bar} h-2 rounded-full`} style={`width:${pts === 30 ? '100%' : pts === 20 ? '67%' : pts === 15 ? '50%' : pts === 10 ? '33%' : '17%'}`} />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <p class="text-xs opacity-60 mt-4 text-right">Total: 100 points = 100% compatibility</p>
          </div>

          {/* Tier breakdown */}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
              <div class="text-lg font-extrabold text-emerald-700">90–100%</div>
              <div class="text-xs font-bold text-emerald-600 mt-0.5">Elite Match</div>
            </div>
            <div class="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-center">
              <div class="text-lg font-extrabold text-blue-700">75–89%</div>
              <div class="text-xs font-bold text-blue-600 mt-0.5">Strong Match</div>
            </div>
            <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
              <div class="text-lg font-extrabold text-amber-700">60–74%</div>
              <div class="text-xs font-bold text-amber-600 mt-0.5">Good Match</div>
            </div>
            <div class="bg-gray-50 border border-gray-200 rounded-2xl p-4 text-center">
              <div class="text-lg font-extrabold text-gray-600">50–59%</div>
              <div class="text-xs font-bold text-gray-500 mt-0.5">Low Compatibility</div>
            </div>
          </div>
        </section>

        {/* ── Step 3: Schedule ── */}
        <section id="step-3" class="scroll-mt-28">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-emerald-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-emerald-200 flex-shrink-0">3</div>
            <div>
              <span class="text-xs font-bold text-emerald-500 uppercase tracking-widest">Next</span>
              <h2 class="text-2xl font-extrabold text-gray-900">Schedule a Session</h2>
            </div>
          </div>
          <div class="bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-3xl p-6">
            <div class="grid md:grid-cols-3 gap-5">
              <div class="text-center p-4">
                <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                </div>
                <h3 class="font-bold text-gray-900 text-sm mb-1">Book a Time</h3>
                <p class="text-gray-500 text-xs">Students book one-on-one video sessions directly with their matched mentor.</p>
              </div>
              <div class="text-center p-4">
                <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                </div>
                <h3 class="font-bold text-gray-900 text-sm mb-1">Get Reminders</h3>
                <p class="text-gray-500 text-xs">Both parties receive calendar reminders ahead of each session.</p>
              </div>
              <div class="text-center p-4">
                <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <h3 class="font-bold text-gray-900 text-sm mb-1">Pre-Session Tips</h3>
                <p class="text-gray-500 text-xs">Receive pre-session tips to help both sides prepare for a productive discussion.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Step 4: Learn & Grow ── */}
        <section id="step-4" class="scroll-mt-28">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-teal-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-teal-200 flex-shrink-0">4</div>
            <div>
              <span class="text-xs font-bold text-teal-500 uppercase tracking-widest">The Good Part</span>
              <h2 class="text-2xl font-extrabold text-gray-900">Learn and Grow</h2>
            </div>
          </div>

          <div class="grid md:grid-cols-2 gap-5">
            <div class="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&q=80"
                alt="Student in a career mentorship session"
                class="w-full h-52 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-teal-900/80 to-transparent" />
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <p class="text-sm font-bold">For Students</p>
                <p class="text-xs text-teal-200 mt-0.5">Personalized guidance on careers, internships, resumes, networking, and goal-setting</p>
              </div>
            </div>
            <div class="relative overflow-hidden rounded-3xl">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=700&q=80"
                alt="Professional mentor sharing real-world experience"
                class="w-full h-52 object-cover"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent" />
              <div class="absolute bottom-4 left-4 right-4 text-white">
                <p class="text-sm font-bold">For Mentors</p>
                <p class="text-xs text-indigo-200 mt-0.5">Share real-world insights, experience-based advice, and answer the questions that matter most</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Step 5: Track Progress ── */}
        <section id="step-5" class="scroll-mt-28">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-rose-600 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-rose-200 flex-shrink-0">5</div>
            <div>
              <span class="text-xs font-bold text-rose-500 uppercase tracking-widest">Over Time</span>
              <h2 class="text-2xl font-extrabold text-gray-900">Track Progress</h2>
            </div>
          </div>
          <div class="grid md:grid-cols-2 gap-5">
            <div class="bg-rose-50 border border-rose-100 rounded-3xl p-6">
              <h3 class="font-bold text-rose-800 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                Student Dashboard
              </h3>
              <ul class="space-y-2 text-sm text-rose-900">
                <li class="flex gap-2 items-start"><span class="text-rose-400 flex-shrink-0 mt-0.5">✓</span> Track mentorship sessions and outcomes</li>
                <li class="flex gap-2 items-start"><span class="text-rose-400 flex-shrink-0 mt-0.5">✓</span> View session feedback and mentor notes</li>
                <li class="flex gap-2 items-start"><span class="text-rose-400 flex-shrink-0 mt-0.5">✓</span> Monitor growth milestones over time</li>
              </ul>
            </div>
            <div class="bg-indigo-50 border border-indigo-100 rounded-3xl p-6">
              <h3 class="font-bold text-indigo-800 mb-3 flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                Mentor Dashboard
              </h3>
              <ul class="space-y-2 text-sm text-indigo-900">
                <li class="flex gap-2 items-start"><span class="text-indigo-400 flex-shrink-0 mt-0.5">✓</span> Monitor mentee engagement and progress</li>
                <li class="flex gap-2 items-start"><span class="text-indigo-400 flex-shrink-0 mt-0.5">✓</span> Provide session feedback and follow-up</li>
                <li class="flex gap-2 items-start"><span class="text-indigo-400 flex-shrink-0 mt-0.5">✓</span> Manage your schedule and bookings</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Step 6: Continuous Improvement ── */}
        <section id="step-6" class="scroll-mt-28">
          <div class="flex items-center gap-4 mb-6">
            <div class="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center text-xl font-extrabold shadow-lg shadow-amber-200 flex-shrink-0">6</div>
            <div>
              <span class="text-xs font-bold text-amber-500 uppercase tracking-widest">Always</span>
              <h2 class="text-2xl font-extrabold text-gray-900">Continuous Improvement</h2>
            </div>
          </div>
          <div class="bg-gradient-to-br from-amber-50 via-white to-orange-50 border border-amber-100 rounded-3xl p-6">
            <div class="grid md:grid-cols-3 gap-5 text-center">
              <div class="p-4">
                <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
                </div>
                <p class="font-bold text-gray-800 text-sm">Students Update Goals</p>
                <p class="text-xs text-gray-500 mt-1">Update your interests and preferences as you learn and grow.</p>
              </div>
              <div class="p-4">
                <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
                </div>
                <p class="font-bold text-gray-800 text-sm">Mentors Give Feedback</p>
                <p class="text-xs text-gray-500 mt-1">Session feedback helps refine future pairings and improve outcomes.</p>
              </div>
              <div class="p-4">
                <div class="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <p class="font-bold text-gray-800 text-sm">AI Gets Smarter</p>
                <p class="text-xs text-gray-500 mt-1">The matching algorithm continuously improves to find better fits as data grows.</p>
              </div>
            </div>
          </div>
          {/* Can switch mentors note */}
          <div class="mt-4 bg-indigo-50 border border-indigo-100 rounded-2xl px-5 py-3 flex items-center gap-3">
            <svg class="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
            <p class="text-indigo-700 text-sm">Students can request a <strong>new match</strong> at any time if the current mentor isn't the right fit.</p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" class="scroll-mt-28">
          <div class="text-center mb-8">
            <span class="inline-block bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-3">Common Questions</span>
            <h2 class="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          </div>
          <div class="space-y-4">
            {[
              {
                q: "Who can become a mentor?",
                a: "Professionals with at least 5 years of experience in their industry can volunteer as mentors. CEOs, engineers, artists, doctors, lawyers, athletes — anyone with real-world expertise is welcome.",
                color: "border-indigo-200 bg-indigo-50",
                label: "bg-indigo-500",
              },
              {
                q: "Who can become a mentee?",
                a: "Students ages 9 and up looking for career guidance, resume help, internship advice, or professional development. All career paths and fields are welcome.",
                color: "border-purple-200 bg-purple-50",
                label: "bg-purple-500",
              },
              {
                q: "How does MentorMatch ensure quality matches?",
                  a: "My AI-powered system calculates compatibility scores across 7 categories: career field, role alignment, mentorship needs, experience level, personality fit, availability, and commitment. Students see scores for every mentor and choose who to connect with.",
                color: "border-emerald-200 bg-emerald-50",
                label: "bg-emerald-500",
              },
              {
                q: "How often should I meet with my mentor?",
                a: "Frequency is flexible. Most mentees schedule 1–2 sessions per month, but you can adjust based on availability and goals. There's no minimum requirement.",
                color: "border-teal-200 bg-teal-50",
                label: "bg-teal-500",
              },
              {
                q: "Is MentorMatch free?",
                a: "Yes — all mentorship through MentorMatch is currently 100% free for both students and mentors. Paid or premium features may be introduced in the future, but core mentorship will remain accessible.",
                color: "border-rose-200 bg-rose-50",
                label: "bg-rose-500",
              },
              {
                q: "Can I switch mentors if I need a better match?",
                a: "Yes. Students can request a new match at any time if the current mentor isn't the right fit. The AI system will find updated recommendations based on your current goals.",
                color: "border-amber-200 bg-amber-50",
                label: "bg-amber-500",
              },
            ].map(({ q, a, color, label }) => (
              <div class={`border ${color} rounded-2xl p-5`}>
                <div class="flex items-start gap-3">
                  <span class={`flex-shrink-0 w-5 h-5 ${label} text-white rounded-full flex items-center justify-center text-xs font-extrabold mt-0.5`}>Q</span>
                  <div>
                    <p class="font-bold text-gray-900 text-sm mb-1">{q}</p>
                    <p class="text-gray-600 text-sm leading-relaxed">{a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section class="bg-gradient-to-br from-indigo-600 via-purple-700 to-indigo-800 rounded-3xl p-10 text-center text-white">
          <h2 class="text-3xl font-extrabold mb-3">Ready to get started?</h2>
          <p class="text-indigo-200 mb-8 max-w-xl mx-auto">Whether you're a student ready to learn or a professional ready to give back — start your mentorship journey today.</p>
          <a
            href="/register"
            class="inline-block bg-white text-indigo-700 font-extrabold px-10 py-4 rounded-2xl text-lg hover:bg-indigo-50 transition-colors shadow-lg"
          >
            Find a Mentor →
          </a>
        </section>

      </div>

      {/* ── Footer ── */}
      <footer class="bg-gray-900 text-white pt-12 pb-8">
        <div class="max-w-5xl mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <h3 class="text-xl font-bold mb-2">Mentor<span class="text-indigo-400">Match</span></h3>
              <p class="text-gray-400 text-sm max-w-xs leading-relaxed">Free AI-powered career mentorship connecting students with industry leaders.</p>
            </div>
            <div>
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Navigate</p>
              <div class="flex flex-col gap-2">
                <a href="/" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Home</a>
                <a href="/about" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">About the Founder</a>
                <a href="/how-it-works" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">How It Works</a>
                <a href="/blog" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Blog</a>
              </div>
            </div>
            <div>
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Platform</p>
              <div class="flex flex-col gap-2">
                <a href="/register" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Start Connecting</a>
                <a href="/register?role=student" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Sign Up as Student</a>
                <a href="/register?role=mentor" class="text-gray-300 hover:text-white text-sm font-medium transition-colors">Sign Up as Mentor</a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p class="text-gray-500 text-sm">© 2025 MentorMatch — Building bridges through conversation</p>
            <div class="flex gap-5">
              <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition-colors">Privacy</a>
              <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
