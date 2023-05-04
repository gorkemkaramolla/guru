import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { Post } from '@prisma/client';
import PostCard from '@/components/Post/PostCard';
import Link from 'next/link';
import { getClient } from '@/lib/client';

interface Props {
  posts: Post[];
}

const Home: React.FC<Props> = ({ posts }) => {
  return (
    <div className='flex justify-around flex-wrap items-center'>
      {/* {posts.map((post, i) => (
        <Link
          key={i}
          className='cursor-pointer col-span-4 my-3'
          href={`/post/${post.at}`}
        >
          <PostCard post={post} />
        </Link>
      ))} */}
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
//   const client = getClient();
//   const { data } = await client.query({
//     query: gql`
//       query {
//         getPosts {
//           at
//           title
//           description
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       posts: data.getPosts,
//     },
//   };
// };

export default Home;
