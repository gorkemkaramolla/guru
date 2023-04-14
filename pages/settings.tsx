import SettingsElement from '@/components/Settings/SettingsElement';
import React from 'react';

interface Props {}

const settings: React.FC<Props> = () => {
  return (
    <div className='container mx-auto grid grid-cols-12 w-full  '>
      <div className='col-span-6 sm:col-span-0'></div>
      <div className='md:col-span-6 col-span-12  '>
        <SettingsElement />
        <SettingsElement />
        <SettingsElement />
      </div>
    </div>
  );
};

export default settings;
