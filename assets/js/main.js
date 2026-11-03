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

  // calculadora de preço: o valor da faixa vale para TODOS os CNPJs (não é progressivo)
  // plano mensal: sem desconto + implantação R$ 347; plano anual: pagamento mensal com 10% de desconto + implantação isenta
  var TIERS=[[50,5,'até 50 CNPJs'],[200,4,'51 a 200 CNPJs'],[500,3,'201 a 500 CNPJs']], MIN=99, DESC=0.10, IMPL=347;
  var brl=function(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});};
  function preco(n,anual){
    n=Math.floor(Number(n));
    if(!n||n<1) return null;
    if(n>500) return {consulta:true};
    var f=TIERS.filter(function(t){return n<=t[0];})[0];
    var base=n*f[1], mes=Math.max(base,MIN);
    if(anual) mes=Math.round(mes*(1-DESC)*100)/100;
    return {n:n,unit:f[1],faixa:f[2],base:base,minimo:base<MIN,mes:mes,impl:anual?0:IMPL,anual:!!anual};
  }
  if(typeof window!=='undefined') window.robonotasPreco=preco;
  var inp=document.getElementById('cnpjs'), om=document.getElementById('out-mes'), oi=document.getElementById('out-imp'), od=document.getElementById('out-det');
  var planos=document.querySelectorAll('input[name="plano"]');
  function anual(){var r=document.querySelector('input[name="plano"]:checked');return !!r&&r.value==='anual';}
  function calc(){
    var an=anual(), r=preco(inp.value,an);
    if(!r){om.textContent='—';oi.textContent='—';od.textContent='Informe a quantidade de CNPJs.';return;}
    if(r.consulta){om.textContent='Sob consulta';oi.textContent=an?'Isenta':brl(IMPL);od.textContent='Acima de 500 CNPJs o preço é negociado diretamente com a Robolabs. Fale com a gente.';return;}
    om.textContent=brl(r.mes);
    oi.textContent=an?'Isenta':brl(IMPL);
    var t=r.n+' × '+brl(r.unit)+' (faixa de '+r.faixa+') = '+brl(r.base);
    if(r.minimo) t+=' → mensalidade mínima de '+brl(MIN);
    if(an) t+=' − 10% no plano anual = '+brl(r.mes)+'/mês, pago mensalmente. Implantação isenta.';
    else t+='/mês. Implantação de '+brl(IMPL)+', cobrada uma vez.';
    od.textContent=t;
  }
  if(inp){inp.addEventListener('input',calc);planos.forEach(function(p){p.addEventListener('change',calc);});calc();}

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
