# Port.site — Full Visual Restructure Design

## Goal

Rebuild the current Port.site landing into a distinctive digital-studio experience inspired by the user's reference set: Bureau Borsche, DIA Studio, Freight, Pierre Yovanovitch, Lusion and Active Theory.

The current page structure must not survive visually. Existing commercial content can be reused, but the interaction model, hierarchy, navigation and layout should feel like a new site.

The result should communicate three things immediately:

1. Port.site has strong visual taste.
2. Port.site can build original interactive digital experiences.
3. Port.site still offers a clear, understandable portfolio-website service.

## Design principles

### 1. Work and identity before explanation

The first impression should feel closer to a poster, editorial cover or moving identity system than to a conventional agency landing page. Large typography, dramatic spacing and visual transitions take precedence over introductory paragraphs.

### 2. Interaction is part of the concept

Hover, pointer movement and scroll should reveal capability rather than decorate existing cards. Each major section gets a distinct interaction idea. Repeating generic scale-on-hover effects is explicitly out of scope.

### 3. Fewer visible UI conventions

Remove the conventional multi-link header. Keep a restrained global shell: Port.site mark on the left and an `INDEX +` control on the right. The index opens a full-screen navigation layer.

### 4. Editorial density where useful

The offer can become dense and index-like, borrowing from editorial/archive references. Explanatory content appears contextually when selected instead of sitting permanently in stacked boxes.

### 5. The site should still sell

Experimental presentation must not hide the essentials: what Port.site does, what is included, the four-week process, the $9,000 fee, the optional $1,500/year maintenance and practical terms.

## Global visual system

### Typography

Use one strong modern sans family for the primary voice and a contrasting serif or italic face only for selective emphasis. Large display typography should be significantly more dominant than in the current site.

### Color

Retain the current purple as a recognizable Port.site signal, but stop using it as a generic section background. Main palette:

- warm off-white / paper background
- near-black text
- Port.site purple as an active/state color
- occasional inverted black or purple full-screen states

### Grid

Use an asymmetrical editorial grid rather than a recurring 25/75 section split. Sections may use different internal grids as long as alignment anchors remain consistent.

### Motion

Motion should feel deliberate, quick and slightly tactile rather than floaty. Favor transform/opacity/clip-path where possible. Scroll-linked effects should be implemented without heavy 3D dependencies unless a later iteration justifies them.

### Cursor

Keep a custom cursor only where it communicates a meaningful action/state. It should not be the central interaction concept. Cursor labels can be used sparingly for states such as `OPEN`, `VIEW`, `ENTER`, `NEXT`.

## Information architecture

The public page becomes a sequence of seven experiences rather than six conventional content sections.

### 1. Cover / Entry

**Purpose:** Establish identity before explanation.

**Layout:** Full viewport. Minimal shell. A large Port.site wordmark or statement shares the screen with a dominant visual field.

**Content:**

- `PORT.SITE`
- short descriptor such as `Websites for people with something to show.`
- tiny studio metadata

**Interaction:**

The cover is pinned briefly. On initial scroll the visual field scales/repositions and the cover splits or reveals the next layer. The transition should feel like entering the site rather than simply scrolling past a hero.

The visual field must be replaceable later by project photography, video or a commissioned graphic without changing the structure.

### 2. Manifesto

**Purpose:** Explain the studio in one strong idea instead of two explanatory paragraphs.

**Content direction:**

`Websites for people with something to show.`

Supporting copy appears smaller and later, not beside the headline.

**Interaction:**

The sentence is oversized and moves/composes across the viewport as the user scrolls. Selected words can switch weight, serif treatment, color or position. The effect should stay legible and not become kinetic-type spectacle for its own sake.

### 3. Capabilities / Demonstration

**Purpose:** Turn the service list into an interactive proof of capability.

**Visible items:**

- ART DIRECTION
- WEB DESIGN
- DEVELOPMENT
- INTERACTION
- LAUNCH

**Layout:** Large horizontal or vertical list occupying most of the viewport.

**Interaction:**

Hovering/focusing each item changes the whole stage rather than only the row. Each item gets a distinct but lightweight response:

- Art direction: composition/image crop shift
- Web design: grid/frame rearrangement
- Development: UI/system layer or coded grid reveal
- Interaction: pointer-responsive distortion/movement
- Launch: transition to a clean finished state

These are abstract capability demonstrations, not literal software screenshots.

On touch devices, tap or scroll state replaces hover.

### 4. Offer / Editorial Index

**Purpose:** Preserve detailed commercial information without returning to accordion-card UI.

**Layout:** Dense numbered index inspired by editorial/archive navigation.

Rows:

01 Discovery & direction
02 Information architecture
03 Visual design
04 Website development
05 Content integration
06 QA & launch

Each row shows number, title and a short phrase. Selecting a row opens a large detail panel that overlays or replaces part of the index. Only one item is active at a time.

**Included as standard** and **Quoted separately** become compact footnotes or secondary index blocks, not two boxed columns.

### 5. Process / Four states

**Purpose:** Make the four-week process experiential rather than a four-column infographic.

**Structure:** One sticky stage with four scroll-driven states:

01 Direction & structure
02 Design
03 Development
04 Refinement & launch

As progress advances, the active week fills the viewport with a changing composition. A small persistent progress indicator shows the four stages.

Each state includes only the relevant title and concise body. The timing disclaimer sits after the sequence as small editorial copy.

