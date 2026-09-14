# Port.site Full Restructure Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current conventional landing-page structure with a new editorial, interactive Port.site experience built around a cover, manifesto, capability stage, editorial offer index, sticky four-state process, full-screen investment statement, and final CTA.

**Architecture:** Keep React + TypeScript + Vite and the existing static `offer.json` build flow. Break the current monolithic page into focused sections/components, centralize normalized scroll/pointer calculations in testable helpers, and implement interaction with CSS transforms/clip-path plus small React state machines rather than a heavy animation framework.

**Tech Stack:** React 19, TypeScript 5.8, Vite 6.3, CSS, Node.js 22, Node test runner, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-09-14-port-site-restructure-design.md`

## Global Constraints

- The current page structure must not survive visually.
- Keep GitHub Pages compatibility and `import.meta.env.BASE_URL + 'offer.json'` loading.
- No backend is required for this version.
- Do not add Three.js/WebGL in the first implementation.
- Avoid large external animation frameworks unless implementation complexity clearly justifies one.
- Use no stock video or large bitmap assets in the first structural pass.
- Respect `prefers-reduced-motion`.
- No essential information may depend on hover.
- Keep the commercial offer understandable: $9,000 USD, $1,500/year optional maintenance, four-week process, inclusions and practical terms.
- Primary shell is `Port.site®` left and `INDEX +` right; remove the conventional multi-link nav.

---

## File Map

### Entry / app
- `src/main.tsx` — render only `<App />` and import global styles.
- `src/App.tsx` — load offer data, own retry state, compose sections.
- `src/data/types.ts` — shared `Offer` type.

### Shared UI
- `src/components/SiteHeader.tsx` — fixed shell and index trigger.
- `src/components/SiteIndex.tsx` — full-screen index overlay, keyboard/focus behavior.

### Sections
- `src/sections/CoverSection.tsx`
- `src/sections/ManifestoSection.tsx`
- `src/sections/CapabilitiesSection.tsx`
- `src/sections/OfferSection.tsx`
- `src/sections/ProcessSection.tsx`
- `src/sections/InvestmentSection.tsx`
- `src/sections/FinalCtaSection.tsx`

### Interaction utilities/hooks
- `src/interaction/math.js` — pure normalized helpers used by tests and React.
- `src/hooks/useScrollProgress.ts`
- `src/hooks/usePointerPosition.ts`

### Styles
- `src/styles/tokens.css`
- `src/styles/global.css`
- `src/styles/shell.css`
- `src/styles/sections.css`
- Remove use of legacy `src/style.css` after parity is complete.

### Tests
- `server/interaction.test.js` — pure interaction-state tests.
- Keep `server/offer.test.js` unchanged unless build-path behavior changes.

---

### Task 1: New application skeleton and interaction primitives

**Files:**
- Create: `src/App.tsx`
- Create: `src/data/types.ts`
- Create: `src/interaction/math.js`
- Create: `src/hooks/useScrollProgress.ts`
- Create: `src/hooks/usePointerPosition.ts`
- Create: `src/styles/tokens.css`
- Create: `src/styles/global.css`
- Modify: `src/main.tsx`
- Modify: `server/interaction.test.js`

**Interfaces:**
- Produces: `export type Offer = {currency:string;fee:number;maintenance:number;weeks:number;scope:string[][];schedule:string[][]}`
- Produces: `clamp01(value:number): number`
- Produces: `normalizedProgress(value:number,start:number,end:number): number`
- Produces: `selectStage(progress:number,count:number): number`
- Produces: `useScrollProgress(ref: RefObject<HTMLElement|null>, distance?: number): number`
- Produces: `usePointerPosition(): {x:number;y:number;active:boolean}` where x/y are -1..1.

- [ ] **Step 1: Extend failing interaction tests**

Create/replace `server/interaction.test.js` with:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import {clamp01,normalizedProgress,selectStage} from '../src/interaction/math.js';

test('clamp01 limits values to the unit interval',()=>{
  assert.equal(clamp01(-1),0);
  assert.equal(clamp01(.35),.35);
  assert.equal(clamp01(2),1);
});

test('normalizedProgress maps a range to zero through one',()=>{
  assert.equal(normalizedProgress(100,100,500),0);
  assert.equal(normalizedProgress(300,100,500),.5);
  assert.equal(normalizedProgress(700,100,500),1);
});

test('selectStage chooses a stable zero-based stage',()=>{
  assert.equal(selectStage(0,4),0);
  assert.equal(selectStage(.24,4),0);
  assert.equal(selectStage(.26,4),1);
  assert.equal(selectStage(1,4),3);
});
```

