<template>
  <ul v-if="attachments.length" class="attachment-list">
    <li v-for="attachment in attachments" :key="attachment.id">
      <span>{{ attachment.name }}</span>
      <small v-if="attachment.sizeLabel">{{ attachment.sizeLabel }}</small>
      <button
        v-if="dismissible"
        type="button"
        @click="$emit('remove', attachment.id)"
        :aria-label="`Remove ${attachment.name}`"
      >
        ✕
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface AttachmentItem {
  id: string;
  name: string;
  sizeLabel?: string;
}

interface Props {
  attachments: AttachmentItem[];
  dismissible?: boolean;
}

withDefaults(defineProps<Props>(), {
  attachments: () => [],
  dismissible: true
});

defineEmits<{
  (e: 'remove', id: string): void;
}>();
</script>

<style scoped>
.attachment-list {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
}

.attachment-list li {
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(48, 51, 71, 0.45);
  border-radius: var(--radius-sm);
  padding: 8px 12px;
}

button {
  border: none;
  background: transparent;
  color: var(--color-muted);
  cursor: pointer;
}
</style>
