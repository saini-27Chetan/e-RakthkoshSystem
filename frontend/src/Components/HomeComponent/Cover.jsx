import React from "react";
import coverImage from "../../Images/background1.jpg";

function Cover() {
  return (
    <div className="relative">
      <div
        className="h-[80vh]"
        style={{
          backgroundImage: `url(${coverImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          objectFit: "cover",
        }}
      >
        <div className="absolute top-1/2 left-4 transform -translate-y-1/2 text-left">
          <div className="text-red-800 text-5xl uppercase font-extrabold my-6">
            E-RakthKosh System
          </div>
          <div className="font-extrabold text-xl w-2/3">
            Blood at Your Fingertips: A Centralized Platform for Seamless Blood
            Inventory Management.
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cover;
