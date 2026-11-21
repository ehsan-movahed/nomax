/* Nomax conversational search MVP: Persian intent aliases, no paid AI/API. */
(function(){
  if(window.__nxConversationInstalled)return;window.__nxConversationInstalled=true;
  function norm(s){return String(s||'').replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/[\u064B-\u065F\u0670ـ]/g,'').replace(/[\u200c\u200d]/g,' ').replace(/[.,!?،؛:()\[\]{}"'\x60~@#$%^&*_+=|\\<>/؟]/g,' ').replace(/\s+/g,' ').trim().toLowerCase();}
  var rules=[
    [['کولرم خنک نمیکنه','کولر من خنک نمیکنه','کولر گازی خنک نمیکنه','کولر سرد نمیکنه','باد گرم کولر','کولر خنک نمیکنه','کولر باد گرم میده','کولر خراب شده'],'تعمیر کولر','تعمیر کولر'],
    [['پکیج گرم نمیکنه','پکیج آب گرم نداره','شوفاژ سرد شده','آبگرمکن کار نمیکنه','آب گرم ندارم'],'تعمیر پکیج و آبگرمکن','تعمیر پکیج'],
    [['سینک گرفته','فاضلاب گرفته','لوله گرفته','آب بالا میاد','لوله نشتی داره','شیر آب چکه میکنه','نشتی آب'],'لوله‌کشی و لوله‌بازکنی','لوله کشی'],
    [['برق پریده','فیوز میپره','چراغ روشن نمیشه','برق خونه قطع شده','سیم برق مشکل داره'],'برق‌کار ساختمان','برق ساختمان'],
    [['قفل گیر کرده','در باز نمیشه','کلید داخل قفل گیر کرده','کلید گم کردم'],'کلیدسازی و بازکردن قفل','کلیدسازی'],
    [['ماشین روشن نمیشه','خودرو روشن نمیشود','ماشین استارت نمیخوره','ماشین استارت نمی زند','ماشین خوابیده','باتری ماشین خالی شده'],'عیب‌یابی خودرو',null,[['برق خودرو / باتری و استارت','برق خودرو'],['مکانیک و تعمیر خودرو','مکانیک'],['امداد خودرو','امداد خودرو']]],
    [['ماشین پنچر شده','لاستیک پنچر','پنچرگیری میخوام'],'پنچرگیری','پنچرگیری'],
    [['ماشین تصادف کرده','بدنه ماشین آسیب دیده','ماشین خط افتاده'],'صافکاری و نقاشی خودرو','صافکاری'],
    [['گوشی شارژ نمیشه','موبایل شارژ نمی شود','گوشی خراب شده','صفحه گوشی شکسته','ال سی دی شکسته','گوشی افتاده'],'تعمیر موبایل','تعمیر موبایل'],
    [['لپتاپ روشن نمیشه','لپ تاپ خراب شده','کامپیوتر کار نمیکنه','ویندوز نصب میخوام'],'تعمیر کامپیوتر و لپ‌تاپ','تعمیر کامپیوتر'],
    [['موهامو کوتاه کنم','کوتاهی مو میخوام','اصلاح مو','اصلاح سر','آرایش مو'],'آرایشگاه و کوتاهی مو','اصلاح سر'],
    [['ناخن درست کنم','کاشت ناخن میخوام','ترمیم ناخن','مانیکور'],'خدمات ناخن','ناخن'],
    [['دندون درد دارم','دندان درد','دندونم شکسته','دندانپزشک میخوام'],'دندانپزشکی','دندانپزشکی'],
    [['دکتر میخوام','ویزیت پزشک','پزشک عمومی'],'پزشک','پزشک'],
    [['نظافت منزل میخوام','نظافتچی میخوام','تمیزکاری خانه','خونه تمیز کنم'],'نظافت منزل','نظافت منزل'],
    [['اثاث کشی دارم','اسباب کشی دارم','خونه جابجا میشم','بار میخوام جابجا کنم'],'باربری و اسباب‌کشی','باربری'],
    [['لباس اندازه نیست','لباس رو کوتاه کنم','خیاط میخوام','لباس تعمیر کنم'],'خیاطی و تعمیر لباس','خیاطی'],
    [['حیوانم مریضه','گربه مریض شده','سگ مریض شده','دامپزشک میخوام'],'دامپزشکی','دامپزشکی'],
    [['مدرک چاپ کنم','پرینت میخوام','کاغذ چاپ کنم','کپی مدارک'],'چاپ و تکثیر','چاپ'],
    [['کلاس زبان میخوام','زبان یاد بگیرم','آموزش زبان میخوام','معلم زبان میخوام'],'آموزش زبان','آموزش زبان'],
    [['یخچال خنک نمیکنه','یخچال خراب شده','لباسشویی کار نمیکنه','ماشین لباسشویی خراب شده'],'تعمیر لوازم خانگی','تعمیر لوازم خانگی'],
    [['غذا سفارش میخوام','غذا بگیرم','ناهار میخوام','شام سفارش'],'غذا و رستوران','رستوران'],
    // Additional colloquial Persian phrases and common spelling variants.
    [['کولر سرویس میخواد','اسپیلت خنک نمیکنه','اسپلیت خنک نمیکنه','گاز کولر کم شده','کولر آب میده','کولر نشتی داره'],'تعمیر کولر','تعمیر کولر'],
    [['پکیج ارور میده','پکیج روشن نمیشه','رادیاتور گرم نمیشه','شوفاژ گرم نمیشه','آبگرمکن روشن نمیشه'],'تعمیر پکیج و آبگرمکن','تعمیر پکیج'],
    [['توالت گرفته','دستشویی گرفته','چاه گرفته','چاه بازکنی میخوام','لوله ترکیده','آب از لوله میاد'],'لوله‌کشی و لوله‌بازکنی','لوله کشی'],
    [['پریز برق کار نمیکنه','کلید برق خرابه','لامپ روشن نمیشه','نوسان برق دارم'],'برق‌کار ساختمان','برق ساختمان'],
    [['کلید جا گذاشتم','پشت در موندم','در قفل شده','سوئیچ داخل ماشین جا مونده'],'کلیدسازی و بازکردن قفل','کلیدسازی'],
    [['باتری ماشین خوابیده','باطری ماشین خالی شده','استارت میزنم روشن نمیشه','ماشین استارت میخوره روشن نمیشه'],'عیب‌یابی خودرو',null,[['برق خودرو / باتری و استارت','برق خودرو'],['مکانیک و تعمیر خودرو','مکانیک'],['امداد خودرو','امداد خودرو']]],
    [['لاستیک ماشین پنچر شده','لاستیک باد خالی میکنه','آپاراتی میخوام'],'پنچرگیری','پنچرگیری'],
    [['گوشی تاچش کار نمیکنه','تاچ گوشی شکسته','باتری گوشی زود خالی میشه','باتری موبایل عوض کنم'],'تعمیر موبایل','تعمیر موبایل'],
    [['لپتاپ کند شده','لپ تاپ ویروسی شده','نصب ویندوز میخوام','پرینتر وصل نمیشه'],'تعمیر کامپیوتر و لپ‌تاپ','تعمیر کامپیوتر'],
    [['سلمونی میخوام','آرایشگر مردانه','آرایشگاه زنانه میخوام','رنگ مو میخوام'],'آرایشگاه و کوتاهی مو','اصلاح سر'],
    [['دکتر دندان میخوام','عصب کشی میخوام','دندونم درد میکنه'],'دندانپزشکی','دندانپزشکی'],
    [['خونه رو تمیزکاری میخوام','کارگر نظافت میخوام','نظافت راه پله'],'نظافت منزل','نظافت منزل'],
    [['وانت بار میخوام','کامیونت برای اسباب کشی','حمل اثاثیه میخوام'],'باربری و اسباب‌کشی','باربری'],
    [['سگم مریضه','گربه ام مریضه','واکسن حیوان خانگی','ویزیت دامپزشک'],'دامپزشکی','دامپزشکی'],
    [['کپی میخوام','فتوکپی مدارک','بنر چاپ کنم','کارت ویزیت چاپ کنم'],'چاپ و تکثیر','چاپ'],
    [['ماشین ظرفشویی خراب شده','مایکروفر کار نمیکنه','اجاق گاز خراب شده','فریزر سرد نمیکنه'],'تعمیر لوازم خانگی','تعمیر لوازم خانگی'],
  ];
  function resolve(raw){var q=norm(raw);if(!q)return {kind:'empty',query:''};if(/(?:ماشین|ماشینم|خودرو|خودرویم|اتومبیل)/.test(q)&&/(?:روشن|استارت|باتری|باطری)/.test(q)&&/(?:نمی|نشد|نمیشه|نمیاد|خالی|خوابیده|کار نمیکنه)/.test(q))return {kind:'clarify',label:'عیب‌یابی خودرو',choices:[['برق خودرو، باتری یا استارت','برق خودرو'],['مکانیک و تعمیر خودرو','مکانیک'],['امداد خودرو','امداد خودرو']]};for(var i=0;i<rules.length;i++){var r=rules[i];for(var j=0;j<r[0].length;j++){var p=norm(r[0][j]);if(q.indexOf(p)>=0||(p.indexOf(q)>=0&&q.length>=4)){if(r[3])return {kind:'clarify',label:r[1],choices:r[3]};return {kind:'mapped',label:r[1],query:r[2]};}}}
    var g=null,sub=null;try{if(typeof window.guessCategory==='function')g=window.guessCategory(raw);if(g&&g.categoryId&&typeof window.guessSubcategory==='function')sub=window.guessSubcategory(raw,g.categoryId);}catch(e){}
    if(g&&sub&&window.categories){var c=window.categories.find(function(x){return x.id===g.categoryId;});var z=c&&c.subcategories.find(function(x){return x.id===sub.subcategoryId;});if(z)return {kind:'detected',label:z.name,query:z.name};}
    if(g&&g.categoryId&&window.categories){var c2=window.categories.find(function(x){return x.id===g.categoryId;});if(c2)return {kind:'category',label:c2.name,query:c2.name};}
    return {kind:'fallback',label:raw,query:raw};
  }
  window.NomaxConversationalSearch={normalize:norm,resolve:resolve};
  function esc(s){return String(s==null?'':s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  function style(){if(document.getElementById('nx-conv-css'))return;var s=document.createElement('style');s.id='nx-conv-css';s.textContent="#nxConversationalSearch{--a:#0f9f91;--ink:var(--text,#17212b);--muted:var(--text-3,#687782);margin:14px 0 18px;border:1px solid rgba(15,159,145,.2);border-radius:22px;overflow:hidden;background:var(--surface,#fff);box-shadow:0 10px 28px rgba(15,40,50,.055);direction:rtl}#nxConversationalSearch *{box-sizing:border-box}#nxConversationalSearch .nx-conv-top{display:flex;align-items:center;gap:12px;padding:15px 16px;background:linear-gradient(115deg,rgba(15,159,145,.11),rgba(15,159,145,.025));border-bottom:1px solid var(--border,rgba(120,140,150,.16))}#nxConversationalSearch .nx-conv-avatar{width:42px;height:42px;display:grid;place-items:center;border-radius:15px;background:linear-gradient(145deg,#0f766e,#19b5a5);color:#fff;font-size:21px;flex:none}#nxConversationalSearch .nx-conv-heading{min-width:0;flex:1}#nxConversationalSearch .nx-conv-title{font-size:14px;font-weight:900;color:var(--ink);line-height:1.7}#nxConversationalSearch .nx-conv-sub{font-size:11px;color:var(--muted);line-height:1.7}#nxConversationalSearch .nx-conv-free{font-size:10px;font-weight:800;color:#087c72;background:rgba(15,159,145,.1);border:1px solid rgba(15,159,145,.18);border-radius:999px;padding:5px 8px;white-space:nowrap}#nxConversationalSearch .nx-conv-log{display:flex;flex-direction:column;gap:10px;padding:14px 14px 8px;max-height:310px;overflow:auto;overscroll-behavior:contain}#nxConversationalSearch .nx-conv-msg{max-width:min(92%,620px);padding:10px 12px;border-radius:15px;font-size:12.5px;line-height:1.9;white-space:pre-wrap;overflow-wrap:anywhere}#nxConversationalSearch .nx-conv-msg.bot{align-self:flex-start;background:var(--surface-2,rgba(120,140,150,.09));color:var(--ink);border-bottom-right-radius:5px}#nxConversationalSearch .nx-conv-msg.user{align-self:flex-end;background:rgba(15,159,145,.12);color:var(--ink);border:1px solid rgba(15,159,145,.14);border-bottom-left-radius:5px}#nxConversationalSearch .nx-conv-suggestions{display:flex;gap:7px;flex-wrap:wrap;padding:3px 14px 12px}#nxConversationalSearch .nx-conv-chip{border:1px solid var(--border,#dce5e7);background:var(--surface,#fff);color:var(--ink);border-radius:999px;padding:7px 10px;font:inherit;font-size:11px;cursor:pointer}#nxConversationalSearch .nx-conv-chip:hover{border-color:var(--a);background:rgba(15,159,145,.06)}#nxConversationalSearch .nx-conv-choice{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px}#nxConversationalSearch .nx-conv-choice button{border:1px solid rgba(15,159,145,.3);background:rgba(15,159,145,.07);color:#087c72;border-radius:999px;padding:8px 11px;font:inherit;font-size:11.5px;font-weight:800;cursor:pointer}#nxConversationalSearch .nx-conv-form{display:flex;gap:8px;padding:12px 14px 10px;border-top:1px solid var(--border,rgba(120,140,150,.16));background:var(--surface,#fff)}#nxConversationalSearch .nx-conv-input{min-width:0;flex:1;height:46px;border:1px solid var(--border,#dce5e7);border-radius:14px;padding:0 13px;background:var(--surface,#fff);color:var(--ink);font:inherit;font-size:13px;outline:none}#nxConversationalSearch .nx-conv-input:focus{border-color:var(--a);box-shadow:0 0 0 3px rgba(15,159,145,.12)}#nxConversationalSearch .nx-conv-send{height:46px;border:0;border-radius:14px;padding:0 17px;background:linear-gradient(135deg,#087c72,#14aa9b);color:#fff;font:inherit;font-size:12px;font-weight:900;cursor:pointer;white-space:nowrap}#nxConversationalSearch button:focus-visible{outline:3px solid rgba(15,159,145,.35);outline-offset:2px}#nxConversationalSearch .nx-conv-foot{padding:0 14px 12px;font-size:10px;line-height:1.7;color:var(--muted)}@media(max-width:520px){#nxConversationalSearch{border-radius:18px;margin:12px 0 15px}#nxConversationalSearch .nx-conv-top{padding:12px}#nxConversationalSearch .nx-conv-log{max-height:270px;padding:12px 11px 7px}#nxConversationalSearch .nx-conv-form{padding:10px;gap:6px}#nxConversationalSearch .nx-conv-send{padding:0 13px}#nxConversationalSearch .nx-conv-input{font-size:12px}#nxConversationalSearch .nx-conv-free{font-size:9px;padding:4px 6px}}@media(prefers-reduced-motion:reduce){#nxConversationalSearch *{scroll-behavior:auto!important;transition:none!important}}";document.head.appendChild(s);}
  function addMessage(log,kind,message){var n=document.createElement('div');n.className='nx-conv-msg '+kind;n.textContent=message;log.appendChild(n);log.scrollTop=log.scrollHeight;return n;}
  function runSearch(query,label,log){
    var input=document.getElementById('searchInput');if(!input){addMessage(log,'bot','کادر جستجوی اصلی سایت در دسترس نیست. لطفاً صفحه را تازه‌سازی کن.');return;}
    input.value=query;
    if(typeof window.nxResetConversationalFilters==='function'){
      window.nxResetConversationalFilters();
      if(typeof window.searchBusinesses==='function')window.searchBusinesses({scroll:true});
      else{var resetBtn=document.getElementById('searchButton');if(resetBtn)resetBtn.click();}
    }else{
      var changed=false;
      try{var panel=document.getElementById('categoryMenuPanel'),all=panel&&panel.querySelector('.category-menu-all');if(all&&!all.classList.contains('active')){all.click();changed=true;}}catch(e){}
      var tab=document.querySelector('#nxTabs .nx-tab.active');
      if(tab&&tab.getAttribute('data-tab')!=='all'&&typeof window.nxSetTab==='function'){window.nxSetTab('all',{scroll:true});changed=true;}
      else if(!changed&&typeof window.searchBusinesses==='function')window.searchBusinesses({scroll:true});
      else if(!changed){var btn=document.getElementById('searchButton');if(btn)btn.click();}
    }
    var count=document.getElementById('resultCount'),ct=count?String(count.textContent||'').trim():'';
    if(ct&&/^۰\s|^0\s/.test(ct))addMessage(log,'bot','در اطلاعات فعلی نوماکس نتیجه‌ای برای این درخواست پیدا نشد. می‌توانی عبارت ساده‌تر یا خدمت نزدیک‌تری را امتحان کنی.');
    else addMessage(log,'bot','درخواستت به جستجوی «'+label+'» تبدیل شد. نتایج ثبت‌شده در نوماکس پایین صفحه نمایش داده می‌شوند.');
  }
  function mount(){
    var box=document.getElementById('searchBox');if(!box||document.getElementById('nxConversationalSearch'))return;style();
    var p=document.createElement('section');p.id='nxConversationalSearch';p.setAttribute('aria-label','دستیار جستجوی نوماکس');
    p.innerHTML='<div class="nx-conv-top"><span class="nx-conv-avatar" aria-hidden="true">✦</span><div class="nx-conv-heading"><div class="nx-conv-title">دستیار جستجوی نوماکس</div><div class="nx-conv-sub">نیازت رو با زبان خودت بگو تا خدمات مرتبط رو پیدا کنیم.</div></div><span class="nx-conv-free">بدون هزینه</span></div><div class="nx-conv-log" id="nxConvLog" role="log" aria-live="polite" aria-relevant="additions"><div class="nx-conv-msg bot">سلام! چه خدمتی لازم داری؟ مثلاً بگو «کولرم خنک نمی‌کنه» یا «ماشینم روشن نمی‌شه».</div></div><div class="nx-conv-suggestions"><button type="button" class="nx-conv-chip" data-example="کولرم خنک نمیکنه">❄️ تعمیر کولر</button><button type="button" class="nx-conv-chip" data-example="ماشینم روشن نمیشه">🚗 مشکل خودرو</button><button type="button" class="nx-conv-chip" data-example="گوشی شارژ نمیشه">📱 تعمیر موبایل</button><button type="button" class="nx-conv-chip" data-example="سینک گرفته">🚰 لوله‌کشی</button></div><form class="nx-conv-form"><input class="nx-conv-input" id="nxConvInput" type="text" maxlength="180" autocomplete="off" aria-label="شرح نیاز یا مشکل" placeholder="مثلاً ماشینم روشن نمی‌شود…"><button class="nx-conv-send" type="submit">جستجو ←</button></form><div class="nx-conv-foot">پیشنهادها بر اساس اطلاعات ثبت‌شده در نوماکس هستند؛ نتیجه یا شماره تماس ساختگی نمایش داده نمی‌شود.</div>';
    var sticky=document.getElementById('stickySearchWrap');if(sticky&&sticky.parentNode)sticky.parentNode.insertBefore(p,sticky.nextSibling);else box.parentNode.insertBefore(p,box.nextSibling);
    var form=p.querySelector('form'),input=p.querySelector('#nxConvInput'),log=p.querySelector('#nxConvLog');
    function submit(value){
      var raw=String(value||'').trim();if(!raw){input.focus();return;}addMessage(log,'user',raw);input.value='';var r=resolve(raw);if(r.kind==='empty')return;
      if(r.kind==='clarify'){
        addMessage(log,'bot','برای اینکه نتیجه دقیق‌تری پیدا کنیم، کدام مورد به مشکلت نزدیک‌تر است؟');
        var holder=document.createElement('div');holder.className='nx-conv-choice';
        r.choices.forEach(function(choice){var b=document.createElement('button');b.type='button';b.textContent=choice[0];b.addEventListener('click',function(){holder.remove();addMessage(log,'user',choice[0]);addMessage(log,'bot','متوجه شدم؛ دارم گزینه مرتبط را در فهرست نوماکس جستجو می‌کنم.');runSearch(choice[1],choice[0],log);});holder.appendChild(b);});
        log.appendChild(holder);log.scrollTop=log.scrollHeight;return;
      }
      var label=r.label||raw,query=r.query||raw;
      if(r.kind==='fallback')addMessage(log,'bot','عبارتت را مستقیم در فهرست خدمات نوماکس جستجو می‌کنم. اگر نتیجه دقیق نبود، نام خدمت را کوتاه‌تر بنویس.');
      else addMessage(log,'bot','به نظر می‌رسد دنبال «'+label+'» هستی. موارد ثبت‌شده را بررسی می‌کنم.');
      runSearch(query,label,log);
    }
    form.addEventListener('submit',function(e){e.preventDefault();submit(input.value);});
    p.querySelectorAll('[data-example]').forEach(function(b){b.addEventListener('click',function(){submit(b.getAttribute('data-example'));});});
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',mount,{once:true});else mount();
  if(typeof MutationObserver!=='undefined'&&document.body){var observer=new MutationObserver(function(){mount();});observer.observe(document.body,{childList:true,subtree:true});}
})();