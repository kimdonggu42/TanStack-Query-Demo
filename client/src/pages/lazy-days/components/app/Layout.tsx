import { ChakraProvider } from '@chakra-ui/react';
import { Outlet } from 'react-router-dom';
import Loading from '@/pages/lazy-days/components/app/Loading';
import Navbar from '@/pages/lazy-days/components/app/Navbar';
import { ToastContainer } from '@/pages/lazy-days/components/app/toast';
import { AuthProvider } from '@/providers/AuthProvider';
import { theme } from '@/pages/lazy-days/theme/index';
import { QueryProvider } from '@/providers/QueryProvider';

export default function Layout() {
  return (
    <ChakraProvider theme={theme}>
      <QueryProvider>
        <AuthProvider>
          <Loading />
          <Navbar />
          <Outlet />
          <ToastContainer />
        </AuthProvider>
      </QueryProvider>
    </ChakraProvider>
  );
}
