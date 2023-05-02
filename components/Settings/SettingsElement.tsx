import React, { useEffect, useState } from 'react';
import { getSession, useSession } from 'next-auth/react';
import { Avatar } from '@nextui-org/react';
import ToolTip from '@/components/UI/ToolTip';
import { CustomUser } from '@/types';
interface Props {
  userInformations: CustomUser;
}

import { gql, useMutation, useQuery } from '@apollo/client';
import {
  GET_USER,
  UPDATE_USER_LAST_NAME_MUTATION,
  UPDATE_USER_NAME_MUTATION,
} from '@/services/user.service';
import SingleSettingsField from './SingleSettingField';

const SettingsElement: React.FC<Props> = ({ userInformations }) => {
  useEffect(() => {
    setTestUser(userInformations);
  }, []);
  const [updateUserName, responseUserName] = useMutation(
    UPDATE_USER_NAME_MUTATION
  );
  const [updateUserLastname, responseLastName] = useMutation(
    UPDATE_USER_LAST_NAME_MUTATION
  );

  const { data } = useSession();
  // const responseQuery = useQuery(GET_USER, {
  //   variables: { at: data?.user?.at },
  // });
  // useEffect(() => {
  //   setTestUser(responseQuery?.data?.getUser);
  // }, [responseQuery.data]);
  const [testUser, setTestUser] = useState<CustomUser>();

  const handleUpdateName = async () => {
    try {
      const updatedUser = await updateUserName({
        variables: {
          at: data?.user?.at || null,
          name: 'gorkem',
        },
      });
      setTestUser((prevState: any) => ({
        ...prevState,
        name: updatedUser.data.updateUserName?.name,
      }));
    } catch (err) {
      console.error(err);
    }
  };
  const handleUpdateLastname = async () => {
    try {
      const updatedUser = await updateUserLastname({
        variables: {
          at: data?.user?.at,
          lastname: 'New Last Nasdasdaame',
        },
      });
      setTestUser((prevState: any) => ({
        ...prevState,
        lastname: updatedUser.data.updateUserLastname?.lastname,
      }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='  flex flex-col'>
      <SingleSettingsField
        field={{ label: 'name', value: testUser?.name! }}
        handleUpdate={handleUpdateName}
      />
      <SingleSettingsField
        field={{ label: 'last name', value: testUser?.lastname! }}
        handleUpdate={handleUpdateLastname}
      />
    </div>
  );
};
export default SettingsElement;
