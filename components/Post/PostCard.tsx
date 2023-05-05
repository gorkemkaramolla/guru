import { PostWithUser } from '@/types';
import { Avatar } from '@mui/material';
import { Post } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

interface Props {
  post: PostWithUser;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className='dark:hover:bg-black hover:bg-gray-100  transition-colors m-3 flex flex-col  justify-center gap-1 p-6 rounded-xl py-4'>
      <Link
        href={`${process.env.HOST_ROOT}${post.user.at}`}
        className='flex items-center   gap-3'
      >
        <Avatar sx={{ width: 32, height: 32 }} src={post?.user?.profilePic} />
        <p className='text-md '>{post.user.name + ' ' + post.user.lastname}</p>
      </Link>
      <Link
        href={`${process.env.HOST_ROOT}post/${post.at}`}
        className='cursor-pointer mx-auto col-span-4 my-3'
      >
        <div className='text-blue-400  text-xl  font-bold'>{post.title}</div>
        <div className=''>{post.description}</div>
      </Link>
    </div>
  );
};

export default PostCard;
