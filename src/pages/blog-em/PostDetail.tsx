import { fetchComments } from '@/pages/blog-em/api';

export default function PostDetail({ post }: any) {
  const data: any = [];

  return (
    <div className='flex flex-col gap-y-5'>
      <h3 style={{ color: 'blue' }}>{post.title}</h3>
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
  );
}
