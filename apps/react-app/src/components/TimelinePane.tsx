import { ReactNode } from 'react';
import styles from './TimelinePane.module.css';

interface TimelinePaneProps {
  title: string;
  description?: string;
  headerActions?: ReactNode;
  children: ReactNode;
}

export function TimelinePane({ title, description, headerActions, children }: TimelinePaneProps) {
  return (
    <section aria-label={title} className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2>{title}</h2>
          {description ? <p>{description}</p> : null}
        </div>
        {headerActions}
      </div>
      {children}
    </section>
  );
}
