const filesToCache = ["/", "/index.html"];
const currentCacheName = "cache2";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(currentCacheName).then((cache) => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", (event) => {
  console.log(event.request.url);
  // if (new URL(event.request.url).origin !== location.origin) {
  //   return;
  // }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => response || fetch(event.request))
  );
});

addEventListener("activate", (event) => {
  event.waitUntil(
    (async () =>
      caches
        .keys()
        .then((cacheNames) =>
          Promise.all(
            cacheNames
              .filter((cacheName) => cacheName !== currentCacheName)
              .map((cacheName) => caches.delete(cacheName))
          )
        ))()
  );
});

self.addEventListener("message", (event) => {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
