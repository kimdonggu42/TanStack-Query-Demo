import jsonpatch from 'fast-json-patch';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { User } from '../../../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '@/pages/lazy-days/axiosInstance/instance';
import { useUser } from '@/pages/lazy-days/components/user/hooks/useUser';
import { toast } from '../../app/toast';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

export const MUTATION_KEY = 'patch-user';

const patchUserOnServer = async (
  newData: User | null,
  originalData: User | undefined,
): Promise<User> => {
  if (!newData || !originalData) {
    throw new Error('Invalid user data');
  }

  const patch = jsonpatch.compare(originalData, newData);

  const { data } = await axiosInstance.patch(
    `/user/${originalData.id}`,
    { patch },
    {
      headers: getJWTHeader(originalData.token),
    },
  );
  return data.user;
};

export const usePatchUser = () => {
  const { user, updateUser } = useUser();
  const queryClient = useQueryClient();

  const { mutate: patchUser } = useMutation({
    mutationKey: [MUTATION_KEY],
    mutationFn: (newData: User) => patchUserOnServer(newData, user),
    onSuccess: () => {
      toast({ title: 'user updated!', status: 'success' });
    },
    // onSettled는 실행되면 성공, 오류 상관없이 실행된다.
    onSettled: () => {
      return queryClient.invalidateQueries({ queryKey: [queryKeys.user] });
    },
  });

  return patchUser;
};
