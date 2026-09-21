import{useEffect,useRef}from'react';
import{cursorToneFromRgb}from'../interaction/math.js';

const getBackgroundRgb=(element:Element|null)=>{
 let current=element as HTMLElement|null;
 while(current){
  const value=getComputedStyle(current).backgroundColor;
  const match=value.match(/rgba?\(([^)]+)\)/);
  if(match){
   const parts=match[1].split(',').map(part=>Number.parseFloat(part.trim()));
   const alpha=parts.length>3?parts[3]:1;
   if(alpha>.18)return{r:parts[0],g:parts[1],b:parts[2]};
  }
  current=current.parentElement;
 }
 return{r:242,g:240,b:234};
};

export default function CreativeCursor(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const cursor=ref.current;
  if(!cursor||!window.matchMedia('(pointer:fine)').matches)return;
  document.body.classList.add('has-creative-cursor');
  const move=(event:PointerEvent)=>{
   cursor.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;
   const eventTarget=event.target as Element|null;
   const target=eventTarget?.closest('a,button,summary,[data-cursor]');
   cursor.dataset.active=target?'true':'false';
   const rgb=getBackgroundRgb(eventTarget);
   cursor.dataset.tone=cursorToneFromRgb(rgb.r,rgb.g,rgb.b);
  };
  const down=()=>cursor.dataset.pressed='true';
  const up=()=>cursor.dataset.pressed='false';
  window.addEventListener('pointermove',move,{passive:true});
  window.addEventListener('pointerdown',down,{passive:true});
  window.addEventListener('pointerup',up,{passive:true});
  return()=>{
   document.body.classList.remove('has-creative-cursor');
   window.removeEventListener('pointermove',move);
   window.removeEventListener('pointerdown',down);
   window.removeEventListener('pointerup',up);
  };
 },[]);
 return <div ref={ref} className="creative-cursor" data-tone="light" aria-hidden="true"><span/><i/><b/></div>;
}
