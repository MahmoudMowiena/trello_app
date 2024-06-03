"use client";

import React from 'react';

interface NavbarProps {
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLogout }) => {
  const handleLogout = async () => {
    onLogout();
  };

  return (
    <nav className="bg-white p-4 border-b border-gray-200">
      <div className="container flex items-center justify-between">
        <div className="text-3xl px-6 font-bold">
          Trello
        </div>
        <div className="flex items-center justify-end">
          <button
            onClick={handleLogout}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 active:bg-blue-700 transition duration-150 ease-in-out"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>



  );
};

export default Navbar;
