import styles from './StatusSummary.module.css';

interface StatusSummaryProps {
  sessionReady: boolean;
}

export function StatusSummary({ sessionReady }: StatusSummaryProps) {
  const statusClass = sessionReady ? styles.statusActive : styles.statusInactive;

  return (
    <section aria-label="Status summary" className={styles.container}>
      <h2>Chat Benchmark Placeholder</h2>
      <p>
        Session ready:{' '}
        <strong className={`${styles.statusValue} ${statusClass}`}>{sessionReady ? 'yes' : 'no'}</strong>
      </p>
      <p className={styles.description}>
        Replace this placeholder once chat modules and parity flows are implemented. Follow the shared documentation for
        next steps and integrate proxy wiring as credentials become available.
      </p>
    </section>
  );
}
