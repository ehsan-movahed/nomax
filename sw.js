/* NOMAX service worker — اعلان پس‌زمینه (Web Push)
   این فایل باید کنار index.html و در ریشهٔ همان دامنه قرار بگیرد: https://دامنه-شما/sw.js */
self.addEventListener('install', function(){ self.skipWaiting(); });
self.addEventListener('activate', function(e){ e.waitUntil(self.clients.claim()); });

self.addEventListener('push', function(event){
  var d = {};
  try{ d = event.data ? event.data.json() : {}; }
  catch(e){ d = { body: event.data ? event.data.text() : '' }; }
  var title = d.title || 'نومکس';
  var opts = {
    body: d.body || '',
    dir: 'rtl',
    lang: 'fa',
    tag: d.tag || 'nomax',          /* اعلان‌های هم‌نوع روی هم نمی‌نشینند */
    renotify: true,                 /* با هر اعلان جدید دوباره صدا/لرزش */
    vibrate: [200, 100, 200],
    requireInteraction: false,
    data: { url: d.url || './' }
  };
  if(d.icon) opts.icon = d.icon;
  if(d.badge) opts.badge = d.badge;
  event.waitUntil(self.registration.showNotification(title, opts));
});

self.addEventListener('notificationclick', function(event){
  event.notification.close();
  var url = (event.notification.data && event.notification.data.url) || './';
  event.waitUntil(
    self.clients.matchAll({ type:'window', includeUncontrolled:true }).then(function(list){
      for(var i = 0; i < list.length; i++){
        if('focus' in list[i]){ list[i].navigate && list[i].navigate(url); return list[i].focus(); }
      }
      return self.clients.openWindow(url);
    })
  );
});
