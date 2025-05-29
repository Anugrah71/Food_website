import React, { useEffect, useState } from "react";
import Navebar from "../components/Navbar";
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
  const backendURL = process.env.REACT_APP_BACKEND_URL;

  const loadData = async () => {
    let response = await fetch(`${backendURL}/api/foodData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    response = await response.json();
    setFoodItems(response[0]);

    setFoodCat(response[1]);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCategorySelect = (CategoryName) => {
    setSelectedCategory(CategoryName);
  };

  return (
    <div>
      <Navebar />

      {/* Carousel Section */}
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div
            className="form-div position-absolute bottom-0 start-0 w-100 d-flex justify-content-center"
            
          >
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
              src="/images/pizza1111.avif"
              className="d-block w-100 carousel-img"
              alt="pizza"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/3burger.jpg"
              className="d-block w-100 carousel-img"
              alt="Burger"
            />
          </div>
          <div className="carousel-item">
            <img
              src="/images/sandwitch.jpg"
              className="d-block w-100 carousel-img"
              alt="Pizza"
            />
          </div>

          <div className="carousel-item">
            <img
              src="/images/biryani.jpg"
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
                item.CategoryName.toLowerCase() === selectedCategory.toLowerCase() &&
                item.name.toLowerCase().includes(search.toLowerCase())
              );
            })
            .map((filteredItem) => (
              <div
                key={filteredItem._id}
                className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ml-2 d-flex justify-content-center"
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
          item.CategoryName.toLowerCase() === data.CategoryName.toLowerCase() &&
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
                  className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 ml-2 d-flex justify-content-center"
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
</div>


      <Footer />
    </div>
  );
}
