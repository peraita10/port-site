export const clamp01=value=>Math.min(1,Math.max(0,value));
export const normalizedProgress=(value,start,end)=>{
  if(end<=start)return value>=end?1:0;
  return clamp01((value-start)/(end-start));
};
export const selectStage=(progress,count)=>{
  if(count<=1)return 0;
  return Math.min(count-1,Math.floor(clamp01(progress)*count));
};
export const coverTransform=progress=>{
  const p=clamp01(progress);
  return {scale:1-.24*p,y:18*p,radius:28*p};
};
export const processScrollOffset=(index,count,travel)=>{
  if(count<=1||travel<=0)return 0;
  const safeIndex=Math.min(count-1,Math.max(0,index));
  return (safeIndex/count)*travel;
};
export const appendTrailPoint=(points,point,limit=16)=>{
  const size=Math.max(1,Math.floor(limit));
  return [...points,point].slice(-size);
};

export const cursorToneFromRgb=(r,g,b)=>{
  const linear=value=>{const channel=clamp01(value/255);return channel<=.03928?channel/12.92:((channel+.055)/1.055)**2.4};
  const luminance=.2126*linear(r)+.7152*linear(g)+.0722*linear(b);
  return luminance>.42?'dark':'light';
};
