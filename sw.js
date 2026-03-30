const CACHE_NAME = 'macacol-v-marzo-23-final'; // Cambié el nombre para forzar el cambio
const urlsToCache = [
  './',
  'index.html',
  'manifest.json',
  'chimpance.jpg',
  'historia.html'
];

// 1. Instalar y limpiar archivos viejos
self.addEventListener('install', event => {
  self.skipWaiting(); // Esto obliga al nuevo Service Worker a activarse de inmediato
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. Borrar el caché viejo (ESTO ES LO QUE TE FALTA)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Borrando caché viejo de Valencia Col...');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// PUNTO 3: EL QUE NO DA VUELTAS
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si está en el bolsillo (caché), lo entrega YA.
      // Si no está (fetch), va a la oficina (internet).
      return response || fetch(event.request);
    })
  );
});
