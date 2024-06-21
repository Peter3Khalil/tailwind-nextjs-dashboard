'use client';
import { NAVIGATION_ITEMS } from '@/constants/NAVIGATION_ITEMS';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FC } from 'react';
interface MobileNavProps extends React.HTMLAttributes<HTMLDivElement> {}
const MobileNav: FC<MobileNavProps> = ({ className, ...props }) => {
  const items = Object.entries(NAVIGATION_ITEMS);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <nav
      className={cn(
        'fixed bottom-6 left-[50%] z-50 flex w-[85%] translate-x-[-50%] items-center justify-center gap-6 rounded-full border bg-transparent px-4 py-2 backdrop-blur-sm sm:hidden',
        className,
      )}
      {...props}
    >
      {items.map(([key, value]) => (
        <Link
          key={key}
          href={value.href}
          className={cn(
            'flex flex-col items-center text-muted-foreground duration-300',
            {
              'scale-110 text-foreground': isActive(value.href),
            },
          )}
        >
          <value.icon size={20} />
          <span className="text-xs">{value.name}</span>
        </Link>
      ))}
    </nav>
  );
};

export default MobileNav;
