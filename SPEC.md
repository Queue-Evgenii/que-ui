# que-ui — Zero-Dependency UI Component Library

## Concept

`que-ui` is a UI component library built from scratch with zero third-party dependencies.
Public API is based on **Web Components** (Custom Elements + Shadow DOM), making components
usable in any framework — React, Vue, Svelte, Angular, or plain HTML — without wrappers.
Internally, components are implemented with plain DOM classes for full control.

Published as an npm package with ESM, CJS, and type declarations.

> The component framework (signals, VDOM, router) is a separate future product — `que-ui-core`.
> This library has no dependency on it.

---

## Goals

- Zero runtime dependencies
- Works in any framework or plain HTML out of the box
- Full component set: from basic inputs to video players and data grids
- Consistent theming via CSS Custom Properties
- Accessible by default (ARIA, keyboard navigation, focus management)
- Tree-shakeable — import only what you use
- < 5 KB gzip per component

---

## How It Works

```
Public API            Internal
─────────────         ──────────────────────────────────
<que-button>   →      QueButton extends HTMLElement
                        └─ Shadow DOM root
                        └─ Plain DOM class (render, events, cleanup)
                        └─ CSS via adoptedStyleSheets
```

CSS Custom Properties are exposed on `:host` for external theming.
Shadow DOM keeps styles encapsulated so components never leak or break host page styles.

---

## API Example

```html
<!-- Plain HTML -->
<que-button variant="primary" size="md">Click me</que-button>
<que-input placeholder="Search..." clearable></que-input>
<que-slider min="0" max="100" value="40"></que-slider>
```

```js
// JavaScript
import { QueButton, QueSlider } from 'que-ui'

const btn = document.querySelector('que-button')
btn.addEventListener('que:click', (e) => console.log('clicked'))

// Programmatic
const slider = new QueSlider({ min: 0, max: 100, value: 40 })
document.body.appendChild(slider)
```

```tsx
// React (works natively, no wrapper needed)
<que-button variant="primary" onClick={handler}>Click</que-button>
```

---

## Theming

All visual tokens are CSS Custom Properties. Override at any level:

```css
/* Global theme override */
:root {
  --que-color-primary: #6366f1;
  --que-radius-md: 8px;
  --que-font-sans: 'Inter', sans-serif;
}

/* Component-level override */
que-button {
  --que-button-height: 48px;
  --que-button-padding-x: 24px;
}
```

### Token Categories

| Category     | Examples |
|--------------|---------|
| Color        | `--que-color-primary`, `--que-color-danger`, `--que-color-surface` |
| Typography   | `--que-font-sans`, `--que-font-size-sm`, `--que-font-weight-semibold` |
| Spacing      | `--que-space-1` … `--que-space-16` (4px scale) |
| Radius       | `--que-radius-sm`, `--que-radius-md`, `--que-radius-full` |
| Shadow       | `--que-shadow-sm`, `--que-shadow-md`, `--que-shadow-lg` |
| Motion       | `--que-duration-fast`, `--que-easing-out` |
| Z-index      | `--que-z-modal`, `--que-z-toast`, `--que-z-tooltip` |

---

## Component Catalog

### Form Controls
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Button           | `<que-button>`     | Variants: primary, secondary, ghost, danger, link. States: loading, disabled |
| Input            | `<que-input>`      | Types: text, number, email, password, search. Clearable, prefix/suffix icons |
| Textarea         | `<que-textarea>`   | Auto-resize, character count |
| Checkbox         | `<que-checkbox>`   | Indeterminate state |
| Radio            | `<que-radio>`      | |
| Radio Group      | `<que-radio-group>`| |
| Switch / Toggle  | `<que-switch>`     | |
| Select           | `<que-select>`     | Single and multi-select, searchable |
| Combobox         | `<que-combobox>`   | Autocomplete with custom options |
| Slider           | `<que-slider>`     | Single and range (two handles) |
| Color Picker     | `<que-color-picker>` | Hex, RGB, HSL |
| File Upload      | `<que-file-upload>`| Drag and drop, previews, multiple |
| Rating           | `<que-rating>`     | Star / custom icon rating |
| Date Picker      | `<que-date-picker>`| Calendar popup, range selection |
| Time Picker      | `<que-time-picker>`| |

### Layout
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| View             | `<que-view>`       | Flex/grid container with gap, direction, alignment props |
| Divider          | `<que-divider>`    | Horizontal / vertical |
| Spacer           | `<que-spacer>`     | Flexible space |
| Grid             | `<que-grid>`       | CSS Grid wrapper with column/row helpers |
| Stack            | `<que-stack>`      | Vertical / horizontal stack with gap |
| Scroll Area      | `<que-scroll-area>`| Custom scrollbar, horizontal/vertical |
| Aspect Ratio     | `<que-aspect-ratio>`| Maintain aspect ratio for children |

### Typography
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Text             | `<que-text>`       | Size, weight, color, truncation, line clamp |
| Heading          | `<que-heading>`    | h1–h6 semantics with visual scale |
| Code             | `<que-code>`       | Inline and block, syntax highlight (no dep, CSS-only) |
| Kbd              | `<que-kbd>`        | Keyboard shortcut display |
| Link             | `<que-link>`       | Internal / external with icon |

