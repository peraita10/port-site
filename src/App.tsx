import{useEffect,useState}from'react';
import type{Offer}from'./data/types';
import SiteHeader from'./components/SiteHeader';
import CoverSection from'./sections/CoverSection';
import ManifestoSection from'./sections/ManifestoSection';
import CapabilitiesSection from'./sections/CapabilitiesSection';
import OfferSection from'./sections/OfferSection';
import ProcessSection from'./sections/ProcessSection';
import InvestmentSection from'./sections/InvestmentSection';
import FinalCtaSection from'./sections/FinalCtaSection';

export default function App(){
 const[offer,setOffer]=useState<Offer|null>(null);
 const[failed,setFailed]=useState(false);
 useEffect(()=>{
  const controller=new AbortController();
  fetch(import.meta.env.BASE_URL+'offer.json',{signal:controller.signal}).then(response=>{if(!response.ok)throw new Error('offer');return response.json()}).then(data=>{setOffer(data);setFailed(false)}).catch(error=>{if(error.name!=='AbortError')setFailed(true)});
  return()=>controller.abort();
 },[]);
 return <><SiteHeader/><main><CoverSection/><ManifestoSection/><CapabilitiesSection/>{offer?<><OfferSection offer={offer}/><ProcessSection offer={offer}/><InvestmentSection offer={offer}/></>:<section className="data-fallback"><span>03 — 05</span><h2>{failed?'The offer could not be loaded.':'Loading the offer.'}</h2>{failed&&<button onClick={()=>location.reload()}>Try again ↗</button>}</section>}<FinalCtaSection/></main></>;
}
