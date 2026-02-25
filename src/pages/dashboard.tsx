interface DashboardPageProps {
  user: any
}

export function DashboardPage({ user }: DashboardPageProps) {
  const initial = user.name?.charAt(0)?.toUpperCase() || '?'
  return (
    <div class="min-h-screen bg-gray-50">

      {/* ── Sidebar + main layout ── */}
      <div class="flex h-screen overflow-hidden">

        {/* ── Sidebar ── */}
        <aside id="sidebar" class="w-60 bg-white border-r border-gray-100 flex flex-col flex-shrink-0 z-30">
          {/* Logo */}
          <div class="px-5 py-5 border-b border-gray-100">
            <a href="/" class="text-xl font-bold text-gray-900 tracking-tight">
              Mentor<span class="text-indigo-600">Match</span>
            </a>
          </div>

          {/* User info */}
          <div class="px-4 py-4 border-b border-gray-100">
            <div class="flex items-center gap-3">
              <div class="w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                {initial}
              </div>
              <div class="min-w-0">
                <p class="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                <p class="text-xs text-gray-500 truncate">{user.role === 'student' ? 'Student' : 'Mentor'}</p>
              </div>
            </div>
          </div>

          {/* Nav items */}
          <nav class="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
            {[
              { id: 'overview',     icon: overviewIcon(),    label: 'Overview' },
              { id: 'find-mentors', icon: searchIcon(),      label: 'Find Mentors' },
              { id: 'messages',     icon: chatIcon(),        label: 'Messages', badge: true },
              { id: 'my-calls',     icon: videoIcon(),       label: 'My Sessions' },
              { id: 'profile',      icon: personIcon(),      label: 'Profile' },
            ].map(item => (
              <button
                onclick={`switchSection('${item.id}')`}
                class="nav-btn w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors relative"
                data-section={item.id}
              >
                <span class="w-4 h-4 flex-shrink-0 text-gray-400">{item.icon}</span>
                {item.label}
                {item.badge && (
                  <span id="inboxBadge" class="hidden ml-auto min-w-[18px] h-[18px] bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold px-1">0</span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom actions */}
          <div class="px-3 py-4 border-t border-gray-100 space-y-0.5">
            <a href="/profile" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors">
              <svg class="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              Settings
            </a>
            <button onclick="logout()" class="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Sign out
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main class="flex-1 overflow-y-auto">

          {/* Top bar */}
          <header class="sticky top-0 z-20 bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between">
            <div>
              <h1 id="pageTitle" class="text-base font-semibold text-gray-900">Overview</h1>
            </div>
            <div class="flex items-center gap-3">
              <span class={`text-xs px-2.5 py-1 rounded-full font-medium ${user.verificationStatus === 'verified' ? 'bg-green-100 text-green-700' : user.verificationStatus === 'approved' ? 'bg-blue-100 text-blue-700' : 'bg-yellow-100 text-yellow-700'}`}>
                {user.verificationStatus === 'verified' ? 'Verified' : user.verificationStatus === 'approved' ? 'Approved' : 'Pending'}
              </span>
              <button onclick="toggleDropdown()" class="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1.5 transition-colors">
                <div class="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">{initial}</div>
                <svg class="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                </svg>
              </button>
              <div id="userDropdown" class="hidden absolute right-4 top-14 w-44 bg-white border border-gray-100 shadow-lg rounded-xl z-50 py-1 overflow-hidden">
                <a href="/profile" class="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">Edit Profile</a>
                <button onclick="logout()" class="block w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">Sign out</button>
              </div>
            </div>
          </header>

          <div class="p-6 max-w-6xl mx-auto">

            {/* ════════════ OVERVIEW ════════════ */}
            <div id="overview-section" class="dashboard-section space-y-6">

              {/* Welcome banner */}
              <div class="bg-gradient-to-r from-indigo-600 to-indigo-500 rounded-2xl p-6 text-white">
                <p class="text-indigo-200 text-sm mb-1">Welcome back,</p>
                <h2 class="text-2xl font-bold mb-1">{user.name}</h2>
                <p class="text-indigo-100 text-sm">
                  {user.role === 'student'
                    ? 'Find your perfect mentor and start building your future.'
                    : 'Make an impact — check your messages and upcoming sessions.'}
                </p>
              </div>

              {/* Stats */}
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Sessions', value: String(user.totalConversations || 0), icon: sessionIcon() },
                  { label: 'Avg Rating', value: (user.averageRating || 0).toFixed(1) + '/5', icon: starIcon() },
                  { label: 'Status', value: user.verificationStatus === 'verified' ? 'Verified' : user.verificationStatus === 'approved' ? 'Approved' : 'Pending', icon: shieldIcon() },
                  { label: 'Mentors', value: '∞', icon: peopleIcon() },
                ].map(s => (
                  <div class="bg-white rounded-xl border border-gray-100 p-4">
                    <div class="flex items-center justify-between mb-3">
                      <span class="text-xs font-medium text-gray-500">{s.label}</span>
                      <span class="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">{s.icon}</span>
                    </div>
                    <p class="text-xl font-bold text-gray-900">{s.value}</p>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div class="bg-white rounded-xl border border-gray-100 p-5">
                <h3 class="text-sm font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div class="flex flex-wrap gap-3">
                  <button onclick="switchSection('find-mentors')" class="flex items-center gap-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    Browse Mentors
                  </button>
                  <button onclick="switchSection('messages')" class="flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
                    Messages
                  </button>
                  <button onclick="switchSection('my-calls')" class="flex items-center gap-2 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    Sessions
                  </button>
                </div>
              </div>

              {/* Recent activity */}
              <div class="bg-white rounded-xl border border-gray-100 p-5">
                <h3 class="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div id="recentActivity" class="space-y-3">
                  <div class="flex items-center gap-3 animate-pulse">
                    <div class="w-8 h-8 rounded-full bg-gray-100"></div>
                    <div class="flex-1 space-y-1.5">
                      <div class="h-3 bg-gray-100 rounded w-3/4"></div>
                      <div class="h-2.5 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ════════════ FIND MENTORS ════════════ */}
            <div id="find-mentors-section" class="dashboard-section hidden space-y-5">

              {/* Header */}
              <div class="flex items-center justify-between">
                <div>
                  <h2 class="text-lg font-bold text-gray-900">AI Mentor Matching</h2>
                  <p class="text-sm text-gray-500">Ranked by compatibility with your profile</p>
                </div>
              </div>

              {/* Search + filters */}
              <div class="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-3">
                <div class="relative flex-1">
                  <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                  <input id="mentorSearch" type="text" placeholder="Search by name, field, or topic..."
                    class="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                    oninput="filterMentors()" />
                </div>
                <div class="flex gap-2 flex-wrap">
                  <select id="filterVerified" onchange="filterMentors()"
                    class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                    <option value="">All Mentors</option>
                    <option value="verified">Verified Only</option>
                    <option value="approved">Approved Only</option>
                  </select>
                  <select id="filterField" onchange="filterMentors()"
                    class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
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
                  <button onclick="clearFilters()" class="px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors">Clear</button>
                </div>
              </div>

              {/* Tag pills */}
              <div class="flex flex-wrap gap-2" id="tagFilters">
                {['STEM','Business','Healthcare','Law','Sports','Creative','Engineering','Education','Media'].map(tag =>
                  <button onclick={`filterByTag('${tag}')`}
                    class="tag-pill px-3 py-1.5 bg-white border border-gray-200 text-sm text-gray-600 font-medium rounded-full hover:border-indigo-300 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                    {tag}
                  </button>
                )}
              </div>

              {/* Loading */}
              <div id="matchingLoader" class="py-20 text-center">
                <svg class="animate-spin w-8 h-8 mx-auto mb-3 text-indigo-600" viewBox="0 0 24 24" fill="none">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                <p class="text-sm text-gray-500">Calculating your matches...</p>
              </div>

              {/* No mentors */}
              <div id="noMentorsMsg" class="hidden py-16 text-center">
                <div class="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <svg class="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
                <h3 class="text-sm font-semibold text-gray-900 mb-1">No Mentors Found</h3>
                <p class="text-sm text-gray-500">Try clearing your filters or check back soon.</p>
              </div>

              {/* Primary matches */}
              <div id="primaryMatches" class="hidden">
                <div id="mentorGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
              </div>

              {/* See More */}
              <div id="seeMoreWrap" class="hidden text-center">
                <button onclick="toggleExtended()" id="seeMoreBtn"
                  class="px-5 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                  Show more options
                </button>
                <p class="text-xs text-gray-400 mt-1.5">50–69% compatibility mentors</p>
              </div>
              <div id="extendedMatches" class="hidden">
                <div class="bg-gray-50 rounded-xl p-3 mb-4 text-center">
                  <p class="text-xs text-gray-500">These mentors are a partial match and can still offer valuable guidance.</p>
                </div>
                <div id="extendedGrid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
              </div>
            </div>

            {/* ════════════ MESSAGES ════════════ */}
            <div id="messages-section" class="dashboard-section hidden">
              {/* Safety notice */}
              <div class="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-800">
                <svg class="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>Sharing personal contact info outside MentorMatch is at your own risk. Use the report button for any concerns.</span>
              </div>

              <div class="flex gap-4" style="height: calc(100vh - 200px); min-height: 500px;">
                {/* Conversations sidebar */}
                <div class="w-72 flex-shrink-0 flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden">
                  <div class="p-3 border-b border-gray-100">
                    <p class="text-sm font-semibold text-gray-900 mb-2">Conversations</p>
                    <div class="relative">
                      <svg class="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                      </svg>
                      <input id="inboxSearch" type="text" placeholder="Search..."
                        class="w-full pl-8 pr-3 py-2 border border-gray-200 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        oninput="filterInbox()" />
                    </div>
                  </div>
                  <div id="conversationList" class="flex-1 overflow-y-auto">
                    <div class="p-4 text-center text-gray-400 text-xs">Loading conversations...</div>
                  </div>
                  <div class="p-3 border-t border-gray-100">
                    <button onclick="switchSection('find-mentors')"
                      class="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-lg transition-colors">
                      + Find a Mentor to Message
                    </button>
                  </div>
                </div>

                {/* Chat area */}
                <div class="flex-1 flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden">
                  {/* Empty state */}
                  <div id="chatEmpty" class="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                      <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                    </div>
                    <h3 class="text-sm font-semibold text-gray-900 mb-1">No conversation selected</h3>
                    <p class="text-xs text-gray-500 mb-4">Choose a conversation or find a mentor to start one.</p>
                    <button onclick="switchSection('find-mentors')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                      Find Mentors
                    </button>
                  </div>

                  {/* Active chat */}
                  <div id="chatActive" class="hidden flex-1 flex flex-col h-full">
                    {/* Chat header */}
                    <div class="flex items-center justify-between px-4 py-3 border-b border-gray-100 flex-shrink-0">
                      <div class="flex items-center gap-3">
                        <div id="chatPartnerAvatar" class="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0"></div>
                        <div>
                          <p id="chatPartnerName" class="text-sm font-semibold text-gray-900"></p>
                          <p id="chatPartnerRole" class="text-xs text-gray-500"></p>
                        </div>
                      </div>
                      <div class="flex items-center gap-2">
                        <button onclick="scheduleWithPartner()" class="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-lg transition-colors">
                          Schedule
                        </button>
                        <button onclick="openReportUserModal()" class="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-medium rounded-lg transition-colors">
                          Report
                        </button>
                      </div>
                    </div>

                    {/* Messages */}
                    <div id="chatMessages" class="flex-1 overflow-y-auto p-4 space-y-3"></div>

                    {/* Input */}
                    <div class="flex-shrink-0 border-t border-gray-100 p-3">
                      <div class="flex gap-2 items-end">
                        <textarea id="chatInput" rows={2} placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
                          class="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                          onkeydown="handleChatKey(event)"></textarea>
                        <button onclick="sendMessage()" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors flex-shrink-0 self-end">
                          Send
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ════════════ MY CALLS ════════════ */}
            <div id="my-calls-section" class="dashboard-section hidden space-y-5">
              <div>
                <h2 class="text-lg font-bold text-gray-900">My Sessions</h2>
                <p class="text-sm text-gray-500">Your mentoring sessions history</p>
              </div>

              <div class="flex gap-2">
                {[['upcoming','Upcoming'],['completed','Completed'],['cancelled','Cancelled']].map(([t,l]) =>
                  <button onclick={`showCallTab('${t}')`}
                    class={`call-tab-btn px-4 py-2 text-sm font-medium rounded-lg transition-colors border ${t==='upcoming' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'}`}
                    data-tab={t}>{l}</button>
                )}
              </div>

              <div id="upcomingCalls" class="call-tab-content">
                <div class="bg-white rounded-xl border border-gray-100 p-12 text-center max-w-sm mx-auto">
                  <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
                    <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 class="text-sm font-semibold text-gray-900 mb-1">No Upcoming Sessions</h3>
                  <p class="text-xs text-gray-500 mb-4">Message a mentor first, then schedule a session together.</p>
                  <button onclick="switchSection('find-mentors')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors">
                    Find a Mentor
                  </button>
                </div>
              </div>
              <div id="completedCalls" class="call-tab-content hidden">
                <div id="completedCallsList">
                  <div class="flex items-center justify-center py-8 text-sm text-gray-400">Loading...</div>
                </div>
              </div>
              <div id="cancelledCalls" class="call-tab-content hidden">
                <div class="py-8 text-center text-sm text-gray-400">No cancelled sessions</div>
              </div>
            </div>

            {/* ════════════ PROFILE ════════════ */}
            <div id="profile-section" class="dashboard-section hidden">
              <div class="max-w-xl">
                <div class="mb-6">
                  <h2 class="text-lg font-bold text-gray-900">My Profile</h2>
                  <p class="text-sm text-gray-500">Update your profile information</p>
                </div>

                <div class="bg-white rounded-xl border border-gray-100 p-6">
                  {/* Avatar */}
                  <div class="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div class="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {initial}
                    </div>
                    <div>
                      <h3 class="font-semibold text-gray-900">{user.name}</h3>
                      <p class="text-sm text-gray-500">{user.email}</p>
                      <span class="text-xs text-indigo-600 font-medium">{user.role === 'student' ? 'Student' : 'Mentor'}</span>
                    </div>
                  </div>

                  <form id="profileForm" class="space-y-4">
                    <div class="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input type="text" id="profileName" value="{user.name}"
                          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                      </div>
                      <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input type="email" disabled value="{user.email}"
                          class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-500 bg-gray-50 cursor-not-allowed" />
                      </div>
                    </div>

                    {user.role === 'student' ? (
                      <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1.5">School</label>
                          <input type="text" id="profileUniversity" value="{user.school || ''}"
                            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1.5">Career Interest</label>
                          <input type="text" id="profileMajor" value="{user.careerField || ''}"
                            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>
                      </div>
                    ) : (
                      <div class="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1.5">Company</label>
                          <input type="text" id="profileCompany" value="{user.company || ''}"
                            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-gray-700 mb-1.5">Position</label>
                          <input type="text" id="profilePosition" value="{user.position || ''}"
                            class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
                        </div>
                      </div>
                    )}

                    <div>
                      <label class="block text-sm font-medium text-gray-700 mb-1.5">Bio</label>
                      <textarea id="profileBio" rows={3}
                        class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                        placeholder="Tell us about yourself...">{user.bio || ''}</textarea>
                    </div>

                    <div id="profileMsg" class="hidden p-3 rounded-lg text-sm"></div>

                    <button type="submit" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                      Save Changes
                    </button>
                  </form>
                </div>
              </div>
            </div>

          </div>{/* /p-6 */}
        </main>
      </div>{/* /flex */}

      {/* ════════════ MENTOR PROFILE MODAL ════════════ */}
      <div id="mentorProfileModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 p-4" onclick="closeMentorProfileIfBackdrop(event)">
        <div class="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl">
          {/* Header */}
          <div id="mpHeader" class="relative p-6 border-b border-gray-100">
            <button onclick="closeMentorProfile()" class="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
            <div class="flex items-start gap-4">
              <div id="mpAvatar" class="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"></div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 flex-wrap mb-1">
                  <h2 id="mpName" class="text-lg font-bold text-gray-900"></h2>
                  <span id="mpBadge"></span>
                </div>
                <p id="mpRole" class="text-sm text-gray-600"></p>
                <p id="mpExp" class="text-xs text-gray-500 mt-0.5"></p>
                <div id="mpTags" class="flex flex-wrap gap-1.5 mt-2"></div>
              </div>
              <div class="text-center flex-shrink-0">
                <div id="mpScore" class="text-2xl font-bold text-indigo-600"></div>
                <div id="mpTier" class="text-xs px-2 py-0.5 rounded-full border font-medium"></div>
              </div>
            </div>
          </div>

          {/* Body */}
          <div class="p-6 space-y-5">
            <div id="mpBioSection" class="hidden">
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">About</h3>
              <p id="mpBio" class="text-sm text-gray-700 leading-relaxed"></p>
            </div>

            <div>
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Mentorship Topics</h3>
              <div id="mpTopics" class="flex flex-wrap gap-2"></div>
            </div>

            <div>
              <h3 class="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Compatibility Breakdown</h3>
              <div id="mpBreakdown" class="space-y-2.5"></div>
            </div>

            <div class="bg-blue-50 border border-blue-100 rounded-xl p-3 text-xs text-blue-800">
              <strong>Safe Messaging:</strong> All conversations are logged for safety. Sharing personal contact info outside MentorMatch is at your own risk.
            </div>

            <div class="flex gap-3 flex-wrap">
              <button id="mpMessageBtn" onclick="openChatFromProfile()" class="flex-1 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-xl transition-colors text-center">
                Message Mentor
              </button>
              <button onclick="scheduleFromProfile()" class="flex-1 px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors text-center">
                Schedule Session
              </button>
              <a id="mpLinkedIn" href="#" target="_blank" rel="noopener noreferrer"
                class="px-4 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors text-center hidden">
                LinkedIn ↗
              </a>
            </div>
            <button onclick="openReportUserModalForMentor()" class="w-full py-2 border border-red-200 text-red-600 hover:bg-red-50 text-xs font-medium rounded-xl transition-colors">
              Report This Mentor
            </button>
          </div>
        </div>
      </div>

      {/* ════════════ VIDEO CALL MODAL ════════════ */}
      <div id="videoCallModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
        <div class="bg-white max-w-sm mx-4 rounded-2xl shadow-xl p-6 text-center">
          <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-3">
            <svg class="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </div>
          <h3 class="text-base font-bold text-gray-900 mb-3">Start Video Call?</h3>
          <div id="callPartnerInfo" class="mb-5"></div>
          <div class="flex gap-3">
            <button onclick="startVideoCall()" class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors">Start Call</button>
            <button onclick="closeVideoCallModal()" class="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors">Cancel</button>
          </div>
        </div>
      </div>

      {/* ════════════ REPORT MODAL ════════════ */}
      <div id="reportModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 p-4" onclick="closeReportIfBackdrop(event)">
        <div class="bg-white max-w-md w-full rounded-2xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-bold text-red-700">Report User</h3>
            <button onclick="closeReportModal()" class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="text-sm text-gray-600 mb-4">Reports are reviewed promptly. Do not try to resolve serious issues on your own — always report through the platform.</p>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Reason <span class="text-red-500">*</span></label>
              <select id="reportReason" class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white">
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
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea id="reportDescription" rows={3} placeholder="Describe the issue..."
                class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition resize-none"></textarea>
            </div>
            <div id="reportMessageId" class="hidden">
              <p class="text-xs text-gray-500">Reporting message: <span id="reportMsgIdDisplay" class="font-semibold"></span></p>
            </div>
          </div>
          <div class="flex gap-3 mt-5">
            <button onclick="submitReport()" class="flex-1 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-colors">Submit Report</button>
            <button onclick="closeReportModal()" class="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors">Cancel</button>
          </div>
        </div>
      </div>

      {/* ════════════ SCHEDULE MODAL ════════════ */}
      <div id="scheduleModal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50 p-4" onclick="closeScheduleIfBackdrop(event)">
        <div class="bg-white max-w-sm w-full rounded-2xl shadow-xl p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-base font-bold text-gray-900">Schedule Session</h3>
            <button onclick="closeScheduleModal()" class="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <p class="text-sm text-gray-600 mb-4">Scheduling with: <strong id="schedulePartnerName"></strong></p>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Preferred Date</label>
              <input type="date" id="scheduleDate" class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Preferred Time</label>
              <input type="time" id="scheduleTime" class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Session Type</label>
              <select id="scheduleType" class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white">
                <option value="video">Video Call</option>
                <option value="chat">Chat Only</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5">Note to Mentor</label>
              <textarea id="scheduleNote" rows={2} placeholder="What do you want to discuss?"
                class="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"></textarea>
            </div>
          </div>
          <div class="flex gap-3 mt-5">
            <button onclick="confirmSchedule()" class="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg transition-colors">Confirm</button>
            <button onclick="closeScheduleModal()" class="flex-1 py-2.5 border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg transition-colors">Cancel</button>
          </div>
        </div>
      </div>

      {/* Toast container */}
      <div id="toastContainer" class="fixed bottom-6 right-4 z-50 space-y-2 pointer-events-none"></div>

      {/* ════════════ SCRIPTS ════════════ */}
      <script dangerouslySetInnerHTML={{ __html: `
        // ─── State ───
        var currentPartner = null;
        var activeSection = 'overview';
        var matchData = null;
        var extendedOpen = false;
        var currentChatPartnerId = null;
        var currentChatPartnerName = null;
        var allMatchCards = [];
        var reportTargetId = null;
        var reportMessageId = null;
        var inboxData = [];
        var pollInterval = null;
        var schedulePartnerId = null;
        var schedulePartnerName = null;

        var pageTitles = {
          'overview': 'Overview',
          'find-mentors': 'Find Mentors',
          'messages': 'Messages',
          'my-calls': 'My Sessions',
          'profile': 'My Profile'
        };

        // ─── Helpers ───
        function verificationBadge(status) {
          if (status === 'verified')
            return '<span class="inline-flex items-center text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">Verified</span>';
          if (status === 'approved')
            return '<span class="inline-flex items-center text-xs font-medium bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Approved</span>';
          if (status === 'rejected')
            return '<span class="inline-flex items-center text-xs font-medium bg-red-100 text-red-700 px-2 py-0.5 rounded-full">Not Available</span>';
          return '<span class="inline-flex items-center text-xs font-medium bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">Pending</span>';
        }

        function tierColor(tier) {
          if (tier === 'Elite Match')  return 'bg-yellow-50 border-yellow-300 text-yellow-800';
          if (tier === 'Strong Match') return 'bg-green-50 border-green-300 text-green-700';
          if (tier === 'Good Match')   return 'bg-blue-50 border-blue-300 text-blue-700';
          return 'bg-gray-50 border-gray-200 text-gray-600';
        }

        function scoreBarColor(score) {
          if (score >= 90) return 'bg-yellow-400';
          if (score >= 75) return 'bg-green-500';
          if (score >= 60) return 'bg-indigo-500';
          return 'bg-gray-300';
        }

        function initials(name) {
          return (name || '?').split(' ').map(function(w){return w[0]||''}).join('').slice(0,2).toUpperCase();
        }

        function avatarBg(name) {
          var colors = ['bg-indigo-600','bg-violet-600','bg-blue-600','bg-teal-600','bg-rose-600','bg-orange-500'];
          return colors[(name||'').charCodeAt(0) % colors.length];
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
          var d = new Date(ts), now = new Date(), diff = now - d;
          if (diff < 60000) return 'just now';
          if (diff < 3600000) return Math.floor(diff/60000) + 'm ago';
          if (diff < 86400000) return Math.floor(diff/3600000) + 'h ago';
          return d.toLocaleDateString();
        }

        // ─── Build Mentor Card ───
        function buildMentorCard(match) {
          var m = match.mentor;
          var tc = tierColor(match.tier);
          var barColor = scoreBarColor(match.score);
          var tags = getTagsForMentor(m);
          var mJson = JSON.stringify(JSON.stringify(match));

          return (
            '<div class="bg-white border border-gray-100 rounded-xl p-4 flex flex-col gap-3 cursor-pointer hover:border-indigo-200 hover:shadow-sm transition-all mentor-card"' +
              ' data-name="' + (m.name||'').toLowerCase() + '"' +
              ' data-industry="' + (m.industry||'').toLowerCase() + '"' +
              ' data-topics="' + (m.mentorTopics||'').toLowerCase() + '"' +
              ' data-status="' + (m.verificationStatus||'') + '"' +
              ' data-tags="' + tags.join(',').toLowerCase() + '"' +
              ' onclick="openMentorProfile(' + mJson + ')">' +

              '<div class="flex items-start gap-3">' +
                '<div class="w-11 h-11 rounded-full ' + avatarBg(m.name) + ' flex items-center justify-center text-white text-sm font-bold flex-shrink-0">' + initials(m.name) + '</div>' +
                '<div class="flex-1 min-w-0">' +
                  '<div class="flex items-center gap-1.5 flex-wrap">' +
                    '<h3 class="text-sm font-semibold text-gray-900 leading-tight">' + (m.name||'') + '</h3>' +
                    verificationBadge(m.verificationStatus) +
                  '</div>' +
                  '<p class="text-xs text-gray-500 truncate mt-0.5">' + (m.position||'') + (m.company ? ' · '+m.company : '') + '</p>' +
                  '<p class="text-xs text-gray-400">' + (m.industry ? m.industry.charAt(0).toUpperCase()+m.industry.slice(1) : '') + (m.experienceYears ? ' · '+m.experienceYears+'y exp' : '') + '</p>' +
                '</div>' +
                '<div class="text-right flex-shrink-0">' +
                  '<div class="text-lg font-bold text-indigo-600">' + match.score + '%</div>' +
                  '<span class="text-xs border px-1.5 py-0.5 rounded-full ' + tc + '">' + match.tier.split(' ')[0] + '</span>' +
                '</div>' +
              '</div>' +

              '<div class="w-full bg-gray-100 rounded-full h-1">' +
                '<div class="' + barColor + ' h-1 rounded-full" style="width:' + match.score + '%"></div>' +
              '</div>' +

              (tags.length ? '<div class="flex flex-wrap gap-1">' + tags.map(function(t){
                return '<span class="text-xs bg-gray-50 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">' + t + '</span>';
              }).join('') + '</div>' : '') +

              (m.shortBio ? '<p class="text-xs text-gray-500 line-clamp-2">' + m.shortBio.slice(0,120) + (m.shortBio.length>120?'...':'') + '</p>' : '') +

              '<button onclick="event.stopPropagation();startMessageFromCard(' + JSON.stringify(JSON.stringify({id:m.id,name:m.name,position:m.position,company:m.company,verificationStatus:m.verificationStatus})) + ')"' +
                ' class="w-full py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs font-medium rounded-lg transition-colors">' +
                'Message Mentor' +
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

          if (data.verifiedCount === 0 || !data.hasVerifiedInField) {
            var banner = document.createElement('div');
            banner.className = 'bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-sm text-blue-800';
            if (data.verifiedCount === 0) {
              banner.innerHTML = '<strong>No fully verified mentors yet.</strong> Mentors below are <strong>Profile Approved</strong> and completing their final step. They can still provide great guidance!';
            } else {
              banner.innerHTML = 'No fully verified mentors in your field yet — showing best available. <strong>Approved</strong> mentors have passed all criteria checks.';
            }
            document.getElementById('primaryMatches').before(banner);
          }

          if (primary.length > 0) {
            document.getElementById('mentorGrid').innerHTML = primary.map(function(m){return buildMentorCard(m);}).join('');
          } else {
            document.getElementById('mentorGrid').innerHTML =
              '<div class="col-span-full bg-gray-50 rounded-xl p-6 text-center">' +
                '<p class="text-sm font-medium text-gray-700 mb-1">No high-compatibility matches yet</p>' +
                '<p class="text-xs text-gray-500">Complete your profile to improve scores, or browse options below.</p>' +
              '</div>';
          }
          document.getElementById('primaryMatches').classList.remove('hidden');

          if (extended.length > 0) {
            document.getElementById('extendedGrid').innerHTML = extended.map(function(m){return buildMentorCard(m);}).join('');
            document.getElementById('seeMoreWrap').classList.remove('hidden');
          }

          if (fallback.length > 0) {
            var fb = document.createElement('div');
            fb.className = 'mt-6';
            fb.innerHTML =
              '<div class="bg-gray-50 rounded-xl p-3 mb-4 text-center">' +
                '<p class="text-sm font-medium text-gray-700 mb-0.5">Mentors from Other Fields</p>' +
                '<p class="text-xs text-gray-500">Different industries — may still offer valuable guidance.</p>' +
              '</div>' +
              '<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">' + fallback.map(function(m){return buildMentorCard(m);}).join('') + '</div>';
            document.getElementById('extendedMatches').after(fb);
          }
        }

        function toggleExtended() {
          extendedOpen = !extendedOpen;
          document.getElementById('extendedMatches').classList.toggle('hidden', !extendedOpen);
          document.getElementById('seeMoreBtn').textContent = extendedOpen ? 'Show fewer options' : 'Show more options';
        }

        // ─── Filter / Search ───
        function filterMentors() {
          var q = (document.getElementById('mentorSearch').value || '').toLowerCase().trim();
          var fv = document.getElementById('filterVerified').value;
          var ff = document.getElementById('filterField').value.toLowerCase();
          var cards = document.querySelectorAll('.mentor-card');
          var visible = 0;
          cards.forEach(function(card) {
            var matchQ = !q || card.dataset.name.includes(q) || card.dataset.industry.includes(q) || card.dataset.topics.includes(q) || card.dataset.tags.includes(q);
            var matchV = !fv || card.dataset.status === fv;
            var matchF = !ff || card.dataset.industry === ff;
            if (matchQ && matchV && matchF) { card.style.display = ''; visible++; }
            else card.style.display = 'none';
          });
          document.getElementById('noMentorsMsg').classList.toggle('hidden', visible > 0);
        }

        function filterByTag(tag) {
          document.getElementById('mentorSearch').value = tag;
          document.querySelectorAll('.tag-pill').forEach(function(p) {
            var active = p.textContent.trim() === tag;
            p.classList.toggle('bg-indigo-600', active);
            p.classList.toggle('text-white', active);
            p.classList.toggle('border-indigo-600', active);
            p.classList.toggle('bg-white', !active);
            p.classList.toggle('text-gray-600', !active);
            p.classList.toggle('border-gray-200', !active);
          });
          filterMentors();
        }

        function clearFilters() {
          document.getElementById('mentorSearch').value = '';
          document.getElementById('filterVerified').value = '';
          document.getElementById('filterField').value = '';
          document.querySelectorAll('.tag-pill').forEach(function(p) {
            p.classList.remove('bg-indigo-600','text-white','border-indigo-600');
            p.classList.add('bg-white','text-gray-600','border-gray-200');
          });
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
          document.getElementById('mpExp').textContent = (m.industry ? m.industry.charAt(0).toUpperCase()+m.industry.slice(1) : '') + (m.experienceYears ? ' · ' + m.experienceYears + ' years exp' : '');
          document.getElementById('mpScore').textContent = match.score + '%';

          var tierEl = document.getElementById('mpTier');
          tierEl.textContent = match.tier;
          tierEl.className = 'text-xs px-2 py-0.5 rounded-full border font-medium ' + tierColor(match.tier);

          var av = document.getElementById('mpAvatar');
          av.textContent = initials(m.name);
          av.className = 'w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0 ' + avatarBg(m.name);

          var tags = getTagsForMentor(m);
          document.getElementById('mpTags').innerHTML = tags.map(function(t){
            return '<span class="text-xs bg-gray-100 border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full">' + t + '</span>';
          }).join('');

          if (m.shortBio) {
            document.getElementById('mpBio').textContent = m.shortBio;
            document.getElementById('mpBioSection').classList.remove('hidden');
          } else {
            document.getElementById('mpBioSection').classList.add('hidden');
          }

          var topicList = m.mentorTopics ? m.mentorTopics.split(',').map(function(t){return t.trim();}).filter(Boolean) : [];
          document.getElementById('mpTopics').innerHTML = topicList.length
            ? topicList.map(function(t){
                return '<span class="text-xs bg-indigo-50 border border-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">' + t + '</span>';
              }).join('')
            : '<span class="text-xs text-gray-400">No topics listed</span>';

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
            return '<div class="flex items-center gap-3">' +
              '<span class="text-xs text-gray-500 w-28 flex-shrink-0">' + item.label + '</span>' +
              '<div class="flex-1 bg-gray-100 rounded-full h-1.5">' +
                '<div class="bg-indigo-500 h-1.5 rounded-full transition-all" style="width:' + pct + '%"></div>' +
              '</div>' +
              '<span class="text-xs text-gray-500 w-12 text-right flex-shrink-0">' + item.val + '/' + item.max + '</span>' +
            '</div>';
          }).join('');

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

            var totalUnread = inboxData.reduce(function(sum, c) { return sum + (parseInt(c.unread_count)||0); }, 0);
            var badge = document.getElementById('inboxBadge');
            if (totalUnread > 0) {
              badge.textContent = totalUnread > 9 ? '9+' : String(totalUnread);
              badge.classList.remove('hidden');
              badge.classList.add('flex');
            } else {
              badge.classList.add('hidden');
              badge.classList.remove('flex');
            }
          } catch(e) { console.error('Inbox error', e); }
        }

        function renderInbox(conversations) {
          var el = document.getElementById('conversationList');
          if (!conversations.length) {
            el.innerHTML = '<div class="p-5 text-center text-gray-400 text-xs">No conversations yet.<br/>Find a mentor to start one!</div>';
            return;
          }

          var q = (document.getElementById('inboxSearch').value || '').toLowerCase();
          var filtered = conversations.filter(function(c) {
            return !q || (c.partner_name||'').toLowerCase().includes(q) || (c.last_message||'').toLowerCase().includes(q);
          });

          el.innerHTML = filtered.map(function(c) {
            var isActive = c.partner_id === currentChatPartnerId;
            var unread = parseInt(c.unread_count) || 0;
            return '<div class="flex items-center gap-2.5 px-3 py-2.5 cursor-pointer hover:bg-gray-50 transition-colors ' + (isActive ? 'bg-indigo-50' : '') + '"' +
              ' onclick="startChat(' + JSON.stringify(c.partner_id) + ',' + JSON.stringify(c.partner_name) + ',' + JSON.stringify(c.position||'') + ',' + JSON.stringify(c.company||'') + ',' + JSON.stringify(c.verification_status||'') + ')">' +
              '<div class="w-8 h-8 rounded-full ' + avatarBg(c.partner_name) + ' flex items-center justify-center text-white text-xs font-bold flex-shrink-0">' + initials(c.partner_name) + '</div>' +
              '<div class="flex-1 min-w-0">' +
                '<div class="flex items-center justify-between">' +
                  '<span class="text-xs font-semibold text-gray-900 truncate">' + (c.partner_name||'') + '</span>' +
                  '<span class="text-xs text-gray-400 flex-shrink-0 ml-1">' + formatTime(c.last_message_at) + '</span>' +
                '</div>' +
                '<p class="text-xs text-gray-500 truncate">' + (c.last_message||'').slice(0,40) + '</p>' +
              '</div>' +
              (unread > 0 ? '<span class="min-w-[18px] h-[18px] bg-indigo-600 text-white text-xs rounded-full flex items-center justify-center font-bold px-1 flex-shrink-0">' + unread + '</span>' : '') +
            '</div>';
          }).join('');
        }

        function filterInbox() { renderInbox(inboxData); }

        async function startChat(partnerId, partnerName, position, company, verificationStatus) {
          currentChatPartnerId = partnerId;
          currentChatPartnerName = partnerName;

          document.getElementById('chatPartnerAvatar').textContent = initials(partnerName);
          document.getElementById('chatPartnerAvatar').className = 'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0 ' + avatarBg(partnerName);
          document.getElementById('chatPartnerName').textContent = partnerName;
          document.getElementById('chatPartnerRole').textContent = (position ? position + (company ? ' · '+company : '') : '');

          document.getElementById('chatEmpty').classList.add('hidden');
          document.getElementById('chatActive').classList.remove('hidden');
          document.getElementById('chatActive').classList.add('flex');
          document.getElementById('chatActive').classList.add('flex-col');

          renderInbox(inboxData);
          await fetchMessages();

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
            var res = await fetch('/api/messages/' + currentChatPartnerId, { headers: { 'Authorization': 'Bearer ' + token } });
            var data = await res.json();
            renderMessages(data.messages || [], silent);
            loadInbox();
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
                '<div class="' + (isMe ? 'bg-indigo-600 text-white rounded-tl-2xl rounded-tr-sm rounded-bl-2xl rounded-br-2xl' : 'bg-gray-100 text-gray-900 rounded-tr-2xl rounded-tl-sm rounded-br-2xl rounded-bl-2xl') + ' px-3.5 py-2.5 relative">' +
                  '<p class="text-sm break-words">' + escapeHtml(msg.content) + '</p>' +
                  (!isMe ? '<button onclick="reportMessage(' + JSON.stringify(msg.id) + ',' + JSON.stringify(msg.sender_id) + ')" class="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 w-5 h-5 bg-white border border-gray-200 text-red-500 rounded-full text-xs flex items-center justify-center transition-opacity shadow-sm" title="Report">⚑</button>' : '') +
                '</div>' +
                '<p class="text-xs text-gray-400 mt-0.5 ' + (isMe ? 'text-right' : '') + '">' + time + (msg.is_read && isMe ? ' · Read' : '') + '</p>' +
              '</div>' +
            '</div>';
          }).join('');

          if (!silent || wasAtBottom) container.scrollTop = container.scrollHeight;
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
            if (data.success) { await fetchMessages(); }
            else { input.value = content; showToast('Failed to send message.', 'error'); }
          } catch(e) { input.value = content; showToast('Failed to send.', 'error'); }
          finally { input.disabled = false; input.focus(); }
        }

        function handleChatKey(e) {
          if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
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
            if (data.success) { closeReportModal(); showToast('Report submitted. It will be reviewed promptly.', 'success'); }
            else { showToast('Failed to submit report.', 'error'); }
          } catch(e) { showToast('Failed to submit report.', 'error'); }
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

        async function confirmSchedule() {
          var date = document.getElementById('scheduleDate').value;
          var time = document.getElementById('scheduleTime').value;
          var type = document.getElementById('scheduleType').value;
          var note = document.getElementById('scheduleNote').value.trim();

          if (!date || !time) { showToast('Please select a date and time.', 'error'); return; }

          if (schedulePartnerId) {
            var token = localStorage.getItem('auth-token');
            var msgContent = 'Session Request: ' + new Date(date + 'T' + time).toLocaleString() +
              ' · ' + (type === 'video' ? 'Video Call' : 'Chat') +
              (note ? ' · Note: ' + note : '');
            await fetch('/api/messages', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ recipientId: schedulePartnerId, content: msgContent })
            });
            if (currentChatPartnerId === schedulePartnerId) fetchMessages();
          }

          closeScheduleModal();
          showToast('Session request sent! Your mentor will confirm availability.', 'success');
        }

        // ─── Video Call Modal ───
        function openVideoCallModal(partnerJson) {
          var p = JSON.parse(partnerJson);
          currentPartner = p;
          document.getElementById('callPartnerInfo').innerHTML =
            '<div class="w-10 h-10 rounded-full ' + avatarBg(p.name) + ' flex items-center justify-center text-white font-bold mx-auto mb-2">' + initials(p.name) + '</div>' +
            '<h4 class="text-sm font-semibold text-gray-900">' + (p.name||'') + '</h4>' +
            '<p class="text-xs text-gray-500">' + (p.company||'') + '</p>' +
            '<p class="text-sm text-gray-600 mt-2">Ready to start your mentoring session?</p>';
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

          document.querySelectorAll('.nav-btn').forEach(function(b){
            b.classList.remove('bg-indigo-50','text-indigo-700','font-semibold');
            b.classList.add('text-gray-600');
          });
          document.querySelectorAll('[data-section="' + sectionName + '"]').forEach(function(b){
            b.classList.add('bg-indigo-50','text-indigo-700','font-semibold');
            b.classList.remove('text-gray-600');
          });

          var title = document.getElementById('pageTitle');
          if (title) title.textContent = pageTitles[sectionName] || sectionName;

          activeSection = sectionName;
          if (sectionName === 'find-mentors' && !matchData) loadMatches();
          if (sectionName === 'messages') loadInbox();
          if (sectionName !== 'messages' && pollInterval) { clearInterval(pollInterval); pollInterval = null; }
        }

        // ─── Toast ───
        function showToast(msg, type) {
          var container = document.getElementById('toastContainer');
          var t = document.createElement('div');
          t.className = 'pointer-events-auto px-4 py-3 rounded-xl shadow-lg text-sm font-medium border ' +
            (type === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-green-50 border-green-200 text-green-800');
          t.textContent = msg;
          container.appendChild(t);
          setTimeout(function(){ if(t.parentNode) container.removeChild(t); }, 4000);
        }

        // ─── Profile form ───
        document.addEventListener('DOMContentLoaded', function() {
          loadRecentActivity();
          loadCompletedCalls();

          // Highlight overview nav item on load
          document.querySelectorAll('[data-section="overview"]').forEach(function(b){
            b.classList.add('bg-indigo-50','text-indigo-700','font-semibold');
            b.classList.remove('text-gray-600');
          });

          var profileForm = document.getElementById('profileForm');
          if (profileForm) {
            profileForm.addEventListener('submit', async function(e) {
              e.preventDefault();
              var token = localStorage.getItem('auth-token');
              if (!token) return;
              var name = document.getElementById('profileName').value.trim();
              var bio = document.getElementById('profileBio').value.trim();
              var body = { name: name, bio: bio };

              var companyEl = document.getElementById('profileCompany');
              var positionEl = document.getElementById('profilePosition');
              if (companyEl) body.company = companyEl.value.trim();
              if (positionEl) body.position = positionEl.value.trim();

              var msg = document.getElementById('profileMsg');
              try {
                var res = await fetch('/api/profile', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
                  body: JSON.stringify(body)
                });
                var data = await res.json();
                if (data.success) {
                  msg.className = 'p-3 rounded-lg text-sm bg-green-50 border border-green-200 text-green-800';
                  msg.textContent = 'Profile updated successfully!';
                  msg.classList.remove('hidden');
                  if (data.user) localStorage.setItem('user', JSON.stringify(data.user));
                } else {
                  msg.className = 'p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-800';
                  msg.textContent = data.error || 'Failed to update profile.';
                  msg.classList.remove('hidden');
                }
              } catch(err) {
                msg.className = 'p-3 rounded-lg text-sm bg-red-50 border border-red-200 text-red-800';
                msg.textContent = 'Network error. Please try again.';
                msg.classList.remove('hidden');
              }
              setTimeout(function(){ msg.classList.add('hidden'); }, 4000);
            });
          }
        });

        function loadRecentActivity() {
          setTimeout(function() {
            var activities = [
              { icon: 'target', text: 'Profile viewed by mentors this week' },
              { icon: 'chart', text: 'Complete your profile to improve match scores' },
              { icon: 'spark', text: 'New mentors added — check your matches!' },
            ];
            document.getElementById('recentActivity').innerHTML = activities.map(function(a) {
              return '<div class="flex items-center gap-3">' +
                '<div class="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">' +
                  '<svg class="w-4 h-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>' +
                '</div>' +
                '<p class="text-sm text-gray-700">' + a.text + '</p>' +
              '</div>';
            }).join('');
          }, 600);
        }

        function loadCompletedCalls() {
          setTimeout(function() {
            var calls = [
              { partner:'Sarah Chen', company:'TechVision Inc', date:'Sep 20', duration:'45 min', rating:5, notes:'Amazing insights about AI careers!' },
              { partner:'Marcus Johnson', company:'FinanceForward', date:'Sep 18', duration:'30 min', rating:5, notes:'Great advice on breaking into finance.' }
            ];
            document.getElementById('completedCallsList').innerHTML = calls.map(function(c) {
              return '<div class="bg-white border border-gray-100 rounded-xl p-4 mb-3">' +
                '<div class="flex items-start justify-between">' +
                  '<div class="flex items-center gap-3">' +
                    '<div class="w-9 h-9 rounded-full ' + avatarBg(c.partner) + ' flex items-center justify-center text-white text-xs font-bold flex-shrink-0">' + initials(c.partner) + '</div>' +
                    '<div>' +
                      '<h4 class="text-sm font-semibold text-gray-900">' + c.partner + '</h4>' +
                      '<p class="text-xs text-gray-500">' + c.company + ' · ' + c.date + ' · ' + c.duration + '</p>' +
                      '<p class="text-sm text-gray-700 mt-1">' + c.notes + '</p>' +
                    '</div>' +
                  '</div>' +
                  '<div class="flex text-yellow-400 text-xs flex-shrink-0">★★★★★</div>' +
                '</div>' +
              '</div>';
            }).join('');
          }, 1000);
        }

        function showCallTab(tabName) {
          document.querySelectorAll('.call-tab-content').forEach(function(c){ c.classList.add('hidden'); });
          document.getElementById(tabName + 'Calls').classList.remove('hidden');
          document.querySelectorAll('.call-tab-btn').forEach(function(b){
            var isActive = b.dataset.tab === tabName;
            b.className = 'call-tab-btn px-4 py-2 text-sm font-medium rounded-lg transition-colors border ' +
              (isActive ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50');
          });
        }

        function toggleDropdown() {
          document.getElementById('userDropdown').classList.toggle('hidden');
        }

        document.addEventListener('click', function(e) {
          var dropdown = document.getElementById('userDropdown');
          if (dropdown && !e.target.closest('[onclick="toggleDropdown()"]') && !e.target.closest('#userDropdown')) {
            dropdown.classList.add('hidden');
          }
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

// ── Icon helpers (inline SVG via JSX) ──
function overviewIcon() {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
}
function searchIcon() {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
}
function chatIcon() {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>
}
function videoIcon() {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
}
function personIcon() {
  return <svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
}
function sessionIcon() {
  return <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.069A1 1 0 0121 8.868v6.264a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
}
function starIcon() {
  return <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>
}
function shieldIcon() {
  return <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
}
function peopleIcon() {
  return <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg>
}
