<template>
  <section class="tool-result-card">
    <header>
      <h3>{{ title }}</h3>
      <span v-if="subtitle">{{ subtitle }}</span>
    </header>
    <div class="tool-result-card__body">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  subtitle?: string;
}

defineProps<Props>();
</script>

<style scoped>
.tool-result-card {
  border-radius: var(--radius-md);
  background: rgba(48, 51, 71, 0.6);
  border: 1px solid rgba(98, 114, 164, 0.3);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

header span {
  font-size: 0.75rem;
  color: var(--color-muted);
  text-transform: uppercase;
}

.tool-result-card__body {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
