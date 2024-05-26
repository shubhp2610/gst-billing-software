import { generateJWT } from '@/lib/jwtUtil';
import { cookies } from 'next/headers';
import { getUsers } from '@/app/db/readConnection';
import { DB_Client } from '@/app/models/models';
// async function streamToString(stream: any) {
//     const chunks = [];
//     for await (const chunk of stream) { chunks.push(chunk); } 
//     return Buffer.concat(chunks).toString('utf8');
// }

export async function POST(req: Request) {


    // const body = await req.text();
    // console.log(body);
    const formData = await req.formData();
    const email = formData.get('email')?.toString();

    if (email) {
        const query = "SELECT * FROM Users WHERE username = ?";
        const result = (await getUsers(query, [email])) as DB_Client[];
        const user: DB_Client = result[0];
        if (!user) {
            return Response.json({ error: 'Invalid email' }, { status: 401 });
        }
        console.log(user);
        const token = generateJWT(user);
        // Set cookie using server-side logic (e.g., Next.js cookies)
        cookies().set('userid', token, {
            maxAge: 60 * 60 * 24 * 7, // One week
            path: '/',
        });

        // Redirect using server-side logic (e.g., Next.js redirect)
        return Response.json({ error: 'OK' }, { status: 200 });
    } else {
        return Response.json({ error: 'Invalid email' }, { status: 401 });
    }
}