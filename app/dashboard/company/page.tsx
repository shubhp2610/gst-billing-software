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

import { CompanyBasic, DB_Company } from '@/app/models/models';
import { getCookie, setCookie } from "cookies-next";

import { checkJWT, decodeJWT } from "@/lib/jwtUtil";
import { useCookies } from 'react-cookie';
import { set } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import { redirect } from "next/dist/server/api-utils";
import { usePathname } from "next/navigation";
import { Icons } from "@/components/icons";


const columns: ColumnDef<DB_Company>[] = [
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
          <Button variant="outline" className="mr-4" onClick={()=>{window.location.assign('/dashboard/company/edit/'+company.id)}}>Edit</Button>
          <Button onClick={() => { 
            setCookie('company', company.name, { maxAge: 60 * 60 * 24 * 7 });
            setCookie('companyId', company.id, { maxAge: 60 * 60 * 24 * 7 });
            window.location.assign('/dashboard/client');
           }}>Select</Button>
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
  const [userCookie, setUserCookie] = useCookies(['userid']);
  const [companyData, setCompanyData] = useState<DB_Company[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCompanies = async () => {
      const formData = new FormData();
      formData.append("prefix", userData.symbol);

      const companies = await fetch('/api/company/get', {
        method: 'POST',
        body: formData
      })
      if (companies.status !== 200 && companies.status !== 404) {
        setError("Error Fetching Company Data");
      }
      const fetchedData = await companies.json();
      console.log(fetchedData);
      setLoading(false);
      setCompanyData(fetchedData.company);
      console.log(companyData);
      //setCompanyData(companies);
    }

    const userData = decodeJWT(userCookie.userid)
    if (!userData) {
      setCookie('userid', '', { maxAge: 0 })
      window.location.href = '/'
    }
    if (userData) {
      console.log(userData);
      fetchCompanies();
    };
  }, [userCookie]);

  const table = useReactTable({
    data: companyData,
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
        <Button className="float-right" onClick={() => { window.location.assign('/dashboard/company/edit/new'); }}>Add Company</Button>
      </div>
      <div className="w-full">
        {error != "" && <Alert variant="destructive">{error}</Alert>}
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
                    {loading ? (
                     <center><Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" /></center>
                    ) : "No results"}
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
