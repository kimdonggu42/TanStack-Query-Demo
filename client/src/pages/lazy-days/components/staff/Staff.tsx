import { Text } from '@chakra-ui/react';
import type { Staff as StaffType } from '../../../../../../shared/types';
import Card from '@/pages/lazy-days/components/common/Card';

interface StaffProps {
  staffData: StaffType;
}
export default function Staff({ staffData }: StaffProps) {
  const cardContents = <Text textAlign='center'>{staffData.treatmentNames.join(', ')}</Text>;

  return <Card itemName={staffData.name} image={staffData.image} cardContents={cardContents} />;
}
