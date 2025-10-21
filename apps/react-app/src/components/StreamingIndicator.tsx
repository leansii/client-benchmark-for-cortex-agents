import styles from './StreamingIndicator.module.css';

interface StreamingIndicatorProps {
  active: boolean;
  label?: string;
}

export function StreamingIndicator({ active, label = 'Streaming' }: StreamingIndicatorProps) {
  return (
    <div className={`${styles.indicator} ${active ? styles.active : ''}`} role="status">
      <span className={styles.dot} aria-hidden />
      <span>{label}</span>
    </div>
  );
}
