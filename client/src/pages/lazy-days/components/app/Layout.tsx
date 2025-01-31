import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Loading from '@/pages/lazy-days/components/app/Loading';
import Navbar from '@/pages/lazy-days/components/app/Navbar';
import { ToastContainer } from '@/pages/lazy-days/components/app/toast';
import { AuthContextProvider } from '@/pages/lazy-days/auth/AuthContext';
import { theme } from '@/pages/lazy-days/theme/index';

export default function Layout() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Loading />
        <Navbar />
        <Outlet />
        <ToastContainer />
      </AuthContextProvider>
    </ChakraProvider>
  );
}
