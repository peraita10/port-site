import{useRef}from'react';
import{useScrollProgress}from'../hooks/useScrollProgress';

export default function ManifestoSection(){
 const ref=useRef<HTMLElement>(null);
 const p=useScrollProgress(ref,.7);
 return <section id="manifesto" className="manifesto" ref={ref}><div className="manifesto-kicker">01 / THE STUDIO</div><h2><span style={{transform:`translateX(${(1-p)*-3.5}vw)`}}>Websites</span><span style={{transform:`translateX(${p*6}vw)`}}>for people with</span><span style={{transform:`translateX(${(1-p)*5}vw)`}}><em>something to show.</em></span></h2><div className="manifesto-copy"><p>We build focused portfolio websites for entrepreneurs, independent professionals and creative businesses.</p><p>Structure, identity and interaction work together so the site feels specific to the work — not pulled from a template.</p></div></section>;
}
