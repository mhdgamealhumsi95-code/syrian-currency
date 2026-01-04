const CACHE_NAME = "currency-app-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./logo.png"
"./manifest.json" //
];

// 1. تثبيت الخدمة وحفظ الملفات
self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. تشغيل التطبيق من الذاكرة إذا لم يوجد نت
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );

});

