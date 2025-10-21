<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useSessionStore } from './stores/session';
import ChatLayout from './components/ChatLayout.vue';
import SessionControls from './components/SessionControls.vue';
import StatusSummary from './components/StatusSummary.vue';
import ChatWindow from './components/ChatWindow.vue';
import StepGuide from './components/StepGuide.vue';
import ToolResultCard from './components/ToolResultCard.vue';
import DataTablePreview from './components/DataTablePreview.vue';
import SourcesPanel from './components/SourcesPanel.vue';

const sessionStore = useSessionStore();
const { sessionId } = storeToRefs(sessionStore);

const columns = ['Region', 'Revenue'];
const rows = [
  { Region: 'APAC', Revenue: 1_250_000 },
  { Region: 'EMEA', Revenue: 980_000 },
  { Region: 'Americas', Revenue: 1_420_000 }
];
const sources: Array<{ id: string; title: string; snippet: string; url: string }> = [];

function startSession() {
  sessionStore.createSession();
}

function resetSession() {
  sessionStore.clearSession();
}
</script>

<template>
  <div class="app-shell">
    <header>
      <h1>Vue Cortex Client</h1>
      <p>
        Benchmark shell for Snowflake Cortex Agent. Use the session controls below to simulate
        end-to-end flows while parity work progresses.
      </p>
    </header>
    <main>
      <ChatLayout>
        <template #controls>
          <SessionControls :session-id="sessionId" @start="startSession" @reset="resetSession" />
        </template>
        <template #summary>
          <StatusSummary :session-ready="Boolean(sessionId)" />
        </template>
        <template #timeline>
          <ChatWindow />
        </template>
        <template #side>
          <StepGuide />
          <ToolResultCard title="SQL Result" subtitle="sql_exec • Pending">
            <DataTablePreview :columns="columns" :rows="rows" />
          </ToolResultCard>
          <SourcesPanel :sources="sources" />
        </template>
      </ChatLayout>
    </main>
  </div>
</template>
