import { ReactNode } from 'react';
import styles from './Message.module.css';

export type MessageVariant = 'system' | 'user' | 'assistant' | 'tool';

type MessageProps = {
  variant: MessageVariant;
  author: string;
  timestamp?: string;
  children: ReactNode;
};

export function Message({ variant, author, timestamp, children }: MessageProps) {
  const variantClass =
    variant === 'system'
      ? styles.system
      : variant === 'user'
        ? styles.user
        : variant === 'assistant'
          ? styles.assistant
          : styles.tool;

  return (
    <article className={`${styles.message} ${variantClass}`}>
      <header className={styles.header}>
        <span className={styles.author}>{author}</span>
        {timestamp ? <span className={styles.timestamp}>{timestamp}</span> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </article>
  );
}
