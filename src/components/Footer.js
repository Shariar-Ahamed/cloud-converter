export function renderFooter() {
  return `
    <footer class="mt-auto bg-[#0a0816] border-t border-purple-500/10 text-slate-400 text-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          <!-- Column 1: Intro / Branding -->
          <div class="lg:col-span-2 space-y-4">
            <a href="#landing" class="flex items-center space-x-2">
              <span class="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md">
                <i class="fa-solid fa-bolt text-md"></i>
              </span>
              <span class="text-lg font-bold font-display bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">CloudConvert</span>
            </a>
            <p class="text-xs text-slate-400 max-w-sm leading-relaxed">
              Experience lightning-fast client-side conversions and secure file optimizations on our next-gen SaaS utility dashboard. Clean code, local privacy, and multi-device responsive conversions.
            </p>
            
            <!-- Security Badges -->
            <div class="flex items-center space-x-3 pt-2">
              <span class="flex items-center space-x-1.5 bg-slate-900/60 border border-emerald-500/20 text-[10px] text-emerald-400 px-2 py-1 rounded-md" title="SSL Encrypted Connection">
                <i class="fa-solid fa-shield-halved"></i>
                <span>SSL Encrypted</span>
              </span>
              <span class="flex items-center space-x-1.5 bg-slate-900/60 border border-blue-500/20 text-[10px] text-blue-400 px-2 py-1 rounded-md" title="Files Deleted in 1 Hour">
                <i class="fa-solid fa-trash-can"></i>
                <span>GDPR Compliant</span>
              </span>
            </div>
          </div>

          <!-- Column 2: Quick Links -->
          <div>
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Company</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="#landing" class="hover:text-purple-400 transition">Home</a></li>
              <li><a href="#tools" class="hover:text-purple-400 transition">Browse Tools</a></li>
              <li><a href="#pricing" class="hover:text-purple-400 transition">Pricing Plans</a></li>
              <li><a href="#api" class="hover:text-purple-400 transition">Developer API</a></li>
            </ul>
          </div>

          <!-- Column 3: Tools Catalog -->
          <div>
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Top Tools</h4>
            <ul class="space-y-2 text-xs">
              <li><a href="#tool/pdf-merge" class="hover:text-purple-400 transition">Merge PDF</a></li>
              <li><a href="#tool/image-compress" class="hover:text-purple-400 transition">Compress JPEG</a></li>
              <li><a href="#tool/volume-booster" class="hover:text-purple-400 transition">Volume Booster</a></li>
              <li><a href="#tool/txt-to-pdf" class="hover:text-purple-400 transition">TXT to PDF</a></li>
              <li><a href="#tool/image-converter" class="hover:text-purple-400 transition">Image Converter</a></li>
            </ul>
          </div>

          <!-- Column 4: Newsletter -->
          <div class="space-y-4">
            <h4 class="text-xs font-bold text-slate-200 uppercase tracking-widest mb-4">Newsletter</h4>
            <p class="text-xs text-slate-400 leading-relaxed">Subscribe to get new file-optimization features and developer api updates.</p>
            <form id="footer-newsletter" class="flex flex-col space-y-2">
              <div class="relative">
                <input 
                  type="email" 
                  id="newsletter-email" 
                  placeholder="Enter email..." 
                  class="glass-input w-full text-xs rounded-lg py-2 pl-3 pr-10 text-slate-300"
                  required
                />
                <button type="submit" class="absolute right-1.5 top-1.5 w-7 h-7 bg-purple-600 hover:bg-purple-700 text-white rounded-md flex items-center justify-center transition cursor-pointer">
                  <i class="fa-solid fa-paper-plane text-[10px]"></i>
                </button>
              </div>
              <span id="newsletter-msg" class="text-[10px] hidden"></span>
            </form>
          </div>

        </div>

        <!-- Footer Bottom -->
        <div class="mt-12 pt-8 border-t border-purple-500/10 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 space-y-4 md:space-y-0">
          <div>
            &copy; 2026 CloudConvert. All rights reserved. Created with absolute visual premium aesthetics.
          </div>
          <!-- Social Icons -->
          <div class="flex space-x-4">
            <a href="#" class="hover:text-purple-400 transition text-sm"><i class="fa-brands fa-github"></i></a>
            <a href="#" class="hover:text-purple-400 transition text-sm"><i class="fa-brands fa-twitter"></i></a>
            <a href="#" class="hover:text-purple-400 transition text-sm"><i class="fa-brands fa-discord"></i></a>
            <a href="#" class="hover:text-purple-400 transition text-sm"><i class="fa-brands fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>
    </footer>
  `;
}
