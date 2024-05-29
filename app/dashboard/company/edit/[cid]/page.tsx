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
import { FormEvent, useEffect, useState } from "react"
import { inputCapital } from "@/lib/utils"
import { useCookies } from "react-cookie"
import { getCookie, setCookie } from "cookies-next";
import { decodeJWT } from "@/lib/jwtUtil"
import { DB_Company } from "@/app/models/models"
import { useToast } from "@/components/ui/use-toast"
export default function ProfileForm({ params }: { params: { cid: string } }) {
    console.log(params);
    const { toast } = useToast()
    const [selectedOption, setSelectedOption] = useState('GUJARAT (24)')
    const [userCookie, setUserCookie] = useCookies(['userid']);
    const [companyData, setCompanyData] = useState<DB_Company | null>(null);
    const [error, setError] = useState("");
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        //console print form data
        if (params.cid == "new") {
            const formData = new FormData(e.currentTarget);
            const added = await fetch('/api/company/add', {
                method: 'POST',
                body: formData
            });
            if (added.status == 200) {
                toast({
                    title: "Company Added!",
                })
            } else {
                toast({
                    title: "Error Adding Company!",
                })
            }
        } else {
            const formData = new FormData(e.currentTarget);
            formData.append("id", params.cid)
            const added = await fetch('/api/company/edit', {
                method: 'POST',
                body: formData
            });
            if (added.status == 200) {
                toast({
                    title: "Company Updated!",
                })
            } else {
                toast({
                    title: "Error Updating Company!",
                })
            }
        }
    }

    useEffect(() => {
        const fetchCompanies = async () => {
            const formData = new FormData();
            formData.append("cid", params.cid);

            const companies = await fetch('/api/company/getOne', {
                method: 'POST',
                body: formData
            })
            if (companies.status !== 200 && companies.status !== 404) {
                setError("Error Fetching Company Data");
            } else {
                const fetchedData = await companies.json();
                console.log(fetchedData.company[0]);
                setCompanyData(fetchedData.company[0]);
                setSelectedOption(fetchedData.company[0].state);
            }

            //setCompanyData(companies);
        }

        const userData = decodeJWT(userCookie.userid)
        if (!userData) {
            setCookie('userid', '', { maxAge: 0 })
            window.location.href = '/'
        }
        if (userData && params.cid != "new") {
            console.log(userData);
            fetchCompanies();
        };
    }, [userCookie]);

    useEffect(() => {
        // This will run whenever companyData changes
        console.log("Company Data Updated:", companyData);
    }, [companyData]);

    return (
        <div className="m-4">

            <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="flex items-center justify-between">
                    <h2 className="mt-10 scroll-m-20 pb-2 text-3xl font-semibold first:mt-0">
                        Company Settings
                    </h2>
                    {params.cid != "new" && <Button variant="destructive">Delete Company</Button>}
                </div>
                <Card className="p-4">
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full items-center">
                                <Label htmlFor="name">Name</Label>
                                <Input type="text" name="name" onChange={inputCapital} defaultValue={companyData?.name || ''} required />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="designation">Designation</Label>
                                <Input type="text" name="designation" defaultValue={companyData?.designation || ''} onChange={inputCapital} />
                            </div>
                        </div>
                        <div className="w-full items-center">
                            <Label htmlFor="address1">Address Line 1</Label>
                            <Input type="text" name="address1" defaultValue={companyData?.address1 || ''} onChange={inputCapital} />
                        </div>
                        <div className="w-full items-center">
                            <Label htmlFor="address2">Address Line 2</Label>
                            <Input type="text" name="address2" defaultValue={companyData?.address2 || ''} onChange={inputCapital} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="w-full items-center">
                                <Label htmlFor="city">City</Label>
                                <Input type="text" name="city" defaultValue={companyData?.city || ''} onChange={inputCapital} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="pincode">Pin Code</Label>
                                <Input type="text" name="pincode" defaultValue={companyData?.pincode || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="state">State</Label>
                                <Select value={selectedOption}
                                    name="state"
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
                                <Label htmlFor="phone_office">Phone No. (O)</Label>
                                <Input type="text" name="phone_office" defaultValue={companyData?.phone_office || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="fax">Fax No.</Label>
                                <Input type="text" name="fax" defaultValue={companyData?.fax || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="mobile">Mobile No.</Label>
                                <Input type="text" name="mobile" defaultValue={companyData?.mobile || ''} />
                            </div>
                        </div>
                        <div className="grid  grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="w-full items-center">
                                <Label htmlFor="email">E-mail</Label>
                                <Input type="email" name="email" onChange={inputCapital} defaultValue={companyData?.email || ''} />
                            </div>

                            <div className="w-full items-center">
                                <Label htmlFor="pan">PAN</Label>
                                <Input type="text" name="pan" onChange={inputCapital} defaultValue={companyData?.pan || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="gstin">GSTIN</Label>
                                <Input type="text" name="gstin" onChange={inputCapital} defaultValue={companyData?.gstin || ''} />
                            </div>

                        </div>
                        <p className="text-xl">Payment Terms</p>
                        <div className="w-full items-center">
                            <Label htmlFor="favour">In favour of</Label>
                            <Input type="text" name="favour" onChange={inputCapital} defaultValue={companyData?.favour || ''} />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full items-center">
                                <Label htmlFor="bank_name">Bank Name</Label>
                                <Input type="text" name="bank_name" onChange={inputCapital} defaultValue={companyData?.bank_name || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="bank_branch">Bank Branch</Label>
                                <Input type="text" name="bank_branch" onChange={inputCapital} defaultValue={companyData?.bank_branch || ''} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="w-full items-center">
                                <Label htmlFor="account_no">Account No.</Label>
                                <Input type="text" name="account_no" onChange={inputCapital} defaultValue={companyData?.account_no || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="ifs_code">IFS Code</Label>
                                <Input type="text" name="ifs_code" onChange={inputCapital} defaultValue={companyData?.ifs_code || ''} />
                            </div>
                        </div>
                        <div className="w-full items-center">
                            <Label htmlFor="comments">Comments</Label>
                            <Textarea name="comments" onChange={inputCapital} defaultValue={companyData?.comments || ''} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="w-full items-center">
                                <Label htmlFor="signatory">Authorised Signatory</Label>
                                <Input type="text" name="signatory" onChange={inputCapital} defaultValue={companyData?.signatory || ''} />
                            </div>
                            <div className="w-full items-center">
                                <Label htmlFor="signatory_designation">Designation</Label>
                                <Input type="text" name="signatory_designation" onChange={inputCapital} defaultValue={companyData?.signatory_designation || ''} />
                            </div>
                        </div>
                        <div className="w-full items-center">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" name="password" onChange={inputCapital} defaultValue={companyData?.password || ''} />
                        </div>
                    </div>

                </Card>
                <div className="text-right">
                    <Button type="submit">{params.cid == "new" ? "Add Company" : "Save Changes"}</Button>
                </div>
            </form>

        </div>
    )
}