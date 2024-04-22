import React from "react";

function RequestHead({ pageText }) {
  return (
    <div className="mt-12 m-auto w-3/4 border-b-2 border-gray-300 pb-3">
      <div className="font-bold text-3xl">
        {`Blood ${
          pageText === "want to donate" ? "Donor" : "Request"
        } Entry Form`}
      </div>
    </div>
  );
}

export default RequestHead;
