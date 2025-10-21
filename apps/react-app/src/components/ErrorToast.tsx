import styles from './ErrorToast.module.css';

interface ErrorToastProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}

export function ErrorToast({ message, actionLabel, onAction, onDismiss }: ErrorToastProps) {
  return (
    <div className={styles.toast} role="alert">
      <span className={styles.message}>{message}</span>
      <div className={styles.actions}>
        {actionLabel ? (
          <button type="button" onClick={onAction}>
            {actionLabel}
          </button>
        ) : null}
        {onDismiss ? (
          <button type="button" className="secondary" onClick={onDismiss} aria-label="Dismiss error">
            ✕
          </button>
        ) : null}
      </div>
    </div>
  );
}
