"use client"
import { useEffect, useState } from 'react';
import { checkJWT, decodeJWT } from "@/lib/jwtUtil";
import { getCookie } from 'cookies-next';


export function fetchUser(token: string) {
    if (token && checkJWT(token)) {
        const data = decodeJWT(token);
        return data;
    } else {
        window.location.href = '/';
    }
}



export function checkUser() {
    const [isUserValid, setIsUserValid] = useState(false);

    useEffect(() => {
        const cookieData = document.cookie.split('; ').find(row => row.startsWith('userid='))?.split('=')[1];
        if (cookieData && checkJWT(cookieData)) {
            setIsUserValid(true);
        } else {
            setIsUserValid(false);
        }
    }, []);

    return isUserValid;
}

export function logout() {
    useEffect(() => {
        document.cookie = 'userid=; path=/; max-age=0; secure; HttpOnly';
        window.location.href = '/';
    }, []);
}
