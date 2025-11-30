import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-[#e8e1f6] bg-[#f7f2ff] py-6">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4">
        <div className="mb-4 flex items-center md:mb-0">
          <Link
            to="/"
            className="mb-md-0 text-muted text-decoration-none lh-1 me-2 mb-3 flex items-center"
          >
            {/* Add logo image here if needed */}
          </Link>
          <span className="text-sm text-gray-600">
            © 2025 Soulful Meals, Inc
          </span>
        </div>

        <ul className="m-0 flex list-none justify-end gap-4 p-0">
          {/* Add social icons or links here if needed */}
        </ul>
      </div>
    </footer>
  );
}
