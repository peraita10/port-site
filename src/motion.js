const clamp=(value,min,max)=>Math.min(Math.max(value,min),max);
const round=value=>Math.round(value*100)/100;

export function getHeroMotion(scrollY,viewportHeight){
  const distance=Math.max(viewportHeight*0.62,1);
  const progress=clamp(scrollY/distance,0,1);
  return {
    progress:round(progress),
    scale:round(1-progress*0.09),
    translateY:round(progress*72),
    copyOpacity:round(1-progress*0.8),
    artworkOpacity:round(1-progress*0.35),
  };
}

export function getPointerOffset(clientX,clientY,width,height){
  if(width<=0||height<=0)return{x:0,y:0};
  return {
    x:round(clamp((clientX/width-.5)*2,-1,1)),
    y:round(clamp((clientY/height-.5)*2,-1,1)),
  };
}
