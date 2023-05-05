import React from 'react';
import type { Post } from '@prisma/client';
import { PostWithUser } from '@/types';
interface Props {
  post: PostWithUser;
}

const PostClient: React.FC<Props> = ({ post }) => {
  return (
    <div className='w-full mx-auto container grid grid-cols-12'>
      <div className='md:col-span-1  bg-red-100  col-span-12 w-full'></div>
      <div className='border-2 p-3 sm:col-span-12 md:col-span-10  col-span-12'>
        <div className=' text-4xl py-2 text-red-600 dark:text-red-600'>
          {post.title}
        </div>
        <div
          className='flex-col flex dark:text-white text-black'
          dangerouslySetInnerHTML={{
            __html: post.content.replace(
              /<img([^>]+)>/gi,
              '<img$1 class=" my-12 mx-auto "/>'
            ),
          }}
        />
        <div className='flex gap-4'>
          <button className='rounded-md dark:bg-blue-300 bg-blue-800 p-3 dark:text-black text-white'>
            comments
          </button>
          <button className='rounded-md dark:bg-blue-300 bg-blue-800 p-3 dark:text-black text-white'>
            likes
          </button>
        </div>
      </div>

      <div className='md:col-span-1 bg-red-100 col-span-12 w-full'></div>
    </div>
  );
};

export default PostClient;
