import { decodeJWT, generateJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Client, DB_Particulars } from '@/app/models/models';

export async function POST(req: Request) {
    // const body = await req.text();
    // console.log(body);
    const formData = await req.formData();
    const userid = await cookies().get('userid')?.value
    const companyId = await cookies().get('companyId')?.value
    const clientId = formData.get('clientId')?.toString();
    const id = formData.get('id')?.toString();
    if (!userid || !companyId || !clientId) {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 401 });
    }
    const userData = decodeJWT(userid);
    if (!userData) {
        return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
    }
    const prefix = userData.symbol;

    if (!prefix) {
        return new Response(JSON.stringify({ error: 'Invalid prefix' }), { status: 401 });
    }

    const query = `UPDATE ${prefix}_Particulars SET deleted = 1 WHERE company_id = ? AND client_id = ? AND id = ?`
    try {
        const qr = await runQuery(query, [companyId, clientId, id]);
        console.log(qr);
        return new Response(JSON.stringify({ message: 'Particulars deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}