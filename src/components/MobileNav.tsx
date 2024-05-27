'use client';
import { NAVIGATION_ITEMS } from '@/constants/navigations';
import Link from 'next/link';
import { Package2Icon, PanelLeftIcon } from './shared/Icons';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const items = Object.entries(NAVIGATION_ITEMS);
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  return (
    <Sheet open={open}>
      <SheetTrigger onClick={() => setOpen((prev) => !prev)} asChild>
        <Button size="icon" variant="outline" className="sm:hidden">
          <PanelLeftIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="sm:max-w-xs">
        <nav className="grid gap-6 text-lg font-medium">
          <Link
            href="/dashboard"
            className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
          >
            <Package2Icon className="h-5 w-5 transition-all group-hover:scale-110" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {items.map(([key, value]) => (
            <Link
              key={key}
              href={value.href}
              className={cn(
                'flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground',
                {
                  'text-foreground': isActive(value.href),
                },
              )}
            >
              <value.icon className="h-5 w-5" />
              {value.name}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
