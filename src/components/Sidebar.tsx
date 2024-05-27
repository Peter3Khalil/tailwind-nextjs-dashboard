'use client';
import { NAVIGATION_ITEMS } from '@/constants/navigations';
import { cn } from '@/lib/utils';
import { Package2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ComponentProps, FC } from 'react';
import MyTooltip from './shared/MyTooltip';
interface SidebarProps extends React.ComponentProps<'aside'> {}
const Sidebar: FC<SidebarProps> = ({ className, ...props }) => {
  const { settings, ...rest } = NAVIGATION_ITEMS;
  const items = Object.entries(rest);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex',
        className,
      )}
      {...props}
    >
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="#"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        {items.map(([key, value]) => (
          <MyTooltip content={value.name} key={key}>
            <NavItem href={value.href} isActive={isActive(value.href)}>
              <value.icon className="h-5 w-5" />
              <span className="sr-only">{value.name}</span>
            </NavItem>
          </MyTooltip>
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <MyTooltip content={settings.name}>
          <NavItem href={settings.href} isActive={isActive(settings.href)}>
            <settings.icon className="h-5 w-5" />
            <span className="sr-only">{settings.name}</span>
          </NavItem>
        </MyTooltip>
      </nav>
    </aside>
  );
};

interface NavItemProps extends ComponentProps<typeof Link> {
  isActive?: boolean;
}
const NavItem: FC<NavItemProps> = ({
  children,
  href,
  isActive = false,
  className,
  ...props
}) => {
  return (
    <Link
      href={href}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8',
        className,
        {
          'text-foreground': isActive,
        },
      )}
      {...props}
    >
      {children}
    </Link>
  );
};

export default Sidebar;
