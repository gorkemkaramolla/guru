import React from 'react';
import NavLink from './NavLink';
import { useSSR } from '@nextui-org/react';
import MenuIcon from '@mui/icons-material/MenuRounded';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';
import AccountButton from './AccountButton';
import Image from 'next/image';
import SearchBar from './SearchBar';
const links: { [key: string]: string } = {
  Discover: 'discover',
  Communities: 'community',
  'How Guru Works': 'about',
  'Create Post ': 'create-post',
};

const Navbar = () => {
  const { isBrowser } = useSSR();
  const router = useRouter();
  const session = useSession();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [pathname, setPathname] = React.useState<null | string>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // var element = document.getElementById('vert-dots');
    // if (element) {
    //   element.style.rotate = '90deg';
    //   element.style.transition = ' .3s ease-out';
    // }
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    // var element = document.getElementById('vert-dots');
    // if (element) {
    //   element.style.rotate = '0deg';
    //   element.style.transition = ' .5s ease-out';
    // }
    setAnchorEl(null);
  };
  React.useEffect(() => {
    setPathname(router.pathname);
  }, [router.pathname]);
  if (isBrowser)
    return (
      <div className=' bg-white dark:bg-black fixed top-0 left-0 right-0 flex py-2 z-[100] justify-around items-center border shadow-sm w-full '>
        <Link href='/'>
          <Image
            width={140}
            height={54}
            className='h-auto w-auto hidden md:block'
            src='/logo2.png'
            alt='logo'
          />
          <Image
            width={54}
            height={54}
            className='h-auto w-auto md:hidden'
            src='/logo1.png'
            alt='logo'
          />
        </Link>

        <SearchBar />
        <div className='hidden lg:flex space-x-2 lg:space-x-4'>
          {Object.keys(links).map((link) => (
            <NavLink key={link} title={link} path={links[link]} />
          ))}
        </div>
        <div className='flex space-x-4   items-center'>
          <div className='lg:hidden'>
            <IconButton
              aria-label='more'
              id='long-button'
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup='true'
              onClick={handleClick}
              className='text-white p-0'
            >
              <MenuIcon
                id='menuicon'
                className='text-4xl text-[rgb(9,87,243)]'
              />
            </IconButton>
            <Menu
              id='long-menu'
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  marginTop: '.5rem',
                  maxHeight: 48 * 4.5,
                  width: 'fit-content',
                },
              }}
            >
              {Object.keys(links).map((link) => {
                return (
                  <Link key={link} href={'/' + links[link]}>
                    <MenuItem
                      selected={'/' + links[link] === pathname}
                      onClick={handleClose}
                    >
                      {link}
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </div>
          {session.status === 'authenticated' ? (
            <AccountButton />
          ) : (
            // <div onClick={() => signOut()}>
            //   <Avatar>
            //     <img src={session.data?.user?.image!} alt='' />
            //   </Avatar>
            // </div>
            <div className='flex gap-2'>
              <Button rounded light auto onClick={() => router.push('/login')}>
                Login
              </Button>
              <Button
                rounded
                auto
                onClick={() => router.push('/login?signup=true')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  else {
    return <div>Loading...</div>;
  }
};

export default Navbar;
