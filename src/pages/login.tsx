export function LoginPage() {
  return (
    <div class="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <nav class="w-full px-6 py-4 flex items-center justify-between bg-white border-b border-gray-100">
        <a href="/" class="text-xl font-bold text-gray-900 tracking-tight">
          Mentor<span class="text-indigo-600">Match</span>
        </a>
        <a href="/register" class="text-sm text-gray-600 hover:text-indigo-600 transition-colors">
          Don't have an account? <span class="font-semibold text-indigo-600">Sign up</span>
        </a>
      </nav>

      {/* Main content */}
      <div class="flex flex-1 items-center justify-center px-4 py-12">
        <div class="w-full max-w-md">
          {/* Card */}
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
            <div class="mb-8">
              <h1 class="text-2xl font-bold text-gray-900 mb-1">Welcome back</h1>
              <p class="text-gray-500 text-sm">Sign in to your MentorMatch account</p>
            </div>

            {/* Error message */}
            <div id="errorBox" class="hidden mb-5 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p id="errorText" class="text-sm text-red-700"></p>
            </div>

            <form id="loginForm" class="space-y-5">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5" for="email">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  autocomplete="email"
                  class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                  placeholder="you@example.com"
                />
              </div>

              <div>
                <div class="flex items-center justify-between mb-1.5">
                  <label class="block text-sm font-medium text-gray-700" for="password">
                    Password
                  </label>
                  <a href="#" class="text-xs text-indigo-600 hover:text-indigo-700">Forgot password?</a>
                </div>
                <div class="relative">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    autocomplete="current-password"
                    class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition pr-10"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    id="togglePassword"
                    class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                    tabindex="-1"
                  >
                    <svg id="eyeIcon" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="loginBtn"
                class="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 px-4 rounded-lg text-sm transition focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span id="loginBtnText">Sign in</span>
                <span id="loginBtnLoader" class="hidden items-center justify-center gap-2">
                  <svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Signing in...
                </span>
              </button>
            </form>

            {/* Divider */}
            <div class="relative my-6">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-100"></div>
              </div>
              <div class="relative flex justify-center">
                <span class="bg-white px-3 text-xs text-gray-400">or try a demo account</span>
              </div>
            </div>

            {/* Demo buttons */}
            <div class="grid grid-cols-2 gap-3">
              <button
                type="button"
                onclick="loginAsDemo('student')"
                class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-300 transition"
              >
                <span class="text-base">🎓</span>
                Student Demo
              </button>
              <button
                type="button"
                onclick="loginAsDemo('mentor')"
                class="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 hover:border-indigo-300 transition"
              >
                <span class="text-base">🏆</span>
                Mentor Demo
              </button>
            </div>
          </div>

          {/* Sign up link (mobile) */}
          <p class="text-center text-sm text-gray-500 mt-6">
            New to MentorMatch?{' '}
            <a href="/register" class="font-semibold text-indigo-600 hover:text-indigo-700">Create an account</a>
          </p>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{__html: `
        // Password visibility toggle
        document.getElementById('togglePassword').addEventListener('click', function() {
          const input = document.getElementById('password')
          const icon = document.getElementById('eyeIcon')
          if (input.type === 'password') {
            input.type = 'text'
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />'
          } else {
            input.type = 'password'
            icon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />'
          }
        })

        document.getElementById('loginForm').addEventListener('submit', async function(e) {
          e.preventDefault()
          const email = document.getElementById('email').value.trim()
          const password = document.getElementById('password').value
          if (!email || !password) { showError('Please fill in all fields'); return }
          setLoading(true)
          try {
            const res = await fetch('/api/auth/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, password })
            })
            const data = await res.json()
            if (res.ok && data.success) {
              localStorage.setItem('auth-token', data.token)
              document.cookie = 'auth-token=' + data.token + '; path=/; max-age=604800'
              localStorage.setItem('user', JSON.stringify(data.user))
              window.location.href = '/dashboard'
            } else {
              showError(data.error || 'Invalid email or password')
            }
          } catch (err) {
            showError('Network error. Please try again.')
          } finally {
            setLoading(false)
          }
        })

        async function loginAsDemo(role) {
          setLoading(true)
          try {
            const res = await fetch('/api/auth/demo-login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ role })
            })
            const data = await res.json()
            if (res.ok && data.success) {
              localStorage.setItem('auth-token', data.token)
              document.cookie = 'auth-token=' + data.token + '; path=/; max-age=604800'
              localStorage.setItem('user', JSON.stringify(data.user))
              window.location.href = '/dashboard'
            } else {
              showError(data.error || 'Demo login failed')
            }
          } catch (err) {
            showError('Network error. Please try again.')
          } finally {
            setLoading(false)
          }
        }

        function showError(msg) {
          const box = document.getElementById('errorBox')
          document.getElementById('errorText').textContent = msg
          box.classList.remove('hidden')
          setTimeout(() => box.classList.add('hidden'), 6000)
        }

        function setLoading(on) {
          const btn = document.getElementById('loginBtn')
          const txt = document.getElementById('loginBtnText')
          const ldr = document.getElementById('loginBtnLoader')
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
      `}} />
    </div>
  )
}
