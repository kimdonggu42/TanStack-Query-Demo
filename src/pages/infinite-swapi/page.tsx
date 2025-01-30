import QueryProvider from '@/providers/QueryProvider';
import InfinitePeople from '@/pages/infinite-swapi/people/InfinitePeople';
import InfiniteSpecies from '@/pages/infinite-swapi/species/InfiniteSpecies';

export default function InfiniteSwapi() {
  return (
    <QueryProvider>
      <div className='App'>
        <h1>Infinite SWAPI</h1>
        <InfinitePeople />
        {/* <InfiniteSpecies /> */}
      </div>
    </QueryProvider>
  );
}
