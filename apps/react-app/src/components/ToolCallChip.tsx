import styles from './ToolCallChip.module.css';

export type ToolCallStatus = 'pending' | 'in_progress' | 'complete' | 'failed';

interface ToolCallChipProps {
  name: string;
  status: ToolCallStatus;
}

const statusClass: Record<ToolCallStatus, string> = {
  pending: styles.chip,
  in_progress: `${styles.chip} ${styles.running}`,
  complete: `${styles.chip} ${styles.completed}`,
  failed: `${styles.chip} ${styles.failed}`
};

const statusLabel: Record<ToolCallStatus, string> = {
  pending: 'Pending',
  in_progress: 'Running',
  complete: 'Complete',
  failed: 'Failed'
};

export function ToolCallChip({ name, status }: ToolCallChipProps) {
  return (
    <span className={statusClass[status]}>
      {name}
      <span className={styles.status}>{statusLabel[status]}</span>
    </span>
  );
}
