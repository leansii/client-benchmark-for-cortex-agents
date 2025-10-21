<script setup lang="ts">
import { computed, ref } from 'vue';
import TimelinePane from './TimelinePane.vue';
import MessageList from './MessageList.vue';
import MessageBubble from './MessageBubble.vue';
import StreamingIndicator from './StreamingIndicator.vue';
import MessageComposer from './MessageComposer.vue';
import type { ToolShortcut } from './types';

const placeholderMessages = [
  {
    id: 'sys-1',
    variant: 'system',
    author: 'System',
    content:
      'Welcome to the Cortex benchmark shell. This environment mirrors production flows using synthetic data.'
  },
  {
    id: 'user-1',
    variant: 'user',
    author: 'User',
    content: 'Show me sales by region for the last quarter and surface notable trends.'
  },
  {
    id: 'assistant-1',
    variant: 'assistant',
    author: 'Assistant',
    content: 'Absolutely. I will query the warehouse and prepare a summary. Streaming output will appear shortly.'
  }
];

const draft = ref('');
const shortcuts = computed<ToolShortcut[]>(() => [
  { id: 'cortex_search', label: 'Search', description: 'Knowledge base' },
  { id: 'text_to_sql', label: 'Text → SQL', description: 'Generate queries' }
]);

function handleSend() {
  // Placeholder – integrate with proxy when ready
  draft.value = '';
}
</script>

<template>
  <TimelinePane
    title="Conversation Stream"
    description="Streaming chat preview with placeholder messages until proxy wiring is completed."
  >
    <template #actions>
      <StreamingIndicator :active="false" />
    </template>
    <MessageList>
      <MessageBubble
        v-for="message in placeholderMessages"
        :key="message.id"
        :variant="message.variant"
        :author="message.author"
      >
        {{ message.content }}
      </MessageBubble>
    </MessageList>
    <footer class="chat-footer">
      <div class="composer-placeholder">
        Composer placeholder — integrate textarea, tool shortcuts, and attachments once API contracts are ready.
      </div>
      <MessageComposer
        v-model="draft"
        :shortcuts="shortcuts"
        @send="handleSend"
        @select-shortcut="() => undefined"
      />
    </footer>
  </TimelinePane>
</template>

<style scoped>
.chat-footer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid rgba(68, 71, 90, 0.6);
  padding-top: 16px;
}

.composer-placeholder {
  padding: 16px;
  border-radius: var(--radius-md);
  background: rgba(48, 51, 71, 0.5);
  border: 1px dashed rgba(68, 71, 90, 0.6);
  color: var(--color-muted);
  font-size: 0.9rem;
}

.composer-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}
</style>
