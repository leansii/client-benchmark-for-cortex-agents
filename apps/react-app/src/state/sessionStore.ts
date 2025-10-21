import { create } from 'zustand';
import { nanoid } from 'nanoid';

type SessionState = {
  sessionId: string | null;
  createSession: () => void;
  clearSession: () => void;
};

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  createSession: () =>
    set(() => ({
      sessionId: nanoid()
    })),
  clearSession: () => set(() => ({ sessionId: null }))
}));