### Feedback & Overlays
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Modal / Dialog   | `<que-modal>`      | Focus trap, backdrop, scroll lock |
| Drawer           | `<que-drawer>`     | Slides from left/right/top/bottom |
| Tooltip          | `<que-tooltip>`    | Auto-positioning via Floating UI algorithm (own impl) |
| Popover          | `<que-popover>`    | Rich content tooltip |
| Toast            | `<que-toast>`      | Notification stack, auto-dismiss |
| Alert            | `<que-alert>`      | Inline feedback: info, success, warning, error |
| Badge            | `<que-badge>`      | Count badge, dot badge |
| Spinner          | `<que-spinner>`    | Loading indicator, sizes |
| Progress         | `<que-progress>`   | Linear and circular |
| Skeleton         | `<que-skeleton>`   | Content placeholder with shimmer |
| Empty State      | `<que-empty>`      | Illustration + message |

### Navigation
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Tabs             | `<que-tabs>`       | Horizontal / vertical, controlled / uncontrolled |
| Breadcrumb       | `<que-breadcrumb>` | |
| Pagination       | `<que-pagination>` | |
| Stepper          | `<que-stepper>`    | Step-by-step flow |
| Menu             | `<que-menu>`       | Dropdown menu, submenus |
| Context Menu     | `<que-context-menu>`| Right-click menu |
| Command Palette  | `<que-command>`    | Searchable command menu (⌘K style) |
| Navbar           | `<que-navbar>`     | Top navigation bar |
| Sidebar          | `<que-sidebar>`    | Collapsible side navigation |

### Data Display
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Avatar           | `<que-avatar>`     | Image, initials fallback, group |
| Image            | `<que-image>`      | Lazy loading, aspect ratio, placeholder |
| Icon             | `<que-icon>`       | Inline SVG, size, color |
| Tag / Chip       | `<que-tag>`        | Dismissible, clickable |
| Table            | `<que-table>`      | Sortable columns, sticky header |
| Data Grid        | `<que-data-grid>`  | Virtualized rows, resizable columns, row selection |
| Tree             | `<que-tree>`       | Collapsible tree view |
| List             | `<que-list>`       | Virtualized, selectable |
| Card             | `<que-card>`       | Header, body, footer, media |
| Timeline         | `<que-timeline>`   | Vertical timeline |
| Stat             | `<que-stat>`       | Metric display with label and trend |
| Kbd              | `<que-kbd>`        | Keyboard shortcut display |

### Media & Rich Content
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Video Player     | `<que-video>`      | Custom controls, fullscreen, captions |
| Audio Player     | `<que-audio>`      | Custom controls, waveform (canvas) |
| Image Gallery    | `<que-gallery>`    | Lightbox, zoom, swipe |
| Carousel         | `<que-carousel>`   | Touch/drag, autoplay, indicators |
| Map              | `<que-map>`        | Wrapper for native maps / tile layers (no dep) |
| Chart            | `<que-chart>`      | Line, bar, pie — Canvas-based, no dep |

### Utility
| Component        | Tag                | Description |
|------------------|--------------------|-------------|
| Portal           | `<que-portal>`     | Render children outside component tree |
| Virtual Scroll   | `<que-virtual>`    | Render only visible items |
| Transition       | `<que-transition>` | Enter/leave animations |
| Hotkey           | `<que-hotkey>`     | Declarative keyboard shortcut binding |
| Click Outside    | `<que-click-outside>`| Detect click outside element |
| Intersection     | `<que-intersection>`| IntersectionObserver wrapper |
| Resizable        | `<que-resizable>`  | Drag-to-resize panel |
| Drag & Drop      | `<que-draggable>`, `<que-droppable>` | |

---

## Project Structure

```
que-ui/
├── src/
│   ├── tokens/         # Design tokens (TS → CSS vars)
│   ├── utils/          # Shared DOM helpers, event bus, positioning
│   ├── base/           # BaseElement class all components extend
│   ├── components/
│   │   ├── button/
│   │   │   ├── index.ts
│   │   │   ├── button.ts       # Plain DOM class (logic)
│   │   │   ├── button.styles.ts # CSS string
│   │   │   └── button.test.ts
│   │   ├── input/
│   │   └── ...
│   └── index.ts        # Main entry, re-exports all components
├── dist/               # Build output
├── docs/               # Documentation site source
└── tests/
```

---

## Publishing

| Artifact  | Registry | Name      |
|-----------|----------|-----------|
| Web       | npm      | `que-ui`  |

Package exports:
```json
{
  "exports": {
    ".": { "import": "./dist/index.js", "require": "./dist/index.cjs" },
    "./button": "./dist/components/button/index.js",
    "./tokens": "./dist/tokens/index.js"
  }
}
```

---

## Development Phases

### Phase 1 — Foundation
- Base infrastructure: `BaseElement`, token system, CSS utils, test setup
- Core form controls: Button, Input, Checkbox, Switch, Select, Slider
- Layout: View, Stack, Divider

### Phase 2 — Overlays & Feedback
- Modal, Drawer, Tooltip, Popover, Toast, Alert, Spinner, Progress, Skeleton

### Phase 3 — Navigation & Data Display
- Tabs, Breadcrumb, Pagination, Menu, Avatar, Card, Table, Tag

### Phase 4 — Rich Components
- Data Grid, Command Palette, Date Picker, Color Picker, Video Player, Audio Player, Chart

### Phase 5 — Utilities & Polish
- Virtual Scroll, Drag & Drop, Transitions, Hotkeys, accessibility audit

### Phase 6 — Ecosystem
- CLI scaffold (`que create`), documentation site, playground, VS Code extension

---

## Principles

1. **Zero dependencies** — no `node_modules` in runtime
2. **Web Components first** — works in any framework without wrappers
3. **Accessible by default** — ARIA, keyboard, focus management out of the box
4. **Themeable** — every visual property is a CSS Custom Property
5. **Tree-shakeable** — import only what you use
6. **Secure** — no innerHTML, no eval
7. **Typed** — full TypeScript, no `any`
8. **Tested** — unit + browser tests for every component
