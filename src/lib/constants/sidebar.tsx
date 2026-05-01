import {
  LayoutDashboardIcon,
  FolderIcon,
  UsersIcon,
  FileTextIcon,
  Settings2Icon,
  BanknoteIcon,
} from 'lucide-react';

export const getSidebarData = (role: 'Client' | 'Freelancer' = 'Client') => ({
  navMain: [
    {
      title: 'الرئيسية',
      url: '/dashboard',
      icon: <LayoutDashboardIcon />,
    },
    role === 'Client'
      ? {
          title: 'مشاريعي',
          url: '/dashboard/my-projects',
          icon: <FolderIcon />,
        }
      : {
          title: 'المشاريع',
          url: '/dashboard/projects',
          icon: <FolderIcon />,
        },

    {
      title: 'النزاعات',
      url: '/dashboard/disputes',
      icon: <FileTextIcon />,
    },
  ],
  navSecondary: [],
});
