'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { CirclePlusIcon, MailIcon } from 'lucide-react';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ReactNode;
  }[];
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu className="space-y-2">
          {items.map((item) => {
            const isActive =
              pathname === item.url ||
              (item.url !== '/dashboard' && pathname.startsWith(item.url));
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`h-11 w-full cursor-pointer rounded-xl transition-colors ${isActive ? 'bg-accent/80 text-foreground font-semibold shadow-sm' : 'text-muted-foreground hover:text-foreground hover:bg-accent/50 font-medium'}`}
              >
                <SidebarMenuItem>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={isActive}
                    className={`h-11 w-full transition-colors`}
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
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </Link>
            );
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
