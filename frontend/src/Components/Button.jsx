import React from "react";

function Button({ title, type, onClick }) {
  return (
    <div className=" w-40 py-3 cursor-pointer rounded-xl bg-red-600 text-center font-bold text-white hover:bg-red-500 hover:underline hover:text-base text-lg">
      <button type={type} onClick={onClick}>
        {title}
      </button>
    </div>
  );
}

export default Button;
