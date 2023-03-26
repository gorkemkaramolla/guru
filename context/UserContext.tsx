import { IUser } from '@/types';
import React from 'react';

export const UserContext = React.createContext<IUser[] | undefined>([]);
