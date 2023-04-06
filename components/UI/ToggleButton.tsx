import React from 'react';
import { useCustomTheme } from '@/context/ThemeContext';
type Props = {};

const ToggleButton = (props: Props) => {
  const { mode, setMode } = useCustomTheme();
  const handleDarkMode = () => {
    setMode(mode === 'dark' ? '' : 'dark');
  };

  return (
    <div className='fixed bottom-0 right-0 mb-4 mr-4'>
      <button
        onClick={handleDarkMode}
        className='bg-gray-200 dark:bg-gray-700 rounded-full p-2 focus:outline-none'
      >
        asda
      </button>
    </div>
  );
};
export default ToggleButton;
