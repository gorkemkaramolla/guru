import React from 'react';
import { Avatar, Text } from '@nextui-org/react';
import { User } from '@prisma/client';
import { formatDate } from '@/util/date';
import Image from 'next/image';
interface Props {
  user: User;
}

const ProfileComp: React.FC<Props> = ({ user }) => {
  return (
    <div className='flex flex-col rounded-xl '>
      <Image
        alt='none'
        width={240}
        height={240}
        className='rounded-full border-4 border-green-500 self-center'
        src={user?.profilePic}
      ></Image>
      <Text
        h1
        size={60}
        css={{
          textGradient: '120deg, $red700 -20%, $purple700 100%',
        }}
        weight='bold'
      >
        <h1 className='md:text-4xl text-2xl leading-9 font-bold mb-4 mt-8 '>
          {user?.name + ' ' + user?.lastname}
        </h1>
      </Text>
      <Text
        css={{
          textGradient: '120deg, $red700 -20%, $red500 50%',
        }}
        weight='bold'
      >
        <p className='text-xl leading-9 '> @guru: {user?.at}</p>
      </Text>
      <Text
        css={{
          textGradient: '120deg, $red700 -20%, $red500 50%',
        }}
        weight='bold'
      >
        <p className='text-xl   leading-9 '>
          a guru since: {formatDate(Number(user?.register_date!))}
        </p>
      </Text>
    </div>
  );
};

export default ProfileComp;
