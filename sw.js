const V='oj-china-20261008114353';
const CORE=["./", "./index.html", "./en/", "./en/index.html", "./dealers/", "./dealers/index.html", "./dealers/en/", "./dealers/en/index.html", "./manifest.webmanifest", "./manifest-en.webmanifest", "./manifest-dealers.webmanifest", "./manifest-dealers-en.webmanifest", "./icons/icon-192.png", "./icons/apple-touch-icon.png", "./fonts/manrope-latin-300.woff2", "./fonts/manrope-latin-400.woff2", "./fonts/manrope-latin-500.woff2", "./fonts/manrope-latin-600.woff2", "./fonts/manrope-latin-700.woff2", "./fonts/plexmono-latin-400.woff2", "./fonts/plexmono-latin-500.woff2", "./fonts/syncopate-latin-400.woff2", "./fonts/syncopate-latin-700.woff2"];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V&&k!=='oj-img').map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  const r=e.request; if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res;}).catch(()=>caches.match(r).then(m=>m||caches.match(u.pathname.includes('/dealers/')?(u.pathname.includes('/en/')?'./dealers/en/index.html':'./dealers/index.html'):(u.pathname.includes('/en/')?'./en/index.html':'./index.html')))));return;}
  if(u.origin===location.origin){e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{const cp=res.clone();caches.open(V).then(c=>c.put(r,cp));return res;})));return;}
  if(r.destination==='image'){e.respondWith(caches.open('oj-img').then(c=>c.match(r).then(m=>m||fetch(r).then(res=>{c.put(r,res.clone());return res;}))));}
});
