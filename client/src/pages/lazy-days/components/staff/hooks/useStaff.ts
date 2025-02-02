import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import type { Staff } from '../../../../../../../shared/types';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

const getStaff = async (): Promise<Staff[]> => {
  const { data } = await axiosInstance.get('/staff');
  return data;
};

export const useStaff = () => {
  const [filter, setFilter] = useState('all');
  const fallback: Staff[] = [];

  const { data: staff = fallback } = useQuery({
    queryKey: [queryKeys.staff],
    queryFn: getStaff,
  });

  return { staff, filter, setFilter };
};
