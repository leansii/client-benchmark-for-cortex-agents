# Frontend Component Architecture (Draft)

## Layout
1. `ChatLayout` – wraps session controls, timeline, side panels; responsive grid (React/Vue scaffolded).
2. `TimelinePane` – vertical stack containing `MessageList` + dividers.
3. `SidePanel` – renders tool outputs, metrics, or guidance.

## Messaging
1. `MessageList` – virtualized list of `MessageBubble` items with streaming support.
2. `MessageBubble` – renders author, timestamp, content, tool metadata.
3. `TimelineDivider` – marks day/session boundaries.
4. `ToolCallChip` – inline indicator for tool execution within messages.

## Tool Outputs
1. `SourcesPanel` – citation list with expandable entries.
2. `ToolResultCard` – generic container for SQL, search, chart results.
3. `DataTablePreview` – tabular view with virtualization stub.
4. `ChartPreview` – placeholder for chart renderer (lazy-loaded).

## Composer & Controls
1. `MessageComposer` – textarea, token counter, send button, tool shortcuts.
2. `ToolShortcutBar` – buttons for `cortex_search`, `text_to_sql`, etc.
3. `AttachmentList` – shows pending files or datasets (future).

## Status & Feedback
1. `StatusSummary` – high-level readiness info.
2. `SessionControls` – start/reset session, environment indicators.
3. `StreamingIndicator` – animated state for active streams.
4. `ErrorToast` – non-blocking error notifications.

Parity goal: implement scaffolds for React and Vue with identical props and exported structures so shared documentation/test harnesses can target both.

Status: React (`apps/react-app/src/components`) and Vue (`apps/vue-app/src/components`) now include placeholder implementations for every component listed above, ready for wiring to live data.
