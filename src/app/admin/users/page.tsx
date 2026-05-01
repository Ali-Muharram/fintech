'use client';

import { useAdminUsers } from '../_hooks/use-admin';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function AdminUsersPage() {
  const { data: users, isLoading } = useAdminUsers();

  if (isLoading) return <Skeleton className="h-[600px] w-full rounded-2xl" />;

  return (
    <div className="flex flex-col gap-8 text-right">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">إدارة المستخدمين</h1>
        <p className="text-muted-foreground mt-1 text-sm">عرض كافة المستخدمين المسجلين في المنصة.</p>
      </div>

      <div className="grid gap-4">
        {users?.map((user: any) => (
          <Card key={user._id} className="overflow-hidden border-muted/20 bg-card/50 backdrop-blur-sm">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 border-2 border-background shadow-sm">
                  <AvatarFallback style={{ backgroundColor: user.avatarColor }} className="text-white font-bold">
                    {user.name?.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-bold text-lg">{user.name}</span>
                  <span className="text-sm text-muted-foreground">{user.email}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">نوع الحساب</span>
                  <Badge variant={user.userrole === 'Freelancer' ? 'default' : 'secondary'} className="px-3 py-0.5 rounded-full font-bold">
                    {user.userrole === 'Freelancer' ? 'مستقل' : 'عميل'}
                  </Badge>
                </div>
                
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">تاريخ الانضمام</span>
                  <span className="text-xs font-medium">{new Date(user.createdAt).toLocaleDateString('ar-EG')}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
