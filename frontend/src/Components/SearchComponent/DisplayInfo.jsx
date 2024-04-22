import React, { useState, useEffect } from "react";
import hospitalLogo from "../../Images/hospital-logo.png";
import bloodBankLogo from "../../Images/blood-bank-logo.png";
import bloodInventoryLogo from "../../Images/blood-inventory-logo.png";
import { formatWord } from "./Formatting";

function DisplayInfo({ pageText, searchValue, flag }) {
  const [dataArr, setDataArr] = useState([]);
  let logo, dataName, dataEmail, dataCity, dataContact;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (flag) {
          response = await fetch(
            `/api/searchPage/${pageText}?search=${searchValue}`
          );
        } else {
          response = await fetch(`/api/display/${pageText}`);
        }
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        let data = await response.json();
        setDataArr(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [flag, pageText, searchValue]);

  logo =
    pageText === "hospitals"
      ? hospitalLogo
      : pageText === "blood banks"
      ? bloodBankLogo
      : bloodInventoryLogo;
  dataName =
    pageText === "hospitals"
      ? "hospitalName"
      : pageText === "blood banks"
      ? "bloodbankName"
      : "bloodinventoryName";
  dataEmail =
    pageText === "hospitals"
      ? "hospitalEmail"
      : pageText === "blood banks"
      ? "bloodbankEmail"
      : "bloodinventoryEmail";
  dataContact =
    pageText === "hospitals"
      ? "hospitalContact"
      : pageText === "blood banks"
      ? "bloodbankContact"
      : "bloodinventoryContact";
  dataCity =
    pageText === "hospitals"
      ? "hospitalCity"
      : pageText === "blood banks"
      ? "bloodbankCity"
      : "bloodinventoryCity";

  // Template for Hospital and Blood Banks
  const displayTemplate1 = (item) => {
    return (
      <div className="col-span-2 flex flex-col">
        <div className="mx-3 my-2 flex-grow">
          <div className="text-blue-500 font-bold text-lg">
            {item[dataName]}
          </div>
          <div>
            <span className="font-bold">Contact:</span> {item[dataContact]}
          </div>
          <div>
            <span className="font-bold">Email:</span> {item[dataEmail]}
          </div>
          <div>
            <span className="font-bold">City:</span> {item[dataCity]}
          </div>
        </div>
      </div>
    );
  };

  // Template for Blood Invenntory
  const displayTemplate2 = (item) => {
    return (
      <div className="col-span-2 flex flex-col">
        <div className="mx-3 my-2 flex-grow">
          <div className="text-red-500 font-bold text-lg">
            {item.bloodType}ve {item.bloodUnits} units
          </div>
          <div className="text-blue-500 font-bold text-lg">
            {item[dataName]}
          </div>
          <div>
            <span className="font-bold">Contact:</span> {item[dataContact]}
          </div>
          <div>
            <span className="font-bold">Email:</span> {item[dataEmail]}
          </div>
          <div>
            <span className="font-bold">City:</span> {item[dataCity]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-3 place-content-evenly px-6 gap-6 w-100 m-auto">
      {dataArr.length === 0 ? (
        <div className="col-span-3 flex justify-center items-center text-red-600 flex-col gap-5">
          <div className="font-bold text-4xl">No Data to Display</div>
          <div className="font-semiboldbold text-3xl">Click 'Reset' button</div>
        </div>
      ) : (
        dataArr.map((item, index) => (
          <div key={index} className="col-span-1 flex">
            <div className="border-black border-2 rounded-lg my-5 grid grid-cols-3 w-full">
              <div className="col-span-1 border-yellow-300 border-4 flex justify-center items-center rounded-lg">
                <img
                  src={logo}
                  alt={`${formatWord(pageText)} Logo`}
                  className="w-2/3"
                />
              </div>
              {pageText === "blood inventories"
                ? displayTemplate2(item)
                : displayTemplate1(item)}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default DisplayInfo;
