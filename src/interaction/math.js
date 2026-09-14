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
