import { User } from '@prisma/client';
import _ from 'lodash';
import { getClient } from '@/lib/client';
import { Loading } from '@nextui-org/react';
import { gql } from '@apollo/client';
import { GetServerSideProps } from 'next';
import ProfileComp from '@/components/Profile/ProfileComp';

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  return !user ? (
    <Loading />
  ) : (
    <div className='grid grid-cols-12 '>
      <div className='sm:col-span-4 flex   col-span-12 '>
        <ProfileComp user={user} />
      </div>
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
