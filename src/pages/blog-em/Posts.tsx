import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts, deletePost, updatePost } from '@/pages/blog-em/api';
import PostDetail from '@/pages/blog-em/PostDetail';

const maxPostPage = 10;

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', currentPage], // 쿼리 캐시 내의 데이터를 정의하며 항상 배열이다.
    queryFn: () => fetchPosts(currentPage), // 데이터를 가져오기 위해 실행할 함수
    // 데이터를 가져온 후 5초 동안은 fresh 상태이며, 이 기간 동안 refetch가 트리거되어도 서버에서 다시 데이터를 가져오지 않는다.
    // staleTime이 지난 후에는 데이터가 stale 상태로 간주되고, refetch 트리거가 발생하면 서버에서 데이터를 다시 가져온다.
    staleTime: 5 * 1000,
  });

  const handleMovePrevPage = () => setCurrentPage((prev) => prev - 1);

  const handleMoveNextPage = () => setCurrentPage((prev) => prev + 1);

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
            <div className='flex flex-col gap-y-10'>
              <ul className='ml-5 list-disc text-lg'>
                {data.map((post: any) => (
                  <li
                    className='cursor-pointer'
                    key={post.id}
                    onClick={() => setSelectedPost(post)}
                  >
                    {post.title}
                  </li>
                ))}
              </ul>
              <div className='flex justify-between'>
                <button disabled={currentPage <= 1} onClick={handleMovePrevPage}>
                  Previous page
                </button>
                <span>Page {currentPage}</span>
                <button disabled={currentPage >= maxPostPage} onClick={handleMoveNextPage}>
                  Next page
                </button>
              </div>
              <hr />
              {selectedPost && <PostDetail post={selectedPost} />}
            </div>
          )}
        </>
      )}
    </>
  );
}
