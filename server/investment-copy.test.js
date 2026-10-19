import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const index=fs.readFileSync(new URL('../src/components/SiteIndex.tsx',import.meta.url),'utf8');
const investment=fs.readFileSync(new URL('../src/sections/InvestmentSection.tsx',import.meta.url),'utf8');
const offer=fs.readFileSync(new URL('../server/offer.js',import.meta.url),'utf8');

test('index labels section 03 as Scope',()=>{
  assert.match(index,/\['03','Scope','#offer'\]/);
});

test('investment shows combined 15000 total with web and identity split',()=>{
  assert.match(offer,/fee:15000/);
  assert.match(offer,/webFee:9000/);
  assert.match(offer,/identityFee:6000/);
  assert.match(investment,/WEB/);
  assert.match(investment,/IDENTITY/);
});
