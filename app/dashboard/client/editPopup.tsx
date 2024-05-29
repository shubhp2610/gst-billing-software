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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
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
import { Icons } from "@/components/icons";
interface editProps {
    id: number,
    name: string,
    address: string
}

const EditClient: React.FC<editProps> = ({ id, name, address }) => {
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [loading2, setLoading2] = React.useState(false);
    const handleClientEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoading2(true);
        e.preventDefault()
        //console print form data
        const formData = new FormData(e.currentTarget);
        const added = await fetch('/api/client/edit', {
            method: 'POST',
            body: formData
        });
        if (added.status == 200) {
            setMessage("Client Edited Successfully!");
            setLoading2(false);
            setCookie('reload', 'true', { maxAge: 1 })
        } else {
            setError("Error Updating Client");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter client details</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleClientEdit}>
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
                                defaultValue={name}
                                onChange={inputCapital}
                            />
                            <Label htmlFor="address">
                                Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                defaultValue={address}
                                onChange={inputCapital}
                            />
                            <Input
                                type="hidden"
                                name="id"
                                value={id}
                            />
                        </div>
                    </div>
                    <div className="float-right">
                        <Button type="submit">

                            {loading2 &&
                                <center><Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" /></center>
                            } Update Client
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    );
};

export default EditClient;
