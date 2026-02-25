export function LandingPage() {
  return (
    <div class="min-h-screen bg-white">

      {/* ── Sticky Nav ── */}
      <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <a href="/" class="wordmark text-2xl font-bold text-gray-900 hover:no-underline">
            Mentor<span class="text-indigo-600">Match</span>
          </a>
          <div class="flex items-center gap-1">
            <a href="/" class="px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:no-underline">Home</a>
            <a href="/about" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">About the Founder</a>
            <a href="/how-it-works" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">How It Works</a>
            <a href="/blog" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">Blog</a>
            <a href="/role-select" class="ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm hover:no-underline">Start Connecting</a>
          </div>
        </div>
      </nav>

        {/* ── Hero ── */}
        <section class="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 pt-20 pb-28">

          <div class="relative max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-14">
            <div class="flex-1 text-center md:text-left">
              <div class="mb-6 anim-fade-up">
                <span class="wordmark block text-6xl md:text-8xl font-bold text-gray-900 leading-none tracking-tight">
                  Mentor<span class="text-indigo-600">Match</span>
                </span>
                <span class="inline-block mt-3 text-indigo-500 text-sm font-semibold tracking-widest uppercase">Free Career Mentorship</span>
              </div>

              <h1 class="text-2xl md:text-3xl font-semibold text-gray-700 leading-snug mb-5 max-w-lg anim-fade-up delay-200">
                Connect with <span class="text-indigo-600 font-bold">real mentors.</span><br/>Build your future.
              </h1>
              <p class="text-base text-gray-500 max-w-md mb-8 leading-relaxed anim-fade-up delay-300">
                Free one-on-one career guidance from CEOs and industry leaders — matched to your exact goals with AI.
              </p>
              <div class="flex flex-col sm:flex-row gap-3 justify-center md:justify-start anim-fade-up delay-400">
                  <a href="/role-select" class="inline-block bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-md hover:shadow-lg hover:no-underline hover:-translate-y-0.5">
                  Start Connecting →
                </a>
                <a href="/blog" class="inline-block border-2 border-gray-200 hover:border-indigo-300 text-gray-600 font-semibold px-8 py-4 rounded-2xl text-base transition-all hover:bg-indigo-50 hover:no-underline">
                  Read the Blog
                </a>
              </div>
            </div>

            <div class="flex-1 max-w-lg w-full anim-scale-in delay-300">
              <div class="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                  alt="Students getting career advice from a professional mentor"
                  class="w-full h-80 object-cover"
                />
                <div class="absolute bottom-4 left-4 bg-white/95 rounded-2xl px-4 py-3 shadow-lg flex items-center gap-3 anim-fade-up delay-600">
                  <div class="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <div>
                    <p class="text-xs font-bold text-gray-900">AI-Powered Matching</p>
                    <p class="text-xs text-gray-500">Find your perfect mentor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* ── Stats bar ── */}
      <section class="bg-indigo-600 text-white py-9">
          <div class="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div class="reveal anim-stat-pop">
              <div class="wordmark text-4xl font-bold">100%</div>
              <div class="text-indigo-200 text-sm font-medium mt-1">Free to use</div>
            </div>
            <div class="reveal delay-200 anim-stat-pop" style="animation-delay:0.15s">
              <div class="wordmark text-4xl font-bold">AI</div>
              <div class="text-indigo-200 text-sm font-medium mt-1">Smart matching engine</div>
            </div>
            <div class="reveal delay-300 anim-stat-pop" style="animation-delay:0.3s">
              <div class="wordmark text-4xl font-bold">1-on-1</div>
              <div class="text-indigo-200 text-sm font-medium mt-1">Direct mentorship</div>
            </div>
            <div class="reveal delay-400 anim-stat-pop" style="animation-delay:0.45s">
              <div class="wordmark text-4xl font-bold">Any Field</div>
              <div class="text-indigo-200 text-sm font-medium mt-1">All career paths</div>
            </div>
          </div>
      </section>

      {/* ── How it works ── */}
      <section class="py-20 bg-white">
        <div class="max-w-5xl mx-auto px-6">
          <div class="text-center mb-12 reveal">
            <span class="inline-block bg-purple-100 text-purple-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">How It Works</span>
            <h2 class="wordmark text-4xl font-bold text-gray-900">Three steps to your mentor</h2>
          </div>
          <div class="grid md:grid-cols-3 gap-8">
              <div class="relative bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-3xl p-7 hover:shadow-lg transition-shadow reveal">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow">1</div>
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=80"
                alt="Create your profile"
                class="w-full h-40 object-cover rounded-2xl mb-5"
              />
              <h3 class="text-lg font-bold text-gray-900 mb-2">Create Your Profile</h3>
              <p class="text-gray-600 text-sm leading-relaxed">Tell me your career goals, interests, and what kind of guidance you're looking for.</p>
            </div>
              <div class="relative bg-gradient-to-br from-purple-50 to-white border border-purple-100 rounded-3xl p-7 hover:shadow-lg transition-shadow reveal delay-200">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow">2</div>
              <img
                src="https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?w=400&q=80"
                alt="Get AI matched"
                class="w-full h-40 object-cover rounded-2xl mb-5"
              />
              <h3 class="text-lg font-bold text-gray-900 mb-2">Get AI-Matched</h3>
              <p class="text-gray-600 text-sm leading-relaxed">My engine scores mentors across 7 categories — field, role, expertise, availability, and more.</p>
            </div>
              <div class="relative bg-gradient-to-br from-emerald-50 to-white border border-emerald-100 rounded-3xl p-7 hover:shadow-lg transition-shadow reveal delay-400">
                <div class="absolute -top-3 -left-3 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-extrabold shadow">3</div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&q=80"
                alt="Connect and grow"
                class="w-full h-40 object-cover rounded-2xl mb-5"
              />
              <h3 class="text-lg font-bold text-gray-900 mb-2">Connect &amp; Grow</h3>
              <p class="text-gray-600 text-sm leading-relaxed">Schedule video sessions, get real feedback, and build the career relationships that last.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mentor Rewards ── */}
      <section class="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
        <div class="max-w-5xl mx-auto px-6">
          <div class="text-center mb-12 reveal">
            <span class="inline-block bg-amber-100 text-amber-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">For Mentors</span>
            <h2 class="wordmark text-4xl font-bold text-gray-900 mb-3">What you get as a mentor</h2>
            <p class="text-gray-500 text-base max-w-xl mx-auto">Giving back has real, tangible rewards. Here's what MentorMatch offers every mentor on the platform.</p>
          </div>
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              <div class="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal">
                <div class="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-2xl">🏅</div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base mb-1">Verified Mentor Badge</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">Earn a verified badge on your profile that signals your credibility and commitment to the next generation.</p>
                </div>
              </div>
              <div class="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-100">
                <div class="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-2xl">🌟</div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base mb-1">Impact Score &amp; Leaderboard</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">Your Impact Score grows with every session. Top mentors are featured on the platform leaderboard.</p>
                </div>
              </div>
              <div class="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-200">
                <div class="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-2xl">📣</div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base mb-1">Public Profile &amp; Exposure</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">Your profile is visible to hundreds of motivated students actively looking for guidance in your exact field.</p>
                </div>
              </div>
              <div class="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-300">
                <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center text-2xl">💬</div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base mb-1">Genuine Connections</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">Build meaningful relationships with the next generation of professionals in your industry.</p>
                </div>
              </div>
              <div class="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-400">
                <div class="w-12 h-12 bg-rose-100 rounded-2xl flex items-center justify-center text-2xl">🗓️</div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base mb-1">Flexible on Your Schedule</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">Mentor on your terms — set your own availability, frequency, and format. One session or ongoing.</p>
                </div>
              </div>
              <div class="bg-white rounded-3xl p-7 shadow-sm border border-amber-100 flex flex-col gap-4 reveal delay-500">
                <div class="w-12 h-12 bg-sky-100 rounded-2xl flex items-center justify-center text-2xl">✍️</div>
                <div>
                  <h3 class="font-bold text-gray-900 text-base mb-1">Letter of Recognition</h3>
                  <p class="text-gray-500 text-sm leading-relaxed">Active mentors receive a personalized letter of recognition from MentorMatch for their service and impact.</p>
                </div>
              </div>
          </div>
          <div class="text-center reveal">
              <a href="/register?role=mentor" class="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-md hover:shadow-lg hover:no-underline hover:-translate-y-0.5">
              Become a Mentor →
            </a>
          </div>
        </div>
      </section>

      {/* ── Mission ── */}
      <section class="py-20 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div class="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div class="flex-1 rounded-3xl overflow-hidden shadow-xl reveal-left">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=700&q=80"
                alt="Diverse students in a career development session"
                class="w-full h-72 object-cover"
              />
            </div>
            <div class="flex-1 reveal-right">
            <span class="inline-block bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">My Mission</span>
            <h2 class="wordmark text-4xl font-bold text-gray-900 mb-5 leading-tight">Career Mentorship<br/>for Everyone</h2>
            <p class="text-gray-600 leading-relaxed mb-4 text-[15px]">
              I believe every student deserves access to real career guidance — not just those with the right connections. MentorMatch levels the playing field by pairing students with professionals who've actually walked the path they want to take.
            </p>
            <p class="text-gray-700 leading-relaxed font-semibold text-[15px]">
              Mentorship shouldn't depend on who you know. It should depend on who you aspire to become.
            </p>
              <p class="text-gray-500 text-sm mt-3">— Ethan B, Founder of MentorMatch</p>
            <a href="/about" class="inline-block mt-6 text-indigo-600 font-semibold hover:underline text-sm">Learn more about me →</a>
          </div>
        </div>
      </section>

      {/* ── Blog teaser ── */}
      <section class="py-20 bg-white">
        <div class="max-w-5xl mx-auto px-6">
          <div class="flex items-center justify-between mb-10 reveal">
            <div>
              <span class="inline-block bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">From the Blog</span>
              <h2 class="wordmark text-4xl font-bold text-gray-900">Research-backed insights</h2>
            </div>
            <a href="/blog" class="hidden md:inline-block text-indigo-600 font-semibold text-sm hover:underline">View all posts →</a>
          </div>
          <div class="grid md:grid-cols-3 gap-6">
            <a href="/blog#post-1" class="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow hover:no-underline reveal">
              <div class="relative h-44 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=500&q=80" alt="Mentorship" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span class="absolute bottom-3 left-3 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Post 1</span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-gray-900 text-sm leading-snug">Why Mentorship Matters for Career Success</h3>
                <p class="text-gray-500 text-xs mt-1">Research on confidence, networks &amp; growth</p>
              </div>
            </a>
            <a href="/blog#post-2" class="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow hover:no-underline reveal delay-200">
              <div class="relative h-44 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&q=80" alt="Salary data" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span class="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Post 2</span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-gray-900 text-sm leading-snug">STEM vs Non-STEM Salaries: NSF 2024 Data</h3>
                <p class="text-gray-500 text-xs mt-1">What the numbers actually show</p>
              </div>
            </a>
            <a href="/blog#post-3" class="group bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow hover:no-underline reveal delay-400">
              <div class="relative h-44 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&q=80" alt="Career outcomes" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span class="absolute bottom-3 left-3 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Post 3</span>
              </div>
              <div class="p-5">
                <h3 class="font-bold text-gray-900 text-sm leading-snug">How Mentorship Improves Career Outcomes</h3>
                <p class="text-gray-500 text-xs mt-1">From first job to lifelong transferable skills</p>
              </div>
            </a>
          </div>
          <div class="text-center mt-8 md:hidden">
            <a href="/blog" class="text-indigo-600 font-semibold text-sm hover:underline">View all posts →</a>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer class="bg-gray-900 text-white pt-14 pb-8">
        <div class="max-w-5xl mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <h3 class="wordmark text-3xl font-bold mb-2">Mentor<span class="text-indigo-400">Match</span></h3>
              <p class="text-gray-400 text-sm max-w-xs leading-relaxed">Free AI-powered career mentorship connecting students with industry leaders.</p>
            </div>
            <div>
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Navigate</p>
              <div class="flex flex-col gap-2">
                <a href="/" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">Home</a>
                <a href="/about" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">About the Founder</a>
                <a href="/how-it-works" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">How It Works</a>
                <a href="/blog" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">Blog</a>
              </div>
            </div>
            <div>
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Platform</p>
              <div class="flex flex-col gap-2">
                <a href="/role-select" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">Start Connecting</a>
                <a href="/register?role=student" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">Sign Up as Student</a>
                <a href="/register?role=mentor" class="text-gray-300 hover:text-white text-sm font-medium transition-colors hover:no-underline">Sign Up as Mentor</a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p class="text-gray-500 text-sm">© 2025 MentorMatch · Built by Ethan B</p>
            <div class="flex gap-5">
              <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition-colors hover:no-underline">Privacy</a>
              <a href="#" class="text-gray-500 hover:text-gray-300 text-xs transition-colors hover:no-underline">Terms</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  )
}
