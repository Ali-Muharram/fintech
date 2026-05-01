'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import {
  CheckCircle2,
  Loader2,
  Clock,
  User,
} from 'lucide-react';
import { z } from 'zod';

import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

// Simple Schema for Project Data
export const projectSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string(),
  client: z.string(),
  status: z.string(),
  price: z.string(),
  createdAt: z.string(),
});

type Project = z.infer<typeof projectSchema>;

const columns: ColumnDef<Project>[] = [
  {
    accessorKey: 'name',
    header: 'اسم المشروع',
    cell: ({ row }) => (
      <div className="font-semibold text-foreground">
        {row.original.name}
      </div>
    ),
  },
  {
    accessorKey: 'client',
    header: 'العميل',
    cell: ({ row }) => (
      <div className="flex items-center gap-2 justify-end">
        <span className="text-sm font-medium">{row.original.client}</span>
        <Avatar className="h-6 w-6 border">
          <AvatarFallback className="text-[10px] bg-muted uppercase">
            {row.original.client.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: 'الحالة',
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <Badge variant="outline" className="gap-1.5 font-medium border-muted-foreground/20">
          {status === 'Completed' ? (
            <CheckCircle2 className="size-3 text-green-500" />
          ) : status === 'Active' ? (
            <Loader2 className="size-3 animate-spin text-blue-500" />
          ) : (
            <Clock className="size-3 text-amber-500" />
          )}
          {status === 'Active'
            ? 'نشط'
            : status === 'Completed'
            ? 'مكتمل'
            : status === 'Cancelled'
            ? 'ملغي'
            : status === 'OnHold'
            ? 'قيد الانتظار'
            : status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'price',
    header: 'السعر',
    cell: ({ row }) => (
      <div className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
        {row.original.price}
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'تاريخ الإنشاء',
    cell: ({ row }) => (
      <div className="text-muted-foreground text-xs">
        {row.original.createdAt}
      </div>
    ),
  },
];

export function DataTable({
  data,
}: {
  data: Project[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-sm">
      <Table>
        <TableHeader className="bg-muted/30">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-right h-11 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-muted/30 transition-colors border-b last:border-0"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 px-4 text-right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-32 text-center text-muted-foreground">
                لا توجد مشاريع حالية.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
