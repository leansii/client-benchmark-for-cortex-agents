<template>
  <p v-if="rows.length === 0" class="data-table-preview__empty">{{ emptyLabel }}</p>
  <div v-else class="data-table-preview" role="table" aria-label="Tool data preview">
    <div class="data-table-preview__header" role="row">
      <span v-for="column in columns" :key="column" role="columnheader">{{ column }}</span>
    </div>
    <div class="data-table-preview__body">
      <div v-for="(row, index) in rows" :key="index" role="row" class="data-table-preview__row">
        <span v-for="column in columns" :key="column" role="cell">
          {{ row[column] ?? '' }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  columns: string[];
  rows: Array<Record<string, unknown>>;
  emptyLabel?: string;
}

import { toRefs } from 'vue';

const props = withDefaults(defineProps<Props>(), {
  emptyLabel: 'No data available'
});

const { columns, rows, emptyLabel } = toRefs(props);
</script>

<style scoped>
.data-table-preview {
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 0.85rem;
}

.data-table-preview__empty {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

.data-table-preview__header,
.data-table-preview__row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.data-table-preview__header {
  font-weight: 600;
  color: var(--color-muted);
}

.data-table-preview__row {
  padding: 8px;
  border-radius: var(--radius-sm);
  background: rgba(48, 51, 71, 0.4);
}
</style>
