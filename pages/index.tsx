// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { getClient } from '@/lib/client';

import { gql, useQuery } from '@apollo/client';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const client = getClient();
  const [test, setTest] = useState();

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
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { at: 'f7bb1e2e-c05e-4d' },
  });

  return <div>{JSON.stringify(data)}</div>;
}
