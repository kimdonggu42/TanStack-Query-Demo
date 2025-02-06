import { Appointment } from '../../../../../../../shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLoginData } from '@/providers/AuthProvider';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { useCustomToast } from '@/pages/lazy-days/components/app/hooks/useCustomToast';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

const setAppointmentUser = async (
  appointment: Appointment,
  userId: number | null,
): Promise<void> => {
  if (!userId) return;
  const patchOp = appointment.userId ? 'replace' : 'add';
  const patchData = [{ op: patchOp, path: '/userId', value: userId }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
};

export function useReserveAppointment() {
  const queryClient = useQueryClient();
  const { userId } = useLoginData();

  const toast = useCustomToast();

  const { mutate } = useMutation({
    mutationFn: (appointment: Appointment) => setAppointmentUser(appointment, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({ title: 'You have reserved an appointment!', status: 'success' });
    },
  });

  return mutate;
}
