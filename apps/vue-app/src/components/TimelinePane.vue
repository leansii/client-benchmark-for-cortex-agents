<template>
  <section class="timeline-pane" :aria-label="title">
    <div class="timeline-pane__header">
      <div>
        <h2>{{ title }}</h2>
        <p v-if="description">{{ description }}</p>
      </div>
      <slot name="actions" />
    </div>
    <slot />
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  description?: string;
}

defineProps<Props>();
</script>

<style scoped>
.timeline-pane {
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 320px;
  overflow: hidden;
  background: rgba(31, 33, 48, 0.7);
  border-radius: var(--radius-md);
  padding: clamp(18px, 3vw, 28px);
  border: 1px solid rgba(68, 71, 90, 0.6);
  backdrop-filter: blur(6px);
}

.timeline-pane h2 {
  margin: 0 0 4px;
  color: var(--color-success);
  font-size: clamp(1.2rem, 2.5vw, 1.6rem);
}

.timeline-pane__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.timeline-pane__header p {
  margin: 0;
  color: var(--color-muted);
}
</style>
