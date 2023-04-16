import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import React, { useEffect, useState } from 'react';
import type { Post } from '@prisma/client';
import PostClient from '@/components/Post/PostClient';
import _ from 'lodash';
import ToggleButton from '@/components/UI/ToggleButton';
import { ThemeProvider } from '@/context/ThemeContext';
import { getPosts } from '@/services/post.service';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [posts, setPosts] = useState<Post[]>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    setLoading(true);
    getPosts()
      .then((posts) => {
        setPosts(posts);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
    setLoading(false);
  }, []);
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
    </>
  );
}
