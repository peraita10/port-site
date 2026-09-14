import test from 'node:test';
import assert from 'node:assert/strict';
import {getHeroMotion,getPointerOffset} from '../src/motion.js';

test('hero motion starts neutral and clamps after the transition distance',()=>{
  assert.deepEqual(getHeroMotion(0,1000),{progress:0,scale:1,translateY:0,copyOpacity:1,artworkOpacity:1});
  assert.deepEqual(getHeroMotion(620,1000),{progress:1,scale:0.91,translateY:72,copyOpacity:0.2,artworkOpacity:0.65});
  assert.deepEqual(getHeroMotion(1000,1000),getHeroMotion(620,1000));
});

test('pointer offset normalizes pointer coordinates around the center',()=>{
  assert.deepEqual(getPointerOffset(50,50,100,100),{x:0,y:0});
  assert.deepEqual(getPointerOffset(100,0,100,100),{x:1,y:-1});
  assert.deepEqual(getPointerOffset(150,-50,100,100),{x:1,y:-1});
});
