import React, { useEffect } from 'react';
import type { Post } from '@prisma/client';
import { PostWithUser } from '@/types';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import 'highlight.js/styles/atom-one-dark.css';

hljs.registerLanguage('xml', require('highlight.js/lib/languages/xml'));

interface Props {
  post: PostWithUser;
}

const PostClient: React.FC<Props> = ({ post }) => {
  useEffect(() => {
    const codeBlocks = document.querySelectorAll('pre code');
    codeBlocks.forEach((block) => {
      hljs.highlightBlock(block as HTMLElement);
    });
  }, []);

  return (
    <div className='w-full mx-auto container grid grid-cols-12'>
      <div className='md:col-span-1  bg-red-100  col-span-12 w-full'></div>
      <div className='border-2 p-3 sm:col-span-12 md:col-span-10  col-span-12'>
        <div className=' text-4xl py-2 text-red-600 dark:text-red-600'>
          {post.title}
        </div>
        <div
          className='break-words dark:text-white text-black'
          dangerouslySetInnerHTML={{
            __html: post.content
              .replace(/<img([^>]+)>/gi, '<img$1 class="my-12 mx-auto"/>')
              .replace(
                /<code>(.*?)<\/code>/gis,
                '<pre style="display:block"><code>$1</code></pre>'
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
