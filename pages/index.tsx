import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { Post } from '@prisma/client';
import PostCard from '@/components/Post/PostCard';
import Link from 'next/link';
import { getClient } from '@/lib/client';
import { getSession } from 'next-auth/react';
import { PostWithUser } from '@/types';
import { Avatar } from '@mui/material';

interface Props {
  posts: PostWithUser[];
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className='flex justify-around flex-wrap items-center'>
      {posts.map((post, i) => (
        <div key={i}>
          <Link
            href={`${process.env.HOST_ROOT}${post.user.at}`}
            className='flex items-center gap-3 border-2'
          >
            <Avatar src={post?.user?.profilePic} />
            <p>{post.user.name + ' ' + post.user.lastname}</p>
          </Link>
          <Link
            href={`${process.env.HOST_ROOT}post/${post.at}`}
            className='cursor-pointer col-span-4 my-3'
          >
            <PostCard post={post} />
          </Link>
        </div>
      ))}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }
  const client = getClient();

  const { data } = await client.query({
    query: gql`
      query {
        getPosts {
          at
          title
          description
          user {
            name
            lastname
            at
            profilePic
          }
        }
      }
    `,
  });

  return {
    props: {
      posts: data.getPosts,
    },
  };
};

export default Home;
