import React from 'react';
import Link from 'next/link';

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-gray-800 text-white flex flex-col">
      <Link href="/dashboard">
        <a className="p-4 hover:bg-gray-700">Dashboard</a>
      </Link>
      <Link href="/dashboard/clients">
        <a className="p-4 hover:bg-gray-700">Clients</a>
      </Link>
      {/* Add more links as needed */}
    </div>
  );
};

export default Sidebar;
