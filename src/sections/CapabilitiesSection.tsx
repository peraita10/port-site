import{useRef,useState}from'react';
import type{PointerEvent as ReactPointerEvent}from'react';
import{usePointerPosition}from'../hooks/usePointerPosition';
import{appendTrailPoint}from'../interaction/math.js';
import type{TrailPoint}from'../interaction/math.js';

const capabilities=[
 {name:'ART DIRECTION',label:'Shape the visual point of view.',className:'cap-art'},
 {name:'WEB DESIGN',label:'Turn content into a clear digital system.',className:'cap-design'},
 {name:'DEVELOPMENT',label:'Build the interface to behave beautifully.',className:'cap-dev'},
 {name:'INTERACTION',label:'Give the site a reason to be remembered.',className:'cap-motion'},
 {name:'LAUNCH',label:'Refine, test and put it online.',className:'cap-launch'},
];

export default function CapabilitiesSection(){
 const[active,setActive]=useState(0);
 const[trail,setTrail]=useState<TrailPoint[]>([]);
 const pointer=usePointerPosition();
 const current=capabilities[active];
 const trailId=useRef(0);
 const lastTrailPosition=useRef<{x:number;y:number}|null>(null);
 const addTrail=(event:ReactPointerEvent<HTMLDivElement>)=>{
  if(event.pointerType==='touch'||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
  const last=lastTrailPosition.current;
  if(last&&Math.hypot(event.clientX-last.x,event.clientY-last.y)<18)return;
  const rect=event.currentTarget.getBoundingClientRect();
  const point={x:((event.clientX-rect.left)/rect.width)*100,y:((event.clientY-rect.top)/rect.height)*100,id:trailId.current++};
  lastTrailPosition.current={x:event.clientX,y:event.clientY};
  setTrail(points=>appendTrailPoint(points,point,14));
 };
 const endTrail=()=>{lastTrailPosition.current=null};
 return <section id="capabilities" className={`capabilities ${current.className}`}><div className="cap-stage" style={{'--px':pointer.x,'--py':pointer.y} as React.CSSProperties}><span className="cap-stage-label">02 / CAPABILITIES</span><div className="cap-visual" aria-hidden="true" onPointerMove={addTrail} onPointerLeave={endTrail}><div className="cap-trail">{trail.map(point=><span className="cap-trail-point" data-kind={point.id%3} key={point.id} style={{left:`${point.x}%`,top:`${point.y}%`}}/>)}</div><div className="cap-scene-grid"/><div className="cap-scene-frame"><span>PORT.SITE</span><b>02</b></div><div className="cap-scene-word">MAKE<br/><em>IT</em><br/>VISIBLE</div><div className="cap-scene-orbit"><i/><i/></div><div className="cap-scene-code">&lt;main&gt;<br/>grid / type / motion<br/>&lt;/main&gt;</div><div className="cap-scene-live"><span>LIVE</span><i/></div></div><p>{current.label}</p></div><div className="cap-list">{capabilities.map((item,index)=><button key={item.name} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)} data-active={index===active} aria-pressed={index===active}><span>0{index+1}</span><strong>{item.name}</strong><i>↗</i></button>)}</div></section>;
}
