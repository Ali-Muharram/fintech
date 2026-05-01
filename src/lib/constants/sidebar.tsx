import {
  LayoutDashboardIcon,
  FolderIcon,
  UsersIcon,
  FileTextIcon,
  Settings2Icon,
  BanknoteIcon,
} from 'lucide-react';

export const SIDEBAR_DATA = {
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
