import test from 'node:test';
import assert from 'node:assert/strict';
import{clamp01,normalizedProgress,selectStage,coverTransform}from'../src/interaction/math.js';

test('clamp01 limits values to the unit interval',()=>{assert.equal(clamp01(-1),0);assert.equal(clamp01(.35),.35);assert.equal(clamp01(2),1)});
test('normalizedProgress maps a range to zero through one',()=>{assert.equal(normalizedProgress(100,100,500),0);assert.equal(normalizedProgress(300,100,500),.5);assert.equal(normalizedProgress(700,100,500),1)});
test('selectStage chooses a stable zero-based stage',()=>{assert.equal(selectStage(0,4),0);assert.equal(selectStage(.24,4),0);assert.equal(selectStage(.26,4),1);assert.equal(selectStage(1,4),3)});
test('coverTransform opens the visual field',()=>{assert.deepEqual(coverTransform(0),{scale:1,y:0,radius:0});assert.deepEqual(coverTransform(1),{scale:.76,y:18,radius:28})});
