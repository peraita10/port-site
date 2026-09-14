import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import './style.css';
import{getHeroMotion,getPointerOffset}from'./motion.js';

type Offer={currency:string;fee:number;maintenance:number;weeks:number;scope:string[][];schedule:string[][]};
const money=(n:number)=>new Intl.NumberFormat('en-US').format(n);

function MotionLayer(){
 useEffect(()=>{
  const root=document.documentElement;
  const cursor=document.querySelector('.cursor') as HTMLElement|null;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let frame=0;
  const applyScroll=()=>{
   frame=0;
   const motion=getHeroMotion(window.scrollY,window.innerHeight);
   root.style.setProperty('--hero-scale',String(motion.scale));
   root.style.setProperty('--hero-y',`${motion.translateY}px`);
   root.style.setProperty('--hero-copy-opacity',String(motion.copyOpacity));
   root.style.setProperty('--hero-art-opacity',String(motion.artworkOpacity));
   root.style.setProperty('--hero-progress',String(motion.progress));
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(applyScroll)};
  const onPointerMove=(event:PointerEvent)=>{
   root.style.setProperty('--cursor-x',`${event.clientX}px`);
   root.style.setProperty('--cursor-y',`${event.clientY}px`);
   if(!reduced){
    const pointer=getPointerOffset(event.clientX,event.clientY,window.innerWidth,window.innerHeight);
    root.style.setProperty('--pointer-x',String(pointer.x));
    root.style.setProperty('--pointer-y',String(pointer.y));
   }
   const element=event.target instanceof Element?event.target:null;
   const cursorTarget=element?.closest('[data-cursor]');
   const label=cursorTarget?.getAttribute('data-cursor')??'';
   root.dataset.cursor=label;
   if(cursor)cursor.dataset.label=label;
   const magnetic=element?.closest('[data-magnetic]');
   if(magnetic instanceof HTMLElement&&!reduced){
    const box=magnetic.getBoundingClientRect();
    magnetic.style.setProperty('--magnetic-x',`${(event.clientX-(box.left+box.width/2))*.14}px`);
    magnetic.style.setProperty('--magnetic-y',`${(event.clientY-(box.top+box.height/2))*.14}px`);
   }
  };
  const onPointerOut=(event:PointerEvent)=>{
   const element=event.target instanceof Element?event.target:null;
   const magnetic=element?.closest('[data-magnetic]');
   if(magnetic instanceof HTMLElement){
    magnetic.style.setProperty('--magnetic-x','0px');
    magnetic.style.setProperty('--magnetic-y','0px');
   }
  };
  const clearCursor=()=>{root.dataset.cursor='';if(cursor)cursor.dataset.label='';};
  applyScroll();
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('pointermove',onPointerMove,{passive:true});
  window.addEventListener('pointerout',onPointerOut,{passive:true});
  window.addEventListener('blur',clearCursor);
  return()=>{
   if(frame)cancelAnimationFrame(frame);
   window.removeEventListener('scroll',onScroll);
   window.removeEventListener('pointermove',onPointerMove);
   window.removeEventListener('pointerout',onPointerOut);
   window.removeEventListener('blur',clearCursor);
  };
 },[]);
 return <div className="cursor" aria-hidden="true"><span/></div>;
}

function Header(){const[open,setOpen]=useState(false);return <header><a className="logo" href="#top" aria-label="Port.site home" data-cursor="TOP">Port.site<span>®</span></a><button className="menu" aria-expanded={open} aria-controls="navigation" onClick={()=>setOpen(!open)}>{open?'Close':'Menu'}</button><nav id="navigation" className={open?'open':''} onClick={()=>setOpen(false)}><a href="#studio" data-cursor="GO">The studio</a><a href="#offer" data-cursor="GO">The offer</a><a href="#process" data-cursor="GO">Our process</a><a className="nav-cta magnetic" data-magnetic data-cursor="VIEW" href="#investment">Explore the investment <span>↗</span></a></nav></header>}

function Hero(){return <section className="hero" id="top"><div className="hero-sticky"><div className="eyebrow hero-copy"><span>Independent web design & development</span><span>For people with something to show.</span></div><div className="hero-heading hero-copy"><h1>Websites built<br/><span>around <em>the work.</em></span></h1><p>Considered digital spaces for entrepreneurs,<br className="desktop"/> independent professionals and creatives.</p></div><a className="hero-artwork" href="#studio" data-cursor="ENTER" aria-label="Enter the Port.site studio"><div className="art-meta"><span>PORT.SITE / DIGITAL STUDIO</span><span>MADRID — WORLDWIDE</span><span>SCROLL TO ENTER ↓</span></div><div className="art-stage"><div className="art-word art-word-port">PORT</div><div className="art-word art-word-site">SITE</div><div className="art-orbit"><span>DESIGN</span><i/><span>BUILD</span></div><div className="art-card"><span>01 / STRUCTURE</span><strong>Less noise.<br/>More clarity.</strong></div><div className="art-index">PS<br/><b>26</b></div></div><div className="art-footer"><span>Strategy</span><span>Art direction</span><span>Development</span><span>Interaction</span></div></a></div></section>}

