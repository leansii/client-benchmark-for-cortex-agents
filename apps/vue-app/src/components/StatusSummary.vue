<template>
  <section aria-label="Status summary" class="summary">
    <h2>Chat Benchmark Placeholder</h2>
    <p>
      Session ready:
      <strong :class="['status-value', statusClass]">{{ sessionReady ? 'yes' : 'no' }}</strong>
    </p>
    <p class="summary__description">
      Replace this placeholder once chat modules and parity flows are implemented. Follow the shared documentation for
      next steps and integrate proxy wiring as credentials become available.
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  sessionReady: boolean;
}

const props = defineProps<Props>();
const statusClass = computed(() => (props.sessionReady ? 'status-active' : 'status-inactive'));
</script>

<style scoped>
.summary {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: rgba(31, 33, 48, 0.7);
  border-radius: var(--radius-md);
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid rgba(68, 71, 90, 0.6);
  backdrop-filter: blur(6px);
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

.summary__description {
  margin: 0;
  color: var(--color-muted);
}
</style>
