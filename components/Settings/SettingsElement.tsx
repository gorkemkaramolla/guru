import React from 'react';
import { useSession } from 'next-auth/react';

import { Avatar } from '@nextui-org/react';
import ToolTip from '@/components/UI/ToolTip';
interface Props {}

const SettingsElement: React.FC<Props> = () => {
  const { data } = useSession();

  return (
    <div className='py-3 border-[1px] mb-6 rounded-md border-white  px-6 flex flex-wrap gap-5 w-full text-start justify-between  dark:bg-[rgb(14,17,22)] dark:text-white bg-slate-100 text-black'>
      <p>guru-id: {data?.user?.at}</p>
      <div className='flex gap-2'>
        <button className='  px-4 dark:bg-[rgb(34,38,44)] rounded-xl text-white'>
          Edit
        </button>
        <ToolTip message='This is your user id and your profile endpoint you can change it anytime' />
      </div>
    </div>
  );
};

export default SettingsElement;
