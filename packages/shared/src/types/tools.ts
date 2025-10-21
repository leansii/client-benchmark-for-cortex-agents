export interface CortexSearchRequest {
  query: string;
  filters?: Record<string, unknown>;
  topK?: number;
}

export interface CortexSearchResult {
  title: string;
  snippet: string;
  sourceUrl: string;
  confidence?: number;
}

export interface CortexSearchResponse {
  results: CortexSearchResult[];
  latencyMs?: number;
}

export interface CortexAnalystRequest {
  question: string;
  schemaContext?: Array<Record<string, unknown>>;
}

export interface CortexAnalystResponse {
  sql: string;
  confidence?: number;
  explanations?: string[];
}

export interface SqlExecRequest {
  sql: string;
  sessionId: string;
  limit?: number;
}

export interface ColumnMeta {
  name: string;
  type: string;
}

export interface SqlExecResponse {
  columns: ColumnMeta[];
  rows: Array<unknown[]>;
  rowCount: number;
  latencyMs?: number;
}

export type ChartType = 'bar' | 'line' | 'table';

export interface DataToChartRequest {
  data: Record<string, unknown>;
  chartType: ChartType;
  options?: Record<string, unknown>;
}

export interface DataToChartResponse {
  chartSpec: Record<string, unknown>;
  insights?: string[];
  warnings?: string[];
}

export type ToolRequest =
  | CortexSearchRequest
  | CortexAnalystRequest
  | SqlExecRequest
  | DataToChartRequest;

export type ToolResponse =
  | CortexSearchResponse
  | CortexAnalystResponse
  | SqlExecResponse
  | DataToChartResponse;
