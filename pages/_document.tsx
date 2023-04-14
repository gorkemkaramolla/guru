import { Html, Head, Main, NextScript } from 'next/document';
import { useEffect } from 'react';

export default function Document() {
  useEffect(() => {
    const savedTheme = localStorage.getItem('lightTheme');
    if (savedTheme) {
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const mode =
    typeof window !== 'undefined' ? localStorage.getItem('theme') ?? '' : '';

  return (
    <Html lang='en'>
      <Head />
      <body className={mode + ' dark:bg-[rgba(2,4,9)]'}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