function Studio(){return <section className="section studio" id="studio"><div className="section-label">01 / THE STUDIO</div><div><h2>Your website is<br/>your introduction.<br/><span>Make it count.</span></h2><div className="studio-copy"><p>Port.site is a web design studio for entrepreneurs, independent professionals and creative businesses that need a strong digital presence without unnecessary complexity.</p><p>We specialise in portfolio-style websites: clear, considered spaces that present your work, point of view and identity. Structure, typography, imagery and interaction work together to help visitors understand who you are and why your work matters.</p></div><div className="principles"><span data-cursor="01">Simple structure.</span><span data-cursor="02">Strong identity.</span><span data-cursor="03">Clear purpose.</span></div></div></section>}

function Scope({data}:{data:Offer}){return <section className="section scope" id="offer"><div className="section-label">02 / THE OFFER</div><div><div className="heading-row"><h2>From first idea<br/>to final detail.</h2><p>Everything you need to launch<br/>a focused portfolio website.</p></div><div className="scope-list">{data.scope.map(([title,subtitle,body],i)=><details key={title} open={i===0}><summary data-cursor="OPEN"><span className="number">0{i+1}</span><h3>{title}</h3><span className="plus" aria-hidden="true">+</span></summary><div className="detail-copy"><h4>{subtitle}</h4><p>{body}</p></div></details>)}</div><div className="inclusions"><div><h4>Included as standard</h4><p>Responsive design · Basic on-page SEO · Social sharing metadata · Contact form setup · One post-design revision round</p></div><div><h4>Quoted separately</h4><p>Brand identity, copywriting, photography, e-commerce, advanced booking, complex integrations, paid fonts and licences, hosting and ongoing maintenance.</p></div></div></div></section>}

function Process({data}:{data:Offer}){return <section className="process" id="process"><div className="section-label">03 / THE PROCESS</div><div className="heading-row"><h2>A focused<br/><em>four weeks.</em></h2><p>A collaborative process.<br/>A clear path to launch.</p></div><div className="timeline">{data.schedule.map(([title,body],i)=><article key={title} data-cursor={`0${i+1}`}><div className="week">WEEK 0{i+1}<span>0{i+1}</span></div><h3>{title}</h3><p>{body}</p></article>)}</div><p className="process-note">Estimated timing starts after approval, initial payment and receipt of the required content. Timely feedback keeps things moving; changes to scope may require a revised timeline.</p></section>}

function Investment({data}:{data:Offer}){return <section className="section investment" id="investment"><div className="section-label">04 / THE INVESTMENT</div><div><h2>A clear scope.<br/>A clear investment.</h2><div className="price"><span>PORTFOLIO WEBSITE</span><strong>${money(data.fee)}<small>{data.currency}</small></strong><p>Strategy, design and development.<br/>From structure to launch.</p></div><div className="payments"><p><b>50% to begin</b>Due on approval to reserve your project.</p><p><b>50% before launch</b>Due after final approval, before handover.</p></div><div className="support"><div><span>OPTIONAL / AFTER LAUNCH</span><h3>A little ongoing support.</h3><p>Technical support, routine maintenance, minor content updates and help with post-launch issues.</p></div><strong>${money(data.maintenance)}<small>USD / year</small></strong></div><details className="terms"><summary data-cursor="OPEN">A few practical details <span>+</span></summary><p>Page count and functionality are agreed once your content and priorities are defined. Third-party costs, including hosting, domains, premium fonts, paid plugins and external services, are paid separately. Larger redesigns, new functionality and substantial content additions are quoted separately. Personalised proposals are valid for 30 days from issue. Work outside the agreed scope is estimated and approved before implementation.</p></details></div></section>}

function App(){const[data,setData]=useState<Offer|null>(null);const[failed,setFailed]=useState(false);useEffect(()=>{const c=new AbortController();fetch(import.meta.env.BASE_URL+'offer.json',{signal:c.signal}).then(r=>{if(!r.ok)throw Error();return r.json()}).then(setData).catch(e=>{if(e.name!=='AbortError')setFailed(true)});return()=>c.abort()},[]);return <><MotionLayer/><a className="skip" href="#main">Skip to content</a><Header/><main id="main"><Hero/><Studio/>{data?<><Scope data={data}/><Process data={data}/><Investment data={data}/></>:<div className="load" role="status">{failed?<>The offer could not be loaded. <button onClick={()=>location.reload()}>Try again</button></>:'Loading the offer…'}</div>}<section className="closing"><span>YOUR WORK DESERVES A PLACE.</span><h2>Ready for<br/><em>what’s next.</em></h2><a className="magnetic" data-magnetic data-cursor="START" href="#offer">Explore what we can build together <span>↗</span></a></section></main><footer><a href="#top" className="logo" data-cursor="TOP">Port.site<span>®</span></a><p>Websites for Entrepreneurs and Creatives</p><a href="#top" data-cursor="TOP">Back to top ↑</a></footer></>};
createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);
