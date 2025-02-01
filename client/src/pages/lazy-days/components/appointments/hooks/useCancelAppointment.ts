import { Appointment } from '../../../../../../../shared/types';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { useCustomToast } from '@/pages/lazy-days/components/app/hooks/useCustomToast';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';
// for when server call is needed
// async function removeAppointmentUser(appointment: Appointment): Promise<void> {
//   const patchData = [{ op: 'remove', path: '/userId' }];
//   await axiosInstance.patch(`/appointment/${appointment.id}`, {
//     data: patchData,
//   });
// }

export const useCancelAppointment = () => {
  const toast = useCustomToast();

  // TODO: replace with mutate function
  return (appointment: Appointment) => {
    // nothing to see here
  };
};
