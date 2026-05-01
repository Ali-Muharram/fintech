'use client';

import * as React from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
} from '@tanstack/react-table';
import { Mail, MapPin, Briefcase, DollarSign } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

export type Client = {
  id: number;
  name: string;
  email: string;
  location: string;
  projectsCount: number;
  totalSpent: string;
};

const columns: ColumnDef<Client>[] = [
  {
    accessorKey: 'name',
    header: 'العميل',
    cell: ({ row }) => (
      <div className="flex items-center gap-3 text-right justify-end">
        <div className="flex flex-col">
          <span className="font-bold text-sm text-foreground">{row.original.name}</span>
          <span className="text-[10px] text-muted-foreground flex items-center gap-1 justify-end">
            {row.original.email} <Mail size={10} />
          </span>
        </div>
        <Avatar className="h-8 w-8 border">
          <AvatarFallback className="bg-muted text-xs font-bold">
            {row.original.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'الموقع',
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-muted-foreground text-xs justify-end">
        {row.original.location} <MapPin size={12} />
      </div>
    ),
  },
  {
    accessorKey: 'projectsCount',
    header: 'المشاريع',
    cell: ({ row }) => (
      <div className="flex items-center gap-1 font-medium justify-end">
        {row.original.projectsCount} <Briefcase size={12} className="text-muted-foreground" />
      </div>
    ),
  },
  {
    accessorKey: 'totalSpent',
    header: 'إجمالي المدفوعات',
    cell: ({ row }) => (
      <div className="flex items-center gap-1 font-bold text-green-600 dark:text-green-400 justify-end">
        {row.original.totalSpent} <DollarSign size={12} />
      </div>
    ),
  },
];

export function ClientsTable({ data }: { data: Client[] }) {
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
                <TableHead key={header.id} className="text-right h-11 text-xs font-bold uppercase text-muted-foreground">
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-muted/30 transition-colors border-b last:border-0">
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="py-3 px-4 text-right">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                لا يوجد عملاء مضافون بعد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
