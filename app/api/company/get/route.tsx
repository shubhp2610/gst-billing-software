import { decodeJWT, generateJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Company } from '@/app/models/models';

export async function POST(req: Request) {
    // const body = await req.text();
    // console.log(body);
    const formData = await req.formData();
    const userid = await cookies().get('userid')?.value
    console.log(userid);
    if (!userid) {
        return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
    }
    const userData = decodeJWT(userid);
    if (!userData) {
        return new Response(JSON.stringify({ error: 'Invalid user' }), { status: 401 });
    }
    const prefix = userData.symbol;

    if (!prefix) {
        return new Response(JSON.stringify({ error: 'Invalid prefix' }), { status: 401 });
    }

    const query = `SELECT * FROM ${prefix}_Company`;
    const result = (await runQuery(query, [])) as DB_Company[];
    const company: DB_Company[] = result;
    if (!company) {
        return Response.json({ error: 'No Company Found' }, { status: 404 });
    }
    console.log(company);
    return Response.json({ company }, { status: 200 });

}