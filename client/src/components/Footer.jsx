import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-purple-100 bg-[#f7f2ff] py-16 font-sans">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 md:grid-cols-4">
        
        <div className="flex flex-col gap-4">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-[#5e3f9c] uppercase">
              Soulful <span className="font-light text-[#9370db]">Meals</span>
            </span>
            <img src="/logo.svg" alt="Logo" className="h-10 w-10 rounded-full" />
          </Link>
          <p className="text-sm leading-relaxed text-gray-500">
            Delivering fresh, home-cooked flavors to your doorstep. Experience the soulful taste of quality ingredients.
          </p>
          <span className="mt-4 text-xs font-semibold uppercase tracking-widest text-gray-400">
            © 2025 Soulful Meals, Inc
          </span>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-[#5e3f9c]">Company</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600">
            <li><Link to="/about" className="hover:text-[#9370db] transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-[#9370db] transition-colors">Our Menu</Link></li>
            <li><Link to="/contact" className="hover:text-[#9370db] transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-[#5e3f9c]">Legal</h4>
          <ul className="flex flex-col gap-4 text-sm font-medium text-gray-600">
            <li><Link to="/terms" className="hover:text-[#9370db] transition-colors">Terms of Service</Link></li>
            <li><Link to="/privacy" className="hover:text-[#9370db] transition-colors">Privacy Policy</Link></li>
            <li><Link to="/cookies" className="hover:text-[#9370db] transition-colors">Cookie Policy</Link></li>
          </ul>
        </div>

     <div>
  <h4 className="mb-6 text-sm font-black uppercase tracking-widest text-[#5e3f9c]">
    Contact Us
  </h4>
  <div className="flex flex-col gap-4">
    <div className="group flex items-center gap-3 cursor-pointer">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-purple-50 bg-white text-[#5e3f9c] shadow-sm transition-all group-hover:bg-[#5e3f9c] group-hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-[#5e3f9c] transition-colors">
        hello@soulfulmeals.com
      </span>
    </div>

    <div className="group flex items-center gap-3 cursor-pointer">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-purple-50 bg-white text-[#5e3f9c] shadow-sm transition-all group-hover:bg-[#5e3f9c] group-hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-[#5e3f9c] transition-colors">
        123 Soulful Street, Foodie City, FC 456
      </span>
    </div>

    <div className="group flex items-center gap-3 cursor-pointer">
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-purple-50 bg-white text-[#5e3f9c] shadow-sm transition-all group-hover:bg-[#5e3f9c] group-hover:text-white">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      </div>
      <span className="text-sm text-gray-600 group-hover:text-[#5e3f9c] transition-colors">
        Track Your Trolley
      </span>
    </div>
  </div>
</div>
</div>
</footer>
  );
}