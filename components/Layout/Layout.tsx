import React, { ReactElement, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../Navbar';
import { FC } from 'react';
import HeadComponent from './HeadComponent';
import styles from '../../styles/Home.module.css';
import ToggleButton from '../UI/ToggleButton';
import { ThemeProvider } from '@/context/ThemeContext';
import { setUser } from '@/redux/exampleSlice';
import axios from 'axios';

type Props = {
  children: ReactElement;
};

const Layout: FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getUser() {
      const userData = await axios.get(
        `${process.env.HOST_ROOT}api/user/getuser`
      );
      return userData.data;
    }

    getUser()
      .then((res) => {
        dispatch(setUser(res.userData));
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <HeadComponent />
      <Navbar />
      <ThemeProvider>
        <div>
          <main className={styles.main}>{children}</main>
          {/* Display the name property from the user state */}
          <ToggleButton />
        </div>
      </ThemeProvider>
    </>
  );
};

export default Layout;
