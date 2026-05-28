# que-ui — Progress Tracker

Legend: ✅ Done · 🚧 In Progress · ⬜ Not Started · ❌ Blocked

---

## Phase 1 — Foundation

### Infrastructure
| Status | Task |
|--------|------|
| ✅ | Project setup (TypeScript strict, esbuild, exports map) |
| ✅ | `BaseElement` class — base for all components |
| ⬜ | CSS adoption helper (`adoptedStyleSheets`) |
| ✅ | Design token system (TS → CSS Custom Properties) |
| ✅ | Utility classes generated from tokens (`dist/utilities.css`) |
| ✅ | Theme engine — `createTheme`, `applyTheme`, `ThemeController` |
| ✅ | `cssVar` / `tokensToCSSVars` utils |
| ⬜ | DOM utility helpers (createElement, on, off, etc.) |
| ⬜ | Positioning algorithm (for tooltips, popovers, menus) |
| ⬜ | Focus trap utility |
| ⬜ | Scroll lock utility |
| ⬜ | Event bus / custom events pattern |
| ⬜ | Test setup (unit + browser) |
| ✅ | npm package config (ESM, CJS, types, exports map) |
| ✅ | Preview (4 HTML files: CSS/JS × Components/Theme) |
| ✅ | Build script (`npm run build` → tokens.css, utilities.css, index.js, index.cjs) |

### Design Tokens
| Status | Category |
|--------|----------|
| ✅ | Color (primary, secondary, surface, text, danger, warning, success) |
| ✅ | Typography (font-family, size scale, weight, line-height) |
| ✅ | Spacing (4px scale: space-0 … space-24) |
| ✅ | Border radius (sm, md, lg, full) |
| ✅ | Shadow (xs, sm, md, lg, xl, 2xl, inner) |
| ✅ | Motion (duration × 5, easing × 5) |
| ✅ | Z-index (hide, base, raised, dropdown, sticky, overlay, modal, toast, tooltip) |
| ✅ | Light theme |
| ✅ | Dark theme |

### Layout Components
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | View | `<que-view>` |
| ⬜ | Stack | `<que-stack>` |
| ⬜ | Grid | `<que-grid>` |
| ⬜ | Divider | `<que-divider>` |
| ⬜ | Spacer | `<que-spacer>` |

### Form Controls (Core)
| Status | Component | Tag |
|--------|-----------|-----|
| ✅ | Button | `<que-button>` |
| ✅ | Input | `<que-input>` |
| ✅ | Textarea | `<que-textarea>` |
| ✅ | Checkbox | `<que-checkbox>` |
| ✅ | Switch / Toggle | `<que-switch>` |
| ✅ | Radio + Radio Group | `<que-radio>`, `<que-radio-group>` |
| ✅ | Select | `<que-select>` |
| ✅ | Slider | `<que-slider>` |

---

## Phase 2 — Overlays & Feedback

| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Modal / Dialog | `<que-modal>` |
| ⬜ | Drawer | `<que-drawer>` |
| ✅ | Tooltip | `<que-tooltip>` |
| ✅ | Popover | `<que-popover>` |
| ✅ | Toast | `<que-toast>` |
| ✅ | Alert | `<que-alert>` |
| ✅ | Badge | `<que-badge>` |
| ✅ | Spinner | `<que-spinner>` |
| ✅ | Progress (linear) | `<que-progress>` |
| ✅ | Progress (circular) | `<que-progress type="circular">` |
| ✅ | Skeleton | `<que-skeleton>` |
| ✅ | Empty State | `<que-empty>` |

---

## Phase 3 — Navigation & Data Display

### Navigation
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Tabs | `<que-tabs>` |
| ⬜ | Breadcrumb | `<que-breadcrumb>` |
| ⬜ | Pagination | `<que-pagination>` |
| ⬜ | Stepper | `<que-stepper>` |
| ⬜ | Menu (dropdown) | `<que-menu>` |
| ⬜ | Context Menu | `<que-context-menu>` |
| ⬜ | Navbar | `<que-navbar>` |
| ⬜ | Sidebar | `<que-sidebar>` |

