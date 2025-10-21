<script setup lang="ts">
</script>

<template>
  <div class="chat-layout">
    <div class="chat-layout__controls">
      <slot name="controls" />
    </div>
    <div v-if="$slots.summary" class="chat-layout__summary">
      <slot name="summary" />
    </div>
    <div class="chat-layout__main">
      <div class="chat-layout__timeline">
        <slot name="timeline" />
      </div>
      <aside class="chat-layout__side-panels">
        <slot name="side" />
      </aside>
    </div>
  </div>
</template>

<style scoped>
.chat-layout {
  display: grid;
  gap: clamp(16px, 2vw, 28px);
  flex: 1;
}

.chat-layout__controls,
.chat-layout__summary {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.chat-layout__main {
  display: grid;
  gap: clamp(16px, 2vw, 28px);
  grid-template-columns: minmax(0, 1fr) minmax(260px, 320px);
  align-items: start;
}

.chat-layout__timeline {
  min-height: 360px;
}

.chat-layout__side-panels {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

@media (max-width: 960px) {
  .chat-layout__main {
    grid-template-columns: 1fr;
  }

  .chat-layout__side-panels {
    order: 1;
  }
}
</style>
