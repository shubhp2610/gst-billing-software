import { decodeJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Invoice } from '@/app/models/models';

export async function POST(req: Request) {
    const formData = await req.formData();
    const userid = cookies().get('userid')?.value;
    const companyId = cookies().get('companyId')?.value;
    const clientId = formData.get('clientId')?.toString();
    const particulars = formData.get('particulars')?.toString();
    const gst = formData.get('gst')?.toString();
    // Log clientId and particulars for debugging
    console.log('ClientId:', clientId);
    console.log('Particulars:', particulars);

    if (!userid || !companyId || !clientId || !particulars) {
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

    const selectQuery = `SELECT * FROM ${prefix}_Invoices WHERE company_id = ? AND client_id = ?`;
    try {
        const invoices = await runQuery(selectQuery, [companyId, clientId]) as DB_Invoice[];
        let invoice_id = invoices.length > 0 ? (invoices[invoices.length - 1].id + 1) : 1;

        const insertInvoiceQuery = `
            INSERT INTO ${prefix}_Invoices (company_id, client_id, invoice_no, date, gst)
            VALUES (?, ?, ?, ?, ?)
        `;
        const invoiceResult = await runQuery(insertInvoiceQuery, [
            companyId, clientId, invoice_id, formData.get('date')?.toString(), gst=='0'?0:1
        ]);

        const invoiceId = (invoiceResult as any).insertId; // Adjust this cast based on actual return type
        const pIds = particulars.split(',');

        for (const pId of pIds) {
            const insertParticularQuery = `
                INSERT INTO ${prefix}_Invoice_Particulars (invoice_id, particulars_id)
                VALUES (?, ?)
            `;
            await runQuery(insertParticularQuery, [invoiceId, pId]);
        }

        return new Response(JSON.stringify({ message: invoiceId }), { status: 200 });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}
