import { tools, getToolById } from '../data/tools.js';
import { renderToolBox, initToolBox } from '../components/ToolBox.js';

export function renderToolPage(state) {
  const toolId = state.routeParams ? state.routeParams.id : null;
  const tool = getToolById(toolId);

  if (!tool) {
    return `
      <div class="max-w-md mx-auto text-center py-16 px-4 space-y-4 flex-grow flex flex-col justify-center">
        <span class="w-12 h-12 rounded-full bg-slate-900 border border-purple-500/25 flex items-center justify-center text-rose-400 mx-auto text-lg">
          <i class="fa-solid fa-triangle-exclamation"></i>
        </span>
        <div class="space-y-1">
          <h4 class="text-sm font-bold text-slate-200">Tool Not Found</h4>
          <p class="text-xs text-slate-500">The requested file conversion tool does not exist or has been moved.</p>
        </div>
        <a href="#tools" class="inline-block glow-btn bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold px-6 py-2.5 rounded-xl">
          Browse All Tools
        </a>
      </div>
    `;
  }

  // Get other tools in same category
  const relatedTools = tools.filter(t => t.category === tool.category && t.id !== tool.id).slice(0, 4);

  const relatedHtml = relatedTools.map(rel => `
    <a href="#tool/${rel.id}" class="glass-card p-4 rounded-xl text-left flex items-center space-x-3 group">
      <span class="w-8 h-8 rounded-lg bg-purple-950/20 flex items-center justify-center ${rel.color} group-hover:rotate-6 transition flex-shrink-0">
        <i class="${rel.icon} text-xs"></i>
      </span>
      <div class="min-w-0">
        <h5 class="text-[11px] font-bold text-slate-200 truncate group-hover:text-purple-400 transition">${rel.name}</h5>
        <p class="text-[9px] text-slate-500 truncate">${rel.desc}</p>
      </div>
    </a>
  `).join('');

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow space-y-10 text-left">
      
      <!-- Back Link -->
      <div>
        <a href="#tools?cat=${tool.category}" class="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-purple-400 transition">
          <i class="fa-solid fa-arrow-left"></i>
          <span class="capitalize">Back to ${tool.category} tools</span>
        </a>
      </div>

      <!-- Main Layout: Tool Box on left, related on right -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Tool Box Workspace (Left 2 cols) -->
        <div class="lg:col-span-2 space-y-6">
          <div id="active-toolbox-container">
            ${renderToolBox(tool)}
          </div>

          <!-- Feature Cards / Security Checklist -->
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="glass-card p-4 rounded-2xl flex items-center space-x-3">
              <span class="text-purple-400 text-lg"><i class="fa-solid fa-shield-halved"></i></span>
              <div class="min-w-0 text-[11px]">
                <h5 class="font-bold text-slate-300">100% Privacy</h5>
                <p class="text-slate-500 mt-0.5 truncate">SSL secure pipeline</p>
              </div>
            </div>
            <div class="glass-card p-4 rounded-2xl flex items-center space-x-3">
              <span class="text-pink-400 text-lg"><i class="fa-solid fa-cloud-arrow-down"></i></span>
              <div class="min-w-0 text-[11px]">
                <h5 class="font-bold text-slate-300">Cloud Storage</h5>
                <p class="text-slate-500 mt-0.5 truncate">Purged after 1 hour</p>
              </div>
            </div>
            <div class="glass-card p-4 rounded-2xl flex items-center space-x-3">
              <span class="text-cyan-400 text-lg"><i class="fa-solid fa-bolt"></i></span>
              <div class="min-w-0 text-[11px]">
                <h5 class="font-bold text-slate-300">Fast Compiles</h5>
                <p class="text-slate-500 mt-0.5 truncate">Processed instantly</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Sidebar (Right 1 col): Related Tools & Information -->
        <div class="space-y-6">
          
          <!-- Related tools -->
          ${relatedTools.length > 0 ? `
            <div class="glass-card p-5 rounded-2xl border border-purple-500/5 space-y-4">
              <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest border-b border-purple-500/5 pb-2">Related Utilities</h4>
              <div class="space-y-3">
                ${relatedHtml}
              </div>
            </div>
          ` : ''}

          <!-- Info Guide box -->
          <div class="glass-card p-5 rounded-2xl border border-purple-500/5 space-y-4 text-xs leading-relaxed">
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest border-b border-purple-500/5 pb-2">How to convert</h4>
            <ul class="space-y-2.5 text-slate-400">
              <li class="flex items-start gap-2">
                <span class="text-purple-400 font-bold">1.</span>
                <span>Select and drag your source file into the dash dropzone.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-400 font-bold">2.</span>
                <span>Adjust settings, compression rates, or target dimensions.</span>
              </li>
              <li class="flex items-start gap-2">
                <span class="text-purple-400 font-bold">3.</span>
                <span>Click "Convert Now" to process and download.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  `;
}

export function initToolPage(state, parentEl, triggerStateUpdateCallback, addToHistoryCallback) {
  const toolId = state.routeParams ? state.routeParams.id : null;
  const tool = getToolById(toolId);
  
  if (!tool) return;

  const toolboxEl = parentEl.querySelector('#active-toolbox-container');
  if (toolboxEl) {
    initToolBox(tool, toolboxEl, addToHistoryCallback);
  }
}
