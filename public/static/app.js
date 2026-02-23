// MentorMatch - Main Application JavaScript

// Global app state
const MentorMatch = {
  userRole: null,
  partnerId: null,
  isConnected: false,
  
  // Initialize the app
  init() {
    this.setupServiceWorker();
    this.addGlobalEventListeners();
    this.addRandomAnimations();
  },

  // Service Worker for offline functionality (future feature)
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      // Future: Add service worker for offline functionality
      console.log('Service Worker support detected');
    }
  },

  // Global event listeners
  addGlobalEventListeners() {
    // Add click sound effects to buttons
    document.addEventListener('click', (e) => {
      if (e.target.matches('.scribble-button, .scribble-card, .role-card')) {
        this.playClickSound();
      }
    });

    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      const tag = e.target.tagName;
      const isTyping = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || e.target.isContentEditable;

      // ESC to go back/home — only when not typing in a form field
      if (e.key === 'Escape' && !isTyping) {
        this.goHome();
      }
      
      // Space bar for quick actions — only when not in any form field
      if (e.key === ' ' && !isTyping) {
        e.preventDefault();
        this.handleSpacebarAction();
      }
    });

    // Add mouse hover effects
    document.addEventListener('mouseover', (e) => {
      if (e.target.matches('.scribble-button, .scribble-card')) {
        this.addHoverEffect(e.target);
      }
    });
  },

  // Add random floating animations to background decoration elements only
  addRandomAnimations() {
    // Only target SVGs explicitly marked as decorative — never touch button/spinner SVGs
    const backgroundElements = document.querySelectorAll('svg[data-decor]');
    backgroundElements.forEach((element, index) => {
      setTimeout(() => {
        element.style.animation = `wiggle ${2 + Math.random() * 3}s ease-in-out infinite`;
        element.style.animationDelay = `${Math.random() * 2}s`;
      }, index * 200);
    });
  },

  // Simulate click sound (visual feedback in console)
  playClickSound() {
    console.log('🔊 Click!');
    // Future: Add actual audio feedback
  },

  // Handle spacebar shortcuts
  handleSpacebarAction() {
    const currentPath = window.location.pathname;
    
    switch(currentPath) {
      case '/':
        // Go to role selection
        window.location.href = '/role-select';
        break;
      case '/role-select':
        // Auto-select student role
        if (typeof selectRole === 'function') {
          selectRole('student');
        }
        break;
      case '/video-call':
        // Toggle mute
        if (typeof toggleMute === 'function') {
          toggleMute();
        }
        break;
      case '/donation':
        // Quick $5 donation
        if (typeof donate === 'function') {
          donate(5);
        }
        break;
    }
  },

  // Go home function
  goHome() {
    if (window.location.pathname !== '/') {
      window.location.href = '/';
    }
  },

  // Add hover effects
  addHoverEffect(element) {
    element.style.transform += ' scale(1.02)';
    setTimeout(() => {
      element.style.transform = element.style.transform.replace(' scale(1.02)', '');
    }, 200);
  },

  // WebRTC functionality (mock for now)
  webRTC: {
    localStream: null,
    remoteStream: null,
    peerConnection: null,

    async initializeCamera() {
      try {
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
        });
        
        const localVideo = document.getElementById('localVideo');
        if (localVideo) {
          localVideo.srcObject = this.localStream;
          // Hide mock video
          const mockLocal = document.getElementById('mockLocalVideo');
          if (mockLocal) mockLocal.style.display = 'none';
        }
        
        console.log('✅ Camera initialized successfully');
        return true;
      } catch (error) {
        console.log('❌ Camera access denied or not available:', error.message);
        this.showCameraError();
        return false;
      }
    },

    showCameraError() {
      const mockLocal = document.getElementById('mockLocalVideo');
      if (mockLocal) {
        mockLocal.innerHTML = `
          <div class="text-center">
            <div class="text-4xl mb-4">📷❌</div>
            <p class="font-sketch text-lg">Camera not available</p>
            <p class="font-handwritten text-sm">Using mock video for demo</p>
          </div>
        `;
      }
    },

    async createPeerConnection() {
      // Mock implementation - in real app would use STUN/TURN servers
      console.log('🔄 Creating peer connection...');
      
      // Simulate connection process
      setTimeout(() => {
        console.log('✅ Peer connection established');
        MentorMatch.isConnected = true;
        
        // Update UI
        const mockPartner = document.getElementById('mockPartnerVideo');
        if (mockPartner) {
          mockPartner.innerHTML = `
            <div class="text-center">
              <div class="text-6xl mb-4">👤</div>
              <p class="font-sketch text-xl">Connected!</p>
            </div>
          `;
        }
      }, 2000);
    }
  },

  // Analytics and tracking (mock)
  analytics: {
    trackEvent(event, data = {}) {
      console.log(`📊 Analytics: ${event}`, data);
      
      // Future: Send to real analytics service
      const eventData = {
        event: event,
        timestamp: new Date().toISOString(),
        page: window.location.pathname,
        userAgent: navigator.userAgent,
        ...data
      };
      
      // Store in localStorage for now
      const events = JSON.parse(localStorage.getItem('mentormatch_events') || '[]');
      events.push(eventData);
      localStorage.setItem('mentormatch_events', JSON.stringify(events.slice(-50))); // Keep last 50 events
    },

    trackPageView() {
      this.trackEvent('page_view', {
        path: window.location.pathname,
        title: document.title
      });
    },

    trackConversationStart() {
      this.trackEvent('conversation_start', {
        userRole: MentorMatch.userRole
      });
    },

    trackDonation(amount) {
      this.trackEvent('donation', {
        amount: amount,
        userRole: MentorMatch.userRole
      });
    }
  },

  // Utility functions
  utils: {
    // Generate random conversation starters
    getConversationStarter() {
      const starters = [
        "What's the best piece of advice you've ever received?",
        "If you could tell your 18-year-old self one thing, what would it be?",
        "What's a skill you think every young person should develop?",
        "What's the biggest risk you've ever taken in your career?",
        "How do you define success?",
        "What's something you're passionate about outside of work?",
        "What's a mistake you made that taught you the most?",
        "How do you stay motivated when things get tough?",
        "What industry trends are you most excited about?",
        "What book or resource has had the biggest impact on your thinking?"
      ];
      
      return starters[Math.floor(Math.random() * starters.length)];
    },

    // Format time duration
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    },

    // Generate random ID
    generateId() {
      return Math.random().toString(36).substr(2, 9);
    },

    // Show notification
    showNotification(message, type = 'info') {
      const notification = document.createElement('div');
      notification.className = `fixed top-4 right-4 p-4 rounded scribble-border font-handwritten text-sm max-w-sm z-50 ${
        type === 'success' ? 'bg-green-100' : 
        type === 'error' ? 'bg-red-100' : 
        'bg-blue-100'
      }`;
      notification.textContent = message;
      
      document.body.appendChild(notification);
      
      // Animate in
      notification.style.opacity = '0';
      notification.style.transform = 'translateX(100px)';
      setTimeout(() => {
        notification.style.transition = 'all 0.3s ease';
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
      }, 100);
      
      // Remove after 4 seconds
      setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100px)';
        setTimeout(() => notification.remove(), 300);
      }, 4000);
    }
  }
};

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  MentorMatch.init();
  MentorMatch.analytics.trackPageView();
  
  // Auto-initialize camera on video call page
  if (window.location.pathname === '/video-call') {
    setTimeout(() => {
      MentorMatch.webRTC.initializeCamera();
      MentorMatch.webRTC.createPeerConnection();
    }, 1000);
  }
  
  console.log('🚀 MentorMatch initialized successfully!');
});

