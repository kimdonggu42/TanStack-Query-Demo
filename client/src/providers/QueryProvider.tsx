import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '@/pages/lazy-days/react-query/queryClient';

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* devtool은 QueryClientProvider 내부에만 위치해 있으면 위치는 상관없다 */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};
