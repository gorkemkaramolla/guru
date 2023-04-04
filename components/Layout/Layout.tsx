import React, { ReactElement } from 'react';
import Navbar from '../Navbar';
import { FC } from 'react';
type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
