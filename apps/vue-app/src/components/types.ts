export type MessageVariant = 'system' | 'user' | 'assistant' | 'tool';

export interface ToolShortcut {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface AttachmentItem {
  id: string;
  name: string;
  sizeLabel?: string;
}
