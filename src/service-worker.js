// src/service-worker.js
self.addEventListener("install", (event) => {
  console.log("Service Worker: Installing...");
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  console.log("Service Worker: Activated");
  event.waitUntil(clients.claim());
});

self.addEventListener("fetch", (event) => {
  // Basic fetch handler
  event.respondWith(fetch(event.request));
});
