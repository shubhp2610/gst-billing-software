import { decodeJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Invoice, DB_Particulars, DB_Invoice_Data } from '@/app/models/models';

export async function POST(req: Request) {
    const formData = await req.formData();
    const userid = cookies().get('userid')?.value;
    const companyId = cookies().get('companyId')?.value;
    const clientId = formData.get('clientId')?.toString();

    // Log clientId and particulars for debugging

    if (!userid || !companyId || !clientId) {
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
    var output: DB_Invoice_Data[] = [];
    const selectQuery = `SELECT * FROM ${prefix}_Invoices WHERE company_id = ? AND client_id = ?`;
    try {
        const invoices = await runQuery(selectQuery, [companyId, clientId]) as DB_Invoice[];
        for (const invoice of invoices) {
            var idataQuery = `SELECT * FROM ${prefix}_Invoice_Particulars WHERE invoice_id = ?`;
            const invoiceData = await runQuery(idataQuery, [invoice.id]) as any[];
            output[invoice.id] = {
                id: invoice.id,
                company_id: invoice.company_id,
                client_id: invoice.client_id,
                invoice_no: invoice.invoice_no,
                date: invoice.date,
                gst: invoice.gst,
                particulars: []
            };
            for (const data of invoiceData) {
                if (pariculate_data[data.particulars_id] == undefined) {
                    var particularQuery = `SELECT * FROM ${prefix}_Particulars WHERE id = ?`;
                    const particularData = await runQuery(particularQuery, [data.particulars_id]) as DB_Particulars[];
                    pariculate_data[data.particulars_id] = particularData[0];
                }
                output[invoice.id].particulars.push(pariculate_data[data.particulars_id]);
            }
        }
        console.log(output);
        return new Response(JSON.stringify({ output }), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}
