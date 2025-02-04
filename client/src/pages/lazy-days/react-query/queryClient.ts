import { QueryClient, QueryCache } from '@tanstack/react-query';
import { toast } from '@/pages/lazy-days/components/app/toast';

const errorHandler = (errorMsg: string) => {
  const id = 'react-query-toast';

  if (!toast.isActive(id)) {
    const action = 'fetch';
    const title = `could not ${action} data: ${errorMsg ?? 'error connecting to server'}`;
    toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
  }
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 10,
      gcTime: 1000 * 60 * 15,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => errorHandler(error.message),
  }),
});
