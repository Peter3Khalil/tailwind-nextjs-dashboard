'use client';
import ThemeChanger from '@/components/ThemeChanger';
import { NAVIGATION_ITEMS } from '@/constants';
import useMediaQuery from '@/hooks/useMediaQuery';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import { ArrowLeftIcon } from './shared/Icons';
import MyTooltip from './shared/MyTooltip';

const SIDEBAR_ICON_SIZE = 20;

interface SidebarProps extends React.ComponentProps<'aside'> {}
const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();
  const { isMatched: isTablet } = useMediaQuery({
    minWidth: 640,
    maxWidth: 768,
  });
  const toggleSidebar = useCallback(() => {
    if (isTablet) return;
    setIsOpened((prev) => !prev);
  }, [isTablet]);
  const isActive = (href: string) => pathname.includes(href);
  useEffect(() => {
    if (isTablet) setIsOpened(false);
  }, [isTablet]);
  return (
    <aside
      className={cn(
        'relative hidden h-full w-52 min-w-fit max-w-52 flex-col border-r duration-300 sm:flex',
        className,
        {
          'w-12': !isOpened,
        },
      )}
      {...props}
    >
      <nav className="relative flex flex-1 flex-col gap-2 bg-background px-3 pt-12 text-foreground">
        {Object.entries(NAVIGATION_ITEMS).map(([key, value]) => (
          <MyTooltip
            className={cn({
              hidden: isOpened,
            })}
            key={key}
            content={value.name}
            side="right"
          >
            <Link href={value.href}>
              <div
                className={cn(
                  'flex items-center rounded p-2 font-medium text-muted-foreground duration-300 hover:bg-accent hover:text-foreground',
                  {
                    'bg-accent text-foreground': isActive(value.href),
                  },
                )}
              >
                <value.icon
                  size={SIDEBAR_ICON_SIZE}
                  className={cn('mx-auto shrink-0', {
                    'm-0': isOpened,
                  })}
                />
                <span
                  className={cn(
                    'ml-2 w-1 min-w-fit text-sm leading-none duration-300',
                    {
                      'collapse ml-0 w-0 min-w-0 overflow-hidden': !isOpened,
                    },
                  )}
                >
                  {value.name}
                </span>
              </div>
            </Link>
          </MyTooltip>
        ))}
      </nav>
      {isTablet ? null : (
        <MyTooltip asChild content={isOpened ? 'Close' : 'Open'} side="right">
          <button
            onClick={toggleSidebar}
            className="absolute right-0 top-3 z-30 translate-x-[50%] rounded-full border bg-background p-1"
          >
            <ArrowLeftIcon
              size={16}
              className={cn({
                'rotate-180 transform': !isOpened,
              })}
            />
          </button>
        </MyTooltip>
      )}
      <div className="p-3">
        <ThemeChanger />
      </div>
    </aside>
  );
};

export default Sidebar;
