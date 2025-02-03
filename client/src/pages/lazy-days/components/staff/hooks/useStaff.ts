import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import type { Staff } from '../../../../../../../shared/types';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';
import { filterByTreatment } from '../utils';

const getStaff = async (): Promise<Staff[]> => {
  const { data } = await axiosInstance.get('/staff');
  return data;
};

export const useStaff = () => {
  const [filter, setFilter] = useState('all');

  const selectFn = useCallback(
    (unfilteredStaff: Staff[]) => {
      if (filter === 'all') return unfilteredStaff;
      return filterByTreatment(unfilteredStaff, filter);
    },
    [filter],
  );

  const fallback: Staff[] = [];

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
    select: selectFn,
  });

  return { staff, filter, setFilter };
};
