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
export default function ProfileForm() {
    const [selectedOption, setSelectedOption] = useState('Gujarat (24)')
    return (
        <div className="m-4">
            <Form>
                <form className="space-y-8">
                    <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                        Company Settings
                    </h2>
                    <Card className="p-4">
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="name">Name</Label>
                                    <Input type="text" id="name" defaultValue="H N PATEL & ASSOCIATES" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="designation">Designation</Label>
                                    <Input type="text" id="designation" defaultValue="PROPRIETOR" />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="address1">Address Line 1</Label>
                                <Input type="text" id="address1" defaultValue="126, 2ND FLOOR, ATLANTA SHOPPING MALL" />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="address2">Address Line 2</Label>
                                <Input type="text" id="address2" defaultValue="ALTHAN" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="city">City</Label>
                                    <Input type="text" id="city" defaultValue="SURAT" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="pincode">Pin Code</Label>
                                    <Input type="text" id="pincode" defaultValue="395017" />
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
                                                <SelectItem value="Gujarat (24)">Gujarat (24)</SelectItem>
                                                <SelectItem value="Jammu and Kashmir (01)">Jammu and Kashmir (01)</SelectItem>
                                                <SelectItem value="Himachal Pradesh (02)">Himachal Pradesh (02)</SelectItem>
                                                <SelectItem value="Punjab (03)">Punjab (03)</SelectItem>
                                                <SelectItem value="Chandigarh (04)">Chandigarh (04)</SelectItem>
                                                <SelectItem value="Uttarakhand (05)">Uttarakhand (05)</SelectItem>
                                                <SelectItem value="Haryana (06)">Haryana (06)</SelectItem>
                                                <SelectItem value="Delhi (07)">Delhi (07)</SelectItem>
                                                <SelectItem value="Rajasthan (08)">Rajasthan (08)</SelectItem>
                                                <SelectItem value="Uttar Pradesh (09)">Uttar Pradesh (09)</SelectItem>
                                                <SelectItem value="Bihar (10)">Bihar (10)</SelectItem>
                                                <SelectItem value="Sikkim (11)">Sikkim (11)</SelectItem>
                                                <SelectItem value="Arunachal Pradesh (12)">Arunachal Pradesh (12)</SelectItem>
                                                <SelectItem value="Nagaland (13)">Nagaland (13)</SelectItem>
                                                <SelectItem value="Manipur (14)">Manipur (14)</SelectItem>
                                                <SelectItem value="Mizoram (15)">Mizoram (15)</SelectItem>
                                                <SelectItem value="Tripura (16)">Tripura (16)</SelectItem>
                                                <SelectItem value="Meghalaya (17)">Meghalaya (17)</SelectItem>
                                                <SelectItem value="Assam (18)">Assam (18)</SelectItem>
                                                <SelectItem value="West Bengal (19)">West Bengal (19)</SelectItem>
                                                <SelectItem value="Jharkhand (20)">Jharkhand (20)</SelectItem>
                                                <SelectItem value="Odisha (21)">Odisha (21)</SelectItem>
                                                <SelectItem value="Chhattisgarh (22)">Chhattisgarh (22)</SelectItem>
                                                <SelectItem value="Madhya Pradesh (23)">Madhya Pradesh (23)</SelectItem>
                                                <SelectItem value="Dadra and Nagar Haveli and Daman and Diu (26)">Dadra and Nagar Haveli and Daman and Diu (26)</SelectItem>
                                                <SelectItem value="Maharashtra (27)">Maharashtra (27)</SelectItem>
                                                <SelectItem value="Karnataka (29)">Karnataka (29)</SelectItem>
                                                <SelectItem value="Goa (30)">Goa (30)</SelectItem>
                                                <SelectItem value="Lakshadweep (31)">Lakshadweep (31)</SelectItem>
                                                <SelectItem value="Kerala (32)">Kerala (32)</SelectItem>
                                                <SelectItem value="Tamil Nadu (33)">Tamil Nadu (33)</SelectItem>
                                                <SelectItem value="Puducherry (34)">Puducherry (34)</SelectItem>
                                                <SelectItem value="Andaman and Nicobar Islands (35)">Andaman and Nicobar Islands (35)</SelectItem>
                                                <SelectItem value="Telangana (36)">Telangana (36)</SelectItem>
                                                <SelectItem value="Andhra Pradesh (37)">Andhra Pradesh (37)</SelectItem>
                                                <SelectItem value="Ladakh (Newly Added) (38)">Ladakh (Newly Added) (38)</SelectItem>
                                                <SelectItem value="Other Territory (97)">Other Territory (97)</SelectItem>
                                                <SelectItem value="Centre Jurisdiction (99)">Centre Jurisdiction (99)</SelectItem>
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
                                    <Input type="email" id="email" defaultValue="CAHNPATEL307@GMAIL.COM" />
                                </div>

                                <div className="w-full items-center">
                                    <Label htmlFor="pan">PAN</Label>
                                    <Input type="text" id="pan" defaultValue="BSFPP0376J" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="gstin">GSTIN</Label>
                                    <Input type="text" id="gstin" />
                                </div>

                            </div>
                            <p className="text-xl">Payment Terms</p>
                            <div className="w-full items-center">
                                <Label htmlFor="favour">In favour of</Label>
                                <Input type="text" id="favour" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="bankname">Bank Name</Label>
                                    <Input type="text" id="bankname" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="branch">Bank Branch</Label>
                                    <Input type="text" id="branch" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="account">Account No.</Label>
                                    <Input type="text" id="account" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="ifscode">IFS Code</Label>
                                    <Input type="text" id="ifscode" />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="comments">Comments</Label>
                                <Textarea id="comments" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="w-full items-center">
                                    <Label htmlFor="signatory">Authorised Signatory</Label>
                                    <Input type="text" id="signatory" />
                                </div>
                                <div className="w-full items-center">
                                    <Label htmlFor="designation">Designation</Label>
                                    <Input type="text" id="designation" />
                                </div>
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" />
                            </div>
                        </div>
                    </Card>
                    <Button type="submit">Update Company</Button>
                </form>
            </Form>
        </div>
    )
}