export type MessageRole = 'system' | 'user' | 'assistant' | 'tool';

export interface ToolCall {
  id: string;
  name: 'cortex_search' | 'cortex_analyst_text_to_sql' | 'sql_exec' | 'data_to_chart';
  arguments: Record<string, unknown>;
  status: 'requested' | 'in_progress' | 'completed' | 'failed';
}

export interface SourceReference {
  id: string;
  title: string;
  snippet: string;
  sourceUrl: string;
  confidence?: number;
}

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  toolCalls?: ToolCall[];
  annotations?: SourceReference[];
}

export interface StreamTokenEvent {
  type: 'token';
  delta: string;
  index: number;
}

export interface StreamToolCallEvent {
  type: 'tool_call';
  call: ToolCall;
}

export interface StreamFinalEvent {
  type: 'final';
  message: Message;
  sources: SourceReference[];
}

export interface StreamErrorEvent {
  type: 'error';
  code: string;
  message: string;
}

export type StreamEvent =
  | StreamTokenEvent
  | StreamToolCallEvent
  | StreamFinalEvent
  | StreamErrorEvent;
