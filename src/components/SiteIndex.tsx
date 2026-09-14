import{useEffect,useRef,type RefObject}from'react';

type Props={open:boolean;onClose:()=>void;triggerRef:RefObject<HTMLButtonElement|null>};
const links=[['01','Studio','#manifesto'],['02','Capabilities','#capabilities'],['03','Offer','#offer'],['04','Process','#process'],['05','Investment','#investment'],['06','Contact','#contact']];

export default function SiteIndex({open,onClose,triggerRef}:Props){
 const panelRef=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  if(!open)return;
  const previousOverflow=document.body.style.overflow;
  document.body.style.overflow='hidden';
  const items=()=>Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a,button')??[]);
  requestAnimationFrame(()=>items()[0]?.focus());
  const onKey=(event:KeyboardEvent)=>{
   if(event.key==='Escape'){event.preventDefault();onClose();return;}
   if(event.key!=='Tab')return;
   const focusables=items();if(!focusables.length)return;
   const first=focusables[0],last=focusables[focusables.length-1];
   if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}
   else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}
  };
  document.addEventListener('keydown',onKey);
  return()=>{document.body.style.overflow=previousOverflow;document.removeEventListener('keydown',onKey);triggerRef.current?.focus();};
 },[open,onClose,triggerRef]);
 return <div className="site-index" data-open={open} aria-hidden={!open} ref={panelRef}>
  <div className="index-top"><span>PORT.SITE / INDEX</span><button onClick={onClose} tabIndex={open?0:-1}>CLOSE ×</button></div>
  <nav className="index-nav" aria-label="Site index">
   {links.map(([n,label,href])=><a key={href} href={href} onClick={onClose} tabIndex={open?0:-1}><span>{n}</span><strong>{label}</strong><i>↗</i></a>)}
  </nav>
  <div className="index-bottom"><span>WEB DESIGN + DEVELOPMENT</span><span>MADRID — WORLDWIDE</span></div>
 </div>;
}
