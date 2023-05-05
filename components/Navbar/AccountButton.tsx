import { Dropdown, Avatar, Text, User } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
export default function App() {
  const session = useSession();
  const router = useRouter();
  return (
    <Dropdown placement='bottom-right'>
      <Dropdown.Trigger>
        <div>
          <div className='md:hidden'>
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
                session.data?.user?.at
              }
              src={session.data?.user?.image!}
            />
          </div>
        </div>
      </Dropdown.Trigger>
      <Dropdown.Menu
        css={{ $$dropdownMenuWidth: '390px' }}
        color='secondary'
        aria-label='Avatar Actions'
      >
        <Dropdown.Item key='profile' css={{ height: '$18' }}>
          <Text
            onClick={() => {
              router.push(session.data?.user?.at!);
            }}
            b
            color='inherit'
            css={{ d: 'flex' }}
          >
            User :{session.data?.user?.at!}
          </Text>
        </Dropdown.Item>
        <Dropdown.Item key='settings' withDivider>
          <Text
            onClick={() => {
              router.push('/settings');
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
