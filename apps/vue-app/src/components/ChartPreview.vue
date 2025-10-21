<template>
  <div class="chart-preview" role="img" :aria-label="`Preview chart: ${chartType}`">
    <span class="chart-preview__label">{{ chartType.toUpperCase() }}</span>
    <p>{{ description ?? 'Chart rendering placeholder. Integrate charting library on implementation.' }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  chartType: 'bar' | 'line' | 'table';
  description?: string;
}

defineProps<Props>();
</script>

<style scoped>
.chart-preview {
  border-radius: var(--radius-md);
  border: 1px dashed rgba(189, 147, 249, 0.3);
  background: rgba(48, 51, 71, 0.45);
  padding: 16px;
  display: grid;
  gap: 8px;
  justify-items: start;
}

.chart-preview__label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--color-muted);
}

p {
  margin: 0;
  color: var(--color-muted);
}
</style>
