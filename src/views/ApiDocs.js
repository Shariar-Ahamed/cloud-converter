export function renderApiDocs(state) {
  const activeLang = state.apiLanguage || 'curl';
  const apiKey = state.apiKey || 'sk_sandbox_59ac31de90bc';

  const languages = [
    { key: 'curl', name: 'cURL', icon: 'fa-terminal' },
    { key: 'js', name: 'Node.js', icon: 'fa-node-js' },
    { key: 'python', name: 'Python', icon: 'fa-python' }
  ];

  const langTabs = languages.map(lang => {
    const isSelected = activeLang === lang.key;
    const activeClass = isSelected 
      ? 'bg-purple-600/20 border border-purple-500 text-purple-400 font-bold' 
      : 'border border-purple-500/10 text-slate-400 hover:text-white hover:bg-slate-800/30';
    return `
      <button 
        data-lang="${lang.key}" 
        class="api-lang-btn flex items-center space-x-2 px-4 py-2 rounded-xl text-xs transition cursor-pointer ${activeClass}"
      >
        <i class="fa-brands ${lang.icon} text-xs"></i>
        <span>${lang.name}</span>
      </button>
    `;
  }).join('');

  // Snippets
  let codeSnippet = '';
  if (activeLang === 'curl') {
    codeSnippet = `curl -X POST https://api.cloudconvert.com/v1/convert \\
  -H "Authorization: Bearer ${apiKey}" \\
  -F "file=@/path/to/contract.pdf" \\
  -F "tool=pdf-compress" \\
  -F "options={\\"compressionLevel\\":\\"recommended\\"}"`;
  } else if (activeLang === 'js') {
    codeSnippet = `const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

const form = new FormData();
form.append('file', fs.createReadStream('/path/to/contract.pdf'));
form.append('tool', 'pdf-compress');
form.append('options', JSON.stringify({ compressionLevel: 'recommended' }));

axios.post('https://api.cloudconvert.com/v1/convert', form, {
  headers: {
    ...form.getHeaders(),
    'Authorization': 'Bearer ${apiKey}'
  }
})
.then(res => console.log('Download URL:', res.data.downloadUrl))
.catch(err => console.error('Error:', err.message));`;
  } else if (activeLang === 'python') {
    codeSnippet = `import requests
import json

url = "https://api.cloudconvert.com/v1/convert"
headers = {"Authorization": "Bearer ${apiKey}"}

files = {"file": open("/path/to/contract.pdf", "rb")}
data = {
    "tool": "pdf-compress",
    "options": json.dumps({"compressionLevel": "recommended"})
}

response = requests.post(url, headers=headers, files=files, data=data)
if response.status_code == 200:
    print("Download URL:", response.json().get("downloadUrl"))
else:
    print("Error:", response.text)`;
  }

  return `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-grow space-y-8 text-left">
      
      <!-- Headers -->
      <div class="border-b border-purple-500/10 pb-6 space-y-2">
        <h2 class="text-xl sm:text-2xl font-bold font-display text-slate-100">Developer API Documentation</h2>
        <p class="text-xs text-slate-400">Integrate our local file compression, layout conversions, and PDF decryptions directly into your codebase.</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <!-- Left 2 Cols: Guides & Snippets -->
        <div class="lg:col-span-2 space-y-6">
          
          <!-- Sandbox Manager Card -->
          <div class="glass-card p-6 rounded-2xl border border-purple-500/5 space-y-4">
            <h3 class="text-sm font-bold text-slate-200">Generate Sandbox Keys</h3>
            <p class="text-xs text-slate-400 leading-relaxed">
              Use sandbox authentication keys to test transcode pipelines. Sandbox requests are limited to 20 MB files and include standard watermarks.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="relative flex-grow">
                <input 
                  type="text" 
                  id="api-key-input" 
                  value="${apiKey}" 
                  class="glass-input w-full text-xs font-mono rounded-xl py-3 px-4 text-purple-400 pr-10 focus:outline-none"
                  readonly
                />
                <button id="copy-key-btn" class="absolute right-3.5 top-3.5 text-slate-500 hover:text-purple-400 transition cursor-pointer" title="Copy Key">
                  <i class="fa-solid fa-copy text-sm"></i>
                </button>
              </div>
              <button id="gen-key-btn" class="glow-btn bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs px-6 py-3 rounded-xl transition cursor-pointer">
                <i class="fa-solid fa-arrows-rotate mr-1 animate-spin-slow"></i> Roll Key
              </button>
            </div>
            <span id="key-action-feedback" class="text-[10px] text-emerald-400 font-semibold hidden"><i class="fa-solid fa-check"></i> Key updated!</span>
          </div>

          <!-- Code Snippets Box -->
          <div class="glass-card rounded-2xl overflow-hidden border border-purple-500/5 flex flex-col">
            <!-- Tabs header -->
            <div class="bg-slate-950/40 p-4 border-b border-purple-500/10 flex items-center justify-between">
              <div class="flex space-x-2">
                ${langTabs}
              </div>
              <button id="copy-snippet-btn" class="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer">
                <i class="fa-solid fa-copy"></i>
                <span id="copy-snippet-text">Copy Snippet</span>
              </button>
            </div>
            <!-- Snippet Textarea -->
            <div class="p-4 bg-slate-950/80 font-mono text-[11px] text-purple-300 leading-relaxed overflow-x-auto whitespace-pre">
              ${codeSnippet}
            </div>
          </div>

          <!-- Endpoint details table -->
          <div class="space-y-4">
            <h3 class="text-xs font-bold text-slate-400 uppercase tracking-widest">Query Parameters</h3>
            <div class="glass-card rounded-2xl overflow-hidden border border-purple-500/5">
              <table class="min-w-full divide-y divide-purple-500/10 text-xs">
                <thead class="bg-slate-950/40">
                  <tr>
                    <th class="px-6 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Field</th>
                    <th class="px-6 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Required</th>
                    <th class="px-6 py-3 text-left font-bold text-slate-500 uppercase tracking-wider">Description</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-purple-500/5 text-slate-300">
                  <tr>
                    <td class="px-6 py-4 font-mono font-semibold text-purple-400">file</td>
                    <td class="px-6 py-4 text-slate-400">binary</td>
                    <td class="px-6 py-4 text-rose-400 font-bold">YES</td>
                    <td class="px-6 py-4 text-slate-400">The file stream payload to convert.</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 font-mono font-semibold text-purple-400">tool</td>
                    <td class="px-6 py-4 text-slate-400">string</td>
                    <td class="px-6 py-4 text-rose-400 font-bold">YES</td>
                    <td class="px-6 py-4 text-slate-400">Tool code ID (e.g. <code class="text-purple-400">pdf-compress</code>, <code class="text-purple-400">image-resizer</code>).</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-4 font-mono font-semibold text-purple-400">options</td>
                    <td class="px-6 py-4 text-slate-400">json string</td>
                    <td class="px-6 py-4 text-slate-500">Optional</td>
                    <td class="px-6 py-4 text-slate-400">Custom setting definitions mapping options.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

        </div>

        <!-- Right Col: API Status and Details -->
        <div class="space-y-6">
          
          <!-- API Status card -->
          <div class="glass-card p-6 rounded-2xl border border-purple-500/5 space-y-4">
            <div class="flex items-center justify-between border-b border-purple-500/10 pb-3">
              <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Service Status</h3>
              <span class="inline-flex items-center space-x-1 bg-emerald-950 border border-emerald-500/20 text-[9px] text-emerald-400 px-2 py-0.5 rounded-full font-bold">
                <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping mr-1"></span> ONLINE
              </span>
            </div>
            
            <div class="space-y-3 text-xs">
              <div class="flex justify-between">
                <span class="text-slate-500">API Response Time:</span>
                <span class="text-slate-300 font-semibold">140ms (global avg)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">SSL Certificate:</span>
                <span class="text-slate-300 font-semibold">Active (Let's Encrypt)</span>
              </div>
              <div class="flex justify-between">
                <span class="text-slate-500">Daily Sandbox Cap:</span>
                <span class="text-slate-300 font-semibold">100 files / IP</span>
              </div>
            </div>
          </div>

          <!-- Documentation Quick links -->
          <div class="glass-card p-6 rounded-2xl border border-purple-500/5 space-y-4">
            <h3 class="text-xs font-bold text-slate-200 uppercase tracking-wider">Useful SDK References</h3>
            <nav class="space-y-2 text-xs">
              <a href="#" class="block text-slate-400 hover:text-purple-400 transition py-1 flex items-center justify-between">
                <span>Webhook Integration Guides</span>
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </a>
              <a href="#" class="block text-slate-400 hover:text-purple-400 transition py-1 flex items-center justify-between">
                <span>Error Code Lookup Matrix</span>
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </a>
              <a href="#" class="block text-slate-400 hover:text-purple-400 transition py-1 flex items-center justify-between">
                <span>Dynamic Canvas Rendering</span>
                <i class="fa-solid fa-chevron-right text-[10px]"></i>
              </a>
            </nav>
          </div>

        </div>

      </div>

    </div>
  `;
}

