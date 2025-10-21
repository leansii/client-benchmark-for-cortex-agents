<template>
  <div v-if="shortcuts.length" class="tool-shortcut-bar">
    <button
      v-for="shortcut in shortcuts"
      :key="shortcut.id"
      type="button"
      class="tool-shortcut"
      @click="onSelect(shortcut.id)"
      :disabled="shortcut.disabled"
    >
      <span>{{ shortcut.label }}</span>
      <small v-if="shortcut.description">{{ shortcut.description }}</small>
    </button>
  </div>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';
import type { ToolShortcut } from './types';

interface Props {
  shortcuts: ToolShortcut[];
}

const props = withDefaults(defineProps<Props>(), {
  shortcuts: () => []
});

const emit = defineEmits<{
  (e: 'select', id: string): void;
}>();

function onSelect(id: string) {
  emit('select', id);
}

const { shortcuts } = toRefs(props);
</script>

<style scoped>
.tool-shortcut-bar {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 4px;
}

.tool-shortcut {
  border: 1px solid rgba(189, 147, 249, 0.35);
  background: rgba(189, 147, 249, 0.12);
  color: var(--color-text);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.85rem;
  display: inline-flex;
  flex-direction: column;
  gap: 2px;
}

.tool-shortcut small {
  font-size: 0.7rem;
  color: var(--color-muted);
}
</style>
