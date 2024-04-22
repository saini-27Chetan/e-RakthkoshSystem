import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dropdown = ({ text, toggleDropdown, options, showDropdown }) => {
  const [mouseInside, setMouseInside] = useState(false);
  const navigate = useNavigate();

  const handleOptionClick = (option) => {
    toggleDropdown();
    if (text === "Add New") {
      text = "add-new";
    }
    navigate(`/${text.toLowerCase()}/${option.toLowerCase()}`);
  };

  return (
    <div
      className="relative"
      onClick={toggleDropdown}
      onMouseEnter={() => setMouseInside(true)}
      onMouseLeave={() => setMouseInside(false)}
    >
      {text}
      {showDropdown && mouseInside && (
        <div
          className="absolute bg-white rounded shadow-md mt-0 p-3 z-50 uppercase"
          style={{
            maxHeight: "fit-content",
            fontSize: "15px",
            color: "#666",
            minWidth: "max-content",
          }}
        >
          <ul>
            {options.map((option, index) => (
              <li key={index} className="pb-1">
                <span onClick={() => handleOptionClick(option)}>{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
