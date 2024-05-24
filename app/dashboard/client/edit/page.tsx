"use client"

import Link from "next/link"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useState } from "react"
import { inputCapital } from "@/lib/utils"
export default function ProfileForm() {
    const [selectedOption, setSelectedOption] = useState('Gujarat (24)')
    return (
        <div className="m-4">
            <Form>
                <form className="space-y-8">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Client Settings
                    </h2>
                    <Card className="p-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="name">Name</Label>
                                    <Input type="text" id="name" onChange={inputCapital} />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="address1">Address</Label>
                                <Input type="text" id="address" onChange={inputCapital}/>
                            </div>
                        </div>
                    </Card>
                    <Button type="submit">Update Company</Button>
                </form>
            </Form>
        </div>
    )
}