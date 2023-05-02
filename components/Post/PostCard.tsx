import { Post } from '@prisma/client';
import React from 'react';

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className='shadow-xl p-6 w-96 rounded bg-red-100 '>
      <div className='bg-red-400'>{post.title}</div>
      <div className='bg-red-200'>{post.description}</div>
    </div>
  );
};

export default PostCard;
