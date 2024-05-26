import jwt from 'jsonwebtoken';
const secret = 'N]Nt@K/jS1NS#2b0rk!jzqmyH0}BCC';
export function generateJWT(payload: any): string {
    return jwt.sign(payload, secret, { expiresIn: '1w'});
}

export function checkJWT(token: string): boolean {
    try {
        jwt.verify(token, secret);
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export function decodeJWT(token: string): any {
    return jwt.decode(token);
}