- [ ] **Step 2: Run the interaction test and verify RED**

Run: `node --test server/interaction.test.js`

Expected: FAIL because `src/interaction/math.js` does not exist.

- [ ] **Step 3: Implement pure math helpers**

Create `src/interaction/math.js`:

```js
export const clamp01=value=>Math.min(1,Math.max(0,value));
export const normalizedProgress=(value,start,end)=>{
  if(end<=start)return value>=end?1:0;
  return clamp01((value-start)/(end-start));
};
export const selectStage=(progress,count)=>{
  if(count<=1)return 0;
  return Math.min(count-1,Math.floor(clamp01(progress)*count));
};
```

- [ ] **Step 4: Implement shared TypeScript data and hooks**

Create `src/data/types.ts`:

```ts
export type Offer={
  currency:string;
  fee:number;
  maintenance:number;
  weeks:number;
  scope:string[][];
  schedule:string[][];
};
```

Create `src/hooks/usePointerPosition.ts` with one `pointermove` listener and a reduced-motion guard. Return normalized viewport coordinates.

Create `src/hooks/useScrollProgress.ts` using one passive `scroll` listener and `requestAnimationFrame`; calculate progress from the target element's top and a configurable viewport-distance.

- [ ] **Step 5: Create the new App data-loading shell**

`src/App.tsx` should:

```tsx
import {useEffect,useState} from 'react';
import type {Offer} from './data/types';

export default function App(){
  const [offer,setOffer]=useState<Offer|null>(null);
  const [failed,setFailed]=useState(false);

  useEffect(()=>{
    const controller=new AbortController();
    fetch(import.meta.env.BASE_URL+'offer.json',{signal:controller.signal})
      .then(response=>{if(!response.ok)throw new Error('offer');return response.json();})
      .then(setOffer)
      .catch(error=>{if(error.name!=='AbortError')setFailed(true);});
    return()=>controller.abort();
  },[]);

  return <main>{/* section composition added task by task */}</main>;
}
```

Modify `src/main.tsx` to only render `<App/>` and import `tokens.css` + `global.css`.

- [ ] **Step 6: Establish design tokens**

In `src/styles/tokens.css`, define exact shared variables:

```css
:root{
  --paper:#f2f0ea;
  --ink:#11110f;
  --purple:#6436ef;
  --soft:#d7d2c8;
  --display:'Manrope',Arial,sans-serif;
  --body:'DM Sans',Arial,sans-serif;
  --gutter:clamp(18px,2.6vw,42px);
  --header-h:72px;
}
```

`global.css` owns reset, typography base, focus-visible, reduced motion and section anchoring only. Do not recreate the old 25/75 layout.

- [ ] **Step 7: Verify GREEN**

Run: `npm test && npm run build`

Expected: all Node tests pass and Vite build exits 0.

- [ ] **Step 8: Commit**

```bash
git add src server/interaction.test.js
git commit -m "refactor: establish restructure application foundation"
```

---

### Task 2: Replace conventional navigation with full-screen index

**Files:**
- Create: `src/components/SiteHeader.tsx`
- Create: `src/components/SiteIndex.tsx`
- Create: `src/styles/shell.css`
- Modify: `src/App.tsx`
- Modify: `src/main.tsx`

**Interfaces:**
- Produces: `<SiteHeader />`
- `SiteHeader` owns boolean index state.
- `SiteIndex` props: `{open:boolean; onClose:()=>void; triggerRef:RefObject<HTMLButtonElement|null>}`.

- [ ] **Step 1: Implement the fixed shell**

`SiteHeader.tsx` renders exactly two primary controls:

```tsx
<a className="site-mark" href="#cover">Port.site<sup>®</sup></a>
<button ref={triggerRef} className="index-trigger" onClick={()=>setOpen(true)} aria-expanded={open}>
  INDEX <span>{open?'×':'+'}</span>
</button>
```

No other persistent nav links.

- [ ] **Step 2: Implement full-screen index behavior**

`SiteIndex.tsx` contains links:

```ts
const links=[
  ['01','Studio','#manifesto'],
  ['02','Capabilities','#capabilities'],
  ['03','Offer','#offer'],
  ['04','Process','#process'],
  ['05','Investment','#investment'],
  ['06','Contact','#contact'],
];
```

When `open` becomes true:
- save previously focused element,
- focus the first index link,
- set `document.body.style.overflow='hidden'`,
- close on Escape,
- cycle Tab/Shift+Tab inside the overlay,
- restore body overflow and trigger focus on close.

- [ ] **Step 3: Implement shell/index styling**

`shell.css` must create a fixed transparent shell and a clip-path based overlay:

