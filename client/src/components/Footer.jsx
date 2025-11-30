import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8e1f6] bg-[#f7f2ff] py-6">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between px-4">
        
        {/* Left Section */}
        <div className="mb-4 flex items-center md:mb-0">
          <Link to="/" className="flex items-center">
            {/* logo if needed */}
          </Link>
          <span className="ml-2 text-sm text-gray-600">
            © 2025 Soulful Meals, Inc
          </span>
        </div>

        {/* Right Section */}
        <ul className="flex gap-4">
          {/* social icons or links */}
        </ul>
      </div>
    </footer>
  );
}
