import { createBrowserRouter } from 'react-router';

import App from '@/App';
import BlogEm from '@/pages/blog-em/Page';
import InfiniteSwapi from '@/pages/infinite-swapi/page';
import LazyDays from '@/pages/lazy-days/page';

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
    element: <LazyDays />,
  },
]);
