import React, { ReactElement } from 'react';
import Navbar from '../Navbar';
import { FC } from 'react';
import HeadComponent from './HeadComponent';
import styles from '../../styles/Home.module.css';
type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <HeadComponent />
      <Navbar />
      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
