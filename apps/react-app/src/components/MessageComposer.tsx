import { ChangeEvent } from 'react';
import { ToolShortcutBar, ToolShortcut } from './ToolShortcutBar';
import styles from './MessageComposer.module.css';

interface MessageComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onStop?: () => void;
  isSending?: boolean;
  placeholder?: string;
  shortcuts?: ToolShortcut[];
}

export function MessageComposer({
  value,
  onChange,
  onSend,
  onStop,
  isSending,
  placeholder = 'Ask the Cortex Agent…',
  shortcuts = []
}: MessageComposerProps) {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className={styles.composer}>
      {shortcuts.length > 0 ? <ToolShortcutBar shortcuts={shortcuts} /> : null}
      <textarea
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={4}
        disabled={isSending}
        className={styles.textarea}
      />
      <div className={styles.actions}>
        <button type="button" onClick={onSend} disabled={isSending || value.trim().length === 0}>
          {isSending ? 'Sending…' : 'Send'}
        </button>
        {onStop ? (
          <button type="button" className="secondary" onClick={onStop} disabled={!isSending}>
            Stop
          </button>
        ) : null}
      </div>
    </div>
  );
}
