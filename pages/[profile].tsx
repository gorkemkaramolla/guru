import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import axios from 'axios';
import { Avatar, Grid, Text } from '@nextui-org/react';
import _ from 'lodash';
import { getClient } from '@/lib/client';
import { Loading } from '@nextui-org/react';
import { gql, useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  function formatDate(timestamp: number): string {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat('tr-TR', options);
    const date = new Date(timestamp);
    return formatter.format(date);
  }

  return !user ? (
    <Loading />
  ) : (
    <div className='flex-col flex justify-center items-center p-12'>
      <Avatar
        css={{ size: '$25' }}
        rounded
        src={user?.profilePic!}
        alt='none'
      />
      <Text
        h1
        size={60}
        css={{
          textGradient: '45deg, $blue600 -20%, $green100 100%',
        }}
        weight='bold'
      >
        <h1 className='md:text-4xl text-2xl leading-9 font-bold mb-4 mt-8 shadow-sm'>
          {user?.name + ' ' + user?.lastname}
        </h1>
      </Text>
      <p className='sm:text-md  text-md leading-9 shadow-sm'>
        {' '}
        @guru: {user?.at}
      </p>
      <p className='sm:text-md  text-lg leading-9 shadow-sm'>
        a guru since: {formatDate(Number(user?.register_date!))}
      </p>
    </div>
  );
};

export default Profile;
export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const client = getClient();
  const { query } = context;
  const userQuery = query.profile as string;
  const { data } = await client.query({
    query: gql`
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
    `,
    variables: { at: userQuery },
  });

  return {
    props: {
      user: data.getUser,
    },
  };
};
