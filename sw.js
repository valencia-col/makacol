const CACHE_NAME = 'macacol-v4'; // Cambia el número a v4 para forzar al celular a actualizar
const urlsToCache = [
  '/',
  'index.html',
  'donar.html',
  'privacidade.html',
  'manifest.json',
  'chimpance.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
