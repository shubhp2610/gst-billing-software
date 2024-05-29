"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClientParticulars } from "@/app/models/models"
const ClientParticularsColumns: ColumnDef<ClientParticulars>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
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
    }
]
export default ClientParticularsColumns;

