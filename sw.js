// ColorView Pro - Service Worker
// Caches the app shell so the tool keeps working offline.
// Everything here (color math, simulation filters) runs client-side already,
// so caching these five files is enough for a full offline experience.
//
// IMPORTANT: bump CACHE_NAME (e.g. v2 -> v3) any time index.html, style.css,
// script.js, manifest.json, or the logos change. This service worker used to
// be cache-first, which meant returning visitors could get stuck on an old
// cached script.js forever, even after the real file was updated on the
// server, because it never re-checked the network. It's now network-first
// (falls back to cache only when offline), so updates show up automatically.
const CACHE_NAME = 'colorview-pro-v3';
const APP_SHELL = [
    './',
    './index.html',
    './style.css',
    './script.js',
    './manifest.json',
    './logo.png',
    './logo-dark.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
    );
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) =>
            Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
        )
    );
    self.clients.claim();
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    event.respondWith(
        fetch(event.request)
            .then((response) => {
                if (response && response.status === 200 && response.type === 'basic') {
                    const clone = response.clone();
                    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
                }
                return response;
            })
            .catch(() => caches.match(event.request))
    );
});
