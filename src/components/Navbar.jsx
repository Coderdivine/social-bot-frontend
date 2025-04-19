import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MenuIcon, XIcon } from '@heroicons/react/outline';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const links = [
    { to: '/', label: 'Home' },
    { to: '/x', label: 'X' },
  ];

  return (
    <header className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg fixed w-full z-50 shadow-md animate-slide-down">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl uppercase font-bold text-blue-600 hover:text-blue-800 transition">Social Poster</Link>
        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} className="focus:outline-none">
            {open ? <span className='p-4 bg-gray-600'><XIcon className="h-6 w-6" /></span> : <MenuIcon className="h-6 w-6 text-gray-800" />}
          </button>
        </div>
        <ul className={`md:flex md:items-center md:space-x-6 ${open ? 'block' : 'hidden'} absolute md:static bg-white md:bg-transparent w-full left-0 md:w-auto p-4 md:p-0 transition-all`}> 
          {links.map(link => (
            <li key={link.to}>
              <Link
                to={link.to}
                className={`block px-3 py-2 rounded-md hover:bg-blue-100 transition ${pathname === link.to ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li><a href="#" className="block px-3 py-2 rounded-md hover:bg-blue-100 transition text-gray-700">TikTok</a></li>
          <li><a href="#" className="block px-3 py-2 rounded-md hover:bg-blue-100 transition text-gray-700">Instagram</a></li>
        </ul>
      </nav>
    </header>
  );
}
