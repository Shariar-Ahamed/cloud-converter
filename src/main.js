import './style.css';
import { renderNavbar } from './components/Navbar.js';
import { renderSidebar } from './components/Sidebar.js';
import { renderFooter } from './components/Footer.js';

import { renderLanding, initLanding } from './views/Landing.js';
import { renderDashboard, initDashboard } from './views/Dashboard.js';
import { renderPricing, initPricing } from './views/Pricing.js';
import { renderApiDocs, initApiDocs } from './views/ApiDocs.js';
import { renderAuth, initAuth } from './views/Auth.js';
import { renderTools, initTools } from './views/Tools.js';
import { renderToolPage, initToolPage } from './views/ToolPage.js';

import { tools, getToolById, toPdfFormats } from './data/tools.js';

// Global State
const state = {
  route: 'landing',
  routeParams: null,
  theme: 'dark',
  user: JSON.parse(localStorage.getItem('user')) || null,
  history: JSON.parse(localStorage.getItem('history')) || [],
  isSidebarOpen: false,
  landingCategory: 'all',
  toolsSearchQuery: '',
  apiLanguage: 'curl',
  apiKey: 'sk_sandbox_' + Math.random().toString(36).substring(2, 14),
  pricingYearly: false,
  authSignUp: false
};

// Apply theme at startup
document.documentElement.className = 'dark';

// Save state changes
function saveState() {
  localStorage.setItem('user', JSON.stringify(state.user));
  localStorage.setItem('history', JSON.stringify(state.history));
}

// State Updater
function triggerStateUpdate(updates, skipRender = false) {
  Object.assign(state, updates);
  saveState();
  if (!skipRender) {
    renderApp();
  }
}

// Add logs to history callback
function addToHistory(item) {
  const updatedHistory = [item, ...state.history].slice(0, 50); // limit to 50 logs
  triggerStateUpdate({ history: updatedHistory }, true);
}

// SPA Router
function parseRoute() {
  const hash = window.location.hash || '#landing';
  let routePath = hash.substring(1);
  let params = null;

  // Check queries or sub-paths
  if (routePath.startsWith('tool/')) {
    const parts = routePath.split('/');
    routePath = 'tool';
    params = { id: parts[1] };
  } else if (routePath.includes('?')) {
    const parts = routePath.split('?');
    routePath = parts[0];
    // parse query parameters (e.g. ?cat=pdf)
    const queryParts = parts[1].split('=');
    if (queryParts[0] === 'cat') {
      state.landingCategory = queryParts[1];
    }
  }

  // Close sidebar drawer on navigate
  state.isSidebarOpen = false;

  triggerStateUpdate({
    route: routePath,
    routeParams: params
  });
}

// HTML Renderer
function renderApp() {
  const root = document.getElementById('app');
  if (!root) return;

  // 1. Render Views
  let pageContent = '';
  switch (state.route) {
    case 'landing':
      pageContent = renderLanding(state);
      break;
    case 'dashboard':
      pageContent = renderDashboard(state);
      break;
    case 'pricing':
      pageContent = renderPricing(state);
      break;
    case 'api':
      pageContent = renderApiDocs(state);
      break;
    case 'login':
      pageContent = renderAuth(state);
      break;
    case 'tools':
      pageContent = renderTools(state);
      break;
    case 'tool':
      pageContent = renderToolPage(state);
      break;
    default:
      pageContent = `<div class="p-16 text-center text-slate-400">Page Not Found</div>`;
  }

  // 2. Render Core Frame
  root.innerHTML = `
    <!-- Top Nav -->
    ${renderNavbar(state)}
    
    <!-- Sidebar mobile overlay drawer -->
    ${renderSidebar(state)}

    <!-- Dynamic page body -->
    <main class="flex-grow flex flex-col items-center">
      <div class="w-full text-center fade-enter-active">
        ${pageContent}
      </div>
    </main>

    <!-- Footer -->
    ${renderFooter()}
  `;

  // 3. Bind Layout Events
  bindGlobalEvents();

  // 4. Bind view-specific listeners
  switch (state.route) {
    case 'landing':
      initLanding(state, root, triggerStateUpdate);
      break;
    case 'dashboard':
      initDashboard(state, root, triggerStateUpdate);
      break;
    case 'pricing':
      initPricing(state, root, triggerStateUpdate);
      break;
    case 'api':
      initApiDocs(state, root, triggerStateUpdate);
      break;
    case 'login':
      initAuth(state, root, triggerStateUpdate);
      break;
    case 'tools':
      initTools(state, root, triggerStateUpdate);
      break;
    case 'tool':
      initToolPage(state, root, triggerStateUpdate, addToHistory);
      break;
  }
}

