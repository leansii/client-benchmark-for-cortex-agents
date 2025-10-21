import { useMemo, useState } from 'react';
import { TimelinePane } from './TimelinePane';
import { MessageList } from './MessageList';
import { Message } from './Message';
import { StreamingIndicator } from './StreamingIndicator';
import { MessageComposer } from './MessageComposer';
import type { ToolShortcut } from './ToolShortcutBar';
import styles from './ChatWindow.module.css';

const placeholderMessages = [
  {
    id: 'sys-1',
    variant: 'system' as const,
    author: 'System',
    content: 'Welcome to the Cortex benchmark shell. This environment mirrors production flows using synthetic data.'
  },
  {
    id: 'user-1',
    variant: 'user' as const,
    author: 'User',
    content: 'Show me sales by region for the last quarter and surface notable trends.'
  },
  {
    id: 'assistant-1',
    variant: 'assistant' as const,
    author: 'Assistant',
    content: 'Absolutely. I will query the warehouse and prepare a summary. Streaming output will appear shortly.'
  }
];

export function ChatWindow() {
  const [draft, setDraft] = useState('');

  const shortcuts = useMemo<ToolShortcut[]>(
    () => [
      { id: 'cortex_search', label: 'Search', description: 'Knowledge base' },
      { id: 'text_to_sql', label: 'Text → SQL', description: 'Generate queries' }
    ],
    []
  );

  return (
    <TimelinePane
      title="Conversation Stream"
      description="Streaming chat preview with placeholder messages until proxy wiring is completed."
      headerActions={<StreamingIndicator active={false} />}
    >
      <MessageList>
        {placeholderMessages.map((message) => (
          <Message key={message.id} variant={message.variant} author={message.author}>
            {message.content}
          </Message>
        ))}
      </MessageList>
      <footer className={styles.footer}>
        <div className={styles.placeholder}>
          Composer placeholder — integrate textarea, tool shortcuts, and attachments once API contracts are ready.
        </div>
        <MessageComposer value={draft} onChange={setDraft} onSend={() => setDraft('')} shortcuts={shortcuts} />
      </footer>
    </TimelinePane>
  );
}
