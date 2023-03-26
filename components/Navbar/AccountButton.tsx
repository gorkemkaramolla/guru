import { Dropdown, Avatar, Text, Grid, User } from '@nextui-org/react';
import { useSession } from 'next-auth/react';

export default function App() {
  const session = useSession();
  return (
    <div>
      <div className='md:hidden'>
        <Dropdown placement='bottom-left'>
          <Dropdown.Trigger>
            <Avatar
              bordered
              size='lg'
              as='button'
              color='secondary'
              src={session.data?.user?.image!}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color='secondary' aria-label='Avatar Actions'>
            <Dropdown.Item key='profile' css={{ height: '$18' }}>
              <Text b color='inherit' css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color='inherit' css={{ d: 'flex' }}>
                {session.data?.user?.email!}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key='settings' withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key='team_settings'>Team Settings</Dropdown.Item>
            <Dropdown.Item key='analytics' withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key='system'>System</Dropdown.Item>
            <Dropdown.Item key='configurations'>Configurations</Dropdown.Item>
            <Dropdown.Item key='help_and_feedback' withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key='logout' color='error' withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className='hidden md:block'>
        <Dropdown placement='bottom-left'>
          <Dropdown.Trigger>
            <User
              bordered
              as='button'
              size='lg'
              color='primary'
              name={session.data?.user?.name}
              description={
                '@' +
                session.data?.user?.name
                  ?.replaceAll(' ', '')
                  .toLocaleLowerCase()
              }
              src={session.data?.user?.image!}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color='primary' aria-label='User Actions'>
            <Dropdown.Item key='profile' css={{ height: '$18' }}>
              <Text b color='inherit' css={{ d: 'flex' }}>
                Signed in as
              </Text>
              <Text b color='inherit' css={{ d: 'flex' }}>
                {session.data?.user?.email}
              </Text>
            </Dropdown.Item>
            <Dropdown.Item key='settings' withDivider>
              My Settings
            </Dropdown.Item>
            <Dropdown.Item key='team_settings'>Team Settings</Dropdown.Item>
            <Dropdown.Item key='analytics' withDivider>
              Analytics
            </Dropdown.Item>
            <Dropdown.Item key='system'>System</Dropdown.Item>
            <Dropdown.Item key='configurations'>Configurations</Dropdown.Item>
            <Dropdown.Item key='help_and_feedback' withDivider>
              Help & Feedback
            </Dropdown.Item>
            <Dropdown.Item key='logout' color='error' withDivider>
              Log Out
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
