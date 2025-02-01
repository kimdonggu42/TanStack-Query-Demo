import { AxiosResponse } from 'axios';
import type { User } from '../../../../../../../shared/types';
import { useLoginData } from '@/providers/AuthProvider';
import { axiosInstance, getJWTHeader } from '@/pages/lazy-days/axiosInstance/index';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

// query function
// async function getUser(userId: number, userToken: string) {
//   const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(
//     `/user/${userId}`,
//     {
//       headers: getJWTHeader(userToken),
//     }
//   );

//   return data.user;
// }

export const useUser = () => {
  // TODO: call useQuery to update user data from server
  const user: User = null;

  // meant to be called from useAuth
  const updateUser = (newUser: User): void => {
    // TODO: update the user in the query cache
  };

  // meant to be called from useAuth
  const clearUser = () => {
    // TODO: reset user to null in query cache
  };

  return { user, updateUser, clearUser };
};
