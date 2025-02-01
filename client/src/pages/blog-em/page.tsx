import { QueryProvider } from '@/providers/QueryProvider';
import Posts from '@/pages/blog-em/Posts';

export default function BlogEm() {
  return (
    <QueryProvider>
      <div className='m-6 flex flex-col gap-y-5 text-lg'>
        <h1 className='text-2xl font-bold'>Blog &apos;em Ipsum</h1>
        <Posts />
      </div>
    </QueryProvider>
  );
}
