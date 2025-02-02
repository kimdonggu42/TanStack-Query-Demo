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

// queryCache는 TanStack Query의 캐시 저장소로, 모든 쿼리의 상태(로딩, 성공, 실패 등)를 관리한다.
// https://tanstack.com/query/latest/docs/reference/QueryCache#querycache
export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => errorHandler(error.message),
  }),
});

// 1. useQuery 내부에서 error를 반환하는 방식
// 특징: 개별 쿼리에서 에러를 error 변수로 반환하여 특정 컴포넌트에서만 에러 메시지를 보여줄 수 있음
// 장점: 쿼리별로 에러를 개별적으로 처리할 수 있음
// 단점: 모든 컴포넌트에서 따로 에러 처리해야 하기 때문에 중복 코드 발생 가능

// 2. queryCache의 onError를 사용하여 전역으로 에러를 관리하는 방식
// 특징: 모든 useQuery에서 발생하는 에러를 queryCache의 onError에서 자동으로 처리하여 전역적으로 toast를 띄우거나, 공통적인 에러 로직을 실행할 수 있음
// 장점: 에러 핸들링 로직을 한 곳에서 관리 가능
// 단점: 특정 쿼리에서만 다른 방식으로 에러를 처리하고 싶다면 추가 설정이 필요함
