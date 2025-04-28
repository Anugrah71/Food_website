import React, { useState } from "react";
import "../styles/Category.css";

export default function Category(props) {
  const [activeCategory, setActiveCategory] = useState(null);
  const foodCategory = props.foodCatdata;

  const handleCategoryClick = (categoryId, categoryName) => {
    setActiveCategory(categoryId); 
    console.log(">>>>>>>>>>>>>>>", categoryName);
    props.onCategorySelect(categoryName); 
  };

  return (
    <div>
      <div className="categories-container">
        {foodCategory.length > 0 &&
          foodCategory.map((data) => (
            <div
              className={`category-box ${
                activeCategory === data._id ? "active-category" : ""
              }`}
              key={data._id}
              onClick={() => handleCategoryClick(data._id, data.CategoryName)}
            >
              <div className="category-icon">{data.Sticker}</div>
              <div className="category-name">{data.CategoryName}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
