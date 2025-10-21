<template>
  <div class="messages-list" role="log" aria-live="polite">
    <slot />
  </div>
</template>

<style scoped>
.messages-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  padding: 0 4px 0 2px;
  scrollbar-width: thin;
  scrollbar-color: var(--color-accent) transparent;
}

.messages-list::-webkit-scrollbar {
  width: 8px;
}

.messages-list::-webkit-scrollbar-thumb {
  background: linear-gradient(var(--color-accent), var(--color-accent-strong));
  border-radius: 999px;
}
</style>
