import { z } from 'zod';

export const errorResponseSchema = z.object({
  error: z.string(),
  code: z.string(),
  traceId: z.string().uuid(),
  details: z.record(z.unknown()).optional(),
  retryAfterSec: z.number().int().positive().optional()
});
