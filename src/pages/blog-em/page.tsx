import Posts from '@/pages/blog-em/Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function BlogEm() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='m-6 flex flex-col gap-y-5 text-lg'>
        <h1 className='text-2xl font-bold'>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
      {/* devtool은 QueryClientProvider 내부에만 위치해 있으면 위치는 상관없다 */}
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
