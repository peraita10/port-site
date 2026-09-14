import{useEffect,useState,type RefObject}from'react';

export function useScrollProgress(ref:RefObject<HTMLElement|null>,distance=1){
 const[progress,setProgress]=useState(0);
 useEffect(()=>{
  let frame=0;
  const update=()=>{
   frame=0;
   const node=ref.current;if(!node)return;
   const rect=node.getBoundingClientRect();
   const travel=Math.max(1,window.innerHeight*distance);
   setProgress(Math.max(0,Math.min(1,-rect.top/travel)));
  };
  const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
  update();window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);
  return()=>{if(frame)cancelAnimationFrame(frame);window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll)};
 },[ref,distance]);
 return progress;
}
