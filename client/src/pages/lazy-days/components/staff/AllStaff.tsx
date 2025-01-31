import { Box, Heading, HStack, Radio, RadioGroup } from '@chakra-ui/react';
import { useTreatments } from '@/pages/lazy-days/components/treatments/hooks/useTreatments';
import { useStaff } from '@/pages/lazy-days/components/staff/hooks/useStaff';
import Staff from '@/pages/lazy-days/components/staff/Staff';

export default function AllStaff() {
  // replace with data from React Query
  const { staff, filter, setFilter } = useStaff();
  const treatments = useTreatments();

  return (
    <Box>
      <Heading mt={10} textAlign='center'>
        Our Staff
      </Heading>
      <HStack m={10} spacing={8} justify='center'>
        {staff.map((staffData) => (
          <Staff key={staffData.id} staffData={staffData} />
        ))}
      </HStack>
      <RadioGroup onChange={setFilter} value={filter}>
        <HStack my={10} spacing={8} justify='center'>
          <Heading size='md'>Filter by treatment:</Heading>
          <Radio value='all'>All</Radio>
          {treatments.map((t) => (
            <Radio key={t.id} value={t.name}>
              {t.name}
            </Radio>
          ))}
        </HStack>
      </RadioGroup>
    </Box>
  );
}
