import { Box, Button, Flex, FormControl, FormLabel, Heading, Input, Stack } from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePatchUser, MUTATION_KEY } from '@/pages/lazy-days/components/user/hooks/usePatchUser';
import { useUser } from '@/pages/lazy-days/components/user/hooks/useUser';
import UserAppointments from '@/pages/lazy-days/components/user/UserAppointments';
import { useLoginData } from '@/providers/AuthProvider';
import { useMutationState } from '@tanstack/react-query';
import type { User } from '../../../../../../shared/types';

interface FormValues {
  name: string;
  address: string;
  phone: string;
}

export default function UserProfile() {
  const { userId } = useLoginData();
  const { user } = useUser();
  const patchUser = usePatchUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) navigate('/lazy-days/signin');
  }, [userId, navigate]);

  const pendingData = useMutationState({
    filters: { mutationKey: [MUTATION_KEY], status: 'pending' },
    select: (mutation) => {
      return mutation.state.variables as User;
    },
  });

  const pendingUser = pendingData ? pendingData[0] : null;

  const formElements = ['name', 'address', 'phone'];

  return (
    <Flex minH='84vh' textAlign='center' justify='center'>
      <Stack spacing={8} mx='auto' w='xl' py={12} px={6}>
        <UserAppointments />
        <Stack textAlign='center'>
          <Heading>Information for {pendingUser ? pendingUser.name : user?.name}</Heading>
        </Stack>
        <Box rounded='lg' bg='white' boxShadow='lg' p={8}>
          <Formik
            enableReinitialize
            initialValues={{
              name: user?.name ?? '',
              address: user?.address ?? '',
              phone: user?.phone ?? '',
            }}
            onSubmit={(values: FormValues) => {
              if (!user) return;
              patchUser({ ...user, ...values });
            }}
          >
            <Form>
              {formElements.map((element) => (
                <FormControl key={element} id={element}>
                  <FormLabel>{element}</FormLabel>
                  <Field name={element} as={Input} />
                </FormControl>
              ))}
              <Button mt={6} type='submit'>
                Update
              </Button>
            </Form>
          </Formik>
        </Box>
      </Stack>
    </Flex>
  );
}
