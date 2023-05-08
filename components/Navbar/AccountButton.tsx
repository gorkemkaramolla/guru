import { Dropdown, Avatar, Text, User } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
export default function App() {
  const session = useSession();
  const router = useRouter();
  const root = process.env.HOST_ROOT;
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
              bordered
              as='button'
              size='lg'
              color='primary'
              name={session.data?.user?.name}
              description={
                '@' +
                // session.data?.user?.name
                //   ?.replaceAll(' ', '')
                //   .toLocaleLowerCase()
                session.data?.user?.at?.substring(0, 16) +
                '...'
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
          css={{ height: '$18', padding: 0, textAlign: 'center' }}
        >
          <Link href={`${root}${session.data?.user?.at!}`}>
            <Text b color='inherit' css={{ d: 'flex', padding: 0 }}>
              User :{session.data?.user?.at!}
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
