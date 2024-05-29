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

    const query = `SELECT * FROM ${prefix}_Particulars WHERE company_id = ? AND client_id = ?`;
    const result = (await runQuery(query, [companyId, clientId])) as DB_Particulars[];
    const particulars: DB_Particulars[] = result;
    if (!particulars) {
        return Response.json({ error: 'No Company Found' }, { status: 404 });
    }
    console.log(particulars);
    return Response.json({ particulars }, { status: 200 });
}