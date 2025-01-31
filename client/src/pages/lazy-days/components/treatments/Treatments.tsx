import { Box, Heading, HStack } from '@chakra-ui/react';
import { useTreatments } from '@/pages/lazy-days/components/treatments/hooks/useTreatments';
import Treatment from '@/pages/lazy-days/components/treatments/Treatment';

export default function Treatments() {
  // replace with data from React Query
  const treatments = useTreatments();

  return (
    <Box>
      <Heading mt={10} textAlign='center'>
        Available Treatments
      </Heading>
      <HStack m={10} spacing={8} justify='center'>
        {treatments.map((treatmentData) => (
          <Treatment key={treatmentData.id} treatmentData={treatmentData} />
        ))}
      </HStack>
    </Box>
  );
}
