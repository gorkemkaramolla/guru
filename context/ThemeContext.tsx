import { localStorageSetTheme } from '@/util/theme';
import { ReactElement, createContext, useContext, useEffect } from 'react';
import { useState } from 'react';
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}
export const ThemeContext = createContext<ThemeContextType>({
  mode: '',
  setMode: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactElement }) => {
  const [mode, setMode] = useState<string>(
    typeof window !== 'undefined'
      ? localStorage.getItem('lightTheme') ?? ''
      : ''
  );

  useEffect(() => {
    localStorageSetTheme(mode);
  }, [mode]);
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useCustomTheme = () => {
  const { mode, setMode } = useContext(ThemeContext);

  return { mode, setMode };
};
