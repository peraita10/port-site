import{useCallback,useRef,useState}from'react';
import SiteIndex from'./SiteIndex';

export default function SiteHeader(){
 const[open,setOpen]=useState(false);
 const triggerRef=useRef<HTMLButtonElement>(null);
 const close=useCallback(()=>setOpen(false),[]);
 return <><header className="site-header"><a className="site-mark" href="#cover">Port.site<sup>®</sup></a><button ref={triggerRef} className="index-trigger" onClick={()=>setOpen(value=>!value)} aria-expanded={open} aria-controls="site-index">INDEX <span>{open?'×':'+'}</span></button></header><div id="site-index"><SiteIndex open={open} onClose={close} triggerRef={triggerRef}/></div></>;
}
