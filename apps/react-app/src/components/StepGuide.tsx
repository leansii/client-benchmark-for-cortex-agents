import styles from './StepGuide.module.css';

export function StepGuide() {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Upcoming</span>
      <ul className={styles.list}>
        <li>Connect to proxy</li>
        <li>Render streaming tokens</li>
        <li>Surface sources &amp; tool outputs</li>
      </ul>
    </div>
  );
}
