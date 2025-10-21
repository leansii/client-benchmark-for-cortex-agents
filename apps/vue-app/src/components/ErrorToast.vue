<template>
  <div class="error-toast" role="alert">
    <span>{{ message }}</span>
    <div class="error-toast__actions">
      <button v-if="actionLabel" type="button" @click="$emit('action')">{{ actionLabel }}</button>
      <button v-if="dismissible" type="button" class="secondary" @click="$emit('dismiss')" aria-label="Dismiss error">
        ✕
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message: string;
  actionLabel?: string;
  dismissible?: boolean;
}

withDefaults(defineProps<Props>(), {
  dismissible: true
});

defineEmits<{
  (e: 'action'): void;
  (e: 'dismiss'): void;
}>();
</script>

<style scoped>
.error-toast {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 12px 16px;
  border-radius: var(--radius-md);
  background: rgba(255, 85, 85, 0.15);
  border: 1px solid rgba(255, 85, 85, 0.35);
  align-items: center;
}

.error-toast__actions {
  display: flex;
  gap: 8px;
}
</style>
