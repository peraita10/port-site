import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const cover=fs.readFileSync(new URL('../src/sections/CoverSection.tsx',import.meta.url),'utf8');
const ribbon=fs.readFileSync(new URL('../src/components/MotionRibbon.tsx',import.meta.url),'utf8');
const css=fs.readFileSync(new URL('../src/styles/cover-ribbon.css',import.meta.url),'utf8');

test('cover replaces giant PORT.SITE logo with moving editorial ribbon',()=>{
  assert.doesNotMatch(cover,/cover-logo/);
  assert.match(cover,/MotionRibbon/);
  assert.match(ribbon,/WEB DESIGN/);
  assert.match(ribbon,/DIGITAL EXPERIENCES/);
});

test('ribbon accelerates on hover and respects reduced motion',()=>{
  assert.match(ribbon,/HOVER_SPEED/);
  assert.match(ribbon,/pointer:fine/);
  assert.match(css,/prefers-reduced-motion/);
});
