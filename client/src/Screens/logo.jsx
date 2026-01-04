import React from "react";

export default function Logo({ className = "w-10 h-10" }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background House Shape */}
      <path d="M250 50L50 200V450H450V200L250 50Z" fill="#E67E22"/>
      <path d="M250 50L450 200V250H50V200L250 50Z" fill="#D35400"/>
      
      {/* Food Cloche */}
      <circle cx="250" cy="320" r="100" fill="#F39C12"/>
      <path d="M150 320C150 264.772 194.772 220 250 220C305.228 220 350 264.772 350 320H150Z" fill="#F1C40F"/>
      <circle cx="250" cy="210" r="15" fill="#F39C12"/>
      
      {/* Plate Base */}
      <rect x="140" y="320" width="220" height="15" rx="7.5" fill="#2C3E50"/>
      
      {/* Cutlery */}
      <path d="M220 280V310M210 280V310M230 280V310" stroke="#2C3E50" stroke-width="15" stroke-linecap="round"/>
      <circle cx="280" cy="295" r="15" fill="#2C3E50"/>
      <rect x="277" y="310" width="6" height="15" fill="#2C3E50"/>
    </svg>
  );
}