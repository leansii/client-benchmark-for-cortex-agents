export interface ToolShortcut {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface ToolShortcutBarProps {
  shortcuts: ToolShortcut[];
  onSelect?: (id: string) => void;
}

import styles from './ToolShortcutBar.module.css';

export function ToolShortcutBar({ shortcuts, onSelect }: ToolShortcutBarProps) {
  if (shortcuts.length === 0) {
    return null;
  }

  return (
    <div className={styles.bar}>
      {shortcuts.map((shortcut) => (
        <button
          key={shortcut.id}
          type="button"
          className={styles.shortcut}
          onClick={() => onSelect?.(shortcut.id)}
          disabled={shortcut.disabled}
        >
          <span>{shortcut.label}</span>
          {shortcut.description ? <small>{shortcut.description}</small> : null}
        </button>
      ))}
    </div>
  );
}
