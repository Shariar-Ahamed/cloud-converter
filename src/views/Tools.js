import { tools, getToolById, toPdfFormats } from '../data/tools.js';

export function renderTools(state) {
  const searchQuery = (state.toolsSearchQuery || '').toLowerCase();

  const categories = [
    { key: 'pdf', name: 'PDF Document Tools', icon: 'fa-file-pdf', color: 'text-red-400' },
    { key: 'image', name: 'Image Processing Tools', icon: 'fa-image', color: 'text-blue-400' },
    { key: 'video', name: 'Video Compressor & transcoders', icon: 'fa-circle-play', color: 'text-emerald-400' },
    { key: 'audio', name: 'Audio Formats & Cutters', icon: 'fa-music', color: 'text-purple-400' },
    { key: 'document', name: 'Document Sheet Converters', icon: 'fa-file-lines', color: 'text-yellow-500' }
  ];

  // Helper to render tools of a category
  const renderCategoryTools = (catKey) => {
    // Filter matching tools by raw category
    let catTools = tools.filter(t => t.category === catKey);
    
    // Filter by search query if present
    if (searchQuery.length > 0) {
      catTools = catTools.filter(t => t.name.toLowerCase().includes(searchQuery) || t.desc.toLowerCase().includes(searchQuery));
      
      // Merge dynamic search queries under pdf category
      if (catKey === 'pdf') {
        toPdfFormats.forEach(fmt => {
          if (fmt.includes(searchQuery) || `${fmt} to pdf`.includes(searchQuery)) {
            const id = `${fmt}-to-pdf`;
            if (!catTools.some(m => m.id === id)) {
              const dynamicTool = getToolById(id);
              if (dynamicTool) catTools.push(dynamicTool);
            }
          }
        });
      }
    }
    
    if (catTools.length === 0) return '';

    const gridHtml = catTools.map(tool => `
      <a href="#tool/${tool.id}" class="glass-card p-5 rounded-2xl text-left flex flex-col justify-between group">
        <div>
          <div class="flex items-center justify-between mb-3">
            <span class="w-10 h-10 rounded-lg bg-purple-900/10 border border-purple-500/10 flex items-center justify-center ${tool.color} group-hover:rotate-6 transition">
              <i class="${tool.icon} text-sm"></i>
            </span>
          </div>
          <h4 class="text-xs font-bold text-slate-100 group-hover:text-purple-400 transition">${tool.name}</h4>
          <p class="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-3">${tool.desc}</p>
        </div>
        <div class="mt-4 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-purple-400 transition border-t border-purple-500/5 pt-3">
          <span>Launch Tool</span>
          <i class="fa-solid fa-arrow-right"></i>
        </div>
      </a>
    `).join('');

    const categoryMeta = categories.find(c => c.key === catKey);

    return `
      <div class="space-y-4">
        <h3 class="text-sm font-bold text-slate-200 flex items-center gap-2 border-b border-purple-500/5 pb-2">
          <i class="fa-solid ${categoryMeta.icon} ${categoryMeta.color}"></i>
          <span>${categoryMeta.name}</span>
        </h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          ${gridHtml}
        </div>
      </div>
    `;
  };

  const sectionsHtml = categories.map(cat => renderCategoryTools(cat.key)).join('');
  const hasResults = sectionsHtml.trim().length > 0;

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow space-y-8 text-left">
      
      <!-- Headers -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 border-b border-purple-500/10 pb-6">
        <div>
          <h2 class="text-xl sm:text-2xl font-bold font-display text-slate-100">All Converter Utilities</h2>
          <p class="text-xs text-slate-400 mt-1">Browse, filter, and launch our list of 30+ responsive processing converters.</p>
        </div>
        
        <!-- Search input box -->
        <div class="relative w-full md:w-80">
          <input 
            type="text" 
            id="tools-page-search" 
            placeholder="Search tools..." 
            value="${state.toolsSearchQuery || ''}" 
            class="glass-input w-full text-xs rounded-xl py-3 pl-10 pr-4"
          />
          <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3.5 text-xs text-slate-400"></i>
        </div>
      </div>

      <!-- Categories tools sections -->
      <div class="space-y-12">
        ${hasResults ? sectionsHtml : `
          <div class="p-16 text-center space-y-3">
            <span class="w-12 h-12 rounded-full bg-slate-900 border border-purple-500/10 flex items-center justify-center mx-auto text-slate-500">
              <i class="fa-solid fa-triangle-exclamation text-lg"></i>
            </span>
            <div>
              <h4 class="text-xs font-semibold text-slate-300">No matching tools found</h4>
              <p class="text-[10px] text-slate-500 mt-1">Try searching for other terms like 'pdf', 'compress', or 'resize'.</p>
            </div>
            <button id="clear-search-btn" class="px-4 py-2 border border-purple-500/20 text-slate-400 hover:text-white rounded-xl text-xs mt-2 cursor-pointer">
              Clear Search
            </button>
          </div>
        `}
      </div>

    </div>
  `;
}

export function initTools(state, parentEl, triggerStateUpdateCallback) {
  const searchInput = parentEl.querySelector('#tools-page-search');
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      triggerStateUpdateCallback({ toolsSearchQuery: searchInput.value });
    });
    
    // Focus cursor at end of input
    searchInput.focus();
    const val = searchInput.value;
    searchInput.value = '';
    searchInput.value = val;
  }

  const clearBtn = parentEl.querySelector('#clear-search-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      triggerStateUpdateCallback({ toolsSearchQuery: '' });
    });
  }
}
