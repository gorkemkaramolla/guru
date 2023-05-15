import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { CustomUser } from '@/types';
interface Props {
  userInformations: CustomUser;
}
import { GET_USER } from '@/services/user.service';
import SingleSettingsField from './SingleSettingField';
import UserSettings from '../Forms/settings/UserSettings';

const SettingsElement: React.FC<Props> = ({ userInformations }) => {
  useEffect(() => {
    setTestUser(userInformations);
  }, []);

  const { data } = useSession();
  // const responseQuery = useQuery(GET_USER, {
  //   variables: { at: data?.user?.at },
  // });
  // useEffect(() => {
  //   setTestUser(responseQuery?.data?.getUser);
  // }, [responseQuery.data]);
  const [testUser, setTestUser] = useState<CustomUser>();

  return (
    <div className='  flex flex-col'>
      <UserSettings userInformations={userInformations} />
    </div>
  );
};
export default SettingsElement;
