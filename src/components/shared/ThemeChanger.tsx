'use client';

import { MoonIcon, SunIcon } from '@/components/shared/Icons';
import { useTheme } from 'next-themes';
import React, { FC, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ThemeChangerProps
  extends React.ComponentProps<typeof DropdownMenuTrigger> {}

const ThemeChanger: FC<ThemeChangerProps> = (props) => {
  const { setTheme, theme } = useTheme();
  useEffect(() => {
    if (theme) localStorage.setItem('theme', theme);
    if (localStorage.getItem('theme')) {
      setTheme(localStorage.getItem('theme') as string);
    }
  }, [setTheme, theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...props} asChild>
        <Button variant="outline" size="icon">
          <SunIcon
            size={20}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            size={20}
            className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
          />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mx-2" align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeChanger;
