const CACHE_NAME = 'macacol-v-marzo-20'; 
const urlsToCache = [
  'index.html',
  'manifest.json',
  'chimpance.jpg',
  'historia.html'
];

// 1. Instalar y guardar archivos en el celular
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// 2. LA LLAVE: Esta parte es la que hace que funcione en la vereda
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      // Si el archivo está en la memoria del celular, lo entrega DE UNA VEZ
      // Si no está, ahí sí va y busca internet
      return response || fetch(event.request);
    })
  );
});
