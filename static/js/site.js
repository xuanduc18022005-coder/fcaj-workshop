(()=>{
 const body=document.body;
 // Điều hướng theo thứ tự menu, gồm cả các mục con Workshop và Worklog.
 const normalizePath=url=>new URL(url,location.href).pathname.replace(/\/index\.html$/,'/').replace(/\/$/,'');
 const pageOrder=Array.from(document.querySelectorAll('#page-order a'));
 const currentPage=pageOrder.findIndex(a=>normalizePath(a.href)===normalizePath(location.href));
 if(currentPage>=0){
   for(const [selector,i] of [['.page-prev',currentPage-1],['.page-next',currentPage+1]]){
     const target=pageOrder[i],link=document.querySelector(selector);
     if(target&&link){link.href=target.href;link.title=target.dataset.pageTitle||'';link.setAttribute('aria-label',link.getAttribute('aria-label')+': '+link.title);link.hidden=false;}
   }
 }

 const crumbToc=document.querySelector('.breadcrumb-toc');
 crumbToc?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{crumbToc.open=false;}));
 document.addEventListener('click',e=>{if(crumbToc?.open&&!crumbToc.contains(e.target))crumbToc.open=false;});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&crumbToc?.open){crumbToc.open=false;crumbToc.querySelector('summary')?.focus();}});

 const toggle=document.querySelector('.mobile-toggle');
 const shade=document.querySelector('.mobile-shade');
 const closeMenu=()=>{body.classList.remove('menu-open');if(toggle)toggle.setAttribute('aria-expanded','false');};
 toggle?.addEventListener('click',()=>{let yes=!body.classList.contains('menu-open');body.classList.toggle('menu-open',yes);toggle.setAttribute('aria-expanded',String(yes));});
 shade?.addEventListener('click',closeMenu);
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu();});
 // Chuyen trang tu select ngon ngu, giu nguyen bai viet dang doc neu co ban dich.
 const languageSelect=document.getElementById('language-select');
 languageSelect?.addEventListener('change',()=>{const target=languageSelect.value;if(target)window.location.assign(target)});
 const search=document.getElementById('site-search'),clear=document.querySelector('.search-clear'),nav=document.getElementById('site-nav'),more=document.querySelector('.sidebar-more'),results=document.getElementById('search-results');
 let items=null, pending=null;
 const escapeHTML=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
 async function update(){
  const q=search.value.trim().toLocaleLowerCase();
  if(!q){nav.hidden=false;more.hidden=false;results.hidden=true;results.innerHTML='';return}
  nav.hidden=true;more.hidden=true;results.hidden=false;
  try{if(!items){if(!pending)pending=fetch(search.dataset.index).then(r=>{if(!r.ok)throw Error('search');return r.json()});items=await pending;}}catch(e){pending=null;results.textContent='Search index unavailable';return}
  if(q!==search.value.trim().toLocaleLowerCase())return;
  const hits=items.filter(x=>(x.title+' '+x.content).toLocaleLowerCase().includes(q)).slice(0,35);
  results.innerHTML=hits.length?hits.map(x=>`<a class="search-result" href="${escapeHTML(x.url)}">${escapeHTML(x.title)}</a>`).join(''):'<p class="no-results">Không tìm thấy / No results</p>';
 }
 search?.addEventListener('input',update);clear?.addEventListener('click',()=>{search.value='';update();search.focus()});
 document.getElementById('clear-history')?.addEventListener('click',()=>{search.value='';update();});
 // Ghi nho cac trang da xem tren website; nut Clear History chi xoa dau nay, khong xoa lich su trinh duyet.
 const visitedKey='fcj-pages-visited';
 let seen=[];
 try{seen=JSON.parse(localStorage.getItem(visitedKey)||'[]');if(!Array.isArray(seen))seen=[];}catch(e){seen=[];}
 if(!seen.includes(location.pathname))seen.push(location.pathname);
 if(seen.length>250)seen=seen.slice(-250);
 try{localStorage.setItem(visitedKey,JSON.stringify(seen));}catch(e){}
 function markVisited(){document.querySelectorAll('.nav-link').forEach(a=>{try{a.classList.toggle('was-visited',seen.includes(new URL(a.href,location.href).pathname));}catch(e){}})}
 markVisited();
 document.getElementById('clear-history')?.addEventListener('click',()=>{seen=[];try{localStorage.removeItem(visitedKey)}catch(e){}markVisited();});
 const toast=document.getElementById('tool-toast');let toastTimer;
 const vi=document.documentElement.lang==='vi';
 function message(txt){if(!toast)return;toast.textContent=txt;toast.classList.add('is-shown');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('is-shown'),2200)}
 document.querySelector('[data-action="copy-link"]')?.addEventListener('click',async()=>{
   try{await navigator.clipboard.writeText(location.href);message(vi?'Đã sao chép liên kết':'Link copied')}
   catch(e){message(vi?'Hãy dùng Ctrl+L rồi Ctrl+C để sao chép':'Use Ctrl+L then Ctrl+C to copy')}
 });
 document.querySelector('[data-action="print"]')?.addEventListener('click',()=>window.print());
 const topButton=document.getElementById('back-to-top');
 const syncTop=()=>topButton?.classList.toggle('is-visible',window.scrollY>400);
 window.addEventListener('scroll',syncTop,{passive:true});syncTop();
 topButton?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
 document.querySelectorAll('.markdown-body pre').forEach(pre=>{
   if(!pre.querySelector('code'))return;
   const holder=document.createElement('div');holder.className='code-wrapper';pre.parentNode.insertBefore(holder,pre);holder.append(pre);
   const button=document.createElement('button');button.type='button';button.className='copy-code';button.textContent=vi?'Sao chép':'Copy';holder.append(button);
   button.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(pre.innerText);message(vi?'Đã sao chép mã':'Code copied')}catch(e){message(vi?'Không thể sao chép':'Copy unavailable')}});
 });
 const dialog=document.getElementById('image-lightbox');
 dialog?.querySelector('.lightbox-close')?.addEventListener('click',()=>dialog.close());
 dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
 document.querySelectorAll('.markdown-body img, .profile-image img').forEach(pic=>{
   if(pic.classList.contains('no-lightbox'))return;
   pic.tabIndex=0;pic.setAttribute('role','button');pic.setAttribute('aria-label',vi?'Xem ảnh lớn':'View larger image');
   const open=()=>{if(!dialog||!dialog.showModal)return;const img=dialog.querySelector('img');img.src=pic.currentSrc||pic.src;img.alt=pic.alt||'';dialog.querySelector('p').textContent=pic.alt||'';dialog.showModal()};
   pic.addEventListener('click',open);pic.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
 });
})();
