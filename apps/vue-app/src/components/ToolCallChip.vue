<template>
  <span :class="['tool-call-chip', statusClass]">
    {{ name }}
    <span class="tool-call-chip__status">{{ statusLabel }}</span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

type ToolCallStatus = 'pending' | 'in_progress' | 'complete' | 'failed';

interface Props {
  name: string;
  status: ToolCallStatus;
}

const props = defineProps<Props>();

const statusClass = computed(() => {
  switch (props.status) {
    case 'in_progress':
      return 'tool-call-chip--running';
    case 'complete':
      return 'tool-call-chip--completed';
    case 'failed':
      return 'tool-call-chip--failed';
    default:
      return 'tool-call-chip--pending';
  }
});

const statusLabel = computed(() => {
  switch (props.status) {
    case 'in_progress':
      return 'Running';
    case 'complete':
      return 'Complete';
    case 'failed':
      return 'Failed';
    default:
      return 'Pending';
  }
});
</script>

<style scoped>
.tool-call-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  background: rgba(98, 114, 164, 0.2);
}

.tool-call-chip--running {
  background: rgba(189, 147, 249, 0.25);
}

.tool-call-chip--completed {
  background: rgba(80, 250, 123, 0.2);
}

.tool-call-chip--failed {
  background: rgba(255, 85, 85, 0.2);
}

.tool-call-chip__status {
  font-weight: 600;
}
</style>
