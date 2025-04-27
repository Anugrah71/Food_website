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
    [qty, size, option]
  );
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div className="menu-item">
          <div class="item-img">
            <img src={props.foodItems.img} className="img" alt="..." />
          </div>
          <div className="item-name">{props.foodItems.name}</div>
          <div className="Wrap-price">
            <div className="item-price">₹{finalPrice}/-</div>
            <select
              className="btn-select number"
              onChange={(e) => setQty(e.target.value)}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="btn-select quantity"
              ref={priceRef}
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  ({data}- ₹{option[data]}/-)
                </option>
              ))}
            </select>
          </div>

          <hr className=""></hr>
          <button
            className={`add-btn`}
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
