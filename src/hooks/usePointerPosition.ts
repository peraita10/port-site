import{useEffect,useState}from'react';

export function usePointerPosition(){
  const[position,setPosition]=useState({x:0,y:0,active:false});
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    const onPointer=(event:PointerEvent)=>{
      const x=Math.max(-1,Math.min(1,(event.clientX/window.innerWidth)*2-1));
      const y=Math.max(-1,Math.min(1,(event.clientY/window.innerHeight)*2-1));
      setPosition({x,y,active:true});
    };
    const clear=()=>setPosition(current=>({...current,active:false}));
    window.addEventListener('pointermove',onPointer,{passive:true});
    window.addEventListener('blur',clear);
    return()=>{
      window.removeEventListener('pointermove',onPointer);
      window.removeEventListener('blur',clear);
    };
  },[]);
  return position;
}
