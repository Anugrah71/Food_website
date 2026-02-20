import React from 'react';
import { Link } from 'react-router-dom';

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#f7f2ff] font-sans selection:bg-[#9370db] selection:text-white">
      <section className="relative flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#5e3f9c] to-[#9370db] py-24 text-center text-white">
        <div className="z-10 px-6">
          <h1 className="mb-4 text-5xl font-black uppercase tracking-tighter md:text-7xl">
            Soulful <span className="font-light text-purple-200">Meals</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-medium text-purple-100 md:text-xl">
            "Soulful Flavours. No Reservations Required."
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 h-64 w-64 rounded-full bg-white/10 blur-3xl"></div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="space-y-12 text-center">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-[#5e3f9c]">Our Belief</h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700">
              <p>
                Global cuisine doesn't belong behind velvet ropes. We believe the world's most iconic flavours—whether it’s a bold Indian curry, a rich Italian ragu, or a comforting continental classic—should be part of your every day.
              </p>
              <p className="font-semibold text-[#9370db]">Not an occasion. Not a luxury. Just lunch. Or dinner.</p>
              <p>
                You shouldn't need a passport, a reservation, or a big night out to taste something unforgettable. You shouldn't have to choose between convenience and craft, or between flavour and freshness.
              </p>
            </div>
          </div>

          <div className="grid gap-8 pt-10 md:grid-cols-2">
            <div className="rounded-2xl bg-white p-8 shadow-sm border border-purple-50 transition-transform hover:scale-105">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-[#5e3f9c]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#5e3f9c]">Cooked to Order</h3>
              <p className="text-sm text-gray-500">
                Inspired by well-loved recipes from Tokyo to Tuscany. Cooked only when you order and served hot and fresh.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-8 shadow-sm border border-purple-50 transition-transform hover:scale-105">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 text-[#5e3f9c]">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-[#5e3f9c]">Weekly Discoveries</h3>
              <p className="text-sm text-gray-500">
                The world is always cooking up something new. Our menu changes every week so there is always a new craving to discover.
              </p>
            </div>
          </div>

          <div className="pt-16">
            <p className="text-2xl font-black text-[#5e3f9c] md:text-4xl">
              "What you get with us is just bowls, beyond borders."
            </p>
            <div className="mt-10">
              <Link 
                to="/" 
                className="rounded-full bg-[#5e3f9c] px-10 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all hover:bg-[#4a327d] shadow-lg"
              >
                Explore the Menu
              </Link>
            </div>
          </div>

        </div>
      </section>

      <div className="pb-20 text-center opacity-20">
        <img src="/logo.svg" alt="Soulful Meals Logo" className="mx-auto h-20 w-20 grayscale" />
      </div>
    </div>
  );
};

