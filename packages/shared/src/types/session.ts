export interface SessionContext {
  sessionId: string;
  clientVersion: string;
  createdAt: string;
}

export interface TokenResponse {
  token: string;
  expiresInSec: number;
}
