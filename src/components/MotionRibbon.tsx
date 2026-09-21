import{useEffect,useMemo,useRef,useState}from'react';

const NORMAL_SPEED=28;
const HOVER_SPEED=88;
const MOBILE_SPEED=16;

const ITEMS=['PORT.SITE','WEB DESIGN','DEVELOPMENT','IDEAS','BRANDS','DIGITAL EXPERIENCES'];

export default function MotionRibbon(){
 const trackRef=useRef<HTMLDivElement>(null);
 const [hovered,setHovered]=useState(false);
 const repeated=useMemo(()=>[...ITEMS,...ITEMS],[ ]);
 useEffect(()=>{
  const track=trackRef.current;
  if(!track)return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  if(reduce.matches)return;
  let raf=0;
  let previous=performance.now();
  let x=0;
  let speed=NORMAL_SPEED;
  const tick=(now:number)=>{
   const dt=Math.min((now-previous)/1000,.05);
   previous=now;
   const mobile=window.innerWidth<=760;
   const fine=window.matchMedia('(hover:hover) and (pointer:fine)').matches;
   const target=mobile?MOBILE_SPEED:(hovered&&fine?HOVER_SPEED:NORMAL_SPEED);
   speed+=(target-speed)*.08;
   const half=track.scrollWidth/2;
   x-=speed*dt;
   if(half>0&&Math.abs(x)>=half)x+=half;
   track.style.transform=`translate3d(${x}px,0,0)`;
   raf=requestAnimationFrame(tick);
  };
  raf=requestAnimationFrame(tick);
  return()=>cancelAnimationFrame(raf);
 },[hovered]);
 return <div className="cover-ribbon" onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)} aria-label="Port.site services"><div ref={trackRef} className="cover-ribbon-track">{repeated.map((item,index)=><span key={`${item}-${index}`} className="cover-ribbon-item">{item}</span>)}</div></div>;
}
