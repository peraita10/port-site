import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css=fs.readFileSync(new URL('../src/styles/sections.css',import.meta.url),'utf8');

test('mobile final CTA hides the decorative arrow',()=>{
  assert.match(css,/@media\(max-width:760px\)[\s\S]*\.final-cta a i\{display:none\}/);
});
