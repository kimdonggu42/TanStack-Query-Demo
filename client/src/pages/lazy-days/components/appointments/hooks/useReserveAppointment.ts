import { Appointment } from '../../../../../../../shared/types';
import { useLoginData } from '@/pages/lazy-days/auth/AuthContext';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/index';
import { useCustomToast } from '@/pages/lazy-days/components/app/hooks/useCustomToast';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

// for when we need functions for useMutation
// async function setAppointmentUser(
//   appointment: Appointment,
//   userId: number | undefined,
// ): Promise<void> {
//   if (!userId) return;
//   const patchOp = appointment.userId ? 'replace' : 'add';
//   const patchData = [{ op: patchOp, path: '/userId', value: userId }];
//   await axiosInstance.patch(`/appointment/${appointment.id}`, {
//     data: patchData,
//   });
// }

export function useReserveAppointment() {
  const { userId } = useLoginData();

  const toast = useCustomToast();

  // TODO: replace with mutate function
  return (appointment: Appointment) => {
    // nothing to see here
  };
}
