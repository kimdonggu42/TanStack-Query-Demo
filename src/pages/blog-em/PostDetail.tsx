import { fetchComments } from '@/pages/blog-em/api';
import { useQuery } from '@tanstack/react-query';

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function PostDetail({ post }: { post: Post }) {
  const { data, isLoading, isError, error } = useQuery({
    // queryKey는 가져오는 데이터를 고유하게 식별하기 위해 사용된다. 쿼리 함수에 사용되는 모든 변수를 queryKey에 포함시켜야 하며, 이는 쿼리 함수에 대한 종속성 역할을 한다.
    // queryKey에 변수를 추가하면 해당 변수를 기준으로 쿼리가 독립적으로 캐시되며, 변수 값이 변경될 때마다 쿼리가 자동으로 다시 실행되어 데이터를 갱신한다.
    queryKey: ['comments', post.id],
    queryFn: () => fetchComments(post.id),
  });

  return (
    <>
      {isError ? (
        <>
          <h3 className='text-xl font-semibold'>Something went wrong</h3>
          <p>{error.toString()}</p>
        </>
      ) : (
        <>
          {isLoading ? (
            <h3 className='text-xl font-semibold'>Loading...</h3>
          ) : (
            <div className='flex flex-col gap-y-5'>
              <h3 className='text-blue-500'>{post.title}</h3>
              <div className='flex gap-x-3 text-base'>
                <button className='rounded border border-gray-500 bg-gray-50 px-2'>Delete</button>
                <button className='rounded border border-gray-500 px-2'>Update title</button>
              </div>
              <p>{post.body}</p>
              <h4 className='text-xl font-bold'>Comments</h4>
              {data.map((comment: any) => (
                <li key={comment.id}>
                  {comment.email}: {comment.body}
                </li>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}
