import React from "react";
import { formatWord } from "./SearchComponent/Formatting";

function CommonSubHead({ pageText }) {
  return (
    <div className="bg-oatmeal w-full text-red-700 font-bold text-center text-4xl pt-7 pb-2">
      {pageText === "want to donate"
        ? "Blood Donor Registration"
        : pageText === "need blood"
        ? `Request Blood`
        : `All ${formatWord(pageText)} Lists`}
    </div>
  );
}

export default CommonSubHead;
