import React from 'react';
import Sidebar from '@/app/dashboard/components/sidebar';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="p-4 sm:ml-64">
            <Sidebar />
            {children}
        </main>

    );
}
