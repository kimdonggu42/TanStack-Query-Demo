import { useState, useEffect } from 'react';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchPosts, deletePost, updatePost } from '@/pages/blog-em/api';
import PostDetail from '@/pages/blog-em/PostDetail';

const maxPostPage = 10;

export default function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  // useQueryClient 훅은 QueryClient 객체에 접근하는 데 사용되는 훅이다.
  const queryClient = useQueryClient();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['posts', currentPage], // 쿼리 캐시 내의 데이터를 정의하며 항상 배열이다.
    queryFn: () => fetchPosts(currentPage), // 데이터를 가져오기 위해 실행할 함수
    // 데이터를 가져온 후 5초 동안은 fresh 상태이며, 이 기간 동안 refetch가 트리거되어도 서버에서 다시 데이터를 가져오지 않는다.
    // staleTime이 지난 후에는 데이터가 stale 상태로 간주되고, refetch 트리거가 발생하면 서버에서 데이터를 다시 가져온다.
    staleTime: 5 * 1000,
  });

  const updateMutation = useMutation({
    mutationFn: (postId: number) => updatePost(postId),
  });

  const deleteMutation = useMutation({
    mutationFn: (postId: number) => deletePost(postId),
  });

  // 상태 업데이트는 비동기적으로 이루어지기 때문에, 상태 변경 직후에는 그 값이 즉시 반영되지 않는다.
  // 예를 들어, handleMovePrevPage에서 setCurrentPage 호출 후 바로 prefetchQuery를 실행하면, 업데이트된 페이지 값이 prefetchQuery에 반영되지 않는다.
  // 하지만 useEffect는 상태가 변경된 후에 실행되므로, 업데이트된 currentPage 값으로 prefetchQuery를 실행할 수 있다.
  useEffect(() => {
    if (currentPage < maxPostPage) {
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ['posts', nextPage],
        queryFn: () => fetchPosts(nextPage),
      });
    }
  }, [currentPage, queryClient]);

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
                    onClick={() => {
                      // updateMutation과 deleteMutation을 PostDetail에서 선언하지 않은 이유는 다른 포스트를 클릭할 때마다 mutation을 리셋해야 하기 때문이다.
                      // reset 과정이 없을 경우 다른 Post 제목을 클릭해도 해당 mutation의 상태 메시지가 남아있게 된다.
                      updateMutation.reset();
                      deleteMutation.reset();
                      setSelectedPost(post);
                    }}
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
              {selectedPost && (
                <PostDetail
                  post={selectedPost}
                  updateMutation={updateMutation}
                  deleteMutation={deleteMutation}
                />
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}
