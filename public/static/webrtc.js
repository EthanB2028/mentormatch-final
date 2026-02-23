// Real WebRTC Implementation for MentorMatch
// This will replace the mock WebRTC in video-call.tsx

class MentorMatchRTC {
  constructor(roomId, user) {
    this.roomId = roomId
    this.user = user
    this.localStream = null
    this.remoteStream = null
    this.peer = null
    this.signalingSocket = null
    this.isInitiator = false
    this.isConnected = false
    this.isMuted = false
    this.isVideoOff = false
    this.callStartTime = Date.now()
    this.conversationId = null
    
    this.init()
  }

  async init() {
    console.log('🚀 Initializing MentorMatch WebRTC...')
    
    try {
      // Initialize camera and microphone
      await this.initializeMedia()
      
      // Connect to signaling server
      await this.connectSignaling()
      
      // Join the room
      this.joinRoom()
      
      // Set up UI event handlers
      this.setupUI()
      
    } catch (error) {
      console.error('❌ WebRTC initialization failed:', error)
      this.showError('Failed to initialize video call: ' + error.message)
    }
  }

  async initializeMedia() {
    try {
      console.log('📹 Requesting camera and microphone access...')
      
      this.localStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user'
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true
        }
      })

      // Display local video
      const localVideo = document.getElementById('localVideo')
      if (localVideo) {
        localVideo.srcObject = this.localStream
        // Hide mock video
        const mockLocal = document.getElementById('mockLocalVideo')
        if (mockLocal) mockLocal.style.display = 'none'
      }

      console.log('✅ Camera and microphone access granted')
      
    } catch (error) {
      console.error('❌ Media access denied:', error)
      
      // Show error to user
      this.showCameraError()
      throw new Error('Camera and microphone access required for video calls')
    }
  }

  async connectSignaling() {
    return new Promise((resolve, reject) => {
      try {
        const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:'
        const wsUrl = `${protocol}//${location.host}/ws/signaling/${this.roomId}`
        
        console.log('🔌 Connecting to signaling server:', wsUrl)
        this.signalingSocket = new WebSocket(wsUrl)

        this.signalingSocket.onopen = () => {
          console.log('✅ Connected to signaling server')
          resolve()
        }

        this.signalingSocket.onmessage = (event) => {
          this.handleSignalingMessage(JSON.parse(event.data))
        }

        this.signalingSocket.onclose = () => {
          console.log('🔌 Signaling connection closed')
          if (this.isConnected) {
            this.showError('Connection to server lost')
          }
        }

        this.signalingSocket.onerror = (error) => {
          console.error('❌ Signaling error:', error)
          reject(new Error('Failed to connect to signaling server'))
        }

        // Timeout after 10 seconds
        setTimeout(() => {
          if (this.signalingSocket.readyState !== WebSocket.OPEN) {
            reject(new Error('Signaling connection timeout'))
          }
        }, 10000)

      } catch (error) {
        reject(error)
      }
    })
  }

  joinRoom() {
    console.log(`🚪 Joining room ${this.roomId} as ${this.user.name}`)
    
    this.sendSignalingMessage({
      type: 'join-room',
      roomId: this.roomId,
      userId: this.user.id,
      userName: this.user.name,
      userRole: this.user.role
    })
  }

  sendSignalingMessage(message) {
    if (this.signalingSocket && this.signalingSocket.readyState === WebSocket.OPEN) {
      this.signalingSocket.send(JSON.stringify(message))
    } else {
      console.error('❌ Cannot send message: signaling socket not ready')
    }
  }

  handleSignalingMessage(message) {
    console.log('📨 Received signaling message:', message.type)
    
    switch (message.type) {
      case 'joined-room':
        console.log('✅ Successfully joined room')
        break
        
      case 'user-joined':
        console.log('👤 User joined:', message.userName)
        this.updatePartnerInfo(message)
        
        // If we're the first user in the room, we become the initiator
        if (!this.peer) {
          this.isInitiator = true
          this.createPeerConnection()
        }
        break
        
      case 'user-left':
        console.log('👋 User left:', message.userName)
        this.handleUserLeft()
        break
        
      case 'offer':
        console.log('📞 Received offer')
        this.handleOffer(message.data)
        break
        
      case 'answer':
        console.log('📞 Received answer')
        this.handleAnswer(message.data)
        break
        
      case 'ice-candidate':
        console.log('🧊 Received ICE candidate')
        this.handleIceCandidate(message.data)
        break
        
      case 'chat-message':
        this.handleChatMessage(message)
        break
        
      case 'error':
        console.error('❌ Signaling error:', message.message)
        this.showError(message.message)
        break
    }
  }

  createPeerConnection() {
    console.log('🤝 Creating peer connection...')
    
    // Use free STUN servers for NAT traversal
    const configuration = {
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:stun1.l.google.com:19302' },
        { urls: 'stun:stun2.l.google.com:19302' }
      ]
    }

    this.peer = new RTCPeerConnection(configuration)

    // Add local stream tracks to the peer connection
    this.localStream.getTracks().forEach(track => {
      this.peer.addTrack(track, this.localStream)
    })

    // Handle remote stream
    this.peer.ontrack = (event) => {
      console.log('🎥 Received remote stream')
      this.remoteStream = event.streams[0]
      
      const remoteVideo = document.getElementById('partnerVideo')
      if (remoteVideo) {
        remoteVideo.srcObject = this.remoteStream
        // Hide mock video
        const mockPartner = document.getElementById('mockPartnerVideo')
        if (mockPartner) mockPartner.style.display = 'none'
      }
      
      this.isConnected = true
      this.addSystemMessage('Video connection established! 🎉')
    }

    // Handle ICE candidates
    this.peer.onicecandidate = (event) => {
      if (event.candidate) {
        console.log('🧊 Sending ICE candidate')
        this.sendSignalingMessage({
          type: 'ice-candidate',
          roomId: this.roomId,
          userId: this.user.id,
          data: event.candidate
        })
      }
    }

    // Handle connection state changes
    this.peer.onconnectionstatechange = () => {
      console.log('🔗 Connection state:', this.peer.connectionState)
      
      if (this.peer.connectionState === 'connected') {
        this.addSystemMessage('Connected successfully!')
      } else if (this.peer.connectionState === 'disconnected') {
        this.addSystemMessage('Connection lost. Trying to reconnect...')
      } else if (this.peer.connectionState === 'failed') {
        this.addSystemMessage('Connection failed. Please refresh and try again.')
      }
    }

    // If we're the initiator, create and send offer
    if (this.isInitiator) {
      this.createOffer()
    }
  }

  async createOffer() {
    try {
      console.log('📞 Creating offer...')
      const offer = await this.peer.createOffer()
      await this.peer.setLocalDescription(offer)
      
      this.sendSignalingMessage({
        type: 'offer',
        roomId: this.roomId,
        userId: this.user.id,
        data: offer
      })
    } catch (error) {
      console.error('❌ Failed to create offer:', error)
    }
  }

  async handleOffer(offer) {
    try {
      console.log('📞 Handling offer...')
      
      if (!this.peer) {
        this.createPeerConnection()
      }
      
      await this.peer.setRemoteDescription(offer)
      
      const answer = await this.peer.createAnswer()
      await this.peer.setLocalDescription(answer)
      
      this.sendSignalingMessage({
        type: 'answer',
        roomId: this.roomId,
        userId: this.user.id,
        data: answer
      })
    } catch (error) {
      console.error('❌ Failed to handle offer:', error)
    }
  }

  async handleAnswer(answer) {
    try {
      console.log('📞 Handling answer...')
      await this.peer.setRemoteDescription(answer)
    } catch (error) {
      console.error('❌ Failed to handle answer:', error)
    }
  }

  async handleIceCandidate(candidate) {
    try {
      if (this.peer && this.peer.remoteDescription) {
        await this.peer.addIceCandidate(candidate)
      }
    } catch (error) {
      console.error('❌ Failed to add ICE candidate:', error)
    }
  }

  updatePartnerInfo(message) {
    const partnerRole = document.getElementById('partnerRole')
    if (partnerRole) {
      partnerRole.textContent = message.userRole === 'student' ? 'Student' : 'CEO'
    }

    // Update mock video with partner info
    const mockPartner = document.getElementById('mockPartnerVideo')
    if (mockPartner) {
      const icon = message.userRole === 'student' ? '🎓' : '👑'
      mockPartner.innerHTML = `
        <div class="text-center">
          <div class="text-6xl mb-4">${icon}</div>
          <p class="font-sketch text-xl">${message.userName}</p>
          <p class="font-handwritten text-sm">Connecting...</p>
        </div>
      `
    }
  }

  handleUserLeft() {
    this.addSystemMessage('Your partner has left the conversation.')
    
    // Clean up peer connection
    if (this.peer) {
      this.peer.close()
      this.peer = null
    }
    
    this.isConnected = false
    
    // Show reconnection option
    setTimeout(() => {
      if (confirm('Your partner left the conversation. Would you like to find a new match?')) {
        window.location.href = '/dashboard'
      }
    }, 2000)
  }

  // Chat functionality
  sendChatMessage() {
    const input = document.getElementById('chatInput')
    const message = input.value.trim()
    
    if (message) {
      this.sendSignalingMessage({
        type: 'chat-message',
        roomId: this.roomId,
        userId: this.user.id,
        message: message
      })
      
      // Clear input
      input.value = ''
    }
  }

  handleChatMessage(message) {
    this.addChatMessage(message.userName, message.message, message.userRole)
  }

  addChatMessage(sender, text, role) {
    const chatMessages = document.getElementById('chatMessages')
    const messageDiv = document.createElement('div')
    messageDiv.className = 'bg-gray-800 p-3 rounded border border-gray-600'
    
    const isMe = sender === this.user.name
    const senderColor = isMe ? 'text-blue-300' : (role === 'student' ? 'text-green-300' : 'text-purple-300')
    
    messageDiv.innerHTML = `
      <span class="font-sketch text-sm ${senderColor}">${isMe ? 'You' : sender}:</span>
      <p class="font-handwritten text-sm mt-1">${text}</p>
    `
    
    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  addSystemMessage(message) {
    const chatMessages = document.getElementById('chatMessages')
    const messageDiv = document.createElement('div')
    messageDiv.className = 'bg-gray-700 p-2 rounded border border-gray-500'
    messageDiv.innerHTML = `
      <span class="font-sketch text-xs text-yellow-300">System:</span>
      <p class="font-handwritten text-xs mt-1 text-yellow-200">${message}</p>
    `
    chatMessages.appendChild(messageDiv)
    chatMessages.scrollTop = chatMessages.scrollHeight
  }

  // Media controls
  toggleMute() {
    this.isMuted = !this.isMuted
    
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = !this.isMuted
      })
    }
    
    const muteIcon = document.getElementById('muteIcon')
    if (muteIcon) {
      muteIcon.textContent = this.isMuted ? '🔇' : '🎤'
    }
    
    this.addSystemMessage(this.isMuted ? 'Microphone muted' : 'Microphone unmuted')
  }

  toggleVideo() {
    this.isVideoOff = !this.isVideoOff
    
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = !this.isVideoOff
      })
    }
    
    const videoIcon = document.getElementById('videoIcon')
    if (videoIcon) {
      videoIcon.textContent = this.isVideoOff ? '📹❌' : '📹'
    }
    
    const mockVideo = document.getElementById('mockLocalVideo')
    if (mockVideo && this.isVideoOff) {
      mockVideo.style.display = 'flex'
      mockVideo.innerHTML = `
        <div class="text-center">
          <div class="text-6xl mb-4">📷❌</div>
          <p class="font-sketch text-xl">Camera Off</p>
        </div>
      `
    } else if (mockVideo && !this.isVideoOff) {
      mockVideo.style.display = 'none'
    }
    
    this.addSystemMessage(this.isVideoOff ? 'Camera turned off' : 'Camera turned on')
  }

  // End call functionality
  async endCall() {
    if (!confirm('Are you sure you want to end this call?')) {
      return
    }

    try {
      // Calculate call duration
      const duration = Math.floor((Date.now() - this.callStartTime) / 1000)
      
      // Close peer connection
      if (this.peer) {
        this.peer.close()
      }
      
      // Close signaling connection
      if (this.signalingSocket) {
        this.signalingSocket.close()
      }
      
      // Stop local media streams
      if (this.localStream) {
        this.localStream.getTracks().forEach(track => track.stop())
      }
      
      // Store call duration for donation page
      sessionStorage.setItem('lastCallDuration', duration.toString())
      
      // Redirect to donation page
      window.location.href = '/donation'
      
    } catch (error) {
      console.error('❌ End call error:', error)
      // Still redirect even if there's an error
      window.location.href = '/donation'
    }
  }

  nextConversation() {
    if (confirm('Are you sure you want to move to the next conversation?')) {
      this.endCall().then(() => {
        window.location.href = '/dashboard'
      })
    }
  }

  // UI setup
  setupUI() {
    // Chat input handler
    const chatInput = document.getElementById('chatInput')
    if (chatInput) {
      chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          this.sendChatMessage()
        }
      })
    }

    // Update user role display
    const userRole = document.getElementById('userRole')
    if (userRole) {
      userRole.textContent = this.user.role === 'student' ? 'Student' : 'CEO'
    }

    // Update call duration every second
    this.updateCallDuration()
    setInterval(() => this.updateCallDuration(), 1000)

    // Add initial system message
    this.addSystemMessage('Welcome! Connecting to your conversation partner...')
  }

  updateCallDuration() {
    const duration = Math.floor((Date.now() - this.callStartTime) / 1000)
    const minutes = Math.floor(duration / 60).toString().padStart(2, '0')
    const seconds = (duration % 60).toString().padStart(2, '0')
    
    const durationElement = document.getElementById('callDuration')
    if (durationElement) {
      durationElement.textContent = `${minutes}:${seconds}`
    }
  }

  showError(message) {
    this.addSystemMessage(`❌ Error: ${message}`)
    
    // Show error in UI
    const mockLocal = document.getElementById('mockLocalVideo')
    if (mockLocal) {
      mockLocal.innerHTML = `
        <div class="text-center">
          <div class="text-4xl mb-4">❌</div>
          <p class="font-sketch text-lg">Error</p>
          <p class="font-handwritten text-sm">${message}</p>
        </div>
      `
    }
  }

  showCameraError() {
    const mockLocal = document.getElementById('mockLocalVideo')
    if (mockLocal) {
      mockLocal.innerHTML = `
        <div class="text-center">
          <div class="text-4xl mb-4">📷❌</div>
          <p class="font-sketch text-lg">Camera Access Denied</p>
          <p class="font-handwritten text-sm">Please allow camera and microphone access</p>
          <button onclick="location.reload()" class="mt-2 px-4 py-2 bg-blue-500 text-white rounded">
            Try Again
          </button>
        </div>
      `
    }
  }
}

// Global functions for video call page
let webrtcInstance = null

function initializeWebRTC(roomId, user) {
  console.log('🚀 Starting WebRTC for room:', roomId)
  webrtcInstance = new MentorMatchRTC(roomId, user)
}

function toggleMute() {
  if (webrtcInstance) {
    webrtcInstance.toggleMute()
  }
}

function toggleVideo() {
  if (webrtcInstance) {
    webrtcInstance.toggleVideo()
  }
}

function sendMessage() {
  if (webrtcInstance) {
    webrtcInstance.sendChatMessage()
  }
}

function handleChatEnter(event) {
  if (event.key === 'Enter' && webrtcInstance) {
    webrtcInstance.sendChatMessage()
  }
}

function nextConversation() {
  if (webrtcInstance) {
    webrtcInstance.nextConversation()
  }
}

function endCall() {
  if (webrtcInstance) {
    webrtcInstance.endCall()
  }
}

function shareScreen() {
  // TODO: Implement screen sharing
  if (webrtcInstance) {
    webrtcInstance.addSystemMessage('Screen sharing coming soon! 📺')
  }
}