import { decodeJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Invoice, DB_Particulars, DB_Invoice_Data, DB_Client, DB_Company, DB_Invoice_Data_Complete } from '@/app/models/models';

export async function POST(req: Request) {
    const formData = await req.formData();
    const userid = cookies().get('userid')?.value;
    const invoiceId = formData.get('invoiceId')?.toString();
    // Log clientId and particulars for debugging

    if (!userid || !invoiceId) {
        return new Response(JSON.stringify({ error: 'Invalid Request' }), { status: 400 });
    }

    const userData = decodeJWT(userid);
    if (!userData) {
        return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
    }

    const prefix = userData.symbol;
    if (!prefix) {
        return new Response(JSON.stringify({ error: 'Invalid prefix' }), { status: 400 });
    }
    var pariculate_data: DB_Particulars[] = [];
    var output: DB_Invoice_Data_Complete;
    console.log(invoiceId);
    const selectQuery = `SELECT * FROM ${prefix}_Invoices WHERE id = ?`;
    try {
        var invoicez = await runQuery(selectQuery, [invoiceId]) as DB_Invoice[];
        var invoice = invoicez[0];
        var idataQuery = `SELECT * FROM ${prefix}_Invoice_Particulars WHERE invoice_id = ?`;
        const invoiceData = await runQuery(idataQuery, [invoice.id]) as any[];
        var companyQuery = `SELECT * FROM ${prefix}_Company WHERE id = ?`;
        const companyData = await runQuery(companyQuery, [invoice.company_id]) as DB_Company[];
        var clientQuery = `SELECT * FROM ${prefix}_Client WHERE id = ?`;
        const clientData = await runQuery(clientQuery, [invoice.client_id]) as DB_Client[];
        console.log(invoice);
        console.log(invoiceData);
        console.log(companyData);
        console.log(clientData);
        output= {
            company: companyData[0],
            client: clientData[0],
            invoice:{
                id: invoice.id,
                company_id: invoice.company_id,
                client_id: invoice.client_id,
                invoice_no: invoice.invoice_no,
                date: invoice.date,
                gst: invoice.gst,
                particulars: []
            }
        };
        
        for (const data of invoiceData) {
            if (pariculate_data[data.particulars_id] == undefined) {
                var particularQuery = `SELECT * FROM ${prefix}_Particulars WHERE id = ?`;
                const particularData = await runQuery(particularQuery, [data.particulars_id]) as DB_Particulars[];
                pariculate_data[data.particulars_id] = particularData[0];
            }
            output.invoice.particulars.push(pariculate_data[data.particulars_id]);
        }

        console.log(output);
        return new Response(JSON.stringify({ output }), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}
