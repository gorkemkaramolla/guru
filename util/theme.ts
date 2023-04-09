const localStorageSetTheme = (mode: string) => {
  localStorage.setItem('lightTheme', mode);

  if (mode === 'dark') document.documentElement.classList.add(mode);
  else document.documentElement.classList.remove('dark');
};
export { localStorageSetTheme };
