export function renderSidebar(state) {
  const activePage = state.route;
  const user = state.user;
  const isOpen = state.isSidebarOpen;

  const links = [
    { label: 'Tools', path: '#tools', icon: 'fa-toolbox' },
    { label: 'Dashboard', path: '#dashboard', icon: 'fa-chart-line' },
    { label: 'Pricing', path: '#pricing', icon: 'fa-tags' },
    { label: 'API Docs', path: '#api', icon: 'fa-code' }
  ];

  const linksHtml = links.map(link => {
    const isActive = activePage === link.path.substring(1) || (link.path === '#tools' && activePage.startsWith('tool'));
    const bgClass = isActive 
      ? 'bg-purple-600/10 border-l-4 border-purple-500 text-purple-400 font-semibold' 
      : 'text-slate-400 hover:bg-slate-800/30 hover:text-white border-l-4 border-transparent';
    return `
      <a href="${link.path}" class="flex items-center space-x-3 px-4 py-3 text-sm transition-all ${bgClass}">
        <i class="fa-solid ${link.icon} w-5"></i>
        <span>${link.label}</span>
      </a>
    `;
  }).join('');

  return `
    <div id="sidebar-overlay" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}" style="display: ${isOpen ? 'block' : 'none'};">
      <div id="sidebar-panel" class="absolute top-0 right-0 w-80 h-full bg-[#0d0a1c] border-l border-purple-500/10 flex flex-col justify-between shadow-2xl transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}">
        
        <!-- Header -->
        <div class="p-4 border-b border-purple-500/10 flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <span class="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
              <i class="fa-solid fa-bolt text-sm"></i>
            </span>
            <span class="text-lg font-bold font-display bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">CloudConvert</span>
          </div>
          <button id="sidebar-close-btn" class="w-8 h-8 rounded-full border border-purple-500/10 hover:border-purple-500/30 flex items-center justify-center text-slate-400 hover:text-white cursor-pointer">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <!-- Search Bar (Mobile-specific) -->
        <div class="px-4 py-2 border-b border-purple-500/10">
          <div class="relative">
            <input 
              type="text" 
              id="sidebar-search" 
              placeholder="Search tools..." 
              class="glass-input w-full text-xs rounded-full py-2.5 pl-9 pr-4 text-slate-300"
            />
            <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-[10px] text-slate-400"></i>
            
            <div id="sidebar-search-results" class="absolute top-12 left-0 w-full bg-slate-950/95 border border-purple-500/20 rounded-xl shadow-2xl p-2 hidden z-50">
              <div id="sidebar-search-list" class="max-h-48 overflow-y-auto space-y-1">
                <!-- Dynamic match list -->
              </div>
            </div>
          </div>
        </div>

        <!-- Body Links -->
        <div class="flex-1 py-4 overflow-y-auto">
          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">navigation</div>
          <nav class="space-y-1">
            ${linksHtml}
          </nav>

          <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-4 mt-6 mb-2">tool categories</div>
          <nav class="space-y-0.5 px-2">
            <a href="#tools" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800/30 hover:text-white transition">
              <i class="fa-solid fa-compress text-rose-400 w-4"></i>
              <span>Compress & Optimize</span>
            </a>
            <a href="#tools" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800/30 hover:text-white transition">
              <i class="fa-solid fa-arrow-right-to-bracket text-emerald-400 w-4"></i>
              <span>Convert to PDF</span>
            </a>
            <a href="#tools" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800/30 hover:text-white transition">
              <i class="fa-solid fa-arrow-right-from-bracket text-blue-400 w-4"></i>
              <span>Convert from PDF</span>
            </a>
            <a href="#tools" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800/30 hover:text-white transition">
              <i class="fa-solid fa-folder-tree text-purple-400 w-4"></i>
              <span>Organize Documents</span>
            </a>
            <a href="#tools" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800/30 hover:text-white transition">
              <i class="fa-solid fa-pen-to-square text-pink-400 w-4"></i>
              <span>View & Edit Images</span>
            </a>
            <a href="#tools" class="flex items-center space-x-3 px-3 py-2 rounded-lg text-xs text-slate-400 hover:bg-slate-800/30 hover:text-white transition">
              <i class="fa-solid fa-photo-film text-yellow-400 w-4"></i>
              <span>Audio & Media Tools</span>
            </a>
          </nav>
        </div>

        <!-- Footer / User profile -->
        <div class="p-4 border-t border-purple-500/10 bg-slate-950/40">
          ${user ? `
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
                  ${user.name.substring(0,2).toUpperCase()}
                </div>
                <div>
                  <h4 class="text-sm font-semibold text-slate-200">${user.name}</h4>
                  <p class="text-[10px] text-purple-400">Pro Account</p>
                </div>
              </div>
              <button id="sidebar-logout" class="w-8 h-8 rounded-full border border-red-500/10 hover:border-red-500/40 flex items-center justify-center text-slate-400 hover:text-red-400 cursor-pointer">
                <i class="fa-solid fa-right-from-bracket text-xs"></i>
              </button>
            </div>
          ` : `
            <a href="#login" class="block w-full text-center glow-btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-semibold py-3 rounded-xl shadow-lg shadow-purple-500/20">
              Sign In / Sign Up
            </a>
          `}
        </div>

      </div>
    </div>
  `;
}
