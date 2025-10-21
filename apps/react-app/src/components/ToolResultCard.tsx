import { ReactNode } from 'react';
import styles from './ToolResultCard.module.css';

interface ToolResultCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export function ToolResultCard({ title, subtitle, children }: ToolResultCardProps) {
  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h3>{title}</h3>
        {subtitle ? <span className={styles.meta}>{subtitle}</span> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  );
}
