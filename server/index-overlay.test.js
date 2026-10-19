import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

const css=fs.readFileSync(new URL('../src/styles/shell.css',import.meta.url),'utf8');

test('open site index overlays the fixed header so INDEX and CLOSE do not overlap',()=>{
  const header=css.match(/\.site-header\{[^}]*z-index:(\d+)/);
  const panel=css.match(/\.site-index\{[^}]*z-index:(\d+)/);
  assert.ok(header&&panel);
  assert.ok(Number(panel[1])>Number(header[1]));
});
