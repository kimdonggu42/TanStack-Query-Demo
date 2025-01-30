import { useInfiniteQuery } from '@tanstack/react-query';
import Person from '@/pages/infinite-swapi/people/Person';

const initialUrl = 'https://swapi.py4e.com/api/people/';
const fetchUrl = async ({ pageParam }: { pageParam: string }) => {
  const response = await fetch(pageParam);
  return response.json();
};

export default function InfinitePeople() {
  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['sw-people'],
    queryFn: fetchUrl,
    // useInfiniteQuery를 처음 실행할 땐 pageParam이 설정되어 있지 않으므로 기본 값 initialUrl을 지정해준다.
    initialPageParam: initialUrl,
    getNextPageParam: (lastPage) => lastPage.next || undefined,
  });

  return <></>;
}
