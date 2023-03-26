import Head from 'next/head';
// import Image from 'next/image';
// import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import axios from 'axios';

// const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const getUsers = async () => {
    const users = await axios.get('/api/user').then((res) => res.data);
    console.log(users);
  };
  return (
    <>
      <Head>
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
      <main className='h-screen'>
        <Navbar />
        <button className='mt-40' onClick={getUsers}>
          get users
        </button>
        {/* {users.map((user: any) => (
          <div>{user.name}</div>
        ))} */}
      </main>
    </>
  );
}
