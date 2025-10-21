<template>
  <div class="step-guide">
    <span class="step-guide__label">Upcoming</span>
    <ul>
      <li>Connect to proxy</li>
      <li>Render streaming tokens</li>
      <li>Surface sources &amp; tool outputs</li>
    </ul>
  </div>
</template>

<style scoped>
.step-guide {
  background: rgba(98, 114, 164, 0.15);
  border: 1px solid rgba(98, 114, 164, 0.35);
  border-radius: var(--radius-md);
  padding: 12px 16px;
  min-width: 220px;
}

.step-guide__label {
  display: inline-block;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 8px;
}

ul {
  list-style: disc;
  padding-left: 20px;
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9rem;
  display: grid;
  gap: 4px;
}
</style>
