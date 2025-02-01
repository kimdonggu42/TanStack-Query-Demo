import { QueryProvider } from '@/providers/QueryProvider';
import InfinitePeople from '@/pages/infinite-swapi/InfinitePeople';

export default function InfiniteSwapi() {
  return (
    <QueryProvider>
      <div className='m-6 flex h-screen flex-col gap-y-5 text-lg'>
        <h1 className='text-2xl font-bold'>Infinite SWAPI</h1>
        <InfinitePeople />
      </div>
    </QueryProvider>
  );
}
