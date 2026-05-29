import { tools } from '../data/tools.js';

export function renderLanding(state) {
  // Popular tools
  const popularTools = tools.filter(t => t.popular);

  // Categories definition
  const categories = [
    { key: 'all', name: 'All Tools', icon: 'fa-cubes' },
    { key: 'pdf', name: 'PDF Tools', icon: 'fa-file-pdf' },
    { key: 'image', name: 'Image Tools', icon: 'fa-image' },
    { key: 'video', name: 'Video Tools', icon: 'fa-circle-play' },
    { key: 'audio', name: 'Audio Tools', icon: 'fa-music' },
    { key: 'document', name: 'Doc Tools', icon: 'fa-file-lines' }
  ];

  const popularGridHtml = popularTools.map(tool => `
    <a href="#tool/${tool.id}" class="glass-card p-6 rounded-2xl flex flex-col justify-between text-left group">
      <div>
        <span class="w-12 h-12 rounded-xl bg-purple-900/10 border border-purple-500/10 flex items-center justify-center mb-4 ${tool.color} group-hover:scale-110 transition duration-300">
          <i class="${tool.icon} text-lg"></i>
        </span>
        <h4 class="text-sm font-bold text-slate-100 group-hover:text-purple-400 transition">${tool.name}</h4>
        <p class="text-xs text-slate-400 mt-1 leading-relaxed">${tool.desc}</p>
      </div>
      <div class="mt-4 flex items-center text-[10px] text-purple-400 font-semibold uppercase tracking-wider group-hover:translate-x-1 transition">
        <span>Launch Tool</span>
        <i class="fa-solid fa-arrow-right ml-1"></i>
      </div>
    </a>
  `).join('');

  const catTabsHtml = categories.map(cat => {
    const isSelected = state.landingCategory === cat.key;
    const activeClass = isSelected 
      ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg shadow-purple-500/20' 
      : 'bg-slate-900/30 dark:bg-slate-900/60 border border-purple-500/5 text-slate-400 hover:text-white hover:border-purple-500/20';
    return `
      <button 
        data-cat="${cat.key}" 
        class="cat-tab-btn flex items-center space-x-2 px-4 py-2.5 rounded-full text-xs font-semibold tracking-wide transition cursor-pointer ${activeClass}"
      >
        <i class="fa-solid ${cat.icon}"></i>
        <span>${cat.name}</span>
      </button>
    `;
  }).join('');

  // Render tools based on filter
  const filteredTools = state.landingCategory === 'all' 
    ? tools 
    : tools.filter(t => t.category === state.landingCategory);

  const toolsGridHtml = filteredTools.map(tool => `
    <a href="#tool/${tool.id}" class="glass-card p-5 rounded-2xl text-left flex flex-col justify-between group">
      <div>
        <div class="flex items-center justify-between mb-3">
          <span class="w-10 h-10 rounded-lg bg-purple-900/10 border border-purple-500/10 flex items-center justify-center ${tool.color} group-hover:rotate-6 transition">
            <i class="${tool.icon} text-sm"></i>
          </span>
          <span class="text-[9px] bg-slate-900 border border-purple-500/15 text-slate-400 px-2 py-0.5 rounded-full font-bold uppercase">${tool.category}</span>
        </div>
        <h4 class="text-xs font-bold text-slate-100 group-hover:text-purple-400 transition">${tool.name}</h4>
        <p class="text-[11px] text-slate-400 mt-1 leading-relaxed line-clamp-2">${tool.desc}</p>
      </div>
      <div class="mt-4 flex items-center justify-between text-[10px] text-slate-500 group-hover:text-purple-400 transition border-t border-purple-500/5 pt-3">
        <span>Free Conversion</span>
        <i class="fa-solid fa-chevron-right"></i>
      </div>
    </a>
  `).join('');

  const features = [
    { title: "Fast Local Processing", desc: "No queues or long server queues. Converted images and documents are processed locally inside your web canvas instantly.", icon: "fa-bolt-lightning text-amber-400" },
    { title: "Security First (GDPR)", desc: "All files remain client-side in the browser when utilizing local tools, and uploaded assets are automatically purged in our simulators within 1 hour.", icon: "fa-shield-halved text-emerald-400" },
    { title: "SaaS Cloud Infrastructure", desc: "Access high-performance media transcoding pipelines, compression libraries, and PDF formats securely on demand.", icon: "fa-cloud text-blue-400" },
    { title: "Zero Install / Clean UI", desc: "Skip desktop installers. Everything runs inside a single responsive layout using premium glassmorphism layouts.", icon: "fa-desktop text-purple-400" },
    { title: "Multi-Device Syncing", desc: "Perfect responsive rendering on mobile, tablets, laptops, and large monitors. Seamless navigation switches.", icon: "fa-mobile-screen-button text-pink-400" },
    { title: "Lossless High Quality", desc: "Smart resolution preservation in image compressions, audio volume booster, and text formatting layouts.", icon: "fa-crown text-yellow-400" }
  ];

  const featuresHtml = features.map(feat => `
    <div class="glass-card p-6 rounded-2xl text-left border border-purple-500/5 hover:border-purple-500/20">
      <span class="w-10 h-10 rounded-xl bg-purple-950/20 border border-purple-500/10 flex items-center justify-center mb-4 text-sm">
        <i class="fa-solid ${feat.icon}"></i>
      </span>
      <h4 class="text-sm font-bold text-slate-200">${feat.title}</h4>
      <p class="text-xs text-slate-400 mt-2 leading-relaxed">${feat.desc}</p>
    </div>
  `).join('');

  const faqs = [
    { q: "Are my uploaded files safe and private?", a: "Absolutely. For lightweight tools like Image resizing, JPEG compression, and PDF rotations, the operations occur entirely client-side inside your browser canvas context, meaning the file never leaves your system. For more complex simulations, uploads are secured with SSL endpoints and deleted automatically after 60 minutes." },
    { q: "Is there a file size limit for free conversions?", a: "Free tier supports individual file uploads up to 100 MB. To increase upload limits up to 2 GB, check out our affordable Pro Pricing packages." },
    { q: "Can I merge multiple formats together?", a: "Yes, you can merge multiple PDF documents into one single output, or convert files across different families (like TXT to PDF or JPG to PNG) in batches." },
    { q: "Do you offer a developer integration API?", a: "Yes, our developer portal has clean SDK scripts for cURL, NodeJS, and Python. Navigate to the API Docs section above to generate your sandbox API token." }
  ];

  const faqsHtml = faqs.map((faq, idx) => `
    <div class="faq-item border border-purple-500/10 bg-slate-900/10 dark:bg-slate-900/30 rounded-2xl overflow-hidden transition-all duration-300">
      <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer">
        <span class="text-xs sm:text-sm font-semibold text-slate-200">${faq.q}</span>
        <span class="faq-icon w-6 h-6 rounded-full border border-purple-500/20 flex items-center justify-center text-slate-400 transition-transform duration-300">
          <i class="fa-solid fa-chevron-down text-[10px]"></i>
        </span>
      </button>
      <div class="faq-content">
        <div class="px-6 pb-4 text-xs text-slate-400 leading-relaxed border-t border-purple-500/5 pt-3">
          ${faq.a}
        </div>
      </div>
    </div>
  `).join('');

  return `
    <div class="w-full flex-1">
      
      <!-- HERO SECTION -->
      <section class="relative min-h-[85vh] flex items-center justify-center py-16 px-4 md:px-8 border-b border-purple-500/10 overflow-hidden">
        <!-- Grid overlay -->
        <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] opacity-20 pointer-events-none"></div>
        
        <div class="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <!-- Small badge -->
          <div class="inline-flex items-center space-x-2 bg-purple-900/15 border border-purple-500/25 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-purple-400 uppercase animate-pulse">
            <span class="flex h-2 w-2 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
            </span>
            <span>Client-Side Optimization Engine</span>
          </div>

          <!-- Main Title -->
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display leading-[1.1] max-w-3xl mx-auto">
            Convert Files Instantly with <br/>
            <span class="animated-gradient-text">Lightning Speed.</span>
          </h1>

          <!-- Subtitle -->
          <p class="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            The ultimate SaaS platform to merge, split, compress, and convert your PDFs, Images, Audio, and Video files. Zero installers. Complete browser-level privacy.
          </p>

          <!-- CTAs -->
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a href="#tools" class="glow-btn w-full sm:w-auto text-center bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-lg shadow-purple-500/30">
              Start Converting <i class="fa-solid fa-circle-play ml-1.5"></i>
            </a>
            <a href="#pricing" class="w-full sm:w-auto text-center border border-purple-500/20 hover:border-purple-500/50 hover:bg-slate-900/30 text-slate-300 font-bold text-sm px-8 py-3.5 rounded-full transition">
              View Premium Plans
            </a>
          </div>

          <!-- Trust metrics -->
          <div class="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-purple-500/5 text-xs text-slate-500">
            <span><i class="fa-solid fa-circle-check text-purple-500 mr-1.5"></i> 100% Secure SSL</span>
            <span><i class="fa-solid fa-circle-check text-purple-500 mr-1.5"></i> Local Decryptions</span>
            <span><i class="fa-solid fa-circle-check text-purple-500 mr-1.5"></i> No Installation</span>
          </div>
        </div>

        <!-- Floating decorative shapes -->
        <div class="hidden lg:block absolute top-1/4 left-10 w-24 h-24 bg-purple-500/5 border border-purple-500/10 rounded-2xl blur-[1px] rotate-12 animate-float-slow pointer-events-none"></div>
        <div class="hidden lg:block absolute bottom-1/4 right-10 w-20 h-20 bg-pink-500/5 border border-pink-500/10 rounded-full blur-[1px] animate-float-medium pointer-events-none"></div>
      </section>

      <!-- POPULAR TOOLS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-b border-purple-500/10">
        <div class="max-w-2xl mx-auto mb-10 text-center space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-slate-100">Popular Operations</h2>
          <p class="text-xs sm:text-sm text-slate-400">Most requested document utilities running locally inside user configurations.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${popularGridHtml}
        </div>
      </section>

      <!-- BROWSE CATEGORIES & FILTER -->
      <section id="browse-tools" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-b border-purple-500/10">
        <div class="max-w-2xl mx-auto mb-10 space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-slate-100">All Converter Tools</h2>
          <p class="text-xs sm:text-sm text-slate-400">Toggle categories to filter through 30+ responsive file converters.</p>
        </div>

        <!-- Filters -->
        <div class="flex flex-wrap items-center justify-center gap-2 mb-8 max-w-3xl mx-auto">
          ${catTabsHtml}
        </div>

        <!-- Dynamic Catalog Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
          ${toolsGridHtml}
        </div>
      </section>

      <!-- SAAS FEATURES -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-b border-purple-500/10">
        <div class="max-w-2xl mx-auto mb-12 space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-slate-100">Engine Features</h2>
          <p class="text-xs sm:text-sm text-slate-400">Built to ensure security, precision, and quick output optimizations.</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${featuresHtml}
        </div>
      </section>

      <!-- HOW IT WORKS TIMELINE -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-b border-purple-500/10">
        <div class="max-w-2xl mx-auto mb-12 space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-slate-100">Simple 3-Step Process</h2>
          <p class="text-xs sm:text-sm text-slate-400">Convert your document archives in under 10 seconds.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <!-- Desktop connecting path line -->
          <div class="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-purple-500/25 via-pink-500/20 to-cyan-500/25 z-0"></div>

          <!-- Step 1 -->
          <div class="relative z-10 space-y-4">
            <div class="w-16 h-16 rounded-full bg-slate-900 border border-purple-500/20 flex items-center justify-center mx-auto shadow-lg shadow-purple-500/10 text-purple-400 font-bold text-lg">
              01
            </div>
            <h4 class="text-sm font-bold text-slate-200">Upload Files</h4>
            <p class="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">Drag & drop files into the target converter box, or select directories locally.</p>
          </div>

          <!-- Step 2 -->
          <div class="relative z-10 space-y-4">
            <div class="w-16 h-16 rounded-full bg-slate-900 border border-pink-500/20 flex items-center justify-center mx-auto shadow-lg shadow-pink-500/10 text-pink-400 font-bold text-lg">
              02
            </div>
            <h4 class="text-sm font-bold text-slate-200">Configure Settings</h4>
            <p class="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">Adjust quality sliders, passwords, format parameters, or target width/height variables.</p>
          </div>

          <!-- Step 3 -->
          <div class="relative z-10 space-y-4">
            <div class="w-16 h-16 rounded-full bg-slate-900 border border-cyan-500/20 flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10 text-cyan-400 font-bold text-lg">
              03
            </div>
            <h4 class="text-sm font-bold text-slate-200">Download Result</h4>
            <p class="text-xs text-slate-400 max-w-xs mx-auto leading-relaxed">Click compile, monitor progress logs, and download optimized files instantly.</p>
          </div>
        </div>
      </section>

      <!-- TESTIMONIALS -->
      <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center border-b border-purple-500/10">
        <div class="max-w-2xl mx-auto mb-10 space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-slate-100">User Reviews</h2>
          <p class="text-xs sm:text-sm text-slate-400">Join thousands of developers and professionals optimizing files daily.</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-card p-6 rounded-2xl text-left flex flex-col justify-between">
            <p class="text-xs text-slate-400 italic leading-relaxed">
              "Being able to split and merge PDFs completely client-side in seconds is absolute magic. I don't have to upload my sensitive contract paperwork to random servers anymore. The UI is gorgeous."
            </p>
            <div class="flex items-center space-x-3 mt-6">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center font-bold text-xs text-white">
                JD
              </div>
              <div>
                <h5 class="text-xs font-bold text-slate-200">John Doe</h5>
                <p class="text-[10px] text-slate-500">Legal Consultant, NY</p>
              </div>
            </div>
          </div>

          <div class="glass-card p-6 rounded-2xl text-left flex flex-col justify-between">
            <p class="text-xs text-slate-400 italic leading-relaxed">
              "The image converter is insanely fast. I dragging 20 JPEGs, convert to WebP, resize them for mobile, and compress. Runs directly inside my browser canvas context. Absolutely mind-blowing!"
            </p>
            <div class="flex items-center space-x-3 mt-6">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-orange-500 flex items-center justify-center font-bold text-xs text-white">
                AS
              </div>
              <div>
                <h5 class="text-xs font-bold text-slate-200">Alice Smith</h5>
                <p class="text-[10px] text-slate-500">UX Lead, Creative Lab</p>
              </div>
            </div>
          </div>

          <div class="glass-card p-6 rounded-2xl text-left flex flex-col justify-between">
            <p class="text-xs text-slate-400 italic leading-relaxed">
              "As a developer, the programmatic API sandbox tab is my favorite. Generating sandbox keys and copying structured curl templates took me 2 minutes. The pricing plans are extremely fair."
            </p>
            <div class="flex items-center space-x-3 mt-6">
              <div class="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center font-bold text-xs text-white">
                ML
              </div>
              <div>
                <h5 class="text-xs font-bold text-slate-200">Marcus Lee</h5>
                <p class="text-[10px] text-slate-500">Senior Backend Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ ACCORDIONS -->
      <section class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div class="text-center mb-10 space-y-2">
          <h2 class="text-2xl sm:text-3xl font-bold font-display text-slate-100">Frequently Asked</h2>
          <p class="text-xs sm:text-sm text-slate-400">Everything you need to know about converters and security.</p>
        </div>
        <div class="space-y-4">
          ${faqsHtml}
        </div>
      </section>

    </div>
  `;
}

export function initLanding(state, parentEl, triggerStateUpdateCallback) {
  // Bind category tabs click
  parentEl.querySelectorAll('.cat-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCat = btn.getAttribute('data-cat');
      triggerStateUpdateCallback({ landingCategory: targetCat });
    });
  });

  // Bind FAQ accordions click
  parentEl.querySelectorAll('.faq-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const faqItem = trigger.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');
      
      // Close other FAQs
      parentEl.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });
}
