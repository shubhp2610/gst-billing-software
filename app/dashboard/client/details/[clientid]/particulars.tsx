"use client"

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { ClientParticulars, DB_Client, DB_Particulars } from "@/app/models/models"
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { inputCapital } from "@/lib/utils"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Check, ChevronsUpDown } from "lucide-react"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { format, set } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { setCookie } from "cookies-next";
import { useCookies } from "react-cookie";
import { Icons } from "@/components/icons";
import EditParticulate from "./editP";


// const particulars: ClientParticulars[] = [
//   {
//     id: 2,
//     name: "SOMETING FEE",
//     year: "2024-2023",
//     type: "OTHER",
//     amount: 4300,
//     date: "23-01-2023"
//   },
//   {
//     id: 1,
//     name: "SOMETING FEE FEE",
//     year: "2024-2023",
//     type: "OTHER",
//     amount: 4300,
//     date: "23-01-2024"
//   }
// ]




export default function ParticularsTable({ clientID }: { clientID: string }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [showInvoiceButton, setShowInvoiceButton] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedOption, setSelectedOption] = React.useState("");
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [newParticulate, setNewParticulate] = React.useState("");
  const [date, setDate] = React.useState<Date>(new Date())
  const [cookiez, setCookiez] = useCookies();
  const [particularsDetails, setParticularsDetails] = React.useState({} as DB_Particulars[])
  const [loadingAdded, setLoadingAdded] = React.useState(false)
  const [loadingDeleted, setLoadingDeleted] = React.useState(0)
  React.useEffect(() => {
    if (Object.keys(rowSelection).length > 0) {
      setShowInvoiceButton(true)
    } else {
      setShowInvoiceButton(false)
    }
  }, [rowSelection]);
  React.useEffect(() => {
    const fetchParticulars = async () => {
      const formData = new FormData();
      console.log(clientID);
      formData.append('clientId', clientID);
      const response = await fetch(`/api/particulate/get`,
        {
          method: 'POST',
          body: formData,
        })
      const data = await response.json();
      setParticularsDetails(data.particulars);
    }
    fetchParticulars();
  }, [cookiez]);

  

  const columns: ColumnDef<DB_Particulars>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "particulars",
      header: "Particulars",
    },
    {
      accessorKey: "year",
      header: "Year",
    },
    {
      accessorKey: "type",
      header: "Type",
    },
    {
      accessorKey: "amount",
      header: "Amount",
    },
    {
      accessorKey: "date",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const p = row.original;

        return (
          <div className="text-right">
            <EditParticulate clientid={p.client_id.toString()} particulars={p.particulars} id={p.id} amount={p.amount} date2={p.date} type={p.type} year2={p.year} />
            <Button variant="destructive" className="ml-4" onClick={
              async () => {
                setLoadingDeleted(p.id);
                const formData = new FormData();
                formData.append('clientId', p.client_id.toString());
                formData.append('id', p.id.toString());
                const deleted = await fetch('/api/particulate/delete', {
                  method: 'POST',
                  body: formData
                });
                if (deleted.status == 200) {
                  setCookie('reload', 'true', { maxAge: 1 })
                  setLoadingDeleted(0);
                } else {
                }
              }
            }>{p.id == loadingDeleted && <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" />} Delete</Button>
          </div>
        );
      },
    },
  ];
  const table = useReactTable({
    data: particularsDetails,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });
  const generateYearRanges = (startYear: number, numOfRanges: number) => {
    const ranges = [];
    for (let i = 0; i < numOfRanges; i++) {
      const endYear = startYear - i;
      const startRange = endYear - 1;
      ranges.push(`${endYear}-${startRange}`);
    }
    return ranges;
  };

  const yearRanges = generateYearRanges(2024, 5);
  const pValues: string[] = ["ACCOUNTING FEES",
    "TAX AUDIT FEES",
    "INCOME TAX RETURN FILING FEES",
    "CERTIFICATION FEES",
    "CMA REPORT FEES",
    "PROJECT REPORT FEES",
    "DSC FEES",
    "GST RETURN FILING FEES",
    "GST REGISTRATION FEES",
    "GSTR-9 FEES",
    "GSTR-9 & 9C FEES",
    "IMPORT EXPORT CODE FEES",
    "PAN CARD APPLICATION FEES",
    "TAN CARD APPLICATION FEES",
    "UDYAM REGISTRATION FEES"]

  const handleAddParticulate = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoadingAdded(true);
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const added = await fetch('/api/particulate/add', {
      method: 'POST',
      body: formData
    });
    if (added.status == 200) {
      setMessage("Particulate Added Successfully!");
      setLoadingAdded(false);
      setCookie('reload', 'true', { maxAge: 1 })
    } else {
      setError("Error Adding Particulate");
    }
  }

  const handleCreateInvoice = async () => {
    console.log(Object.keys(rowSelection))
    var ids="";
    for (const key in rowSelection) {
      ids+=particularsDetails[Number(key)].id+",";
    }
    const formData = new FormData();
    formData.append('clientId', clientID);
    formData.append('particulars', ids.slice(0, -1));
    formData.append('date', format(new Date(), "dd-MM-yyyy"));
    const added = await fetch('/api/invoice/add', {
      method: 'POST',
      body: formData
    });
    if (added.status == 200) {
      const data = await added.json();
      console.log(data);
      window.location.href = `/invoice/${data.message}`;
      // setMessage("Invoice Created Successfully!");
      // setCookie('reload', 'true', { maxAge: 1 })
    } else {
      // setError("Error Creating Invoice");
    }
  }

  return (
    <Card>
      <CardContent className="space-y-2 p-4">
        <div className="text-right">{showInvoiceButton && <Button className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300" onClick={handleCreateInvoice}>Create Invoice</Button>}
          <Dialog>
            <DialogTrigger asChild>
              <Button>Add Particulates</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Enter particulates details</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleAddParticulate}>
                {error != "" && <Alert variant="destructive">{error}</Alert>}
                {message != "" && <Alert variant="default" className="bg-green-700 text-white mb-3">{message}</Alert>}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="grid flex-1 gap-2">
                    <Input type="hidden" name="clientId" value={clientID} />
                    <Label htmlFor="particulate">
                      Particulate
                    </Label>
                    <input type="hidden" name="particulars" value={value} />
                    <Popover open={open} onOpenChange={setOpen}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={open}
                          className="justify-between w-full"
                        >
                          {value || newParticulate
                            ? pValues.find((pval) => pval === value) || newParticulate
                            : "Select framework..."}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[400px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search framework..."
                            className="uppercase"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && !pValues.includes((e.target as HTMLInputElement).value)) {
                                setValue((e.target as HTMLInputElement).value.toUpperCase());
                                setNewParticulate((e.target as HTMLInputElement).value.toUpperCase());
                                setOpen(false);
                              }
                            }}
                          />
                          <CommandEmpty>No framework found.</CommandEmpty>
                          <CommandGroup>
                            <CommandList>
                              {pValues.map((pval) => (
                                <CommandItem
                                  key={pval}
                                  value={pval}
                                  onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue);
                                    setNewParticulate("");
                                    setOpen(false);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      value === pval ? "opacity-100" : "opacity-0"
                                    )}
                                  />
                                  {pval}
                                </CommandItem>
                              ))}
                            </CommandList>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>

                    {/*--------------------------------------------*/}
                    <Label htmlFor="state">Year</Label>
                    <Select value={selectedOption}
                      name="year"
                      onValueChange={(value) => {
                        setSelectedOption(value)
                      }}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {yearRanges.map((range, index) => (
                            <SelectItem value={range}>
                              {range}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Label htmlFor="type">
                      Type
                    </Label>
                    <Input
                      id="type"
                      name="type"
                      onChange={inputCapital}
                    />
                    <Label htmlFor="amount">
                      Amount
                    </Label>
                    <Input
                      id="amount"
                      name="amount"
                      onChange={inputCapital}
                    />
                    <Label htmlFor="date">
                      Date
                    </Label>
                    <Input type="hidden" name="date" value={date ? format(date, "dd-MM-yyyy") : ""} />
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date ? format(date, "dd-MM-yyyy") : <span>Pick a date</span>}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="float-right">
                  <Button type="submit">
                    {loadingAdded && <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" />} Add Particulate
                  </Button>
                </div>
              </form>

            </DialogContent>
          </Dialog>
        </div>
        <div>
          <div className="w-full">
            <div className="flex items-center py-4">
              <Input
                placeholder="Filter particulars..."
                value={(table.getColumn("particulars")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("particulars")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="ml-auto">
                    Columns <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => {
                      return (
                        <DropdownMenuCheckboxItem
                          key={column.id}
                          className="capitalize"
                          checked={column.getIsVisible()}
                          onCheckedChange={(value) =>
                            column.toggleVisibility(!!value)
                          }
                        >
                          {column.id}
                        </DropdownMenuCheckboxItem>
                      );
                    })}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
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
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
              <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of{" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
              </div>
              <div className="space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card >

  )
}
