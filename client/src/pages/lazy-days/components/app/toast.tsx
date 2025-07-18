import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '@/pages/lazy-days/theme/index';

const { toast, ToastContainer } = createStandaloneToast({ theme });

// eslint-disable-next-line react-refresh/only-export-components
export { toast, ToastContainer };
