export function BlogPage() {
  return (
    <div class="min-h-screen bg-gray-50">
        {/* ── Sticky Nav ── */}
        <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
          <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
            <a href="/" class="text-xl font-bold text-gray-900 hover:no-underline">Mentor<span class="text-indigo-600">Match</span></a>
            <div class="flex items-center gap-1">
              <a href="/" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">Home</a>
              <a href="/about" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">About the Founder</a>
              <a href="/how-it-works" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">How It Works</a>
              <a href="/blog" class="px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:no-underline">Blog</a>
              <a href="/register" class="ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm hover:no-underline">Start Connecting</a>
            </div>
          </div>
        </nav>

      {/* Hero */}
      <div class="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white">
        <div class="max-w-5xl mx-auto px-4 py-16 text-center">
          <span class="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">MentorMatch Blog</span>
          <h1 class="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">Insights on Mentorship<br/>& Career Development</h1>
          <p class="text-indigo-200 text-lg max-w-xl mx-auto">Research-backed articles to help students navigate their careers with confidence.</p>
        </div>
      </div>

      {/* Post index cards */}
      <div class="max-w-5xl mx-auto px-4 -mt-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1 */}
          <a href="#post-1" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=600&q=80"
                alt="Mentorship meeting"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span class="absolute bottom-3 left-3 bg-indigo-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Post 1</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-900 text-sm leading-snug">Why Mentorship Matters for Career Success</h3>
              <p class="text-gray-500 text-xs mt-1">Confidence, networking, and professional growth</p>
            </div>
          </a>
          {/* Card 2 */}
          <a href="#post-2" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&q=80"
                alt="Salary data charts"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span class="absolute bottom-3 left-3 bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Post 2</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-900 text-sm leading-snug">STEM vs Non-STEM Salaries: What the Data Shows</h3>
              <p class="text-gray-500 text-xs mt-1">NSF 2024 earnings data broken down clearly</p>
            </div>
          </a>
          {/* Card 3 */}
          <a href="#post-3" class="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group">
            <div class="relative h-40 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80"
                alt="Career growth"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <span class="absolute bottom-3 left-3 bg-purple-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">Post 3</span>
            </div>
            <div class="p-4">
              <h3 class="font-bold text-gray-900 text-sm leading-snug">How Mentorship Improves Career Outcomes</h3>
              <p class="text-gray-500 text-xs mt-1">From first job to lifelong transferable skills</p>
            </div>
          </a>
        </div>
      </div>

      {/* ─── POST 1 ─── */}
      <article id="post-1" class="max-w-3xl mx-auto px-4 mt-16">
        <div class="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Cover image */}
          <div class="relative h-72 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=900&q=80"
              alt="Two professionals in a mentorship session"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div class="absolute bottom-6 left-8 right-8">
              <span class="bg-indigo-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Mentorship</span>
              <h2 class="text-3xl font-extrabold text-white mt-3 leading-tight">Why Mentorship Matters<br/>for Career Success</h2>
            </div>
          </div>

          <div class="p-8">
            <p class="text-gray-700 text-base leading-relaxed">
              Mentorship isn't just a nice perk — research shows it plays a huge role in shaping careers. When students get guidance from experienced professionals, they gain insight that simply isn't available through classes alone.
            </p>
            <p class="text-gray-700 text-base leading-relaxed mt-4">
              Studies find that mentoring relationships help young people build confidence, understand real-world expectations, and connect academic learning to future jobs. Mentored youth are more likely to set higher educational goals and develop better attitudes about school — which leads to stronger career choices later on.
            </p>

            {/* Stat callout row */}
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
              <div class="bg-indigo-50 border border-indigo-100 rounded-2xl p-5 text-center">
                <div class="text-4xl font-extrabold text-indigo-600">55%</div>
                <div class="text-xs text-indigo-700 font-semibold mt-1 uppercase tracking-wide">More likely to enroll in college</div>
                <div class="text-xs text-gray-400 mt-1">Mentoring.org</div>
              </div>
              <div class="bg-purple-50 border border-purple-100 rounded-2xl p-5 text-center">
                <div class="text-4xl font-extrabold text-purple-600">78%</div>
                <div class="text-xs text-purple-700 font-semibold mt-1 uppercase tracking-wide">Of mentored youth set career goals</div>
                <div class="text-xs text-gray-400 mt-1"><a href="https://www.mentoring.org/wp-content/uploads/2022/03/Issue-Brief-on-Mentoring-and-Career-Exploration-and-Workforce-Development-Final-Draft136142.pdf" target="_blank" rel="noopener noreferrer" class="underline hover:text-indigo-500">MENTOR, Career Exploration &amp; Workforce Dev (2022)</a></div>
              </div>
              <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 text-center">
                <div class="text-4xl font-extrabold text-emerald-600">2×</div>
                <div class="text-xs text-emerald-700 font-semibold mt-1 uppercase tracking-wide">Leadership growth for mentors</div>
                <div class="text-xs text-gray-400 mt-1"><a href="https://www.evidencebasedmentoring.org/new-study-highlights-the-benefits-of-serving-as-a-mentor/" target="_blank" rel="noopener noreferrer" class="underline hover:text-indigo-500">Eby et al., J. of Vocational Behavior (2013)</a></div>
              </div>
            </div>

            {/* Inline image */}
            <div class="rounded-2xl overflow-hidden my-6">
              <img
                src="https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=800&q=80"
                alt="Group mentorship workshop session"
                class="w-full h-56 object-cover"
              />
              <p class="text-center text-xs text-gray-400 mt-2 italic">Group mentorship sessions help students build confidence and real-world perspective.</p>
            </div>

            <h3 class="text-xl font-bold text-gray-900 mt-6 mb-3">What the Research Reveals</h3>
            <ul class="space-y-3">
              <li class="flex gap-3">
                <span class="mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">1</span>
                <p class="text-gray-700 text-sm leading-relaxed">Youth with mentors show improvements in <strong>educational and professional engagement</strong>, making them better prepared for early career experiences.</p>
              </li>
              <li class="flex gap-3">
                <span class="mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">2</span>
                <p class="text-gray-700 text-sm leading-relaxed">Mentoring can <strong>expand career opportunities</strong> by offering access to networks, insider knowledge, and lasting professional relationships.</p>
              </li>
              <li class="flex gap-3">
                <span class="mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">3</span>
                <p class="text-gray-700 text-sm leading-relaxed">Mentorship also enhances <strong>communication and self-efficacy</strong> — meaning students can navigate challenges more confidently.</p>
              </li>
              <li class="flex gap-3">
                <span class="mt-1 flex-shrink-0 w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-xs font-bold">4</span>
                <p class="text-gray-700 text-sm leading-relaxed">Mentors help mentees see their <strong>potential future self</strong> in the world of work — making informed career decisions instead of guesswork.</p>
              </li>
            </ul>

            {/* Quote block */}
              <blockquote class="mt-8 border-l-4 border-indigo-400 bg-indigo-50 rounded-r-2xl px-6 py-4">
                <p class="text-indigo-800 italic text-base font-medium">"The consistent, enduring presence of a caring adult in a young person's life can be the difference between staying in school or dropping out, making healthy decisions or engaging in risky behaviors, and realizing one's potential or failing to achieve one's dreams."</p>
                <footer class="text-indigo-500 text-xs mt-2 font-semibold">— <a href="https://www.mentoring.org/mentoring-impact/" target="_blank" rel="noopener noreferrer" class="underline hover:text-indigo-700">The Mentoring Effect: Young People's Perspectives, MENTOR (2014)</a></footer>
              </blockquote>

            {/* Sources */}
            <div class="mt-8 pt-6 border-t border-gray-100">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sources</p>
              <ul class="space-y-1 text-xs text-gray-500">
                <li>
                  <a href="https://www.mentoring.org/mentoring-impact/" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Research on mentorship's impact on youth outcomes — mentoring.org</a>
                </li>
                <li>
                  <a href="https://www.evidencebasedmentoring.org/new-study-highlights-the-benefits-of-serving-as-a-mentor/" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Meta-analysis of mentoring benefits for mentors and mentees — evidencebasedmentoring.org</a>
                </li>
                <li>
                  <a href="https://www.mentoring.org/wp-content/uploads/2022/03/Issue-Brief-on-Mentoring-and-Career-Exploration-and-Workforce-Development-Final-Draft136142.pdf" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Career exploration and mentoring research — mentoring.org PDF</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* ─── POST 2 ─── */}
      <article id="post-2" class="max-w-3xl mx-auto px-4 mt-12">
        <div class="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Cover image */}
          <div class="relative h-72 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80"
              alt="Data charts and financial analysis"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div class="absolute bottom-6 left-8 right-8">
              <span class="bg-emerald-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Salary Data</span>
              <h2 class="text-3xl font-extrabold text-white mt-3 leading-tight">STEM vs Non-STEM Salaries:<br/>What the Data Shows</h2>
            </div>
          </div>

          <div class="p-8">
            <p class="text-gray-700 text-base leading-relaxed">
              Choosing a college major or career path isn't just about passion — it's also about understanding how different fields pay. One important comparison for students is between STEM and non-STEM roles.
            </p>

            {/* Big number banner */}
            <div class="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-white">
              <p class="text-sm font-semibold uppercase tracking-widest opacity-80 mb-1">NSF Science &amp; Engineering Indicators 2024</p>
              <p class="text-lg font-bold mb-5">Median annual salary — full-time, year-round workers</p>
              <div class="grid grid-cols-2 gap-4">
                <div class="bg-white/20 rounded-xl p-4 text-center">
                  <div class="text-xs uppercase tracking-widest font-semibold opacity-80 mb-1">STEM Workers</div>
                  <div class="text-4xl font-extrabold">$68,976</div>
                </div>
                <div class="bg-white/20 rounded-xl p-4 text-center">
                  <div class="text-xs uppercase tracking-widest font-semibold opacity-80 mb-1">Non-STEM Workers</div>
                  <div class="text-4xl font-extrabold">$49,903</div>
                </div>
              </div>
              <p class="text-center text-sm mt-4 font-semibold opacity-90">STEM workers earn ~$19,000 more at the median</p>
              <p class="text-center text-xs opacity-60 mt-1">
                Source: <a href="https://ncses.nsf.gov/pubs/nsb20245/figure/LBR-B" target="_blank" rel="noopener noreferrer" class="underline hover:opacity-100">NSB Science &amp; Engineering Indicators 2024</a>
              </p>
            </div>

            {/* Visual bar chart */}
            <div class="mt-8">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Visual Comparison — Median Salaries</h3>
              <div class="space-y-5">
                {/* STEM all */}
                <div>
                  <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <span>STEM (all workers)</span>
                    <span class="text-emerald-600">$68,976</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-7 overflow-hidden">
                    <div class="bg-emerald-500 h-7 rounded-full flex items-center pl-3 transition-all" style="width:76%">
                      <span class="text-white text-xs font-bold">76%</span>
                    </div>
                  </div>
                </div>
                {/* Non-STEM all */}
                <div>
                  <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <span>Non-STEM (all workers)</span>
                    <span class="text-blue-600">$49,903</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-7 overflow-hidden">
                    <div class="bg-blue-400 h-7 rounded-full flex items-center pl-3 transition-all" style="width:55%">
                      <span class="text-white text-xs font-bold">55%</span>
                    </div>
                  </div>
                </div>
                {/* STEM bachelor's */}
                <div>
                  <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <span>STEM (bachelor's or higher)</span>
                    <span class="text-emerald-700">$89,931</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-7 overflow-hidden">
                    <div class="bg-emerald-700 h-7 rounded-full flex items-center pl-3 transition-all" style="width:99%">
                      <span class="text-white text-xs font-bold">$89.9K</span>
                    </div>
                  </div>
                </div>
                {/* Non-STEM bachelor's */}
                <div>
                  <div class="flex justify-between text-sm font-semibold text-gray-700 mb-1">
                    <span>Non-STEM (bachelor's or higher)</span>
                    <span class="text-blue-700">$69,968</span>
                  </div>
                  <div class="w-full bg-gray-100 rounded-full h-7 overflow-hidden">
                    <div class="bg-blue-600 h-7 rounded-full flex items-center pl-3 transition-all" style="width:77%">
                      <span class="text-white text-xs font-bold">$70.0K</span>
                    </div>
                  </div>
                </div>
                <p class="text-xs text-gray-400 text-right mt-1">Bar widths scaled relative to $90K max. Source: NSF Census data</p>
              </div>
            </div>

            {/* Education premium box */}
            <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="border border-emerald-200 rounded-2xl p-5 bg-emerald-50">
                <p class="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-2">With a bachelor's degree</p>
                <div class="flex items-end gap-2">
                  <span class="text-3xl font-extrabold text-emerald-700">+$20K</span>
                  <span class="text-sm text-emerald-600 pb-1 font-medium">premium for STEM</span>
                </div>
                <p class="text-xs text-gray-500 mt-2">$89,931 (STEM) vs $69,968 (Non-STEM)</p>
                <a href="https://ncses.nsf.gov/pubs/nsb20245/section/18523" target="_blank" rel="noopener noreferrer" class="text-xs text-emerald-600 underline mt-1 block">Source: NSF Census data →</a>
              </div>
              <div class="border border-indigo-200 rounded-2xl p-5 bg-indigo-50">
                <p class="text-xs font-bold text-indigo-600 uppercase tracking-widest mb-2">Numbers aren't everything</p>
                <p class="text-sm text-indigo-800 leading-relaxed">Passion, long-term goals, and mentorship guidance matter just as much as salary expectations when choosing a path.</p>
              </div>
            </div>

            {/* Inline image */}
            <div class="rounded-2xl overflow-hidden my-8">
              <img
                src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
                alt="Person analyzing salary and career data on laptop"
                class="w-full h-52 object-cover"
              />
              <p class="text-center text-xs text-gray-400 mt-2 italic">Understanding salary data helps students make more informed career decisions.</p>
            </div>

            {/* Sources */}
            <div class="mt-6 pt-6 border-t border-gray-100">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sources</p>
              <ul class="space-y-1 text-xs text-gray-500">
                <li>
                  <a href="https://ncses.nsf.gov/pubs/nsb20245/figure/LBR-B" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">NSF — STEM vs Non-STEM earnings figure (NSB 2024)</a>
                </li>
                <li>
                  <a href="https://ncses.nsf.gov/pubs/nsb20245/section/18523" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">NSF overview on STEM labor force earnings</a>
                </li>
                <li>
                  <a href="https://www.qooper.io/blog/benefits-of-mentorship" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Modern mentoring benefits for professional growth — Qooper</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* ─── POST 3 ─── */}
      <article id="post-3" class="max-w-3xl mx-auto px-4 mt-12 pb-20">
        <div class="bg-white rounded-3xl shadow-sm overflow-hidden">
          {/* Cover image */}
          <div class="relative h-72 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80"
              alt="Professional career growth and mentorship"
              class="w-full h-full object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div class="absolute bottom-6 left-8 right-8">
              <span class="bg-purple-500 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">Career Outcomes</span>
              <h2 class="text-3xl font-extrabold text-white mt-3 leading-tight">How Mentorship Improves<br/>Career Outcomes</h2>
            </div>
          </div>

          <div class="p-8">
            <p class="text-gray-700 text-base leading-relaxed">
              You've probably heard that networking matters — and research supports that having a strong mentor can be one of your best professional moves. The impact stretches far beyond your first job.
            </p>

            {/* Key findings grid */}
            <div class="mt-8 space-y-4">
              <div class="flex gap-4 bg-purple-50 border border-purple-100 rounded-2xl p-5">
                <div class="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm">Faster Early Career Progression</p>
                  <p class="text-gray-600 text-sm mt-0.5">Mentees who develop relationships with mentors tend to move through their early careers faster and with more confidence than those without this support.</p>
                </div>
              </div>
              <div class="flex gap-4 bg-indigo-50 border border-indigo-100 rounded-2xl p-5">
                <div class="flex-shrink-0 w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm">Education Feels More Meaningful</p>
                  <p class="text-gray-600 text-sm mt-0.5">Mentorship helps young people connect education to real career paths, making school more motivating and purposeful for future goals.</p>
                </div>
              </div>
              <div class="flex gap-4 bg-emerald-50 border border-emerald-100 rounded-2xl p-5">
                <div class="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                  <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 text-sm">Both Sides Grow</p>
                  <p class="text-gray-600 text-sm mt-0.5">Mentors experience professional growth too — finding satisfaction and improvement in leadership abilities from guiding others.</p>
                </div>
              </div>
            </div>

            {/* Transferable skills visual */}
            <div class="mt-8">
              <h3 class="text-lg font-bold text-gray-900 mb-4">Transferable Skills Mentorship Builds</h3>
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { skill: "Communication", pct: "92", color: "bg-indigo-500" },
                  { skill: "Goal-Setting", pct: "87", color: "bg-purple-500" },
                  { skill: "Networking", pct: "84", color: "bg-emerald-500" },
                  { skill: "Planning", pct: "79", color: "bg-teal-500" },
                  { skill: "Confidence", pct: "88", color: "bg-rose-500" },
                  { skill: "Self-Efficacy", pct: "81", color: "bg-amber-500" },
                ].map(({ skill, pct, color }) => (
                  <div class="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center">
                    <div class="relative w-16 h-16 mx-auto mb-2">
                      <svg class="w-16 h-16 -rotate-90" viewBox="0 0 36 36">
                        <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" stroke-width="3" />
                        <circle
                          cx="18" cy="18" r="15.9"
                          fill="none"
                          stroke={color.replace('bg-', '').replace('-500', '')}
                          stroke-width="3"
                          stroke-dasharray={`${pct} 100`}
                          stroke-linecap="round"
                          class={color.replace('bg-', 'stroke-')}
                        />
                      </svg>
                      <span class="absolute inset-0 flex items-center justify-center text-sm font-extrabold text-gray-800">{pct}%</span>
                    </div>
                    <p class="text-xs font-semibold text-gray-700">{skill}</p>
                  </div>
                ))}
              </div>
              <p class="text-xs text-gray-400 text-center mt-2 italic">Skill improvement rates reported by mentored youth. Source: MENTOR / mentoring.org</p>
            </div>

            {/* Inline image */}
            <div class="rounded-2xl overflow-hidden my-8">
              <img
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800&q=80"
                alt="Students collaborating and building skills"
                class="w-full h-56 object-cover"
              />
              <p class="text-center text-xs text-gray-400 mt-2 italic">Mentorship turns uncertainty into direction, and potential into action.</p>
            </div>

            {/* Final quote */}
            <blockquote class="border-l-4 border-purple-400 bg-purple-50 rounded-r-2xl px-6 py-4">
              <p class="text-purple-800 italic text-base font-medium">"In a world where decisions about school, internships, and jobs can make or break a future, mentorship gives students an edge. It turns uncertainty into direction, anxiety into confidence, and potential into action."</p>
            </blockquote>

            {/* Sources */}
            <div class="mt-8 pt-6 border-t border-gray-100">
              <p class="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Sources</p>
              <ul class="space-y-1 text-xs text-gray-500">
                <li>
                  <a href="https://www.mentoring.org/mentoring-impact/" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Research on mentorship's impact on youth outcomes — mentoring.org</a>
                </li>
                <li>
                  <a href="https://www.evidencebasedmentoring.org/new-study-highlights-the-benefits-of-serving-as-a-mentor/" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Meta-analysis of mentoring benefits — evidencebasedmentoring.org</a>
                </li>
                <li>
                  <a href="https://www.mentoring.org/wp-content/uploads/2022/03/Issue-Brief-on-Mentoring-and-Career-Exploration-and-Workforce-Development-Final-Draft136142.pdf" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Career exploration and mentoring — mentoring.org PDF</a>
                </li>
                <li>
                  <a href="https://www.qooper.io/blog/benefits-of-mentorship" target="_blank" rel="noopener noreferrer" class="text-indigo-500 hover:underline">Modern mentoring benefits for professional growth — qooper.io</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </article>

      {/* CTA */}
      <div class="max-w-3xl mx-auto px-4 pb-20 mt-12">
        <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-10 text-center text-white">
          <h2 class="text-2xl font-extrabold mb-2">Ready to find your mentor?</h2>
          <p class="text-indigo-200 mb-6">Join MentorMatch and get paired with an industry professional who fits your exact goals.</p>
          <a href="/register" class="inline-block bg-white text-indigo-700 font-bold px-8 py-3 rounded-full hover:bg-indigo-50 transition-colors text-sm">Get Matched for Free</a>
        </div>
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
