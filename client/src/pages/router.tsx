import { createBrowserRouter } from 'react-router-dom';

import App from '@/App';
import BlogEm from '@/pages/blog-em/page';
import InfiniteSwapi from '@/pages/infinite-swapi/page';
import Layout from '@/pages/lazy-days/components/app/Layout';
import Home from '@/pages/lazy-days/components/app/Home';
import Calendar from '@/pages/lazy-days/components/appointments/Calendar';
import AllStaff from '@/pages/lazy-days/components/staff/AllStaff';
import Treatments from '@/pages/lazy-days/components/treatments/Treatments';
import Signin from '@/pages/lazy-days/components/user/Signin';
import UserProfile from '@/pages/lazy-days/components/user/UserProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/blog-em',
    element: <BlogEm />,
  },
  {
    path: '/infinite-swapi',
    element: <InfiniteSwapi />,
  },
  {
    path: '/lazy-days',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />,
      },
      {
        path: 'staff',
        element: <AllStaff />,
      },
      {
        path: 'calendar',
        element: <Calendar />,
      },
      {
        path: 'treatments',
        element: <Treatments />,
      },
      {
        path: 'signin',
        element: <Signin />,
      },
      {
        path: 'user/:id',
        element: <UserProfile />,
      },
    ],
  },
]);
