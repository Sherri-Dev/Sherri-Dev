const cacheName = "v2";
const cacheAssets = [
  "../index.html",
  "../CSS/style.css",
  "../JS/app.js",
  "./currentLocation.js",
  "./dataFunctions.js",
  "./domFunctions.js",
];
// Call install event
self.addEventListener("install", (e) => {
  console.log("Service worker installed");
});
// Call activate event
self.addEventListener("activate", (e) => {
  console.log("Service worker activated");
  //Remove unwanted caches
  e.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== cacheName) {
            console.log("Removed old caches");
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
//Call fetch event
self.addEventListener("fetch", (e) => {
  console.log("Fetching");
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(e.request).then((res) => res))
  );
});
