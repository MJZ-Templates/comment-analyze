import React from "react";
import useDropdown from "../hooks/useDropdown";

const OrderDropdown = ({ onSelect }) => {
  const { open, selected, toggleOpen, handleSelect, options } = useDropdown({
    options: ["최신순", "좋아요순", "감정순"],
    defaultValue: "정렬 기준",
    onSelect,
  });

  return (
    <div>
      <button onClick={toggleOpen}>{selected} ▼</button>
      {open && (
        <ul>
          {options.map((option) => (
            <li key={option} onClick={() => handleSelect(option)}>
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderDropdown;
