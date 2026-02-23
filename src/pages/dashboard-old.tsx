interface DashboardPageProps {
  user: any
}

export function DashboardPage({ user }: DashboardPageProps) {
  return (
    <div class="min-h-screen bg-white relative overflow-hidden">
      {/* Hand-drawn background elements */}
      <div class="absolute inset-0 pointer-events-none">
        <svg class="absolute top-20 left-20 w-40 h-40 opacity-10" viewBox="0 0 100 100">
          <path d="M20,20 L80,20 L80,80 L20,80 Z" stroke="black" stroke-width="2" fill="none" class="animate-pulse" transform="rotate(15)" />
        </svg>
        <svg class="absolute bottom-20 right-20 w-32 h-32 opacity-10" viewBox="0 0 100 100">
          <path d="M10,90 Q50,10 90,90" stroke="black" stroke-width="2" fill="none" class="animate-bounce-slow" />
        </svg>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <header class="flex justify-between items-center mb-12">
          <div class="scribble-border p-3 hover:rotate-1 transition-transform">
            <h1 class="text-3xl font-bold font-sketch">MentorMatch</h1>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-right">
              <p class="font-handwritten text-lg">Welcome back,</p>
              <p class="font-sketch text-xl font-bold">{user.name}</p>
            </div>
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-2xl">
              {user.role === 'student' ? '🎓' : '👑'}
            </div>
            <div class="flex flex-col space-y-2">
              <a href="/profile" class="scribble-button px-4 py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300">
                Profile
              </a>
              <button onclick="logout()" class="scribble-button px-4 py-2 font-sketch text-sm bg-red-200 hover:bg-red-300">
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Welcome Section */}
        <div class="text-center mb-16">
          <div class="scribble-border-large inline-block p-6">
            <h2 class="text-4xl md:text-5xl font-bold font-sketch mb-4 transform rotate-1">
              Ready for your next conversation? 💫
            </h2>
            <p class="text-xl font-handwritten max-w-2xl mx-auto">
              {user.role === 'student' 
                ? 'Connect with experienced leaders who can guide your journey' 
                : 'Share your wisdom with the next generation of changemakers'}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div class="scribble-card p-6 text-center transform hover:rotate-1 transition-transform">
            <div class="text-4xl mb-4">💬</div>
            <h3 class="text-2xl font-bold font-sketch mb-2">{user.totalConversations || 0}</h3>
            <p class="font-handwritten">Total Conversations</p>
          </div>
          
          <div class="scribble-card p-6 text-center transform hover:-rotate-1 transition-transform">
            <div class="text-4xl mb-4">⭐</div>
            <h3 class="text-2xl font-bold font-sketch mb-2">{user.averageRating || 0}/5</h3>
            <p class="font-handwritten">Average Rating</p>
          </div>
          
          <div class="scribble-card p-6 text-center transform hover:rotate-1 transition-transform">
            <div class="text-4xl mb-4">🏆</div>
            <h3 class="text-2xl font-bold font-sketch mb-2">
              {user.verificationStatus === 'verified' ? 'Verified' : 'Pending'}
            </h3>
            <p class="font-handwritten">Profile Status</p>
          </div>
        </div>

        {/* Main Action - Start Conversation */}
        <div class="text-center mb-16">
          <div class="scribble-border-large inline-block p-8 bg-gray-50">
            <h3 class="text-3xl font-bold font-sketch mb-6 transform -rotate-1">
              🎯 Find Your Perfect Match
            </h3>
            <p class="text-lg font-handwritten mb-8 max-w-xl mx-auto">
              Join the queue and get matched with someone who complements your goals and interests
            </p>
            
            <div id="matchingControls">
              {/* Matching Preferences */}
              <div class="mb-6 space-y-4" id="preferencesSection">
                {user.role === 'student' && (
                  <>
                    <div>
                      <label class="block font-sketch mb-2">Preferred Industry</label>
                      <select id="industryPreference" class="p-2 border-2 border-black border-dashed rounded font-handwritten">
                        <option value="">Any Industry</option>
                        <option value="technology">Technology</option>
                        <option value="finance">Finance</option>
                        <option value="healthcare">Healthcare</option>
                        <option value="education">Education</option>
                        <option value="consulting">Consulting</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-sketch mb-2">Minimum Experience</label>
                      <select id="experiencePreference" class="p-2 border-2 border-black border-dashed rounded font-handwritten">
                        <option value="0">Any Experience</option>
                        <option value="5">5+ Years</option>
                        <option value="10">10+ Years</option>
                        <option value="15">15+ Years</option>
                      </select>
                    </div>
                  </>
                )}
                
                {user.role === 'ceo' && (
                  <div>
                    <label class="block font-sketch mb-2">Student Level Preference</label>
                    <select id="levelPreference" class="p-2 border-2 border-black border-dashed rounded font-handwritten">
                      <option value="">Any Level</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="recent_grad">Recent Graduate</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Queue Status */}
              <div id="queueStatus" class="hidden mb-6">
                <div class="scribble-card p-4 bg-yellow-50">
                  <div class="flex items-center justify-center space-x-3">
                    <svg class="animate-spin w-6 h-6" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="black" stroke-width="4" fill="none" stroke-dasharray="60 40" />
                    </svg>
                    <span class="font-handwritten">
                      <span id="queueStatusText">Searching for your perfect match...</span>
                    </span>
                  </div>
                  <p class="font-handwritten text-sm text-center mt-2">
                    Position in queue: <span id="queuePosition">-</span>
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <button 
                id="startMatchingBtn"
                onclick="startMatching()" 
                class="scribble-button text-2xl md:text-3xl font-bold font-sketch px-12 py-6 transform hover:scale-105 hover:rotate-1 transition-all duration-300 bg-blue-200 hover:bg-blue-300"
              >
                🚀 Start Matching
              </button>

              <button 
                id="stopMatchingBtn"
                onclick="stopMatching()" 
                class="hidden scribble-button text-xl font-bold font-sketch px-8 py-4 transform hover:scale-105 hover:rotate-1 transition-all duration-300 bg-red-200 hover:bg-red-300"
              >
                ❌ Cancel Search
              </button>
            </div>
          </div>
        </div>

        {/* Recent Conversations */}
        <div class="mb-16" id="conversationHistory">
          <h3 class="text-2xl font-bold font-sketch mb-6 text-center transform -rotate-1">
            📚 Your Recent Conversations
          </h3>
          
          <div id="conversationsList" class="space-y-4">
            <div class="text-center py-8">
              <p class="font-handwritten text-gray-600">Loading your conversation history...</p>
            </div>
          </div>
          
          <div class="text-center mt-6">
            <a href="#" onclick="loadMoreConversations()" class="scribble-button px-6 py-3 font-sketch bg-gray-200 hover:bg-gray-300">
              Load More
            </a>
          </div>
        </div>

        {/* Quick Actions */}
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <a href="/profile" class="scribble-card p-6 text-center hover:rotate-1 transition-transform">
            <div class="text-3xl mb-3">👤</div>
            <h4 class="font-sketch text-lg">Edit Profile</h4>
            <p class="font-handwritten text-sm">Update your information</p>
          </a>
          
          <button onclick="viewAchievements()" class="scribble-card p-6 text-center hover:-rotate-1 transition-transform">
            <div class="text-3xl mb-3">🏆</div>
            <h4 class="font-sketch text-lg">Achievements</h4>
            <p class="font-handwritten text-sm">View your milestones</p>
          </button>
          
          <a href="/about" class="scribble-card p-6 text-center hover:rotate-1 transition-transform">
            <div class="text-3xl mb-3">❓</div>
            <h4 class="font-sketch text-lg">Help & FAQ</h4>
            <p class="font-handwritten text-sm">Get support</p>
          </a>
          
          <button onclick="shareProfile()" class="scribble-card p-6 text-center hover:-rotate-1 transition-transform">
            <div class="text-3xl mb-3">📤</div>
            <h4 class="font-sketch text-lg">Invite Friends</h4>
            <p class="font-handwritten text-sm">Spread the word</p>
          </button>
        </div>
      </div>

      {/* Match Found Modal */}
      <div id="matchFoundModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
        <div class="bg-white max-w-md mx-4 relative">
          <div class="scribble-border-large p-8 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold font-sketch mb-4 transform -rotate-1">
              Perfect Match Found!
            </h3>
            <div id="matchDetails" class="mb-6">
              {/* Match details will be populated by JavaScript */}
            </div>
            <div class="flex space-x-4">
              <button onclick="joinConversation()" class="scribble-button px-6 py-3 font-sketch bg-green-200 hover:bg-green-300">
                Join Now
              </button>
              <button onclick="declineMatch()" class="scribble-button px-6 py-3 font-sketch bg-gray-200 hover:bg-gray-300">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        let matchingSocket = null
        let currentMatch = null
        
        // Initialize dashboard
        document.addEventListener('DOMContentLoaded', async function() {
          loadConversationHistory()
          
          // Check for existing auth token
          const token = localStorage.getItem('auth-token')
          if (!token) {
            window.location.href = '/login'
            return
          }
          
          // Verify token is still valid
          try {
            const response = await fetch('/api/auth/me', {
              headers: { 'Authorization': 'Bearer ' + token }
            })
            
            if (!response.ok) {
              localStorage.removeItem('auth-token')
              localStorage.removeItem('user')
              window.location.href = '/login'
              return
            }
          } catch (error) {
            console.error('Auth check failed:', error)
          }
        })
        
        async function startMatching() {
          const token = localStorage.getItem('auth-token')
          
          if (!token) {
            window.location.href = '/login'
            return
          }
          
          try {
            // Get preferences
            const preferences = {}
            const industryPref = document.getElementById('industryPreference')
            const experiencePref = document.getElementById('experiencePreference')
            const levelPref = document.getElementById('levelPreference')
            
            if (industryPref && industryPref.value) {
              preferences.industry = industryPref.value
            }
            if (experiencePref && experiencePref.value) {
              preferences.minExperience = parseInt(experiencePref.value)
            }
            if (levelPref && levelPref.value) {
              preferences.studentLevel = levelPref.value
            }
            
            // Join matching queue
            const response = await fetch('/api/matching/join', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({ preferences })
            })
            
            const result = await response.json()
            
            if (result.status === 'matched') {
              // Instant match found
              showMatchFound(result.match)
            } else if (result.status === 'queued') {
              // Added to queue, show waiting UI
              showQueueStatus(result.position)
              connectToMatchingSocket()
            }
            
          } catch (error) {
            console.error('Matching error:', error)
            alert('Failed to start matching. Please try again.')
          }
        }
        
        async function stopMatching() {
          const token = localStorage.getItem('auth-token')
          
          try {
            await fetch('/api/matching/leave', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              }
            })
            
            hideQueueStatus()
            
            if (matchingSocket) {
              matchingSocket.close()
              matchingSocket = null
            }
            
          } catch (error) {
            console.error('Stop matching error:', error)
          }
        }
        
        function connectToMatchingSocket() {
          try {
            const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
            matchingSocket = new WebSocket(protocol + '//' + location.host + '/ws/matching')
            
            matchingSocket.onopen = function() {
              console.log('Connected to matching queue')
              const user = JSON.parse(localStorage.getItem('user') || '{}')
              matchingSocket.send(JSON.stringify({
                type: 'register',
                userId: user.id
              }))
            }
            
            matchingSocket.onmessage = function(event) {
              const message = JSON.parse(event.data)
              
              if (message.type === 'match-found') {
                currentMatch = message.match
                showMatchFound(message.match)
                hideQueueStatus()
              }
            }
            
            matchingSocket.onclose = function() {
              console.log('Disconnected from matching queue')
              matchingSocket = null
            }
            
          } catch (error) {
            console.error('WebSocket error:', error)
          }
        }
        
        function showQueueStatus(position) {
          document.getElementById('startMatchingBtn').classList.add('hidden')
          document.getElementById('stopMatchingBtn').classList.remove('hidden')
          document.getElementById('queueStatus').classList.remove('hidden')
          document.getElementById('queuePosition').textContent = position || '...'
        }
        
        function hideQueueStatus() {
          document.getElementById('startMatchingBtn').classList.remove('hidden')
          document.getElementById('stopMatchingBtn').classList.add('hidden')
          document.getElementById('queueStatus').classList.add('hidden')
        }
        
        function showMatchFound(match) {
          currentMatch = match
          
          const user = JSON.parse(localStorage.getItem('user') || '{}')
          const partner = user.role === 'student' ? match.ceo : match.student
          
          document.getElementById('matchDetails').innerHTML = 
            '<p class="font-handwritten text-lg mb-2">You\\'ve been matched with:</p>' +
            '<h4 class="font-sketch text-xl font-bold">' + partner.userName + '</h4>' +
            '<p class="font-handwritten text-sm text-gray-600">Ready to start your conversation?</p>'
          
          document.getElementById('matchFoundModal').classList.remove('hidden')
        }
        
        async function joinConversation() {
          if (!currentMatch) return
          
          const token = localStorage.getItem('auth-token')
          
          try {
            // Create conversation record
            const response = await fetch('/api/conversations/start', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
              },
              body: JSON.stringify({
                partnerId: currentMatch.student.userId === JSON.parse(localStorage.getItem('user')).id 
                  ? currentMatch.ceo.userId 
                  : currentMatch.student.userId,
                roomId: currentMatch.roomId
              })
            })
            
            const result = await response.json()
            
            if (result.success) {
              // Navigate to video call
              window.location.href = '/video-call/' + currentMatch.roomId
            }
            
          } catch (error) {
            console.error('Join conversation error:', error)
            alert('Failed to join conversation. Please try again.')
          }
        }
        
        function declineMatch() {
          document.getElementById('matchFoundModal').classList.add('hidden')
          currentMatch = null
          // Could restart matching automatically or show option to search again
        }
        
        async function loadConversationHistory() {
          const token = localStorage.getItem('auth-token')
          
          try {
            const response = await fetch('/api/conversations?limit=5', {
              headers: { 'Authorization': 'Bearer ' + token }
            })
            
            const data = await response.json()
            const conversations = data.conversations || []
            
            const container = document.getElementById('conversationsList')
            
            if (conversations.length === 0) {
              container.innerHTML = 
                '<div class="text-center py-8">' +
                '<p class="font-handwritten text-gray-600">No conversations yet. Start your first one above!</p>' +
                '</div>'
              return
            }
            
            container.innerHTML = conversations.map(conv => {
              const user = JSON.parse(localStorage.getItem('user') || '{}')
              const isStudent = user.role === 'student'
              const partnerName = isStudent ? conv.ceo_name : conv.student_name
              const partnerInfo = isStudent 
                ? (conv.company ? conv.company : 'CEO') + (conv.position ? ' - ' + conv.position : '')
                : (conv.university ? conv.university : 'Student') + (conv.major ? ' - ' + conv.major : '')
              
              const duration = conv.duration_seconds 
                ? Math.floor(conv.duration_seconds / 60) + ' min'
                : 'In progress'
              
              const rating = isStudent ? conv.rating_student : conv.rating_ceo
              const ratingStars = rating ? '⭐'.repeat(rating) : 'Not rated'
              
              return 
                '<div class="scribble-card p-4">' +
                '<div class="flex justify-between items-start">' +
                '<div class="flex-1">' +
                '<h4 class="font-sketch text-lg font-bold">' + partnerName + '</h4>' +
                '<p class="font-handwritten text-sm text-gray-600">' + partnerInfo + '</p>' +
                '<p class="font-handwritten text-xs text-gray-500 mt-1">Duration: ' + duration + '</p>' +
                '</div>' +
                '<div class="text-right">' +
                '<p class="font-handwritten text-sm">' + ratingStars + '</p>' +
                '<p class="font-handwritten text-xs text-gray-500">' + 
                  new Date(conv.started_at).toLocaleDateString() + '</p>' +
                '</div>' +
                '</div>' +
                '</div>'
            }).join('')
            
          } catch (error) {
            console.error('Load conversations error:', error)
          }
        }
        
        function loadMoreConversations() {
          // TODO: Implement pagination
          alert('Load more conversations - Coming soon!')
        }
        
        function viewAchievements() {
          alert('Achievements system - Coming soon!')
        }
        
        function shareProfile() {
          if (navigator.share) {
            navigator.share({
              title: 'MentorMatch - Meaningful Conversations',
              text: 'Join me on MentorMatch for inspiring conversations!',
              url: window.location.origin
            })
          } else {
            // Fallback for browsers without Web Share API
            const url = window.location.origin
            navigator.clipboard.writeText(url).then(() => {
              alert('MentorMatch link copied to clipboard!')
            })
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