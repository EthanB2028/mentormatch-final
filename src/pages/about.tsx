export function AboutPage() {
  return (
    <div class="min-h-screen bg-white">

      {/* ── Sticky Nav ── */}
      <nav class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div class="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" class="wordmark text-xl font-bold text-gray-900 hover:no-underline">Mentor<span class="text-indigo-600">Match</span></a>
          <div class="flex items-center gap-1">
            <a href="/" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">Home</a>
            <a href="/about" class="px-4 py-2 rounded-full text-sm font-semibold text-indigo-600 bg-indigo-50 border border-indigo-200 hover:no-underline">About the Founder</a>
            <a href="/how-it-works" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">How It Works</a>
            <a href="/blog" class="px-4 py-2 rounded-full text-sm font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors hover:no-underline">Blog</a>
            <a href="/role-select" class="ml-3 px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-full transition-colors shadow-sm hover:no-underline">Start Connecting</a>
          </div>
        </div>
      </nav>

      {/* ── Hero banner ── */}
      <div class="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-700 text-white pt-16 pb-20 text-center px-6">
        <span class="inline-block bg-white/20 text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">My Story</span>
        <h1 class="wordmark text-4xl md:text-6xl font-bold mb-4">About the Founder</h1>
        <p class="text-indigo-200 text-lg max-w-2xl mx-auto">Built from real experience. Driven by a mission to make mentorship accessible to everyone.</p>
      </div>

      <div class="max-w-4xl mx-auto px-6 py-16">

          {/* About the Founder */}
          <div class="mb-16 reveal">
            <div class="bg-blue-50 rounded-3xl p-8 md:p-10 border border-blue-100">
            <h3 class="wordmark text-3xl font-bold text-gray-900 mb-8 text-center">About the Founder</h3>

            <div class="flex justify-center mb-8">
              <img
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/project-uploads/3be8fdd4-19f6-46f8-b92d-c61648f7f1c8/unnamed-9-resized-1771734759281.jpg?width=8000&height=8000&resize=contain"
                alt="Ethan B, Founder of MentorMatch"
                class="w-52 h-52 object-cover object-top rounded-2xl shadow-lg"
              />
            </div>

            <p class="text-lg leading-relaxed mb-5 text-gray-700">
              My name is <strong>Ethan B</strong>, and I'm a 15-year-old student in the Bay Area.
              I'm also a freelance sports photographer who has worked with professional,
              collegiate, and high school athletes throughout the region.
            </p>
            <p class="text-lg leading-relaxed mb-5 text-gray-700">
              As a young photographer trying to grow in a competitive field, I learned something early: talent isn't
              enough. What truly accelerated my growth was reaching out to photographers I admired — asking questions,
              studying their work, and learning directly from people with more experience than me. Having someone older,
              wiser, and further ahead guide me made an enormous difference.
            </p>
            <p class="text-lg leading-relaxed mb-5 text-gray-700 font-bold">
              That realization stuck with me.
            </p>
            <p class="text-lg leading-relaxed mb-5 text-gray-700">
              I began noticing the same pattern everywhere. Whether someone wants to become a professional athlete, a
              doctor, a lawyer, an entrepreneur, or a scientist — no one succeeds alone. Every successful person had
              guidance. Every successful person had someone who helped them navigate the unknown.
            </p>
            <p class="text-lg leading-relaxed mb-5 text-gray-700">
              Even at my own school, programs like "Big Brother, Little Brother" show how powerful mentorship can be
              during important transitions. When freshmen have upperclassmen to guide them, the adjustment becomes
              smoother, more confident, and more successful.
            </p>
            <p class="text-lg leading-relaxed font-bold text-gray-900">
              That's why I created MentorMatch.
            </p>
          </div>
        </div>

          {/* My Vision */}
          <div class="mb-16 reveal">
            <div class="bg-amber-50 rounded-3xl p-8 md:p-10 border border-amber-100">
            <h3 class="wordmark text-3xl font-bold text-gray-900 mb-6 text-center">My Vision</h3>
            <p class="text-lg leading-relaxed mb-5 text-gray-700">
              My long-term vision for MentorMatch is simple but powerful:
            </p>
            <blockquote class="text-xl font-semibold text-indigo-700 text-center leading-relaxed mb-6 bg-white rounded-2xl px-6 py-5 border border-indigo-100 shadow-sm">
              "One day, a student should be able to click a button and instantly connect with the right mentor for their dream career."
            </blockquote>
            <div class="space-y-3 text-lg text-gray-700">
              <p>• If you want to become a CEO, you should speak to one.</p>
              <p>• If you want to become a doctor, you should learn from one.</p>
              <p>• If you want to work in sports, law, tech, or science — you should have direct access to someone who has already done it.</p>
            </div>
            <p class="text-lg leading-relaxed mt-6 font-bold text-gray-900">
              Mentorship shouldn't depend on who you know. It should depend on who you aspire to become.
            </p>
          </div>
        </div>

          {/* The Challenges */}
          <div class="mb-16 reveal">
            <div class="bg-white rounded-3xl p-8 md:p-10 border border-gray-200 shadow-sm">
            <h3 class="wordmark text-2xl font-bold text-gray-900 mb-4 text-center">The Challenges</h3>
            <p class="text-lg leading-relaxed mb-4 text-gray-700">
              Starting MentorMatch at 15 hasn't been easy. One of the biggest challenges has been reaching a wider audience.
              There are only so many people you can message personally, and building trust at a young age requires persistence and proof.
            </p>
            <p class="text-lg leading-relaxed mb-4 text-gray-700">
              But every meaningful idea starts small. And every large movement once began with a single conversation.
            </p>
            <p class="text-lg leading-relaxed font-bold text-gray-900">
              I believe that if I focus on impact first, growth will follow.
            </p>
          </div>
        </div>

          {/* Why Trust MentorMatch */}
          <div class="mb-16 reveal">
            <div class="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-200">
            <h3 class="wordmark text-3xl font-bold text-gray-900 mb-6 text-center">Why Trust MentorMatch?</h3>
            <p class="text-lg leading-relaxed mb-5 text-gray-700">
              MentorMatch isn't just an idea — it's built from real experience.
            </p>
            <p class="text-lg leading-relaxed mb-6 text-gray-700">
              I've personally seen how mentorship accelerates growth. I've experienced it in photography. I've seen it in sports.
              I've seen it in school programs. And I've seen how one conversation can change someone's confidence and direction.
            </p>
            <p class="text-lg font-bold mb-6 text-gray-900">MentorMatch is founded on three principles:</p>
            <div class="grid md:grid-cols-3 gap-6 mb-6">
              <div class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <div class="text-4xl mb-3">🌍</div>
                <h4 class="font-bold text-lg mb-2 text-gray-900">Access</h4>
                <p class="text-sm text-gray-500">Every student deserves opportunity</p>
              </div>
              <div class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <div class="text-4xl mb-3">✅</div>
                <h4 class="font-bold text-lg mb-2 text-gray-900">Authenticity</h4>
                <p class="text-sm text-gray-500">Real mentors with real experience</p>
              </div>
              <div class="bg-white rounded-2xl p-6 text-center border border-gray-100 shadow-sm">
                <div class="text-4xl mb-3">🚀</div>
                <h4 class="font-bold text-lg mb-2 text-gray-900">Impact</h4>
                <p class="text-sm text-gray-500">Conversations that create long-term growth</p>
              </div>
            </div>
            <div class="text-center">
              <p class="text-lg text-gray-700 mb-2">This isn't about networking for status.</p>
              <p class="text-lg text-gray-700 mb-4">It's about building bridges through conversation.</p>
              <p class="text-xl font-bold text-indigo-700 bg-indigo-50 rounded-2xl px-6 py-4 inline-block border border-indigo-100">
                And sometimes, one mentor is all it takes to change a life.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div class="text-center mb-8">
          <div class="bg-indigo-600 rounded-3xl p-10 text-white">
            <h3 class="wordmark text-3xl font-bold mb-4">Join the Movement</h3>
            <p class="text-indigo-200 text-base mb-8 max-w-xl mx-auto">
              Whether you're a student looking for guidance or a professional ready to give back,
              join a platform where one conversation can change everything.
            </p>
            <a href="/role-select"
               class="inline-block bg-white text-indigo-700 font-bold px-8 py-4 rounded-2xl text-base hover:bg-indigo-50 transition-colors hover:no-underline shadow-lg">
              Start Connecting →
            </a>
          </div>
        </div>

      </div>

      {/* ── Footer ── */}
      <footer class="bg-gray-900 text-white pt-12 pb-8">
        <div class="max-w-5xl mx-auto px-6">
          <div class="flex flex-col md:flex-row justify-between items-start gap-8 mb-10">
            <div>
              <h3 class="wordmark text-2xl font-bold mb-2">Mentor<span class="text-indigo-400">Match</span></h3>
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
            <p class="text-gray-500 text-sm">© 2025 MentorMatch · Built by Ethan B · Bay Area</p>
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
