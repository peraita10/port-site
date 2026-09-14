import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const url=new URL('../src/styles/mobile-fixes.css',import.meta.url);
const css=fs.readFileSync(url,'utf8');

test('mobile final CTA hides the decorative arrow',()=>{
  assert.match(css,/@media\(max-width:760px\)[\s\S]*\.final-cta a i\{display:none\}/);
});

test('mobile offer rows hide decorative arrows',()=>{
  assert.match(css,/@media\(max-width:760px\)[\s\S]*\.offer-rows button i\{display:none\}/);
});
