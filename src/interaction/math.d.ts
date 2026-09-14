export type TrailPoint={x:number;y:number;id:number};
export function clamp01(value:number):number;
export function normalizedProgress(value:number,start:number,end:number):number;
export function selectStage(progress:number,count:number):number;
export function coverTransform(progress:number):{scale:number;y:number;radius:number};
export function processScrollOffset(index:number,count:number,travel:number):number;
export function appendTrailPoint(points:TrailPoint[],point:TrailPoint,limit?:number):TrailPoint[];
