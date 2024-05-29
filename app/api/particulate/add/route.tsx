import { decodeJWT, generateJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Company } from '@/app/models/models';

export async function POST(req: Request) {
    const formData = await req.formData();
    const userid = await cookies().get('userid')?.value
    const companyId = await cookies().get('companyId')?.value
    const clientId = formData.get('clientId')?.toString();
    console.log(userid);
    if (!userid || !companyId || !clientId) {
        return new Response(JSON.stringify({ error: 'Invalid Request' }), { status: 401 });
    }
    const userData = decodeJWT(userid);
    if (!userData) {
        return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
    }
    const prefix = userData.symbol;

    if (!prefix) {
        return new Response(JSON.stringify({ error: 'Invalid prefix' }), { status: 401 });
    }

    const fields = [
        'particulars', 'year', 'type', 'amount', 'date'
    ];

    const values = fields.map(field => formData.get(field)?.toString());
    console.log(values);
    if (values.includes(undefined)) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const query = `
        INSERT INTO ${prefix}_Particulars (
            particulars, year, type, amount, date, company_id, client_id
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    console.log(query);
    try {
        const qr = await runQuery(query, [...values, companyId, clientId]);
        console.log(qr);
        return new Response(JSON.stringify({ message: 'Company inserted successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}