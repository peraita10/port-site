import{useRef}from'react';
import{useScrollProgress}from'../hooks/useScrollProgress';
import{usePointerPosition}from'../hooks/usePointerPosition';
import{coverTransform}from'../interaction/math.js';
import MotionRibbon from'../components/MotionRibbon';

export default function CoverSection(){
 const ref=useRef<HTMLElement>(null);
 const progress=useScrollProgress(ref,.75);
 const pointer=usePointerPosition();
 const motion=coverTransform(progress);
 const style={
  transform:`translate3d(${pointer.x*10*(1-progress)}px,${motion.y+pointer.y*8*(1-progress)}px,0) scale(${motion.scale})`,
  borderRadius:`${motion.radius}px`
 } as React.CSSProperties;
 return <section id="cover" className="cover" ref={ref}><div className="cover-sticky"><div className="cover-meta"><span>WEB DESIGN + DEVELOPMENT</span><span>PORT.SITE / 2026</span></div><MotionRibbon/><div className="cover-field" style={style}><span className="field-kicker">FOR PEOPLE WITH SOMETHING TO SHOW</span><div className="field-cross" aria-hidden="true"/><strong>Ideas<br/>need a<br/><em>place.</em></strong><span className="field-scroll">SCROLL / ENTER ↓</span></div></div></section>;
}
