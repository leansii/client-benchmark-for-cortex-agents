export interface AttachmentItem {
  id: string;
  name: string;
  sizeLabel?: string;
}

import styles from './AttachmentList.module.css';

interface AttachmentListProps {
  attachments: AttachmentItem[];
  onRemove?: (id: string) => void;
}

export function AttachmentList({ attachments, onRemove }: AttachmentListProps) {
  if (attachments.length === 0) {
    return null;
  }

  return (
    <ul className={styles.list}>
      {attachments.map((attachment) => (
        <li key={attachment.id} className={styles.item}>
          <span>{attachment.name}</span>
          {attachment.sizeLabel ? <small>{attachment.sizeLabel}</small> : null}
          {onRemove ? (
            <button
              type="button"
              className={styles.removeButton}
              onClick={() => onRemove(attachment.id)}
              aria-label={`Remove ${attachment.name}`}
            >
              ✕
            </button>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
