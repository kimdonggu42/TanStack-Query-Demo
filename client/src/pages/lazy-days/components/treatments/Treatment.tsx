import { Text } from '@chakra-ui/react';
import type { Treatment as TreatmentType } from '../../../../../../shared/types';
import Card from '@/pages/lazy-days/components/common/Card';

interface TreatmentProps {
  treatmentData: TreatmentType;
}
export default function Treatment({ treatmentData }: TreatmentProps) {
  const cardContents = <Text>{treatmentData.description}</Text>;

  return (
    <Card itemName={treatmentData.name} image={treatmentData.image} cardContents={cardContents} />
  );
}
