import React, { useState, useEffect, useRef, useMemo } from "react";
import { useDispatchCart, useCart } from "../context/ContextReducer";
import "../styles/Card.css";
export default function Card(props) {
  let priceRef = useRef();

  let dispatch = useDispatchCart();

  let data = useCart();
  let option = props.options[0];

  let priceOptions = Object.keys(option);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const [isAdded, setIsAdded] = useState(false);
  const handleAddToCart = async () => {
    const food = data.find((item) => item.id === props.foodItems._id);
    const isUpdate = food && food.size === size;

    const action = isUpdate
      ? {
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        }
      : {
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.foodItems.img,
        };

    await dispatch(action);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const finalPrice = useMemo(
    () => qty * parseInt(option[size] || 0),
    [qty, size, option],
  );
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div className="rounded-[6px] border border-[#e8e1f6] bg-white p-4 shadow-[0_3px_10px_rgba(122,102,171,0.08)] transition-shadow transition-transform duration-200 ease-linear hover:-translate-y-[3px] hover:shadow-[0_5px_15px_rgba(122,102,171,0.15)]">
          <div className="mb-3 h-[120px] overflow-hidden rounded-[4px] bg-[#f0eaf7]">
            <img
              src={props.foodItems.img}
              alt="..."
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mb-[5px] text-[16px] font-bold text-[#4a2c82]">
            {props.foodItems.name}
          </div>

          <div className="flex gap-2">
            <div className="mb-[10px] pt-[3px] text-[#6f618d]">
              ₹{finalPrice}/-
            </div>

            <select
              className="mb-3 border-none bg-transparent pt-[3px] font-[Georgia,serif] text-[#6f618d] capitalize outline-none"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from({ length: 6 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>

            <select
              ref={priceRef}
              className="mb-3 border-none bg-transparent pt-[3px] font-[Georgia,serif] text-[#6f618d] capitalize outline-none"
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  ({data}- ₹{option[data]}/-)
                </option>
              ))}
            </select>
          </div>

          <hr />

          <button
            className="cursor-pointer rounded-[4px] bg-gradient-to-r from-[#5e3f9c] to-[#9370db] px-[14px] py-[7px] font-[Georgia,serif] text-[14px] text-white transition-all duration-200 hover:-translate-y-[1px] hover:from-[#4a2c82] hover:to-[#7559bd]"
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
