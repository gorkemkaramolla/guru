import SettingsElement from '@/components/Settings/SettingsElement';
import Test from '@/components/Settings/Test';
import { GetServerSideProps } from 'next';
import React from 'react';

interface Props {
  order: {
    firstName: string;
    lastName: string;
    orderNo: string;
  };
}

const settings: React.FC<Props> = ({ order }) => {
  return (
    <div className='container mx-auto grid grid-cols-12 w-full  '>
      <div className='col-span-6 sm:col-span-0'>
        <Test order={order} />
      </div>
      <div className='md:col-span-6 col-span-12  '>
        <SettingsElement />
      </div>
    </div>
  );
};
export const getServerSideProps: GetServerSideProps<Props> = async () => {
  console.log('KASDLAKDLAKDLA');
  return {
    props: {
      order: {
        firstName: 'Donald',
        lastName: 'Duck',
        orderNo: 'DL100',
      },
    },
  };
};
export default settings;
