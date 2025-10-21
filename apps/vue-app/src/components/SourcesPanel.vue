<template>
  <section class="sources-panel">
    <h3>Sources</h3>
    <p v-if="sources.length === 0" class="sources-panel__muted">No sources available yet.</p>
    <ul v-else>
      <li v-for="source in sources" :key="source.id">
        <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.title }}</a>
        <p>{{ source.snippet }}</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
interface SourceItem {
  id: string;
  title: string;
  snippet: string;
  url: string;
}

interface Props {
  sources: SourceItem[];
}

defineProps<Props>();
</script>

<style scoped>
.sources-panel {
  border-radius: var(--radius-md);
  background: rgba(48, 51, 71, 0.5);
  border: 1px solid rgba(68, 71, 90, 0.6);
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.sources-panel h3 {
  margin: 0;
  color: var(--color-accent);
}

.sources-panel__muted {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 12px;
}

li {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

a {
  color: var(--color-accent);
  text-decoration: none;
}

p {
  margin: 0;
  font-size: 0.85rem;
  color: var(--color-muted);
}
</style>