// BIND GLOBAL CONTROLS (NAVBAR, THEMES, NEWSLETTER, SIDEBAR)
function bindGlobalEvents() {
  const root = document.getElementById('app');

  // Theme Toggles
  const themeToggle = document.getElementById('theme-toggle');
  const themeToggleMobile = document.getElementById('theme-toggle-mobile');

  const toggleThemeFunc = () => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.className = newTheme;
    triggerStateUpdate({ theme: newTheme });
  };

  if (themeToggle) themeToggle.addEventListener('click', toggleThemeFunc);
  if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleThemeFunc);

  // Mobile Menu Toggles
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const sidebarOverlay = document.getElementById('sidebar-overlay');
  const sidebarClose = document.getElementById('sidebar-close-btn');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      triggerStateUpdate({ isSidebarOpen: true });
    });
  }

  if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
      triggerStateUpdate({ isSidebarOpen: false });
    });
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener('click', (e) => {
      if (e.target === sidebarOverlay) {
        triggerStateUpdate({ isSidebarOpen: false });
      }
    });
  }

  // Logout actions
  const logoutBtn = document.getElementById('nav-logout');
  const sidebarLogout = document.getElementById('sidebar-logout');
  const logoutAction = () => {
    triggerStateUpdate({ user: null });
    window.location.hash = '#landing';
  };
  if (logoutBtn) logoutBtn.addEventListener('click', logoutAction);
  if (sidebarLogout) sidebarLogout.addEventListener('click', logoutAction);

  // Navbar Search matching logic
  const searchInput = document.getElementById('nav-search');
  const resultsBox = document.getElementById('search-results');
  const resultsList = document.getElementById('search-results-list');

  if (searchInput && resultsBox) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim().toLowerCase();
      if (q.length === 0) {
        resultsBox.classList.add('hidden');
        return;
      }

      // Filter matches
      let matches = tools.filter(t => t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q));
      
      // Also look up dynamic pdf formats
      toPdfFormats.forEach(fmt => {
        if (fmt.includes(q) || `${fmt} to pdf`.includes(q)) {
          const id = `${fmt}-to-pdf`;
          if (!matches.some(m => m.id === id)) {
            const dynamicTool = getToolById(id);
            if (dynamicTool) matches.push(dynamicTool);
          }
        }
      });

      matches = matches.slice(0, 5);

      if (matches.length > 0) {
        resultsList.innerHTML = matches.map(t => `
          <a href="#tool/${t.id}" class="flex items-center space-x-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-purple-600/20 hover:text-white transition">
            <span class="w-6 h-6 rounded bg-purple-950/25 flex items-center justify-center ${t.color}">
              <i class="${t.icon} text-[10px]"></i>
            </span>
            <div class="truncate">
              <span class="font-bold text-slate-200 block">${t.name}</span>
            </div>
          </a>
        `).join('');
        resultsBox.classList.remove('hidden');
      } else {
        resultsList.innerHTML = `<div class="text-[10px] text-slate-500 py-3 text-center">No tools match query</div>`;
        resultsBox.classList.remove('hidden');
      }
    });

    // Close on click out
    document.addEventListener('click', (e) => {
      if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
        resultsBox.classList.add('hidden');
      }
    });
  }

  // Mobile Drawer Search
  const sidebarSearch = document.getElementById('sidebar-search');
  const sidebarSearchBox = document.getElementById('sidebar-search-results');
  const sidebarSearchList = document.getElementById('sidebar-search-list');

  if (sidebarSearch) {
    sidebarSearch.addEventListener('input', () => {
      const q = sidebarSearch.value.trim().toLowerCase();
      if (q.length === 0) {
        sidebarSearchBox.classList.add('hidden');
        return;
      }
      let matches = tools.filter(t => t.name.toLowerCase().includes(q));
      
      toPdfFormats.forEach(fmt => {
        if (fmt.includes(q) || `${fmt} to pdf`.includes(q)) {
          const id = `${fmt}-to-pdf`;
          if (!matches.some(m => m.id === id)) {
            const dynamicTool = getToolById(id);
            if (dynamicTool) matches.push(dynamicTool);
          }
        }
      });

      matches = matches.slice(0, 4);

      if (matches.length > 0) {
        sidebarSearchList.innerHTML = matches.map(t => `
          <a href="#tool/${t.id}" class="flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-purple-600/20 hover:text-white transition">
            <i class="${t.icon} ${t.color} text-[10px]"></i>
            <span>${t.name}</span>
          </a>
        `).join('');
        sidebarSearchBox.classList.remove('hidden');
      } else {
        sidebarSearchList.innerHTML = `<div class="text-[10px] text-slate-600 p-2">No matches</div>`;
        sidebarSearchBox.classList.remove('hidden');
      }
    });
  }

  // Footer Newsletter Simulator
  const newsletterForm = document.getElementById('footer-newsletter');
  const newsletterMsg = document.getElementById('newsletter-msg');

  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      
      newsletterMsg.classList.remove('hidden', 'text-rose-500', 'text-emerald-400');
      newsletterMsg.innerText = "Subscribing...";

      setTimeout(() => {
        newsletterMsg.innerText = "Successfully subscribed! Check inbox.";
        newsletterMsg.classList.add('text-emerald-400');
        emailInput.value = '';
      }, 1200);
    });
  }
}

// SCROLL TRACKERS & BACK-TO-TOP BUTTON
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrollPct = (scrollTop / docHeight) * 100;
  
  // Fill progress line
  const progressFill = document.getElementById('scroll-progress');
  if (progressFill) {
    progressFill.style.width = `${scrollPct}%`;
  }

  // Back to Top button
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    if (scrollTop > 400) {
      backToTopBtn.classList.remove('opacity-0', 'invisible', 'translate-y-4', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'invisible', 'translate-y-4', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'visible', 'translate-y-0', 'pointer-events-auto');
    }
  }
});

// Scroll to top action
const backToTop = document.getElementById('back-to-top');
if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// App Scaffolding Initializer
window.addEventListener('DOMContentLoaded', () => {
  // Parse initial location hash
  parseRoute();
  window.addEventListener('hashchange', parseRoute);

  // Clear startup loader screen
  const loader = document.getElementById('app-loader');
  if (loader) {
    loader.classList.add('opacity-0');
    setTimeout(() => {
      loader.remove();
    }, 500);
  }
});
