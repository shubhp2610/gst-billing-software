import { decodeJWT, generateJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Client } from '@/app/models/models';

export async function POST(req: Request) {
    // const body = await req.text();
    // console.log(body);
    const userid = await cookies().get('userid')?.value
    const companyId = await cookies().get('companyId')?.value
    if (!userid || !companyId) {
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

    const query = `SELECT * FROM ${prefix}_Client WHERE company_id = ?`;
    const result = (await runQuery(query, [companyId])) as DB_Client[];
    const clients: DB_Client[] = result;
    if (!clients) {
        return Response.json({ error: 'No Company Found' }, { status: 404 });
    }
    console.log(clients);
   return Response.json({ clients }, { status: 200 });
}