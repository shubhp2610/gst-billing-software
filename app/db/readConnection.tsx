import mysql from 'mysql2/promise';
import { DB_Client } from '@/app/models/models'
export async function getUsers(query: string, data: string[]) {
    try {
        const db = await mysql.createConnection({
            host: 'db-read.261403.xyz',
            port: 3306,
            database: 'gst_billing',
            user: 'gst_billing_user',
            password: '3LF$kwpDo#ifO@j1oN'
        })
        const [result] = await db.execute(query, data);
        await db.end();
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}

