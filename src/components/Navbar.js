import { tools } from '../data/tools.js';

export function renderNavbar(state) {
  const activePage = state.route;
  const user = state.user;
  const isDark = state.theme === 'dark';

  const otherLinks = [
    { label: 'Dashboard', path: '#dashboard', icon: 'fa-chart-line' },
    { label: 'Pricing', path: '#pricing', icon: 'fa-tags' },
    { label: 'API Docs', path: '#api', icon: 'fa-code' }
  ];

  const otherLinksHtml = otherLinks.map(link => {
    const isActive = activePage === link.path.substring(1);
    const activeClass = isActive 
      ? 'text-purple-500 font-semibold' 
      : 'text-slate-600 dark:text-slate-300 hover:text-purple-500 dark:hover:text-purple-400';
    return `
      <a href="${link.path}" class="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm ${activeClass}">
        <i class="fa-solid ${link.icon} text-xs"></i>
        <span>${link.label}</span>
      </a>
    `;
  }).join('');

  const megaMenuConfig = [
    {
      title: "Compress",
      icon: "fa-compress text-rose-400",
      links: [
        { id: "pdf-compress", name: "Compress PDF" },
        { id: "image-compress", name: "Compress Image" },
        { id: "video-compress", name: "Compress Video" },
        { id: "audio-compress", name: "Compress Audio" }
      ]
    },
    {
      title: "Convert to PDF",
      icon: "fa-arrow-right-to-bracket text-emerald-400",
      links: [
        { id: "word-to-pdf", name: "Word to PDF" },
        { id: "jpg-to-pdf", name: "Image to PDF" },
        { id: "txt-to-pdf", name: "TXT to PDF" },
        { id: "excel-to-pdf", name: "Excel to PDF" },
        { id: "powerpoint-to-pdf", name: "PPT to PDF" }
      ]
    },
    {
      title: "Convert from PDF",
      icon: "fa-arrow-right-from-bracket text-blue-400",
      links: [
        { id: "pdf-to-word", name: "PDF to Word" },
        { id: "pdf-to-jpg", name: "PDF to JPG" },
        { id: "docx-converter", name: "DOCX Converter" },
        { id: "mp4-converter", name: "MP4 Converter" }
      ]
    },
    {
      title: "Organize & Secure",
      icon: "fa-folder-tree text-purple-400",
      links: [
        { id: "pdf-merge", name: "PDF Merge" },
        { id: "pdf-split", name: "PDF Split" },
        { id: "pdf-rotate", name: "PDF Rotate" },
        { id: "pdf-protect", name: "PDF Protect" },
        { id: "pdf-unlock", name: "PDF Unlock" }
      ]
    },
    {
      title: "View & Edit",
      icon: "fa-pen-to-square text-pink-400",
      links: [
        { id: "bg-remover", name: "BG Remover" },
        { id: "image-resizer", name: "Image Resizer" },
        { id: "image-cropper", name: "Image Cropper" },
        { id: "image-rotate", name: "Image Rotate" }
      ]
    },
    {
      title: "Audio & Media",
      icon: "fa-photo-film text-yellow-500",
      links: [
        { id: "volume-booster", name: "Volume Booster" },
        { id: "mp3-converter", name: "MP3 Converter" },
        { id: "audio-cut", name: "Audio Cutter" },
        { id: "video-to-gif", name: "Video to GIF" }
      ]
    }
  ];

  return `
    <nav class="glass-nav sticky top-0 left-0 w-full z-40 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a href="#landing" class="flex items-center space-x-2">
              <span class="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-purple-500/30">
                <i class="fa-solid fa-bolt text-lg"></i>
              </span>
              <span class="text-xl font-bold tracking-wider font-display bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 bg-clip-text text-transparent font-display">
                CloudConvert
              </span>
            </a>
          </div>

          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-1">
            
            <!-- Tools dropdown with Mega Menu -->
            <div class="relative group">
              <button 
                id="nav-tools-trigger" 
                class="flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 text-sm cursor-pointer ${activePage === 'tools' || activePage.startsWith('tool') ? 'text-purple-500 font-semibold' : 'text-slate-600 dark:text-slate-300 hover:text-purple-500 dark:hover:text-purple-400'}"
              >
                <i class="fa-solid fa-toolbox text-xs"></i>
                <span>Tools</span>
                <i class="fa-solid fa-chevron-down text-[8px] transition-transform duration-200 group-hover:rotate-180 ml-1"></i>
              </button>

              <!-- Mega Menu Dropdown -->
              <div class="absolute left-0 lg:left-1/2 lg:-translate-x-[25%] top-full mt-2 w-[85vw] max-w-4xl bg-slate-900/95 dark:bg-slate-950/95 border border-purple-500/10 rounded-3xl p-6 shadow-2xl backdrop-blur-2xl grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 invisible opacity-0 scale-95 origin-top group-hover:visible group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out z-50">
                ${megaMenuConfig.map(col => `
                  <div class="space-y-3 text-left">
                    <h4 class="text-[10px] font-bold text-purple-400 uppercase tracking-widest flex items-center gap-1.5 border-b border-purple-500/10 pb-2">
                      <i class="fa-solid ${col.icon.split(' ')[0]} ${col.icon.split(' ')[1]}"></i>
                      <span>${col.title}</span>
                    </h4>
                    <ul class="space-y-1.5">
                      ${col.links.map(link => `
                        <li>
                          <a 
                            href="#tool/${link.id}" 
                            class="block text-[11px] text-slate-400 hover:text-white transition duration-150 py-0.5 truncate hover:translate-x-1 transform"
                          >
                            ${link.name}
                          </a>
                        </li>
                      `).join('')}
                    </ul>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Other Desktop links -->
            ${otherLinksHtml}
          </div>

          <!-- Right controls: Search, Theme Toggle, Auth -->
          <div class="hidden md:flex items-center space-x-4">
            
            <!-- Search bar -->
            <div class="relative w-48 lg:w-64">
              <input 
                type="text" 
                id="nav-search" 
                placeholder="Search tools..." 
                class="glass-input w-full text-xs rounded-full py-2 pl-9 pr-4 text-slate-300 focus:outline-none"
              />
              <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-[10px] text-slate-400"></i>
              
              <!-- Search Results Dropdown -->
              <div id="search-results" class="absolute top-11 left-0 w-64 bg-slate-900/95 dark:bg-slate-950/95 border border-purple-500/20 rounded-xl shadow-2xl p-2 hidden backdrop-blur-xl z-50">
                <div class="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-2 py-1">matching tools</div>
                <div id="search-results-list" class="max-h-60 overflow-y-auto mt-1 space-y-1">
                  <!-- Injected via main.js -->
                </div>
              </div>
            </div>



            <!-- Auth status button -->
            ${user ? `
              <div class="flex items-center space-x-2 bg-purple-900/10 border border-purple-500/20 px-3 py-1.5 rounded-full">
                <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-[10px] font-bold text-white">
                  ${user.name.substring(0,2).toUpperCase()}
                </div>
                <span class="text-xs font-medium text-slate-300">${user.name}</span>
                <button id="nav-logout" class="text-slate-400 hover:text-red-400 transition ml-1 cursor-pointer">
                  <i class="fa-solid fa-right-from-bracket text-xs"></i>
                </button>
              </div>
            ` : `
              <a href="#login" class="glow-btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-full shadow-lg shadow-purple-500/25">
                Sign In
              </a>
            `}
          </div>

          <!-- Mobile Controls: Menu Button -->
          <div class="flex items-center md:hidden space-x-3">
            <button 
              id="mobile-menu-btn" 
              class="text-slate-600 dark:text-slate-300 hover:text-purple-500 focus:outline-none p-1.5 rounded-lg border border-purple-500/10 cursor-pointer"
            >
              <i class="fa-solid fa-bars text-lg"></i>
            </button>
          </div>

        </div>
      </div>
    </nav>
  `;
}
