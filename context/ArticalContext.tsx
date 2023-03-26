import { IArtical } from '@/types';
import React from 'react';

export const ArticalContext = React.createContext<IArtical[] | undefined>([]);
