import { ReactNode } from 'react';
import styles from './MessageList.module.css';

type MessageListProps = {
  children: ReactNode;
};

export function MessageList({ children }: MessageListProps) {
  return (
    <div className={styles.container} role="log" aria-live="polite">
      {children}
    </div>
  );
}
