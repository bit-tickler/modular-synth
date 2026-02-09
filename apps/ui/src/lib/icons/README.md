Icons README

Usage
- Icons accept standard SVG attributes and arbitrary props which are forwarded to the root <svg> element via `{...$$restProps}`.
- Styling: icons use `currentColor` for `fill`/`stroke` by default, so apply Tailwind color utilities (e.g. `text-amber-500`) to change color.
- Accessibility: pass `ariaLabel` to provide an accessible name (the icon will set `role="img"` and `aria-label` when provided).

Examples
- <ToggleSwitch onLabel={Sun} onLabelProps={{ class: 'text-amber-500 w-5 h-5', ariaLabel: 'sun' }} />
- <SomeButton><Moon class="text-slate-400" ariaLabel="moon" /></SomeButton>

Notes
- Prefer passing `class` instead of a custom `className` prop. All attributes are forwarded to the SVG.