import { z } from 'zod';

export const cortexSearchRequestSchema = z.object({
  query: z.string().min(1).max(512),
  filters: z.record(z.unknown()).optional(),
  topK: z.number().int().min(1).max(10).optional()
});

export const cortexSearchResultSchema = z.object({
  title: z.string(),
  snippet: z.string(),
  sourceUrl: z.string().url(),
  confidence: z.number().min(0).max(1).optional()
});

export const cortexSearchResponseSchema = z.object({
  results: z.array(cortexSearchResultSchema).min(1).max(10),
  latencyMs: z.number().int().nonnegative().optional()
});

export const cortexAnalystRequestSchema = z.object({
  question: z.string().min(1).max(512),
  schemaContext: z.array(z.record(z.unknown())).max(20).optional()
});

export const cortexAnalystResponseSchema = z.object({
  sql: z.string(),
  confidence: z.number().min(0).max(1).optional(),
  explanations: z.array(z.string()).optional()
});

export const sqlExecRequestSchema = z.object({
  sql: z.string(),
  sessionId: z.string().uuid(),
  limit: z.number().int().min(1).max(500).optional()
});

export const columnMetaSchema = z.object({
  name: z.string(),
  type: z.string()
});

export const sqlExecResponseSchema = z.object({
  columns: z.array(columnMetaSchema),
  rows: z.array(z.array(z.unknown())),
  rowCount: z.number().int().nonnegative(),
  latencyMs: z.number().int().nonnegative().optional()
});

export const dataToChartRequestSchema = z.object({
  data: z.record(z.unknown()),
  chartType: z.enum(['bar', 'line', 'table']),
  options: z.record(z.unknown()).optional()
});

export const dataToChartResponseSchema = z.object({
  chartSpec: z.record(z.unknown()),
  insights: z.array(z.string()).optional(),
  warnings: z.array(z.string()).optional()
});

export const toolRequestSchema = z.union([
  cortexSearchRequestSchema,
  cortexAnalystRequestSchema,
  sqlExecRequestSchema,
  dataToChartRequestSchema
]);

export const toolResponseSchema = z.union([
  cortexSearchResponseSchema,
  cortexAnalystResponseSchema,
  sqlExecResponseSchema,
  dataToChartResponseSchema
]);