```css
.site-index{
  position:fixed;inset:0;z-index:90;
  background:var(--ink);color:var(--paper);
  clip-path:inset(0 0 100% 0);
  transition:clip-path .55s cubic-bezier(.77,0,.18,1);
}
.site-index[data-open="true"]{clip-path:inset(0)}
```

Index links use very large type and full-width row rules; hover/focus shifts text horizontally and inverts the section number.

- [ ] **Step 4: Integrate shell into App**

Render `<SiteHeader/>` outside the main scrolling content.

- [ ] **Step 5: Build verification**

Run: `npm run build`

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/components src/styles/shell.css src/App.tsx src/main.tsx
git commit -m "feat: replace navigation with fullscreen index"
```

---

### Task 3: Build the cover entry and manifesto transition

**Files:**
- Create: `src/sections/CoverSection.tsx`
- Create: `src/sections/ManifestoSection.tsx`
- Modify: `src/styles/sections.css`
- Modify: `src/App.tsx`
- Modify: `server/interaction.test.js`

**Interfaces:**
- `CoverSection` consumes `useScrollProgress` and `usePointerPosition`.
- `ManifestoSection` is independent but uses CSS scroll-driven visual states via `useScrollProgress`.

- [ ] **Step 1: Add a failing cover-transform helper test**

Extend `server/interaction.test.js`:

```js
import {coverTransform} from '../src/interaction/math.js';

test('coverTransform opens the visual field as progress advances',()=>{
  assert.deepEqual(coverTransform(0),{scale:1,y:0,radius:0});
  assert.deepEqual(coverTransform(1),{scale:.76,y:18,radius:28});
});
```

Run `node --test server/interaction.test.js` and verify failure because `coverTransform` is missing.

- [ ] **Step 2: Implement `coverTransform`**

Add to `math.js`:

```js
export const coverTransform=progress=>{
  const p=clamp01(progress);
  return {scale:1-.24*p,y:18*p,radius:28*p};
};
```

- [ ] **Step 3: Implement CoverSection markup**

The section must be structurally different from the current hero:

```tsx
<section id="cover" className="cover">
  <div className="cover-sticky">
    <div className="cover-meta">WEB DESIGN + DEVELOPMENT / 2026</div>
    <h1 className="cover-logo">PORT.SITE</h1>
    <div className="cover-field" style={fieldStyle}>
      <span className="field-kicker">FOR PEOPLE WITH SOMETHING TO SHOW</span>
      <div className="field-cross" aria-hidden="true" />
      <strong>Ideas<br/>need a<br/><em>place.</em></strong>
      <span className="field-scroll">SCROLL / ENTER</span>
    </div>
  </div>
</section>
```

The dominant field is abstract graphic identity, not the previous `PORT / SITE` specimen composition.

- [ ] **Step 4: Implement ManifestoSection**

Use three oversized lines:

```tsx
<h2>
  <span>Websites</span>
  <span>for people with</span>
  <span><em>something to show.</em></span>
</h2>
```

Supporting paragraph appears only after the display statement. Scroll progress shifts the three lines in opposite directions by restrained amounts.

- [ ] **Step 5: Style both as separate experiences**

Key constraints:
- cover occupies about 170vh with a sticky 100vh stage;
- `cover-field` starts dominant and contracts/repositions on scroll;
- manifesto uses large white-space and black/paper contrast;
- no cards, no old hero copy layout;
- reduced motion removes sticky transforms and renders static stacked states.

- [ ] **Step 6: Verify tests/build**

Run: `npm test && npm run build`

Expected: all pass.

- [ ] **Step 7: Commit**

```bash
git add src/sections src/styles/sections.css src/App.tsx src/interaction/math.js server/interaction.test.js
git commit -m "feat: build cover and manifesto experience"
```

---

### Task 4: Turn capabilities into a page-level interactive demonstration

**Files:**
- Create: `src/sections/CapabilitiesSection.tsx`
- Modify: `src/styles/sections.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Local state: `activeCapability:number`.
- Capability model:

```ts
type Capability={
  name:string;
  label:string;
  className:string;
};
```

- [ ] **Step 1: Define capabilities**

```ts
const capabilities=[
  {name:'ART DIRECTION',label:'Shape the visual point of view.',className:'cap-art'},
  {name:'WEB DESIGN',label:'Turn content into a clear digital system.',className:'cap-design'},
  {name:'DEVELOPMENT',label:'Build the interface to behave beautifully.',className:'cap-dev'},
  {name:'INTERACTION',label:'Give the site a reason to be remembered.',className:'cap-motion'},
  {name:'LAUNCH',label:'Refine, test and put it online.',className:'cap-launch'},
];
```

