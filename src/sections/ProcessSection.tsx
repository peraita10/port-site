import{useRef}from'react';
import type{Offer}from'../data/types';
import{useScrollProgress}from'../hooks/useScrollProgress';
import{selectStage}from'../interaction/math.js';

type Props={offer:Offer};
export default function ProcessSection({offer}:Props){
 const ref=useRef<HTMLElement>(null);
 const progress=useScrollProgress(ref,2.4);
 const active=selectStage(progress,offer.schedule.length||1);
 const current=offer.schedule[active]||['',''];
 return <section id="process" className={`process-story process-state-${active+1}`} ref={ref}><div className="process-sticky"><div className="process-top"><span>04 / THE PROCESS</span><span>FOUR WEEKS</span></div><div className="process-stage"><div className="process-number">0{active+1}</div><div className="process-copy"><span>WEEK 0{active+1}</span><h2>{current[0]}</h2><p>{current[1]}</p></div><div className="process-graphic" aria-hidden="true"><i/><i/><i/><i/></div></div><div className="process-rail">{offer.schedule.map(([title],index)=><div key={title} data-active={index===active}><span>0{index+1}</span><b>{title}</b></div>)}</div></div><p className="process-note">Timing begins once the project is confirmed and content is ready.</p></section>;
}
