import React from 'react';
import type { Post } from '@prisma/client';
interface Props {
  post: Post;
}
// Assuming you have the HTML string with the image tag in a variable called "html"

const PostClient: React.FC<Props> = ({ post }) => {
  return (
    <div className='w-full h-screen mx-auto container grid grid-cols-12'>
      <div className='sm:col-span-2 bg-red-100 col-span-0'>sdasd</div>
      <div className='border-2 p-3 sm:col-span-12 md:col-span-8  col-span-12'>
        <div className=' text-4xl py-2 text-red-800'>{post.title}</div>
        <div
          className='flex-col flex'
          dangerouslySetInnerHTML={{
            __html: post.content.replace(
              /<img([^>]+)>/gi,
              '<img$1 class=" my-12 mx-auto "/>'
            ),
          }}
        />
        <div className='flex gap-4'>
          <div>comments</div>
          <div>likes</div>
        </div>
      </div>

      <div className='sm:col-span-2 bg-red-100  col-span-0'>sdasd</div>
    </div>
  );
};

export default PostClient;
