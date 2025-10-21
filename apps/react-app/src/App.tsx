import { useMemo } from 'react';
import { useSessionStore } from './state/sessionStore';
import {
  ChatLayout,
  SessionControls,
  StatusSummary,
  ChatWindow,
  StepGuide,
  ToolResultCard,
  DataTablePreview,
  SourcesPanel
} from './components';

export function App() {
  const { sessionId, createSession, clearSession } = useSessionStore();
  const columns = ['Region', 'Revenue'];
  const rows = useMemo(
    () => [
      { Region: 'APAC', Revenue: 1_250_000 },
      { Region: 'EMEA', Revenue: 980_000 },
      { Region: 'Americas', Revenue: 1_420_000 }
    ],
    []
  );
  const sources = useMemo(() => [] as Array<{ id: string; title: string; snippet: string; url: string }>, []);

  return (
    <div className="app-shell">
      <header>
        <h1>React Cortex Client</h1>
        <p>
          Benchmark shell for Snowflake Cortex Agent. Use the session controls below to simulate end-to-end flows while
          parity work progresses.
        </p>
      </header>
      <main>
        <ChatLayout
          sessionControls={<SessionControls sessionId={sessionId} onStart={createSession} onReset={clearSession} />}
          statusSummary={<StatusSummary sessionReady={Boolean(sessionId)} />}
          timeline={<ChatWindow />}
          sidePanel={
            <>
              <StepGuide />
              <ToolResultCard title="SQL Result" subtitle="sql_exec • Pending">
                <DataTablePreview columns={columns} rows={rows} />
              </ToolResultCard>
              <SourcesPanel sources={sources} />
            </>
          }
        />
      </main>
    </div>
  );
}

export default App;
