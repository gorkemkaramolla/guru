import { IArticle } from '@/types';
import React from 'react';

export const ArticleContext = React.createContext<IArticle[] | undefined>([]);
