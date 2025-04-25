import React, { useState, useEffect, useRef } from "react";
import { useDispatchCart, useCart } from "./ContextReducer";
import "../Card.css";
export default function Card(props) {
  let priceRef = useRef();

  let dispatch = useDispatchCart();

  let data = useCart();
  let option = props.options[0];

  let priceOptions = Object.keys(option);

  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");
  const handleAddToCart = async () => {
    let food = [];
    for (const item of data) {
      if (item.id === props.foodItems._id) {
        food = item;
        break;
      }
    }

    if (food !== []) {
      if (food.size === size) {
        await dispatch({
          type: "UPDATE",
          id: props.foodItems._id,
          price: finalPrice,
          qty: qty,
        });
        return;
      } else if (food.size !== size) {
        await dispatch({
          type: "ADD",
          id: props.foodItems._id,
          name: props.foodItems.name,
          price: finalPrice,
          qty: qty,
          size: size,
          img: props.ImgSrc,
        });
        console.log("Size different so simply ADD one more to the list");
        return;
      }
      return;
    }

    await dispatch({
      type: "ADD",
      id: props.foodItems._id,
      name: props.foodItems.name,
      price: finalPrice,
      qty: qty,
      size: size,
    });

    console.log(data);
  };

  let finalPrice = qty * parseInt(option[size]);
  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div>
      <div>
        <div className="menu-item">
          <div class="item-img">
            <img
              src={props.foodItems.img}
              className=""
              alt="..."
              style={{ height: "120px", objectFit: "fill" }}
            />
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
          <button className={`add-btn`} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
