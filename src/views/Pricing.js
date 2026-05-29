export function renderPricing(state) {
  const isYearly = state.pricingYearly || false;
  const user = state.user;

  // Prices
  const proPrice = isYearly ? 7 : 9;
  const entPrice = isYearly ? 39 : 49;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 w-full flex-grow text-center space-y-12">
      
      <!-- Headers -->
      <div class="max-w-2xl mx-auto space-y-4">
        <!-- Small badge -->
        <span class="inline-flex items-center bg-purple-900/10 border border-purple-500/10 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-widest text-purple-400 uppercase">
          Flexible Subscriptions
        </span>
        <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight font-display text-slate-100">
          Plans Built for Creators & Developers
        </h1>
        <p class="text-xs sm:text-sm text-slate-400 leading-relaxed">
          Unlock unlimited batch conversions, increase file upload limits up to 2 GB, and access programmatically via sandbox tokens.
        </p>
      </div>

      <!-- Monthly / Yearly Billing Toggle -->
      <div class="flex items-center justify-center space-x-4">
        <span class="text-xs ${!isYearly ? 'text-purple-400 font-bold' : 'text-slate-500'} transition">Billed Monthly</span>
        <button 
          id="billing-cycle-toggle" 
          class="relative w-12 h-6 bg-slate-800 border border-purple-500/20 rounded-full flex items-center p-0.5 cursor-pointer focus:outline-none"
        >
          <div class="w-4.5 h-4.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-md transition-transform duration-300 transform ${isYearly ? 'translate-x-6' : 'translate-x-0'}"></div>
        </button>
        <span class="text-xs ${isYearly ? 'text-purple-400 font-bold' : 'text-slate-500'} flex items-center transition">
          Billed Annually
          <span class="text-[9px] bg-emerald-950 border border-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full ml-1.5 uppercase">Save 20%</span>
        </span>
      </div>

      <!-- Pricing Card Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto pt-6">
        
        <!-- Card 1: Free Sandbox -->
        <div class="glass-card p-8 rounded-3xl text-left border border-purple-500/5 hover:border-purple-500/15 flex flex-col justify-between relative overflow-hidden">
          <div class="space-y-6">
            <div>
              <h3 class="text-base font-bold text-slate-200">Sandbox Free</h3>
              <p class="text-xs text-slate-400 mt-1">For casual file adjustments</p>
            </div>
            
            <div class="flex items-baseline text-slate-100">
              <span class="text-4xl font-extrabold tracking-tight font-display">$0</span>
              <span class="ml-1 text-xs text-slate-500">/ month</span>
            </div>

            <!-- Features list -->
            <ul class="space-y-3.5 text-xs text-slate-400">
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>100 MB maximum upload size</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>5 conversion logs per day</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>Basic client-side processing</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>Standard email support</span>
              </li>
            </ul>
          </div>

          <button 
            data-plan="free" 
            class="plan-action-btn mt-8 block w-full text-center border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/40 text-slate-300 font-bold text-xs py-3 rounded-xl transition cursor-pointer"
          >
            ${user ? 'Current Tier' : 'Choose Free'}
          </button>
        </div>

        <!-- Card 2: Pro Creator (Recommended) -->
        <div class="glass-card p-8 rounded-3xl text-left border-2 border-purple-500/40 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-purple-950/10 to-pink-950/10 shadow-xl shadow-purple-500/5">
          <!-- Glow badge -->
          <div class="absolute top-0 right-0 bg-gradient-to-l from-purple-600 to-pink-500 text-white text-[9px] font-bold uppercase tracking-wider px-3.5 py-1 rounded-bl-xl shadow-md">
            RECOMMENDED
          </div>

          <div class="space-y-6">
            <div>
              <h3 class="text-base font-bold text-slate-200">Pro Creator</h3>
              <p class="text-xs text-slate-400 mt-1">For professionals & developers</p>
            </div>
            
            <div class="flex items-baseline text-slate-100">
              <span class="text-4xl font-extrabold tracking-tight font-display">$${proPrice}</span>
              <span class="ml-1 text-xs text-slate-500">/ month</span>
            </div>

            <!-- Features list -->
            <ul class="space-y-3.5 text-xs text-slate-400">
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-pink-400 text-[10px]"></i>
                <span><strong class="text-slate-300">2 GB</strong> maximum upload size</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-pink-400 text-[10px]"></i>
                <span><strong class="text-slate-300">Unlimited</strong> daily operations</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-pink-400 text-[10px]"></i>
                <span>Priority high-speed pipeline</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-pink-400 text-[10px]"></i>
                <span>Interactive sandbox API access</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-pink-400 text-[10px]"></i>
                <span>Priority support desk routing</span>
              </li>
            </ul>
          </div>

          <button 
            data-plan="pro" 
            class="plan-action-btn mt-8 block w-full text-center glow-btn bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-xs py-3 rounded-xl shadow-lg shadow-purple-500/20 cursor-pointer"
          >
            Upgrade to Pro
          </button>
        </div>

        <!-- Card 3: Enterprise Scale -->
        <div class="glass-card p-8 rounded-3xl text-left border border-purple-500/5 hover:border-purple-500/15 flex flex-col justify-between relative overflow-hidden">
          <div class="space-y-6">
            <div>
              <h3 class="text-base font-bold text-slate-200">Enterprise</h3>
              <p class="text-xs text-slate-400 mt-1">For organizations and high volumes</p>
            </div>
            
            <div class="flex items-baseline text-slate-100">
              <span class="text-4xl font-extrabold tracking-tight font-display">$${entPrice}</span>
              <span class="ml-1 text-xs text-slate-500">/ month</span>
            </div>

            <!-- Features list -->
            <ul class="space-y-3.5 text-xs text-slate-400">
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span><strong class="text-slate-300">Unlimited</strong> upload file size</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>Isolated high-performance instances</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>Production API integration keys</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>Dedicated accounts manager</span>
              </li>
              <li class="flex items-center space-x-2.5">
                <i class="fa-solid fa-circle-check text-purple-400 text-[10px]"></i>
                <span>99.9% uptime SLA guarantee</span>
              </li>
            </ul>
          </div>

          <button 
            data-plan="enterprise" 
            class="plan-action-btn mt-8 block w-full text-center border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/40 text-slate-300 font-bold text-xs py-3 rounded-xl transition cursor-pointer"
          >
            Contact Sales
          </button>
        </div>

      </div>

      <!-- Trust Badges Block -->
      <div class="max-w-4xl mx-auto pt-8 border-t border-purple-500/5 grid grid-cols-2 md:grid-cols-4 gap-6 text-slate-500 text-xs">
        <div class="space-y-1">
          <i class="fa-solid fa-shield-halved text-purple-500 text-base mb-1.5"></i>
          <h5 class="font-bold text-slate-300">ISO-27001 Secure</h5>
          <p class="text-[10px] text-slate-500">Industry grade encryptions</p>
        </div>
        <div class="space-y-1">
          <i class="fa-solid fa-wallet text-purple-500 text-base mb-1.5"></i>
          <h5 class="font-bold text-slate-300">Secure Payments</h5>
          <p class="text-[10px] text-slate-500">Stripe and Paypal encrypted</p>
        </div>
        <div class="space-y-1">
          <i class="fa-solid fa-arrows-rotate text-purple-500 text-base mb-1.5"></i>
          <h5 class="font-bold text-slate-300">Money Back Guarantee</h5>
          <p class="text-[10px] text-slate-500">14-day hassle free refund</p>
        </div>
        <div class="space-y-1">
          <i class="fa-solid fa-headset text-purple-500 text-base mb-1.5"></i>
          <h5 class="font-bold text-slate-300">24/7 Priority Support</h5>
          <p class="text-[10px] text-slate-500">Average response < 1 hr</p>
        </div>
      </div>

      <!-- Purchase Flow Dialog Simulator -->
      <div id="checkout-modal" class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center hidden opacity-0 transition-opacity duration-300">
        <div class="glass-card max-w-md w-full rounded-3xl p-8 text-center space-y-6 mx-4 relative border border-purple-500/20 shadow-2xl">
          <!-- Closing -->
          <button id="modal-close" class="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"><i class="fa-solid fa-xmark text-sm"></i></button>

          <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/10 animate-bounce-slow">
            <i class="fa-solid fa-gem animate-pulse-glow"></i>
          </div>

          <div class="space-y-2">
            <h3 class="text-lg font-bold font-display text-slate-100">Plan Activated Successfully!</h3>
            <p class="text-xs text-slate-400">Welcome to your premium developer workspace. All SaaS processing limits have been adjusted.</p>
          </div>

          <div class="bg-slate-950/60 p-4 border border-purple-500/10 rounded-2xl text-left space-y-2">
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Account Username:</span>
              <span class="text-slate-200 font-semibold" id="modal-username">Pro Creator</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">Subscription Status:</span>
              <span class="text-emerald-400 font-bold">Active (Paid)</span>
            </div>
            <div class="flex justify-between text-xs">
              <span class="text-slate-400">File Processing Limit:</span>
              <span class="text-slate-200 font-semibold">2 GB / file</span>
            </div>
          </div>

          <button id="modal-workspace-redirect" class="glow-btn block w-full text-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-xs py-3.5 rounded-xl cursor-pointer">
            Go to SaaS Workspace
          </button>
        </div>
      </div>

    </div>
  `;
}

export function initPricing(state, parentEl, triggerStateUpdateCallback) {
  const cycleToggle = parentEl.querySelector('#billing-cycle-toggle');
  cycleToggle.addEventListener('click', () => {
    triggerStateUpdateCallback({ pricingYearly: !state.pricingYearly });
  });

  const modal = parentEl.querySelector('#checkout-modal');
  const modalClose = parentEl.querySelector('#modal-close');
  const modalRedirect = parentEl.querySelector('#modal-workspace-redirect');
  const modalUsername = parentEl.querySelector('#modal-username');

  parentEl.querySelectorAll('.plan-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const plan = btn.getAttribute('data-plan');
      
      if (plan === 'free') {
        // Clear auth user to set guest mode
        triggerStateUpdateCallback({ user: null });
        window.location.hash = '#dashboard';
        return;
      }

      // Upgrade to Pro/Enterprise mock
      const isEnterprise = plan === 'enterprise';
      const name = isEnterprise ? "Enterprise Dev" : "Pro Creator";
      
      const updatedUser = {
        name: name,
        email: isEnterprise ? "enterprise@cloudconvert.com" : "pro@cloudconvert.com",
        isPro: true
      };

      // Show modal
      modalUsername.innerText = name;
      modal.classList.remove('hidden');
      setTimeout(() => {
        modal.classList.add('opacity-100');
      }, 50);

      // Trigger update but hold routing until redirect click
      modalRedirect.onclick = () => {
        modal.classList.remove('opacity-100');
        setTimeout(() => {
          modal.classList.add('hidden');
          triggerStateUpdateCallback({ user: updatedUser });
          window.location.hash = '#dashboard';
        }, 300);
      };
    });
  });

  modalClose.addEventListener('click', () => {
    modal.classList.remove('opacity-100');
    setTimeout(() => {
      modal.classList.add('hidden');
    }, 300);
  });
}
