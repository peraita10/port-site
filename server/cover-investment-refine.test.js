import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const coverCss=fs.readFileSync(new URL('../src/styles/cover-ribbon.css',import.meta.url),'utf8');
const investmentCss=fs.readFileSync(new URL('../src/styles/investment-proposal-a.css',import.meta.url),'utf8');

test('purple cover initially overlays ribbon and reveals it as cover transforms',()=>{
  assert.match(coverCss,/\.cover-ribbon\{[\s\S]*position:absolute/);
  assert.match(coverCss,/\.cover-ribbon\{[\s\S]*z-index:1/);
  assert.match(coverCss,/\.cover-sticky \.cover-field\{[\s\S]*z-index:2/);
});

test('investment layout uses only structural separators',()=>{
  assert.doesNotMatch(investmentCss,/\.investment-payment-band\{[\s\S]*border-top:/);
  assert.doesNotMatch(investmentCss,/\.investment-payment-band\{[\s\S]*border-bottom:/);
  assert.match(investmentCss,/\.investment-payment-item:first-child\{border-right:1px solid/);
  assert.match(investmentCss,/\.investment-support-row\{[\s\S]*border-top:1px solid/);
  assert.doesNotMatch(investmentCss,/\.investment-support-row\{[\s\S]*border-bottom:/);
});