// Add some easter eggs
console.log(`
 ╭─────────────────────────────────────────╮
 │                                         │
 │        Welcome to MentorMatch! 🚀      │
 │                                         │
 │   Where conversations change lives      │
 │                                         │
 ╰─────────────────────────────────────────╯

 Quick shortcuts:
 - Press ESC to go home
 - Press SPACE for quick actions
 - Check console for debug info
`);

// Role selection function
function selectRole(role) {
  console.log(`🎯 Selected role: ${role}`);
  
  // Store role preference in localStorage
  localStorage.setItem('preferred_role', role);
  
  // Track the event
  MentorMatch.analytics.trackEvent('role_selected', { role: role });
  
  // Show notification
  const roleName = role === 'student' ? 'Student' : 'Leader';
  MentorMatch.utils.showNotification(
    `Great! You've selected ${roleName}. Redirecting to registration...`, 
    'success'
  );
  
  // Redirect to registration with role parameter
  setTimeout(() => {
    window.location.href = `/register?role=${role}`;
  }, 2000);
}

// Export for global access
window.MentorMatch = MentorMatch;
window.selectRole = selectRole;

// ── Scroll-reveal via IntersectionObserver ──
(function() {
  function initReveal() {
    const els = document.querySelectorAll('.reveal, .reveal-scale, .reveal-left, .reveal-right');
    if (!els.length) return;
    const io = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    els.forEach(function(el) { io.observe(el); });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initReveal);
  } else {
    initReveal();
  }
})();