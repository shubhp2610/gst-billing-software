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
    const [selectedOption, setSelectedOption] = useState('GUJARAT (24)')
    return (
        <div className="m-4">
            <Form>
                <form className="space-y-8">
                    <div className="flex items-center justify-between">
                    <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold first:mt-0">
                        Company Settings
                    </h2>
                    <Button variant="destructive">Delete Company</Button>
                    </div>
                    <Card className="p-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="name">Name</Label>
                                    <Input type="text" id="name" onChange={inputCapital} />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="designation">Designation</Label>
                                    <Input type="text" id="designation" onChange={inputCapital} />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="address1">Address Line 1</Label>
                                <Input type="text" id="address1" onChange={inputCapital} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input type="text" id="address2" onChange={inputCapital} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="city">City</Label>
                                    <Input type="text" id="city" onChange={inputCapital} />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="pincode">Pin Code</Label>
                                    <Input type="text" id="pincode" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="state">State</Label>
                                    <Select value={selectedOption}
                                        onValueChange={(value) => {
                                            setSelectedOption(value)
                                        }}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a state" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="GUJARAT (24)">GUJARAT (24)</SelectItem>
                                                <SelectItem value="JAMMU AND KASHMIR (01)">JAMMU AND KASHMIR (01)</SelectItem>
                                                <SelectItem value="HIMACHAL PRADESH (02)">HIMACHAL PRADESH (02)</SelectItem>
                                                <SelectItem value="PUNJAB (03)">PUNJAB (03)</SelectItem>
                                                <SelectItem value="CHANDIGARH (04)">CHANDIGARH (04)</SelectItem>
                                                <SelectItem value="UTTARAKHAND (05)">UTTARAKHAND (05)</SelectItem>
                                                <SelectItem value="HARYANA (06)">HARYANA (06)</SelectItem>
                                                <SelectItem value="DELHI (07)">DELHI (07)</SelectItem>
                                                <SelectItem value="RAJASTHAN (08)">RAJASTHAN (08)</SelectItem>
                                                <SelectItem value="UTTAR PRADESH (09)">UTTAR PRADESH (09)</SelectItem>
                                                <SelectItem value="BIHAR (10)">BIHAR (10)</SelectItem>
                                                <SelectItem value="SIKKIM (11)">SIKKIM (11)</SelectItem>
                                                <SelectItem value="ARUNACHAL PRADESH (12)">ARUNACHAL PRADESH (12)</SelectItem>
                                                <SelectItem value="NAGALAND (13)">NAGALAND (13)</SelectItem>
                                                <SelectItem value="MANIPUR (14)">MANIPUR (14)</SelectItem>
                                                <SelectItem value="MIZORAM (15)">MIZORAM (15)</SelectItem>
                                                <SelectItem value="TRIPURA (16)">TRIPURA (16)</SelectItem>
                                                <SelectItem value="MEGHALAYA (17)">MEGHALAYA (17)</SelectItem>
                                                <SelectItem value="ASSAM (18)">ASSAM (18)</SelectItem>
                                                <SelectItem value="WEST BENGAL (19)">WEST BENGAL (19)</SelectItem>
                                                <SelectItem value="JHARKHAND (20)">JHARKHAND (20)</SelectItem>
                                                <SelectItem value="ODISHA (21)">ODISHA (21)</SelectItem>
                                                <SelectItem value="CHHATTISGARH (22)">CHHATTISGARH (22)</SelectItem>
                                                <SelectItem value="MADHYA PRADESH (23)">MADHYA PRADESH (23)</SelectItem>
                                                <SelectItem value="DADRA AND NAGAR HAVELI AND DAMAN AND DIU (26)">DADRA AND NAGAR HAVELI AND DAMAN AND DIU (26)</SelectItem>
                                                <SelectItem value="MAHARASHTRA (27)">MAHARASHTRA (27)</SelectItem>
                                                <SelectItem value="KARNATAKA (29)">KARNATAKA (29)</SelectItem>
                                                <SelectItem value="GOA (30)">GOA (30)</SelectItem>
                                                <SelectItem value="LAKSHADWEEP (31)">LAKSHADWEEP (31)</SelectItem>
                                                <SelectItem value="KERALA (32)">KERALA (32)</SelectItem>
                                                <SelectItem value="TAMIL NADU (33)">TAMIL NADU (33)</SelectItem>
                                                <SelectItem value="PUDUCHERRY (34)">PUDUCHERRY (34)</SelectItem>
                                                <SelectItem value="ANDAMAN AND NICOBAR ISLANDS (35)">ANDAMAN AND NICOBAR ISLANDS (35)</SelectItem>
                                                <SelectItem value="TELANGANA (36)">TELANGANA (36)</SelectItem>
                                                <SelectItem value="ANDHRA PRADESH (37)">ANDHRA PRADESH (37)</SelectItem>
                                                <SelectItem value="LADAKH (NEWLY ADDED) (38)">LADAKH (NEWLY ADDED) (38)</SelectItem>
                                                <SelectItem value="OTHER TERRITORY (97)">OTHER TERRITORY (97)</SelectItem>
                                                <SelectItem value="CENTRE JURISDICTION (99)">CENTRE JURISDICTION (99)</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="phone-o">Phone No. (O)</Label>
                                    <Input type="text" id="phone-o" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="fax">Fax No.</Label>
                                    <Input type="text" id="fax" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="mobile">Mobile No.</Label>
                                    <Input type="text" id="mobile" defaultValue="8866546665" />
                                </div>
                            </div>
                            <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="email">E-mail</Label>
                                    <Input type="email" id="email" onChange={inputCapital} />
                                </div>

                                <div className="w-full items-center">
                                    <Label htmlFor="pan">PAN</Label>
                                    <Input type="text" id="pan" onChange={inputCapital} />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="gstin">GSTIN</Label>
                                    <Input type="text" id="gstin" onChange={inputCapital} />
                                </div>

                            </div>
                            <p className="text-xl">Payment Terms</p>
                            <div className="w-full items-center">
                                <Label htmlFor="favour">In favour of</Label>
                                <Input type="text" id="favour" onChange={inputCapital} />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="bankname">Bank Name</Label>
                                    <Input type="text" id="bankname" onChange={inputCapital} />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="branch">Bank Branch</Label>
                                    <Input type="text" id="branch" onChange={inputCapital} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="account">Account No.</Label>
                                    <Input type="text" id="account" onChange={inputCapital} />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="ifscode">IFS Code</Label>
                                    <Input type="text" id="ifscode" onChange={inputCapital} />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="comments">Comments</Label>
                                <Textarea id="comments" onChange={inputCapital} />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="signatory">Authorised Signatory</Label>
                                    <Input type="text" id="signatory" onChange={inputCapital} />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="designation">Designation</Label>
                                    <Input type="text" id="designation" onChange={inputCapital} />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" onChange={inputCapital} />
                            </div>
                        </div>

                    </Card>
                    <div className="text-right">
                        <Button type="submit">Save Changes</Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}