import { ReactNode } from 'react';
import styles from './SessionControls.module.css';

interface SessionControlsProps {
  sessionId: string | null;
  onStart: () => void;
  onReset: () => void;
  extra?: ReactNode;
}

export function SessionControls({ sessionId, onStart, onReset, extra }: SessionControlsProps) {
  const statusClass = sessionId ? styles.statusActive : styles.statusInactive;

  return (
    <section aria-label="Session controls">
      <div className={styles.panel}>
        <span className={styles.statusLabel}>
          Session:{' '}
          <strong className={`${styles.statusValue} ${statusClass}`}>{sessionId ?? 'not started'}</strong>
        </span>
        <div className={styles.actions}>
          <button type="button" onClick={onStart}>
            Start Session
          </button>
          <button type="button" className="secondary" onClick={onReset}>
            Reset
          </button>
          {extra}
        </div>
      </div>
    </section>
  );
}
