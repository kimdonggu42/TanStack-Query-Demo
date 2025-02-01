import type { Treatment } from '../../../../../../../shared/types';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

// for when we need a query function for useQuery
// async function getTreatments(): Promise<Treatment[]> {
//   const { data } = await axiosInstance.get('/treatments');
//   return data;
// }

export const useTreatments = (): Treatment[] => {
  // TODO: get data from server via useQuery
  return [];
};
