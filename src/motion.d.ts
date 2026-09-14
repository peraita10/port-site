export type HeroMotion={progress:number;scale:number;translateY:number;copyOpacity:number;artworkOpacity:number};
export type PointerOffset={x:number;y:number};
export function getHeroMotion(scrollY:number,viewportHeight:number):HeroMotion;
export function getPointerOffset(clientX:number,clientY:number,width:number,height:number):PointerOffset;
