(function(){
  'use strict';
  // WhatsApp com mensagem pré-preenchida
  var WA='https://wa.me/551239500730?text='+encodeURIComponent('Olá! Quero agendar uma demonstração do Robonotas para o meu escritório de contabilidade.');
  document.querySelectorAll('[data-wa]').forEach(function(a){a.href=WA;a.target='_blank';a.rel='noopener';});
  var WAS='https://wa.me/551239500730?text='+encodeURIComponent('Olá! Preciso de suporte no Robonotas.');
  document.querySelectorAll('[data-wa-sup]').forEach(function(a){a.href=WAS;a.target='_blank';a.rel='noopener';});

  // menu mobile
  var t=document.querySelector('.navtoggle'), m=document.getElementById('menu');
  if(t&&m){
    t.addEventListener('click',function(){var o=m.classList.toggle('open');t.setAttribute('aria-expanded',o);t.setAttribute('aria-label',o?'Fechar menu':'Abrir menu');});
    m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');t.setAttribute('aria-expanded','false');t.setAttribute('aria-label','Abrir menu');}});
  }

  // calculadora de preço (faixas progressivas)
  var TIERS=[[50,5],[200,4],[500,3]], MIN=99, DESC=0.10;
  var brl=function(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});};
  var inp=document.getElementById('cnpjs'), om=document.getElementById('out-mes'), oa=document.getElementById('out-ano'), od=document.getElementById('out-det');
  function calc(){
    var n=Math.floor(Number(inp.value));
    if(!n||n<1){om.textContent='—';oa.textContent='—';od.textContent='Informe a quantidade de CNPJs.';return;}
    if(n>500){om.textContent='Sob consulta';oa.textContent='Sob consulta';od.textContent='Acima de 500 CNPJs o preço é sob consulta. Fale com a Robolabs.';return;}
    var tot=0, prev=0, parts=[];
    TIERS.forEach(function(f){var q=Math.min(n,f[0])-prev; if(q>0){tot+=q*f[1];parts.push(q+' × '+brl(f[1]));} prev=f[0];});
    var mes=Math.max(tot,MIN);
    om.textContent=brl(mes);
    oa.textContent=brl(mes*12*(1-DESC));
    od.textContent=parts.join(' + ')+(tot<MIN?' = '+brl(tot)+' → mensalidade mínima de '+brl(MIN):'');
  }
  if(inp){inp.addEventListener('input',calc);calc();}

  // lightbox
  var lb=document.getElementById('lightbox');
  if(lb&&typeof lb.showModal==='function'){
    var li=lb.querySelector('img'), lc=lb.querySelector('figcaption'), last=null;
    document.querySelectorAll('.shot').forEach(function(b){
      b.setAttribute('aria-label','Ampliar imagem: '+(b.dataset.caption||''));
      b.addEventListener('click',function(){
        last=b; li.src=b.dataset.full; li.alt=b.querySelector('img').alt; lc.textContent=b.dataset.caption||'';
        lb.showModal(); document.body.classList.add('lb-open'); lb.querySelector('figure').scrollTop=0;
      });
    });
    var close=function(){lb.close();};
    lb.querySelector('.lightbox__close').addEventListener('click',close);
    lb.addEventListener('click',function(e){if(e.target===lb)close();});
    lb.addEventListener('close',function(){document.body.classList.remove('lb-open');li.src='';if(last)last.focus();});
  }

  var y=document.getElementById('ano'); if(y) y.textContent=new Date().getFullYear();
})();
