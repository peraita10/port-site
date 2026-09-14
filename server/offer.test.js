import test from 'node:test';
import assert from 'node:assert/strict';
import {server} from './index.js';
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const base=`http://127.0.0.1:${server.address().port}`;
test.after(()=>server.close());
test('serves the agreed offer',async()=>{const r=await fetch(base+'/api/offer');assert.equal(r.status,200);const o=await r.json();assert.equal(o.fee,9000);assert.equal(o.maintenance,1500);assert.equal(o.scope.length,6);assert.equal(o.schedule.length,4)});
test('rejects writes and unknown APIs',async()=>{assert.equal((await fetch(base+'/api/offer',{method:'POST'})).status,405);assert.equal((await fetch(base+'/api/missing')).status,404)});
test('serves production page and rejects missing files',async()=>{const r=await fetch(base);assert.equal(r.status,200);assert.match(await r.text(),/Port.site/);assert.equal((await fetch(base+'/missing.js')).status,404)});
