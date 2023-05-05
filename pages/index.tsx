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
    <div className='grid grid-cols-12 container mx-auto'>
      <div className='col-span-12 md:col-span-6 flex flex-col '>
        {posts.map((post, i) => (
          <div key={i} className='col-span-3  '>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
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
