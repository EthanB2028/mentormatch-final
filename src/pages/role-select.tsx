export function RoleSelectPage() {
  return (
    <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div class="container mx-auto px-4 py-12 max-w-4xl">

        {/* Header */}
        <div class="text-center mb-12">
          <a href="/" class="inline-block mb-6 hover:no-underline">
            <span class="wordmark text-2xl font-bold text-gray-900">Mentor<span class="text-indigo-600">Match</span></span>
          </a>
          <h1 class="wordmark text-4xl md:text-5xl font-bold text-gray-900 mb-4">Choose Your Role</h1>
          <p class="text-lg text-gray-500 max-w-2xl mx-auto">
            Are you a student seeking career advice and mentorship, or a leader ready to coach?
            Select your role to start your career development journey.
          </p>
        </div>

          {/* Role Selection Cards */}
          <div class="grid md:grid-cols-2 gap-8 mb-12">
            {/* Student Card */}
            <div class="bg-white rounded-3xl p-8 text-center border border-indigo-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal card-shimmer">
            <img
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&q=80"
              alt="College students getting career advice"
              class="w-full h-44 object-cover rounded-2xl mb-5"
            />
            <h2 class="wordmark text-2xl md:text-3xl font-bold text-gray-900 mb-4">I'm a Student</h2>
            <p class="text-gray-600 text-base mb-6 leading-relaxed">
              Find a mentor among industry leaders, successful entrepreneurs, and career coaches.
              Get career advice, professional guidance, and one-on-one sessions to build your future.
            </p>
            <div class="mb-6 text-left">
              <h3 class="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Perfect for:</h3>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• Students seeking career guidance</li>
                <li>• Recent graduates planning career paths</li>
                <li>• Aspiring professionals &amp; entrepreneurs</li>
                <li>• Anyone who wants a real mentor</li>
              </ul>
            </div>
            <button
              onclick="selectRole('student')"
              class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-md hover:shadow-lg"
            >
              Join as Student →
            </button>
          </div>

            {/* Mentor Card */}
            <div class="bg-white rounded-3xl p-8 text-center border border-emerald-100 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 reveal delay-200 card-shimmer">
            <img
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80"
              alt="Executive leader ready for career mentoring"
              class="w-full h-44 object-cover rounded-2xl mb-5"
            />
            <h2 class="wordmark text-2xl md:text-3xl font-bold text-gray-900 mb-4">I'm a Leader</h2>
            <p class="text-gray-600 text-base mb-6 leading-relaxed">
              Provide career coaching and mentorship to the next generation.
              Share your experience and make a lasting impact through one-on-one sessions.
            </p>
            <div class="mb-6 text-left">
              <h3 class="font-bold text-gray-900 mb-2 text-sm uppercase tracking-wide">Perfect for:</h3>
              <ul class="text-sm text-gray-500 space-y-1">
                <li>• CEOs &amp; executives</li>
                <li>• Successful career professionals</li>
                <li>• Industry leaders &amp; mentors</li>
                <li>• Anyone who wants to give back</li>
              </ul>
            </div>
            <button
              onclick="selectRole('ceo')"
              class="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-4 rounded-2xl text-base transition-all shadow-md hover:shadow-lg"
            >
              Join as Leader →
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div class="text-center">
          <div class="bg-white rounded-2xl inline-block px-8 py-6 border border-gray-100 shadow-sm">
            <p class="text-gray-600 text-base mb-4">New to MentorMatch?</p>
            <a
              href="/register"
              class="inline-block bg-gray-900 hover:bg-gray-800 text-white font-bold px-6 py-3 rounded-xl text-base transition-colors mr-4 hover:no-underline"
            >
              Create Account
            </a>
            <a href="/login" class="text-indigo-600 font-semibold text-base hover:underline">
              Already have an account? Login
            </a>
          </div>
        </div>

        <div class="text-center mt-6">
          <a href="/" class="text-gray-400 text-sm hover:text-gray-600 hover:no-underline">← Back to Home</a>
        </div>
      </div>
    </div>
  )
}
