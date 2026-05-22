const CACHE_NAME = 'falcemacello-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/manifest.json',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/icons/apple-touch-icon.png',
  '/images/cyber-soviet-banner.png',
  '/images/falce-macello-logo-main.png',
  '/images/soviet-grid-pattern.png',
  '/images/the-hopeful-children-ep-cover.png'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Intercetta solo le richieste GET
  if (request.method !== 'GET') return;

  // Ignora le richieste non HTTP/HTTPS (es. chrome-extension://)
  if (!url.protocol.startsWith('http')) return;

  // Strategia speciale per i file audio: Cache First
  if (url.pathname.endsWith('.mp3')) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;
        
        return fetch(request).then((networkResponse) => {
          // Verifica che la risposta sia valida prima di inserirla in cache
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
    return;
  }

  // Strategia per altri asset: Stale-While-Revalidate
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      const fetchPromise = fetch(request).then((networkResponse) => {
        // Verifica che la risposta sia valida prima di inserirla in cache
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });
        
        return networkResponse;
      }).catch(() => {
        // Se il fetch fallisce (es. offline) e non c'è cache, non facciamo nulla.
        // Il cachedResponse, se esiste, verrà comunque restituito.
      });

      return cachedResponse || fetchPromise;
    })
  );
});
