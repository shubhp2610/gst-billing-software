import { checkJWT, decodeJWT } from "@/lib/jwtUtil";
import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'

export function fetchUser() {
    const cookieData = cookies().get('userid')?.value
    if (cookieData && checkJWT(cookieData)) {
        const data = decodeJWT(cookieData as string);
        return data
    }
    else {
        redirect('/')
    }
}

export function checkUser() {
    const cookieData = cookies().get('userid')?.value
    if (cookieData && checkJWT(cookieData)) {
        return true
    }
    else {
        return false
    }
}

export function logout() {
    cookies().set('userid', '', {
        httpOnly: true,
        secure: true,
        maxAge: 0,
        path: '/',
    });
    redirect('/')
}