import React, { ReactElement } from 'react';
import Navbar from '../Navbar';
import { FC } from 'react';
import HeadComponent from './HeadComponent';
type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <HeadComponent />
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
