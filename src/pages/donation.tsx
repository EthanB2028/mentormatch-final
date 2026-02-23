export function DonationPage() {
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
        <svg class="absolute top-1/2 left-1/4 w-24 h-24 opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" stroke="black" stroke-width="2" fill="none" stroke-dasharray="10 5" />
        </svg>
      </div>

      <div class="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div class="text-center mb-12">
          <div class="scribble-border inline-block p-4 mb-6">
            <h1 class="text-3xl font-bold font-sketch">MentorMatch</h1>
          </div>
          <div class="scribble-border-large inline-block p-6">
            <h2 class="text-4xl md:text-5xl font-bold font-sketch mb-4 transform -rotate-1">
              Thanks for connecting! 💫
            </h2>
            <p class="text-xl font-handwritten max-w-2xl mx-auto">
                Help me keep these meaningful conversations flowing
            </p>
          </div>
        </div>

        {/* Call Summary */}
        <div class="text-center mb-12">
          <div class="scribble-border inline-block p-6 max-w-xl bg-gray-50">
            <h3 class="text-2xl font-bold font-sketch mb-4 transform rotate-1">Your Conversation</h3>
            <div class="space-y-2 font-handwritten text-lg">
              <p>Duration: <span id="callDuration" class="font-bold">5 minutes</span></p>
              <p>Connected with: <span id="partnerType" class="font-bold">A successful CEO</span></p>
              <p>Rating: ⭐⭐⭐⭐⭐</p>
            </div>
          </div>
        </div>

        {/* Donation Options */}
        <div class="text-center mb-12">
          <div class="scribble-border-large inline-block p-8 max-w-2xl">
            <h3 class="text-3xl font-bold font-sketch mb-6 transform -rotate-1">
                Support My Mission 🚀
            </h3>
            <p class="text-lg font-handwritten mb-8 leading-relaxed">
                Every donation helps me connect more students with inspiring leaders. 
                Your support makes these life-changing conversations possible!
            </p>

            {/* Donation Buttons */}
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <button onclick="donate(1)" 
                      class="donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:rotate-1 transition-all duration-300 bg-green-100 hover:bg-green-200">
                $1
                <div class="text-sm font-handwritten">Coffee Fund</div>
              </button>
              
              <button onclick="donate(5)" 
                      class="donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:-rotate-1 transition-all duration-300 bg-blue-100 hover:bg-blue-200">
                $5
                <div class="text-sm font-handwritten">Popular Choice</div>
              </button>
              
              <button onclick="donate(10)" 
                      class="donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:rotate-1 transition-all duration-300 bg-purple-100 hover:bg-purple-200">
                $10
                <div class="text-sm font-handwritten">Super Supporter</div>
              </button>
              
              <button onclick="showCustomAmount()" 
                      class="donation-btn scribble-button p-4 font-sketch text-lg hover:scale-105 hover:-rotate-1 transition-all duration-300 bg-yellow-100 hover:bg-yellow-200">
                Other
                <div class="text-sm font-handwritten">Choose Amount</div>
              </button>
            </div>

            {/* Custom Amount Input */}
            <div id="customAmountSection" class="hidden mb-6">
              <div class="scribble-border inline-block p-4">
                <input 
                  type="number" 
                  id="customAmount" 
                  placeholder="Enter amount" 
                  class="p-2 border-2 border-black border-dashed font-handwritten text-center w-32 mr-4"
                  min="1"
                  max="1000"
                />
                <button onclick="donateCustom()" 
                        class="scribble-button px-4 py-2 font-sketch bg-green-200 hover:bg-green-300">
                  Donate
                </button>
              </div>
            </div>

            {/* Skip Option */}
            <div class="text-center">
              <button onclick="skipDonation()" 
                      class="font-handwritten text-gray-600 hover:text-black underline transform hover:rotate-1 transition-all">
                  Skip for now (but I'd love your support next time!)
              </button>
            </div>
          </div>
        </div>

        {/* Impact Statement */}
        <div class="text-center mb-12">
          <div class="scribble-border inline-block p-6 max-w-2xl">
            <h4 class="text-xl font-bold font-sketch mb-4 transform rotate-1">Your Impact</h4>
            <div class="grid md:grid-cols-3 gap-6 font-handwritten">
              <div class="text-center">
                <div class="text-2xl mb-2">💡</div>
                <p class="text-sm">1,247 students inspired this month</p>
              </div>
              <div class="text-center">
                <div class="text-2xl mb-2">🤝</div>
                <p class="text-sm">563 meaningful connections made</p>
              </div>
              <div class="text-center">
                <div class="text-2xl mb-2">🎯</div>
                <p class="text-sm">89% report career clarity</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div class="text-center space-x-4">
          <button onclick="startNewConversation()" 
                  class="scribble-button px-6 py-3 font-sketch text-lg hover:rotate-1 transition-transform bg-blue-200 hover:bg-blue-300">
            Start Another Conversation
          </button>
          <a href="/" 
             class="scribble-button inline-block px-6 py-3 font-sketch text-lg hover:-rotate-1 transition-transform bg-gray-200 hover:bg-gray-300">
            Back to Home
          </a>
        </div>
      </div>

      {/* Success Modal */}
      <div id="donationModal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex items-center justify-center z-50">
        <div class="bg-white p-8 max-w-md mx-4 relative">
          <div class="scribble-border-large p-6 text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-2xl font-bold font-sketch mb-4 transform -rotate-1">
              Thanks for your support!
            </h3>
            <p class="font-handwritten text-lg mb-6">
                Your <span id="donatedAmount" class="font-bold">$5</span> donation helps me connect more students with amazing leaders like the one you just spoke with!
            </p>
            <div class="space-y-3 font-handwritten text-sm mb-6">
              <p>✅ Transaction completed successfully</p>
              <p>✅ Receipt sent to your email</p>
              <p>✅ You're making a difference!</p>
            </div>
            <button onclick="closeDonationModal()" 
                    class="scribble-button px-6 py-3 font-sketch bg-green-200 hover:bg-green-300">
              Continue
            </button>
          </div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        // Set user info from previous session
        document.addEventListener('DOMContentLoaded', function() {
          const userRole = sessionStorage.getItem('userRole') || 'student';
          const partnerType = userRole === 'student' ? 'A successful CEO' : 'An ambitious student';
          document.getElementById('partnerType').textContent = partnerType;
        });

        function donate(amount) {
          showDonationSuccess(amount);
        }

        function showCustomAmount() {
          document.getElementById('customAmountSection').classList.remove('hidden');
        }

        function donateCustom() {
          const amount = parseInt(document.getElementById('customAmount').value);
          if (amount && amount > 0) {
            showDonationSuccess(amount);
          } else {
            alert('Please enter a valid amount');
          }
        }

        function showDonationSuccess(amount) {
          document.getElementById('donatedAmount').textContent = '$' + amount;
          document.getElementById('donationModal').classList.remove('hidden');
          
          // Add some celebration effects
          document.querySelectorAll('.donation-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.6';
          });
        }

        function closeDonationModal() {
          document.getElementById('donationModal').classList.add('hidden');
        }

        function skipDonation() {
            if (confirm('Are you sure you want to skip? Your support really helps me keep this platform free for students!')) {
            // Maybe show a gentle reminder or alternative way to help
            alert('No worries! Consider sharing MentorMatch with friends who might benefit from it. 😊');
          }
        }

        function startNewConversation() {
          window.location.href = '/role-select';
        }

        // Add some random motivational messages
        const motivationalMessages = [
          "Every conversation has the power to change a life! 🌟",
          "You just participated in something amazing! 💫",
          "Great conversations create great futures! 🚀",
            "Thank you for being part of my community! 🤗"
        ];

        setTimeout(() => {
          const randomMessage = motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
          const messageDiv = document.createElement('div');
          messageDiv.className = 'fixed bottom-4 right-4 bg-yellow-100 p-4 scribble-border font-handwritten text-sm max-w-xs transform rotate-2 transition-opacity duration-500';
          messageDiv.textContent = randomMessage;
          document.body.appendChild(messageDiv);
          
          setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
          }, 4000);
        }, 2000);
        `
      }} />
    </div>
  )
}