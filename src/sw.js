importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

workbox.core.skipWaiting();
workbox.core.clientsClaim();

workbox.routing.registerRoute(
  new RegExp('https\:\/\/fonts\.gstatic\.com'),
  new workbox.strategies.StaleWhileRevalidate()
);

workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);
