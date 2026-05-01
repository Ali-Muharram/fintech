import { 
  LayoutDashboard, 
  FolderIcon, 
  UsersIcon, 
  FileTextIcon, 
  Settings2Icon, 
  ShieldAlert 
} from 'lucide-react';
import React from 'react';

export const ADMIN_SIDEBAR_DATA = {
  navMain: [
    {
      title: 'الرئيسية',
      url: '/admin',
      icon: <LayoutDashboard />,
    },
    {
      title: 'المشاريع',
      url: '/admin/projects',
      icon: <FolderIcon />,
    },
    {
      title: 'المستخدمين',
      url: '/admin/users',
      icon: <UsersIcon />,
    },
    {
      title: 'النزاعات',
      url: '/admin/disputes',
      icon: <ShieldAlert />,
    },
  ],
  navSecondary: [],
};
