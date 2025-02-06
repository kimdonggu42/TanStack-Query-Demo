import { Appointment } from '../../../../../../../shared/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/instance';
import { useCustomToast } from '@/pages/lazy-days/components/app/hooks/useCustomToast';
import { queryKeys } from '@/pages/lazy-days/react-query/constants';

const removeAppointmentUser = async (appointment: Appointment): Promise<void> => {
  const patchData = [{ op: 'remove', path: '/userId' }];
  await axiosInstance.patch(`/appointment/${appointment.id}`, {
    data: patchData,
  });
};

export const useCancelAppointment = () => {
  const queryClient = useQueryClient();
  const toast = useCustomToast();

  const { mutate } = useMutation({
    // Tanstack Query는 mutationFn을 실행하면서 mutate에 전달된 첫 번째 인자(appointment)를 mutationFn의 인자로 자동 전달한다.
    mutationFn: removeAppointmentUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKeys.appointments] });
      toast({ title: 'You have canceled an appointment!', status: 'warning' });
    },
  });

  return mutate;
};
