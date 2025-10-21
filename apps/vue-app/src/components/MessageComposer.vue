<template>
  <div class="message-composer">
    <ToolShortcutBar v-if="shortcuts.length" :shortcuts="shortcuts" @select="onShortcutSelect" />
    <textarea
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled || sending"
      rows="4"
      @input="onInput"
    />
    <div class="message-composer__actions">
      <button type="button" @click="emit('send')" :disabled="isSendDisabled">
        {{ sending ? 'Sending…' : 'Send' }}
      </button>
      <button v-if="showStop" type="button" class="secondary" @click="emit('stop')" :disabled="!sending">
        Stop
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, toRefs } from 'vue';
import ToolShortcutBar from './ToolShortcutBar.vue';
import type { ToolShortcut } from './types';

interface Props {
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  sending?: boolean;
  shortcuts?: ToolShortcut[];
  showStop?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Ask the Cortex Agent…',
  disabled: false,
  sending: false,
  shortcuts: () => [],
  showStop: false
});

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'send'): void;
  (e: 'stop'): void;
  (e: 'select-shortcut', id: string): void;
}>();

const { modelValue, placeholder, disabled, sending, shortcuts, showStop } = toRefs(props);

const isSendDisabled = computed(() => disabled.value || sending.value || modelValue.value.trim().length === 0);

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
}

function onShortcutSelect(id: string) {
  emit('select-shortcut', id);
}
</script>

<style scoped>
.message-composer {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

textarea {
  width: 100%;
  border-radius: var(--radius-md);
  border: 1px solid rgba(68, 71, 90, 0.6);
  background: rgba(48, 51, 71, 0.6);
  color: var(--color-text);
  padding: 12px 14px;
  font-size: 0.95rem;
  resize: vertical;
  min-height: 120px;
}

.message-composer__actions {
  display: flex;
  gap: 12px;
  align-items: center;
  flex-wrap: wrap;
}
</style>
