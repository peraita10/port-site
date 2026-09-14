import{useState}from'react';
import{usePointerPosition}from'../hooks/usePointerPosition';

const capabilities=[
 {name:'ART DIRECTION',label:'Shape the visual point of view.',className:'cap-art'},
 {name:'WEB DESIGN',label:'Turn content into a clear digital system.',className:'cap-design'},
 {name:'DEVELOPMENT',label:'Build the interface to behave beautifully.',className:'cap-dev'},
 {name:'INTERACTION',label:'Give the site a reason to be remembered.',className:'cap-motion'},
 {name:'LAUNCH',label:'Refine, test and put it online.',className:'cap-launch'},
];

export default function CapabilitiesSection(){
 const[active,setActive]=useState(0);
 const pointer=usePointerPosition();
 const current=capabilities[active];
 return <section id="capabilities" className={`capabilities ${current.className}`}><div className="cap-stage" style={{'--px':pointer.x,'--py':pointer.y} as React.CSSProperties}><span className="cap-stage-label">02 / CAPABILITIES</span><div className="cap-visual" aria-hidden="true"><i/><i/><i/><b>PORT.SITE</b></div><p>{current.label}</p></div><div className="cap-list">{capabilities.map((item,index)=><button key={item.name} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} onClick={()=>setActive(index)} data-active={index===active}><span>0{index+1}</span><strong>{item.name}</strong><i>↗</i></button>)}</div></section>;
}
