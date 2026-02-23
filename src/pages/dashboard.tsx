interface DashboardPageProps {
  user: any
}

export function DashboardPage({ user }: DashboardPageProps) {
  return (
    <div class="min-h-screen bg-gray-50">
      {/* ── Navigation ── */}
      <nav class="border-b-2 border-black border-dashed bg-white px-4 py-3 sticky top-0 z-40">
        <div class="container mx-auto flex justify-between items-center">
          <div class="flex items-center space-x-6">
            <a href="/" class="scribble-border p-2 hover:rotate-1 transition-transform">
              <span class="text-xl font-bold font-sketch">MentorMatch</span>
            </a>
            <nav class="hidden md:flex space-x-1">
              <button onclick="switchSection('overview')" class="nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors" data-section="overview">
                📊 Overview
              </button>
              <button onclick="switchSection('find-mentors')" class="nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors" data-section="find-mentors">
                🔍 Find Mentors
              </button>
              <button onclick="switchSection('messages')" class="nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors relative" data-section="messages">
                💬 Messages
                <span id="inboxBadge" class="hidden absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">!</span>
              </button>
              <button onclick="switchSection('my-calls')" class="nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors" data-section="my-calls">
                📹 My Calls
              </button>
              <button onclick="switchSection('profile')" class="nav-btn font-handwritten px-3 py-1.5 rounded hover:bg-gray-100 transition-colors" data-section="profile">
                👤 Profile
              </button>
            </nav>
          </div>

          <div class="flex items-center space-x-3">
            <div class="text-right hidden md:block">
              <p class="font-handwritten text-xs text-gray-500">Welcome back,</p>
              <p class="font-sketch font-bold text-sm">{user.name}</p>
              <span class="text-xs bg-blue-100 px-2 py-0.5 rounded font-handwritten">
                {user.role === 'student' ? '🎓 Student' : '👑 Mentor'}
              </span>
            </div>
            <div class="w-9 h-9 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user.name?.charAt(0)?.toUpperCase() || '?'}
            </div>
            <div class="relative">
              <button onclick="toggleDropdown()" class="scribble-button px-2 py-1 font-sketch text-sm bg-gray-100 hover:bg-gray-200">⋮</button>
              <div id="userDropdown" class="hidden absolute right-0 mt-2 w-48 bg-white border-2 border-black border-dashed shadow-lg z-50 rounded">
                <a href="/profile" class="block px-4 py-2 font-handwritten hover:bg-gray-100 text-sm">Edit Profile</a>
                <button onclick="logout()" class="block w-full text-left px-4 py-2 font-handwritten hover:bg-gray-100 text-red-600 text-sm">Logout</button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile nav */}
        <div class="md:hidden mt-3 flex space-x-1 overflow-x-auto pb-1">
          {[['overview','📊','Overview'],['find-mentors','🔍','Find'],['messages','💬','Messages'],['my-calls','📹','Calls'],['profile','👤','Profile']].map(([s,e,l]) =>
            <button onclick={`switchSection('${s}')`} class="nav-btn whitespace-nowrap px-3 py-1.5 scribble-button font-sketch text-xs" data-section={s}>
              {e} {l}
            </button>
          )}
        </div>
      </nav>

      {/* ── Main Content ── */}
      <div class="container mx-auto px-4 py-6 max-w-6xl">

        {/* ════════════ OVERVIEW ════════════ */}
        <div id="overview-section" class="dashboard-section">
          <div class="text-center mb-8">
            <div class="scribble-border-large inline-block p-6 bg-white">
              <h1 class="text-3xl font-bold font-sketch mb-2 transform rotate-1">
                {user.role === 'student' ? '🎓 Student Dashboard' : '👑 Mentor Dashboard'}
              </h1>
              <p class="font-handwritten text-gray-600">
                {user.role === 'student'
                  ? 'Find your perfect mentor and start building your future today.'
                  : 'Empower the next generation — check your messages and sessions.'}
              </p>
            </div>
          </div>

          {/* Stats */}
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              {icon:'💬', val: user.totalConversations || 0, label:'Sessions'},
              {icon:'⭐', val: (user.averageRating || 0) + '/5', label:'Avg Rating'},
              {icon:'🏆', val: user.verificationStatus === 'verified' ? 'Verified' : user.verificationStatus === 'approved' ? 'Approved' : 'Pending', label:'Status'},
              {icon:'🎯', val:'∞', label:'Mentors Available'},
            ].map(s =>
              <div class="scribble-card p-4 text-center bg-white hover:shadow-md transition-shadow">
                <div class="text-2xl mb-1">{s.icon}</div>
                <h3 class="text-xl font-bold font-sketch">{s.val}</h3>
                <p class="font-handwritten text-xs text-gray-500">{s.label}</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div class="bg-white scribble-border-large p-6 mb-8">
            <h2 class="text-2xl font-bold font-sketch mb-4 text-center">🚀 Quick Start</h2>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <button onclick="switchSection('find-mentors')" class="scribble-button px-6 py-3 font-sketch bg-blue-200 hover:bg-blue-300 transition-colors">
                🔍 Browse Mentors
              </button>
              <button onclick="switchSection('messages')" class="scribble-button px-6 py-3 font-sketch bg-green-200 hover:bg-green-300 transition-colors">
                💬 My Messages
              </button>
              <button onclick="switchSection('my-calls')" class="scribble-button px-6 py-3 font-sketch bg-purple-200 hover:bg-purple-300 transition-colors">
                📹 View Calls
              </button>
            </div>
          </div>

          {/* Banner */}
          <div class="mb-8 max-w-4xl mx-auto">
            <div class="scribble-border-large overflow-hidden">
              <img src="https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=900&q=80"
                   alt="Career mentorship session" class="w-full h-44 object-cover" />
            </div>
          </div>

          <div>
            <h2 class="text-xl font-bold font-sketch mb-4 text-center">📚 Recent Activity</h2>
            <div id="recentActivity" class="space-y-3">
              <div class="scribble-card p-4 bg-yellow-50"><p class="font-handwritten text-sm">Loading activity...</p></div>
            </div>
          </div>
        </div>

        {/* ════════════ FIND MENTORS ════════════ */}
        <div id="find-mentors-section" class="dashboard-section hidden">
          <div class="text-center mb-6">
            <div class="scribble-border-large inline-block p-4 bg-white">
              <h1 class="text-2xl font-bold font-sketch transform -rotate-1">🤖 AI Mentor Matching</h1>
              <p class="font-handwritten text-gray-500 text-sm mt-1">Ranked by compatibility · Click any card to view full profile</p>
            </div>
          </div>

          {/* Search & Filter bar */}
          <div class="bg-white scribble-card p-4 mb-6 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div class="relative flex-1">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
              <input id="mentorSearch" type="text" placeholder="Search by name, field, or topic..."
                class="w-full pl-9 pr-4 py-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                oninput="filterMentors()" />
            </div>
            <div class="flex gap-2 flex-wrap">
              <select id="filterVerified" onchange="filterMentors()"
                class="px-3 py-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none bg-white">
                <option value="">All Mentors</option>
                <option value="verified">✅ Verified Only</option>
                <option value="approved">🔵 Approved Only</option>
              </select>
              <select id="filterField" onchange="filterMentors()"
                class="px-3 py-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none bg-white">
                <option value="">All Fields</option>
                <option value="technology">Technology</option>
                <option value="medicine">Medicine</option>
                <option value="business">Business</option>
                <option value="law">Law</option>
                <option value="engineering">Engineering</option>
                <option value="education">Education</option>
                <option value="sports">Sports</option>
                <option value="media">Media</option>
                <option value="science">Science</option>
              </select>
              <button onclick="clearFilters()" class="scribble-button px-3 py-2 font-sketch text-xs bg-gray-100 hover:bg-gray-200">✕ Clear</button>
            </div>
          </div>

          {/* Tag pills for quick filtering */}
          <div class="flex flex-wrap gap-2 mb-6" id="tagFilters">
            {['STEM','Business','Healthcare','Law','Sports','Creative','Engineering','Education','Media'].map(tag =>
              <button onclick={`filterByTag('${tag}')`}
                class="tag-pill scribble-button px-3 py-1 font-handwritten text-xs bg-white hover:bg-blue-100 border border-gray-300 rounded-full transition-colors">
                {tag}
              </button>
            )}
          </div>

          {/* Loading */}
          <div id="matchingLoader" class="text-center py-16">
            <svg class="animate-spin w-10 h-10 mx-auto mb-3" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="black" stroke-width="6" fill="none" stroke-dasharray="60 40" />
            </svg>
            <p class="font-handwritten text-gray-500">Calculating your matches...</p>
          </div>

          {/* No mentors */}
          <div id="noMentorsMsg" class="hidden text-center py-12">
            <div class="scribble-card p-8 bg-yellow-50 max-w-md mx-auto">
              <div class="text-5xl mb-3">🔍</div>
              <h3 class="font-sketch text-lg mb-2">No Mentors Found</h3>
              <p class="font-handwritten text-gray-500 text-sm">Try clearing your filters or check back soon.</p>
            </div>
          </div>

          {/* Primary matches */}
          <div id="primaryMatches" class="hidden">
            <div id="mentorGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8"></div>
          </div>

          {/* See More */}
          <div id="seeMoreWrap" class="hidden text-center mb-4">
            <button onclick="toggleExtended()" id="seeMoreBtn"
              class="scribble-button px-6 py-2 font-sketch text-sm bg-gray-100 hover:bg-gray-200">
              👇 See More Options
            </button>
            <p class="font-handwritten text-xs text-gray-400 mt-1">50–69% compatibility mentors</p>
          </div>
          <div id="extendedMatches" class="hidden">
            <div class="scribble-card p-3 bg-gray-50 mb-4 text-center">
              <p class="font-handwritten text-xs text-gray-500">These mentors are a partial match and can still offer valuable guidance.</p>
            </div>
            <div id="extendedGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
          </div>
        </div>

        {/* ════════════ MESSAGES ════════════ */}
        <div id="messages-section" class="dashboard-section hidden">
          <div class="text-center mb-6">
            <div class="scribble-border-large inline-block p-4 bg-white">
              <h1 class="text-2xl font-bold font-sketch transform rotate-1">💬 Messages</h1>
              <p class="font-handwritten text-gray-500 text-sm mt-1">Safe, in-platform messaging · Schedule sessions after connecting</p>
            </div>
          </div>

          {/* Safety banner */}
          <div class="bg-amber-50 border-2 border-amber-300 border-dashed rounded p-3 mb-5 text-sm font-handwritten text-amber-800 flex items-start gap-2">
            <span class="text-lg flex-shrink-0">⚠️</span>
            <span>Sharing personal contact information outside MentorMatch is at your own risk. MentorMatch is not liable for off-platform interactions. Use the in-platform reporting system if you experience any issues.</span>
          </div>

          <div class="flex gap-4 h-[600px]">
            {/* Sidebar: Conversations list */}
            <div class="w-72 flex-shrink-0 flex flex-col bg-white scribble-card overflow-hidden">
              <div class="p-3 border-b border-dashed border-gray-200">
                <p class="font-sketch text-sm font-bold">Conversations</p>
                <input id="inboxSearch" type="text" placeholder="Search conversations..."
                  class="mt-2 w-full px-2 py-1.5 border-2 border-black border-dashed rounded font-handwritten text-xs focus:outline-none focus:border-solid"
                  oninput="filterInbox()" />
              </div>
              <div id="conversationList" class="flex-1 overflow-y-auto">
                <div class="p-4 text-center text-gray-400 font-handwritten text-sm">Loading conversations...</div>
              </div>
              <div class="p-3 border-t border-dashed border-gray-200">
                <button onclick="switchSection('find-mentors')"
                  class="w-full scribble-button py-2 font-sketch text-xs bg-blue-100 hover:bg-blue-200 text-center">
                  + Find a Mentor to Message
                </button>
              </div>
            </div>

            {/* Chat area */}
            <div class="flex-1 flex flex-col bg-white scribble-card overflow-hidden">
              {/* Empty state */}
              <div id="chatEmpty" class="flex-1 flex flex-col items-center justify-center text-center p-8">
                <div class="text-5xl mb-3">💬</div>
                <h3 class="font-sketch text-lg mb-2">Select a Conversation</h3>
                <p class="font-handwritten text-gray-500 text-sm mb-4">Choose a conversation on the left, or find a mentor to start a new one.</p>
                <button onclick="switchSection('find-mentors')" class="scribble-button px-4 py-2 font-sketch text-sm bg-blue-200 hover:bg-blue-300">
                  🔍 Find Mentors
                </button>
              </div>

              {/* Active chat */}
              <div id="chatActive" class="hidden flex-1 flex flex-col h-full">
                {/* Chat header */}
                <div class="flex items-center justify-between px-4 py-3 border-b border-dashed border-gray-200 flex-shrink-0">
                  <div class="flex items-center gap-3">
                    <div id="chatPartnerAvatar" class="w-9 h-9 bg-gradient-to-br from-green-400 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-sm"></div>
                    <div>
                      <p id="chatPartnerName" class="font-sketch text-sm font-bold"></p>
                      <p id="chatPartnerRole" class="font-handwritten text-xs text-gray-500"></p>
                    </div>
                  </div>
                  <div class="flex items-center gap-2">
                    <button onclick="scheduleWithPartner()" class="scribble-button px-3 py-1 font-sketch text-xs bg-green-100 hover:bg-green-200">
                      📅 Schedule
                    </button>
                    <button onclick="openReportUserModal()" class="scribble-button px-3 py-1 font-sketch text-xs bg-red-100 hover:bg-red-200 text-red-700">
                      🚩 Report
                    </button>
                  </div>
                </div>

                {/* Messages */}
                <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-3"></div>

                {/* Typing area */}
                <div class="flex-shrink-0 border-t border-dashed border-gray-200 p-3">
                  <div class="flex gap-2 items-end">
                    <textarea id="chatInput" rows={2} placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                      class="flex-1 p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid resize-none"
                      onkeydown="handleChatKey(event)"></textarea>
                    <button onclick="sendMessage()" class="scribble-button px-4 py-2 font-sketch text-sm bg-blue-200 hover:bg-blue-300 flex-shrink-0 self-end">
                      Send ➤
                    </button>
                  </div>
                  <p class="font-handwritten text-xs text-gray-400 mt-1">💡 You can share contact info at your discretion — this is at your own risk.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════ MY CALLS ════════════ */}
        <div id="my-calls-section" class="dashboard-section hidden">
          <div class="text-center mb-6">
            <div class="scribble-border inline-block p-4 bg-white">
              <h1 class="text-2xl font-bold font-sketch transform rotate-1">📹 My Video Calls</h1>
            </div>
          </div>
          <div class="flex justify-center mb-6 space-x-3">
            {[['upcoming','🕐 Upcoming'],['completed','✅ Completed'],['cancelled','❌ Cancelled']].map(([t,l]) =>
              <button onclick={`showCallTab('${t}')`} class={`call-tab-btn scribble-button px-4 py-2 font-sketch text-sm${t==='upcoming'?' active bg-blue-200':''}`} data-tab={t}>{l}</button>
            )}
          </div>
          <div id="upcomingCalls" class="call-tab-content">
            <div class="scribble-card p-8 bg-blue-50 max-w-md mx-auto text-center">
              <img src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=400&q=80"
                alt="Mentoring session" class="w-full h-32 object-cover rounded mb-4" />
              <h3 class="text-lg font-bold font-sketch mb-2">No Upcoming Calls</h3>
              <p class="font-handwritten text-sm text-gray-600 mb-4">Message a mentor first, then schedule a session together.</p>
              <button onclick="switchSection('find-mentors')" class="scribble-button px-4 py-2 font-sketch text-sm bg-blue-200 hover:bg-blue-300">
                🔍 Find a Mentor
              </button>
            </div>
          </div>
          <div id="completedCalls" class="call-tab-content hidden">
            <div id="completedCallsList"><p class="font-handwritten text-gray-500 text-center py-4">Loading...</p></div>
          </div>
          <div id="cancelledCalls" class="call-tab-content hidden">
            <p class="font-handwritten text-gray-500 text-center py-4">No cancelled calls</p>
          </div>
        </div>

        {/* ════════════ PROFILE ════════════ */}
        <div id="profile-section" class="dashboard-section hidden">
          <div class="text-center mb-6">
            <div class="scribble-border inline-block p-4 bg-white">
              <h1 class="text-2xl font-bold font-sketch transform -rotate-1">👤 My Profile</h1>
            </div>
          </div>
          <div class="max-w-xl mx-auto">
            <div class="scribble-card p-6 bg-white">
              <form id="profileForm" class="space-y-5">
                <div class="text-center mb-4">
                  <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3">
                    {user.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                  <h2 class="text-xl font-bold font-sketch">{user.name}</h2>
                  <p class="font-handwritten text-gray-500 text-sm">{user.email}</p>
                </div>
                <div class="grid md:grid-cols-2 gap-3">
                  <div>
                    <label class="block font-sketch text-sm mb-1">Full Name</label>
                    <input type="text" id="profileName" value="{user.name}"
                      class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
                  </div>
                  <div>
                    <label class="block font-sketch text-sm mb-1">Email</label>
                    <input type="email" disabled value="{user.email}"
                      class="w-full p-2 border-2 border-gray-300 border-dashed rounded font-handwritten text-sm bg-gray-100" />
                  </div>
                </div>
                {user.role === 'student' ? (
                  <div class="grid md:grid-cols-2 gap-3">
                    <div>
                      <label class="block font-sketch text-sm mb-1">School</label>
                      <input type="text" id="profileUniversity" value="{user.school || ''}"
                        class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
                    </div>
                    <div>
                      <label class="block font-sketch text-sm mb-1">Career Interest</label>
                      <input type="text" id="profileMajor" value="{user.careerField || ''}"
                        class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
                    </div>
                  </div>
                ) : (
                  <div class="grid md:grid-cols-2 gap-3">
                    <div>
                      <label class="block font-sketch text-sm mb-1">Company</label>
                      <input type="text" id="profileCompany" value="{user.company || ''}"
                        class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
                    </div>
                    <div>
                      <label class="block font-sketch text-sm mb-1">Position</label>
                      <input type="text" id="profilePosition" value="{user.position || ''}"
                        class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
                    </div>
                  </div>
                )}
                <div>
                  <label class="block font-sketch text-sm mb-1">Bio</label>
                  <textarea id="profileBio" rows={3}
                    class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid"
                    placeholder="Tell us about yourself...">{user.bio || ''}</textarea>
                </div>
                <button type="submit" class="w-full scribble-button p-3 font-sketch text-sm bg-green-200 hover:bg-green-300">
                  💾 Save Profile
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>{/* /container */}

      {/* ════════════ MENTOR PROFILE MODAL ════════════ */}
      <div id="mentorProfileModal" class="fixed inset-0 bg-black bg-opacity-60 hidden items-center justify-center z-50 p-4" onclick="closeMentorProfileIfBackdrop(event)">
        <div class="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded border-2 border-black border-dashed shadow-2xl">
          {/* Header */}
          <div id="mpHeader" class="relative bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b-2 border-dashed border-gray-200">
            <button onclick="closeMentorProfile()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-600">✕</button>
            <div class="flex items-start gap-4">
              <div id="mpAvatar" class="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <h2 id="mpName" class="font-sketch text-xl font-bold"></h2>
                  <span id="mpBadge"></span>
                </div>
                <p id="mpRole" class="font-handwritten text-gray-600 text-sm"></p>
                <p id="mpExp" class="font-handwritten text-gray-500 text-xs mt-0.5"></p>
                <div id="mpTags" class="flex flex-wrap gap-1 mt-2"></div>
              </div>
              <div class="text-center flex-shrink-0">
                <div id="mpScore" class="text-3xl font-sketch font-bold text-blue-600"></div>
                <div id="mpTier" class="text-xs font-handwritten px-2 py-0.5 rounded border"></div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div class="p-6 space-y-5">
            {/* Bio */}
            <div id="mpBioSection" class="hidden">
              <h3 class="font-sketch text-sm font-bold mb-1 text-gray-700">About</h3>
              <p id="mpBio" class="font-handwritten text-sm text-gray-600 leading-relaxed"></p>
            </div>

            {/* Topics */}
            <div>
              <h3 class="font-sketch text-sm font-bold mb-2 text-gray-700">Mentorship Topics</h3>
              <div id="mpTopics" class="flex flex-wrap gap-2"></div>
            </div>

            {/* Score breakdown */}
            <div>
              <h3 class="font-sketch text-sm font-bold mb-2 text-gray-700">Compatibility Breakdown</h3>
              <div id="mpBreakdown" class="space-y-2"></div>
            </div>

            {/* CoC reminder */}
            <div class="bg-blue-50 border border-blue-200 rounded p-3 text-xs font-handwritten text-blue-800">
              <strong>🛡️ Safe Messaging Reminder:</strong> All conversations are logged for safety. Sharing personal contact info outside MentorMatch is at your own risk. Use the Report button for any concerns.
            </div>

            {/* Actions */}
            <div class="flex gap-3 flex-wrap">
              <button id="mpMessageBtn" onclick="openChatFromProfile()" class="flex-1 scribble-button py-3 font-sketch text-sm bg-blue-200 hover:bg-blue-300 text-center">
                💬 Message Mentor
              </button>
              <button onclick="scheduleFromProfile()" class="flex-1 scribble-button py-3 font-sketch text-sm bg-green-200 hover:bg-green-300 text-center">
                📅 Schedule Session
              </button>
              <a id="mpLinkedIn" href="#" target="_blank" rel="noopener noreferrer"
                class="scribble-button px-4 py-3 font-sketch text-sm bg-gray-100 hover:bg-gray-200 text-center hidden">
                LinkedIn ↗
              </a>
            </div>
            <button onclick="openReportUserModalForMentor()" class="w-full scribble-button py-2 font-sketch text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-200">
              🚩 Report This Mentor
            </button>
          </div>
        </div>
      </div>

      {/* ════════════ VIDEO CALL MODAL ════════════ */}
      <div id="videoCallModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
        <div class="bg-white max-w-sm mx-4 border-2 border-black border-dashed rounded shadow-xl">
          <div class="p-6 text-center">
            <div class="text-5xl mb-3">📹</div>
            <h3 class="text-xl font-bold font-sketch mb-3">Start Video Call?</h3>
            <div id="callPartnerInfo" class="mb-5"></div>
            <div class="flex gap-3 justify-center">
              <button onclick="startVideoCall()" class="scribble-button px-5 py-2 font-sketch text-sm bg-green-200 hover:bg-green-300">📹 Start Call</button>
              <button onclick="closeVideoCallModal()" class="scribble-button px-5 py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ REPORT MODAL ════════════ */}
      <div id="reportModal" class="fixed inset-0 bg-black bg-opacity-60 hidden items-center justify-center z-50 p-4" onclick="closeReportIfBackdrop(event)">
        <div class="bg-white max-w-md w-full border-2 border-black border-dashed rounded shadow-xl">
          <div class="p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-sketch text-lg font-bold text-red-700">🚩 Report User</h3>
              <button onclick="closeReportModal()" class="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold text-sm">✕</button>
            </div>
            <p class="font-handwritten text-sm text-gray-600 mb-4">Reports are reviewed promptly. Do not attempt to resolve serious issues on your own — always report through the platform.</p>
            <div class="space-y-3">
              <div>
                <label class="block font-sketch text-sm mb-1">Reason <span class="text-red-500">*</span></label>
                <select id="reportReason" class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none">
                  <option value="">Select a reason...</option>
                  <option value="harassment">Harassment or abusive behavior</option>
                  <option value="scam">Scam or fraudulent activity</option>
                  <option value="inappropriate">Inappropriate content or conduct</option>
                  <option value="fake-profile">Fake or misleading profile</option>
                  <option value="spam">Spam</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label class="block font-sketch text-sm mb-1">Description</label>
                <textarea id="reportDescription" rows={3} placeholder="Describe the issue (include dates, screenshots if possible)..."
                  class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none resize-none"></textarea>
              </div>
              <div id="reportMessageId" class="hidden">
                <p class="font-handwritten text-xs text-gray-500">Reporting a specific message: <span id="reportMsgIdDisplay" class="font-bold"></span></p>
              </div>
            </div>
            <div class="flex gap-3 mt-4">
              <button onclick="submitReport()" class="flex-1 scribble-button py-2 font-sketch text-sm bg-red-200 hover:bg-red-300 text-red-800">Submit Report</button>
              <button onclick="closeReportModal()" class="flex-1 scribble-button py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ SCHEDULE MODAL ════════════ */}
      <div id="scheduleModal" class="fixed inset-0 bg-black bg-opacity-60 hidden items-center justify-center z-50 p-4" onclick="closeScheduleIfBackdrop(event)">
        <div class="bg-white max-w-sm w-full border-2 border-black border-dashed rounded shadow-xl">
          <div class="p-5">
            <div class="flex items-center justify-between mb-4">
              <h3 class="font-sketch text-lg font-bold">📅 Schedule Session</h3>
              <button onclick="closeScheduleModal()" class="w-7 h-7 rounded-full bg-gray-200 hover:bg-gray-300 text-sm font-bold">✕</button>
            </div>
            <p class="font-handwritten text-sm text-gray-600 mb-4">Scheduling with: <strong id="schedulePartnerName"></strong></p>
            <p class="font-handwritten text-sm text-gray-500 mb-4">Tip: Discuss availability in the chat first, then confirm your session time here.</p>
            <div class="space-y-3">
              <div>
                <label class="block font-sketch text-sm mb-1">Preferred Date</label>
                <input type="date" id="scheduleDate" class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
              </div>
              <div>
                <label class="block font-sketch text-sm mb-1">Preferred Time</label>
                <input type="time" id="scheduleTime" class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none focus:border-solid" />
              </div>
              <div>
                <label class="block font-sketch text-sm mb-1">Session Type</label>
                <select id="scheduleType" class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none">
                  <option value="video">📹 Video Call</option>
                  <option value="chat">💬 Chat Only</option>
                </select>
              </div>
              <div>
                <label class="block font-sketch text-sm mb-1">Note to Mentor</label>
                <textarea id="scheduleNote" rows={2} placeholder="What do you want to discuss?"
                  class="w-full p-2 border-2 border-black border-dashed rounded font-handwritten text-sm focus:outline-none resize-none"></textarea>
              </div>
            </div>
            <div class="flex gap-3 mt-4">
              <button onclick="confirmSchedule()" class="flex-1 scribble-button py-2 font-sketch text-sm bg-green-200 hover:bg-green-300">Confirm</button>
              <button onclick="closeScheduleModal()" class="flex-1 scribble-button py-2 font-sketch text-sm bg-gray-200 hover:bg-gray-300">Cancel</button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ SCRIPTS ════════════ */}
      <script dangerouslySetInnerHTML={{ __html: `
        // ─── State ───
        var currentPartner = null;       // { id, name, company, verificationStatus }
        var activeSection = 'overview';
        var matchData = null;
        var extendedOpen = false;
        var currentChatPartnerId = null;
        var currentChatPartnerName = null;
        var allMatchCards = [];          // flat array for filtering
        var reportTargetId = null;
        var reportMessageId = null;
        var inboxData = [];
        var pollInterval = null;
        var schedulePartnerId = null;
        var schedulePartnerName = null;

        // ─── Helpers ───
        function verificationBadge(status) {
          if (status === 'verified')
            return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-green-100 border border-green-400 text-green-800 px-2 py-0.5 rounded-full">✅ Fully Verified</span>';
          if (status === 'approved')
            return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-blue-100 border border-blue-400 text-blue-800 px-2 py-0.5 rounded-full">🔵 Profile Approved</span>';
          if (status === 'rejected')
            return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-red-100 border border-red-400 text-red-800 px-2 py-0.5 rounded-full">❌ Not Available</span>';
          return '<span class="inline-flex items-center gap-1 text-xs font-handwritten bg-yellow-100 border border-yellow-400 text-yellow-800 px-2 py-0.5 rounded-full">⏳ Pending Verification</span>';
        }

        function tierColor(tier) {
          if (tier === 'Elite Match')  return 'bg-yellow-100 border-yellow-400 text-yellow-800';
          if (tier === 'Strong Match') return 'bg-green-100 border-green-400 text-green-800';
          if (tier === 'Good Match')   return 'bg-blue-100 border-blue-400 text-blue-800';
          return 'bg-gray-100 border-gray-400 text-gray-700';
        }

        function scoreBarColor(score) {
          if (score >= 90) return 'bg-yellow-400';
          if (score >= 75) return 'bg-green-400';
          if (score >= 60) return 'bg-blue-400';
          return 'bg-gray-300';
        }

        function initials(name) {
          return (name || '?').split(' ').map(function(w){return w[0]||''}).join('').slice(0,2).toUpperCase();
        }

        function avatarColor(name) {
          var colors = [
            'from-blue-400 to-blue-600','from-green-400 to-teal-600',
            'from-purple-400 to-purple-600','from-orange-400 to-red-500',
            'from-pink-400 to-rose-600','from-indigo-400 to-indigo-600',
          ];
          var idx = (name||'').charCodeAt(0) % colors.length;
          return colors[idx];
        }

        function getTagsForMentor(m) {
          var tags = [];
          if (m.industry) {
            var map = {technology:'STEM',medicine:'Healthcare',engineering:'STEM',science:'STEM',
                       business:'Business',law:'Law',sports:'Sports',media:'Creative',
                       education:'Education',nonprofit:'Nonprofit',government:'Government'};
            var t = map[m.industry.toLowerCase()];
            if (t && !tags.includes(t)) tags.push(t);
          }
          if (m.mentorTopics) {
            m.mentorTopics.split(',').forEach(function(tp) {
              var t2 = tp.trim();
              if (t2.includes('entrepreneur') || t2.includes('leadership')) { if(!tags.includes('Business'))tags.push('Business'); }
              if (t2.includes('resume') || t2.includes('career') || t2.includes('interview')) { if(!tags.includes('Career'))tags.push('Career'); }
              if (t2.includes('college') || t2.includes('school')) { if(!tags.includes('Education'))tags.push('Education'); }
            });
          }
          return tags.slice(0,4);
        }

        function formatTime(ts) {
          if (!ts) return '';
          var d = new Date(ts);
          var now = new Date();
          var diff = now - d;
          if (diff < 60000) return 'just now';
          if (diff < 3600000) return Math.floor(diff/60000) + 'm ago';
          if (diff < 86400000) return Math.floor(diff/3600000) + 'h ago';
          return d.toLocaleDateString();
        }

        // ─── Build Mentor Card (discovery grid) ───
        function buildMentorCard(match, compact) {
          var m = match.mentor;
          var b = match.breakdown;
          var tc = tierColor(match.tier);
          var barColor = scoreBarColor(match.score);
          var tags = getTagsForMentor(m);
          var mJson = JSON.stringify(JSON.stringify(match));

          return (
            '<div class="scribble-card bg-white p-4 flex flex-col gap-3 cursor-pointer hover:shadow-md transition-shadow mentor-card"' +
              ' data-name="' + (m.name||'').toLowerCase() + '"' +
              ' data-industry="' + (m.industry||'').toLowerCase() + '"' +
              ' data-topics="' + (m.mentorTopics||'').toLowerCase() + '"' +
              ' data-status="' + (m.verificationStatus||'') + '"' +
              ' data-tags="' + tags.join(',').toLowerCase() + '"' +
              ' onclick="openMentorProfile(' + mJson + ')">' +

              // Avatar + name row
              '<div class="flex items-start gap-3">' +
                '<div class="w-12 h-12 rounded-full bg-gradient-to-br ' + avatarColor(m.name) + ' flex items-center justify-center text-white font-bold flex-shrink-0">' + initials(m.name) + '</div>' +
                '<div class="flex-1 min-w-0">' +
                  '<div class="flex items-center gap-1.5 flex-wrap">' +
                    '<h3 class="font-sketch text-sm font-bold leading-tight">' + (m.name||'') + '</h3>' +
                    verificationBadge(m.verificationStatus) +
                  '</div>' +
                  '<p class="font-handwritten text-xs text-gray-500 truncate">' + (m.position||'') + (m.company ? ' · '+m.company : '') + '</p>' +
                  '<p class="font-handwritten text-xs text-gray-400">' + (m.industry ? m.industry.charAt(0).toUpperCase()+m.industry.slice(1) : '') + (m.experienceYears ? ' · '+m.experienceYears+'yrs' : '') + '</p>' +
                '</div>' +
                '<div class="text-right flex-shrink-0">' +
                  '<div class="font-sketch font-bold text-lg text-blue-600">' + match.score + '%</div>' +
                  '<span class="text-xs font-handwritten border px-1.5 py-0.5 rounded ' + tc + '">' + match.tier.split(' ')[0] + '</span>' +
                '</div>' +
              '</div>' +

              // Score bar
              '<div class="w-full bg-gray-100 rounded-full h-1.5">' +
                '<div class="' + barColor + ' h-1.5 rounded-full" style="width:' + match.score + '%"></div>' +
              '</div>' +

              // Tags
              (tags.length ? '<div class="flex flex-wrap gap-1">' + tags.map(function(t){
                return '<span class="text-xs font-handwritten bg-gray-100 px-2 py-0.5 rounded-full border border-gray-200">' + t + '</span>';
              }).join('') + '</div>' : '') +

              // Bio snippet
              (m.shortBio ? '<p class="font-handwritten text-xs text-gray-500 line-clamp-2">' + m.shortBio.slice(0,120) + (m.shortBio.length>120?'...':'') + '</p>' : '') +

              // Quick action
              '<button onclick="event.stopPropagation();startMessageFromCard(' + JSON.stringify(JSON.stringify({id:m.id,name:m.name,position:m.position,company:m.company,verificationStatus:m.verificationStatus})) + ')"' +
                ' class="w-full scribble-button py-1.5 font-sketch text-xs bg-blue-100 hover:bg-blue-200 transition-colors">' +
                '💬 Message Mentor' +
              '</button>' +
            '</div>'
          );
        }

        // ─── Load & Render Matches ───
        async function loadMatches() {
          var token = localStorage.getItem('auth-token');
          if (!token) return;
          try {
            var res = await fetch('/api/matching/find', { headers: { 'Authorization': 'Bearer ' + token } });
            var data = await res.json();
            matchData = data;
            renderMatches(data);
          } catch (e) {
            console.error('Matching error', e);
            document.getElementById('matchingLoader').classList.add('hidden');
            document.getElementById('noMentorsMsg').classList.remove('hidden');
          }
        }

        function renderMatches(data) {
          document.getElementById('matchingLoader').classList.add('hidden');
          var primary = data.primary || [];
          var extended = data.extended || [];
          var fallback = data.fallback || [];
          allMatchCards = primary.concat(extended).concat(fallback);

          if (primary.length === 0 && extended.length === 0 && fallback.length === 0) {
            document.getElementById('noMentorsMsg').classList.remove('hidden');
            return;
          }

          // Status banner
          if (data.verifiedCount === 0 || !data.hasVerifiedInField) {
            var banner = document.createElement('div');
            banner.className = 'scribble-card p-3 bg-blue-50 mb-5 text-center';
            if (data.verifiedCount === 0) {
              banner.innerHTML = '<p class="font-handwritten text-blue-800 text-sm"><strong>No fully verified mentors yet.</strong> Mentors below are <span class="font-bold">Profile Approved</span> (🔵) and completing their interview step. They can still provide great guidance!</p>';
            } else {
              banner.innerHTML = '<p class="font-handwritten text-blue-800 text-sm">No fully verified mentors in your field yet — showing best available. <strong>🔵 Approved</strong> mentors have passed all criteria checks.</p>';
            }
            document.getElementById('primaryMatches').before(banner);
          }

          if (primary.length > 0) {
            document.getElementById('mentorGrid').innerHTML = primary.map(function(m){return buildMentorCard(m,false);}).join('');
          } else {
            document.getElementById('mentorGrid').innerHTML =
              '<div class="col-span-full scribble-card p-6 bg-yellow-50 text-center">' +
                '<p class="font-sketch text-sm mb-1">No high-compatibility matches yet</p>' +
                '<p class="font-handwritten text-xs text-gray-500">Complete your profile to improve scores, or browse options below.</p>' +
              '</div>';
          }
          document.getElementById('primaryMatches').classList.remove('hidden');

          if (extended.length > 0) {
            document.getElementById('extendedGrid').innerHTML = extended.map(function(m){return buildMentorCard(m,false);}).join('');
            document.getElementById('seeMoreWrap').classList.remove('hidden');
          }

          if (fallback.length > 0) {
            var fb = document.createElement('div');
            fb.className = 'mt-6';
            fb.innerHTML =
              '<div class="scribble-card p-3 bg-gray-50 mb-4 text-center">' +
                '<p class="font-sketch text-xs mb-0.5">Mentors from Other Fields</p>' +
                '<p class="font-handwritten text-xs text-gray-500">Different industries — may still offer valuable guidance.</p>' +
              '</div>' +
              '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' + fallback.map(function(m){return buildMentorCard(m,false);}).join('') + '</div>';
            document.getElementById('extendedMatches').after(fb);
          }
        }

        function toggleExtended() {
          extendedOpen = !extendedOpen;
          var em = document.getElementById('extendedMatches');
          var btn = document.getElementById('seeMoreBtn');
          em.classList.toggle('hidden', !extendedOpen);
          btn.textContent = extendedOpen ? '👆 Show Fewer Options' : '👇 See More Options';
        }

        // ─── Filter / Search ───
        function filterMentors() {
          var q = (document.getElementById('mentorSearch').value || '').toLowerCase().trim();
          var fv = document.getElementById('filterVerified').value;
          var ff = document.getElementById('filterField').value.toLowerCase();

          var cards = document.querySelectorAll('.mentor-card');
          var visible = 0;
          cards.forEach(function(card) {
            var name = card.dataset.name || '';
            var industry = card.dataset.industry || '';
            var topics = card.dataset.topics || '';
            var status = card.dataset.status || '';
            var tags = card.dataset.tags || '';

            var matchQ = !q || name.includes(q) || industry.includes(q) || topics.includes(q) || tags.includes(q);
            var matchV = !fv || status === fv;
            var matchF = !ff || industry === ff;

            if (matchQ && matchV && matchF) { card.style.display = ''; visible++; }
            else card.style.display = 'none';
          });

          document.getElementById('noMentorsMsg').classList.toggle('hidden', visible > 0);
        }

        function filterByTag(tag) {
          document.getElementById('mentorSearch').value = tag;
          // highlight active pill
          document.querySelectorAll('.tag-pill').forEach(function(p) {
            p.classList.toggle('bg-blue-200', p.textContent.trim() === tag);
            p.classList.toggle('bg-white', p.textContent.trim() !== tag);
          });
          filterMentors();
        }

        function clearFilters() {
          document.getElementById('mentorSearch').value = '';
          document.getElementById('filterVerified').value = '';
          document.getElementById('filterField').value = '';
          document.querySelectorAll('.tag-pill').forEach(function(p) {
            p.classList.remove('bg-blue-200');
            p.classList.add('bg-white');
          });
          filterMentors();
          // show all cards
          document.querySelectorAll('.mentor-card').forEach(function(c){ c.style.display=''; });
          document.getElementById('noMentorsMsg').classList.add('hidden');
        }

        // ─── Mentor Profile Modal ───
        var currentModalMatch = null;

        function openMentorProfile(matchJson) {
          var match = JSON.parse(matchJson);
          currentModalMatch = match;
          var m = match.mentor;
          var b = match.breakdown;

          document.getElementById('mpName').textContent = m.name || '';
          document.getElementById('mpBadge').innerHTML = verificationBadge(m.verificationStatus);
          document.getElementById('mpRole').textContent = (m.position || '') + (m.company ? ' · ' + m.company : '');
          document.getElementById('mpExp').textContent = (m.industry ? m.industry.charAt(0).toUpperCase()+m.industry.slice(1) : '') + (m.experienceYears ? ' · ' + m.experienceYears + ' years of experience' : '');
          document.getElementById('mpScore').textContent = match.score + '%';

          var tierEl = document.getElementById('mpTier');
          tierEl.textContent = match.tier;
          tierEl.className = 'text-xs font-handwritten px-2 py-0.5 rounded border ' + tierColor(match.tier);

          var av = document.getElementById('mpAvatar');
          av.textContent = initials(m.name);
          av.className = 'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0 bg-gradient-to-br ' + avatarColor(m.name);

          // Tags
          var tags = getTagsForMentor(m);
          document.getElementById('mpTags').innerHTML = tags.map(function(t){
            return '<span class="text-xs font-handwritten bg-white border border-gray-300 px-2 py-0.5 rounded-full">' + t + '</span>';
          }).join('');

          // Bio
          if (m.shortBio) {
            document.getElementById('mpBio').textContent = m.shortBio;
            document.getElementById('mpBioSection').classList.remove('hidden');
          } else {
            document.getElementById('mpBioSection').classList.add('hidden');
          }

          // Topics
          var topicList = m.mentorTopics ? m.mentorTopics.split(',').map(function(t){return t.trim();}).filter(Boolean) : [];
          document.getElementById('mpTopics').innerHTML = topicList.length
            ? topicList.map(function(t){
                return '<span class="text-xs font-handwritten bg-blue-50 border border-blue-200 text-blue-800 px-2 py-0.5 rounded-full">📌 ' + t + '</span>';
              }).join('')
            : '<span class="text-xs font-handwritten text-gray-400">No topics listed</span>';

          // Breakdown bars
          var breakdown = [
            {label:'Career Field', val:b.careerField, max:30},
            {label:'Role Alignment', val:b.roleAlignment, max:20},
            {label:'Needs Match', val:b.needsMatch, max:15},
            {label:'Experience', val:b.experience, max:10},
            {label:'Personality', val:b.personality, max:10},
            {label:'Availability', val:b.availability, max:10},
            {label:'Commitment', val:b.commitment, max:5},
          ];
          document.getElementById('mpBreakdown').innerHTML = breakdown.map(function(item){
            var pct = Math.round((item.val / item.max) * 100);
            return '<div class="flex items-center gap-2">' +
              '<span class="font-handwritten text-xs text-gray-500 w-28 flex-shrink-0">' + item.label + '</span>' +
              '<div class="flex-1 bg-gray-100 rounded-full h-2">' +
                '<div class="bg-blue-400 h-2 rounded-full" style="width:' + pct + '%"></div>' +
              '</div>' +
              '<span class="font-handwritten text-xs text-gray-600 w-12 text-right flex-shrink-0">' + item.val + ' / ' + item.max + '</span>' +
            '</div>';
          }).join('');

          // LinkedIn
          var liLink = document.getElementById('mpLinkedIn');
          if (m.linkedinUrl) {
            liLink.href = m.linkedinUrl;
            liLink.classList.remove('hidden');
          } else {
            liLink.classList.add('hidden');
          }

          document.getElementById('mentorProfileModal').classList.remove('hidden');
          document.getElementById('mentorProfileModal').classList.add('flex');
        }

        function closeMentorProfile() {
          document.getElementById('mentorProfileModal').classList.add('hidden');
          document.getElementById('mentorProfileModal').classList.remove('flex');
          currentModalMatch = null;
        }

        function closeMentorProfileIfBackdrop(e) {
          if (e.target === document.getElementById('mentorProfileModal')) closeMentorProfile();
        }

        function openChatFromProfile() {
          if (!currentModalMatch) return;
          var m = currentModalMatch.mentor;
          closeMentorProfile();
          startChat(m.id, m.name, m.position, m.company, m.verificationStatus);
          switchSection('messages');
        }

        function scheduleFromProfile() {
          if (!currentModalMatch) return;
          var m = currentModalMatch.mentor;
          closeMentorProfile();
          openScheduleModal(m.id, m.name);
        }

        function openReportUserModalForMentor() {
          if (!currentModalMatch) return;
          reportTargetId = currentModalMatch.mentor.id;
          reportMessageId = null;
          closeMentorProfile();
          document.getElementById('reportModal').classList.remove('hidden');
          document.getElementById('reportModal').classList.add('flex');
          document.getElementById('reportMessageId').classList.add('hidden');
        }

        // ─── Messaging ───
        async function loadInbox() {
          var token = localStorage.getItem('auth-token');
          if (!token) return;
          try {
            var res = await fetch('/api/messages/inbox/list', { headers: { 'Authorization': 'Bearer ' + token } });
            var data = await res.json();
            inboxData = data.conversations || [];
            renderInbox(inboxData);

            // Badge
            var totalUnread = inboxData.reduce(function(sum, c) { return sum + (parseInt(c.unread_count)||0); }, 0);
            var badge = document.getElementById('inboxBadge');
            if (totalUnread > 0) {
              badge.textContent = totalUnread > 9 ? '9+' : totalUnread;
              badge.classList.remove('hidden');
            } else {
              badge.classList.add('hidden');
            }
          } catch(e) { console.error('Inbox error', e); }
        }

        function renderInbox(conversations) {
          var el = document.getElementById('conversationList');
          if (!conversations.length) {
            el.innerHTML = '<div class="p-4 text-center text-gray-400 font-handwritten text-sm">No conversations yet.<br/>Find a mentor to start one!</div>';
            return;
          }

          var q = (document.getElementById('inboxSearch').value || '').toLowerCase();
          var filtered = conversations.filter(function(c) {
            return !q || (c.partner_name||'').toLowerCase().includes(q) || (c.last_message||'').toLowerCase().includes(q);
          });

          el.innerHTML = filtered.map(function(c) {
            var isActive = c.partner_id === currentChatPartnerId;
            var unread = parseInt(c.unread_count) || 0;
            return '<div class="flex items-center gap-2 px-3 py-2.5 cursor-pointer hover:bg-gray-50 border-b border-dashed border-gray-100 transition-colors ' + (isActive ? 'bg-blue-50' : '') + '"' +
              ' onclick="startChat(' + JSON.stringify(c.partner_id) + ',' + JSON.stringify(c.partner_name) + ',' + JSON.stringify(c.position||'') + ',' + JSON.stringify(c.company||'') + ',' + JSON.stringify(c.verification_status||'') + ')">' +
              '<div class="w-8 h-8 rounded-full bg-gradient-to-br ' + avatarColor(c.partner_name) + ' flex items-center justify-center text-white text-xs font-bold flex-shrink-0">' + initials(c.partner_name) + '</div>' +
              '<div class="flex-1 min-w-0">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="font-sketch text-xs font-bold truncate">' + (c.partner_name||'') + '</span>' +
                  '<span class="font-handwritten text-xs text-gray-400 flex-shrink-0 ml-1">' + formatTime(c.last_message_at) + '</span>' +
                '</div>' +
                '<p class="font-handwritten text-xs text-gray-500 truncate">' + (c.last_message||'').slice(0,40) + '</p>' +
              '</div>' +
              (unread > 0 ? '<span class="w-5 h-5 bg-blue-500 text-white text-xs rounded-full flex items-center justify-center font-bold flex-shrink-0">' + unread + '</span>' : '') +
            '</div>';
          }).join('');
        }

        function filterInbox() {
          renderInbox(inboxData);
        }

        async function startChat(partnerId, partnerName, position, company, verificationStatus) {
          currentChatPartnerId = partnerId;
          currentChatPartnerName = partnerName;

          // Update header
          document.getElementById('chatPartnerAvatar').textContent = initials(partnerName);
          document.getElementById('chatPartnerAvatar').className = 'w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ' + avatarColor(partnerName);
          document.getElementById('chatPartnerName').textContent = partnerName;
          document.getElementById('chatPartnerRole').innerHTML = verificationBadge(verificationStatus) + ' ' + (position ? '<span class="font-handwritten">' + position + (company ? ' · '+company : '') + '</span>' : '');

          // Show active chat
          document.getElementById('chatEmpty').classList.add('hidden');
          document.getElementById('chatActive').classList.remove('hidden');
          document.getElementById('chatActive').classList.add('flex');
          document.getElementById('chatActive').classList.add('flex-col');

          // Re-render inbox to highlight active
          renderInbox(inboxData);

          await fetchMessages();

          // Poll for new messages every 5s while in messages section
          if (pollInterval) clearInterval(pollInterval);
          pollInterval = setInterval(function() {
            if (activeSection === 'messages' && currentChatPartnerId) fetchMessages(true);
          }, 5000);

          reportTargetId = partnerId;
        }

        async function fetchMessages(silent) {
          if (!currentChatPartnerId) return;
          var token = localStorage.getItem('auth-token');
          if (!token) return;
          try {
            var res = await fetch('/api/messages/' + currentChatPartnerId, {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            var data = await res.json();
            renderMessages(data.messages || [], silent);
            loadInbox(); // refresh unread counts
          } catch(e) { console.error('Fetch messages error', e); }
        }

        function renderMessages(messages, silent) {
          var me = JSON.parse(localStorage.getItem('user') || '{}');
          var container = document.getElementById('chatMessages');
          var wasAtBottom = container.scrollHeight - container.scrollTop - container.clientHeight < 80;

          container.innerHTML = messages.map(function(msg) {
            var isMe = msg.sender_id === me.id;
            var time = msg.created_at ? new Date(msg.created_at).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'}) : '';
            return '<div class="flex ' + (isMe ? 'justify-end' : 'justify-start') + ' group">' +
              '<div class="max-w-xs sm:max-w-sm">' +
                '<div class="' + (isMe ? 'bg-blue-200 rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl' : 'bg-gray-100 rounded-tr-2xl rounded-tl-sm rounded-br-2xl rounded-bl-2xl') + ' px-3 py-2 relative">' +
                  '<p class="font-handwritten text-sm break-words">' + escapeHtml(msg.content) + '</p>' +
                  (!isMe ? '<button onclick="reportMessage(' + JSON.stringify(msg.id) + ',' + JSON.stringify(msg.sender_id) + ')" class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 w-5 h-5 bg-red-100 border border-red-300 text-red-600 rounded-full text-xs flex items-center justify-center transition-opacity" title="Report message">🚩</button>' : '') +
                '</div>' +
                '<p class="font-handwritten text-xs text-gray-400 mt-0.5 ' + (isMe ? 'text-right' : '') + '">' + time + (msg.is_read && isMe ? ' · Read' : '') + '</p>' +
              '</div>' +
            '</div>';
          }).join('');

          if (!silent || wasAtBottom) {
            container.scrollTop = container.scrollHeight;
          }
        }

        function escapeHtml(str) {
          return (str||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
        }

        async function sendMessage() {
          var input = document.getElementById('chatInput');
          var content = input.value.trim();
          if (!content || !currentChatPartnerId) return;

          var token = localStorage.getItem('auth-token');
          input.value = '';
          input.disabled = true;

          try {
            var res = await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ recipientId: currentChatPartnerId, content: content })
            });
            var data = await res.json();
            if (data.success) {
              await fetchMessages();
            } else {
              input.value = content;
              showToast('Failed to send message. Try again.', 'error');
            }
          } catch(e) {
            input.value = content;
            showToast('Failed to send. Check your connection.', 'error');
          } finally {
            input.disabled = false;
            input.focus();
          }
        }

        function handleChatKey(e) {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
          }
        }

        function startMessageFromCard(partnerJson) {
          var p = JSON.parse(partnerJson);
          startChat(p.id, p.name, p.position, p.company, p.verificationStatus);
          switchSection('messages');
        }

        // ─── Report ───
        function reportMessage(messageId, senderId) {
          reportTargetId = senderId;
          reportMessageId = messageId;
          document.getElementById('reportModal').classList.remove('hidden');
          document.getElementById('reportModal').classList.add('flex');
          document.getElementById('reportMessageId').classList.remove('hidden');
          document.getElementById('reportMsgIdDisplay').textContent = messageId.slice(0,8) + '...';
        }

        function openReportUserModal() {
          reportMessageId = null;
          document.getElementById('reportModal').classList.remove('hidden');
          document.getElementById('reportModal').classList.add('flex');
          document.getElementById('reportMessageId').classList.add('hidden');
        }

        function closeReportModal() {
          document.getElementById('reportModal').classList.add('hidden');
          document.getElementById('reportModal').classList.remove('flex');
          document.getElementById('reportReason').value = '';
          document.getElementById('reportDescription').value = '';
        }

        function closeReportIfBackdrop(e) {
          if (e.target === document.getElementById('reportModal')) closeReportModal();
        }

        async function submitReport() {
          var reason = document.getElementById('reportReason').value;
          var description = document.getElementById('reportDescription').value.trim();

          if (!reason) { showToast('Please select a reason.', 'error'); return; }
          if (!reportTargetId) { showToast('No user to report.', 'error'); return; }

          var token = localStorage.getItem('auth-token');
          try {
            var res = await fetch('/api/messages/report', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ reportedUserId: reportTargetId, messageId: reportMessageId, reason: reason, description: description })
            });
            var data = await res.json();
            if (data.success) {
              closeReportModal();
              showToast('✅ Report submitted. It will be reviewed promptly.', 'success');
            } else {
              showToast('Failed to submit report. Try again.', 'error');
            }
          } catch(e) {
            showToast('Failed to submit report.', 'error');
          }
        }

        // ─── Schedule ───
        function openScheduleModal(partnerId, partnerName) {
          schedulePartnerId = partnerId;
          schedulePartnerName = partnerName;
          document.getElementById('schedulePartnerName').textContent = partnerName;
          document.getElementById('scheduleModal').classList.remove('hidden');
          document.getElementById('scheduleModal').classList.add('flex');
        }

        function closeScheduleModal() {
          document.getElementById('scheduleModal').classList.add('hidden');
          document.getElementById('scheduleModal').classList.remove('flex');
        }

        function closeScheduleIfBackdrop(e) {
          if (e.target === document.getElementById('scheduleModal')) closeScheduleModal();
        }

        function scheduleWithPartner() {
          if (!currentChatPartnerId) return;
          openScheduleModal(currentChatPartnerId, currentChatPartnerName);
        }

        function scheduleWithPartnerFromCall(partnerJson) {
          var p = JSON.parse(partnerJson);
          openScheduleModal(p.id, p.name);
        }

        async function confirmSchedule() {
          var date = document.getElementById('scheduleDate').value;
          var time = document.getElementById('scheduleTime').value;
          var type = document.getElementById('scheduleType').value;
          var note = document.getElementById('scheduleNote').value.trim();

          if (!date || !time) { showToast('Please select a date and time.', 'error'); return; }

          // Send a scheduling message to the partner
          if (schedulePartnerId) {
            var token = localStorage.getItem('auth-token');
            var msgContent = '📅 Session Request: ' + new Date(date + 'T' + time).toLocaleString() +
              ' · ' + (type === 'video' ? '📹 Video Call' : '💬 Chat') +
              (note ? ' · Note: ' + note : '');
            await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ recipientId: schedulePartnerId, content: msgContent })
            });
            // If we're already in a chat with this partner, refresh
            if (currentChatPartnerId === schedulePartnerId) fetchMessages();
          }

          closeScheduleModal();
          showToast('📅 Session request sent! Your mentor will confirm availability.', 'success');
        }

        // ─── Video Call Modal ───
        function openVideoCallModal(partnerJson) {
          var p = JSON.parse(partnerJson);
          currentPartner = p;
          document.getElementById('callPartnerInfo').innerHTML =
            '<div class="w-12 h-12 rounded-full bg-gradient-to-br ' + avatarColor(p.name) + ' flex items-center justify-center text-white font-bold mx-auto mb-2">' + initials(p.name) + '</div>' +
            '<h4 class="font-sketch text-base font-bold">' + (p.name||'') + '</h4>' +
            '<p class="font-handwritten text-sm text-gray-500">' + (p.company||'') + '</p>' +
            '<p class="font-handwritten text-sm mt-2 text-gray-600">Ready to start your mentoring session?</p>';
          document.getElementById('videoCallModal').classList.remove('hidden');
          document.getElementById('videoCallModal').classList.add('flex');
        }

        function startVideoCall() {
          if (currentPartner) {
            var roomId = 'room_' + Date.now() + '_' + Math.random().toString(36).substr(2,9);
            closeVideoCallModal();
            window.location.href = '/video-call/' + roomId + '?partner=' + encodeURIComponent(currentPartner.name);
          }
        }

        function closeVideoCallModal() {
          document.getElementById('videoCallModal').classList.add('hidden');
          document.getElementById('videoCallModal').classList.remove('flex');
          currentPartner = null;
        }

        // ─── Section switching ───
        function switchSection(sectionName) {
          document.querySelectorAll('.dashboard-section').forEach(function(s){ s.classList.add('hidden'); });
          var section = document.getElementById(sectionName + '-section');
          if (section) section.classList.remove('hidden');

          document.querySelectorAll('.nav-btn').forEach(function(b){ b.classList.remove('active','bg-blue-100','font-bold'); });
          document.querySelectorAll('[data-section="' + sectionName + '"]').forEach(function(b){ b.classList.add('active','bg-blue-100','font-bold'); });

          activeSection = sectionName;

          if (sectionName === 'find-mentors' && !matchData) loadMatches();
          if (sectionName === 'messages') { loadInbox(); }
          if (sectionName !== 'messages' && pollInterval) { clearInterval(pollInterval); pollInterval = null; }
        }

        // ─── Toast ───
        function showToast(msg, type) {
          var t = document.createElement('div');
          t.className = 'fixed bottom-6 right-4 z-50 scribble-card px-4 py-3 font-handwritten text-sm shadow-lg ' +
            (type === 'error' ? 'bg-red-50 border-red-300 text-red-800' : 'bg-green-50 border-green-300 text-green-800');
          t.textContent = msg;
          document.body.appendChild(t);
          setTimeout(function(){ if(t.parentNode) document.body.removeChild(t); }, 4000);
        }

        // ─── Profile form ───
        document.addEventListener('DOMContentLoaded', function() {
          loadRecentActivity();
          loadCompletedCalls();

          var profileForm = document.getElementById('profileForm');
          if (profileForm) {
            profileForm.addEventListener('submit', function(e) {
              e.preventDefault();
              showToast('✅ Profile updated!', 'success');
            });
          }
        });

        function loadRecentActivity() {
          setTimeout(function() {
            var activities = [
              '🎯 Profile viewed by mentors this week',
              '📈 Profile completion: keep adding details to improve matches',
              '🔥 MentorMatch is growing — new mentors added regularly'
            ];
            document.getElementById('recentActivity').innerHTML = activities.map(function(a) {
              return '<div class="scribble-card p-3 bg-white"><p class="font-handwritten text-sm">' + a + '</p></div>';
            }).join('');
          }, 800);
        }

        function loadCompletedCalls() {
          setTimeout(function() {
            var calls = [
              { partner:'Sarah Chen', company:'TechVision Inc', date:'2025-09-20', duration:'45 min', rating:5, notes:'Amazing insights about AI!' },
              { partner:'Marcus Johnson', company:'FinanceForward', date:'2025-09-18', duration:'30 min', rating:5, notes:'Great finance career advice.' }
            ];
            document.getElementById('completedCallsList').innerHTML = calls.map(function(c) {
              return '<div class="scribble-card p-4 mb-3 bg-white">' +
                '<div class="flex justify-between items-start">' +
                  '<div>' +
                    '<h4 class="font-sketch font-bold text-sm">' + c.partner + '</h4>' +
                    '<p class="font-handwritten text-xs text-gray-500">' + c.company + ' · ' + c.date + ' · ' + c.duration + '</p>' +
                    '<p class="font-handwritten text-sm mt-1">' + c.notes + '</p>' +
                  '</div>' +
                  '<div class="text-yellow-500 text-sm">⭐'.repeat(c.rating) + '</div>' +
                '</div>' +
              '</div>';
            }).join('');
          }, 1200);
        }

        function showCallTab(tabName) {
          document.querySelectorAll('.call-tab-content').forEach(function(c){ c.classList.add('hidden'); });
          document.getElementById(tabName + 'Calls').classList.remove('hidden');
          document.querySelectorAll('.call-tab-btn').forEach(function(b){ b.classList.remove('active','bg-blue-200'); });
          var tabBtn = document.querySelector('[data-tab="' + tabName + '"]');
          if (tabBtn) tabBtn.classList.add('active','bg-blue-200');
        }

        function toggleDropdown() {
          document.getElementById('userDropdown').classList.toggle('hidden');
        }

        document.addEventListener('click', function(e) {
          var dropdown = document.getElementById('userDropdown');
          if (dropdown && !e.target.closest('.relative')) dropdown.classList.add('hidden');
        });

        async function logout() {
          var token = localStorage.getItem('auth-token');
          if (token) {
            try { await fetch('/api/auth/logout', { method:'POST', headers:{ 'Authorization':'Bearer '+token } }); } catch(e) {}
          }
          localStorage.removeItem('auth-token');
          localStorage.removeItem('user');
          document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
          window.location.href = '/login';
        }
      `}} />
    </div>
  )
}
