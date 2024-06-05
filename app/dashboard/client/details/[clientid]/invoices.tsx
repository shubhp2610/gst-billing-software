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
import { ClientParticulars, DB_Client, DB_Invoice_Data, DB_Particulars } from "@/app/models/models"
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
import { SelectSingleEventHandler } from "react-day-picker";


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




export default function InvoiceTable({ clientID }: { clientID: string }) {
  const [cookiez, setCookiez] = useCookies();
  const [invoiceData, setInvoiceData] = React.useState<DB_Invoice_Data[]>([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const fetchParticulars = async () => {
      const formData = new FormData();
      console.log(clientID);
      formData.append('clientId', clientID);
      const response = await fetch(`/api/invoice/get`,
        {
          method: 'POST',
          body: formData,
        })
      const data = await response.json();
      setInvoiceData(data.output.reverse());
      setLoading(false);
      console.log(data.output);
    }
    fetchParticulars();
  }, [cookiez]);



  return (
    <>
      {loading == true ?
        <Card key="loading">
          <CardContent className="flex space-y-2 p-4 justify-center">
            <div>
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            </div>
          </CardContent>
        </Card>
        :
        invoiceData.map((invoice) => {
          if (invoice != undefined) {
            return (
              <Card key={invoice.id}>
                <CardContent className="space-y-2 p-4">
                  <div className="flex justify-between items-center">
                    <div className="text-base">
                      Invoice Number : <b>{invoice.invoice_no}</b><br />
                      <span className="text-sm">Date : <b>{invoice.date}</b></span>
                      <span className="ml-4 text-sm">GST : <b>{invoice.gst ? 'YES' : 'NO'}</b></span>
                    </div>
                    <div>
                      <Button onClick={()=>{window.location.assign('/invoice/'+invoice.id)}}>View</Button>
                      <Button className="ml-3" variant="destructive">Delete</Button>
                    </div>
                  </div>
                  {invoice.particulars.map((particular) => {
                    return (
                      <span className="border-black border bordr rounded p-1 mr-2 text-sm">
                        {particular.particulars} - <b>{particular.amount}</b>
                      </span>
                    )
                  })}
                </CardContent>
              </Card>
            );
          }
        })
      }
    </>
  );

}
