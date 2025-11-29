import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#f7f2ff] border-t border-[#e8e1f6] py-6 mt-auto">
      <div className="container mx-auto px-4 flex flex-wrap justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Link to="/" className="flex items-center mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
             {/* Add logo image here if needed */}
          </Link>
          <span className="text-gray-600 text-sm">© 2025 Soulful Meals, Inc</span>
        </div>

        <ul className="flex justify-end list-none gap-4 m-0 p-0">
           {/* Add social icons or links here if needed */}
        </ul>
      </div>
    </footer>
  );
}