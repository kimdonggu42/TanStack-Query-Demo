import { Spinner, Text } from '@chakra-ui/react';
import { useIsFetching } from '@tanstack/react-query';

export default function Loading() {
  // useIsFetching 훅은 기본적으로 앱 내에서 실행 중인 모든 쿼리를 감지하며, 현재 fetching 중인 쿼리 개수를 반환한다.
  // queryKey를 지정하면 특정 데이터 요청만 감지 가능하다.
  const isFetching = useIsFetching();
  const display = isFetching ? 'inherit' : 'none';

  return (
    <Spinner
      thickness='4px'
      speed='0.65s'
      emptyColor='olive.200'
      color='olive.800'
      role='status'
      position='fixed'
      zIndex='9999'
      top='50%'
      left='50%'
      transform='translate(-50%, -50%)'
      display={display}
    >
      <Text display='none'>Loading...</Text>
    </Spinner>
  );
}
