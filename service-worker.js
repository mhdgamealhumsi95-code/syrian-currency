const CACHE_NAME = "currency-app-v3"; // 👈 قمنا بتغيير الرقم
const ASSETS = [
  "./",
  "./index.html",
  "./logo.png",
  "./manifest.json"
];

// 1. التثبيت: فرض التحديث فوراً (Skip Waiting)
self.addEventListener("install", (e) => {
  self.skipWaiting(); // 👈 هذا الأمر يجبر النسخة الجديدة على العمل فوراً
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// 2. التفعيل: حذف الكاش القديم والسيطرة على الصفحة
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log("تم حذف الكاش القديم:", key);
            return caches.delete(key); // 🗑️ حذف الإصدارات القديمة
          }
        })
      );
    })
  );
  return self.clients.claim(); // 👈 السيطرة على الصفحة المفتوحة فوراً
});

// 3. التشغيل (كما هو)
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
