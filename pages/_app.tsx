import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// import axios from 'axios';
// import useSWR from 'swr';

import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout/Layout';
// import { UserContext } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  //   const fetcher = async (url: string) =>
  //   await axios.get(url).then((res) => {
  //     return res.data;
  //   });
  // const { data: clinics } = useSWR<IClinic[]>('/api/clinic', fetcher, {
  //   revalidateIfStale: true,
  //   revalidateOnFocus: true,
  //   revalidateOnReconnect: true,
  // });
  return (
    <SessionProvider session={session}>
      {/* <UserContext.Provider value={users}> */}
      <Toaster />
      <Layout>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Layout>
      {/* </UserContext.Provider> */}
    </SessionProvider>
  );
}
