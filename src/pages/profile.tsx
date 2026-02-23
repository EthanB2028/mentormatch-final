interface ProfilePageProps {
  user: any
}

export function ProfilePage({ user }: ProfilePageProps) {
  return (
    <div class="min-h-screen bg-white relative overflow-hidden">
      {/* Hand-drawn background elements */}
      <div class="absolute inset-0 pointer-events-none">
        <svg class="absolute top-10 right-10 w-32 h-32 opacity-10" viewBox="0 0 100 100">
          <path d="M50,10 L90,90 L10,90 Z" stroke="black" stroke-width="2" fill="none" class="animate-pulse" />
        </svg>
        <svg class="absolute bottom-20 left-10 w-40 h-20 opacity-10" viewBox="0 0 100 50">
          <path d="M10,25 Q30,5 50,25 Q70,45 90,25" stroke="black" stroke-width="2" fill="none" class="animate-bounce-slow" />
        </svg>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header class="flex justify-between items-center mb-12">
          <div class="scribble-border p-3 hover:rotate-1 transition-transform">
            <h1 class="text-3xl font-bold font-sketch">MentorMatch</h1>
          </div>
          
          <div class="flex space-x-4">
            <a href="/dashboard" class="scribble-button px-6 py-3 font-sketch bg-gray-200 hover:bg-gray-300">
              ← Dashboard
            </a>
            <button onclick="logout()" class="scribble-button px-4 py-2 font-sketch text-sm bg-red-200 hover:bg-red-300">
              Logout
            </button>
          </div>
        </header>

        {/* Profile Header */}
        <div class="text-center mb-12">
          <div class="scribble-border-large inline-block p-6">
            <div class="flex items-center justify-center space-x-6">
              <div class="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-4xl">
                {user.role === 'student' ? '🎓' : '👑'}
              </div>
              <div class="text-left">
                <h2 class="text-3xl font-bold font-sketch transform rotate-1">{user.name}</h2>
                <p class="font-handwritten text-xl text-gray-600">
                  {user.role === 'student' ? '🎓 Student' : '👑 CEO/Leader'}
                </p>
                <div class="flex items-center mt-2">
                  <span class="font-handwritten text-sm">
                    Status: {user.verificationStatus === 'verified' ? '✅ Verified' : '⏳ Pending Verification'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div class="max-w-4xl mx-auto">
          <div class="scribble-card-large p-8 bg-gray-50">
            
            {/* Success/Error Messages */}
            <div id="messageContainer" class="mb-6"></div>
            
            <form id="profileForm" class="space-y-8">
              {/* Basic Information */}
              <div>
                <h3 class="text-2xl font-bold font-sketch mb-6 transform -rotate-1">
                  📝 Basic Information
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block font-sketch text-lg mb-2" for="name">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={user.name}
                      required
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid focus:rotate-1 transition-transform"
                    />
                  </div>

                  <div>
                    <label class="block font-sketch text-lg mb-2" for="email">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={user.email}
                      disabled
                      class="w-full p-3 border-2 border-gray-400 border-dashed rounded-lg font-handwritten bg-gray-100 text-gray-600"
                    />
                    <p class="font-handwritten text-xs text-gray-500 mt-1">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>
                </div>

                <div class="mt-6">
                  <label class="block font-sketch text-lg mb-2" for="bio">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows={4}
                    placeholder="Tell others about yourself, your interests, and what you hope to gain from conversations..."
                    class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid resize-none"
                  >{user.bio || ''}</textarea>
                  <p class="font-handwritten text-xs text-gray-500 mt-1">
                    A good bio helps others connect with you better!
                  </p>
                </div>
              </div>

              {/* Role-Specific Fields */}
              {user.role === 'student' && (
                <div>
                  <h3 class="text-2xl font-bold font-sketch mb-6 transform rotate-1">
                    🎓 Student Information
                  </h3>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block font-sketch mb-2" for="university">
                        University/School
                      </label>
                      <input
                        type="text"
                        id="university"
                        name="university"
                        value={user.university || ''}
                        placeholder="e.g., Stanford University"
                        class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      />
                    </div>

                    <div>
                      <label class="block font-sketch mb-2" for="major">
                        Major/Field of Study
                      </label>
                      <input
                        type="text"
                        id="major"
                        name="major"
                        value={user.major || ''}
                        placeholder="e.g., Computer Science"
                        class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      />
                    </div>
                  </div>

                  <div class="mt-6">
                    <label class="block font-sketch mb-2" for="graduationYear">
                      Expected Graduation Year
                    </label>
                    <input
                      type="number"
                      id="graduationYear"
                      name="graduationYear"
                      value={user.graduationYear || ''}
                      min="2024"
                      max="2035"
                      placeholder="e.g., 2025"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid md:w-1/3"
                    />
                  </div>
                </div>
              )}

              {user.role === 'ceo' && (
                <div>
                  <h3 class="text-2xl font-bold font-sketch mb-6 transform -rotate-1">
                    🏢 Professional Information
                  </h3>
                  
                  <div class="grid md:grid-cols-2 gap-6">
                    <div>
                      <label class="block font-sketch mb-2" for="company">
                        Company *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={user.company || ''}
                        required
                        placeholder="e.g., Tech Innovations Inc."
                        class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      />
                    </div>

                    <div>
                      <label class="block font-sketch mb-2" for="position">
                        Position *
                      </label>
                      <input
                        type="text"
                        id="position"
                        name="position"
                        value={user.position || ''}
                        required
                        placeholder="e.g., CEO, Founder, Director"
                        class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      />
                    </div>
                  </div>

                  <div class="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <label class="block font-sketch mb-2" for="industry">
                        Industry
                      </label>
                      <select
                        id="industry"
                        name="industry"
                        class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      >
                        <option value="">Select Industry</option>
                        <option value="technology" selected={user.industry === 'technology'}>Technology</option>
                        <option value="finance" selected={user.industry === 'finance'}>Finance</option>
                        <option value="healthcare" selected={user.industry === 'healthcare'}>Healthcare</option>
                        <option value="education" selected={user.industry === 'education'}>Education</option>
                        <option value="retail" selected={user.industry === 'retail'}>Retail</option>
                        <option value="manufacturing" selected={user.industry === 'manufacturing'}>Manufacturing</option>
                        <option value="media" selected={user.industry === 'media'}>Media & Entertainment</option>
                        <option value="consulting" selected={user.industry === 'consulting'}>Consulting</option>
                        <option value="nonprofit" selected={user.industry === 'nonprofit'}>Non-Profit</option>
                        <option value="other" selected={user.industry === 'other'}>Other</option>
                      </select>
                    </div>

                    <div>
                      <label class="block font-sketch mb-2" for="experienceYears">
                        Years of Experience
                      </label>
                      <input
                        type="number"
                        id="experienceYears"
                        name="experienceYears"
                        value={user.experienceYears || ''}
                        min="0"
                        max="60"
                        placeholder="e.g., 15"
                        class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Social Links */}
              <div>
                <h3 class="text-2xl font-bold font-sketch mb-6 transform rotate-1">
                  🔗 Social Links
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block font-sketch mb-2" for="linkedinUrl">
                      LinkedIn Profile
                    </label>
                    <input
                      type="url"
                      id="linkedinUrl"
                      name="linkedinUrl"
                      value={user.linkedinUrl || ''}
                      placeholder="https://linkedin.com/in/yourprofile"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    />
                  </div>

                  <div>
                    <label class="block font-sketch mb-2" for="websiteUrl">
                      Website/Portfolio
                    </label>
                    <input
                      type="url"
                      id="websiteUrl"
                      name="websiteUrl"
                      value={user.websiteUrl || ''}
                      placeholder="https://yourwebsite.com"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    />
                  </div>
                </div>
              </div>

              {/* Preferences */}
              <div>
                <h3 class="text-2xl font-bold font-sketch mb-6 transform -rotate-1">
                  ⚙️ Preferences
                </h3>
                
                <div class="grid md:grid-cols-2 gap-6">
                  <div>
                    <label class="block font-sketch mb-2" for="timezone">
                      Timezone
                    </label>
                    <select
                      id="timezone"
                      name="timezone"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    >
                      <option value="UTC" selected={user.timezone === 'UTC'}>UTC</option>
                      <option value="America/New_York" selected={user.timezone === 'America/New_York'}>Eastern Time (ET)</option>
                      <option value="America/Chicago" selected={user.timezone === 'America/Chicago'}>Central Time (CT)</option>
                      <option value="America/Denver" selected={user.timezone === 'America/Denver'}>Mountain Time (MT)</option>
                      <option value="America/Los_Angeles" selected={user.timezone === 'America/Los_Angeles'}>Pacific Time (PT)</option>
                      <option value="Europe/London" selected={user.timezone === 'Europe/London'}>London (GMT)</option>
                      <option value="Europe/Paris" selected={user.timezone === 'Europe/Paris'}>Central Europe (CET)</option>
                      <option value="Asia/Tokyo" selected={user.timezone === 'Asia/Tokyo'}>Tokyo (JST)</option>
                      <option value="Australia/Sydney" selected={user.timezone === 'Australia/Sydney'}>Sydney (AEST)</option>
                    </select>
                  </div>

                  <div>
                    <label class="block font-sketch mb-2" for="languages">
                      Languages Spoken
                    </label>
                    <input
                      type="text"
                      id="languages"
                      name="languages"
                      value={user.languages ? user.languages.join(', ') : ''}
                      placeholder="e.g., English, Spanish, French"
                      class="w-full p-3 border-2 border-black border-dashed rounded-lg font-handwritten focus:outline-none focus:border-solid"
                    />
                    <p class="font-handwritten text-xs text-gray-500 mt-1">
                      Separate multiple languages with commas
                    </p>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div class="flex justify-end space-x-4">
                <button
                  type="button"
                  onclick="window.location.href='/dashboard'"
                  class="scribble-button px-8 py-3 font-sketch text-lg bg-gray-200 hover:bg-gray-300"
                >
                  Cancel
                </button>
                
                <button
                  type="submit"
                  id="saveButton"
                  class="scribble-button px-8 py-3 font-sketch text-lg bg-green-200 hover:bg-green-300"
                >
                  <span id="saveButtonText">💾 Save Profile</span>
                  <span id="saveLoader" class="hidden">
                    <svg class="animate-spin inline-block w-5 h-5 mr-2" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="none" stroke-dasharray="60 40" />
                    </svg>
                    Saving...
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Profile Stats */}
          <div class="mt-12 grid md:grid-cols-3 gap-6">
            <div class="scribble-card p-6 text-center">
              <div class="text-3xl mb-2">💬</div>
              <h4 class="font-sketch text-lg font-bold">{user.totalConversations || 0}</h4>
              <p class="font-handwritten text-sm">Total Conversations</p>
            </div>
            
            <div class="scribble-card p-6 text-center">
              <div class="text-3xl mb-2">⭐</div>
              <h4 class="font-sketch text-lg font-bold">{user.averageRating || 0}/5</h4>
              <p class="font-handwritten text-sm">Average Rating</p>
            </div>
            
            <div class="scribble-card p-6 text-center">
              <div class="text-3xl mb-2">📅</div>
              <h4 class="font-sketch text-lg font-bold">
                {new Date(user.createdAt).toLocaleDateString()}
              </h4>
              <p class="font-handwritten text-sm">Member Since</p>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        document.getElementById('profileForm').addEventListener('submit', async function(e) {
          e.preventDefault()
          
          const token = localStorage.getItem('auth-token')
          if (!token) {
            window.location.href = '/login'
            return
          }
          
          setLoading(true)
          
          try {
            const formData = new FormData(this)
            
            // Prepare data
            const data = {
              name: formData.get('name'),
              bio: formData.get('bio'),
              university: formData.get('university'),
              major: formData.get('major'),
              graduationYear: formData.get('graduationYear') ? parseInt(formData.get('graduationYear')) : undefined,
              company: formData.get('company'),
              position: formData.get('position'),
              industry: formData.get('industry'),
              experienceYears: formData.get('experienceYears') ? parseInt(formData.get('experienceYears')) : undefined,
              linkedinUrl: formData.get('linkedinUrl'),
              websiteUrl: formData.get('websiteUrl'),
              timezone: formData.get('timezone'),
              languages: formData.get('languages') ? formData.get('languages').split(',').map(l => l.trim()).filter(l => l) : []
            }
            
            // Remove undefined values
            Object.keys(data).forEach(key => {
              if (data[key] === undefined || data[key] === '') {
                delete data[key]
              }
            })
            
            const response = await fetch('/api/profile', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify(data)
            })
            
            const result = await response.json()
            
            if (response.ok && result.success) {
              // Update stored user info
              localStorage.setItem('user', JSON.stringify(result.user))
              
              showMessage('Profile updated successfully! 🎉', 'success')
              
              // Redirect to dashboard after delay
              setTimeout(() => {
                window.location.href = '/dashboard'
              }, 2000)
            } else {
              if (result.issues) {
                showMessage(result.issues.map(issue => issue.message).join(', '), 'error')
              } else {
                showMessage(result.error || 'Profile update failed', 'error')
              }
            }
          } catch (error) {
            console.error('Profile update error:', error)
            showMessage('Network error. Please try again.', 'error')
          } finally {
            setLoading(false)
          }
        })
        
        function showMessage(message, type) {
          const container = document.getElementById('messageContainer')
          const bgColor = type === 'success' ? 'bg-green-100 border-green-400' : 'bg-red-100 border-red-400'
          const textColor = type === 'success' ? 'text-green-700' : 'text-red-700'
          
          container.innerHTML = 
            '<div class="p-3 ' + bgColor + ' border-2 border-dashed rounded-lg">' +
            '<p class="font-handwritten ' + textColor + ' text-sm">' + message + '</p>' +
            '</div>'
          
          // Auto-hide after 5 seconds
          setTimeout(() => {
            container.innerHTML = ''
          }, 5000)
        }
        
        function setLoading(loading) {
          const button = document.getElementById('saveButton')
          const buttonText = document.getElementById('saveButtonText')
          const loader = document.getElementById('saveLoader')
          
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
        
        async function logout() {
          const token = localStorage.getItem('auth-token')
          
          if (token) {
            try {
              await fetch('/api/auth/logout', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer ' + token }
              })
            } catch (error) {
              console.error('Logout error:', error)
            }
          }
          
          localStorage.removeItem('auth-token')
          localStorage.removeItem('user')
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
          
          window.location.href = '/login'
        }
        `
      }} />
    </div>
  )
}