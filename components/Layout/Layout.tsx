import React, { ReactElement } from 'react';
import Navbar from '../Navbar';
import { FC } from 'react';
import HeadComponent from './HeadComponent';
import styles from '../../styles/Home.module.css';
import ToggleButton from '../UI/ToggleButton';
import { ThemeProvider } from '@/context/ThemeContext';
type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <HeadComponent />
      <Navbar />
      <ThemeProvider>
        <div>
          <main className={styles.main}>{children}</main>

          <ToggleButton />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
