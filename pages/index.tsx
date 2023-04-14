import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import React from 'react';

import _ from 'lodash';
import ToggleButton from '@/components/UI/ToggleButton';
import { ThemeProvider } from '@/context/ThemeContext';
// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        {/* Redeploy */}
        <title>Alpha Guru</title>
        <meta name='description' content='Guru for all level learners' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
      </Head>
      <div className='container mx-auto  '>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam
        explicabo consequuntur corrupti temporibus culpa quos voluptates fugiat
        harum, eveniet, quaerat eos atque iste aliquam, ratione obcaecati
        laudantium dicta minus hic!
      </div>
    </>
  );
}
