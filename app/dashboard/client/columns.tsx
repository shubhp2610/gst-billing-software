"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ClientBasic } from "@/app/models/models"
const ClientSelectColumns: ColumnDef<ClientBasic>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    }
]
export default ClientSelectColumns;

