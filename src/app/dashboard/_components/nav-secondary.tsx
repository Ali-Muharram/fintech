'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';

export function NavSecondary({
  items,
  ...props
}: {
  items: {
    title: string;
    url: string;
    icon: React.ReactNode;
  }[];
} & React.ComponentPropsWithoutRef<typeof SidebarGroup>) {
  const pathname = usePathname();
  const { setOpenMobile } = useSidebar();

  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url !== '/dashboard' && pathname.startsWith(item.url));
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  isActive={isActive}
                  className={`h-11 transition-colors ${isActive ? 'bg-accent/80 text-foreground font-semibold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 font-medium'}`}
                >
                  <Link
                    href={item.url}
                    onClick={() => setOpenMobile(false)}
                    className="flex items-center gap-3"
                  >
                    <div
                      className={
                        isActive
                          ? 'text-accent-foreground'
                          : 'text-foreground/70'
                      }
                    >
                      {item.icon}
                    </div>
                    <span className="text-[15px]">{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
