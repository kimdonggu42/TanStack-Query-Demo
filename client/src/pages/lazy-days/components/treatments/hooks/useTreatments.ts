import type { Treatment } from '../../../../../../../shared/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

const getTreatments = async (): Promise<Treatment[]> => {
  const { data } = await axiosInstance.get('/treatments');
  return data;
};

export const useTreatments = (): Treatment[] => {
  const fallback: Treatment[] = [];

  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data;
};

// useQuery는 데이터를 가져오고, staleTime이 지나면 자동으로 리페칭을 할 수 있지만,
// prefetchQuery는 데이터를 가져와서 캐시에 저장하는 일회성 작업으로, 이후 자동으로 리페칭이 발생하지 않는다.
// 즉, 프리페칭을 하면 데이터를 미리 캐시에 저장할 수 있지만, useQuery처럼 상태를 지속적으로 모니터링하지 않는다.
export const usePrefetchTreatments = (): void => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 15,
  });
};
