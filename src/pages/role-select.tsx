export function RoleSelectPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* Nav */}
      <nav class="bg-white/80 backdrop-blur border-b border-gray-100">
        <div class="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" class="text-xl font-bold text-gray-900 hover:no-underline">
            Mentor<span class="text-indigo-600">Match</span>
          </a>
          <div class="flex items-center gap-2">
            <a href="/login" class="text-sm font-semibold text-gray-600 hover:text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors hover:no-underline">
              Log in
            </a>
            <a href="/register" class="text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors hover:no-underline">
              Sign up
            </a>
          </div>
        </div>
      </nav>

      <div class="max-w-4xl mx-auto px-6 py-16">

        {/* Header */}
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-gray-900 mb-3">Choose Your Role</h1>
          <p class="text-lg text-gray-500 max-w-xl mx-auto">
            Are you a student seeking career guidance, or a professional ready to give back?
          </p>
        </div>

        {/* Role Cards */}
        <div class="grid md:grid-cols-2 gap-6 mb-10">

          {/* Student Card */}
          <a
            href="/register?role=student"
            class="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:no-underline hover:border-indigo-200 block"
          >
            <div class="overflow-hidden rounded-xl mb-6">
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"
                alt="Students getting career advice"
                class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-xl">🎓</div>
              <h2 class="text-xl font-bold text-gray-900">I'm a Student</h2>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed mb-5">
              Find mentors among industry leaders and career coaches. Get one-on-one guidance matched to your exact goals.
            </p>
            <div class="mb-6">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Perfect for</p>
              <ul class="space-y-1 text-sm text-gray-600">
                <li class="flex items-center gap-2"><span class="text-indigo-400">→</span> Students seeking career direction</li>
                <li class="flex items-center gap-2"><span class="text-indigo-400">→</span> Recent grads planning next steps</li>
                <li class="flex items-center gap-2"><span class="text-indigo-400">→</span> Anyone who wants a real mentor</li>
              </ul>
            </div>
            <div class="w-full bg-indigo-600 group-hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-xl text-sm text-center transition-colors">
              Join as Student →
            </div>
          </a>

          {/* Mentor Card */}
          <a
            href="/register?role=mentor"
            class="group bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 hover:no-underline hover:border-emerald-200 block"
          >
            <div class="overflow-hidden rounded-xl mb-6">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
                alt="Professional mentor"
                class="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div class="flex items-center gap-3 mb-3">
              <div class="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-xl">💼</div>
              <h2 class="text-xl font-bold text-gray-900">I'm a Mentor</h2>
            </div>
            <p class="text-gray-500 text-sm leading-relaxed mb-5">
              Share your experience with the next generation. Provide career coaching and make a lasting impact through one-on-one sessions.
            </p>
            <div class="mb-6">
              <p class="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Perfect for</p>
              <ul class="space-y-1 text-sm text-gray-600">
                <li class="flex items-center gap-2"><span class="text-emerald-400">→</span> Executives & industry professionals</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400">→</span> Career coaches & mentors</li>
                <li class="flex items-center gap-2"><span class="text-emerald-400">→</span> Anyone who wants to give back</li>
              </ul>
            </div>
            <div class="w-full bg-emerald-600 group-hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded-xl text-sm text-center transition-colors">
              Join as Mentor →
            </div>
          </a>
        </div>

        {/* Bottom CTA */}
        <div class="text-center">
          <p class="text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/login" class="text-indigo-600 font-semibold hover:underline">Log in</a>
          </p>
          <a href="/" class="inline-block mt-4 text-sm text-gray-400 hover:text-gray-600 hover:no-underline transition-colors">
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  )
}
