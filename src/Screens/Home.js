import React, { useEffect, useState } from "react";
import Navebar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import "../App.css";

export default function Home() {
  const [foodCat, setFoodCat] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");

  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
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

  return (
    <div>
      <Navebar />

      {/* Carousel Section */}
      <div
        id="carouselExampleCaptions"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner" id="carousel">
          <div className="carousel-item active">
            <img
              src="/images/burger.webp"
              className="d-block w-100 carousel-img"
              alt="Burger"
            />
            <div
              className="carousel-caption d-none d-md-block"
              style={{ zIndex: 10, position: "relative" }}
            >
              {/* Search bar */}
              <form className="d-flex justify-content-center align-items-center">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </form>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/pizza.webp"
              className="d-block w-100 carousel-img"
              alt="Pizza"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="/images/shawarma.webp"
              className="d-block w-100 carousel-img"
              alt="Shawarma"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third slide label</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
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
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Food Cards Section */}
      <div className="m-3 container">
        {foodCat.length > 0 &&
          foodCat.map((data) => (
            <div key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {foodItems.length > 0 ? (
                <div className="row">
                  {foodItems
                    .filter(
                      (item) =>
                        item.CategoryName === data.CategoryName &&
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
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
                <div>No data found</div>
              )}
            </div>
          ))}
      </div>

      <Footer />
    </div>
  );
}
