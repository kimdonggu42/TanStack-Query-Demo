import { Icon, Stack, Text } from '@chakra-ui/react';
import { GiFlowerPot } from 'react-icons/gi';
import BackgroundImage from '@/pages/lazy-days/components/common/BackgroundImage';
import { usePrefetchTreatments } from '@/pages/lazy-days/components/treatments/hooks/useTreatments';

export default function Home() {
  usePrefetchTreatments();

  return (
    <Stack textAlign='center' justify='center' height='84vh'>
      <BackgroundImage />
      <Text textAlign='center' fontFamily='Forum, sans-serif' fontSize='6em'>
        <Icon m={4} verticalAlign='top' as={GiFlowerPot} />
        Lazy Days Spa
      </Text>
      <Text>Hours: limited</Text>
      <Text>Address: nearby</Text>
    </Stack>
  );
}
