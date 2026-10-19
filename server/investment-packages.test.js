import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const investment=fs.readFileSync(new URL('../src/sections/InvestmentSection.tsx',import.meta.url),'utf8');

test('investment presents two packages instead of a combined total breakdown',()=>{
  assert.match(investment,/PACKAGE 01/);
  assert.match(investment,/PACKAGE 02/);
  assert.match(investment,/WEB \+ IDENTITY/);
  assert.match(investment,/offer\.webFee/);
  assert.match(investment,/offer\.fee/);
  assert.doesNotMatch(investment,/investment-scope-breakdown/);
});

test('each investment package has its own practical details',()=>{
  const count=(investment.match(/<details/g)||[]).length;
  assert.equal(count,2);
  assert.match(investment,/SUPPLIED BRAND ASSETS/);
  assert.match(investment,/IDENTITY DIRECTION/);
});
