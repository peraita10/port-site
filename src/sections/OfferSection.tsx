import{useState}from'react';
import type{Offer}from'../data/types';

type Props={offer:Offer};

export default function OfferSection({offer}:Props){
 const[active,setActive]=useState(0);
 const current=offer.scope[active]??[];
 return <section id="offer" className="offer-index"><header><span>03 / THE OFFER</span><h2>Everything needed.<br/><em>Nothing generic.</em></h2></header><div className="offer-layout"><div className="offer-rows">{offer.scope.map(([title,subtitle],index)=><button key={title} onClick={()=>setActive(index)} onMouseEnter={()=>setActive(index)} onFocus={()=>setActive(index)} data-active={index===active}><span>0{index+1}</span><strong>{title}</strong><small>{subtitle}</small><i>↗</i></button>)}</div><article className="offer-detail" key={current[0]}><span>SELECTED / 0{active+1}</span><h3>{current[1]}</h3><p>{current[2]}</p><b>PORT.SITE / SCOPE</b></article></div><div className="offer-footnotes"><div><span>INCLUDED AS STANDARD</span><p>Responsive design · Basic on-page SEO · Social sharing metadata · Contact form setup · One post-design revision round</p></div><div><span>QUOTED SEPARATELY</span><p>Brand identity, copywriting, photography, e-commerce, advanced booking, complex integrations, paid fonts and licences, hosting and ongoing maintenance.</p></div></div></section>;
}
