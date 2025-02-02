import type { Treatment } from '../../../../../../../shared/types';
import { useQuery } from '@tanstack/react-query';
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
  });

  return data;
};
