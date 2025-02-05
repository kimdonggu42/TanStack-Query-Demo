import { createContext, useContext, useState } from 'react';
import {
  clearStoredLoginData,
  getStoredLoginData,
  setStoredLoginData,
} from '@/pages/lazy-days/auth/local-storage';
import { LoginData } from '@/pages/lazy-days/auth/types';

type AuthContextValue = {
  userId: number | null;
  userToken: string | null;
  setLoginData: (loginData: LoginData) => void;
  clearLoginData: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLoginData = () => {
  const authValue = useContext(AuthContext);
  if (!authValue) {
    throw new Error('Error! AuthContext called from outside the AuthContextProvider');
  }

  return authValue;
};

export const AuthProvider = ({ children }: React.PropsWithChildren<object>) => {
  const [loginData, setLoginDataRaw] = useState<LoginData | null>(() => getStoredLoginData());

  const userId = loginData?.userId ?? null;
  const userToken = loginData?.userToken ?? null;

  const setLoginData = ({ userId, userToken }: LoginData) => {
    setLoginDataRaw({ userId, userToken });
    setStoredLoginData({ userId, userToken });
  };

  const clearLoginData = () => {
    setLoginDataRaw(null);
    clearStoredLoginData();
  };

  return (
    <AuthContext.Provider value={{ userId, userToken, clearLoginData, setLoginData }}>
      {children}
    </AuthContext.Provider>
  );
};
