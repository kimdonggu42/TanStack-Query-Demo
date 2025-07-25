import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoginData } from '@/providers/AuthProvider';
import { useAuthActions } from '@/pages/lazy-days/auth/useAuthActions';

export default function Signin() {
  const [email, setEmail] = useState('test');
  const [password, setPassword] = useState('test');
  const [dirty, setDirty] = useState({ email: false, password: false });
  const auth = useAuthActions();
  const { userId } = useLoginData();

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      navigate(`/lazy-days/user/${userId}`);
    }
  }, [userId, navigate]);

  return (
    <>
      <Flex minH='84vh' textAlign='center' justify='center'>
        <Stack spacing={8} mx='auto' maxW='lg' py={12} px={6}>
          <Stack textAlign='center'>
            <Heading>Sign in to your account</Heading>
          </Stack>
          <Box rounded='lg' bg='white' boxShadow='lg' p={8}>
            <Stack spacing={4}>
              <FormControl id='email' isRequired isInvalid={!email && dirty.email}>
                <FormLabel>Email address</FormLabel>
                <Input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setDirty((prevDirty) => ({ ...prevDirty, email: true }))}
                />
                <FormErrorMessage>Email may not be blank</FormErrorMessage>
              </FormControl>
              <FormControl id='password' isRequired isInvalid={!password && dirty.password}>
                <FormLabel>Password</FormLabel>
                <Input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setDirty((prevDirty) => ({ ...prevDirty, password: true }))}
                />
                <FormErrorMessage>Password may not be blank</FormErrorMessage>
              </FormControl>
              <HStack spacing={2} width='100%'>
                <Button
                  variant='outline'
                  type='submit'
                  isDisabled={!email || !password}
                  onClick={() => auth.signup(email, password)}
                >
                  Sign up
                </Button>
                <Button
                  type='submit'
                  isDisabled={!email || !password}
                  onClick={() => auth.signin(email, password)}
                >
                  Sign in
                </Button>
              </HStack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
