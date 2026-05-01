'use client';

import * as React from 'react';

import { NavMain } from '@/app/dashboard/_components/nav-main';
import { NavSecondary } from '@/app/dashboard/_components/nav-secondary';
import { NavUser } from '@/app/dashboard/_components/nav-user';
import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Shield } from 'lucide-react';
import { SIDEBAR_DATA } from '@/lib/constants/sidebar';

import { AuthUser } from '@/lib/types/auth';

export function AppSidebar({
  sessionUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  sessionUser?: AuthUser;
}) {
  const { setOpenMobile } = useSidebar();
  const user: AuthUser = {
    name: sessionUser?.name || 'مستخدم غير معروف',
    email: sessionUser?.email || '',
    avatarColor: sessionUser?.avatarColor || '#ccc',
    id: sessionUser?.id || '',
    image: sessionUser?.image || '',
  };

  return (
    <Sidebar side="right" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={
                <Link
                  href="/"
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                />
              }
            >
              <div className="bg-foreground text-background flex size-6 items-center justify-center rounded-md">
                <Shield className="size-4" />
              </div>
              <span className="text-base font-semibold">ORVIS</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SIDEBAR_DATA.navMain} />
        <NavSecondary items={SIDEBAR_DATA.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
