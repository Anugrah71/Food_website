import React from "react";
import ReactDom from "react-dom";

export default function Modal({ children, onClose }) {
  return ReactDom.createPortal(
    <>
      <div className="fixed inset-0 z-[1000] bg-black/70" onClick={onClose} />

      <div className="fixed top-1/2 left-1/2 z-[1001] h-[90%] w-[90%] -translate-x-1/2 -translate-y-1/2 overflow-auto rounded-lg bg-[#222] p-4 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-2xl font-bold text-white transition hover:text-red-400"
        >
          ✕
        </button>

        {children}
      </div>
    </>,
    document.getElementById("cart-root"),
  );
}
