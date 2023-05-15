import React from 'react';
import ToolTip from '@/components/UI/ToolTip';
import { Input } from '@nextui-org/react';
import UserSettings from '../Forms/settings/UserSettings';

interface Props {
  field: {
    label: string;
    value: string;
  };
  // handleUpdate: () => void;
}

const SingleSettingsField: React.FC<Props> = ({
  field: { label, value },
  // handleUpdate,
}) => {
  return (
    <div className='flex flex-wrap w-full text-start justify-between border-white  px-6  dark:bg-[rgb(14,17,22)] dark:text-white bg-slate-100 text-black py-3 border-[1px] mb-6 rounded-md'>
      {/* <Input
        color='warning'
        bordered
        width='100%'
        initialValue={label + '  :  ' + value}
      /> */}
      {/* <div className='flex gap-2 '>
        <button
          type='submit'
          // onClick={handleUpdate}
          className='text-white mt-5 bg-black  px-4 dark:bg-dark rounded-xl dark:text-white'
        >
          Edit
        </button>
        <ToolTip message='This is your user id and your profile endpoint you can change it anytime' />
      </div> */}
    </div>
  );
};

export default SingleSettingsField;
