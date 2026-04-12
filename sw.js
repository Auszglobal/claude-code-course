const CACHE_NAME = 'claude-course-v6';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/gemini.html',
  '/tldr-data.js',
  '/prompt-templates.js',
  '/cheat-sheets.js',
  '/gemini-tldr-data.js',
  '/gemini-cheat-sheets.js',
  '/gemini-prompt-templates.js',
  '/og-image.png',
  '/icon-192.png',
  '/icon-512.png',
  '/TT.PNG',
  '/Chandon.PNG',
  '/claude-logo.JPG',
  '/gemini-logo.PNG',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/marked/12.0.1/marked.min.js',
  'https://cdn.jsdelivr.net/npm/marked-highlight@2.2.1/lib/index.umd.min.js',
];

// Install — cache static assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

// Handle clear cache message
self.addEventListener('message', (e) => {
  if (e.data && e.data.type === 'CLEAR_CACHE') {
    caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
  }
});

// Activate — clean old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — network first for .md files and API calls, cache first for static assets
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Network-first for HTML, module content, and API calls
  if (url.pathname.endsWith('.html') || url.pathname === '/' || url.pathname.endsWith('.md') || url.hostname.includes('firestore')) {
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  // Cache-first for everything else
  e.respondWith(
    caches.match(e.request).then((cached) => {
      if (cached) return cached;
      return fetch(e.request).then((res) => {
        if (res.ok && url.protocol.startsWith('http')) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
