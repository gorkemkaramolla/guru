import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

// import axios from 'axios';
// import useSWR from 'swr';

import { Toaster } from 'react-hot-toast';
import Layout from '@/components/Layout/Layout';
// import { UserContext } from '@/context/UserContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ApolloProvider } from '@apollo/client';
import { getClient } from '@/lib/client';
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const client = getClient();
  return (
    <ApolloProvider client={client}>
      <SessionProvider session={session}>
        <Toaster />
        <Layout>
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </Layout>
      </SessionProvider>
    </ApolloProvider>
  );
}