### 6. Investment

**Purpose:** Treat price as a bold statement, not a pricing component.

**Layout:** Full-screen or near-full-screen composition built around a huge `9,000`.

Associated information sits around the number:

- USD
- 50% to begin
- 50% before launch
- strategy, design and development
- optional maintenance: $1,500 USD / year

**Interaction:**

Minor pointer/scroll movement can shift the supporting labels relative to the price, but the number remains dominant and readable.

Practical terms remain accessible via a restrained expandable text control below or after the price stage.

### 7. Final CTA

**Purpose:** End with a memorable, simple invitation.

Primary line:

`Have something to show?`

Secondary/action line:

`Let's put it online.`

The CTA fills the viewport and changes state on hover/focus. Possible response: inversion, oversized arrow movement, typography displacement or a reveal following the pointer.

No generic contact-card layout.

## Navigation

### Default shell

Top-left: `Port.site®`

Top-right: `INDEX +`

The shell stays subtle and may invert automatically over dark sections.

### Full-screen index

Opening `INDEX +` reveals a full-screen navigation layer with:

- Studio
- Capabilities
- Offer
- Process
- Investment
- Contact / final CTA

Include section numbers and optional short descriptors. Opening and closing the index should itself feel designed, using a clip/reveal transition rather than a generic modal fade.

Keyboard focus must be trapped while open and restored to the trigger on close.

## Component architecture

The current monolithic `src/main.tsx` should be decomposed because the restructure introduces independent interactive systems.

Proposed structure:

- `src/App.tsx` — page composition and offer loading
- `src/components/SiteHeader.tsx`
- `src/components/SiteIndex.tsx`
- `src/sections/CoverSection.tsx`
- `src/sections/ManifestoSection.tsx`
- `src/sections/CapabilitiesSection.tsx`
- `src/sections/OfferSection.tsx`
- `src/sections/ProcessSection.tsx`
- `src/sections/InvestmentSection.tsx`
- `src/sections/FinalCtaSection.tsx`
- `src/hooks/useScrollProgress.ts`
- `src/hooks/usePointerPosition.ts`
- `src/data/types.ts`
- `src/styles/` split into tokens/global/section styles or an equivalent maintainable structure

The existing static `offer.json` build flow remains valid. No backend is required for this version.

## Data flow

1. `App` loads `offer.json` once using `import.meta.env.BASE_URL`.
2. Offer content is passed only to sections that need it.
3. Visual interactions derive from local pointer/scroll state and do not mutate commercial data.
4. Scroll progress utilities return normalized values so motion remains easy to tune and test.
5. Touch/reduced-motion modes bypass nonessential pointer effects.

## Responsive behavior

The desktop experience may be more spatial and hover-driven, but mobile must be designed rather than merely collapsed.

- Cover remains full-screen.
- Pointer-dependent capability interactions become tap/active-state transitions.
- Sticky process remains, but movement distances are reduced.
- Large type scales down while preserving hierarchy.
- Full-screen index remains the primary navigation.
- No interaction may require hover to reveal essential information.

## Accessibility

- Respect `prefers-reduced-motion` by removing pinning/parallax/distortion where needed while preserving layout and content.
- Full keyboard navigation for index, offer items and terms.
- Clear focus-visible states.
- Semantic section headings even when typography is visually unconventional.
- No essential copy represented only as animated canvas/WebGL content.
- Color contrast maintained through inverted states.

## Error handling

If `offer.json` fails, keep all identity/navigation/manifesto/capability experiences visible and replace only data-driven offer/process/investment content with a concise retry state. The whole page must not collapse because offer data failed to load.

## Performance constraints

- Prefer CSS transforms and requestAnimationFrame-based normalized scroll state.
- Avoid Three.js/WebGL for the first implementation.
- Avoid large external animation frameworks unless implementation complexity clearly justifies one.
- Use no stock video or large bitmap assets in the first structural pass.
- Maintain GitHub Pages compatibility.

## Testing strategy

### Unit tests

Test pure interaction calculations such as normalized scroll progress, clamps and state selection.

### Build verification

Run:

- `npm test`
- `npm run build`

### Manual interaction checks

Desktop:

- cover-to-manifesto transition
- capability hover states
- index open/close and focus restoration
- offer detail switching
- process state progression
- investment legibility
- final CTA interaction

Mobile/touch:

- no hover dependency
- menu/index usability
- sticky sections do not trap scrolling
- large type does not overflow unexpectedly

Reduced motion:

- all content accessible
- no pinned or pointer-driven behavior necessary for comprehension

## Explicit removals from the current site

The following current visual patterns are not carried forward:

- conventional horizontal nav with four links
- current hero/specimen block
- repeated 25/75 section layout
- scope accordions as the main offer presentation
- four-column process grid
- boxed maintenance card
- conventional pricing hierarchy
- current purple closing section structure

Content may be reused, but these layouts should disappear.

## Success criteria

The restructure is successful when:

1. A screenshot of the new page cannot reasonably be mistaken for the current landing.
2. The first two viewport heights establish Port.site as a visually confident studio before presenting service details.
3. At least three major interactions change the page-level composition, not just the hovered element.
4. The full commercial offer remains understandable without sacrificing the experimental presentation.
5. Desktop, touch and reduced-motion modes all remain usable.
6. The production build continues to deploy through GitHub Pages without backend dependencies.
