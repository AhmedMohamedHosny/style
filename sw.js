/**
 * MY LIFE OS — Service Worker Engine
 * Caches static UI assets for offline readiness while letting Firebase run live.
 */

const CACHE_NAME = "my-life-os-v1";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./style.css",
  "./script.js",
  "./manifest.json",
  "./logo.png"
];

// 1. التثبيت والتخزين المؤقت للملفات الثابتة
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// 2. تفعيل وتحديث الـ Cache ومسح النسخ القديمة
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 3. استراتيجية الـ Fetch (Cache-First للملفات الثابتة و Network-Only لقاعدة البيانات)
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // استثناء طلبات Firebase والمصادقة والـ API من الكاش للعمل الحي
  if (
    url.hostname.includes("firebaseio.com") ||
    url.hostname.includes("googleapis.com") ||
    url.hostname.includes("pollinations.ai") ||
    event.request.method !== "GET"
  ) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== "basic") {
          return networkResponse;
        }
        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });
        return networkResponse;
      }).catch(() => {
        // في حالة انقطاع النت تماماً، إرجاع الصفحة الرئيسية المخزنة
        if (event.request.headers.get("accept").includes("text/html")) {
          return caches.match("./index.html");
        }
      });
    })
  );
});
