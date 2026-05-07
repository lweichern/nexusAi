# Tech Agency Website — Design Spec

## Overview

A dark, cinematic tech agency website for a consultancy specializing in AI, Web3, and Web/Mobile development. Built with Next.js and Aceternity UI / Magic UI animation components. Placeholder branding throughout — structure and animations are the focus.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (core engine), custom components inspired by Aceternity UI and Magic UI
- **Language:** TypeScript
- **Deployment-ready:** Static export compatible

## Pages

1. **Landing Page** (`/`)
2. **Services Page** (`/services`)
3. **Work Page** (`/work`)
4. **Contact Page** (`/contact`)

## Design System

### Theme

- **Mode:** Dark only (no light mode toggle)
- **Background:** Near-black (`#0a0a0a` or similar)
- **Accent color:** Electric blue/cyan (`#00d4ff` range) — communicates tech/AI
- **Typography:** Inter or Geist Sans for body, Geist Mono for code/accents
- **Glow effects:** Selective use of box-shadow and radial gradients for "glow" on accent elements

### Animation Philosophy

- **3-4 high-impact moments:** Hero network visualization, 3D service cards, canvas reveal on work, shimmer CTA
- **Scroll-triggered entries:** All section content fades/blurs in on scroll via BlurFade
- **Hover micro-interactions:** Cards tilt, borders animate, buttons shimmer
- **Performance:** Animations use CSS transforms and opacity only (GPU-composited). Particle/beam effects use canvas, not DOM nodes.

## Page Specifications

### 1. Landing Page (`/`)

**Navigation:**
- Floating dock nav pinned at bottom center of viewport (macOS-style magnifying dock)
- Items: Home, Services, Work, Contact
- Translucent glass-morphism background, icons magnify on hover

**Section 1 — Hero (100vh):**
- Full-viewport dark background
- Animated beam network visualization: glowing nodes connected by pulsing beam lines, rendered on a canvas element. Nodes drift slowly; beams pulse with light traveling along them. Evokes neural networks / AI.
- Company name rendered large using `TextGenerateEffect` — words materialize progressively with a blur-to-sharp transition
- Subtitle uses `FlipWords` cycling through: "AI Solutions", "Web3 Development", "Digital Products"
- Single CTA button with shimmer effect: "Get in Touch" → links to /contact

**Section 2 — Clients/Trust Bar:**
- `InfiniteMovingCards` horizontal marquee
- Placeholder client logos (6-8 grayscale logo placeholders)
- Auto-scrolling, no interaction needed
- Subtle top/bottom fade masks on the edges

**Section 3 — Services Overview:**
- Section heading with BlurFade entry
- Three cards in a responsive row (stack on mobile)
- Each card uses 3D tilt effect on hover (perspective transform based on mouse position)
- Each card has an animated `MovingBorder` — gradient that travels around the card border
- Card content: icon, service name, 1-line description, "Learn more" link → /services
- Icons: Brain/neural net (AI), Chain links (Web3), Device frames (Web/Mobile)

**Section 4 — Featured Work:**
- Section heading with BlurFade entry
- Single spotlight case study card
- Uses `CanvasRevealEffect` on hover — dotted/particle burst reveals project details
- Card shows: project thumbnail placeholder, project name, tags (AI, Web3, etc.), brief description
- "View Case Study" link → /work
- Structure: component accepts an array, renders bento grid when multiple projects exist

**Section 5 — CTA Section:**
- Bold statement text: "Let's build the future" (or placeholder equivalent)
- `ShimmerButton` linking to /contact
- `RetroGrid` background — perspective vanishing-point grid lines fading into the distance
- Compact section, high visual impact

**Section 6 — Footer:**
- Minimal footer: company name, copyright, social links (GitHub, Twitter/X, LinkedIn placeholders)
- Dark, no background effect — clean ending

**Scroll Spine:**
- `TracingBeam` running down the left edge of the landing page
- A vertical line that illuminates/traces as the user scrolls, connecting all sections
- Hidden on mobile (too narrow)

### 2. Services Page (`/services`)

**Layout:** `StickyScrollReveal` pattern

- Left panel (40% width): Service name and icon, pinned/sticky while right panel scrolls
- Right panel (60% width): Scrollable content for each service — capabilities list, technologies used, approach description
- Three service blocks in sequence:

**Service 1 — AI Solutions:**
- Capabilities: Machine Learning, LLM Integration, Computer Vision, AI Automation, Data Analytics
- Tech: Python, TensorFlow, PyTorch, OpenAI API, LangChain

**Service 2 — Web3 Development:**
- Capabilities: Smart Contracts, DeFi Protocols, NFT Platforms, Blockchain Integration, Token Development
- Tech: Solidity, Ethereum, Polygon, Hardhat, IPFS

**Service 3 — Web & Mobile Development:**
- Capabilities: Web Applications, Mobile Apps, E-commerce, SaaS Platforms, API Development
- Tech: React, Next.js, React Native, Node.js, PostgreSQL

Each service block transitions smoothly as the user scrolls past it.

On mobile: stacked layout (no sticky), each service is a collapsible accordion or vertical card.