- [ ] **Step 2: Build a two-layer capability stage**

Left/foreground: large interactive rows. Background/stage: one visual composition whose structure changes based on the active class.

Each row handles both `onMouseEnter` and `onFocus`; on touch/click, `onClick` changes state.

- [ ] **Step 3: Give every capability a distinct stage response**

CSS state behaviors:
- `.cap-art`: off-grid image-like crop blocks and serif label.
- `.cap-design`: visible grid lines and aligned rectangles.
- `.cap-dev`: monospace/system coordinates and modular frames.
- `.cap-motion`: pointer-relative circle/line motion using `usePointerPosition`.
- `.cap-launch`: simplify stage to one finished framed composition.

Do not use the same scale/translate hover effect for all five.

- [ ] **Step 4: Integrate and verify**

Run: `npm run build`.

Expected: exit 0.

- [ ] **Step 5: Commit**

```bash
git add src/sections/CapabilitiesSection.tsx src/styles/sections.css src/App.tsx
git commit -m "feat: add interactive capabilities stage"
```

---

### Task 5: Replace offer accordions with an editorial index/detail system

**Files:**
- Create: `src/sections/OfferSection.tsx`
- Modify: `src/styles/sections.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Props: `{offer:Offer}`.
- Local state: `active:number` defaults to `0`.

- [ ] **Step 1: Build the index rows**

For each `offer.scope` tuple `[title,subtitle,body]`, render one button row with:
- two-digit index,
- title,
- subtitle,
- arrow/state marker.

No `<details>` elements for the six main offer items.

- [ ] **Step 2: Build the active detail field**

The active item's title/body occupies a separate large stage next to or overlaying the index. Use CSS transitions to crossfade/clip content when active changes.

Markup outline:

```tsx
<section id="offer" className="offer-index">
  <header>...</header>
  <div className="offer-layout">
    <div className="offer-rows">...</div>
    <article className="offer-detail">...</article>
  </div>
  <footer className="offer-footnotes">...</footer>
</section>
```

- [ ] **Step 3: Convert inclusions into footnotes**

Render `Included as standard` and `Quoted separately` as compact editorial blocks under the index, not cards or equal boxed columns.

- [ ] **Step 4: Add data-failure fallback in App**

If `offer` is null and `failed` true, render a section-level retry state in place of Offer/Process/Investment only. Cover, manifesto and capabilities remain visible.

- [ ] **Step 5: Verify build**

Run: `npm run build`.

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/sections/OfferSection.tsx src/styles/sections.css src/App.tsx
git commit -m "feat: rebuild offer as editorial index"
```

---

### Task 6: Rebuild process as sticky four-state sequence

**Files:**
- Create: `src/sections/ProcessSection.tsx`
- Modify: `src/interaction/math.js`
- Modify: `server/interaction.test.js`
- Modify: `src/styles/sections.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Props: `{offer:Offer}`.
- Uses `selectStage(progress,4)`.

- [ ] **Step 1: Add process-stage boundary tests**

Extend `server/interaction.test.js`:

```js
test('selectStage maps sticky process quarters to four states',()=>{
  assert.equal(selectStage(.249,4),0);
  assert.equal(selectStage(.25,4),1);
  assert.equal(selectStage(.5,4),2);
  assert.equal(selectStage(.75,4),3);
});
```

Run and verify pass with the existing helper. This is a characterization test for the section contract.

- [ ] **Step 2: Implement sticky stage**

`ProcessSection` uses a wrapper around `320vh` tall and a `position:sticky; top:0; height:100vh` stage.

The active state derives from section progress, not individual card hover.

- [ ] **Step 3: Implement visual state transitions**

Each week changes the page-level composition:
- Week 01: oversized `01` left + structure lines.
- Week 02: typography/grid shifts to centered design state.
- Week 03: dark/inverted development state with system coordinates.
- Week 04: stripped-back launch state with large arrow/endpoint.

A small progress rail remains visible through all four states.

- [ ] **Step 4: Add timing note after sticky sequence**

Keep the current timing disclaimer as small editorial copy after the pinned stage.

- [ ] **Step 5: Verify**

Run: `npm test && npm run build`.

Expected: all pass.

- [ ] **Step 6: Commit**

```bash
git add src/sections/ProcessSection.tsx src/styles/sections.css src/App.tsx server/interaction.test.js
git commit -m "feat: rebuild process as scroll driven states"
```

---

### Task 7: Make investment and final CTA full-screen statements

**Files:**
- Create: `src/sections/InvestmentSection.tsx`
- Create: `src/sections/FinalCtaSection.tsx`
- Modify: `src/styles/sections.css`
- Modify: `src/App.tsx`

**Interfaces:**
- `InvestmentSection` props: `{offer:Offer}`.
- `FinalCtaSection` no data props.

- [ ] **Step 1: Build the investment stage around the number**

Use the price number as the dominant layout object:

```tsx
<div className="investment-number">
  <span className="currency">USD</span>
  <strong>{money(offer.fee)}</strong>
