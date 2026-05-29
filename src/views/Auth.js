export function renderAuth(state) {
  const isSignUp = state.authSignUp || false;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full flex-grow flex items-center justify-center">
      
      <div class="glass-card max-w-md w-full rounded-3xl p-6 lg:p-8 border border-purple-500/10 shadow-2xl relative space-y-6">
        
        <!-- Toggle Tabs -->
        <div class="flex border-b border-purple-500/10 pb-4">
          <button 
            id="auth-tab-login" 
            class="flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${!isSignUp ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300'}"
          >
            Sign In
          </button>
          <button 
            id="auth-tab-signup" 
            class="flex-1 text-center py-2 text-xs font-bold uppercase tracking-wider transition cursor-pointer ${isSignUp ? 'text-purple-400 border-b-2 border-purple-500' : 'text-slate-500 hover:text-slate-300'}"
          >
            Create Account
          </button>
        </div>

        <!-- Form Container -->
        <form id="auth-form" class="space-y-4 text-left">
          ${isSignUp ? `
            <div class="space-y-1.5">
              <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Full Name</label>
              <div class="relative">
                <input 
                  type="text" 
                  name="fullname" 
                  placeholder="e.g. Jane Doe" 
                  class="glass-input w-full text-xs rounded-xl py-3 pl-10 pr-4"
                  required
                />
                <i class="fa-solid fa-user absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
              </div>
            </div>
          ` : ''}

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Email Address</label>
            <div class="relative">
              <input 
                type="email" 
                name="email" 
                placeholder="e.g. email@example.com" 
                class="glass-input w-full text-xs rounded-xl py-3 pl-10 pr-4"
                required
              />
              <i class="fa-solid fa-envelope absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
            </div>
          </div>

          <div class="space-y-1.5">
            <label class="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Password</label>
            <div class="relative">
              <input 
                type="password" 
                name="password" 
                placeholder="Min. 8 characters" 
                class="glass-input w-full text-xs rounded-xl py-3 pl-10 pr-4"
                required
              />
              <i class="fa-solid fa-key absolute left-3.5 top-3.5 text-xs text-slate-500"></i>
            </div>
          </div>

          <!-- Extra Controls -->
          <div class="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <label class="flex items-center space-x-2 cursor-pointer select-none">
              <input type="checkbox" name="remember" class="rounded text-purple-600 focus:ring-purple-500">
              <span>Remember me</span>
            </label>
            ${!isSignUp ? `
              <a href="#" class="hover:text-purple-400 transition hover:underline">Forgot password?</a>
            ` : ''}
          </div>

          <!-- Submit CTA -->
          <button type="submit" class="glow-btn block w-full text-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-purple-500/20 pt-2 cursor-pointer">
            ${isSignUp ? 'Create Workspace' : 'Launch Workspace'}
          </button>
        </form>

        <!-- Social Separator -->
        <div class="relative flex items-center justify-center my-4">
          <div class="absolute inset-0 flex items-center"><div class="w-full border-t border-purple-500/10"></div></div>
          <span class="relative bg-[#0d0a1c] dark:bg-[#050212] px-3 text-[10px] text-slate-500 uppercase tracking-wider font-bold">Or Connect With</span>
        </div>

        <!-- Social Buttons -->
        <div class="grid grid-cols-2 gap-3">
          <button id="auth-google" class="glass-card hover:bg-slate-900/40 p-2.5 rounded-xl border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-center gap-2 text-xs text-slate-300 transition cursor-pointer">
            <i class="fa-brands fa-google text-rose-500"></i>
            <span>Google</span>
          </button>
          <button id="auth-github" class="glass-card hover:bg-slate-900/40 p-2.5 rounded-xl border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-center gap-2 text-xs text-slate-300 transition cursor-pointer">
            <i class="fa-brands fa-github text-slate-400"></i>
            <span>GitHub</span>
          </button>
        </div>

      </div>

    </div>
  `;
}

export function initAuth(state, parentEl, triggerStateUpdateCallback) {
  const form = parentEl.querySelector('#auth-form');
  const loginTab = parentEl.querySelector('#auth-tab-login');
  const signupTab = parentEl.querySelector('#auth-tab-signup');

  loginTab.addEventListener('click', () => triggerStateUpdateCallback({ authSignUp: false }));
  signupTab.addEventListener('click', () => triggerStateUpdateCallback({ authSignUp: true }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Read form values
    const data = new FormData(form);
    const email = data.get('email');
    const name = state.authSignUp ? data.get('fullname') : email.split('@')[0];

    const mockUser = {
      name: name,
      email: email,
      isPro: false
    };

    triggerStateUpdateCallback({ user: mockUser });
    window.location.hash = '#dashboard';
  });

  // Social mocks
  parentEl.querySelector('#auth-google').onclick = triggerSocialMock;
  parentEl.querySelector('#auth-github').onclick = triggerSocialMock;

  function triggerSocialMock() {
    const mockUser = {
      name: "Oauth Developer",
      email: "oauth@developer.com",
      isPro: false
    };
    triggerStateUpdateCallback({ user: mockUser });
    window.location.hash = '#dashboard';
  }
}
