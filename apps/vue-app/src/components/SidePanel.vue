<script setup lang="ts">
import StepGuide from './StepGuide.vue';
</script>

<template>
  <div class="side-panel">
    <div>
      <h3>Guidance</h3>
      <StepGuide />
    </div>
    <div>
      <h3>Next Metrics</h3>
      <p class="side-panel__muted">
        Integrate TFT/TTFR charts and bundle stats once the bench package begins emitting reports.
      </p>
    </div>
    <div>
      <h3>Tools Overview</h3>
      <ul class="side-panel__list">
        <li>cortex_search – cite top sources</li>
        <li>text_to_sql – generate warehouse query</li>
        <li>sql_exec – execute limited result sets</li>
        <li>data_to_chart – render visual summary</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.side-panel {
  border-radius: var(--radius-md);
  background: rgba(48, 51, 71, 0.5);
  border: 1px solid rgba(68, 71, 90, 0.6);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.side-panel h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: var(--color-accent);
}

.side-panel__muted {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.side-panel__list {
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  color: var(--color-muted);
  font-size: 0.9rem;
}
</style>
