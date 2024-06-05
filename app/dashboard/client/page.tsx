"use client";

import * as React from "react";
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
import { ArrowUpDown, ChevronDown, Edit, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useCookies } from "react-cookie";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

import { DB_Client } from '@/app/models/models';
import { decodeJWT } from "@/lib/jwtUtil";
import { setCookie } from "cookies-next";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { inputCapital } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast";
import { set } from "react-hook-form";
import { Alert } from "@/components/ui/alert";
import EditClient from "./editPopup";
import { Icons } from "@/components/icons";

const columns: ColumnDef<DB_Client>[] = [
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
      const client = row.original;

      return (
        <div className="text-right">
          <EditClient id={client.id} name={client.name} address={client.address} pan={client.pan} gstin={client.gstin} />
          <Button onClick={() => { window.location.assign('/dashboard/client/details/'+client.id) }} className="ml-4">Select</Button>
        </div>
      );
    },
  },
];

export default function CompanyPage() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [cookiez, setCookiez] = useCookies();
  const [companyName, setCompanyName] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [clientData, setClientData] = React.useState<DB_Client[]>([]);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const handleClientAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    //console print form data
    const formData = new FormData(e.currentTarget);
    const added = await fetch('/api/client/add', {
      method: 'POST',
      body: formData
    });
    if (added.status == 200) {
      setMessage("Client Added Successfully!");
      setCookie('reload', 'true', { maxAge: 1 })
    } else {
      setError("Error Adding Client");
    }
  }

  React.useEffect(() => {
    const fetchCompanies = async () => {
      const formData = new FormData();
      formData.append("prefix", userData.symbol);

      const companies = await fetch('/api/client/get', {
        method: 'POST',
        body: formData
      })
      if (companies.status !== 200 && companies.status !== 404) {
        setError("Error Fetching Company Data");
      }
      const fetchedData = await companies.json();
      console.log(fetchedData);
      setLoading(false);
      setClientData(fetchedData.clients);
      console.log(clientData);
      //setCompanyData(companies);
    }

    const userData = decodeJWT(cookiez.userid)
    if (!userData) {
      setCookie('userid', '', { maxAge: 0 })
      window.location.href = '/'
    }
    if (userData) {
      console.log(userData);
      fetchCompanies();
    };
  }, [cookiez]);
  React.useEffect(() => {
    // Client-side code to access cookies
    if (cookiez.company) {
      setCompanyName(cookiez.company);
    }
  }, [cookiez]);

  const table = useReactTable({
    data: clientData,
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
      {companyName && (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard/company">Company</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{companyName}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="flow-root">
        <h1 className="float-left text-3xl font-bold">Select Client</h1>
        <div className="float-right">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Client</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Enter client details</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleClientAdd}>
                {error != "" && <Alert variant="destructive">{error}</Alert>}
                {message != "" && <Alert variant="default" className="bg-green-700 text-white mb-3">{message}</Alert>}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="grid flex-1 gap-2">
                    <Label htmlFor="name">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      onChange={inputCapital}
                    />
                    <Label htmlFor="address">
                      Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      onChange={inputCapital}
                    />
                    <Label htmlFor="pan">
                      Pan
                    </Label>
                    <Input
                      id="pan"
                      name="pan"
                      onChange={inputCapital}
                    />
                    <Label htmlFor="gstin">
                      GSTIN
                    </Label>
                    <Input
                      id="gstin"
                      name="gstin"
                      onChange={inputCapital}
                    />
                  </div>
                </div>
                <div className="float-right">
                  <Button type="submit">
                    Add Client
                  </Button>
                </div>
              </form>

            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="w-full">
        <div className="flex items-center py-4">
          <Input
            placeholder="Filter Clients..."
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
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
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
                ))
              ) : (
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
            {table.getFilteredRowModel().rows.length} client(s).
          </div>
        </div>
      </div>
    </div>
  );
}
