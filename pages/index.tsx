import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { Post } from '@prisma/client';
import PostCard from '@/components/Post/PostCard';
import Link from 'next/link';
import { getClient } from '@/lib/client';
import { getSession } from 'next-auth/react';

interface Props {
  posts: Post[];
}

const Home: React.FC<Props> = ({ posts }) => {
  const url = process.env.HOST_ROOT;
  return (
    <div className='flex justify-around flex-wrap items-center'>
      {posts.map((post, i) => (
        <Link
          href={`${url}/post/${post.at}`}
          key={i}
          className='cursor-pointer col-span-4 my-3'
        >
          <PostCard post={post} />
        </Link>
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
