---
name: NurseLegal Medico-Legal Workspace
colors:
  surface: '#121416'
  surface-dim: '#121416'
  surface-bright: '#38393c'
  surface-container-lowest: '#0c0e10'
  surface-container-low: '#1a1c1e'
  surface-container: '#1e2022'
  surface-container-high: '#282a2c'
  surface-container-highest: '#333537'
  on-surface: '#e2e2e5'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e2e2e5'
  inverse-on-surface: '#2f3133'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#4cd7f6'
  on-secondary: '#003640'
  secondary-container: '#03b5d3'
  on-secondary-container: '#00424e'
  tertiary: '#ffb77d'
  on-tertiary: '#4d2600'
  tertiary-container: '#f08921'
  on-tertiary-container: '#5a2e00'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#ffdcc3'
  tertiary-fixed-dim: '#ffb77d'
  on-tertiary-fixed: '#2f1500'
  on-tertiary-fixed-variant: '#6e3900'
  background: '#121416'
  on-background: '#e2e2e5'
  surface-variant: '#333537'
typography:
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 44px
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 34px
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '500'
    lineHeight: 14px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-trust, mission-critical legal defense and consultation sanctuary designed specifically for nursing and healthcare professionals facing disciplinary, malpractice, or institutional legal pressures.

The emotional signature balances clinical calm with legal precision: serious, protective, discreet, and deeply reassuring under high-stress circumstances. The visual language blends deep charcoal night-shift aesthetics with delicate translucent glass cards, restrained jewel-tone status indicators, and luminous emerald/teal guidance anchors.

