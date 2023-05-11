// import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
const NavLink = ({ title, path }: { title: string; path: string }) => {
  return (
    <Link href={'/' + path}>
      {/* <Button color='primary' auto light>  */}
      {title}
      {/* </Button> */}
    </Link>
  );
};

export default NavLink;
