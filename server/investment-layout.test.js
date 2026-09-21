import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const section=fs.readFileSync(new URL('../src/sections/InvestmentSection.tsx',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../src/styles/investment-proposal-a.css',import.meta.url),'utf8');

test('investment proposal A uses a structured payment band',()=>{
  assert.match(section,/investment-payment-band/);
  assert.match(section,/investment-payment-item/);
  assert.match(section,/investment-support-row/);
  assert.match(css,/\.investment-payment-band\{/);
  assert.match(css,/grid-template-columns:1fr 1fr/);
});
