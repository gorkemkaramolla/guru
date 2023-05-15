import SettingsElement from '@/components/Settings/SettingsElement';
import { getClient } from '@/lib/client';
import { setUser } from '@/redux/exampleSlice';
import { UPDATE_USER_NAME_MUTATION } from '@/services/user.service';
import { RootState } from '@/store';

import { CustomUser } from '@/types';
import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import { getSession, useSession } from 'next-auth/react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface Props {
  userInformations: CustomUser;
}

const Settings: React.FC<Props> = ({ userInformations }) => {
  const dispatch = useDispatch();

  return (
    <div className='container mx-auto grid grid-cols-12 w-full  '>
      <div className='col-span-6 sm:col-span-3'></div>
      <div className='md:col-span-7 col-span-12  '>
        <SettingsElement userInformations={userInformations} />
      </div>
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
    variables: {
      at: session?.user?.at,
    },
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {
      userInformations: data.getUser,
    },
  };
};
export default Settings;