</div>
```

Position supporting labels around it:
- `50% TO BEGIN`
- `50% BEFORE LAUNCH`
- `STRATEGY / DESIGN / DEVELOPMENT`
- `OPTIONAL SUPPORT $1,500 / YEAR`

- [ ] **Step 2: Keep terms accessible but visually restrained**

Use one `<details>` below the investment stage for practical terms. This is the only remaining use of details/summary and is not the main offer UI.

- [ ] **Step 3: Implement final CTA**

Full viewport:

```tsx
<section id="contact" className="final-cta">
  <p>HAVE SOMETHING TO SHOW?</p>
  <a href="mailto:hello@port.site">
    <span>LET'S PUT IT</span>
    <strong>ONLINE.</strong>
    <i aria-hidden="true">↗</i>
  </a>
</section>
```

If `hello@port.site` is not intended as a real address yet, replace the `mailto:` before launch with the agreed contact target; for the structural implementation it remains an explicit placeholder-free link target chosen for this build.

- [ ] **Step 4: Add meaningful hover/focus response**

Final CTA interaction changes the whole section: background inverts from paper/ink to purple/paper; the arrow travels across the stage; the final word translates slightly. No generic card hover.

- [ ] **Step 5: Verify build**

Run: `npm run build`.

Expected: exit 0.

- [ ] **Step 6: Commit**

```bash
git add src/sections/InvestmentSection.tsx src/sections/FinalCtaSection.tsx src/styles/sections.css src/App.tsx
git commit -m "feat: create investment statement and final cta"
```

---

### Task 8: Responsive, accessibility, legacy removal, and production verification

**Files:**
- Modify: `src/styles/global.css`
- Modify: `src/styles/shell.css`
- Modify: `src/styles/sections.css`
- Modify: interactive section/component files as required
- Delete: `src/style.css`
- Delete or stop importing: `src/motion.js` if fully superseded
- Modify: `README.md` only if architecture notes are now inaccurate

**Interfaces:**
- No new public interfaces.

- [ ] **Step 1: Design mobile behavior explicitly**

At `max-width: 760px`:
- Cover remains full viewport but removes pointer offset.
- Capability stage becomes tap-driven; active detail sits below the row list.
- Offer index becomes one-column; active detail follows the selected row block.
- Sticky process uses reduced travel distance and large type capped to viewport width.
- Investment labels move into readable stacked positions around/under price.
- Index remains full-screen.

- [ ] **Step 2: Implement reduced-motion mode**

Under `@media (prefers-reduced-motion: reduce)`:
- remove smooth scrolling,
- remove pointer-parallax transforms,
- remove clip/morph transitions,
- convert pinned cover/process experiences to static section flow,
- retain all text and active-state controls.

- [ ] **Step 3: Keyboard/accessibility pass**

Verify in code:
- every interactive offer/capability row is a button,
- focus-visible is unmistakable,
- index Escape/Tab trapping works,
- menu trigger focus restores on close,
- sections have semantic headings,
- animated decorative elements are `aria-hidden`.

- [ ] **Step 4: Remove legacy visual implementation**

Delete old `style.css` and any old hero/cursor motion code that is no longer imported. Search the repo for legacy class names:

Run:

```bash
grep -R "specimen\|timeline\|scope-list\|hero-artwork\|round-link" src || true
```

Expected: no old-layout implementation references remain.

- [ ] **Step 5: Full verification**

Run:

```bash
npm test
npm run build
```

Expected:
- all Node tests pass,
- TypeScript emits no errors,
- Vite exits 0,
- `dist/` is generated.

- [ ] **Step 6: Production smoke checks**

Check manually in browser at desktop width, mobile width, and reduced-motion mode:
- cover transitions into manifesto,
- index opens/closes and focus restores,
- capability states react to mouse and keyboard,
- offer detail switches,
- process changes through four states,
- investment content remains readable,
- final CTA changes the entire section state,
- no horizontal overflow.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: complete Port.site visual restructure"
```

- [ ] **Step 8: Open PR and deploy after review**

Open a PR from the implementation branch to `main`, inspect the full diff, run CI, merge only after the GitHub Pages build succeeds, then verify the published URL.
