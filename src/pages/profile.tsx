interface ProfilePageProps {
  user: any
}

export function ProfilePage({ user }: ProfilePageProps) {
  return (
    <div class="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div class="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" class="text-xl font-bold text-gray-900 hover:no-underline">
            Mentor<span class="text-indigo-600">Match</span>
          </a>
          <div class="flex items-center gap-3">
            <a href="/dashboard" class="px-4 py-2 text-sm font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors hover:no-underline">
              ← Dashboard
            </a>
            <button onclick="logout()" class="px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
              Sign out
            </button>
          </div>
        </div>
      </nav>

      <div class="max-w-3xl mx-auto px-6 py-10">

        {/* Profile header card */}
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6 flex items-center gap-5">
          <div class={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold text-white flex-shrink-0 ${user.role === 'student' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
            {(user.name || 'U').charAt(0).toUpperCase()}
          </div>
          <div class="flex-1 min-w-0">
            <h1 class="text-xl font-bold text-gray-900 truncate">{user.name}</h1>
            <p class="text-sm text-gray-500">{user.email}</p>
            <div class="flex items-center gap-2 mt-1">
              <span class={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${user.role === 'student' ? 'bg-indigo-100 text-indigo-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {user.role === 'student' ? 'Student' : 'Mentor'}
              </span>
              <span class={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${user.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {user.verificationStatus === 'verified' ? '✓ Verified' : '⏳ Pending'}
              </span>
            </div>
          </div>
          <div class="hidden sm:flex gap-6 text-center flex-shrink-0">
            <div>
              <div class="text-xl font-bold text-gray-900">{user.totalConversations || 0}</div>
              <div class="text-xs text-gray-500">Sessions</div>
            </div>
            <div>
              <div class="text-xl font-bold text-gray-900">{user.averageRating ? Number(user.averageRating).toFixed(1) : '—'}</div>
              <div class="text-xs text-gray-500">Rating</div>
            </div>
            <div>
              <div class="text-xl font-bold text-gray-900">{new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</div>
              <div class="text-xs text-gray-500">Joined</div>
            </div>
          </div>
        </div>

        {/* Message container */}
        <div id="messageContainer" class="mb-4"></div>

        {/* Form card */}
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6">
          <form id="profileForm" class="space-y-8">

            {/* Basic Info */}
            <div>
              <h2 class="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Basic Information</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="name">Full Name <span class="text-red-500">*</span></label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={user.name}
                    required
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    value={user.email}
                    disabled
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
                  />
                  <p class="text-xs text-gray-400 mt-1">Email cannot be changed.</p>
                </div>
              </div>
              <div class="mt-4">
                <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  rows={4}
                  placeholder="Tell others about yourself, your interests, and goals..."
                  class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none transition-all"
                >{user.bio || ''}</textarea>
              </div>
            </div>

            {/* Student fields */}
            {user.role === 'student' && (
              <div>
                <h2 class="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Student Information</h2>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="university">University / School</label>
                    <input
                      type="text"
                      id="university"
                      name="university"
                      value={user.university || ''}
                      placeholder="e.g., Stanford University"
                      class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="major">Major / Field of Study</label>
                    <input
                      type="text"
                      id="major"
                      name="major"
                      value={user.major || ''}
                      placeholder="e.g., Computer Science"
                      class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div class="mt-4 sm:w-1/2">
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="graduationYear">Expected Graduation Year</label>
                  <input
                    type="number"
                    id="graduationYear"
                    name="graduationYear"
                    value={user.graduationYear || ''}
                    min="2024"
                    max="2035"
                    placeholder="e.g., 2027"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            )}

            {/* Mentor fields */}
            {user.role === 'mentor' && (
              <div>
                <h2 class="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Professional Information</h2>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="company">Company <span class="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={user.company || ''}
                      required
                      placeholder="e.g., Acme Corp"
                      class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="position">Position <span class="text-red-500">*</span></label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      value={user.position || ''}
                      required
                      placeholder="e.g., CEO, Director, Engineer"
                      class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
                <div class="grid sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="industry">Industry</label>
                    <select
                      id="industry"
                      name="industry"
                      class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
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
                    <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="experienceYears">Years of Experience</label>
                    <input
                      type="number"
                      id="experienceYears"
                      name="experienceYears"
                      value={user.experienceYears || ''}
                      min="0"
                      max="60"
                      placeholder="e.g., 15"
                      class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Social Links */}
            <div>
              <h2 class="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Social Links</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="linkedinUrl">LinkedIn Profile</label>
                  <input
                    type="url"
                    id="linkedinUrl"
                    name="linkedinUrl"
                    value={user.linkedinUrl || ''}
                    placeholder="https://linkedin.com/in/yourprofile"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="websiteUrl">Website / Portfolio</label>
                  <input
                    type="url"
                    id="websiteUrl"
                    name="websiteUrl"
                    value={user.websiteUrl || ''}
                    placeholder="https://yourwebsite.com"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div>
              <h2 class="text-base font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">Preferences</h2>
              <div class="grid sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="timezone">Timezone</label>
                  <select
                    id="timezone"
                    name="timezone"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all bg-white"
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
                  <label class="block text-sm font-semibold text-gray-700 mb-1.5" for="languages">Languages Spoken</label>
                  <input
                    type="text"
                    id="languages"
                    name="languages"
                    value={user.languages ? user.languages.join(', ') : ''}
                    placeholder="e.g., English, Spanish"
                    class="w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  />
                  <p class="text-xs text-gray-400 mt-1">Separate with commas</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div class="flex items-center justify-end gap-3 pt-2 border-t border-gray-100">
              <button
                type="button"
                onclick="window.location.href='/dashboard'"
                class="px-5 py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="saveButton"
                class="px-6 py-2.5 text-sm font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2"
              >
                <span id="saveButtonText">Save Changes</span>
                <span id="saveLoader" class="hidden">
                  <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Saving...
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        document.getElementById('profileForm').addEventListener('submit', async function(e) {
          e.preventDefault()

          const token = localStorage.getItem('auth-token')
          if (!token) { window.location.href = '/login'; return }

          setLoading(true)

          try {
            const formData = new FormData(this)
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
            Object.keys(data).forEach(key => {
              if (data[key] === undefined || data[key] === '') delete data[key]
            })

            const response = await fetch('/api/profile', {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify(data)
            })
            const result = await response.json()

            if (response.ok && result.success) {
              localStorage.setItem('user', JSON.stringify(result.user))
              showMessage('Profile updated successfully!', 'success')
              setTimeout(() => { window.location.href = '/dashboard' }, 1800)
            } else {
              const msg = result.issues ? result.issues.map(i => i.message).join(', ') : (result.error || 'Update failed')
              showMessage(msg, 'error')
            }
          } catch (err) {
            showMessage('Network error. Please try again.', 'error')
          } finally {
            setLoading(false)
          }
        })

        function showMessage(message, type) {
          const container = document.getElementById('messageContainer')
          const isSuccess = type === 'success'
          container.innerHTML =
            '<div class="flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ' +
            (isSuccess ? 'bg-green-50 border border-green-200 text-green-700' : 'bg-red-50 border border-red-200 text-red-700') + '">' +
            '<span>' + (isSuccess ? '✓' : '✕') + '</span><span>' + message + '</span></div>'
          setTimeout(() => { container.innerHTML = '' }, 5000)
        }

        function setLoading(loading) {
          const btn = document.getElementById('saveButton')
          const txt = document.getElementById('saveButtonText')
          const ldr = document.getElementById('saveLoader')
          btn.disabled = loading
          txt.classList.toggle('hidden', loading)
          ldr.classList.toggle('hidden', !loading)
        }

        async function logout() {
          const token = localStorage.getItem('auth-token')
          if (token) {
            try { await fetch('/api/auth/logout', { method: 'POST', headers: { 'Authorization': 'Bearer ' + token } }) } catch(e) {}
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
