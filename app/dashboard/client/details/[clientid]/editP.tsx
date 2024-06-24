"use client"

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Icons } from "@/components/icons";
import { useState } from "react";
import { setCookie } from "cookies-next";
interface editParticulate {
    clientid: string,
    id: number,
    particulars: string,
    type: string,
    amount: string,
    year2: string,
    date2: string
}
const EditParticulate: React.FC<editParticulate> = ({ clientid, id, particulars, type, amount, year2, date2 }) => {
    const [rowSelection, setRowSelection] = useState({});
    const [showInvoiceButton, setShowInvoiceButton] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [selectedOption, setSelectedOption] = useState(year2);
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(particulars)
    const [newParticulate, setNewParticulate] = useState(particulars);
    const [day, month, year] = date2.split('-').map(Number);
    const [date, setDate] = React.useState<Date | undefined>(new Date(year, month - 1, day))
    const [loadingAdded, setLoadingAdded] = useState(false)

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
    const generateYearRanges = (startYear: number, numOfRanges: number) => {
        const ranges = [];
        for (let i = 0; i < numOfRanges; i++) {
            const endYear = startYear - i;
            const startRange = endYear - 1;
            ranges.push(`${startRange}-${endYear}`);
        }
        return ranges;
    };

    const yearRanges = generateYearRanges(2024, 5);

    const handleEditParticulate = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoadingAdded(true);
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const added = await fetch('/api/particulate/edit', {
            method: 'POST',
            body: formData
        });
        if (added.status == 200) {
            setMessage("Particulate Updated Successfully!");
            setLoadingAdded(false);
            setCookie('reload', 'true', { maxAge: 1 })
        } else {
            setError("Error Updating Particulate");
        }
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Enter particulates details</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleEditParticulate}>
                    {error != "" && <Alert variant="destructive">{error}</Alert>}
                    {message != "" && <Alert variant="default" className="bg-green-700 text-white mb-3">{message}</Alert>}
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="grid flex-1 gap-2">
                            <Input type="hidden" name="clientId" value={clientid} />
                            <Input type="hidden" name="id" value={id} />
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
                                            : "Select particulate..."}
                                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-[400px] p-0">
                                    <Command>
                                        <CommandInput
                                            placeholder="Search particulate..."
                                            className="uppercase"
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !pValues.includes((e.target as HTMLInputElement).value)) {
                                                    setValue((e.target as HTMLInputElement).value.toUpperCase());
                                                    setNewParticulate((e.target as HTMLInputElement).value.toUpperCase());
                                                    setOpen(false);
                                                }
                                            }}
                                        />
                                        <CommandEmpty>No particulate found.</CommandEmpty>
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
                                            <SelectItem value={range} key={range}>
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
                                defaultValue={type}
                                onChange={inputCapital}
                            />
                            <Label htmlFor="amount">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                defaultValue={amount}
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
                            {loadingAdded && <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" />} Update Particulate
                        </Button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default EditParticulate;