import React from "react";

export default function Cancel({ size = 24, filled, bg = '#FF3F3F', color = filled ? "#fff" : "#FF3F3F" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{backgroundColor: filled && bg}}
      className={`feather feather-x ${filled && `rounded-full w-5 h-5`}`}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
}
