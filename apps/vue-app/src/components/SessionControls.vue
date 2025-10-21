<template>
  <section aria-label="Session controls">
    <div class="session-panel">
      <span class="status-label">
        Session:
        <strong :class="['status-value', statusClass]">{{ sessionId ?? 'not started' }}</strong>
      </span>
      <div class="session-actions">
        <button type="button" @click="onStart">Start Session</button>
        <button type="button" class="secondary" @click="onReset">Reset</button>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  sessionId: string | null;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'start'): void;
  (e: 'reset'): void;
}>();

const statusClass = computed(() => (props.sessionId ? 'status-active' : 'status-inactive'));

const onStart = () => emit('start');
const onReset = () => emit('reset');
</script>

<style scoped>
.session-panel {
  display: grid;
  gap: 12px;
  padding: 16px;
  border-radius: var(--radius-md);
  background: rgba(48, 51, 71, 0.6);
  border: 1px solid rgba(189, 147, 249, 0.2);
}

.status-label {
  font-weight: 600;
  color: var(--color-muted);
}

.status-value {
  font-weight: 600;
}

.status-active {
  color: var(--color-success);
}

.status-inactive {
  color: var(--color-warning);
}

.session-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}
</style>
