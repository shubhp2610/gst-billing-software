"use client"
import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { CompanyBasic } from '@/app/models/models';
import { getCookie, setCookie } from "cookies-next";
import { fetchUser } from "@/lib/client_authUtil";
import { checkJWT, decodeJWT } from "@/lib/jwtUtil";

const companies: CompanyBasic[] = [
  {
    id: 1,
    name: 'Company 1',
  },
  {
    id: 32,
    name: 'Company 2',
  },
  {
    id: 33,
    name: 'Company 3',
  }, {
    id: 41,
    name: 'Company 1',
  },
  {
    id: 42,
    name: 'Company 2',
  },
  {
    id: 43,
    name: 'Company 3',
  }, {
    id: 51,
    name: 'Company 1',
  },
  {
    id: 52,
    name: 'Company 2',
  },
  {
    id: 53,
    name: 'Company 3',
  }, {
    id: 61,
    name: 'Company 1',
  },
  {
    id: 62,
    name: 'Company 2',
  },
  {
    id: 63,
    name: 'Company 3',
  }, {
    id: 71,
    name: 'Company 1',
  },
  {
    id: 72,
    name: 'Company 2',
  },
  {
    id: 73,
    name: 'Company 3',
  }
];

const columns: ColumnDef<CompanyBasic>[] = [
  {
    id: "select",
    // header: ({ table }) => (
    //   <Checkbox
    //     checked={
    //       table.getIsAllPageRowsSelected() ||
    //       (table.getIsSomePageRowsSelected() && "indeterminate")
    //     }
    //     onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //     aria-label="Select all"
    //   />
    // ),
    // cell: ({ row }) => (
    //   <Checkbox
    //     checked={row.getIsSelected()}
    //     onCheckedChange={(value) => row.toggleSelected(!!value)}
    //     aria-label="Select row"
    //   />
    // ),
    enableSorting: false,
    enableHiding: false,
  },
  //   {
  //     accessorKey: "id",
  //     header: "ID",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("id")}</div>
  //     ),
  //   },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-xl font-semibold"><Button variant="ghost" className="text-lg" onClick={() => { console.log(row.original) }}>{row.getValue("name")}</Button></div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const company = row.original;

      return (
        <div className="text-right">
          <Button variant="outline" className="mr-4">Edit</Button>
          <Button onClick={() => { console.log(company) }}>Select</Button>
        </div>
      );
    },
  },
];

export default function CompanyPage() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const handleWindowLoad = () => {
      const data = getCookie('userid') as string;

      const userData = decodeJWT(data)
      if (!userData) {
        setCookie('userid', '', { maxAge: 0 })
        window.location.href = '/'
      }
      if (data) {
        setUserData(data);
      }
    };

    if (document.readyState === 'complete') {
      // Document is already ready
      handleWindowLoad();
      console.log(userData);
    } else {
      // Attach event listener
      window.addEventListener('load', handleWindowLoad);
      return () => window.removeEventListener('load', handleWindowLoad);
    }
  }, []);

  const table = useReactTable({
    data: companies,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div>
      <div className="flow-root">
        <h1 className="float-left text-3xl font-bold">Select Company</h1>
        <Button className="float-right">Add Company</Button>
      </div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Company..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (table.getRowModel().rows?.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredRowModel().rows.length} company(s).
          </div>
        </div>
      </div>
    </div>
  );

}
