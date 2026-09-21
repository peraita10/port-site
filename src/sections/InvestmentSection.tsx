import type{Offer}from'../data/types';

const money=(n:number)=>new Intl.NumberFormat('en-US').format(n);
type Props={offer:Offer};

export default function InvestmentSection({offer}:Props){
 return <section id="investment" className="investment-stage">
  <div className="investment-top"><span>05 / THE INVESTMENT</span><span>ONE CLEAR SCOPE</span></div>
  <div className="investment-number"><span>USD</span><strong>{money(offer.fee)}</strong></div>

  <div className="investment-payment-band" aria-label="Payment schedule">
   <div className="investment-payment-item">
    <span>01 /</span>
    <div><strong>50%</strong><p>TO BEGIN</p></div>
   </div>
   <div className="investment-payment-item">
    <span>02 /</span>
    <div><strong>50%</strong><p>BEFORE LAUNCH</p></div>
   </div>
  </div>

  <div className="investment-support-row">
   <p>STRATEGY / DESIGN / DEVELOPMENT</p>
   <p>OPTIONAL SUPPORT / <strong>${money(offer.maintenance)}</strong> / YEAR</p>
  </div>

  <details className="investment-terms"><summary>Practical details <span>+</span></summary><p>Page count and functionality are agreed once content and priorities are defined. Third-party costs, larger redesigns, new functionality and substantial content additions are quoted separately.</p></details>
 </section>;
}
