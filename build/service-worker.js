
// 1. Create a service worker file 'service-worker.js' at your public root:

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('astro-cache-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/static/js/bundle.js', // adjust path if using CRA build
        '/static/css/main.css'   // adjust path if using CRA build
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

/*
const CACHE_NAME = 'astro-cache-v1';
const urlsToCache = ['/', '/index.html', '/bundle.js', '/index.css'];


self.addEventListener('install', (event) => {
event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});


self.addEventListener('fetch', (event) => {
event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});
*/