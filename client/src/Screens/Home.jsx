import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../styles/Home.css";

import Category from "../components/Category";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// --- Swiper Styles ---
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Define carousel images
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
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });
      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }
      const data = await res.json();

      if (!Array.isArray(data) || data.length < 2) {
        throw new Error("Unexpected data format from server");
      }
      setFoodItems(data[0] || []);
      setFoodCat(data[1] || []);
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Failed to load data:", err);
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
    <div>
      <Navbar />

      {/* Carousel Section */}

      <div className="relative w-full h-[450px] md:h-[550px]">
        <Swiper
          className="w-full h-full z-0"
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          modules={[Autoplay, Pagination, Navigation]}
        >
          {carouselImages.map((img, i) => (
            <SwiperSlide key={i}>
              <img src={img} className="w-full h-full object-cover" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Category foodCatdata={foodCat} onCategorySelect={handleCategorySelect} />
      <div className="flex justify-center my-6 w-full">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for food..."
          className="w-[80%]
               h-14 px-6 
               rounded-full 
               bg-white shadow-md 
               outline-none text-gray-800 
               placeholder-gray-500 
               text-lg"
        />
      </div>

      <div className="m-3 container">
        {loading && (
          <div
            className="d-flex flex-column align-items-center my-5"
            data-testid="loading-indicator"
          >
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <small className="text-muted">Fetching fresh items...</small>
          </div>
        )}
        {!loading && error && (
          <div
            className="alert alert-danger"
            role="alert"
            data-testid="error-message"
          >
            {error}{" "}
            <button
              className="btn btn-sm btn-outline-light ms-2"
              onClick={loadData}
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && (
          <>
            {selectedCategory && (
              <div>
                <div className="fs-3 m-3">{selectedCategory}</div>
                <hr />
                {foodItems.length > 0 ? (
                  <div className="row">
                    {foodItems
                      .filter((item) => {
                        // Filter by selected category and search term
                        return (
                          item.CategoryName.toLowerCase() ===
                            selectedCategory.toLowerCase() &&
                          item.name.toLowerCase().includes(search.toLowerCase())
                        );
                      })
                      .map((filteredItem) => (
                        <div
                          key={filteredItem._id}
                          className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                        >
                          <Card
                            foodItems={filteredItem}
                            options={filteredItem.options}
                          />
                        </div>
                      ))}
                  </div>
                ) : (
                  <div>No items found in this category</div>
                )}
              </div>
            )}

            {!selectedCategory &&
              foodCat.length > 0 &&
              foodCat.map((data) => {
                const filteredItems = foodItems.filter((item) => {
                  return (
                    item.CategoryName.toLowerCase() ===
                      data.CategoryName.toLowerCase() &&
                    item.name.toLowerCase().includes(search.toLowerCase())
                  );
                });
                if (filteredItems.length === 0) return null;
                return (
                  <div key={data._id}>
                    <div className="fs-3 m-3">{data.CategoryName}</div>
                    <hr />
                    {filteredItems.length > 0 ? (
                      <div className="row">
                        {filteredItems.map((filteredItem) => (
                          <div
                            key={filteredItem._id}
                            className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                          >
                            <Card
                              foodItems={filteredItem}
                              options={filteredItem.options}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div>No items found in this category</div>
                    )}
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
