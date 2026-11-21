/* Nomax AI assistant — local Ollama runtime, no paid API. */
(function(){
'use strict';
var API='http://localhost:11434',STORE='nomax_ollama_chat_v1';
var $=function(s){return document.querySelector(s);};
var state={models:[],model:'',messages:[],busy:false,controller:null};
var log=$('#chatLog'),form=$('#chatForm'),input=$('#chatInput'),modelSelect=$('#modelSelect'),status=$('#connectionStatus'),send=$('#sendBtn');
function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function fmt(s){var x=esc(s);x=x.replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,'<code>$1</code>').replace(/\n/g,'<br>');return x;}
function setStatus(text,kind){status.textContent=text;status.className='status '+(kind||'');}
function save(){try{localStorage.setItem(STORE,JSON.stringify({model:state.model,messages:state.messages.slice(-40)}));}catch(e){}}
function render(){
 log.innerHTML='';
 if(!state.messages.length){var welcome=document.createElement('div');welcome.className='welcome';welcome.innerHTML='<div class="welcome-icon">✦</div><h2>سلام! من دستیار هوشمند نوماکس هستم</h2><p>هر سؤالی دربارهٔ خدمات، کسب‌وکار، ایده یا کارهای روزمره داری بپرس.</p><div class="prompts"><button type="button">چطور بهترین تعمیرکار را انتخاب کنم؟</button><button type="button">برای راه‌اندازی کسب‌وکار محلی چه کنم؟</button><button type="button">این مشکل فنی را مرحله‌به‌مرحله بررسی کن</button></div>';log.appendChild(welcome);
 welcome.querySelectorAll('button').forEach(function(b){b.addEventListener('click',function(){input.value=b.textContent;input.focus();});});return;}
 state.messages.forEach(function(m){var item=document.createElement('article');item.className='message '+m.role;var who=document.createElement('div');who.className='message-who';who.textContent=m.role==='user'?'شما':'دستیار نوماکس';var body=document.createElement('div');body.className='message-body';body.innerHTML=fmt(m.content);item.appendChild(who);item.appendChild(body);log.appendChild(item);});
 log.scrollTop=log.scrollHeight;
}
async function loadModels(){
 setStatus('در حال اتصال به Ollama…','loading');
 try{
  var r=await fetch(API+'/api/tags');if(!r.ok)throw new Error('HTTP '+r.status);
  var data=await r.json();state.models=(data.models||[]).map(function(m){return m.name;});
  modelSelect.innerHTML='';
  if(!state.models.length){modelSelect.innerHTML='<option value="">مدلی نصب نشده</option>';setStatus('Ollama متصل است؛ هنوز مدلی نصب نیست','warn');return;}
  state.models.forEach(function(name){var o=document.createElement('option');o.value=name;o.textContent=name;modelSelect.appendChild(o);});
  var preferred=state.models.find(function(n){return n.indexOf('qwen3:8b')===0;})||state.models.find(function(n){return n.indexOf('qwen3')===0;})||state.models[0];
  state.model=state.models.indexOf(state.model)>=0?state.model:preferred;modelSelect.value=state.model;
  setStatus('متصل · '+state.models.length+' مدل آماده','ok');
 }catch(e){state.models=[];modelSelect.innerHTML='<option value="">اتصال برقرار نیست</option>';setStatus('Ollama در دسترس نیست','error');}
}
function setBusy(v){state.busy=v;send.disabled=v;send.textContent=v?'در حال پاسخ…':'ارسال';$('#stopBtn').hidden=!v;$('#modelSelect').disabled=v;}
async function sendMessage(text){
 var q=String(text||'').trim();if(!q||state.busy)return;
 if(!state.model){setStatus('ابتدا یک مدل در Ollama نصب کن','warn');return;}
 state.messages.push({role:'user',content:q});input.value='';render();save();setBusy(true);
 state.messages.push({role:'assistant',content:''});render();
 var answerNode=log.lastElementChild&&log.lastElementChild.querySelector('.message-body');
 var history=[{role:'system',content:'تو دستیار هوشمند وب‌سایت نوماکس هستی. به زبان فارسی روان، دقیق، محترمانه و کاربردی پاسخ بده. اگر کاربر به زبان دیگری نوشت، همان زبان را به کار ببر. اطلاعات، قیمت، شماره تماس یا کسب‌وکار را جعل نکن. اگر از اطلاعات روز مطمئن نیستی شفاف بگو. برای مسائل خطرناک یا تخصصی، احتیاط و مراجعه به متخصص را یادآوری کن. پاسخ‌ها را ساختارمند و تا حد نیاز مختصر بنویس.'}].concat(state.messages.slice(0,-1));
 state.controller=new AbortController();
 try{
  var response=await fetch(API+'/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:state.model,messages:history,stream:true,options:{temperature:0.6}}),signal:state.controller.signal});
  if(!response.ok)throw new Error('پاسخ Ollama: '+response.status);
  var reader=response.body.getReader(),decoder=new TextDecoder(),buffer='';
  while(true){var part=await reader.read();if(part.done)break;buffer+=decoder.decode(part.value,{stream:true});var lines=buffer.split('\n');buffer=lines.pop();for(var i=0;i<lines.length;i++){if(!lines[i].trim())continue;var packet=JSON.parse(lines[i]);var piece=packet.message&&packet.message.content||'';if(piece){state.messages[state.messages.length-1].content+=piece;if(answerNode)answerNode.innerHTML=fmt(state.messages[state.messages.length-1].content);log.scrollTop=log.scrollHeight;}}}
  if(buffer.trim()){var last=JSON.parse(buffer);state.messages[state.messages.length-1].content+=last.message&&last.message.content||'';}
  if(answerNode)answerNode.innerHTML=fmt(state.messages[state.messages.length-1].content);
  if(!state.messages[state.messages.length-1].content)state.messages[state.messages.length-1].content='پاسخی دریافت نشد؛ دوباره تلاش کن.';
  setStatus('متصل · '+state.model,'ok');save();
 }catch(e){
  if(e.name==='AbortError'){state.messages[state.messages.length-1].content+='\n\n(پاسخ متوقف شد)';}
  else{state.messages[state.messages.length-1].content='اتصال به Ollama ناموفق بود. مطمئن شو برنامهٔ Ollama باز است و مبدأ سایت در OLLAMA_ORIGINS مجاز شده است.\n\nجزئیات: '+e.message;setStatus('خطا در ارتباط با Ollama','error');}
  render();save();
 }finally{state.controller=null;setBusy(false);input.focus();}
}
try{var old=JSON.parse(localStorage.getItem(STORE)||'{}');if(old&&Array.isArray(old.messages))state.messages=old.messages.filter(function(m){return m&&['user','assistant'].includes(m.role)&&typeof m.content==='string';});if(old&&old.model)state.model=old.model;}catch(e){}
modelSelect.addEventListener('change',function(){state.model=modelSelect.value;save();});
form.addEventListener('submit',function(e){e.preventDefault();sendMessage(input.value);});
$('#stopBtn').addEventListener('click',function(){if(state.controller)state.controller.abort();});
$('#clearBtn').addEventListener('click',function(){state.messages=[];save();render();});
$('#refreshModels').addEventListener('click',loadModels);
$('#installToggle').addEventListener('click',function(){$('#setupPanel').hidden=!$('#setupPanel').hidden;});
render();loadModels();
})();