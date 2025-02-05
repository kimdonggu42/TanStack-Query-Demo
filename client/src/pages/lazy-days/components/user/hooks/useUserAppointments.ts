import { useQuery } from '@tanstack/react-query';
import type { Appointment } from '../../../../../../../shared/types';
import { axiosInstance, getJWTHeader } from '@/pages/lazy-days/axiosInstance/instance';
import { useLoginData } from '@/providers/AuthProvider';
import { generateUserAppointmentsKey } from '@/pages/lazy-days/react-query/key-factories';

const getUserAppointments = async (
  userId: number | null,
  userToken: string | null,
): Promise<Appointment[] | null> => {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
};

export const useUserAppointments = (): Appointment[] => {
  const { userId, userToken } = useLoginData();

  const fallback: Appointment[] = [];
  const { data: userAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateUserAppointmentsKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });

  return userAppointments ?? [];
};
