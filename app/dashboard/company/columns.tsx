"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CompanyBasic } from "@/app/models/models"
const CompanySelectColumns: ColumnDef<CompanyBasic>[] = [
    {
        accessorKey: "id",
        header: "ID",
    },
    {
        accessorKey: "name",
        header: "Name",
    }
]
export default CompanySelectColumns;

