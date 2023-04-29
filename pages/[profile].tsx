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
interface Props {}

const Profile: React.FC<Props> = () => {
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

  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const router = useRouter();
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
  const { data } = useSession();
  const result = useQuery(GET_USER, {
    variables: { at: data?.user?.at },
  });
  async function getUser(at: string) {
    return result.data.getUser;
  }
  useEffect(() => {
    const at = router.query.profile as string;
    if (at && result.data) {
      setLoading(true);
      getUser(at)
        .then((res) => {
          setUser(res);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setError(e.message);
          setLoading(false);
        });
    }
  }, [router.query, result.data]);

  if (loading) {
    return (
      <div className='w-screen h-[90vh] flex justify-center items-center'>
        <Loading size='xl' color={'error'} textColor={'primary'} />
      </div>
    );
  } else if (error) {
    return <h1>{error}</h1>;
  } else
    return (
      <div className=' dark:bg-dark dark:text-gray-200 text-gray-800  bg-whitebg text-xl mx-auto  container shadow-2xl rounded-xl justify-center items-center flex     flex-col'>
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
            <h2 className='md:text-4xl text-2xl leading-9 font-bold mb-4 mt-8 shadow-sm'>
              {user?.name + ' ' + user?.lastname}
            </h2>
          </Text>
          <p className='sm:text-md  text-md leading-9 shadow-sm'>
            {' '}
            @guru: {user?.at}
          </p>
          <p className='sm:text-md  text-lg leading-9 shadow-sm'>
            a guru since: {formatDate(Number(user?.register_date!))}
          </p>
        </div>
      </div>
    );
};

export default Profile;
