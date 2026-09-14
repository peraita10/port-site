import{useEffect,useRef}from'react';

export default function CreativeCursor(){
 const ref=useRef<HTMLDivElement>(null);
 useEffect(()=>{
  const cursor=ref.current;
  if(!cursor||!window.matchMedia('(pointer:fine)').matches)return;
  document.body.classList.add('has-creative-cursor');
  const move=(event:PointerEvent)=>{
   cursor.style.transform=`translate3d(${event.clientX}px,${event.clientY}px,0)`;
   const target=(event.target as Element|null)?.closest('a,button,summary,[data-cursor]');
   cursor.dataset.active=target?'true':'false';
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
 return <div ref={ref} className="creative-cursor" aria-hidden="true"><span/><i/><b/></div>;
}
