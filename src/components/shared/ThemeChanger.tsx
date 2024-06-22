'use client';

import React, { FC } from 'react';
import { MoonIcon, SunIcon } from '@/components/shared/Icons';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SIDEBAR_ICON_SIZE } from '@/constants';

interface ThemeChangerProps
  extends React.ComponentProps<typeof DropdownMenuTrigger> {}

const ThemeChanger: FC<ThemeChangerProps> = (props) => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger {...props} asChild>
        <Button variant="outline" size="icon">
          <SunIcon
            size={SIDEBAR_ICON_SIZE}
            className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
          />
          <MoonIcon
            size={SIDEBAR_ICON_SIZE}
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
