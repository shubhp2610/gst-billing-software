import { cookies } from 'next/headers';
// async function streamToString(stream: any) {
//     const chunks = [];
//     for await (const chunk of stream) { chunks.push(chunk); } 
//     return Buffer.concat(chunks).toString('utf8');
// }

export async function POST(req: Request) {
    try {
        cookies().set('userid', '', {
            maxAge: 0,
            path: '/',
        });

        // Redirect using server-side logic (e.g., Next.js redirect)
        return Response.json({ error: 'OK' }, { status: 200 });
    } catch (error) {
        return Response.json({ error: error }, { status: 401 });
    }
}