### Data Display
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Avatar | `<que-avatar>` |
| ⬜ | Image | `<que-image>` |
| ⬜ | Icon | `<que-icon>` |
| ⬜ | Tag / Chip | `<que-tag>` |
| ⬜ | Card | `<que-card>` |
| ⬜ | Table | `<que-table>` |
| ⬜ | List (virtualized) | `<que-list>` |
| ⬜ | Timeline | `<que-timeline>` |
| ⬜ | Stat | `<que-stat>` |

### Typography
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Text | `<que-text>` |
| ⬜ | Heading | `<que-heading>` |
| ⬜ | Code | `<que-code>` |
| ⬜ | Kbd | `<que-kbd>` |
| ⬜ | Link | `<que-link>` |

---

## Phase 4 — Rich Components

### Advanced Form Controls
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Combobox / Autocomplete | `<que-combobox>` |
| ⬜ | Date Picker | `<que-date-picker>` |
| ⬜ | Time Picker | `<que-time-picker>` |
| ⬜ | Color Picker | `<que-color-picker>` |
| ⬜ | File Upload | `<que-file-upload>` |
| ⬜ | Rating | `<que-rating>` |
| ⬜ | Slider (range) | `<que-slider range>` |

### Navigation
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Command Palette | `<que-command>` |
| ⬜ | Accordion | `<que-accordion>` |
| ⬜ | Tree View | `<que-tree>` |

### Data
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Data Grid | `<que-data-grid>` |
| ⬜ | Scroll Area (custom scrollbar) | `<que-scroll-area>` |

### Media
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Video Player | `<que-video>` |
| ⬜ | Audio Player | `<que-audio>` |
| ⬜ | Image Gallery / Lightbox | `<que-gallery>` |
| ⬜ | Carousel | `<que-carousel>` |
| ⬜ | Chart (Canvas) | `<que-chart>` |

---

## Phase 5 — Utilities & Polish

### Utility Components
| Status | Component | Tag |
|--------|-----------|-----|
| ⬜ | Virtual Scroll | `<que-virtual>` |
| ⬜ | Transition | `<que-transition>` |
| ⬜ | Portal | `<que-portal>` |
| ⬜ | Resizable panel | `<que-resizable>` |
| ⬜ | Drag & Drop | `<que-draggable>`, `<que-droppable>` |
| ⬜ | Hotkey binding | `<que-hotkey>` |
| ⬜ | Click Outside | `<que-click-outside>` |
| ⬜ | Intersection Observer | `<que-intersection>` |
| ⬜ | Aspect Ratio | `<que-aspect-ratio>` |

### Quality
| Status | Task |
|--------|------|
| ⬜ | Accessibility audit (all components) |
| ⬜ | Keyboard navigation test for all interactive components |
| ⬜ | Screen reader testing (NVDA, VoiceOver) |
| ⬜ | Cross-browser testing (Chrome, Firefox, Safari) |
| ⬜ | Mobile / touch testing |
| ⬜ | RTL (right-to-left) support |
| ⬜ | `prefers-reduced-motion` on all animations |
| ⬜ | Bundle size audit (< 5 KB per component) |

---

## Phase 6 — Ecosystem

| Status | Task |
|--------|------|
| ⬜ | Documentation site |
| ⬜ | Interactive component playground |
| ⬜ | CLI scaffold (`que create my-app`) |
| ⬜ | VS Code extension (snippets, prop autocomplete) |
| ⬜ | React wrapper package (`@que-ui/react`) |
| ⬜ | Vue wrapper package (`@que-ui/vue`) |
| ⬜ | Figma design kit |
| ⬜ | Migration guides |

---

## Bugs & Issues

| Priority | Description | Status |
|----------|-------------|--------|
| — | — | — |

---

## Notes

<!-- Add decisions, blockers, architecture notes here -->
