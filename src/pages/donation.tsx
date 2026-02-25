export function DonationPage() {
  return (
    <div class="min-h-screen bg-gray-50">

      {/* Nav */}
      <nav class="bg-white border-b border-gray-100 shadow-sm">
        <div class="max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <a href="/" class="text-xl font-bold text-gray-900 hover:no-underline">
            Mentor<span class="text-indigo-600">Match</span>
          </a>
          <a href="/" class="text-sm font-semibold text-gray-500 hover:text-gray-700 hover:no-underline">
            Back to Home
          </a>
        </div>
      </nav>

      <div class="max-w-2xl mx-auto px-6 py-16">

        {/* Header */}
        <div class="text-center mb-10">
          <div class="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-5">
            💫
          </div>
          <h1 class="text-3xl font-bold text-gray-900 mb-3">Thanks for connecting!</h1>
          <p class="text-gray-500 text-base max-w-md mx-auto">
            Help keep these meaningful conversations flowing for students everywhere.
          </p>
        </div>

        {/* Call Summary */}
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-6 mb-6">
          <h2 class="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Your Session</h2>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Duration</span>
              <span id="callDuration" class="text-sm font-semibold text-gray-900">5 minutes</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Connected with</span>
              <span id="partnerType" class="text-sm font-semibold text-gray-900">A successful mentor</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm text-gray-600">Rating</span>
              <span class="text-sm font-semibold text-amber-500">★★★★★</span>
            </div>
          </div>
        </div>

        {/* Donation Card */}
        <div class="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 mb-6">
          <h2 class="text-xl font-bold text-gray-900 mb-2">Support the Mission</h2>
          <p class="text-gray-500 text-sm mb-6 leading-relaxed">
            Every donation helps connect more students with inspiring mentors. 100% of support goes toward keeping MentorMatch free.
          </p>

          {/* Donation buttons */}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <button
              onclick="donate(1)"
              class="donation-btn flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all"
            >
              <span class="text-xl font-bold text-gray-900">$1</span>
              <span class="text-xs text-gray-500 mt-0.5">Coffee</span>
            </button>
            <button
              onclick="donate(5)"
              class="donation-btn flex flex-col items-center justify-center p-4 border-2 border-indigo-400 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-all relative"
            >
              <span class="absolute -top-2 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">Popular</span>
              <span class="text-xl font-bold text-indigo-700">$5</span>
              <span class="text-xs text-indigo-500 mt-0.5">Supporter</span>
            </button>
            <button
              onclick="donate(10)"
              class="donation-btn flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all"
            >
              <span class="text-xl font-bold text-gray-900">$10</span>
              <span class="text-xs text-gray-500 mt-0.5">Champion</span>
            </button>
            <button
              onclick="showCustomAmount()"
              class="donation-btn flex flex-col items-center justify-center p-4 border-2 border-gray-200 rounded-xl hover:border-indigo-400 hover:bg-indigo-50 transition-all"
            >
              <span class="text-xl font-bold text-gray-900">✦</span>
              <span class="text-xs text-gray-500 mt-0.5">Custom</span>
            </button>
          </div>

          {/* Custom Amount */}
          <div id="customAmountSection" class="hidden mb-5">
            <div class="flex gap-3">
              <div class="relative flex-1">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">$</span>
                <input
                  type="number"
                  id="customAmount"
                  placeholder="Enter amount"
                  min="1"
                  max="1000"
                  class="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <button
                onclick="donateCustom()"
                class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-lg transition-colors"
              >
                Donate
              </button>
            </div>
          </div>

          {/* Skip */}
          <div class="text-center">
            <button
              onclick="skipDonation()"
              class="text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>

        {/* Impact Stats */}
        <div class="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl p-6 mb-6 text-white">
          <h3 class="text-sm font-bold uppercase tracking-widest opacity-80 mb-4">Your Impact</h3>
          <div class="grid grid-cols-3 gap-4 text-center">
            <div>
              <div class="text-2xl font-bold">1,247</div>
              <div class="text-xs text-indigo-200 mt-0.5">Students inspired</div>
            </div>
            <div>
              <div class="text-2xl font-bold">563</div>
              <div class="text-xs text-indigo-200 mt-0.5">Connections made</div>
            </div>
            <div>
              <div class="text-2xl font-bold">89%</div>
              <div class="text-xs text-indigo-200 mt-0.5">Career clarity</div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div class="flex gap-3">
          <button
            onclick="startNewConversation()"
            class="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold rounded-xl transition-colors"
          >
            Start Another Session
          </button>
          <a
            href="/"
            class="flex-1 py-3 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl transition-colors text-center hover:no-underline"
          >
            Back to Home
          </a>
        </div>
      </div>

      {/* Success Modal */}
      <div id="donationModal" class="fixed inset-0 bg-black/50 hidden items-center justify-center z-50 p-4" style="display:none">
        <div class="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center">
          <div class="text-5xl mb-4">🎉</div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Thank you!</h3>
          <p class="text-gray-500 text-sm mb-5 leading-relaxed">
            Your <span id="donatedAmount" class="font-bold text-gray-900">$5</span> donation helps connect more students with amazing mentors!
          </p>
          <div class="space-y-2 text-sm text-left bg-gray-50 rounded-xl p-4 mb-6">
            <p class="flex items-center gap-2 text-green-700"><span>✓</span> Transaction completed</p>
            <p class="flex items-center gap-2 text-green-700"><span>✓</span> Receipt sent to your email</p>
            <p class="flex items-center gap-2 text-green-700"><span>✓</span> You're making a difference!</p>
          </div>
          <button
            onclick="closeDonationModal()"
            class="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-colors"
          >
            Continue
          </button>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{
        __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const userRole = sessionStorage.getItem('userRole') || 'student';
          const partnerType = userRole === 'student' ? 'A successful mentor' : 'An ambitious student';
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
          const modal = document.getElementById('donationModal');
          modal.style.display = 'flex';
          document.querySelectorAll('.donation-btn').forEach(btn => {
            btn.style.pointerEvents = 'none';
            btn.style.opacity = '0.5';
          });
        }

        function closeDonationModal() {
          document.getElementById('donationModal').style.display = 'none';
        }

        function skipDonation() {
          if (confirm('Are you sure? Your support helps keep MentorMatch free for students!')) {
            alert('No worries! Consider sharing MentorMatch with someone who might benefit. 😊');
          }
        }

        function startNewConversation() {
          window.location.href = '/dashboard';
        }
        `
      }} />
    </div>
  )
}
