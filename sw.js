'use strict';

// importScripts('sw-toolbox.js');

// toolbox.precache([
//   "index.html",
//   "styles/main.css",
//   "images/laptop.jpg"
// ]); 

// toolbox.router.get('images/*', toolbox.cacheFirst); 

// toolbox.router.get('*', toolbox.networkFirst, { 
//   networkTimeoutSeconds: 5
// });


// Google's implementation
importScripts('/cache-polyfill.js');

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open('pwa').then(function(cache) {
      return cache.addAll([
        '/',
        '/index.html',
        '/index.html?homescreen=1',
        '/?homescreen=1',
        '/styles/main.css',
        'images/laptop.jpg'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  // each fetch'd resource, if it matches a cached version, load that
  // console.log(event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});