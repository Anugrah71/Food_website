import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Category from "../components/Category";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const carouselImages = [
  "/images/Img1.png",
  "/images/Img2.png",
  "/images/Img3.png",
  "/images/Img4.jpg",
];

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const loadData = async () => {
    setLoading(true);
    setError(null);
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const res = await fetch(`${backendURL}/api/foodData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        signal,
      });

      if (!res.ok) throw new Error(`Server responded with ${res.status}`);

      const data = await res.json();
      if (!Array.isArray(data) || data.length < 2)
        throw new Error("Unexpected data format from server");

      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to load:", err);
        setError(err.message || "Failed to fetch data");
      }
    } finally {
      setLoading(false);
    }

    return () => controller.abort();
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategorySelect = (CategoryName) => {
    setSelectedCategory(CategoryName);
  };

  return (
    <div className="w-full bg-gray-50">
      <Navbar />

      <div className="relative h-[380px] w-full sm:h-[450px] md:h-[520px]">
        <Swiper
          className="z-0 h-full w-full"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {carouselImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} className="h-full w-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Category foodCatdata={foodCat} onCategorySelect={handleCategorySelect} />

      {/* Search */}
      <div className="my-6 flex w-full justify-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for food..."
          className="h-14 w-[85%] rounded-full bg-white px-6 text-lg text-gray-800 shadow-md outline-none placeholder-gray-500"
        />
      </div>

      <div className="mx-auto w-full max-w-6xl px-4">
        {loading && (
          <div className="flex flex-col items-center my-5">
            <div className="animate-spin w-10 h-10 border-4 border-purple-300 border-t-purple-600 rounded-full"></div>
            <small className="text-gray-600 mt-3">Fetching fresh items...</small>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-500 text-white p-4 rounded-md flex justify-between items-center">
            <span>{error}</span>
            <button
              onClick={loadData}
              className="border border-white px-3 py-1 rounded-md text-sm"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {selectedCategory && (
              <div className="mt-6">
                <div className="text-2xl font-semibold text-gray-800 mb-2">
                  {selectedCategory}
                </div>
                <hr className="border-gray-300 mb-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {foodItems
                    .filter(
                      (item) =>
                        item.CategoryName.toLowerCase() ===
                          selectedCategory.toLowerCase() &&
                        item.name.toLowerCase().includes(search.toLowerCase()),
                    )
                    .map((filteredItem) => (
                      <Card
                        key={filteredItem._id}
                        foodItems={filteredItem}
                        options={filteredItem.options}
                      />
                    ))}
                </div>
              </div>
            )}

            {!selectedCategory &&
              foodCat.map((data) => {
                const filteredItems = foodItems.filter(
                  (item) =>
                    item.CategoryName.toLowerCase() ===
                      data.CategoryName.toLowerCase() &&
                    item.name.toLowerCase().includes(search.toLowerCase()),
                );

                if (filteredItems.length === 0) return null;

                return (
                  <div key={data._id} className="mt-8">
                    <div className="text-2xl font-semibold text-gray-800 mb-2">
                      {data.CategoryName}
                    </div>
                    <hr className="border-gray-300 mb-4" />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredItems.map((item) => (
                        <Card
                          key={item._id}
                          foodItems={item}
                          options={item.options}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
