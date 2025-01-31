import { useState } from 'react';
import type { Staff } from '../../../../../../../shared/types';
import { filterByTreatment } from '@/pages/lazy-days/components/staff/utils';
import { axiosInstance } from '@/axiosInstance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

// query function for useQuery
// async function getStaff(): Promise<Staff[]> {
//   const { data } = await axiosInstance.get('/staff');
//   return data;
// }

export const useStaff = () => {
  // for filtering staff by treatment
  const [filter, setFilter] = useState('all');

  // TODO: get data from server via useQuery
  const staff: Staff[] = [];

  return { staff, filter, setFilter };
};
