# 5. Client UX Parity Spec

## 5.1 Decisions
1. Shared layout: chat composer at bottom, message list center (virtualized), context sidebar for citations/tools.
2. Input behavior: multi-line editor with `Ctrl+Enter` send, `Shift+Enter` newline, 300 ms debounce on change for autosave.
3. Streaming: SSE updates appended with progressive rendering; show typing indicator + spinner.
4. Citations & sources: collapsible drawer per assistant message listing source title, snippet, link (opens new tab).
5. Data visualizations: table & chart components share skeleton states, error states, and fallback messaging.
6. Accessibility: WCAG 2.1 AA, focus traps for modals, `aria-live="polite"` stream region, high-contrast mode toggle.
7. Performance: virtualization after 100 messages, lazy-load heavy components, use requestAnimationFrame for scroll locking.

### 5.1.1 UI Components Checklist
- [ ] Composer (text area, send button, attachments placeholder).
- [ ] Message list item variants: user, assistant, tool call, tool result, error.
- [ ] Streaming indicator + stop generation control.
- [ ] Citations drawer with list virtualization for >10 sources.
- [ ] Table view with column resizing + download CSV button.
- [ ] Chart view supporting bar/line/scatter + accessible descriptions.
- [ ] Error banners (global + inline) consistent across clients.
- [ ] Loading skeleton states for initial fetch and tool results.

## 5.2 Open Questions
- OQ5.1: Confirm design system tokens (typography, spacing) source of truth.
- OQ5.2: Determine branding requirements (logos, colors) for parity.
- OQ5.3: Clarify whether offline/poor network states need dedicated UX.

## 5.3 Next Steps
1. Produce shared Figma references or screenshots for parity review.
2. Draft UX parity checklist spreadsheet for weekly verification.
3. Define instrumentation events for UX interactions (send, stop, expand citation, chart toggle).
