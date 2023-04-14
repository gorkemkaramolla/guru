import { Dropdown, Avatar, Text, User } from '@nextui-org/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
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
              router.push('settings');
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

    // <Dropdown placement='bottom-left'>
    //   <Dropdown.Trigger>
    //     <User
    //       bordered
    //       as='button'
    //       size='lg'
    //       color='primary'
    //       name={session.data?.user?.name}
    //       description={
    //         '@' +
    //         session.data?.user?.name
    //           ?.replaceAll(' ', '')
    //           .toLocaleLowerCase()
    //       }
    //       src={session.data?.user?.image!}
    //     />
    //   </Dropdown.Trigger>
    //   <Dropdown.Menu color='primary' aria-label='User Actions'>
    //     <Dropdown.Item key='profile' css={{ height: '$18' }}>
    //       <Text b color='inherit' css={{ d: 'flex' }}>
    //         Signed in as
    //       </Text>
    //       <Text b color='inherit' css={{ d: 'flex' }}>
    //         {session.data?.user?.email}
    //       </Text>
    //     </Dropdown.Item>
    //     <Dropdown.Item key='settings' withDivider>
    //       My Settings
    //     </Dropdown.Item>
    //     <Dropdown.Item key='team_settings'>Team Settings</Dropdown.Item>
    //     <Dropdown.Item key='analytics' withDivider>
    //       Analytics
    //     </Dropdown.Item>
    //     <Dropdown.Item key='system'>System</Dropdown.Item>
    //     <Dropdown.Item key='configurations'>Configurations</Dropdown.Item>
    //     <Dropdown.Item key='help_and_feedback' withDivider>
    //       Help & Feedback
    //     </Dropdown.Item>
    //     <Dropdown.Item key='logout' color='error' withDivider  >
    //       Log Out
    //     </Dropdown.Item>
    //   </Dropdown.Menu>
    // </Dropdown>
  );
}
