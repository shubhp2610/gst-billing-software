import { decodeJWT, generateJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Company } from '@/app/models/models';

export async function POST(req: Request) {
    const formData = await req.formData();
    const userid = await cookies().get('userid')?.value
    console.log(userid);
    if(!userid) {
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

    const fields = [
        'name', 'designation', 'address1', 'address2', 'city', 'pincode', 'state',
        'phone_office', 'fax', 'mobile', 'email', 'pan', 'gstin', 'favour', 'bank_name',
        'bank_branch', 'account_no', 'ifs_code', 'comments', 'signatory', 'signatory_designation', 'password'
    ];

    const values = fields.map(field => formData.get(field)?.toString());
    console.log(values);
    if (values.includes(undefined)) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const query = `
        INSERT INTO ${prefix}_Company (
            name, designation, address1, address2, city, pincode, state, phone_office,
            fax, mobile, email, pan, gstin, favour, bank_name, bank_branch, account_no,
            ifs_code, comments, signatory, signatory_designation, password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    console.log(query);
    try {
        const qr =  await runQuery(query, values);
        console.log(qr);
        return new Response(JSON.stringify({ message: 'Company inserted successfully' }), { status: 200 });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
    }
}