### 3. Work Page (`/work`)

**Layout:** Bento grid

- Currently 1 project, but the grid component accepts an array and renders responsively
- With 1 project: single large featured card centered
- With 3+: asymmetric bento grid (1 large + 2 small, or similar)
- Each card uses `CardHoverEffect` — animated hover state with glow
- Card content: project thumbnail (placeholder image), project name, client name (placeholder), tags, brief description
- Cards link to individual case study pages (future — for now, no detail page, just the grid)

### 4. Contact Page (`/contact`)

**Layout:**
- Split layout: left side has headline + company info, right side has the form
- `SpotlightEffect` following cursor across the page background
- `DotPattern` subtle background texture

**Form fields:**
- Name (text input)
- Email (email input)
- Company (text input, optional)
- Service interest (select: AI, Web3, Web/Mobile, Other)
- Message (textarea)
- Submit button: `ShimmerButton`

**Form behavior:**
- Client-side validation only (no backend for now)
- On submit: show a success toast/message. No actual email sending — placeholder behavior.

**Contact info (left side):**
- Email placeholder
- Location placeholder
- Social links

## Responsive Design

- **Desktop:** Full experience with all animations
- **Tablet:** Simplified layouts (2-column → 1-column where needed), all animations preserved
- **Mobile:** 
  - Floating dock → hamburger menu or simplified top nav
  - Tracing beam hidden
  - 3D card effects simplified to scale-on-tap
  - Sticky scroll → stacked sections
  - Canvas/particle effects reduced or disabled for performance

## Component Architecture

```
src/
  app/
    layout.tsx          — root layout, dark theme, fonts, floating dock nav
    page.tsx            — landing page (all sections)
    services/
      page.tsx          — services page
    work/
      page.tsx          — work/case studies page
    contact/
      page.tsx          — contact page
  components/
    ui/                 — reusable animation components
      text-generate-effect.tsx
      flip-words.tsx
      floating-dock.tsx
      tracing-beam.tsx
      3d-card.tsx
      moving-border.tsx
      canvas-reveal-effect.tsx
      shimmer-button.tsx
      infinite-moving-cards.tsx
      sticky-scroll-reveal.tsx
      card-hover-effect.tsx
      retro-grid.tsx
      dot-pattern.tsx
      spotlight.tsx
      blur-fade.tsx
      animated-beam-network.tsx
    sections/           — landing page sections
      hero.tsx
      clients-bar.tsx
      services-overview.tsx
      featured-work.tsx
      cta-section.tsx
      footer.tsx
    layout/
      floating-nav.tsx
  lib/
    utils.ts            — cn() helper, shared utilities
  data/
    services.ts         — service definitions (name, icon, capabilities, tech)
    projects.ts         — project definitions (name, tags, description, image)
    clients.ts          — client logo placeholders
```

## Animation Components — Implementation Notes

Each animation component will be built from scratch using Framer Motion rather than installing Aceternity UI as a dependency. This gives full control over bundle size, customization, and avoiding unnecessary dependencies. The implementations are inspired by Aceternity UI's visual effects but written as lightweight, purpose-built components.

Key implementation details:
- **AnimatedBeamNetwork:** Canvas-based. Renders nodes as circles with glow, beams as lines with traveling light particles. Uses requestAnimationFrame loop. Mouse proximity causes nearby nodes to gently drift toward cursor.
- **TextGenerateEffect:** Framer Motion `stagger` on word-level `<motion.span>` elements. Each word transitions from `opacity: 0, filter: blur(10px)` to `opacity: 1, filter: blur(0)`.
- **FlipWords:** Framer Motion `AnimatePresence` cycling through words with a Y-axis translate + opacity transition on an interval.
- **3D Card Effect:** CSS `perspective` on container, `rotateX/rotateY` transforms calculated from mouse position relative to card center. `transform-style: preserve-3d` for layered depth.
- **MovingBorder:** CSS `conic-gradient` on a pseudo-element, animated with CSS `@keyframes` rotating the gradient origin.
- **TracingBeam:** Fixed-position vertical line with `scaleY` driven by scroll progress via Framer Motion `useScroll`.
- **StickyScrollReveal:** CSS `position: sticky` on the left panel, scroll-driven content transitions on the right using Intersection Observer.
- **CanvasRevealEffect:** Canvas overlay with dot-matrix pattern that reveals on hover via a radial mask expanding from the cursor position.
- **BlurFade:** Intersection Observer triggers Framer Motion animation: `opacity: 0, y: 20, filter: blur(6px)` → `opacity: 1, y: 0, filter: blur(0)`.

## Performance Budget

- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Total JS bundle (initial): < 200KB gzipped
- Canvas animations: 60fps target, requestAnimationFrame with frame skipping on low-end devices
- Images: Next.js `<Image>` with lazy loading, WebP/AVIF formats
- Fonts: `next/font` with `display: swap`

## Out of Scope

- Authentication / user accounts
- CMS integration
- Blog / content pages
- Backend API / database
- Email sending from contact form (placeholder only)
- Light mode
- i18n / multi-language
- Individual case study detail pages (future addition)
