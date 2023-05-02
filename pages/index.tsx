// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { getClient } from '@/lib/client';

import { gql, useQuery } from '@apollo/client';
import { Post } from '@prisma/client';
import PostCard from '@/components/Post/PostCard';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const client = getClient();
  const [test, setTest] = useState<Post[]>();

  const GET_USER = gql`
    query GetUser($at: String!) {
      getUser(at: $at) {
        name
        lastname
        email
        register_date
        profilePic
        at
      }
    }
  `;
  const GET_USERS = gql`
    query {
      getUsers {
        name
        email
        profilePic
      }
    }
  `;
  const GET_POSTS = gql`
    query {
      getPosts {
        title
        description
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_POSTS, {
    variables: {},
  });
  useEffect(() => {
    setTest(data?.getPosts);
  }, [data?.getPosts]);
  return (
    <div className='grid grid-cols-12 '>
      <div className='col-span-6'>
        {test?.map((test, i) => (
          <PostCard key={i} post={test} />
        ))}
      </div>
    </div>
  );
}
