import { z } from 'zod';

export const toolCallSchema = z.object({
  id: z.string().uuid(),
  name: z.enum(['cortex_search', 'cortex_analyst_text_to_sql', 'sql_exec', 'data_to_chart']),
  arguments: z.record(z.unknown()),
  status: z.enum(['requested', 'in_progress', 'completed', 'failed'])
});

export const sourceReferenceSchema = z.object({
  id: z.string(),
  title: z.string(),
  snippet: z.string(),
  sourceUrl: z.string().url(),
  confidence: z.number().min(0).max(1).optional()
});

export const messageSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['system', 'user', 'assistant', 'tool']),
  content: z.string(),
  timestamp: z.string().datetime(),
  toolCalls: z.array(toolCallSchema).optional(),
  annotations: z.array(sourceReferenceSchema).optional()
});

export const streamTokenEventSchema = z.object({
  type: z.literal('token'),
  delta: z.string(),
  index: z.number().int().nonnegative()
});

export const streamToolCallEventSchema = z.object({
  type: z.literal('tool_call'),
  call: toolCallSchema
});

export const streamFinalEventSchema = z.object({
  type: z.literal('final'),
  message: messageSchema,
  sources: z.array(sourceReferenceSchema)
});

export const streamErrorEventSchema = z.object({
  type: z.literal('error'),
  code: z.string(),
  message: z.string()
});

export const streamEventSchema = z.discriminatedUnion('type', [
  streamTokenEventSchema,
  streamToolCallEventSchema,
  streamFinalEventSchema,
  streamErrorEventSchema
]);

export const chatRequestSchema = z.object({
  sessionId: z.string().uuid(),
  messages: z.array(messageSchema).min(1),
  tools: z.array(toolCallSchema).optional(),
  meta: z
    .object({
      traceId: z.string().uuid().optional()
    })
    .default({})
});

export const historyResponseSchema = z.object({
  messages: z.array(messageSchema),
  nextCursor: z.string().nullable()
});
