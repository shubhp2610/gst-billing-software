"use client"
import Head from 'next/head';

export default function Page() {
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
                        <div className="flex border-b border-l border-r border-black"><div className="w-1/5  border-r border-black pl-px">Name</div><div className="w-4/5 font-bold pl-px">H N PATEL & ASSOCIATES</div></div>
                        <div className="flex border-b border-l border-r border-black"> <div className="w-1/5  border-r border-black pl-px">GSTIN</div><div className="w-4/5 font-bold pl-px"></div></div>
                        <div className="flex border-b border-l border-r border-black">  <div className="w-1/5  border-r border-black pl-px">PAN</div><div className="w-4/5 font-bold pl-px">BSF PP0376J</div></div>
                    </div>
                    <div className="w-1/2">
                        <div className="flex border-b border-r border-black">  <div className="w-1/5  border-r border-black pl-px">Name</div><div className="w-4/5 font-bold pl-px">BSF PP0376J</div></div>
                        <div className="flex border-b border-r border-black"><div className="w-1/5  border-r border-black pl-px">Name</div><div className="w-4/5 font-bold pl-px">H N PATEL & ASSOCIATES</div></div>
                        <div className="flex border-b border-r border-black">  <div className="w-1/5  border-r border-black pl-px">PAN</div><div className="w-4/5 font-bold pl-px">BSF PP0376J</div></div>
                    </div>
                </div>
                <div className="flex">
                    <div className="border-b border-l border-r border-black w-1/6 pl-px">Billing Address</div> <div className="w-5/6 border-r border-b border-black font-bold pl-px">H N PATEL & ASSOCIATES, 126, 2ND FLOOR, ATLANTA SHOPPING CENTRE, ALTHAN BHIMRAD CANAL ROAD, ALTHAN, SURAT, GUJARAT-395017</div>
                </div>
                <div className="flex border-b border-r border-l border-black">
                <div className="flex w-2/6"><div className="w-1/2 border-black pl-px">Place of Supply</div><div className="w-1/2 border-l border-black font-bold pl-px"> GUJARAT (24)</div></div>
                    <div className="w-1/6 border-l border-black pl-px">Invoice Date</div><div className="w-1/6 border-l border-black font-bold  text-center">16/05/2024</div>
                    <div className="w-1/6 border-l border-black pl-px">Invoice No.</div><div className="w-1/6 border-l border-black font-bold text-center">1</div>

                </div>
                <div className='flex border-r border-l border-b border-black bg-gray-300 font-bold text-center'>
                    <div className='flex w-2/6'>
                        <div className='w-1/6 border-r border-black'>S. No.</div>
                        <div className='w-3/6 border-r border-black'>Description & SAC Code for Service</div>
                        <div className='w-2/6 border-r border-black'>Year</div>
                    </div>
                    <div className='flex w-2/6'>
                        <div className='w-2/6 border-r border-black'>Amount</div>
                        <div className='w-2/6 border-r border-black'>Discount</div>
                        <div className='w-2/6 border-r border-black'>Net Amount</div>
                    </div>
                    <div className='flex w-2/6'>
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
                        <div className='w-2/6 '>Total Amount</div>
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black text-center'>
                    <div className='flex w-2/6'>
                        <div className='w-1/6 border-r border-black text-center'>S. No.</div>
                        <div className='w-3/6 border-r border-black text-left pl-px'>Description & SAC Code for Service</div>
                        <div className='w-2/6 border-r border-black text-center'>Year</div>
                    </div>
                    <div className='flex w-2/6 text-right'>
                        <div className='w-2/6 border-r border-black pr-px'>Amount</div>
                        <div className='w-2/6 border-r border-black pr-px'>Discount</div>
                        <div className='w-2/6 border-r border-black pr-px'>Net Amount</div>
                    </div>
                    <div className='flex w-2/6'>
                        <div className='flex w-2/6 border-r border-black text-right'>
                            <div className='w-2/6 border-r border-black pr-px'>%</div>
                            <div className='w-4/6 pr-px'>Amount</div>

                        </div>
                        <div className='flex w-2/6 border-r border-black text-right'>
                            <div className='w-2/6 border-r border-black pr-px'>%</div>
                            <div className='w-4/6pr-px'>Amount</div>

                        </div>
                        <div className='w-2/6 text-right pr-px'>Total Amount</div>
                    </div>
                </div>
               
                <div className='flex border-r border-l border-b border-black font-bold text-center'>
                    <div className='w-2/6 border-r border-black  text-center'>
                        Total Amount
                    </div>
                    <div className='flex w-2/6 text-right'>
                        <div className='w-2/6 border-r border-black pr-px'>1200</div>
                        <div className='w-2/6 border-r border-black pr-px'>0</div>
                        <div className='w-2/6 border-r border-black pr-px'>1200</div>
                    </div>
                    <div className='flex w-2/6 text-right'>
                        <div className='w-2/6 border-r border-black pr-px'>
                            108
                        </div>
                        <div className='w-2/6 border-r border-black pr-px'>
                        108
                        </div>
                        <div className='w-2/6 text-right pr-px'>1416</div>
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black font-bold text-center'>
                    <div className='w-2/6 border-r border-black  text-center'>
                        Total Invoice Value (in Figures)
                    </div>
                    <div className='flex w-2/6 text-right'>
                    </div>
                    <div className='flex w-2/6 text-right'>
                        <div className='w-2/6 '>
                        </div>
                        <div className='w-2/6 border-r border-black pr-px'>
                        </div>
                        <div className='w-2/6 text-right pr-px'>1416</div>
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black font-bold text-center'>
                    <div className='w-2/6 border-r border-black  text-center'>
                        Total Invoice Value (in Words)
                    </div>
                    <div className='flex w-4/6 text-left pl-px font-bold'>
                        One Ruppes
                    </div>
                </div>
                <div className='flex border-r border-l border-b border-black font-bold underline  pl-px'>Payment Terms</div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>In favour of</div>
                    <div className='w-5/6 font-bold pl-px'>HDFC BANK, SURAT</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>Bank & Branch</div>
                    <div className='w-5/6 font-bold pl-px'>HDFC BANK, SURAT</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>Account No.</div>
                    <div className='w-5/6 font-bold pl-px'>HDFC BANK, SURAT</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>IFSC Code</div>
                    <div className='w-5/6 font-bold pl-px'>HDFC BANK, SURAT</div>
                </div>
                <div className='flex border-r border-l border-b border-black '>
                    <div className='w-1/6 border-r border-black pl-px'>Comments</div>
                    <div className='w-5/6 font-bold pl-px'>HDFC BANK, SURAT</div>
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
                    <p>126, 2ND FLOOR, ATLANTA SHOPPING MALL, ALTHAN, SURAT-395017 (GUJARAT)<br />
                        Mobile: 8866546665<br />
                        E-mail: CAHNPATEL307@GMAIL.COM</p>
                </div>
            </div>
        </>
    );
}

