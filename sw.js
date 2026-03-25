const CACHE_NAME = 'gimnas-v2';
const ASSETS = [
    './',
    './index.html',
    './styles.css',
    './app.js',
    './exercicis.js',
    './manifest.json'
];

// Instal·lació: carregar recursos al cache
self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
    self.skipWaiting(); // Forçar l'activació immediata
});

// Activació: netejar cache antic
self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(keys.map((key) => {
                if (key !== CACHE_NAME) return caches.delete(key);
            }));
        })
    );
    self.clients.claim(); // Prendre el control immediatament
});

// Peticions: estratègia Network First per a fitxers dinàmics
self.addEventListener('fetch', (e) => {
    e.respondWith(
        fetch(e.request).catch(() => {
            return caches.match(e.request);
        })
    );
});
