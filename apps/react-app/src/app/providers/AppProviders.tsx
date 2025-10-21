import { ReactNode, useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  defaultShouldDehydrateQuery
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { App } from '../../App';

type AppProvidersProps = {
  children?: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 2,
            staleTime: 30_000,
            gcTime: 5 * 60_000
          },
          dehydrate: {
            shouldDehydrateQuery: defaultShouldDehydrateQuery
          }
        }
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      {children}
    </QueryClientProvider>
  );
}
