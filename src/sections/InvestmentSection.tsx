import type{Offer}from'../data/types';

const money=(n:number)=>new Intl.NumberFormat('en-US').format(n);
type Props={offer:Offer};

export default function InvestmentSection({offer}:Props){
 return <section id="investment" className="investment-stage">
  <div className="investment-top"><span>05 / THE INVESTMENT</span><span>TWO WAYS TO WORK</span></div>

  <div className="investment-packages">
   <article className="investment-package">
    <div className="investment-package-head">
     <span>PACKAGE 01</span>
     <strong>WEB</strong>
    </div>
    <div className="investment-package-price"><span>USD</span><strong>{money(offer.webFee)}</strong></div>
    <div className="investment-package-payments">
     <span>50% TO BEGIN</span><span>50% TO LAUNCH</span>
    </div>
    <details className="investment-package-details">
     <summary>Practical details <span>+</span></summary>
     <p><b>SUPPLIED BRAND ASSETS.</b> Strategy, design and development of the website using your existing identity. Page count and functionality are agreed once content and priorities are defined. Copywriting, photography, identity work, paid licences, complex integrations and substantial new functionality are quoted separately.</p>
    </details>
   </article>

   <article className="investment-package">
    <div className="investment-package-head">
     <span>PACKAGE 02</span>
     <strong>WEB + IDENTITY</strong>
    </div>
    <div className="investment-package-price"><span>USD</span><strong>{money(offer.fee)}</strong></div>
    <div className="investment-package-payments">
     <span>50% TO BEGIN</span><span>50% TO LAUNCH</span>
    </div>
    <details className="investment-package-details">
     <summary>Practical details <span>+</span></summary>
     <p><b>IDENTITY DIRECTION INCLUDED.</b> Everything in the Web package plus a focused visual identity system: creative direction, logo / wordmark, typography, colour palette and core usage guidance. Naming, copywriting, photography, packaging, extensive brand guidelines, paid licences and complex integrations are quoted separately.</p>
    </details>
   </article>
  </div>

  <p className="investment-maintenance">OPTIONAL SUPPORT / <strong>${money(offer.maintenance)}</strong> / YEAR</p>
 </section>;
}
