import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { toast } from '@/pages/lazy-days/components/app/toast';

const createTitle = (errorMsg: string, actionType: 'query' | 'mutation') => {
  const action = actionType === 'query' ? 'fetch' : 'update';
  const title = `could not ${action} data: ${errorMsg ?? 'error connecting to server'}`;
  return title;
};

const errorHandler = (title: string) => {
  const id = 'react-query-toast';

  if (!toast.isActive(id)) {
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
  mutationCache: new MutationCache({
    onError: (error) => {
      const title = createTitle(error.message, 'mutation');
      errorHandler(title);
    },
  }),
  queryCache: new QueryCache({
    onError: (error) => {
      const title = createTitle(error.message, 'query');
      errorHandler(title);
    },
  }),
});
