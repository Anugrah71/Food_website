import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../styles/Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Category from "../components/Category";

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
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="form-div position-absolute bottom-0 start-0 w-100 d-flex justify-content-center">
            <form className=" w-100 px-5">
              <input
                className="form-control me-2 search-box"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
          <div className="carousel-item active ">
            <img
              src="/images/Img1.png"
              className="d-block w-100 carousel-img"
              alt="pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/Img2.png"
              className="d-block w-100 carousel-img"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/Img3.png"
              className="d-block w-100 carousel-img"
              alt="Pizza"
            />
          </div>

          
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <Category foodCatdata={foodCat} onCategorySelect={handleCategorySelect} />

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
