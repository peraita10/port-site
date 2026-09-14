import test from 'node:test';
import assert from 'node:assert/strict';
import{clamp01,normalizedProgress,selectStage,coverTransform,processScrollOffset,appendTrailPoint}from'../src/interaction/math.js';

test('clamp01 limits values to the unit interval',()=>{assert.equal(clamp01(-1),0);assert.equal(clamp01(.35),.35);assert.equal(clamp01(2),1)});
test('normalizedProgress maps a range to zero through one',()=>{assert.equal(normalizedProgress(100,100,500),0);assert.equal(normalizedProgress(300,100,500),.5);assert.equal(normalizedProgress(700,100,500),1)});
test('selectStage chooses a stable zero-based stage',()=>{assert.equal(selectStage(0,4),0);assert.equal(selectStage(.24,4),0);assert.equal(selectStage(.26,4),1);assert.equal(selectStage(1,4),3)});
test('coverTransform opens the visual field',()=>{assert.deepEqual(coverTransform(0),{scale:1,y:0,radius:0});assert.deepEqual(coverTransform(1),{scale:.76,y:18,radius:28})});
test('processScrollOffset places each clickable phase inside its scroll quarter',()=>{assert.equal(processScrollOffset(0,4,2400),0);assert.equal(processScrollOffset(1,4,2400),600);assert.equal(processScrollOffset(2,4,2400),1200);assert.equal(processScrollOffset(3,4,2400),1800);assert.equal(processScrollOffset(7,4,2400),1800)});
test('appendTrailPoint keeps only the newest trail points',()=>{const start=[{x:10,y:10,id:1},{x:20,y:20,id:2}];assert.deepEqual(appendTrailPoint(start,{x:30,y:30,id:3},2),[{x:20,y:20,id:2},{x:30,y:30,id:3}])});
