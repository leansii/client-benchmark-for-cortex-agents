export interface ErrorResponse {
  error: string;
  code: string;
  traceId: string;
  details?: Record<string, unknown>;
  retryAfterSec?: number;
}
