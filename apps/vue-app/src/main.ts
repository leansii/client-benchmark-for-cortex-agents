import { createApp } from 'vue';
import { VueQueryPlugin, VueQueryPluginOptions, QueryClient } from '@tanstack/vue-query';
import { createPinia } from 'pinia';
import App from './App.vue';
import './assets/theme.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 30_000,
      gcTime: 5 * 60_000
    }
  }
});

const vueQueryPluginOptions: VueQueryPluginOptions = {
  queryClient
};

createApp(App).use(createPinia()).use(VueQueryPlugin, vueQueryPluginOptions).mount('#app');
