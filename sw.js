/* Finance Control Center: cache public website shell only, NEVER private Drive data. */
const CACHE_NAME='finance-control-shell-v1';
const PUBLIC_ASSETS=['./','./index.html','./config.js','./manifest.webmanifest','./icon-192.svg','./icon-512.svg'];
const PUBLIC_PATHS=new Set(PUBLIC_ASSETS.map(p=>new URL(p,self.registration.scope).pathname));
self.addEventListener('install',event=>{
 event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(PUBLIC_ASSETS)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',event=>{
 event.waitUntil(Promise.all([
  caches.keys().then(names=>Promise.all(names.filter(name=>name.startsWith('finance-control-shell-')&&name!==CACHE_NAME).map(name=>caches.delete(name)))),
  self.clients.claim()
 ]));
});
self.addEventListener('fetch',event=>{
 const req=event.request;
 if(req.method!=='GET')return;
 const url=new URL(req.url);
 if(url.origin!==self.location.origin||!PUBLIC_PATHS.has(url.pathname))return;
 event.respondWith((async()=>{
  try{
   const response=await fetch(req,{cache:'no-store'});
   if(response.ok&&response.type!=='opaque'){
    const cache=await caches.open(CACHE_NAME);
    await cache.put(req,response.clone());
   }
   return response;
  }catch(error){
   const cached=await caches.match(req,{ignoreSearch:true});
   if(cached)return cached;
   throw error;
  }
 })());
});
