import type { Appointment } from '../../../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '@/pages/lazy-days/axiosInstance/index';
import { useLoginData } from '@/pages/lazy-days/auth/AuthContext';

// for when we need a query function for useQuery
// async function getUserAppointments(
//   userId: number,
//   userToken: string
// ): Promise<Appointment[] | null> {
//   const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
//     headers: getJWTHeader(userToken),
//   });
//   return data.appointments;
// }

export const useUserAppointments = (): Appointment[] => {
  // TODO replace with React Query
  return [];
};
