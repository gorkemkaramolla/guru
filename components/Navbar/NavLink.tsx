// import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { Button } from '@nextui-org/react';
const NavLink = ({ title, path }: { title: string; path: string }) => {
  return <Link href={'/' + path}>{title}</Link>;
};

export default NavLink;
