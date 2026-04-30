'use client';

import * as React from 'react';

import {
  NavMain
} from '@/app/dashboard/_components/nav-main';
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
} from '@/components/ui/sidebar';
import {
  LayoutDashboardIcon,
  FolderIcon,
  UsersIcon,
  FileTextIcon,
  Settings2Icon,
  BanknoteIcon,
  Shield,
} from 'lucide-react';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'الرئيسية',
      url: '/dashboard',
      icon: <LayoutDashboardIcon />,
    },
    {
      title: 'المشاريع',
      url: '/dashboard/projects',
      icon: <FolderIcon />,
    },
    {
      title: 'العملاء',
      url: '/dashboard/clients',
      icon: <UsersIcon />,
    },
    {
      title: 'النزاعات',
      url: '/dashboard/disputes',
      icon: <FileTextIcon />,
    },
    {
      title: 'سحب الأموال',
      url: '/dashboard/withdrawals',
      icon: <BanknoteIcon />,
    },
  ],
  navSecondary: [
    {
      title: 'الإعدادات',
      url: '/dashboard/settings',
      icon: <Settings2Icon />,
    },
  ],
};
export function AppSidebar({
  sessionUser,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  sessionUser?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    avatarColor?: string | null;
  };
}) {
  const user = {
    name: sessionUser?.name || 'مستخدم غير معروف',
    email: sessionUser?.email || '',
    avatar: sessionUser?.image || '',
    avatarColor: sessionUser?.avatarColor || '#ccc',
  };

  return (
    <Sidebar side="right" collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<Link href="/" />}
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
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
