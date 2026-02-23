interface VideoCallPageProps {
  user: any
  roomId: string
}

export function VideoCallPage({ user, roomId }: VideoCallPageProps) {
  return (
    <div class="min-h-screen bg-gray-900 text-white relative">
      {/* Header */}
      <header class="bg-black p-4 border-b-2 border-white">
        <div class="flex justify-between items-center max-w-6xl mx-auto">
          <div class="scribble-border-white p-2">
            <h1 class="text-xl font-sketch">MentorMatch</h1>
          </div>
          <div class="flex space-x-4">
            <button onclick="nextConversation()" 
                    class="scribble-button-white px-4 py-2 font-sketch hover:bg-white hover:text-black transition-colors">
              Next →
            </button>
            <button onclick="endCall()" 
                    class="scribble-button-white px-4 py-2 font-sketch bg-red-600 hover:bg-red-500">
              End Call
            </button>
          </div>
        </div>
      </header>

      <div class="flex h-screen pt-16">
        {/* Main Video Area */}
        <div class="flex-1 p-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
            
            {/* Partner Video */}
            <div class="relative">
              <div class="scribble-border-white h-full bg-gray-800 rounded-lg overflow-hidden relative">
                <video id="partnerVideo" class="w-full h-full object-cover" autoplay playsinline></video>
                
                {/* Partner Name Tag */}
                <div class="absolute top-4 left-4 scribble-border-white p-2 bg-black bg-opacity-75">
                  <span id="partnerRole" class="font-sketch text-sm">CEO</span>
                </div>

                {/* Mock Video Content */}
                <div id="mockPartnerVideo" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900">
                  <div class="text-center">
                    <div class="text-6xl mb-4">👤</div>
                    <p class="font-sketch text-xl">Connecting...</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Your Video */}
            <div class="relative">
              <div class="scribble-border-white h-full bg-gray-800 rounded-lg overflow-hidden relative">
                <video id="localVideo" class="w-full h-full object-cover" autoplay muted playsinline></video>
                
                {/* Your Name Tag */}
                <div class="absolute top-4 left-4 scribble-border-white p-2 bg-black bg-opacity-75">
                  <span id="userRole" class="font-sketch text-sm">Student</span>
                </div>

                {/* Mock Video Content */}
                <div id="mockLocalVideo" class="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-700 to-blue-900">
                  <div class="text-center">
                    <div class="text-6xl mb-4">🎓</div>
                    <p class="font-sketch text-xl">You</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Video Controls */}
          <div class="flex justify-center mt-4 space-x-4">
            <button onclick="toggleMute()" 
                    class="scribble-button-white p-3 rounded-full hover:bg-gray-700 transition-colors">
              <span id="muteIcon">🎤</span>
            </button>
            <button onclick="toggleVideo()" 
                    class="scribble-button-white p-3 rounded-full hover:bg-gray-700 transition-colors">
              <span id="videoIcon">📹</span>
            </button>
            <button onclick="shareScreen()" 
                    class="scribble-button-white p-3 rounded-full hover:bg-gray-700 transition-colors">
              <span>📺</span>
            </button>
          </div>
        </div>

        {/* Chat Sidebar */}
        <div class="w-80 bg-black border-l-2 border-white p-4 flex flex-col">
          <div class="scribble-border-white p-3 mb-4">
            <h3 class="font-sketch text-lg text-center">Chat</h3>
          </div>

          {/* Chat Messages */}
          <div id="chatMessages" class="flex-1 overflow-y-auto mb-4 space-y-3">
            <div class="bg-gray-800 p-3 rounded border border-gray-600">
              <span class="font-sketch text-sm text-gray-300">System:</span>
              <p class="font-handwritten text-sm mt-1">You're now connected! Say hello 👋</p>
            </div>
          </div>

          {/* Chat Input */}
          <div class="flex space-x-2">
            <input 
              type="text" 
              id="chatInput" 
              placeholder="Type a message..."
              class="flex-1 p-2 bg-gray-800 border border-gray-600 rounded font-handwritten text-sm focus:outline-none focus:border-white"
              onkeypress="handleChatEnter(event)"
            />
            <button onclick="sendMessage()" 
                    class="scribble-button-white px-4 py-2 font-sketch text-sm hover:bg-gray-700 transition-colors">
              Send
            </button>
          </div>

          {/* Connection Info */}
          <div class="mt-4 scribble-border-white p-3">
            <h4 class="font-sketch text-sm mb-2">Connection Info</h4>
            <div class="text-xs font-handwritten space-y-1 text-gray-300">
              <p>Status: <span class="text-green-400">Connected</span></p>
              <p>Duration: <span id="callDuration">00:00</span></p>
              <p>Quality: <span class="text-green-400">Good</span></p>
            </div>
          </div>
        </div>
      </div>

      <script src="/static/webrtc.js"></script>
      <script dangerouslySetInnerHTML={{
        __html: `
        // Initialize real WebRTC when page loads
        document.addEventListener('DOMContentLoaded', function() {
          // Get user and room info from props
          const user = ${JSON.stringify(user)};
          const roomId = '${roomId}';
          
          // Check authentication
          const token = localStorage.getItem('auth-token');
          if (!token) {
            window.location.href = '/login';
            return;
          }
          
          // Initialize real WebRTC
          initializeWebRTC(roomId, user);
          
          console.log('🎥 Video call initialized for:', user.name, 'in room:', roomId);
        });
        
        // Auth check function
        async function checkAuth() {
          const token = localStorage.getItem('auth-token');
          if (!token) {
            window.location.href = '/login';
            return false;
          }
          
          try {
            const response = await fetch('/api/auth/me', {
              headers: { 'Authorization': 'Bearer ' + token }
            });
            
            if (!response.ok) {
              localStorage.removeItem('auth-token');
              localStorage.removeItem('user');
              window.location.href = '/login';
              return false;
            }
            
            return true;
          } catch (error) {
            console.error('Auth check failed:', error);
            return false;
          }
        }
        
        // Call auth check
        checkAuth();
        `
      }} />
    </div>
  )
}