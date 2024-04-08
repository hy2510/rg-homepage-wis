'use client'

import Gfooter from '@/ui/common/global-footer/global-footer'
import Gheader from './_header/Gheader'
import { useEffect, useState } from 'react';

export default function Layout({ children }: { children?: React.ReactNode }) {
  const [isDarkMode, _isDarkMode] = useState(true);
  const themeColor = isDarkMode ? '#0c0541' : '#00a0fd'

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    _isDarkMode(darkModeQuery.matches);

    const handleDarkModeChange = (e: any) => {
      _isDarkMode(e.matches);
    };

    darkModeQuery.addEventListener("change", handleDarkModeChange);

    return () => {
      darkModeQuery.removeEventListener("change", handleDarkModeChange);
    };
  }, []);

  return (
    <>
      <meta name='theme-color' content={themeColor} />
      <Gheader />
      {children}
      <Gfooter />
    </>
  )
}
