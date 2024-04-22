import React from "react";

function Table() {
  const style = "py-2 px-4 border-b";
  return (
    <div className="w-50% row-span-2">
      <div className="overflow-x-auto px-4 py-4 w-2/3 mx-auto">
        <div className="w-auto bg-red-600 text-white text-center font-bold text-xl py-2 mb-3 rounded-lg">
          Compatible Blood Type Donors
        </div>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className={style}>Blood Type</th>
              <th className={style}>Donate Blood To</th>
              <th className={style}>Receive Blood From</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={style + " text-red-700 font-bold"}>A+</td>
              <td className={style}>A+ AB+</td>
              <td className={style}>A+ A- O+ O-</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>O+</td>
              <td className={style}>O+ A+ B+ AB+</td>
              <td className={style}>O+ O-</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>B+</td>
              <td className={style}>B+ AB+</td>
              <td className={style}>B+ B- O+ O-</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>AB+</td>
              <td className={style}>AB+</td>
              <td className={style}>Everyone</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>A-</td>
              <td className={style}>A+ A- AB+ AB-</td>
              <td className={style}>A- O-</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>O-</td>
              <td className={style}>Everyone</td>
              <td className={style}>O-</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>B-</td>
              <td className={style}>B+ B- AB+ AB-</td>
              <td className={style}>B- O-</td>
            </tr>
            <tr>
              <td className={style + " text-red-700 font-bold"}>AB-</td>
              <td className={style}>AB+ AB-</td>
              <td className={style}>AB- A- B- O-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Table;
