import styles from './TimelineDivider.module.css';

interface TimelineDividerProps {
  label: string;
}

export function TimelineDivider({ label }: TimelineDividerProps) {
  return (
    <div className={styles.divider} role="separator" aria-label={label}>
      {label}
    </div>
  );
}
