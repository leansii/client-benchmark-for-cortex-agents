import { ReactNode } from 'react';
import styles from './ChatLayout.module.css';

interface ChatLayoutProps {
  sessionControls: ReactNode;
  statusSummary: ReactNode;
  timeline: ReactNode;
  sidePanel?: ReactNode;
}

export function ChatLayout({ sessionControls, statusSummary, timeline, sidePanel }: ChatLayoutProps) {
  return (
    <div className={styles.container}>
      <div className={styles.controls}>{sessionControls}</div>
      <div className={styles.summary}>{statusSummary}</div>
      <div className={styles.main}>
        <div className={styles.timeline}>{timeline}</div>
        <aside className={styles.side}>{sidePanel}</aside>
      </div>
    </div>
  );
}
