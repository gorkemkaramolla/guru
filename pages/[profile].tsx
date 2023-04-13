import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { User } from '@prisma/client';
import axios from 'axios';
import { Avatar, Grid } from '@nextui-org/react';
interface Props {}

const Profile: React.FC<Props> = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>('');
  const router = useRouter();

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
      <div className='text-xl container mx-auto '>
        <Grid.Container gap={2}>
          <Grid>
            <Avatar squared src={user?.profilePic} alt='none' />
          </Grid>
          <Grid>
            <Avatar squared text='Junior' />
          </Grid>
        </Grid.Container>
      </div>
    );
};

export default Profile;
