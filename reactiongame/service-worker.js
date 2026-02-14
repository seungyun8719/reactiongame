const CACHE_NAME = "reaction-game-v3";

const urlsToCache = [
  "/reactiongame/",
  "/reactiongame/index.html",
  "/reactiongame/style.css",
  "/reactiongame/script.js",
  "/reactiongame/manifest.json",
  "/reactiongame/icon.png"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
