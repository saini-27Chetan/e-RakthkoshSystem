import React from "react";
import Button from "../Button";
import { formatWord } from "./Formatting";
import { useState } from "react";

function SearchBoxContainer({ pageText, onSearch, onReset }) {
  const initialSearchValue = "";
  const [searchValue, setSearchValue] = useState(initialSearchValue);
  const handleReset = (event) => {
    event.preventDefault();
    setSearchValue(initialSearchValue);
    onReset();
  };
  const handleChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    setSearchValue(initialSearchValue);
    onSearch(searchValue);
  };

  return (
    <div className="w-full border border-gray-300 rounded p-7 grid grid-cols-12 gap-4">
      <div className="col-span-3">
        <label htmlFor="searchInput" className="text-lg font-bold leading-10">
          Enter {formatWord(pageText)} Name:
        </label>
      </div>
      <div className="col-span-5">
        <input
          value={searchValue}
          onChange={handleChange}
          placeholder={`Enter ${formatWord(pageText)} Name or City Name`}
          className="leading-8 w-full border-2 border-gray-300 rounded p-2 hover:border-blue-400 hover:shadow-[5px_3px_20px_rgba(3,102,214,0.7)] focus:border-blue-400 focus:ring-2 focus:ring-blue-400 focus:outline-none focus:shadow-none transition-all duration-300"
        />
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <Button title="Search" onClick={handleSearch} />
      </div>

      <div className="col-span-2 flex items-center justify-center">
        <Button type={"reset"} onClick={handleReset} title={"Reset"} />
      </div>
    </div>
  );
}

export default SearchBoxContainer;
