import type{Offer}from'../data/types';

const money=(n:number)=>new Intl.NumberFormat('en-US').format(n);
type Props={offer:Offer};

export default function InvestmentSection({offer}:Props){
 return <section id="investment" className="investment-stage"><div className="investment-top"><span>05 / THE INVESTMENT</span><span>ONE CLEAR SCOPE</span></div><div className="investment-number"><span>USD</span><strong>{money(offer.fee)}</strong></div><div className="investment-notes"><p className="note-a"><b>50%</b> TO BEGIN</p><p className="note-b"><b>50%</b> BEFORE LAUNCH</p><p className="note-c">STRATEGY / DESIGN / DEVELOPMENT</p><p className="note-d">OPTIONAL SUPPORT<br/><b>${money(offer.maintenance)}</b> / YEAR</p></div><details className="investment-terms"><summary>Practical details <span>+</span></summary><p>Page count and functionality are agreed once content and priorities are defined. Third-party costs, larger redesigns, new functionality and substantial content additions are quoted separately.</p></details></section>;
}
