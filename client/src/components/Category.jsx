import React, { useState } from "react";

export default function Category({ foodCatdata, onCategorySelect }) {
  const [activeCategory, setActiveCategory] = useState(null);

  const handleCategoryClick = (categoryId, categoryName) => {
    setActiveCategory(categoryId);
    onCategorySelect(categoryName);
  };

  return (
    <div className="w-full bg-[#f7f2ff] border-b border-[#e8e1f6]">
      <div
        className="
          flex justify-center gap-6 p-5
          max-[575px]:grid max-[575px]:grid-cols-4 max-[575px]:gap-3 max-[575px]:p-3
        "
      >
        {foodCatdata.length > 0 &&
          foodCatdata.map((data) => {
            const isActive = activeCategory === data._id;

            return (
              <div
                key={data._id}
                onClick={() => handleCategoryClick(data._id, data.CategoryName)}
                className="
                  flex flex-col items-center cursor-pointer transition-transform
                  hover:-translate-y-[3px]
                "
              >
                {/* Icon Box */}
                <div
                  className={`
                    w-[50px] h-[50px] flex items-center justify-center rounded-[10px] mb-2 text-[24px]
                    border border-[#e8e1f6] shadow-[0_3px_10px_rgba(122,102,171,0.1)]
                    ${isActive
                      ? "bg-gradient-to-r from-[#5e3f9c] to-[#9370db] text-white"
                      : "bg-[#fcfbf8] text-[#4a2c82]"
                    }
                  `}
                >
                  {data.Sticker}
                </div>

                {/* Name */}
                <div
                  className={`
                    text-[14px] text-center text-[#4a2c82]
                    ${isActive ? "font-bold" : ""}
                  `}
                >
                  {data.CategoryName}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
