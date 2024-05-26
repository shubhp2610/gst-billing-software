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
import ParticularsTable from "./particulars"
export default function ClientDetails() {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">Company</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/components">H N PATEL & ASSOCIACETES</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>SHUBH SANJAYKUMAR PATEL</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <div className="flow-root mt-4 mb-4">
                <h1 className="float-left"><p className="text-3xl font-bold">SHUBH SANJAYKUMAR PATEL</p><span>A-37, JADHAV AMISHRADHA SOC, AJWA MAIN ROAD, AJWA MAIN ROAD, VADODARA</span></h1>
            </div>
            <Tabs defaultValue="particulars">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="particulars">Particulars</TabsTrigger>
                    <TabsTrigger value="invoices">Invoices</TabsTrigger>
                </TabsList>
                <TabsContent value="particulars">
                <ParticularsTable/>
                </TabsContent>
                <TabsContent value="invoices">
                bye
                </TabsContent>
            </Tabs>

        </>
    )
}