export function initApiDocs(state, parentEl, triggerStateUpdateCallback) {
  // Lang tabs
  parentEl.querySelectorAll('.api-lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      triggerStateUpdateCallback({ apiLanguage: lang });
    });
  });

  // Roll key
  const genBtn = parentEl.querySelector('#gen-key-btn');
  const feedback = parentEl.querySelector('#key-action-feedback');
  if (genBtn) {
    genBtn.addEventListener('click', () => {
      // Generate randomized hex key
      const randHex = Math.random().toString(36).substring(2, 14);
      const newKey = `sk_sandbox_${randHex}`;
      
      triggerStateUpdateCallback({ apiKey: newKey });
      
      feedback.classList.remove('hidden');
      setTimeout(() => {
        feedback.classList.add('hidden');
      }, 2000);
    });
  }

  // Copy Key
  const copyKeyBtn = parentEl.querySelector('#copy-key-btn');
  const keyInput = parentEl.querySelector('#api-key-input');
  if (copyKeyBtn) {
    copyKeyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(keyInput.value).then(() => {
        const origIcon = copyKeyBtn.innerHTML;
        copyKeyBtn.innerHTML = '<i class="fa-solid fa-check text-emerald-400"></i>';
        setTimeout(() => {
          copyKeyBtn.innerHTML = origIcon;
        }, 1500);
      });
    });
  }

  // Copy Snippet
  const copySnippetBtn = parentEl.querySelector('#copy-snippet-btn');
  const snippetContainer = parentEl.querySelector('.bg-slate-950\\/80'); // selects code box
  if (copySnippetBtn) {
    copySnippetBtn.addEventListener('click', () => {
      const codeText = snippetContainer.innerText.trim();
      navigator.clipboard.writeText(codeText).then(() => {
        const copyText = parentEl.querySelector('#copy-snippet-text');
        const origText = copyText.innerText;
        copyText.innerText = 'Copied!';
        copySnippetBtn.classList.add('text-emerald-400');
        setTimeout(() => {
          copyText.innerText = origText;
          copySnippetBtn.classList.remove('text-emerald-400');
        }, 1500);
      });
    });
  }
}
