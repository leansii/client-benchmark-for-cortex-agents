import { defineStore } from 'pinia';
import { nanoid } from 'nanoid';

export const useSessionStore = defineStore('session', {
  state: () => ({
    sessionId: null as string | null
  }),
  actions: {
    createSession() {
      this.sessionId = nanoid();
    },
    clearSession() {
      this.sessionId = null;
    }
  }
});
