import React from "react";

function Portal({ onClickHandler }) {
  const management = [
    "Hospital Management",
    "Blood Bank Management",
    "Blood Inventory Management",
    "Donor Management",
    "Seeker Management",
  ];

  return (
    <div className="flex flex-col w-1/3 my-8">
      {management.map((data, index) => (
        <button
          key={index}
          onClick={() => onClickHandler(data)}
          className="bg-red-800 rounded-lg text-white text-center py-4 font-bold my-2 hover:bg-red-600"
        >
          {data}
        </button>
      ))}
    </div>
  );
}

export default Portal;
