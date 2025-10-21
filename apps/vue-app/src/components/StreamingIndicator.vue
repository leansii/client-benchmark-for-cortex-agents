<template>
  <div class="streaming-indicator" :class="{ 'streaming-indicator--active': active }" role="status">
    <span class="streaming-indicator__dot" aria-hidden="true" />
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  active: boolean;
  label?: string;
}

import { toRefs } from 'vue';

const props = withDefaults(defineProps<Props>(), {
  label: 'Streaming'
});

const { active, label } = toRefs(props);
</script>

<style scoped>
.streaming-indicator {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 0.85rem;
  color: var(--color-muted);
}

.streaming-indicator__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgba(98, 114, 164, 0.6);
}

.streaming-indicator--active .streaming-indicator__dot {
  animation: pulse 1.2s infinite;
  background: var(--color-accent);
}

@keyframes pulse {
  0% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.4;
  }
}
</style>
