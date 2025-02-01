import axios, { AxiosResponse } from 'axios';
import { User } from '../../../../../shared/types';
import { useLoginData } from '@/providers/AuthProvider';
import { axiosInstance } from '@/pages/lazy-days/axiosInstance/index';
import { useCustomToast } from '@/pages/lazy-days/components/app/hooks/useCustomToast';
import { useUser } from '@/pages/lazy-days/components/user/hooks/useUser';

interface UseAuth {
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  signout: () => void;
}

type UserResponse = { user: User };
type ErrorResponse = { message: string };
type AuthResponseType = UserResponse | ErrorResponse;

export function useAuthActions(): UseAuth {
  const { updateUser, clearUser } = useUser();
  const { setLoginData, clearLoginData } = useLoginData();

  const SERVER_ERROR = 'There was an error contacting the server.';
  const toast = useCustomToast();

  async function authServerCall(
    urlEndpoint: string,
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const { data, status }: AxiosResponse<AuthResponseType> = await axiosInstance({
        url: urlEndpoint,
        method: 'POST',
        data: { email, password },
        headers: { 'Content-Type': 'application/json' },
      });

      if (status === 400) {
        const title = 'message' in data ? data.message : 'Unauthorized';
        toast({ title, status: 'warning' });
        return;
      }

      if ('user' in data && 'token' in data.user) {
        toast({
          title: `Logged in as ${data.user.email}`,
          status: 'info',
        });

        // update stored user data
        updateUser(data.user);
        setLoginData({ userId: data.user.id, userToken: data.user.token });
      }
    } catch (errorResponse) {
      const title =
        axios.isAxiosError(errorResponse) && errorResponse?.response?.data?.message
          ? errorResponse?.response?.data?.message
          : SERVER_ERROR;
      toast({
        title,
        status: 'error',
      });
    }
  }

  async function signin(email: string, password: string): Promise<void> {
    authServerCall('/signin', email, password);
  }
  async function signup(email: string, password: string): Promise<void> {
    authServerCall('/user', email, password);
  }

  function signout(): void {
    // clear user from stored user data
    clearUser();
    clearLoginData();
    toast({
      title: 'Logged out!',
      status: 'info',
    });
  }

  // Return the user object and auth methods
  return {
    signin,
    signup,
    signout,
  };
}
