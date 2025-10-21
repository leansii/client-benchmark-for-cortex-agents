import styles from './SourcesPanel.module.css';

export interface SourceItem {
  id: string;
  title: string;
  snippet: string;
  url: string;
}

interface SourcesPanelProps {
  sources: SourceItem[];
}

export function SourcesPanel({ sources }: SourcesPanelProps) {
  return (
    <section className={styles.panel}>
      <h3>Sources</h3>
      {sources.length === 0 ? (
        <p className={styles.empty}>No sources available yet.</p>
      ) : (
        <ul className={styles.list}>
          {sources.map((source) => (
            <li key={source.id} className={styles.item}>
              <a className={styles.link} href={source.url} target="_blank" rel="noopener noreferrer">
                {source.title}
              </a>
              <p className={styles.snippet}>{source.snippet}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