### Core Style Philosophy
- **Dark-Surface Precision:** Deep charcoal layers (#111315 down to #16191d) minimize eye fatigue during late-night triage or hospital night shifts.
- **Controlled Glassmorphism:** Translucent container surfaces (`rgba(22, 25, 29, 0.75)`) backed by subtle border micro-highlights (`#23272f`) produce clear visual separation without noisy glare.
- **Triage Status Signaling:** Deliberate semantic color coding (Coral for immediate disciplinary summons/statutes of limitations, Amber for ongoing investigations, Emerald for favorable resolutions and verified guidance).
- **RTL-First Symmetry:** Structured right-to-left layout hierarchy with balanced icon-to-heading placement, maintaining fluid eye-tracking for Persian/Arabic typography.

## Colors

The color system operates on an ultra-dark canvas with distinct functional tiers. High-saturation signals are strictly reserved for urgency badges, action confirmations, and legal status cues.

### Background & Surface Hierarchy
- **Canvas Base:** `#111315` (Deepest foundation canvas)
- **Surface Elevation 1 (Cards, Modules):** `#16191d`
- **Surface Elevation 2 (Hover states, Inner widgets):** `#1e2227`
- **Border / Stroke Default:** `#23272f`
- **Border / Focus / Active:** `rgba(16, 185, 129, 0.4)`

### Brand & Functional Accents
- **Primary (Emerald Legal Assurance):** `#10b981` (Core brand, completed cases, positive outcomes)
- **Secondary (Teal Clarification & AI Assistant):** `#06b6d4` (Interactive AI responses, audio prompts, quick search filters)
- **Tertiary (Amber Pending / In-Review):** `#d97706` (Open cases pending testimony, legal reviews in progress)
- **Urgent / Emergency (Coral Crimson):** `#ef4444` (Emergency legal hotline, disciplinary board summons, critical filing deadlines)

### Text & Icon Contrast
- **Text High Contrast:** `#f3f4f6` (Headlines, case names, prominent metrics)
- **Text Medium Contrast:** `#9ca3af` (Secondary descriptions, dates, legal case numbers)
- **Text Low Contrast / Muted:** `#64748b` (Watermarks, placeholder text, disabled actions)

## Typography

The type scale is tailored for clean multilingual and RTL Persian text layouts paired with Latin numerals and case reference codes (e.g., `#NL-1405-218`). 

### Rules & Formatting
- **Directional Fluidity:** Headings and legal clauses must prioritize balanced line heights (`lineHeight: 1.6` on body text) to accommodate Persian diacritics and complex character shapes without vertical clipping.
- **Numerical Regularity:** Case numbers, statutory articles, and court session dates utilize tabular or monospaced digit adjustments to maintain vertical alignment within lists and tables.
- **Hierarchy Stacking:** Urgent cards enforce a 3-tier hierarchy: uppercase micro-label (Status / Case ID), strong headline (Nature of Dispute), and muted footnote (Assigned Attorney & Hearing Date).

## Layout & Spacing

The layout is built around a structured 12-column adaptive grid on desktop and a single/dual responsive column stream on mobile viewports.

### Breakpoints & Fluid Adaptation
- **Mobile (< 768px):** Single-column stack with dynamic bottom navigation and floating quick-emergency trigger. Padding uses `space-md` (16px) with condensed gutter spaces.
- **Tablet (768px - 1024px):** 2-column masonry grid; sidebar collapses to an icon drawer; urgent cases take prominent full-width top span.
- **Desktop (> 1024px):** 12-column structure with fixed 280px navigation header/bar, a 4-column quick action dock, and an 8-column main dossier and legal intelligence workspace.

### Spacing Principles
- Grid containers adhere strictly to multiples of 4px.
- Internal card padding is locked to `1.25rem` (20px) to give dense statutory information breathing room while retaining immediate scannability.

## Elevation & Depth

Visual hierarchy is achieved through a mixture of tonal layering, translucent glassmorphism, and low-intensity colored halos for active states.

### Elevation Levels
- **Level 0 (Canvas Base):** Solid background `#111315`.
- **Level 1 (Default Containers & Tiles):** Surface `#16191d` with 1px border `rgba(35, 39, 47, 0.8)`. Backdrop blur applied at `12px` when overlapping lower canvas items.
- **Level 2 (Modals, Active Cases, Floating Emergency Bar):** Elevated surface `#1e2227` with 1px border `rgba(255, 255, 255, 0.08)` and shadow `0 8px 32px -4px rgba(0, 0, 0, 0.5)`.
- **Critical Status Glow:** Urgent elements (such as emergency hotline buttons or critical summons alerts) emit a soft, diffused rim light: `box-shadow: 0 0 20px -2px rgba(239, 68, 68, 0.25)`.
- **Accent Indicator Glow:** AI response cards receive a discreet top-edge gradient border transitioning from `#06b6d4` to `transparent`.

## Shapes

The design system employs a soft, approachable geometry to counteract the cold, intimidating nature of medical-legal disputes.

### Corner Radii Guidelines
- **Main Cards & Panels:** `rounded-2xl` (16px) for an inviting, calm feel.
- **Interactive Controls (Inputs, Search Bar):** `rounded-xl` (12px) for structured, confident interaction zones.
- **Chips, Badges & Floating Triggers:** Fully rounded pill format (`rounded-full` / `9999px`) to distinguish categorical tags and tactile touch targets from static layout blocks.
- **Emergency Action Buttons:** Pill format with generous horizontal padding to evoke a tactile rescue control.

## Components

### Buttons
- **Primary Emergency Button:** Solid `#ef4444` background, white bold text, subtle red ambient shadow, pill-shaped. Includes medical/phone icon placed according to reading flow.
- **Secondary Guidance Button:** Frosted charcoal `#1e2227` with `#10b981` border and text. Hover activates `rgba(16, 185, 129, 0.1)` fill.
- **Audio / Voice Legal Search Button:** Circular or pill-shaped `#06b6d4` accented glass container with embedded microphone glyph.

### Cards & Dossier Panels
- **Standard Card:** Charcoal `#16191d`, 1px `#23272f` stroke, `rounded-2xl`, internal padding `1.25rem`.
- **Case Status Card:** Features a bottom progress rail tinted by case condition:
  - Favorable / Resolved: Solid emerald `#10b981` rail.
  - Review / Pending: Solid amber `#d97706` rail.
  - Disciplinary / Urgent: Solid coral `#ef4444` rail.
- **AI Legal Assistant Tile:** Dark frosted background with subtle teal inner border (`rgba(6, 182, 212, 0.2)`), displaying source legal articles in pill-shaped tag clusters.

### Input Fields & Search Bars
- Background `#16191d` with 1px border `#23272f`.
- Height: 48px to 52px with embedded right-aligned search glyph and left-aligned microphone/submit icon.
- Focus state: Border transitions to `#06b6d4` with a 2px outer glow (`rgba(6, 182, 212, 0.25)`).

### Status Badges & Chips
- **Urgent Summon Chip:** Background `rgba(239, 68, 68, 0.15)`, text `#f87171`, containing a pulsing 6px coral indicator dot.
- **Pending Review Chip:** Background `rgba(217, 119, 6, 0.15)`, text `#fbbf24`, with a static amber indicator dot.
- **Resolved / Closed Chip:** Background `rgba(16, 185, 129, 0.15)`, text `#34d399`, with an emerald check indicator.

### Floating Mobile Navigation
- Frosted glass docked dock at the bottom of the screen (`backdrop-filter: blur(16px); background: rgba(17, 19, 21, 0.85); border-top: 1px solid #23272f;`).
- Tab items consist of 24px thin outline icons transitioning to bright teal/white with a mini indicator pip on active selection.