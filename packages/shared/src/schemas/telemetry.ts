import { z } from 'zod';

export const telemetryEventSchema = z.object({
  runId: z.string().uuid(),
  client: z.enum(['react', 'vue']),
  metric: z.string(),
  value: z.number(),
  timestamp: z.string().datetime()
});
