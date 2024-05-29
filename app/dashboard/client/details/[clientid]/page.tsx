"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import ParticularsTable from "./particulars"
import { DB_Client } from "@/app/models/models";
import { Icons } from "@/components/icons";
import { useCookies } from "react-cookie";
export default function ClientDetails({ params }: { params: { clientid: string } }) {
    const [clientDetails, setClientDetails] = useState<DB_Client | null>(null);
    const [loading, setLoading] = useState(true);
    const [cookiez, setCookiez] = useCookies();
    useEffect(() => {
        const fetchClientDetails = async () => {
            const formData = new FormData();
            formData.append('clientId', params.clientid);
            const response = await fetch(`/api/client/getOne`,
                {
                    method: 'POST',
                    body: formData,
                })
            const data = await response.json();
            setClientDetails(data.clients[0]);
        }
        fetchClientDetails();
    }, [params.clientid]);
    useEffect(() => {
        if (clientDetails) {
            setLoading(false);
        }
    }, [clientDetails]);
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/company">Company</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/dashboard/client">{loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" /> :cookiez.company}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>{loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" /> : clientDetails?.name}</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flow-root mt-4 mb-4">
                <h1 className="float-left">{loading ? <Icons.spinner className="mr-2 h-4 w-4 animate-spin text-center" /> : <><p className="text-3xl font-bold">{clientDetails?.name}</p><span>{clientDetails?.address}</span></>}</h1>
            </div>
            <Tabs defaultValue="particulars">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="particulars">Particulars</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>
                <TabsContent value="particulars">
                    <ParticularsTable clientID={params.clientid} />
                </TabsContent>
                <TabsContent value="invoices">
                    bye
                </TabsContent>
            </Tabs>

        </>
    )
}