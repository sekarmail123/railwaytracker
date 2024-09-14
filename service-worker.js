const CACHE_NAME = 'railway-tracker-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.css',
    'https://unpkg.com/leaflet@1.7.1/dist/leaflet.js'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
    );
});

self.addEventListener('fetch', event => {
    console.log("fetch event")
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});
