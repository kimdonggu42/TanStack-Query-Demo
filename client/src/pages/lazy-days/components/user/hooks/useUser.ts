import { AxiosResponse } from 'axios';
import type { User } from '../../../../../../../shared/types';
import { useLoginData } from '@/providers/AuthProvider';
import { axiosInstance, getJWTHeader } from '@/pages/lazy-days/axiosInstance/instance';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { generateUserKey } from '@/pages/lazy-days/react-query/key-factories';

const getUser = async (userId: number | null, userToken: string | null) => {
  const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(`/user/${userId}`, {
    headers: getJWTHeader(userToken),
  });

  return data.user;
};

export const useUser = () => {
  const queryClient = useQueryClient();

  const { userId, userToken } = useLoginData();

  const { data: user } = useQuery({
    enabled: !!userId,
    queryKey: generateUserKey(userId, userToken),
    queryFn: () => getUser(userId, userToken),
    staleTime: Infinity,
  });

  const updateUser = (newUser: User): void => {
    queryClient.setQueryData(generateUserKey(newUser.id, newUser.token), newUser);
  };

  const clearUser = () => {
    queryClient.removeQueries({ queryKey: [queryKeys.user] });

    queryClient.removeQueries({ queryKey: [queryKeys.appointments, queryKeys.user] });
  };

  return { user, updateUser, clearUser };
};
