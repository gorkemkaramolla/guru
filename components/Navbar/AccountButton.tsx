import { Dropdown, Avatar, Text, User } from '@nextui-org/react';
import { User as Userx } from '@prisma/client';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
interface Props {}
interface UserInfo {
  name: string;
  at: string;
  email: string;
}

export default function App(props: Props) {
  const session = useSession();
  const router = useRouter();
  const root = process.env.HOST_ROOT;
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const currentUser = useSelector((state: RootState) => state.user);
  const mode =
    typeof window !== 'undefined' ? localStorage.getItem('theme') ?? '' : '';
  useEffect(() => {}, []);
  return (
    <Dropdown placement='bottom-right'>
      <Dropdown.Trigger>
        <div>
          <div className='md:hidden '>
            <Avatar
              bordered
              size='lg'
              as='button'
              color='secondary'
              src={session.data?.user?.image!}
            />
          </div>
          <div className='hidden md:block'>
            <User
              color='success'
              bordered
              as='button'
              size='lg'
              name={
                <p className='dark:text-white  text-gray-700'>
                  {currentUser.name}
                </p>
              }
              description={
                '@' + (session.data?.user?.at?.substring(0, 16) + '...')
              }
              src={session.data?.user?.image!}
            />
          </div>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu
        css={{ $$dropdownMenuWidth: '300px' }}
        color='secondary'
        aria-label='Avatar Actions'
      >
        <Dropdown.Item
          key='profile'
          css={{
            height: '$18',
            textAlign: 'center',
          }}
        >
          <Link href={`${root}${currentUser.at}`}>
            <Text b color='inherit' css={{ d: 'flex', padding: '5px' }}>
              User :{currentUser.at}
            </Text>
          </Link>
        </Dropdown.Item>

        <Dropdown.Item key='settings' withDivider>
          <Text
            onClick={() => {
              router.push(`${root}settings`);
            }}
          >
            My Settings
          </Text>
        </Dropdown.Item>

        <Dropdown.Item key='help_and_feedback' withDivider>
          Help & Feedback
        </Dropdown.Item>
        <Dropdown.Item key='logout' color='error' withDivider>
          <div onClick={() => signOut()}>Log Out</div>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
