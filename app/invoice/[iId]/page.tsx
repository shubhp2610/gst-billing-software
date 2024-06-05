"use client"
import { DB_Invoice_Data_Complete, DB_Particulars } from '@/app/models/models';
import { Icons } from '@/components/icons';
import { Card, CardContent } from '@/components/ui/card';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
const numberToWords = require('number-to-words');

export default function Page({ params }: { params: { iId: string } }) {
    const [cookiez, setCookiez] = useCookies();
    const [data, setData] = useState<DB_Invoice_Data_Complete | null>(null);
    const [counter, setCounter] = useState(1);
    const [sum, setSum] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchInvoice = async () => {
            const formData = new FormData();
            formData.append('invoiceId', params.iId);
            const response = await fetch(`/api/invoice/getC`,
                {
                    method: 'POST',
                    body: formData,
                })
            const data = await response.json();
            setData(data.output);
            setIsLoading(false);
            var s = 0;
            data.output.invoice.particulars.map((particular: DB_Particulars) => {
                s += Number(particular.amount);
            })
            setSum(s);

        }
        fetchInvoice();
    }, [cookiez]);
    useEffect(() => {
        console.log(data?.company.name)
    }, [data]);
    function convertNumberToText(number: Number) {
        if (typeof number !== 'number' || isNaN(number)) {
            throw new Error('Input must be a valid number');
        }

        // Convert the number to words
        var words: String = numberToWords.toWords(number).replace(/,/g, '');

        // Capitalize the first letter of each word
        words = words.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

        // Add the prefix and suffix
        return `Rupees ${words} Only`;
    }

    return (
        <>
            <Head>
                <title>Tax Invoice</title>
                <style jsx global>{`
                @page {
                    size: A4;
                    margin: 20mm;
                }
                *{
                    font-family: Arial, sans-serif;
                    print-color-adjust: exact;
                }
                .pr2px{
                    padding-right:2px;
                }
                @media print {
                    body {-webkit-print-color-adjust: exact;}
                    }
                    
                 `}</style>
            </Head>
            {isLoading && <center><Icons.spinner className="mr-2 h-10 w-10 animate-spin text-center" /></center>}

            <div className="grid grid-cols-3">
                <div></div>
                <div className='text-center underline text-lg font-bold'>TAX INVOICE</div>
                <div className='text-right'>ORIGINAL FOR RECIPIENT</div>
            </div>
            <div className="text-xs">
                <div className="flex ">
                    <div className="w-1/2 text-center  font-bold bg-gray-300 border-b border-t border-l border-r border-black">Supplier</div>
                    <div className="w-1/2 text-center font-bold bg-gray-300 border-b border-t border-r  border-black">Receiver</div>
                </div>
                <div className="flex ">
                    <div className="w-1/2">
                        <div className="flex border-b border-l border-r border-black"><div className="w-1/5  border-r border-black pl-px">Name</div><div className="w-4/5 font-bold pl-px">{data?.company.name}</div></div>
                        <div className="flex border-b border-l border-r border-black"> <div className="w-1/5  border-r border-black pl-px">GSTIN</div><div className="w-4/5 font-bold pl-px">{data?.company.gstin}</div></div>
                        <div className="flex border-b border-l border-r border-black">  <div className="w-1/5  border-r border-black pl-px">PAN</div><div className="w-4/5 font-bold pl-px">{data?.company.pan}</div></div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex border-b border-r border-black">  <div className="w-1/5  border-r border-black pl-px">Name</div><div className="w-4/5 font-bold pl-px">{data?.client.name}</div></div>
                        <div className="flex border-b border-r border-black"><div className="w-1/5  border-r border-black pl-px">GSTIN</div><div className="w-4/5 font-bold pl-px">{data?.client.gstin}</div></div>
                        <div className="flex border-b border-r border-black">  <div className="w-1/5  border-r border-black pl-px">PAN</div><div className="w-4/5 font-bold pl-px">{data?.client.pan}</div></div>
                    </div>
                </div>
                <div className="flex">
                    <div className="border-b border-l border-r border-black w-1/6 pl-px">Billing Address</div> <div className="w-5/6 border-r border-b border-black font-bold pl-px">{data?.client.address}</div>
                </div>
                <div className="flex border-b border-r border-l border-black">
                    <div className="flex w-2/6"><div className="w-1/2 border-black pl-px">Place of Supply</div><div className="w-1/2 border-l border-black font-bold pl-px">{data?.company.state}</div></div>
                    <div className="w-1/6 border-l border-black pl-px">Invoice Date</div><div className="w-1/6 border-l border-black font-bold  text-center">{data?.invoice.date}</div>
                    <div className="w-1/6 border-l border-black pl-px">Invoice No.</div><div className="w-1/6 border-l border-black font-bold text-center">{data?.invoice.invoice_no}</div>

                </div>
                <div className='flex border-r border-l border-b border-black bg-gray-300 font-bold text-center'>
                    <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-3/6'}`}>
                        <div className='w-1/6 border-r border-black'>S. No.</div>
                        <div className='w-3/6 border-r border-black'>Description & SAC Code for Service</div>
                        <div className='w-2/6 border-r border-black'>Year</div>
                    </div>
                    <div className='flex w-2/6'>
                        <div className='w-2/6 border-r border-black'>Amount</div>
                        <div className='w-2/6 border-r border-black'>Discount</div>
                        <div className='w-2/6 border-r border-black'>Net Amount</div>
                    </div>
                    <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-1/6'}`}>

                        {data?.invoice.gst == true &&
                            <>
                                <div className='w-2/6 border-r border-black'>
                                    <div className='w-full border-b border-black'>CGST</div>
                                    <div className='flex'>
                                        <div className='w-2/6 border-r border-black'>%</div>
                                        <div className='w-4/6'>Amount</div>
                                    </div>
                                </div>
                                <div className='w-2/6 border-r border-black'>
                                    <div className='w-full border-b border-black'>SGST</div>
                                    <div className='flex'>
                                        <div className='w-2/6 border-r border-black'>%</div>
                                        <div className='w-4/6'>Amount</div>
                                    </div>
                                </div>
                            </>
                        }
                        {data?.invoice.gst == true && <div className='w-2/6 '>Total Amount</div>}
                        {data?.invoice.gst == false && <div className='w-full '>Total Amount</div>}
                    </div>
                </div>
                {data?.invoice.particulars.map((particular, index) => {
                    return (
                        <div key={index} className='flex border-r border-l border-b border-black text-center'>
                            <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-3/6'}`}>
                                <div className='w-1/6 border-r border-black text-center'>{index + 1}</div>
                                <div className='w-3/6 border-r border-black text-left pl-px'>{particular.particulars}</div>
                                <div className='w-2/6 border-r border-black text-center'>{particular.year}</div>
                            </div>
                            <div className='flex w-2/6 text-right'>
                                <div className='w-2/6 border-r border-black pr-px'>{particular.amount}</div>
                                <div className='w-2/6 border-r border-black pr-px'>0</div>
                                <div className='w-2/6 border-r border-black pr-px'>{particular.amount}</div>
                            </div>

                            <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-1/6'}`}>
                                {data?.invoice.gst == true && <>
                                    <div className='flex w-2/6 border-r border-black text-right'>
                                        <div className='w-2/6 border-r border-black pr-px'>9%</div>
                                        <div className='w-4/6 pr-px'>{Number(particular.amount) * 0.09}</div>
                                    </div>
                                    <div className='flex w-2/6 border-r border-black text-right'>
                                        <div className='w-2/6 border-r border-black pr-px'>9%</div>
                                        <div className='w-4/6 pr-px'>{Number(particular.amount) * 0.09}</div>

                                    </div>
                                </>}
                                {data?.invoice.gst == true && <div className='w-2/6 text-right pr-px'>{Number(particular.amount) * 1.18}</div>}
                                {data?.invoice.gst == false && <div className='w-full text-right pr-px'>{Number(particular.amount)}</div>}

                            </div>
                        </div>
                    )
                })}

                <div className='flex border-r border-l border-b border-black font-bold text-center'>
                    <div className={`${data?.invoice?.gst ? 'w-2/6' : 'w-3/6'} border-r border-black  text-center`}>
                        Total Amount
                    </div>
                    <div className='flex w-2/6 text-right'>
                        <div className='w-2/6 border-r border-black pr-px'>{sum}</div>
                        <div className='w-2/6 border-r border-black pr-px'>0</div>
                        <div className='w-2/6 border-r border-black pr-px'>{sum}</div>
                    </div>
                    <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-1/6'} text-right`}>
                        {data?.invoice.gst == true && <>
                            <div className='w-2/6 border-r border-black pr-px'>
                                {sum * 0.09}
                            </div>
                            <div className='w-2/6 border-r border-black pr-px'>
                                {sum * 0.09}
                            </div>
                        </>}
                        {data?.invoice.gst == true && <div className='w-2/6 text-right pr-px'>{sum * 1.18}</div>}
                        {data?.invoice.gst == false && <div className='w-full text-right pr-px'>{sum}</div>}
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black font-bold text-center'>
                    <div className={`w-2/6 border-r border-black  text-center`}>
                        Total Invoice Value (in Figures)
                    </div>
                    <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-3/6'} text-right`}>
                    </div>
                    <div className={`flex ${data?.invoice?.gst ? 'w-2/6' : 'w-1/6'} text-right border-l border-black`}>
                        {data?.invoice.gst == true && <>
                            <div className='w-2/6 '>
                            </div>
                            <div className='w-2/6 border-r border-black pr-px'>
                            </div>
                        </>}
                        {data?.invoice.gst == true &&  <div className='w-2/6 text-right pr-px'>{sum * 1.18}</div>}
                        {data?.invoice.gst == false &&  <div className='w-full text-right pr-px'>{sum}</div>}
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black font-bold text-center'>
                    <div className={`w-2/6 border-r border-black  text-center`}>
                        Total Invoice Value (in Words)
                    </div>
                    <div className={`flex w-4/6 text-left pl-px font-bold`}>
                        {convertNumberToText(data?.invoice.gst ? sum * 1.18 : sum)}
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black font-bold underline  pl-px'>Payment Terms</div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>In favour of</div>
                    <div className='w-5/6 font-bold pl-px'>{data?.company.favour}</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>Bank & Branch</div>
                    <div className='w-5/6 font-bold pl-px'>{data?.company.bank_branch}</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>Account No.</div>
                    <div className='w-5/6 font-bold pl-px'>{data?.company.account_no}</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>IFSC Code</div>
                    <div className='w-5/6 font-bold pl-px'>{data?.company.ifs_code}</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>Comments</div>
                    <div className='w-5/6 font-bold pl-px'>{data?.company.comments}</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-2/3'>
                        <div className='flex border-r border-black'>
                            <div className='w-1/6 border-r border-black font-bold pl-px'>Note</div>
                            <div className='w-5/6 font-bold pl-px'><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br></div>
                        </div>
                    </div>
                    <div className='w-1/3 font-bold pl-px text-right'><i className='font-normal'>for</i>&nbsp;H N PATEL & ASSOCIATES<br></br>(PROPRIETER)</div>
                </div>

                <div className="w-full text-center border-r border-l border-b border-black">
                    <p>{data?.company.address1}{data?.company.address2 && "," + data?.company.address2}<br />
                        Mobile: {data?.company.mobile}<br />
                        E-mail: {data?.company.email}</p>
                </div>
            </div>
        </>
    );
}

