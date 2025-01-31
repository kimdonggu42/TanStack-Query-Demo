import { Box, Stack, Text } from '@chakra-ui/react';
import { Appointment as AppointmentType } from '../../../../../../shared/types';
import Appointment from '@/pages/lazy-days/components/appointments/Appointment';

interface DateBoxProps {
  date: number;
  gridColumn?: number;
  appointments?: AppointmentType[];
}
DateBox.defaultProps = { gridColumn: null, appointments: [] };

export default function DateBox({ date, gridColumn, appointments = [] }: DateBoxProps) {
  return (
    <Box w='100%' h={20} bg='olive.50' gridColumnStart={gridColumn} boxShadow='md' rounded='md'>
      <Stack m={2} spacing={1}>
        <Text fontSize='xs' textAlign='right'>
          {date}
        </Text>
        {appointments.map((appointment) => (
          <Appointment key={appointment.id} appointmentData={appointment} />
        ))}
      </Stack>
    </Box>
  );
}
