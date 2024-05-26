import React from 'react';
import Sidebar from '@/app/dashboard/components/sidebar';
import { checkUser } from '@/lib/authUtil';
import { redirect } from 'next/navigation';
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="p-4 sm:ml-64">
            <Sidebar />
            {children}
        </main>

    );
}
