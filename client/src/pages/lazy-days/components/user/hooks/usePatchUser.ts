import jsonpatch from 'fast-json-patch';
import type { User } from '../../../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '@/pages/lazy-days/axiosInstance/index';
import { useUser } from '@/pages/lazy-days/components/user/hooks/useUser';

// for when we need a server function
// async function patchUserOnServer(
//   newData: User | null,
//   originalData: User | null,
//  ): Promise<User | null> {
//   if (!newData || !originalData) return null;
//   // create a patch for the difference between newData and originalData
//   const patch = jsonpatch.compare(originalData, newData);

//   // send patched data to the server
//   const { data } = await axiosInstance.patch(
//     `/user/${originalData.id}`,
//     { patch },
//     {
//       headers: getJWTHeader(originalData.token),
//     },
//   );
//   return data.user;
//  }

export const usePatchUser = () => {
  const { user, updateUser } = useUser();

  // TODO: replace with mutate function
  const patchUser = (newData: User | null) => {
    // nothing to see here
  };

  return patchUser;
};
