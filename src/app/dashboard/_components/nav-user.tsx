'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { EllipsisVerticalIcon, BellIcon, LogOutIcon } from 'lucide-react';

export function NavUser({
  user,
}: {
  user: {
    name: string;
    email: string;
    avatar: string;
    avatarColor?: string;
  };
}) {
  const { isMobile } = useSidebar();
  const initials = user.name ? user.name.slice(0, 2).toUpperCase() : 'UR';

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton size="lg" className="aria-expanded:bg-muted" />
            }
          >
            <Avatar className="size-8 rounded-lg grayscale">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback
                className="rounded-lg text-white"
                style={{ backgroundColor: user.avatarColor || '#333' }}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-right text-sm leading-tight">
              <span className="truncate font-medium">{user.name}</span>
              <span className="text-foreground/70 truncate text-xs">
                {user.email}
              </span>
            </div>
            <EllipsisVerticalIcon className="ml-auto size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-2xl p-2 shadow-lg"
            side={isMobile ? 'bottom' : 'top'}
            align="end"
            sideOffset={12}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-3 px-2 py-2 text-right text-sm">
                  <Avatar className="size-9 rounded-xl">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback
                      className="rounded-xl font-medium text-white shadow-sm"
                      style={{ backgroundColor: user.avatarColor || '#333' }}
                    >
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-right text-sm leading-tight">
                    <span className="truncate text-[15px] font-semibold">
                      {user.name}
                    </span>
                    <span className="text-muted-foreground mt-0.5 truncate text-xs">
                      {user.email}
                    </span>
                  </div>
                </div>
              </DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="hover:bg-accent focus:bg-accent cursor-pointer gap-3 rounded-xl p-2.5 text-[14px] font-medium transition-colors">
                <BellIcon className="text-muted-foreground size-4" />
                الإشعارات
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="my-1.5" />
            <DropdownMenuItem 
              className="cursor-pointer gap-3 rounded-xl p-2.5 text-[14px] font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700 dark:hover:bg-red-500/10 dark:focus:bg-red-500/10"
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
            >
              <LogOutIcon className="size-4" />
              تسجيل الخروج
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
