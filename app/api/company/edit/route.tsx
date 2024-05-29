import { decodeJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { runQuery } from '@/app/db/writeConnection';
import { DB_Company } from '@/app/models/models';

export async function POST(req: Request) {
    const formData = await req.formData();
    const userid = await cookies().get('userid')?.value;

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

    const fields = [
        'name', 'designation', 'address1', 'address2', 'city', 'pincode', 'state',
        'phone_office', 'fax', 'mobile', 'email', 'pan', 'gstin', 'favour', 'bank_name',
        'bank_branch', 'account_no', 'ifs_code', 'comments', 'signatory', 'signatory_designation', 'password'
    ];

    const values = fields.map(field => formData.get(field)?.toString());
    if (values.includes(undefined)) {
        return new Response(JSON.stringify({ error: 'Missing fields' }), { status: 400 });
    }

    const id = formData.get('id')?.toString();

    if (id) {
        // Update existing company
        const query = `
            UPDATE ${prefix}_Company SET 
                name = ?, designation = ?, address1 = ?, address2 = ?, city = ?, pincode = ?, state = ?, phone_office = ?, 
                fax = ?, mobile = ?, email = ?, pan = ?, gstin = ?, favour = ?, bank_name = ?, bank_branch = ?, 
                account_no = ?, ifs_code = ?, comments = ?, signatory = ?, signatory_designation = ?, password = ?
            WHERE id = ?
        `;
        try {
            const qr = await runQuery(query, [...values, id]);
            console.log(qr);
            return new Response(JSON.stringify({ message: 'Company updated successfully' }), { status: 200 });
        } catch (error) {
            console.error(error);
            return new Response(JSON.stringify({ error: 'Database error' }), { status: 500 });
        }
    } else {
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }
}
