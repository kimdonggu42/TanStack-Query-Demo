import { Link } from 'react-router';

const categories = [
  {
    path: 'blog-em',
  },
  {
    path: 'infinite-swapi',
  },
  {
    path: 'lazy-days',
  },
] as const;

export default function App() {
  return (
    <nav className='flex h-screen flex-col items-center justify-center'>
      <ul className='flex flex-col items-center gap-y-5'>
        {categories.map((category, index) => (
          <li key={index}>
            <Link to={`/${category.path}`}>
              <button className='inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-slate-200 bg-white px-4 py-2 text-sm font-medium ring-offset-white hover:bg-slate-100 hover:text-slate-900'>
                {category.path}
              </button>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
