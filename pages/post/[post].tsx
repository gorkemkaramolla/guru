import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import PostClient from '@/components/Post/PostClient';
import { PostWithUser } from '@/types';
interface Props {
  post: PostWithUser;
}
const PostPage: React.FC<Props> = ({ post }) => {
  return <div>{post ? <PostClient post={post} /> : <div>Loading...</div>}</div>;
};
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const { query } = context;
  const postQuery = query.post as string;

  try {
    const { data } = await axios.get(
      `${process.env.HOST_ROOT}api/post/${postQuery}`
    );
    const post = data.fetchpost;
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      notFound: true,
    };
  }
};

export default PostPage;
