import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import axios from 'axios';
import { Avatar, Grid, Text } from '@nextui-org/react';
interface Props {}

const Profile: React.FC<Props> = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const router = useRouter();
  function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
    const formatter = new Intl.DateTimeFormat('en-US', options);
    return formatter.format(date);
  }

  async function getUser(at: string) {
    const response = await axios.get(`/api/user/${at}`);
    console.log('I am called ');
    return response.data.user;
  }
  useEffect(() => {
    const at = router.query.profile as string;
    if (at) {
      // Only call getUser if at is defined
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
  }, [router.query]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <h1>{error}</h1>;
  } else
    return (
      <div className=' dark:bg-dark dark:text-gray-200 text-gray-800  bg-whitebg text-xl mx-auto  container shadow-2xl rounded-xl justify-center items-center flex     flex-col'>
        <div className='    flex-col flex justify-center items-center p-12'>
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
            a guru since: {formatDate(user?.register_date.toString()!)}
          </p>
        </div>
      </div>
    );
};

export default Profile;
