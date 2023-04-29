import { GetServerSideProps } from 'next/types';
import React from 'react';

interface Props {
  order: {
    firstName: string;
    lastName: string;
    orderNo: string;
  };
}

const OrderPage: React.FC<Props> = ({ order }) => {
  return (
    <>
      <p>{order?.firstName}</p>
      <p>{order?.lastName}</p>
      <p>{order?.orderNo}</p>
    </>
  );
};

const Test: React.FC<Props> = ({ order }) => {
  return (
    <div>
      <OrderPage order={order} />
    </div>
  );
};

export default Test;
