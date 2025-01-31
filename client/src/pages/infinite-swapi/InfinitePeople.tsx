import { useInfiniteQuery } from '@tanstack/react-query';
import Person from '@/pages/infinite-swapi/Person';
import { useIntersectionObserver } from '@/pages/infinite-swapi/useIntersectionObserver';

interface SWPerson {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  films: string[];
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}

const initialUrl = 'https://swapi.py4e.com/api/people';

// fetchUrl 함수는 pageParam을 인수로 받아 해당 URL에서 데이터를 가져온다.
// pageParam은 페이지 번호나 URL을 포함하는 매개변수로, 데이터를 요청할 때 URL을 동적으로 생성하는 데 사용된다.
const fetchUrl = async ({ pageParam }: { pageParam: string }) => {
  const response = await fetch(pageParam);
  return response.json();
};

export default function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage, isFetching, status, error } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: fetchUrl,
    // initialPageParam은 useInfiniteQuery가 처음 실행될 때 사용할 기본 pageParam 값을 설정한다.
    initialPageParam: initialUrl,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  const loadMoreRef = useIntersectionObserver(() => {
    if (!isFetching) fetchNextPage();
  });

  return (
    <>
      {status === 'pending' ? (
        <p>Loading...</p>
      ) : status === 'error' ? (
        <p>Error: {error.message}</p>
      ) : (
        <ul className='flex flex-col gap-y-5'>
          {data.pages.map((pageData) =>
            pageData.results.map((person: SWPerson) => (
              <Person
                key={person.name}
                name={person.name}
                hairColor={person.hair_color}
                eyeColor={person.eye_color}
              />
            )),
          )}
          {hasNextPage && (
            <div className='h-10 text-lg font-semibold text-blue-500' ref={loadMoreRef}>
              Loading more...
            </div>
          )}
        </ul>
      )}
    </>
  );
}
