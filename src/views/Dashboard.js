export function renderDashboard(state) {
  const user = state.user;
  const history = state.history || [];

  // Mock quota levels
  const totalConversions = history.length;
  const storageLimit = user ? 2000 : 100; // MB
  const currentStorageUsed = (history.reduce((acc, item) => {
    // extract digits from "4.2 MB"
    const num = parseFloat(item.fileSize) || 1;
    return acc + num;
  }, 0) / 10).toFixed(2); // Mock file size representation
  const pct = Math.min(100, Math.max(5, (currentStorageUsed / storageLimit) * 100));

  const historyRows = history.map(item => `
    <tr class="border-b border-purple-500/5 hover:bg-slate-900/10 dark:hover:bg-slate-900/30 transition">
      <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-300 font-semibold flex items-center space-x-2">
        <span class="w-6 h-6 rounded bg-purple-950/20 flex items-center justify-center text-purple-400">
          <i class="fa-solid fa-bolt text-[10px]"></i>
        </span>
        <span>${item.toolName}</span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-400 truncate max-w-[150px] sm:max-w-xs" title="${item.fileName}">
        ${item.fileName}
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-xs text-slate-400">
        ${item.fileSize}
      </td>
      <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2.5 py-0.5 inline-flex text-[10px] leading-5 font-bold rounded-full bg-emerald-950/20 border border-emerald-500/20 text-emerald-400">
          ${item.status}
        </span>
      </td>
      <td class="px-6 py-4 whitespace-nowrap text-[10px] text-slate-500">
        ${item.timestamp}
      </td>
    </tr>
  `).join('');

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow space-y-8">
      
      <!-- Dashboard Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-purple-500/10 pb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold font-display text-slate-100">SaaS Workspace</h2>
          <p class="text-xs text-slate-400 mt-1">Manage conversion logs, track local quota allocations, and trigger batch optimizations.</p>
        </div>
        
        <!-- User Status Badge -->
        <div class="flex items-center space-x-3 bg-purple-900/5 dark:bg-purple-950/15 border border-purple-500/15 p-3 rounded-2xl max-w-xs">
          <div class="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center font-bold text-white shadow-md">
            ${user ? user.name.substring(0,2).toUpperCase() : 'G'}
          </div>
          <div>
            <h4 class="text-xs font-bold text-slate-200">${user ? user.name : 'Guest Account'}</h4>
            <p class="text-[10px] text-purple-400">${user ? 'Pro Member' : 'Free Sandbox Mode'}</p>
          </div>
        </div>
      </div>

      <!-- Overview Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        
        <!-- Metric 1: Total Processed -->
        <div class="glass-card p-5 rounded-2xl text-left flex items-center space-x-4 border border-purple-500/5 hover:border-purple-500/10">
          <span class="w-12 h-12 rounded-xl bg-purple-900/10 border border-purple-500/10 flex items-center justify-center text-purple-400 text-lg">
            <i class="fa-solid fa-arrows-spin"></i>
          </span>
          <div>
            <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Operations</p>
            <h3 class="text-2xl font-bold text-slate-200 mt-1">${totalConversions} <span class="text-xs text-slate-500 font-normal">conversions</span></h3>
          </div>
        </div>

        <!-- Metric 2: Storage Limits -->
        <div class="glass-card p-5 rounded-2xl text-left border border-purple-500/5 hover:border-purple-500/10 space-y-3">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <span class="w-10 h-10 rounded-lg bg-pink-900/10 border border-pink-500/10 flex items-center justify-center text-pink-400">
                <i class="fa-solid fa-database"></i>
              </span>
              <div>
                <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Storage Usage</p>
                <h4 class="text-sm font-bold text-slate-200 mt-0.5">${currentStorageUsed} / ${storageLimit} MB</h4>
              </div>
            </div>
            <span class="text-[10px] text-pink-400 font-bold bg-pink-950/20 px-2 py-0.5 rounded">${pct.toFixed(0)}%</span>
          </div>
          <!-- Progress bar -->
          <div class="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div class="bg-gradient-to-r from-purple-500 to-pink-500 h-full" style="width: ${pct}%"></div>
          </div>
        </div>

        <!-- Metric 3: Active Status -->
        <div class="glass-card p-5 rounded-2xl text-left flex items-center justify-between border border-purple-500/5 hover:border-purple-500/10">
          <div class="flex items-center space-x-4">
            <span class="w-12 h-12 rounded-xl bg-cyan-900/10 border border-cyan-500/10 flex items-center justify-center text-cyan-400 text-lg">
              <i class="fa-solid fa-crown"></i>
            </span>
            <div>
              <p class="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Account Level</p>
              <h3 class="text-sm font-bold text-slate-200 mt-1">${user ? 'Professional Tier' : 'Sandbox Account'}</h3>
            </div>
          </div>
          ${!user ? `
            <a href="#pricing" class="text-[10px] font-bold text-purple-400 hover:text-purple-300 border border-purple-500/20 px-3 py-1.5 rounded-xl hover:bg-purple-950/10 transition">
              Upgrade
            </a>
          ` : ''}
        </div>

      </div>

      <!-- Quick Action Panels -->
      <div class="space-y-4">
        <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest text-left">Quick Launcher</h3>
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <a href="#tool/pdf-merge" class="glass-card p-4 rounded-xl text-left flex flex-col justify-between group">
            <span class="w-8 h-8 rounded-lg bg-purple-950/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition"><i class="fa-solid fa-file-medical"></i></span>
            <span class="text-xs font-semibold text-slate-200 mt-4 block">Merge PDF</span>
          </a>
          <a href="#tool/image-compress" class="glass-card p-4 rounded-xl text-left flex flex-col justify-between group">
            <span class="w-8 h-8 rounded-lg bg-pink-950/20 flex items-center justify-center text-pink-400 group-hover:scale-105 transition"><i class="fa-solid fa-minimize"></i></span>
            <span class="text-xs font-semibold text-slate-200 mt-4 block">Compress Image</span>
          </a>
          <a href="#tool/volume-booster" class="glass-card p-4 rounded-xl text-left flex flex-col justify-between group">
            <span class="w-8 h-8 rounded-lg bg-red-950/20 flex items-center justify-center text-red-400 group-hover:scale-105 transition"><i class="fa-solid fa-volume-high"></i></span>
            <span class="text-xs font-semibold text-slate-200 mt-4 block">Boost Volume</span>
          </a>
          <a href="#tool/txt-to-pdf" class="glass-card p-4 rounded-xl text-left flex flex-col justify-between group">
            <span class="w-8 h-8 rounded-lg bg-blue-950/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition"><i class="fa-solid fa-file-prescription"></i></span>
            <span class="text-xs font-semibold text-slate-200 mt-4 block">TXT to PDF</span>
          </a>
        </div>
      </div>

      <!-- History / Log details -->
      <div class="space-y-4 text-left">
        <div class="flex items-center justify-between">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Operation History Log</h3>
          ${history.length > 0 ? `
            <button id="clear-history-btn" class="text-[10px] font-semibold text-red-400 hover:text-red-300 hover:underline cursor-pointer">
              Clear Logs
            </button>
          ` : ''}
        </div>
        
        <div class="glass-card rounded-2xl overflow-hidden border border-purple-500/5">
          <div class="min-w-full overflow-x-auto">
            ${history.length > 0 ? `
              <table class="min-w-full divide-y divide-purple-500/10">
                <thead class="bg-slate-950/40">
                  <tr>
                    <th class="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Operation</th>
                    <th class="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">File Name</th>
                    <th class="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Output Size</th>
                    <th class="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-[10px] font-bold text-slate-500 uppercase tracking-wider">Timestamp</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-purple-500/5">
                  ${historyRows}
                </tbody>
              </table>
            ` : `
              <div class="p-12 text-center space-y-3">
                <span class="w-12 h-12 rounded-full bg-slate-900 border border-purple-500/10 flex items-center justify-center mx-auto text-slate-500">
                  <i class="fa-solid fa-inbox text-lg"></i>
                </span>
                <div>
                  <h4 class="text-xs font-semibold text-slate-300">No conversions recorded</h4>
                  <p class="text-[10px] text-slate-500 mt-1">Select a utility tool or navigate to the converter categories to process files.</p>
                </div>
                <a href="#tools" class="inline-block mt-2 glow-btn bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold px-4 py-2 rounded-xl">
                  Launch Converter
                </a>
              </div>
            `}
          </div>
        </div>
      </div>

      <!-- File Security trust badge -->
      <div class="glass-card p-6 rounded-2xl flex flex-col md:flex-row items-center justify-between border border-purple-500/5 text-left gap-4 bg-gradient-to-r from-purple-950/5 to-pink-950/5">
        <div class="flex items-start space-x-3.5">
          <span class="w-10 h-10 rounded-xl bg-purple-900/20 flex items-center justify-center text-purple-400 mt-0.5"><i class="fa-solid fa-shield-halved text-lg"></i></span>
          <div class="space-y-1">
            <h4 class="text-xs font-bold text-slate-200">Local Sandbox & Security Policies</h4>
            <p class="text-[11px] text-slate-400 leading-relaxed max-w-2xl">
              We enforce browser-level isolated container runs. PDF adjustments, image resizing, and orientation rotations do not require server interactions, ensuring zero risk of document exposures or third-party data tracking.
            </p>
          </div>
        </div>
        <div class="flex space-x-2">
          <span class="text-[10px] bg-slate-950/80 border border-purple-500/20 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><i class="fa-solid fa-lock text-purple-400"></i> AES-256 SSL</span>
          <span class="text-[10px] bg-slate-950/80 border border-purple-500/20 text-slate-400 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><i class="fa-solid fa-trash text-purple-400"></i> Auto-purge Log</span>
        </div>
      </div>

    </div>
  `;
}

export function initDashboard(state, parentEl, triggerStateUpdateCallback) {
  const clearBtn = parentEl.querySelector('#clear-history-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      triggerStateUpdateCallback({ history: [] });
    });
  }
}
