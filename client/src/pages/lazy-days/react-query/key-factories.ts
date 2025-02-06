import { queryKeys } from '@/pages/lazy-days/react-query/constants';

export const generateUserKey = (userId: number | null, userToken: string | null | undefined) => {
  return userId && userToken ? [queryKeys.user, userId] : [];
};

export const generateUserAppointmentsKey = (userId: number | null, userToken: string | null) => {
  return userId && userToken ? [queryKeys.appointments, queryKeys.user, userId, userToken] : [];
};
