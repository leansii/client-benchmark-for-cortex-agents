<template>
  <div class="timeline-divider" role="separator" :aria-label="label">
    {{ label }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  label: string;
}

defineProps<Props>();
</script>

<style scoped>
.timeline-divider {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--color-muted);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.timeline-divider::before,
.timeline-divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(98, 114, 164, 0.3);
}
</style>
