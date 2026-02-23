export function LoginPage() {
  return (
    <div class="min-h-screen bg-white relative overflow-hidden">
      {/* Hand-drawn background elements */}
      <div class="absolute inset-0 pointer-events-none">
        <svg class="absolute top-10 left-10 w-32 h-32 opacity-10" viewBox="0 0 100 100">
          <path d="M10,50 Q30,10 50,50 Q70,90 90,50" stroke="black" stroke-width="2" fill="none" class="animate-bounce-slow" />
        </svg>
        <svg class="absolute bottom-20 right-20 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="none" class="animate-wiggle" />
        </svg>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div class="text-center mb-12">
          <a href="/" class="inline-block scribble-border p-3 mb-8 hover:rotate-1 transition-transform">
            <h1 class="text-3xl font-bold font-sketch">MentorMatch</h1>
          </a>
          <div class="scribble-border-large inline-block p-6">
            <h2 class="text-4xl md:text-5xl font-bold font-sketch mb-4 transform rotate-1">
              Welcome Back! 👋
            </h2>
            <p class="text-xl font-handwritten max-w-2xl mx-auto">
              Sign in to continue your career mentorship and professional development journey
            </p>
          </div>
        </div>

        {/* Login Form */}
        <div class="max-w-md mx-auto">
          <div class="scribble-card-large p-8 bg-gray-50">
            <form id="loginForm" class="space-y-6">
              {/* Email Field */}
              <div>
                <label class="block font-sketch text-lg mb-2" for="email">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid focus:rotate-1 transition-transform"
                  placeholder="your@email.com"
                />
              </div>

              {/* Password Field */}
              <div>
                <label class="block font-sketch text-lg mb-2" for="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid focus:rotate-1 transition-transform"
                  placeholder="Enter your password"
                />
              </div>

              {/* Error Message */}
              <div id="errorMessage" class="hidden p-3 bg-red-100 border-2 border-red-400 border-dashed rounded-lg">
                <p class="font-handwritten text-red-700 text-sm"></p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="loginButton"
                class="w-full scribble-button p-4 font-sketch text-xl hover:rotate-1 transition-transform bg-blue-200 hover:bg-blue-300"
              >
                <span id="loginButtonText">Sign In</span>
                <span id="loginLoader" class="hidden">
                  <svg class="animate-spin inline-block w-5 h-5 mr-2" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="none" stroke-dasharray="60 40" />
                  </svg>
                  Signing in...
                </span>
              </button>
            </form>

            {/* Forgot Password */}
            <div class="mt-6 text-center">
              <a href="#" class="font-handwritten text-gray-600 hover:text-black hover:underline">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Sign Up Link */}
          <div class="text-center mt-8">
            <div class="scribble-border inline-block p-4">
              <p class="font-handwritten">
                New to MentorMatch?{' '}
                <a href="/register" class="font-sketch font-bold hover:underline transform hover:rotate-1 inline-block transition-transform">
                  Create an account
                </a>
              </p>
            </div>
          </div>

          {/* Demo Accounts */}
          <div class="mt-8">
            <div class="scribble-card p-4 bg-yellow-50">
              <h3 class="font-sketch text-lg mb-3 text-center">🧪 Demo Accounts</h3>
              <div class="space-y-2 font-handwritten text-sm">
                <p><strong>Student:</strong> student@demo.com / password123</p>
                <p><strong>CEO:</strong> ceo@demo.com / password123</p>
              </div>
              <div class="flex space-x-2 mt-4">
                <button onclick="loginAsDemo('student')" class="flex-1 scribble-button p-2 font-sketch text-sm bg-green-100 hover:bg-green-200">
                  Login as Student
                </button>
                <button onclick="loginAsDemo('ceo')" class="flex-1 scribble-button p-2 font-sketch text-sm bg-purple-100 hover:bg-purple-200">
                  Login as CEO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        document.getElementById('loginForm').addEventListener('submit', async function(e) {
          e.preventDefault()
          
          const email = document.getElementById('email').value
          const password = document.getElementById('password').value
          
          if (!email || !password) {
            showError('Please fill in all fields')
            return
          }
          
          setLoading(true)
          
          try {
            const response = await fetch('/api/auth/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ email, password })
            })
            
            const data = await response.json()
            
            if (response.ok && data.success) {
              // Store token in localStorage and cookie
              localStorage.setItem('auth-token', data.token)
              document.cookie = 'auth-token=' + data.token + '; path=/; max-age=604800' // 7 days
              
              // Store user info
              localStorage.setItem('user', JSON.stringify(data.user))
              
              // Redirect to dashboard
              window.location.href = '/dashboard'
            } else {
              showError(data.error || 'Login failed')
            }
          } catch (error) {
            console.error('Login error:', error)
            showError('Network error. Please try again.')
          } finally {
            setLoading(false)
          }
        })
        
        function showError(message) {
          const errorDiv = document.getElementById('errorMessage')
          const errorText = errorDiv.querySelector('p')
          errorText.textContent = message
          errorDiv.classList.remove('hidden')
          
          // Hide after 5 seconds
          setTimeout(() => {
            errorDiv.classList.add('hidden')
          }, 5000)
        }
        
        function setLoading(loading) {
          const button = document.getElementById('loginButton')
          const buttonText = document.getElementById('loginButtonText')
          const loader = document.getElementById('loginLoader')
          
          if (loading) {
            button.disabled = true
            buttonText.classList.add('hidden')
            loader.classList.remove('hidden')
          } else {
            button.disabled = false
            buttonText.classList.remove('hidden')
            loader.classList.add('hidden')
          }
        }
        
        function loginAsDemo(role) {
          const email = role === 'student' ? 'student@demo.com' : 'ceo@demo.com'
          const password = 'password123'
          
          document.getElementById('email').value = email
          document.getElementById('password').value = password
          
          // Auto-submit
          document.getElementById('loginForm').dispatchEvent(new Event('submit'))
        }
        `
      }} />
    </div>
  )
}