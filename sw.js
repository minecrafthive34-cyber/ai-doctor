

const STATIC_CACHE_NAME = 'ai-doctor-static-v1';
const DYNAMIC_CACHE_NAME = 'ai-doctor-dynamic-v1';
const API_CACHE_NAME = 'ai-doctor-api-v1';

// A list of assets to be cached when the service worker is installed.
const urlsToCache = [
  '/',
  '/index.html',
  '/index.tsx', // This file is fetched by the browser to start the app.
  '/locales/en.json',
  '/locales/ar.json',
  // The following are essential CDN assets from index.html
  'https://cdn.tailwindcss.com',
  'https://aistudiocdn.com/react@^19.1.1',
  'https://aistudiocdn.com/react-dom@^19.1.1/client',
  'https://aistudiocdn.com/@google/genai@^1.20.0',
];

// Install service worker and cache the app shell and static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME).then(cache => {
      console.log('Service Worker: Caching app shell and static assets.');
      return cache.addAll(urlsToCache).catch(error => {
          console.error('Service Worker: Failed to cache one or more static assets during install.', error);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate service worker and clean up old caches to save space
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(cacheName => cacheName.startsWith('ai-doctor-') &&
                               cacheName !== STATIC_CACHE_NAME &&
                               cacheName !== DYNAMIC_CACHE_NAME &&
                               cacheName !== API_CACHE_NAME)
          .map(cacheName => caches.delete(cacheName))
      );
    }).then(() => self.clients.claim())
  );
});

// Intercept fetch requests
self.addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);

  // For API requests, use a cache-first strategy.
  // This will cache POST requests to the Gemini API.
  if (url.hostname === 'generativelanguage.googleapis.com') {
    event.respondWith(
      caches.open(API_CACHE_NAME).then(async (cache) => {
        const cachedResponse = await cache.match(request.clone());
        if (cachedResponse) {
          console.log('Service Worker: Serving API response from cache.', request.url);
          return cachedResponse;
        }

        try {
          const networkResponse = await fetch(request.clone());
          // If the fetch is successful, cache the response for offline use.
          if (networkResponse.ok) {
            console.log('Service Worker: Caching new API response.', request.url);
            cache.put(request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
           console.error('Service Worker: API fetch failed and no cache available.', error);
           throw error;
        }
      })
    );
    return;
  }
  
  // For all other GET requests, use a "Cache-first, then network" strategy.
  // This ensures the app shell and other assets load from cache instantly when offline.
  if (request.method === 'GET') {
      event.respondWith(
        caches.match(request).then(cachedResponse => {
          if (cachedResponse) {
            return cachedResponse;
          }
    
          return fetch(request).then(networkResponse => {
            return caches.open(DYNAMIC_CACHE_NAME).then(cache => {
              // Check for a valid response before caching to avoid saving errors.
              if (networkResponse && networkResponse.status === 200 && !url.protocol.startsWith('chrome-extension')) {
                 cache.put(request, networkResponse.clone());
              }
              return networkResponse;
            });
          });
        })
      );
  }
});