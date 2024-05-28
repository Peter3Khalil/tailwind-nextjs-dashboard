'use client';
import { NAVIGATION_ITEMS } from '@/constants/navigations';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC, useCallback, useState } from 'react';
import { ArrowLeftIcon } from './shared/Icons';
import MyTooltip from './shared/MyTooltip';
interface SidebarProps extends React.ComponentProps<'aside'> {}
const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  const [isOpened, setIsOpened] = useState(false);
  const pathname = usePathname();
  const items = Object.entries(NAVIGATION_ITEMS);
  const toggleSidebar = useCallback(() => setIsOpened((prev) => !prev), []);
  const isActive = (href: string) => pathname === href;
  return (
    <aside
      className={cn(
        'relative hidden w-52 min-w-fit max-w-52 duration-300 sm:block',
        className,
        {
          'w-12': !isOpened,
        },
      )}
      {...props}
    >
      <nav className="relative flex h-full w-full flex-col border-r bg-background px-3 pt-12 text-foreground">
        {items.map(([key, value]) => (
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
                  'prose prose-sm flex items-center rounded p-2 font-medium text-muted-foreground duration-300 hover:bg-accent hover:text-foreground',
                  {
                    'bg-accent text-foreground': isActive(value.href),
                  },
                )}
              >
                <value.icon size={24} className="shrink-0" />
                <span
                  className={cn(
                    'ml-2 w-1 min-w-fit leading-none duration-300',
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
    </aside>
  );
};

export default Sidebar;
